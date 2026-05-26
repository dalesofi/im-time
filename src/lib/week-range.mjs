/** Mon 00:00 – Sun 23:59:59 for week containing refDate */
export function getWeekRange(refDate = new Date()) {
  const d = new Date(refDate);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diffToMon = day === 0 ? -6 : 1 - day;
  const mon = new Date(d);
  mon.setDate(d.getDate() + diffToMon);
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  sun.setHours(23, 59, 59, 999);
  return { start: mon, end: sun };
}

export function formatRange(start, end) {
  const opts = { month: "short", day: "numeric", year: "numeric" };
  return `${start.toLocaleDateString("en-GB", opts)} – ${end.toLocaleDateString("en-GB", opts)}`;
}

export function eventInRange(ev, start, end) {
  return ev.start <= end && ev.end >= start;
}

export function hoursBetween(start, end) {
  return Math.max(0, (end - start) / 3600000);
}
