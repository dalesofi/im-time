import { loadConfig } from "./load-config.mjs";
import { loadEvents } from "./parse-ics.mjs";
import { buildMapper } from "./map-areas.mjs";
import { formatRange, toLocalDateIso } from "./week-range.mjs";
import { computeStats, formatAreaBreakdown } from "./stats.mjs";
import { buildAreaMeta } from "./area-meta.mjs";
import { buildChartAllocation } from "./chart-allocation.mjs";
import { evaluateInsights } from "./insights.mjs";
import { buildWeekSnapshot } from "./goal-snapshot.mjs";
import { hoursBetween } from "./week-range.mjs";
import { PATHS } from "./paths.mjs";

function applyAreaRollups(areaHours, lifeAreasConfig) {
  for (const area of lifeAreasConfig.lifeAreas || []) {
    if (!area.rollupInto) continue;
    const h = areaHours[area.id] || 0;
    if (h <= 0) continue;
    areaHours[area.rollupInto] = (areaHours[area.rollupInto] || 0) + h;
    delete areaHours[area.id];
  }
}

export async function runAnalysis(weekRange, icsPath = PATHS.mergedIcs) {
  const config = loadConfig();
  const events = await loadEvents(icsPath);
  const map = buildMapper(config);
  const mapped = events.map((ev) => {
    const { areaId, alsoAreas = [], silentInsight } = map(ev);
    return { ...ev, areaId, alsoAreas, silentInsight };
  });

  const stats = computeStats(mapped, weekRange, mapped);
  applyAreaRollups(stats.areaHours, config.lifeAreas);
  const breakdown = formatAreaBreakdown(stats.areaHours, config.lifeAreas);
  const { rows: chartAllocation, weekHours } = buildChartAllocation(
    stats.areaHours,
    config.lifeAreas,
    weekRange
  );
  const unscheduledHours =
    Math.round((weekHours - stats.scheduledTimedHours) * 10) / 10;
  const sleepThresholdDefault =
    config.insights.thresholds?.unscheduledSleepHoursLt ?? 50;

  const statsForInsights = { ...stats, unscheduledHours, weekHours };
  const insights = evaluateInsights(
    config.insights,
    statsForInsights,
    config.insights.thresholds
  );

  const priorities = config.insights.priorities?.defaultForSofia || [];
  const weekSnapshot = buildWeekSnapshot(
    stats,
    config.weekSnapshot,
    config.lifeAreas,
    priorities
  );

  const weekFrom = toLocalDateIso(weekRange.start);
  const weekTo = toLocalDateIso(weekRange.end);

  return {
    week: formatRange(weekRange.start, weekRange.end),
    weekFrom,
    weekTo,
    weekRange,
    branding: config.branding,
    eventCount: stats.eventCount,
    weekHours,
    unscheduledHours,
    sleepThresholdDefault,
    meetingHours: Math.round(stats.meetingHours * 10) / 10,
    scheduledTimedHours: Math.round(stats.scheduledTimedHours * 10) / 10,
    freeMorningsBefore11: stats.freeMorningsBefore11,
    openEveningsAfter20: stats.openEveningsAfter20,
    homeCleaningRolling4w: Math.round(stats.homeCleaningRolling * 10) / 10,
    dayRestMaxHoursOneDay: Math.round(stats.dayRestMaxDay * 10) / 10,
    allocation: breakdown,
    chartAllocation,
    areaMeta: buildAreaMeta(config.lifeAreas),
    weekSnapshot,
    mealsNote: weekSnapshot.mealsCalendarNote || null,
    insights: insights.map((i) => ({ id: i.id, text: i.text })),
    goals: config.insights.sampleGoals?.map((g) => g.label) || [],
    priorities,
    mappingNote:
      "Personal calendar blocks default to social (lavender) when no keyword matches—not uncategorized.",
  };
}
