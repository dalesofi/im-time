import { buildAreaMeta } from "./area-meta.mjs";
import { hoursBetween } from "./week-range.mjs";

const PETS_NUDGE =
  "No 🐕 Lua blocks yet — calendarize walks & care in banana yellow (paseo, lua, dog walk).";

function makeRow(id, meta, hours, totalTimed, weekHours) {
  const m = meta[id] || {};
  return {
    id,
    label: m.label || id,
    emoji: m.emoji || "",
    hex: m.hex || "#5c6b8a",
    hours: Math.round(hours * 10) / 10,
    percent: Math.round((hours / totalTimed) * 100),
    weekPercent: Math.round((hours / weekHours) * 1000) / 10,
    nudge: null,
  };
}

function makePetsZero(meta) {
  const m = meta.pets || {};
  return {
    id: "pets",
    label: m.label || "Pet care: Lua",
    emoji: m.emoji || "🐕",
    hex: m.hex || "#F6BF26",
    hours: 0,
    percent: 0,
    weekPercent: 0,
    nudge: PETS_NUDGE,
  };
}

/** Bar chart rows ranked by hours; 🐕 always last. */
export function buildChartAllocation(areaHours, lifeAreasConfig, weekRange) {
  const meta = buildAreaMeta(lifeAreasConfig);
  const chartCfg = lifeAreasConfig.chartDisplay || {};
  const alwaysShow = chartCfg.alwaysShowAreaIds || ["pets", "health", "meals"];
  const weekHours = hoursBetween(weekRange.start, weekRange.end);
  const totalTimed = Object.values(areaHours).reduce((a, b) => a + b, 0) || 1;
  const chartMin = chartCfg.minHours ?? 1.5;

  const allRows = [];
  for (const area of lifeAreasConfig.lifeAreas || []) {
    if (area.showInChart === false && !alwaysShow.includes(area.id)) continue;
    const h = areaHours[area.id] || 0;
    if (h <= 0 && !alwaysShow.includes(area.id)) continue;
    allRows.push(makeRow(area.id, meta, h, totalTimed, weekHours));
  }

  let petsRow = allRows.find((r) => r.id === "pets") || makePetsZero(meta);
  petsRow = {
    ...petsRow,
    nudge: petsRow.hours <= 0 ? PETS_NUDGE : null,
  };

  const nonPets = allRows.filter((r) => r.id !== "pets");
  const main = [];
  let otherHours = 0;

  for (const row of nonPets) {
    if (alwaysShow.includes(row.id) && row.hours <= 0) continue;
    if (row.hours >= chartMin) main.push(row);
    else otherHours += row.hours;
  }

  main.sort((a, b) => b.hours - a.hours);

  if (otherHours > 0) {
    main.push({
      id: "other",
      label: "Other",
      emoji: "◦",
      hex: "#c4c0bb",
      hours: Math.round(otherHours * 10) / 10,
      percent: Math.round((otherHours / totalTimed) * 100),
      weekPercent: Math.round((otherHours / weekHours) * 1000) / 10,
      nudge: null,
    });
  }

  const zeroCare = nonPets
    .filter((r) => alwaysShow.includes(r.id) && r.hours <= 0)
    .sort((a, b) => b.hours - a.hours);

  return {
    rows: [...main, ...zeroCare, petsRow],
    weekHours: Math.round(weekHours * 10) / 10,
  };
}

/** Details list: ranked by hours, emojis, pets last. */
export function buildFullBreakdown(areaHours, lifeAreasConfig, weekRange) {
  const meta = buildAreaMeta(lifeAreasConfig);
  const weekHours = hoursBetween(weekRange.start, weekRange.end);
  const totalTimed = Object.values(areaHours).reduce((a, b) => a + b, 0) || 1;

  const rows = [];
  for (const area of lifeAreasConfig.lifeAreas || []) {
    const h = areaHours[area.id] || 0;
    if (h <= 0 && area.id !== "pets") continue;
    rows.push(makeRow(area.id, meta, h, totalTimed, weekHours));
  }

  let petsRow = rows.find((r) => r.id === "pets") || makePetsZero(meta);
  const rest = rows.filter((r) => r.id !== "pets").sort((a, b) => b.hours - a.hours);
  return [...rest, petsRow];
}
