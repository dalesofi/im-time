# I'm Time — MVP Product Spec

> **Tagline:** Make space for what matters.

**Related docs:** [idea.md](idea.md) (thesis) · [plan.md](plan.md) (phases & milestones) · [case-study.md](case-study.md) (portfolio narrative)

This document defines **what** v1 is, **for whom**, and **why**. It does not specify technology or how insights are generated—that is left as an open question for you to decide before build.

---

## 1. Product snapshot

**I'm Time** is a reflective web companion for people who are tired of optimization culture. It helps you see where your finite time actually went—and reflect on it with calm, honest interpretation instead of productivity scoring.

**Positioning**

| This is | This is not |
|---------|-------------|
| A reflective companion for finite humans | Another productivity or hustle app |
| Awareness and interpretation | Optimization, gamification, streaks |
| Compassionate honesty about tradeoffs | Shame, guilt, or “fix your calendar” framing |

**Inspired by:** humane time philosophy (e.g. *Four Thousand Weeks*) — peace comes from accepting limits within time, not mastering it.

**Platform (v1):** Responsive web app, desktop-first.  
**Data (v1):** Calendar via **ICS file import**; solo use (you try it yourself first).

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
2. **Upload ICS** — User exports a calendar file (e.g. last 7 days) and uploads it. App confirms date range and event count.
3. **Map life areas** *(first time or when needed)* — User assigns calendar signals (colors, keywords, or categories) to life areas: e.g. Work, Relationships, Rest, Admin, Other. Unmapped events → “Uncategorized.”
4. **Week at a glance** — Allocation view (hours and % by area) plus core stats (meeting hours, busiest day, largest open block, evenings without events).
5. **Insight cards** — 3–5 short observations about patterns in *this* week (compassionate, non-judgmental).
6. **Optional journal** — One prompt, e.g. *“What surprised you this week?”* User may skip.
7. **Weekly reflection** — Single page combining allocation, stats, insight cards, and optional journal text. Readable in under two minutes.
8. **Return next week** — User exports and uploads a new ICS file (manual habit in v1). Compare or replace week—behavior TBD (see open questions).

---

## 5. Scope

### In scope (v1)

| Area | Included |
|------|----------|
| Input | ICS file upload for a chosen date range |
| Mapping | Life-area rules (color/keyword → area); uncategorized bucket |
| Analysis | Time allocation by area; meeting count/hours; fragmentation signals; open/unscheduled time |
| Output | Week at a glance, insight cards, weekly reflection page |
| Journal | One optional text field per week (lite) |
| Persistence | Data survives refresh for solo use (approach TBD in build phase) |
| Accounts | None required for v1 |

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

- Google Calendar integration
- Trend views across multiple weeks/imports
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
- [ ] Recurring events and all-day events are handled in a documented, consistent way.
- [ ] User understands which week they are viewing.

**Tone / UX:** Reassuring copy about privacy (file stays local / not uploaded to a server—wording depends on build choices). No blame if export is wrong.

---

### 6.2 Life-area mapping

**Description:** User defines how calendar events roll up into meaningful life areas.

**Acceptance criteria**
- [ ] User can define at least four life areas (plus Uncategorized).
- [ ] Mapping rules can be applied (e.g. by calendar color or keyword—exact mechanism TBD at build).
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

**Tone / UX:** Charts feel spacious, not dashboard-dense. No red/green “good/bad” scoring.

---

### 6.4 Insight cards

**Description:** Short, human-readable observations derived from this week’s calendar patterns.

**Acceptance criteria**
- [ ] At least three distinct insight types can surface on realistic sample weeks (e.g. meeting load, personal time protection, unstructured time).
- [ ] Copy never uses shame language (see tone guardrails).
- [ ] Insights reference patterns, not moral judgment (“you failed to…”).
- [ ] If no strong pattern applies, show fewer cards or a gentle “quiet week” message—not filler noise.

**Tone / UX:** Reads like a thoughtful friend, not a coach optimizing output. *How insights are produced is an open question (see §10).*

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

### 6.7 Re-import (new week)

**Description:** User brings a new ICS export for a subsequent week.

**Acceptance criteria**
- [ ] Flow to upload a new file is obvious from home or reflection page.
- [ ] Behavior for replace vs merge vs history is **defined and documented** once you decide (open question).
- [ ] User always knows which week they are viewing.

**Tone / UX:** Gentle nudge to weekly ritual, not a streak (“don’t break the chain”).

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
- [ ] Resolved or consciously deferred each open question in §10.

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

## 10. Open questions

Resolve these by editing this doc (and [plan.md](plan.md)) before implementation.

1. **How should insight cards be generated?** (Rules, templates, manual curation, something else—decide without defaulting to “AI” in v1.)
2. **Re-import behavior:** Replace current week only, keep history of past weeks, or merge overlapping imports?
3. **Default life areas:** Offer defaults (Work, Relationships, Rest, Admin, Other) or start blank?
4. **Event titles in UI:** Show event titles anywhere, or only aggregated stats (privacy/simplicity)?
5. **Default date range on upload:** Last 7 days, calendar week (Mon–Sun), or user picks?
6. **Where does data live for v1 solo use?** (Browser only vs exportable backup—build decision, but product implications matter.)
7. **Comparison across weeks:** In v1, any week-over-week view, or strictly single-week reflection?
8. **“Live product” bar:** Is solo dogfood enough for portfolio, or do you want 3–5 friends on a staging URL before interviews?

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
│  [ Upload a new week ]                                       │
└─────────────────────────────────────────────────────────────┘
```

---

*Last updated: draft for your edit. When this stabilizes, use [plan.md](plan.md) to sequence build work.*
