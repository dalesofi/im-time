import { hoursBetween } from "./week-range.mjs";

export function computeStats(mappedEvents, weekRange, allEventsForRolling) {
  const { start, end } = weekRange;
  const weekEvents = mappedEvents.filter((e) => e.start <= end && e.end >= start);

  const areaHours = {};
  let meetingHours = 0;
  let scheduledTimedHours = 0;
  const dayRestByDate = {};
  const cleaningHoursRolling = 0;

  for (const ev of weekEvents) {
    if (ev.isAllDay) continue;
    const evStart = ev.start < start ? start : ev.start;
    const evEnd = ev.end > end ? end : ev.end;
    const h = hoursBetween(evStart, evEnd);
    if (h <= 0) continue;
    scheduledTimedHours += h;
    areaHours[ev.areaId] = (areaHours[ev.areaId] || 0) + h;
    for (const linked of ev.alsoAreas || []) {
      areaHours[linked] = (areaHours[linked] || 0) + h;
    }
    if (ev.isMeeting) meetingHours += h;
    if (ev.areaId === "day_rest") {
      const key = evStart.toISOString().slice(0, 10);
      dayRestByDate[key] = (dayRestByDate[key] || 0) + h;
    }
  }

  const freeMorningsBefore11 = countFreeMornings(weekEvents, start, end, 11);
  const openEveningsAfter20 = countOpenEvenings(weekEvents, start, end, 20);

  const rollingWeeks = 4;
  const rollingStart = new Date(start);
  rollingStart.setDate(rollingStart.getDate() - 7 * (rollingWeeks - 1));
  let homeCleaningRolling = 0;
  for (const ev of allEventsForRolling) {
    if (ev.isAllDay) continue;
    if (ev.areaId !== "home_cleaning") continue;
    if (ev.end < rollingStart || ev.start > end) continue;
    const s = ev.start < rollingStart ? rollingStart : ev.start;
    const e = ev.end > end ? end : ev.end;
    homeCleaningRolling += hoursBetween(s, e);
  }

  const dayRestMaxDay = Math.max(0, ...Object.values(dayRestByDate));

  return {
    areaHours,
    meetingHours,
    scheduledTimedHours,
    freeMorningsBefore11,
    openEveningsAfter20,
    homeCleaningRolling,
    dayRestMaxDay,
    dayRestByDate,
    eventCount: weekEvents.length,
  };
}

function countFreeMornings(events, weekStart, weekEnd, beforeHour) {
  let count = 0;
  for (let d = new Date(weekStart); d <= weekEnd; d.setDate(d.getDate() + 1)) {
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue;
    const dayStart = new Date(d);
    dayStart.setHours(0, 0, 0, 0);
    const morningEnd = new Date(d);
    morningEnd.setHours(beforeHour, 0, 0, 0);
    const busy = events.some((ev) => {
      if (ev.isAllDay) return false;
      return ev.start < morningEnd && ev.end > dayStart;
    });
    if (!busy) count++;
  }
  return count;
}

function countOpenEvenings(events, weekStart, weekEnd, afterHour) {
  let count = 0;
  for (let d = new Date(weekStart); d <= weekEnd; d.setDate(d.getDate() + 1)) {
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue;
    const eveningStart = new Date(d);
    eveningStart.setHours(afterHour, 0, 0, 0);
    const dayEnd = new Date(d);
    dayEnd.setHours(23, 59, 59, 999);
    const busy = events.some((ev) => {
      if (ev.isAllDay) return false;
      return ev.start < dayEnd && ev.end > eveningStart;
    });
    if (!busy) count++;
  }
  return count;
}

export function formatAreaBreakdown(areaHours, lifeAreasConfig) {
  const labels = Object.fromEntries(
    lifeAreasConfig.lifeAreas.map((a) => [a.id, a.label])
  );
  const total = Object.values(areaHours).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(areaHours)
    .sort((a, b) => b[1] - a[1])
    .map(([id, h]) => ({
      id,
      label: labels[id] || id,
      hours: Math.round(h * 10) / 10,
      percent: Math.round((h / total) * 100),
    }));
}
