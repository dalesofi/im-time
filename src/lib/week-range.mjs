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

/** Parse YYYY-MM-DD as local midnight */
export function parseLocalDate(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, d, 0, 0, 0, 0);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${isoDate} (use YYYY-MM-DD)`);
  }
  return date;
}

/** Inclusive local range: from 00:00 on start day to 23:59:59 on end day */
export function getCustomRange(startIso, endIso) {
  const start = parseLocalDate(startIso);
  const end = parseLocalDate(endIso);
  end.setHours(23, 59, 59, 999);
  if (end < start) throw new Error("End date must be on or after start date");
  return { start, end };
}

export function parseWeekArgs(argv) {
  const fromIdx = argv.indexOf("--from");
  const toIdx = argv.indexOf("--to");
  if (fromIdx !== -1 && toIdx !== -1) {
    return getCustomRange(argv[fromIdx + 1], argv[toIdx + 1]);
  }
  const weekIdx = argv.indexOf("--week");
  if (weekIdx !== -1) {
    return getWeekRange(parseLocalDate(argv[weekIdx + 1]));
  }
  return getWeekRange(new Date());
}

export function eventInRange(ev, start, end) {
  return ev.start <= end && ev.end >= start;
}

export function hoursBetween(start, end) {
  return Math.max(0, (end - start) / 3600000);
}

/** YYYY-MM-DD in local timezone (not UTC). */
export function toLocalDateIso(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
