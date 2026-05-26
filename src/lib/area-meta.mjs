/** Google Calendar legend + emoji per life area (display). */
export function buildAreaMeta(lifeAreasConfig) {
  const map = {};
  for (const a of lifeAreasConfig.lifeAreas || []) {
    map[a.id] = {
      label: a.label,
      emoji: a.emoji || "",
      hex: a.hex || "#5c6b8a",
      googleColor: a.googleColor || null,
      showInChart: a.showInChart !== false,
      chartOrder: a.chartOrder ?? 50,
    };
  }
  return map;
}

/** Fewer bars: roll areas under chartMinHours into "Other" (pinned areas always show). */
export function rollupAllocation(rows, { chartMinHours = 1.5, maxBars = 8 } = {}) {
  const main = [];
  let otherHours = 0;
  for (const row of rows) {
    const pinned = row.pinInChart === true;
    if ((pinned || row.hours >= chartMinHours) && main.length < maxBars) main.push(row);
    else otherHours += row.hours;
  }
  if (otherHours > 0) {
    const total = rows.reduce((s, r) => s + r.hours, 0) || 1;
    main.push({
      id: "other",
      label: "Other",
      emoji: "◦",
      hex: "#c4c0bb",
      hours: Math.round(otherHours * 10) / 10,
      percent: Math.round((otherHours / total) * 100),
    });
  }
  return main;
}
