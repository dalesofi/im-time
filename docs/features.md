# I'm Time — Features (v1 build list)

> **What to build and in what order.** Product “why” lives in [mvp.md](mvp.md). Tech notes in [tech.md](tech.md). Phases in [plan.md](plan.md).

**Tagline:** Make space for what matters.

---

## v1 in one line

Load calendar data → map to life areas → show allocation + stats → show rule-based insight cards → optional journal line → one **weekly reflection** page.

**Not in v1:** re-import, week history, Google sync, AI, event titles in UI, user research cohort.

---

## Build order

| # | Feature | What “done” means |
|---|---------|-------------------|
| 1 | **Data load + week picker** | Read `calendars/merged.ics`; user picks **from/to** dates ([week.html](../public/week.html)); dogfood preset 17–23 May 2026 |
| 2 | **Calendar meaning + mapping** | Onboarding interview (questions = product); swatches + keywords; [calendar-onboarding.md](calendar-onboarding.md), [curiosity-reflection.md](curiosity-reflection.md) |
| 3 | **Allocation view** | Hours and % per life area; total scheduled time; no event titles—aggregates only (“forest, not trees”) |
| 4 | **Core stats** | Meeting hours/count, busiest day, longest open block, evenings without events |
| 5 | **Insight cards** | Rule/template patterns; **1–2 priorities** get hard nudges; balance signal ([priorities.md](priorities.md)) |
| 6 | **Lite journal** | One optional prompt; skip is neutral; shows on reflection page if filled |
| 7 | **Weekly reflection page** | Single scrollable page: allocation + stats + insights + journal; portfolio-screenshot ready |
| 8 | **Landing** | 2–3 line welcome; calm positioning |

---

## Feature specs (v1)

### F1 — Data load

**What:** Ingest ICS events for analysis.

**How (v1 dogfood):** Read [calendars/merged.ics](../calendars/merged.ics) from repo.

**How (v1 product shape):** User uploads one `.ics` file; same parser.

**Rules:**
- Respect timezones; document handling of all-day and recurring events.
- **User selects week** (start + end date). Preset: dogfood week 17–23 May 2026. Product default suggestion: last complete Mon–Sun ([data-display.md](data-display.md)).
- Count events; show date range to user.
- Invalid file → friendly error.

**Later:** Multi-file upload merging three calendars in UI (mirror merge script behavior).

---

### F2 — Calendar meaning + life-area mapping

**What:** Learn *how the user codes their calendar*, then roll events into life areas.

**Why:** Same color can mean social life, DJing, or laundry. Without asking, interpretation is wrong ([calendar-onboarding.md](calendar-onboarding.md)).

**How (onboarding):**
- Interview from [onboarding-questions.json](../config/onboarding-questions.json): colors used, lavender = ?, blueberry split ?, compound banana/basil + names?
- **Every question:** Answer · Skip · Set later — always editable ([onboarding-ux.md](onboarding-ux.md)).
- **No login for v1** — `localStorage` on device; CLI/config for dogfood now.
- Google-like **swatch → area**; allow **one color → multiple areas** with label rules.
- Revisit when insights feel generic.

**How (mapping):**
- Seed from [config/life-areas-default.json](../config/life-areas-default.json) and [config/calendar-colors.json](../config/calendar-colors.json).
- **Source calendar:** `buttonschool` → Work (insights silent); `rbl` → **radio** (community radio); `personal` → uncategorized until colored.
- **Color onboarding (product):** Google-like swatches → life area (ICS exports usually **lack colors**; full value with Google sync v1.1).
- **Your legend:** tangerine → job search; blueberry → radio vs DJing (keywords/onboarding); sage → exercise; basil → meals; banana → Lua/pets (any calendar).
- **Lavender default → social life** (~10h/wk); person/event names. Keywords: **self-care** (shower, skin/hair), cleaning, laundry, siesta/podcast.
- **Blueberry → radio volunteer** *or* **DJing/music prep** (keywords + onboarding); DJ ~10h/wk, income goal note in goals.
- **Related blocks:** CAPRIXXO → radio + DJing; lavender errands → social + radio; hours can count in both.
- **DJing keywords:** prep, sort, mix, … (verb subcategories = v2).
- **Compound blocks (v1.1):** friend's name on banana or basil = social + pet/meal; insight = integration not hustle.
- **Sleep:** not inferred; only explicit blocks.
- User can **rename, add, delete** areas; edit labels—no event titles in UI.
- **Insights on:** meals band, day rest daily cap, home cleaning (4-week window), laundry weekly.
- **Track-only insights:** Pets (chart always; Lua goals in sampleGoals).

**UI principle:** Show **category labels**, not raw event titles ([mvp.md §10](mvp.md#10-product-decisions)).

---

### F3 — Allocation view

**What:** “Where did my time go?”

**How:**
- Bar or simple breakdown: hours + % per life area.
- Spacious layout; no red/green scoring.
- Copy may use **forest / trees** metaphor in onboarding (“patterns, not every appointment”).

---

### F4 — Core stats

**What:** Supporting numbers for the week (or selected range).

**How (minimum set):**
- Total scheduled hours
- Meeting hours + meeting count
- Busiest day (by scheduled hours)
- Longest single open block
- Count of evenings (e.g. after 18:00) with zero scheduled events

---

### F5 — Insight cards

**What:** Short, humane observations—not optimization tips.

**How:**
- **Rules + templates + data analysis** (no LLM in v1).
- Config: **[config/insights-rules.json](../config/insights-rules.json)** — see [INSIGHTS.md](INSIGHTS.md). Thresholds include: meetings ≥10h; admin ≥4h; radio (“crumbs”) **&lt;3h**; job **&lt;2h**; exercise **&lt;5h**; mornings/evenings per tech.md.
- Each rule: `when` clause on stats → fill template slots (`{meeting_percent}`, etc.).
- Minimum 3 distinct insight types on a realistic week.
- If nothing fits → fewer cards or a quiet-week message.

**Collaboration (before/during F5):** You can draft templates and thresholds; we wire evaluation in `src/lib/insights.js`.

**Example rules (draft):**
- High meeting load
- Personal/rest blocks rare vs work
- Unstructured evenings present (or absent)
- Heavy day clustered mid-week

**Sample goals** in config (intentions, not streaks): radio 2× blocks; job search 3–4h daily (trimester); admin under 4h; exercise 5h/week; Lua quality time; meals/nourishment; free mornings; open evenings.

---

### F6 — Lite journal

**What:** Optional reflection counterweight to data.

**How:**
- Default prompt: *“What surprised you this week?”*
- Textarea; explicit Skip.
- Persist with the current analysis session (see [tech.md](tech.md) for storage).

---

### F7 — Weekly reflection page

**What:** The “close the notebook” view.

**How:**
- Sections: date range → allocation → stats → insight cards → journal (if any).
- Readable in &lt; 2 minutes.
- No “upload new week” button in v1.

---

### F8 — Landing

**What:** Orient the user.

**How:**
- What I'm Time is / is not (2–3 lines).
- CTA to run analysis (dogfood: “View my week” using merged data).

---

## Explicitly not v1 (see [mvp.md §5](mvp.md#5-scope))

| Feature | Target |
|---------|--------|
| Re-import / new week upload | v1.1 |
| Week history + comparison | v1.1 |
| Trimester / monthly / annual views | v1.1+ |
| Google Calendar OAuth | v1.1 |
| LLM-generated insights | v2 or never |
| Event titles in UI | Out (aggregates only) |
| User research / private beta | Post–portfolio MVP |
| Compound-block insights | v1.1 |
| Related-blocks UI (CAPRIXXO, errands) | v1.1 |
| DJing verb subcategories (prep/sort/…) | v2 |
| Full onboarding UI | v1.1 (config exists now) |
| **Curiosity prompts** (pattern-triggered questions, ambiguity follow-ups) | v1.1–v2 — [curiosity-reflection.md](curiosity-reflection.md) |
| Tasks, planning assistant, full journal | v2 |

---

## Stretch (only if core loop ships early)

Documented interest, **not committed:**

- Wider date range on same import (e.g. 13-week “trimester” overview).
- User picks primary mode: weekly vs longer horizon.

Do not start stretch until F1–F7 are done and dogfood-ready.

---

## Acceptance checklist (ship v1)

- [ ] merged.ics loads; last-7-days view looks plausible vs Google Calendar memory
- [ ] Life areas editable; mapping persists
- [ ] Allocation + stats match manual spot-check for one week
- [ ] ≥3 insight types fire; no shame language
- [ ] Journal optional works
- [ ] Reflection page screenshot-ready
- [ ] You can tell one tradeoff story ([case-study.md §11](case-study.md#11-open-narrative-gaps))

---

*When a feature changes, update this file and [mvp.md](mvp.md) §6 together.*
