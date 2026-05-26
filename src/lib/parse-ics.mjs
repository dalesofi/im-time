import fs from "node:fs";
import ical from "node-ical";

/** Extract X-IMTIME-SOURCE-CALENDAR per UID from raw ICS text */
export function extractSourceByUid(icsText) {
  const map = new Map();
  const blocks = icsText.split("BEGIN:VEVENT");
  for (const block of blocks.slice(1)) {
    const uidM = block.match(/^UID:([^\r\n]+)/m);
    const srcM = block.match(/^X-IMTIME-SOURCE-CALENDAR:([^\r\n]+)/m);
    if (uidM && srcM) map.set(uidM[1].trim(), srcM[1].trim());
  }
  return map;
}

export async function loadEvents(icsPath) {
  const raw = fs.readFileSync(icsPath, "utf8");
  const sourceByUid = extractSourceByUid(raw);
  const parsed = await ical.parseFile(icsPath);
  const events = [];
  for (const [key, ev] of Object.entries(parsed)) {
    if (!ev || ev.type !== "VEVENT") continue;
    if (ev.status === "CANCELLED") continue;
    const start = ev.start instanceof Date ? ev.start : null;
    const end = ev.end instanceof Date ? ev.end : start;
    if (!start) continue;
    const uid = ev.uid || key;
    const summary = (ev.summary || "").toString();
    const isAllDay = ev.datetype === "date" || (start.getHours() === 0 && end && end.getHours() === 0 && (end - start) >= 86400000);
    const attendees = ev.attendee ? (Array.isArray(ev.attendee) ? ev.attendee : [ev.attendee]) : [];
    events.push({
      uid,
      summary,
      summaryLower: summary.toLowerCase(),
      start,
      end: end || start,
      isAllDay,
      isMeeting: attendees.length > 0,
      sourceCalendar: sourceByUid.get(uid) || null,
    });
  }
  return events;
}
