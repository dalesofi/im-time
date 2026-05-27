import { hoursBetween } from "./week-range.mjs";

/** Merge overlapping [start,end] intervals (Date objects). */
function mergeIntervals(intervals) {
  if (!intervals.length) return [];
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const out = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const last = out[out.length - 1];
    if (sorted[i][0] <= last[1]) {
      last[1] = new Date(Math.max(last[1].getTime(), sorted[i][1].getTime()));
    } else {
      out.push(sorted[i]);
    }
  }
  return out;
}

function busyIntervalsInWindow(events, winStart, winEnd) {
  const intervals = [];
  for (const ev of events) {
    if (ev.isAllDay) continue;
    if (ev.end <= winStart || ev.start >= winEnd) continue;
    const s = ev.start < winStart ? winStart : ev.start;
    const e = ev.end > winEnd ? winEnd : ev.end;
    intervals.push([s, e]);
  }
  return mergeIntervals(intervals);
}

function titleOf(ev) {
  return String(ev.summaryLower || ev.summary || "").toLowerCase();
}

function isSleepKeyword(summaryLower) {
  return ["sleep", "dormir", "dormi", "bedtime", "to bed"].some((k) =>
    summaryLower.includes(k)
  );
}

function isRecoveryKeyword(summaryLower) {
  return ["siesta", "nap", "naps", "recov", "recovery"].some((k) =>
    summaryLower.includes(k)
  );
}

function explicitSleepHours(events, winStart, winEnd) {
  let h = 0;
  for (const ev of events) {
    if (ev.isAllDay) continue;
    const txt = titleOf(ev);
    if (!isSleepKeyword(txt)) continue;
    if (ev.end <= winStart || ev.start >= winEnd) continue;
    const s = ev.start < winStart ? winStart : ev.start;
    const e = ev.end > winEnd ? winEnd : ev.end;
    h += hoursBetween(s, e);
  }
  return h;
}

/** Sum gaps >= minBlockHours inside [winStart, winEnd] not covered by events. */
function bigGapsHours(events, winStart, winEnd, minBlockHours) {
  const busy = busyIntervalsInWindow(events, winStart, winEnd);
  const gaps = [];
  let cursor = winStart;
  for (const [bs, be] of busy) {
    if (bs > cursor) gaps.push([cursor, bs]);
    cursor = be > cursor ? be : cursor;
  }
  if (cursor < winEnd) gaps.push([cursor, winEnd]);
  let h = 0;
  for (const [gs, ge] of gaps) {
    const block = hoursBetween(gs, ge);
    if (block >= minBlockHours) h += block;
  }
  return h;
}

/**
 * Night sleep proxy: off-calendar time 21:00→08:00 in blocks ≥ minBlockHours.
 * @see config/observe-copy.json
 */
export function computeNightRestHours(
  events,
  weekStart,
  weekEnd,
  { nightStartHour = 0, nightEndHour = 8, minBlockHours = 3 } = {}
) {
  let total = 0;
  for (let d = new Date(weekStart); d <= weekEnd; d.setDate(d.getDate() + 1)) {
    const winStart = new Date(d);
    winStart.setHours(nightStartHour, 0, 0, 0);
    const winEnd = new Date(d);
    winEnd.setDate(winEnd.getDate() + 1);
    winEnd.setHours(nightEndHour, 0, 0, 0);
    const s = winStart < weekStart ? weekStart : winStart;
    const e = winEnd > weekEnd ? weekEnd : winEnd;
    if (e <= s) continue;
    const nonSleep = events.filter((ev) => !isSleepKeyword(titleOf(ev)));
    const inferred = bigGapsHours(nonSleep, s, e, minBlockHours);
    const explicit = explicitSleepHours(events, s, e);
    const windowCap = hoursBetween(s, e);
    total += Math.min(windowCap, inferred + explicit);
  }
  return Math.round(total * 10) / 10;
}

/**
 * Recovery outside the night-sleep window:
 * - explicit sleep-labeled blocks outside 00:00-08:00
 * - siesta/nap/recovery keywords (any time)
 */
export function computeRecoveryRestHours(
  events,
  weekStart,
  weekEnd,
  { nightStartHour = 0, nightEndHour = 8 } = {}
) {
  let total = 0;
  for (const ev of events) {
    if (ev.isAllDay) continue;
    if (ev.end <= weekStart || ev.start >= weekEnd) continue;
    const s = ev.start < weekStart ? weekStart : ev.start;
    const e = ev.end > weekEnd ? weekEnd : ev.end;
    if (e <= s) continue;
    const txt = titleOf(ev);
    const isSleep = isSleepKeyword(txt);
    const isRecovery = isRecoveryKeyword(txt);
    if (!isSleep && !isRecovery) continue;

    if (isRecovery) {
      total += hoursBetween(s, e);
      continue;
    }

    // Sleep-labeled blocks only count as "recovery" when outside night window.
    const startsInNight =
      s.getHours() >= nightStartHour && s.getHours() < nightEndHour;
    const endsInNight = e.getHours() >= nightStartHour && e.getHours() <= nightEndHour;
    if (!(startsInNight && endsInNight)) {
      total += hoursBetween(s, e);
    }
  }
  return Math.round(total * 10) / 10;
}
