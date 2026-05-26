import { buildAreaMeta } from "./area-meta.mjs";
import { hoursBetween } from "./week-range.mjs";

const DEFAULT_NUDGES = {
  pets: "No 🐕 Lua blocks yet — calendarize walks & care in banana yellow (paseo, lua, dog walk).",
  health: "No 🏃 exercise blocks — try sage green for pilates, yoga, GAP, or walks.",
  meals: "No 🥕 meal blocks — log eating on basil green so meals show up here.",
  home_cleaning: "No 🧹 cleaning blocks — lavender + limpiar/ropa keywords, or label a 3h block.",
};

/** Build bar-chart rows: always-show care categories (even 0h), Google colors, nudges. */
export function buildChartAllocation(areaHours, lifeAreasConfig, weekRange) {
  const meta = buildAreaMeta(lifeAreasConfig);
  const chartCfg = lifeAreasConfig.chartDisplay || {};
  const alwaysShow = chartCfg.alwaysShowAreaIds || ["pets", "health", "meals", "home_cleaning"];
  const nudges = { ...DEFAULT_NUDGES, ...(chartCfg.zeroHourNudges || {}) };
  const weekHours = hoursBetween(weekRange.start, weekRange.end);
  const totalTimed = Object.values(areaHours).reduce((a, b) => a + b, 0) || 1;

  const rows = [];
  for (const area of lifeAreasConfig.lifeAreas || []) {
    if (area.showInChart === false && !alwaysShow.includes(area.id)) continue;
    const h = areaHours[area.id] || 0;
    if (h <= 0 && !alwaysShow.includes(area.id) && area.pinInChart !== true) continue;

    const m = meta[area.id] || {};
    rows.push({
      id: area.id,
      label: m.label || area.id,
      emoji: m.emoji || "",
      hex: m.hex || "#5c6b8a",
      hours: Math.round(h * 10) / 10,
      percent: Math.round((h / totalTimed) * 100),
      weekPercent: Math.round((h / weekHours) * 1000) / 10,
      pinInChart: alwaysShow.includes(area.id) || area.pinInChart === true,
      nudge: h <= 0 && alwaysShow.includes(area.id) ? nudges[area.id] : null,
    });
  }

  rows.sort((a, b) => {
    const oa = meta[a.id]?.chartOrder ?? 50;
    const ob = meta[b.id]?.chartOrder ?? 50;
    return oa - ob || b.hours - a.hours;
  });

  const chartMin = chartCfg.minHours ?? 1.5;
  const maxBars = chartCfg.maxBars ?? 12;
  const pinnedRows = rows.filter((r) => r.pinInChart);
  const unpinned = rows.filter((r) => !r.pinInChart);
  const main = [...pinnedRows];
  let otherHours = 0;

  for (const row of unpinned) {
    if (row.hours >= chartMin && main.length < maxBars) main.push(row);
    else otherHours += row.hours;
  }

  main.sort((a, b) => {
    const oa = meta[a.id]?.chartOrder ?? 50;
    const ob = meta[b.id]?.chartOrder ?? 50;
    return oa - ob || b.hours - a.hours;
  });

  if (otherHours > 0) {
    main.push({
      id: "other",
      label: "Other",
      emoji: "◦",
      hex: "#c4c0bb",
      hours: Math.round(otherHours * 10) / 10,
      percent: Math.round((otherHours / totalTimed) * 100),
      weekPercent: Math.round((otherHours / weekHours) * 1000) / 10,
      pinInChart: false,
      nudge: null,
    });
  }

  return { rows: main, weekHours: Math.round(weekHours * 10) / 10 };
}
