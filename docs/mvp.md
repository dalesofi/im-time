# I'm Time — MVP Product Spec

> **Tagline:** Make space for what matters.

**Related docs:** [idea.md](idea.md) (thesis) · [features.md](features.md) (build list) · [tech.md](tech.md) (implementation) · [INSIGHTS.md](INSIGHTS.md) (rules & goals) · [plan.md](plan.md) (phases) · [case-study.md](case-study.md) (portfolio narrative)

This document defines **what** v1 is, **for whom**, and **why**. Build order and acceptance: [features.md](features.md). Technical notes: [tech.md](tech.md).

---

## 1. Product snapshot

**I'm Time** is a reflective web companion for people who are tired of optimization culture. It helps you see where your finite time actually went—and reflect on it with calm, honest interpretation instead of productivity scoring.

**Core learning:** calendars encode *how you already organize meaning* (colors, names, annotations). The product must **ask how you code and label time** before interpreting—otherwise insights are wrong. See [calendar-onboarding.md](calendar-onboarding.md).

**Differentiator (beyond v1 stats):** The product **learns about you through questions**—curious, specific, skippable—not through optimization scoring. Users become conscious of patterns by **participating** (mapping, reflection prompts), not by being told what to fix. **Reflection-powered**, not AI-as-hero. See [curiosity-reflection.md](curiosity-reflection.md).

**Positioning**

| This is | This is not |
|---------|-------------|
| A reflective companion for finite humans | Another productivity or hustle app |
| Awareness and interpretation | Optimization, gamification, streaks |
| Curious observation (“what kind of week was this?”) | Goal tracking and performance dashboards |
| Learning via the right questions | Guessing meaning from data alone |
| Compassionate honesty about tradeoffs | Shame, guilt, or “fix your calendar” framing |

**Inspired by:** humane time philosophy (e.g. *Four Thousand Weeks*) — peace comes from accepting limits within time, not mastering it.

**Platform (v1):** Responsive web app, desktop-first.  
**Data (v1):** Calendar via **ICS** (upload in product; dogfood uses [calendars/merged.ics](../calendars/merged.ics) from three personal exports). Solo use first.

---

## 2. MVP goal

**One sentence:** Help someone understand how they actually spent a week and reflect on it without feeling judged or pushed to optimize.

### User outcomes (v1)

1. **Clarity** — See where time went (by life area, meetings, unstructured gaps).
2. **Calm** — Experience insights as observation, not verdict.
3. **Reflection** — Optional weekly moment to notice surprise or gratitude alongside the data.

### Your outcomes (builder / portfolio)

- Dogfood the product for several weeks with your own calendar exports.
- Produce a credible before/after or tradeoff story for your portfolio site.
- Ship a thin live loop you can screenshot and discuss in interviews—without claiming “I built this only for myself” as the product definition.

---

## 3. Target user & problem

### Primary persona: the reflective optimizer

- Uses a digital calendar regularly (work + personal blocks).
- Has tried productivity tools and feels vaguely exhausted or guilty using them.
- Wants **awareness** and alignment with values—not another system to “win” at planning.

**Job to be done:**  
*When my week ends, I want to understand how I actually spent my time and feel calmer about the tradeoffs I made—not more pressure to fix everything.*

### Anti-persona (v1)

- Teams needing shared calendars or admin controls.
- Users who require live Google Calendar sync on day one.
- People who want task management, habit streaks, or efficiency maximization as the core loop.

### Problem statement

Most calendar tools show *what* is scheduled. They rarely help people see *patterns*—meeting load, protected vs reactive time, where rest and relationships sit—and almost never frame those patterns with compassion. The result is either ignoring the data or feeling bad about it. I'm Time fills the gap between raw calendar data and humane reflection.

---

## 4. Hero journey (v1 happy path)

One path only. Every v1 feature should support this flow.

1. **Land** — Short welcome: what I'm Time is (2–3 lines) and what it is not. Calm, spacious tone.
2. **Load calendar data** — Product: user uploads one `.ics` file. Dogfood: app reads merged personal calendar (Button School + RBL + personal). User **selects week** (from/to dates). Default suggestion: last complete Mon–Sun or saved dogfood week (17–23 May 2026).
3. **Calendar meaning interview** — Short onboarding: what each color means, how you label blocks, when one color = two meanings ([calendar-onboarding.md](calendar-onboarding.md)). Then map to life areas ([calendar-colors.json](../config/calendar-colors.json)). User edits labels—no raw event titles in UI.
4. **Week at a glance** — Allocation view (hours and % by area) plus core stats (meeting hours, busiest day, largest open block, evenings without events). **Aggregates only**—see the forest, not every tree.
5. **Insight cards** — 3–5 short observations from **rules + templates + data analysis** (compassionate, non-judgmental; no LLM in v1).
6. **Optional journal** — One prompt, e.g. *“What surprised you this week?”* User may skip.
7. **Weekly reflection** — Single page combining allocation, stats, insight cards, and optional journal text. Readable in under two minutes.

**Not in v1 hero path:** re-import, week history, or week-over-week comparison (see [Product decisions §10](#10-product-decisions) and [tech.md §3](tech.md#3-re-import-modes-product--tech)).

---

## 5. Scope

### In scope (v1)

| Area | Included |
|------|----------|
| Input | ICS (upload); dogfood: [calendars/merged.ics](../calendars/merged.ics) (3 personal calendars merged) |
| Date range | Default **last 7 days**; data may span longer in file—filter for weekly view |
| Mapping | Source calendar + **color swatch onboarding** (when colors available); [life-areas-default.json](../config/life-areas-default.json); editable labels |
| Insights config | [insights-rules.json](../config/insights-rules.json) — rules, thresholds, sample goals |
| Analysis | Time allocation by area; meeting count/hours; open/unscheduled time; **no event titles in UI** |
| Insights | [insights-rules.json](../config/insights-rules.json) — rules + templates (not LLM); max 3 cards/week |
| Output | Week at a glance, insight cards, weekly reflection page |
| Journal | One optional text field per week (lite) |
| Persistence | Calendar truth in `calendars/`; mapping/journal in browser local storage for v1 |
| Re-import / history | **Out of v1** — single analysis session; history + compare in v1.1 |
| Accounts | **None for v1** — onboarding + mapping in **localStorage** (no server session) |

### Out of scope (v1)

- Google Calendar OAuth / live sync
- Todo or task import
- Full gratitude / surprise journal
- Gentle planning assistant, prioritization exercises
- Pattern detection framed as “burnout AI” or therapist-like coaching
- Gamification, streaks, notifications
- Multi-user, sharing, teams
- Native mobile app

### Later (v1.1 / v2 — not committed)

- Re-import and **week history** (replace vs merge vs compare—see [tech.md §3](tech.md#3-re-import-modes-product--tech))
- Week-over-week and **trimester / monthly / annual** views
- Google Calendar integration
- Multi-calendar upload in UI (merge like `merged.ics`)
- User research / small beta cohort
- Richer journaling and “unplanned moments” surfacing
- Gentle planning suggestions and anti-overplanning nudges
- Intentional prioritization exercises
- Lightweight todo system aligned with “enough for today”

*Full vision lives in [idea.md](idea.md).*

---

## 6. Feature requirements

Format: **Description** → **Acceptance criteria** → **Tone / UX notes**

### 6.1 ICS import

**Description:** User uploads a standard `.ics` export. App parses events for the selected window.

**Acceptance criteria**
- [ ] Valid ICS file parses successfully; user sees event count and date range.
- [ ] Invalid or empty file shows a clear, friendly error (no technical stack trace).
- [ ] Recurring events handled consistently; **all-day events do not count toward hour totals** (tracked separately—see [tech.md §12](tech.md#12-technical-decisions-resolved)).
- [ ] User understands which week they are viewing.

**Tone / UX:** Reassuring copy about privacy (client-side parse preferred when upload exists). No blame if export is wrong. Dogfood: three exports merged into one file—see [calendars/README.md](../calendars/README.md).

---

### 6.2 Life-area mapping

**Description:** User defines how calendar events roll up into meaningful life areas.

**Acceptance criteria**
- [ ] User can define at least four life areas (plus Uncategorized).
- [ ] Mapping rules can be applied (source calendar, color/keyword, or user override).
- [ ] User can add/rename life areas beyond defaults.
- [ ] Unmapped events appear under Uncategorized; user can refine mapping and see updated allocation.
- [ ] Mapping persists for solo user across sessions.

**Tone / UX:** Areas feel personal, not corporate. Suggested defaults may be offered but user can rename/remove.

---

### 6.3 Allocation view (week at a glance)

**Description:** Visual summary of how time distributed across life areas for the imported week.

**Acceptance criteria**
- [ ] Shows total scheduled time and hours/% per life area.
- [ ] Empty or near-empty weeks handled gracefully.
- [ ] Core stats visible without drilling down: e.g. meeting hours, number of days with back-to-back blocks, largest single open block, count of evenings with no scheduled events.

**Tone / UX:** Charts feel spacious, not dashboard-dense. No red/green “good/bad” scoring. **No raw event titles**—only life areas and pattern-level stats (“forest, not trees”).

---

### 6.4 Insight cards

**Description:** Short, human-readable observations derived from this week’s calendar patterns.

**Acceptance criteria**
- [ ] At least three distinct insight types can surface on realistic sample weeks (e.g. meeting load, personal time protection, unstructured time).
- [ ] Copy never uses shame language (see tone guardrails).
- [ ] Insights reference patterns, not moral judgment (“you failed to…”).
- [ ] If no strong pattern applies, show fewer cards or a gentle “quiet week” message—not filler noise.

**Tone / UX:** Reads like a thoughtful friend, not a coach optimizing output. **v1 mechanism:** rules + templates + data analysis (see [features.md F5](features.md#f5--insight-cards)).

---

### 6.5 Lite weekly journal

**Description:** One optional reflective prompt tied to the week.

**Acceptance criteria**
- [ ] Single prompt displayed (default: *“What surprised you this week?”*).
- [ ] User can submit text or skip entirely.
- [ ] Journal text appears on weekly reflection page if provided.
- [ ] No streaks, reminders, or guilt for skipping.

**Tone / UX:** Optional is obvious. Skipping is neutral, not a “missed” state.

---

### 6.6 Weekly reflection page

**Description:** The culminating view: allocation + stats + insight cards + optional journal.

**Acceptance criteria**
- [ ] All v1 outputs visible on one scrollable page.
- [ ] Readable in under two minutes.
- [ ] Layout works for portfolio screenshots (clear hierarchy, legible type).
- [ ] User can return to this page for the current stored week without re-uploading.

**Tone / UX:** Feels like closing a notebook, not completing a performance review.

---

### 6.7 Re-import & history — deferred to v1.1

**Not in v1.** Documented so build stays focused.

| Mode | Meaning |
|------|---------|
| **Replace** | New upload replaces the current snapshot (one active week). |
| **Merge** | New events join current data; requires UID dedupe (like `merged.ics`). |
| **History** | Each week stored separately; browse and compare over time. |

**v1:** Single load → analyze default range → reflect. **v1.1:** Re-import + history + comparison (your stated preference). Details: [tech.md §3](tech.md#3-re-import-modes-product--tech).

---

## 7. Content & tone guardrails

Aligned with [idea.md](idea.md) product principles.

### The product should feel

Calm · spacious · reflective · humane · honest · gentle

### The product should avoid

Hustle language · gamification · streak obsession · productivity guilt · hyper-efficiency framing · treating the user like a machine

### Insight card copy — examples

**Do**

- “About 38% of your scheduled time this week was in meetings. That’s a heavy load—worth noticing how it felt, not fixing overnight.”
- “Your longest open block was Tuesday afternoon. Unstructured time showed up, even if briefly.”
- “Evenings with nothing on the calendar appeared three times this week. That’s space—even if it didn’t all feel restful.”

**Don’t**

- “You wasted 12 hours on low-value meetings.”
- “You failed to protect personal time.”
- “Optimize tomorrow by cutting meetings 40%.”
- “Great job! You’re 85% efficient this week.”

---

## 8. Success metrics

### Learning (you, during dogfood)

- [ ] Completed at least **4** weekly import → reflection cycles.
- [ ] Can articulate **one** tradeoff you noticed (e.g. “I schedule rest but fill gaps with admin”).
- [ ] Product decisions in §10 reflected in shipped v1 (or consciously deferred in writing).

### Product (if you share with others later)

| Metric | Target (directional) |
|--------|----------------------|
| Time to first meaningful view | Under 3 minutes from landing to allocation + at least one insight |
| Journal completion | Track % who optional-prompt; no target pressure in v1 |
| Qualitative | Users describe feeling “calmer,” “seen,” or “less guilty”—not “more productive” |

### Portfolio

- [ ] 1 tradeoff or before/after story (can be your own, framed as founder dogfood).
- [ ] 3 screenshots from weekly reflection page.
- [ ] 1 quote or reflection snippet (with permission if from someone else).

*Hiring narrative lives in [case-study.md](case-study.md).*

---

## 9. Assumptions & risks

### Assumptions

- Users can export ICS from Google Calendar, Apple Calendar, Outlook, or similar.
- Manual weekly re-import is acceptable for v1 solo dogfood.
- Life-area mapping by color/keyword is “good enough” without machine learning.
- Interpretation (insight cards) can deliver value without live calendar sync.

### Risks

| Risk | Impact | Mitigation (product/process) |
|------|--------|----------------------------|
| ICS formats vary | Wrong counts or missing events | Decide edge-case rules before build; test with 2–3 real exports |
| Manual import friction | User abandons after week 1 | Keep upload flow minimal; weekly reflection must feel worth it |
| Insights feel generic | Weak differentiation | Invest in copy and pattern rules; resolve “how insights are generated” deliberately |
| Scope creep | Miss portfolio timeline | Hold v1 to this doc; defer [idea.md](idea.md) features explicitly |
| Shame leakage in copy | Breaks thesis | Copy review against §7 before calling v1 done |

---

## 10. Product decisions

Locked from scoping (May 2026). Synced to [plan.md §10](plan.md#10-decisions-log), [features.md](features.md), [tech.md](tech.md), [case-study.md §7](case-study.md#7-key-decisions--tradeoffs).

| # | Decision | v1 choice | Later |
|---|----------|-----------|--------|
| 1 | **Insight cards** | Rules + templates + data analysis | LLM not in v1 |
| 2 | **Re-import** | **None** — single analysis session | v1.1: history + week compare |
| 3 | **Life areas** | Defaults (Work, Relationships, Rest, Admin, Other) + user add/edit (Health, Hobbies, Pets, etc.) | — |
| 4 | **Event titles in UI** | **No** — aggregates only; user edits **labels** we assign; “forest, not trees” metaphor in copy | — |
| 5 | **Default date range** | **Last 7 days** (weekly reflection) | Monthly, annual, trimester overview in v1.1+ |
| 6 | **Calendar data (dogfood)** | Source exports + [merged.ics](../calendars/merged.ics) in `calendars/` | Upload UI; multi-file merge in product |
| 7 | **Week comparison** | **Out of v1** UI; merged file can hold years of data for future ranges | Stretch: trimester view; user-chosen “main mode” |
| 8 | **Live / research bar** | Solo dogfood enough for portfolio | User research & beta in later iteration ([plan.md](plan.md) Phase 3) |

### Re-import modes (reference for v1.1)

Explained in [tech.md §3](tech.md#3-re-import-modes-product--tech). **v1 intentionally skips all three** in the UI: load once, reflect, done.

### Technical decisions (see [tech.md §12](tech.md#12-technical-decisions-resolved))

| Topic | Choice |
|-------|--------|
| Week boundary | **Mon–Sun** calendar week |
| All-day events | **Not counted as hours**; separate day-level tracking |
| Meeting detection | **ATTENDEE** = meeting; heavy week **≥10h** |
| Persistence | **localStorage** + seed configs in `config/` |
| Insights | **[insights-rules.json](../config/insights-rules.json)** + [INSIGHTS.md](INSIGHTS.md) |
| Colors | **[calendar-colors.json](../config/calendar-colors.json)** — ICS often has no colors; swatch onboarding in product |
| Stack | **pnpm** + **vanilla JS** first → **Vite** later |

### Insight thresholds & goals (your dogfood — May 2026)

| Signal | Threshold / intention |
|--------|------------------------|
| Admin (generic) | Insight when **≥4h/week** (goal: stay **under 4h**) |
| RBL | Crumbs **&lt;3h**; goal **2× 2–3h blocks**/week |
| Job search | Thin week **&lt;2h**; aspiration **3–4h daily** (trimester) |
| Exercise (sage) | Insight when **&lt;5h/week** |
| **Day rest** (lavender: siesta, podcast, radio) | OK; insight if **&gt;2h on any day** |
| **Meals** (basil) | Target **~14h/week** (~2h/day + ~4h prep); insights if far off band |
| **Home cleaning** (lavender + limpiar/limpieza) | **~10h/month**; **3h** blocks every **2 weeks** |
| **Laundry** (lavender + ropa/colada) | **~2h/week** |
| Pets (banana / Lua) | Always pets, any calendar; chart (track-only insights) |
| **Sleep** | Not scheduled by default — not inferred from gaps |
| **Lavender** | Default **social life** (~10h/wk); keywords → cleaning / laundry / day rest |
| **Blueberry** | **RBL volunteer** vs **DJing/music prep** (same color — must ask); DJ ~10h/wk, €400/mo goal |
| **Related blocks** | CAPRIXXO → RBL+DJing; lavender errands → social+RBL ([calendar-onboarding.md](calendar-onboarding.md)) |
| **Compound blocks** | Friend on banana/basil = social + pet/meal |
| **DJing labels** | prep, sort, mix, …; verb subcategories later |
| **Self-care (lavender)** | Showers, skin/hair; **~10h/week** target |
| **Onboarding UX** | Skip / later / edit anytime; **localStorage**, no session ([onboarding-ux.md](onboarding-ux.md)) |
| **Targets tension** | [targets-audit.md](targets-audit.md) — job search daily is aspiration, not weekly budget |
| **Curiosity & questions** | Learn via interview + reflection; not AI-as-hero ([curiosity-reflection.md](curiosity-reflection.md)) |
| **1–2 priorities** | Hard nudges only for user-chosen priorities; rest OK lighter ([priorities.md](priorities.md)) |
| **Label clarifications** | Ask once for cryptic titles (names, parties); store in config |
| **Career vs personal/care** | Observe when care time high & career blocks thin (not shame) |
| Work calendar | Mapped, **no work insight cards** |

**Scaffold:** [tech.md §13](tech.md#13-scaffold-plan-next--no-code-until-you-say-go) — say **go scaffold** when ready.

---

## 11. Wireframe sketch (weekly reflection)

```
┌─────────────────────────────────────────────────────────────┐
│  I'm Time                          Week of May 19 – May 25   │
├─────────────────────────────────────────────────────────────┤
│  [ Allocation: Work 42% │ Relationships 15% │ Rest 18% … ] │
│  [ ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ] │
├─────────────────────────────────────────────────────────────┤
│  This week in numbers                                        │
│  · 14h in meetings   · Busiest: Wednesday                    │
│  · Longest open block: Tue 2–5pm   · 3 unstructured evenings │
├─────────────────────────────────────────────────────────────┤
│  ┌ Insight ─────────────────────────────────────────────┐  │
│  │ Meeting load was high this week—worth noticing how     │  │
│  │ it felt, not fixing overnight.                         │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌ Insight ─────────────────────────────────────────────┐  │
│  │ …                                                      │  │
│  └────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  What surprised you this week? (optional)                    │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                                                         │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  (v1.1: Upload a new week)                                   │
└─────────────────────────────────────────────────────────────┘
```

---

*Last updated: May 2026 — decisions in §10. Build via [features.md](features.md) and [plan.md](plan.md).*
