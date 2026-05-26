#!/usr/bin/env python3
"""Merge personal ICS exports into calendars/merged.ics."""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

SOURCES = [
    (ROOT / "calendars/sofia@buttonschool.com.ics", "buttonschool", "Work / passion project (Button School)"),
    (ROOT / "calendars/sofia@rbl.media.ics", "rbl", "Passion project (RBL)"),
    (ROOT / "calendars/sodalponte@gmail.com.ics", "personal", "Personal life"),
]

OUT = ROOT / "calendars/merged.ics"


def extract_blocks(content: str, begin: str, end: str) -> list[str]:
    pattern = re.compile(rf"BEGIN:{begin}\r?\n.*?\r?\nEND:{end}", re.DOTALL)
    return pattern.findall(content)


def extract_events(path: Path) -> tuple[list[str], list[str]]:
    text = path.read_text(encoding="utf-8", errors="replace")
    lines: list[str] = []
    for line in text.splitlines():
        if line.startswith((" ", "\t")) and lines:
            lines[-1] += line[1:]
        else:
            lines.append(line)
    unfolded = "\n".join(lines)
    return extract_blocks(unfolded, "VEVENT", "VEVENT"), extract_blocks(unfolded, "VTIMEZONE", "VTIMEZONE")


def main() -> None:
    all_events: dict[str, tuple[str, str]] = {}
    all_tzs: dict[str, str] = {}
    source_counts: dict[str, int] = {}

    for path, key, label in SOURCES:
        if not path.exists():
            raise SystemExit(f"Missing source file: {path}")
        events, tzs = extract_events(path)
        source_counts[key] = len(events)
        for tz in tzs:
            m = re.search(r"^TZID:([^\r\n]+)", tz, re.M)
            if m:
                all_tzs[m.group(1)] = tz
        for ev in events:
            m = re.search(r"^UID:([^\r\n]+)", ev, re.M)
            uid = m.group(1).strip() if m else f"no-uid-{key}-{hash(ev)}"
            insert = f"X-IMTIME-SOURCE-CALENDAR:{key}\r\nX-IMTIME-SOURCE-LABEL:{label}\r\n"
            if "X-IMTIME-SOURCE-CALENDAR:" not in ev:
                ev = ev.replace("BEGIN:VEVENT\r\n", f"BEGIN:VEVENT\r\n{insert}")
                ev = ev.replace("BEGIN:VEVENT\n", f"BEGIN:VEVENT\n{insert}")
            if uid not in all_events or len(ev) > len(all_events[uid][0]):
                all_events[uid] = (ev, key)

    header = """BEGIN:VCALENDAR
PRODID:-//I'm Time//Merged Personal Calendars//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:I'm Time — merged (personal + buttonschool + rbl)
X-WR-TIMEZONE:Europe/Madrid
X-IMTIME-MERGE-NOTE:Merged from 3 Google Calendar exports; duplicates by UID collapsed.
"""

    parts = [header, *all_tzs.values(), *(ev for ev, _ in all_events.values()), "END:VCALENDAR\n"]
    OUT.write_text("\n".join(parts), encoding="utf-8")

    print("Source event counts:", source_counts)
    print("Unique events after UID dedupe:", len(all_events))
    print("Written:", OUT)


if __name__ == "__main__":
    main()
