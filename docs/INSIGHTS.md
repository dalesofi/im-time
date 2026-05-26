# Insight rules & goals — editing guide

> Config lives in [config/insights-rules.json](../config/insights-rules.json). Colors: [config/calendar-colors.json](../config/calendar-colors.json). Life areas: [config/life-areas-default.json](../config/life-areas-default.json).

## How it works

1. App computes **stats** for the selected Mon–Sun week.
2. Rules in `insights-rules.json` are evaluated by **priority** (low number = higher priority).
3. Up to **`maxCardsPerWeek`** (3) templates are shown.
4. **Sample goals** are intentions only—no streaks, no guilt.

## Voice

- Gentle friend + **minimal** (short; one idea per card).
- **Some** dry / self-aware humor (Co-Star-adjacent)—never hustle or shame.
- Edit `templates` arrays to change copy; keep `{placeholders}` intact.

## Thresholds (quick reference)

| Key | Value | Meaning |
|-----|-------|---------|
| `meetingHeavyHoursGte` | 10 | Meeting-heavy insight |
| `weekdayFreeMorningBefore` | 11:00 | Free morning = nothing before 11 Mon–Fri |
| `passionRblCrumbsHoursLt` | 3 | RBL “crumbs”; goal is 2× 2–3h blocks/week |
| `jobSearchThinHoursLt` | 2 | Thin week insight |
| `jobSearchDailyGoalHoursMin/Max` | 3–4 | Aspirational daily goal (trimester) |
| `adminHeavyHoursGte` | 4 | Admin **≥4h** — over your “stay under 4h/week” ceiling |
| `healthExerciseWeeklyHoursLt` | 5 | Exercise (sage) below weekly goal |
| `passionRblGoalBlocksPerWeek` | 2 | Intention: two 2–3h RBL blocks |
| `jobSearchDailyGoalHoursMin/Max` | 3–4 | Aspirational daily job-search (trimester) |
| `healthExerciseWeeklyHoursLt` | 5 | Exercise below weekly goal |
| `openWeekdayEveningsAfter20` | 20:00 | Weeknight “open evening” |

## Your color legend

See [calendar-colors.json](../config/calendar-colors.json). **ICS files usually omit colors**—swatch onboarding applies when Google sync exists; until then use **source calendar** + manual mapping.

| Color | Area |
|-------|------|
| Tangerine | Job search & brand |
| Blueberry | Passion / RBL |
| Lavender | Rest |
| Sage | Health / exercise |
| Basil | Meals & nourishment |
| Banana | Pets (Lua) — **any calendar** |

## Track-only areas

**Meals** (basil — lunch, dinner, supermarket, cooking) and **Pets** (banana — Lua, any calendar; beach/park keywords) appear in the allocation chart but do not generate insight cards unless you add rules later.

## Sample goals (in config)

Include: RBL 2× blocks; job search 3–4h daily (trimester); admin under 4h; exercise 5h/week; Lua quality time; meals/nourishment; free mornings; open evenings.

## Adding a rule

```json
{
  "id": "my_rule",
  "priority": 11,
  "when": { "hoursAreaLt": { "area": "rest", "hours": 5 } },
  "templates": ["Only {rest_hours}h of rest on the books. Worth noticing."]
}
```

## Placeholders (implemented in app later)

`{meeting_hours}`, `{free_mornings_before_11}`, `{rbl_hours}`, `{job_hours}`, `{admin_hours}`, `{health_hours}`, `{rel_hours}`, `{open_evenings_after_20}`, etc.

---

*After edits, dogfood one week and ask: does this feel true, not generic?*
