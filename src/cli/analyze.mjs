#!/usr/bin/env node
import { loadConfig } from "../lib/load-config.mjs";
import { loadEvents } from "../lib/parse-ics.mjs";
import { buildMapper } from "../lib/map-areas.mjs";
import { getWeekRange, formatRange } from "../lib/week-range.mjs";
import { computeStats, formatAreaBreakdown } from "../lib/stats.mjs";
import { evaluateInsights } from "../lib/insights.mjs";
import { PATHS } from "../lib/paths.mjs";

const jsonOut = process.argv.includes("--json");

async function main() {
  const config = loadConfig();
  const events = await loadEvents(PATHS.mergedIcs);
  const map = buildMapper(config);
  const mapped = events.map((ev) => {
    const { areaId, alsoAreas = [], silentInsight } = map(ev);
    return { ...ev, areaId, alsoAreas, silentInsight };
  });

  const weekRange = getWeekRange(new Date());
  const stats = computeStats(mapped, weekRange, mapped);
  const breakdown = formatAreaBreakdown(stats.areaHours, config.lifeAreas);
  const insights = evaluateInsights(
    config.insights,
    stats,
    config.insights.thresholds
  );

  const result = {
    week: formatRange(weekRange.start, weekRange.end),
    eventCount: stats.eventCount,
    meetingHours: Math.round(stats.meetingHours * 10) / 10,
    scheduledTimedHours: Math.round(stats.scheduledTimedHours * 10) / 10,
    freeMorningsBefore11: stats.freeMorningsBefore11,
    openEveningsAfter20: stats.openEveningsAfter20,
    homeCleaningRolling4w: Math.round(stats.homeCleaningRolling * 10) / 10,
    dayRestMaxHoursOneDay: Math.round(stats.dayRestMaxDay * 10) / 10,
    allocation: breakdown,
    insights: insights.map((i) => ({ id: i.id, text: i.text })),
    goals: config.insights.sampleGoals?.map((g) => g.label) || [],
  };

  if (jsonOut) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  printReport(result, config);
}

function printReport(result, config) {
  const line = "─".repeat(52);
  console.log("\n  I'm Time — weekly analysis (CLI)\n");
  console.log(`  Week: ${result.week}`);
  console.log(`  Events in week: ${result.eventCount}`);
  console.log(line);
  console.log("\n  Where your timed hours went\n");
  for (const row of result.allocation) {
    const bar = "█".repeat(Math.min(24, Math.round(row.percent / 4)));
    console.log(
      `  ${row.label.padEnd(22)} ${String(row.hours).padStart(5)}h  ${String(row.percent).padStart(3)}%  ${bar}`
    );
  }
  console.log(line);
  console.log("\n  This week in numbers\n");
  console.log(`  Meeting hours:        ${result.meetingHours}h`);
  console.log(`  Scheduled (timed):    ${result.scheduledTimedHours}h`);
  console.log(`  Free mornings (<11):  ${result.freeMorningsBefore11} weekdays`);
  console.log(`  Open evenings (>20):  ${result.openEveningsAfter20} weekdays`);
  console.log(`  Home cleaning (4w):   ${result.homeCleaningRolling4w}h`);
  console.log(`  Max day-rest 1 day:   ${result.dayRestMaxHoursOneDay}h`);
  console.log(line);
  console.log("\n  Insight cards\n");
  for (const card of result.insights) {
    console.log(`  · [${card.id}]`);
    console.log(`    ${card.text}\n`);
  }
  console.log(line);
  console.log("\n  Your intentions (not scored)\n");
  for (const g of result.goals) {
    console.log(`  · ${g}`);
  }
  console.log("\n  Edit thresholds: config/insights-rules.json");
  console.log("  Edit colors/areas: config/calendar-colors.json\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
