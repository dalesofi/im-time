# Insight rules & goals — editing guide

> Config: [insights-rules.json](../config/insights-rules.json) (v2) · [calendar-colors.json](../config/calendar-colors.json) · [life-areas-default.json](../config/life-areas-default.json)

## How it works

1. App computes **stats** for the selected Mon–Sun week (some rules use a **4-week rolling** window).
2. Rules are evaluated by **priority** (lower number = higher priority).
3. Up to **`maxCardsPerWeek` (3)** templates are shown.
4. **Titles** are used only for **keyword routing** (not shown in UI).

## Sleep

Sleep is **not** generally scheduled. The app does **not** infer sleep from empty calendar gaps. Only explicit blocks count (rare).

## Lavender — split routing

Lavender is **not** one life area. Default + keywords:

| Match (title, case-insensitive) | Life area |
|---------------------------------|-----------|
| `siesta`, `podcast`, `radio` | **Day rest** |
| `cleaning`, `limpiar`, `limpieza` | **Home cleaning** |
| `ropa`, `colada`, `laundry` | **Laundry & wardrobe** |
| *(lavender, no match)* | **Day rest** (default) |

See `keywordRoutes` on lavender in [calendar-colors.json](../config/calendar-colors.json).

## Thresholds (quick reference)

| Key | Value | Meaning |
|-----|-------|---------|
| `meetingHeavyHoursGte` | 10 | Meeting-heavy week |
| `dayRestDailyHoursMax` | 2 | Max **per day** for siesta/podcast/radio |
| `mealsWeeklyTargetHours` | 14 | OK band (~2h/day eating + ~4h prep) |
| `mealsWeeklyHighHoursGte` | 18 | Above band insight |
| `mealsWeeklyLowHoursLt` | 8 | Below band insight (implementation) |
| `homeCleaningMonthlyHoursMin` | 10 | Goal over ~4 weeks |
| `homeCleaningBlockHours` | 3 | Target block size |
| `homeCleaningBiweeklyWeeks` | 2 | Every two weeks |
| `laundryWeeklyHoursMin` | 2 | Ropa/colada weekly |
| `adminHeavyHoursGte` | 4 | Generic admin ceiling (separate from cleaning) |
| `passionRblCrumbsHoursLt` | 3 | RBL crumbs |
| `healthExerciseWeeklyHoursLt` | 5 | Exercise below goal |

## New rules (v2)

| Rule | When |
|------|------|
| `day_rest_over_daily` | Any day **>2h** day rest |
| `meals_weekly_high` | Meals **≥18h** / week |
| `meals_weekly_low` | Meals **&lt;8h** / week |
| `home_cleaning_monthly_low` | **&lt;10h** home cleaning over last **4 weeks** |
| `laundry_weekly_low` | Laundry **&lt;2h** this week |

## Color legend (unchanged except lavender)

| Color | Default area |
|-------|----------------|
| Lavender | **Split** — see table above |
| Tangerine | Job search & brand |
| Blueberry | Passion / RBL |
| Sage | Health / exercise |
| Basil | Meals & nourishment |
| Banana | Pets (Lua) — any calendar |

## Track-only

**Pets** — chart yes; insight cards only via Lua-specific rules later if needed.

## Sample goals (added in v2)

- Day rest: max ~2h/day  
- Meals ~14h/week  
- Home cleaning ~10h/month (3h every two weeks)  
- Laundry ~2h/week  

---

*Dogfood: if lavender events feel miscategorized, add keywords in `calendar-colors.json`.*
