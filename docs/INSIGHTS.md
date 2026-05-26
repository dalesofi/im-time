# Insight rules & goals — editing guide

> Config: [insights-rules.json](../config/insights-rules.json) (v2) · [calendar-colors.json](../config/calendar-colors.json) · [life-areas-default.json](../config/life-areas-default.json)

## How it works

1. App computes **stats** for the selected Mon–Sun week (some rules use a **4-week rolling** window).
2. Rules are evaluated by **priority** (lower number = higher priority).
3. Up to **`maxCardsPerWeek` (3)** templates are shown.
4. **Titles** are used only for **keyword routing** (not shown in UI).

## Sleep

Sleep is **not** generally scheduled. The app does **not** infer sleep from empty calendar gaps. Only explicit blocks count (rare).

## Lavender — social first

| Match | Life area |
|-------|-----------|
| *(lavender default)* | **Social life** (~10h/wk target) |
| `cleaning`, `limpiar`, `limpieza` | Home cleaning |
| `ropa`, `colada` | Laundry |
| `siesta`, `podcast` | Day rest |

## Blueberry — two meanings (ask user)

| Match | Life area |
|-------|-----------|
| `dj`, `djing`, `mix`, … | **DJing & music prep** (~10h/wk; €400/mo goal) |
| `rbl`, `fem barri`, `volunteer`, … | **RBL volunteer** |
| Ambiguous | Onboarding question |

## Related blocks (dual areas)

| Keyword / pattern | Areas |
|-------------------|--------|
| **CAPRIXXO** | `passion_rbl` + `djing_music` |
| Lavender errand (pickup, handoff) | `social_life` + `passion_rbl` |
| Lavender shower / skin / hair | `self_care` (~10h/wk) |
| Friend on banana/basil | compound — see onboarding doc |

Hours count toward **both** areas in CLI (v1). UI confirmation in v1.1.

## DJing keywords (titles, internal only)

`prep`, `sort`, `mix`, `dj`/`djing`, `gig`, `caprixxo`, … — **subcategories** (prep vs sort vs gig) planned for v2.

## Compound blocks

Friend's name on **banana** (Lua) or **basil** (meal) = social + pet/meal. See [calendar-onboarding.md](calendar-onboarding.md).

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
| `socialLifeWeeklyHoursLt` | 10 | Social (lavender) below target |
| `djingMusicWeeklyHoursLt` | 10 | DJing below target |
| `selfCareWeeklyHoursLt` | 10 | Self-care (lavender) below target |

## Week snapshot box (“mapped to your goals”)

Edit [config/week-snapshot.json](../config/week-snapshot.json):

| Section | Purpose |
|---------|---------|
| **priorityGoal** | Main season goal (PM Life 💼) — on target / thin / strong |
| **onTarget** | Areas that hit band this week (meals, pet care, self-care) |
| **gentleNudge** | Below target but important (exercise, DJing) |
| **alerts** | Radio Life if eating calendar space |
| **rhythm** | Structural chips (free mornings, open evenings) |

## Priorities (1–2 only)

See [priorities.md](priorities.md). Rules with `requiresPriority` only fire if that area is in `priorities.defaultForSofia` (dogfood: **job_search**, **djing_music**).

**Balance card:** `personal_care_vs_career_focus` when personal/care ≥30h and career &lt;18h.

## Targets tension

See [targets-audit.md](targets-audit.md). Job search **3–4h/day** is trimester-scale; weekly thin insight stays **&lt;2h**. Many **10h floors** together are ambitious—use **1–2 priorities** instead of guilting every floor.
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
