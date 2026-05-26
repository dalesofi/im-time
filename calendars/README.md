# Calendar data (dogfood)

Personal Google Calendar exports used for I'm Time development and dogfood. **Not for public repos** if you ever open-source—add `calendars/*.ics` to `.gitignore` before pushing publicly.

## Source files

| File | Role |
|------|------|
| `sofia@buttonschool.com.ics` | Work / passion project (Button School) |
| `sofia@rbl.media.ics` | Passion project (RBL) |
| `sodalponte@gmail.com.ics` | Personal life |

## Merged file

**`merged.ics`** — single calendar combining all three sources.

- Events tagged with `X-IMTIME-SOURCE-CALENDAR`: `buttonschool` | `rbl` | `personal`
- Duplicate events (same `UID` across exports) collapsed to one record (~4,192 unique events from ~5,720 raw)
- Regenerate after updating any source export:

```bash
python3 scripts/merge-calendars.py
```

*(Script to be added when the app repo is scaffolded; merge was run once at project setup.)*

## Product note

v1 **product** still speaks in terms of ICS upload for any user. For **your** solo build, the app can read `calendars/merged.ics` from the repo until upload UI exists. See [docs/tech.md](../docs/tech.md).
