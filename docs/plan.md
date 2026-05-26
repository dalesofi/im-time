# I'm Time — Build Plan (phases only)

> **No tech stack. No AI choices. No code tasks.**  
> This document sequences *when* and *in what order* work happens. Implementation decisions come after you’ve edited [mvp.md](mvp.md) and [case-study.md](case-study.md).

**Related docs:** [mvp.md](mvp.md) (what to build) · [case-study.md](case-study.md) (portfolio story) · [idea.md](idea.md) (long-term vision)

---

## 1. North star for build

**Product north star:** Help someone see where their week went and reflect on it with calm interpretation—not optimization pressure.

**Process north star:** Documentation first → resolve open questions → build the smallest loop that satisfies [mvp.md](mvp.md) acceptance criteria → dogfood → polish for portfolio.

**Do not start implementation until:**
- Open questions in [mvp.md §10](mvp.md#10-open-questions) are answered or explicitly deferred with a note.
- You’re comfortable describing the hero journey in one minute.

---

## 2. Phase 0 — Validate documentation

**Goal:** Turn drafts into decisions you trust.

### Activities

- [ ] Read and edit [mvp.md](mvp.md) (scope, features, tone examples).
- [ ] Read and edit [case-study.md](case-study.md) (pitch, hypotheses, tradeoffs table).
- [ ] Resolve or defer each item in [mvp.md §10](mvp.md#10-open-questions).
- [ ] Export your own calendar as ICS twice (two different weeks) to sanity-check feasibility.
- [ ] *(Optional)* Talk to 2–3 people who match the reflective optimizer persona; capture notes in case-study §4.

### Exit criteria

- [ ] mvp.md has no “TBD” on items you consider blocking (or blockers are listed in §9 below with owner: you).
- [ ] You can explain v1 in one sentence and one hero journey without opening idea.md.

**Estimated effort:** A few focused sessions (not calendar weeks)—you set the pace.

---

## 3. Phase 1 — Core awareness loop

**Goal:** ICS in → allocation + insight cards → weekly reflection (including optional journal). Solo dogfood ready.

**Maps to mvp.md features:** §6.1–6.6 (import, mapping, allocation, insights, journal, reflection page).

### Outcomes (not tickets)

- [ ] Upload ICS and see correct week boundaries and event count.
- [ ] Map events to life areas; allocation view updates.
- [ ] Week at a glance shows hours/% and core stats.
- [ ] At least three insight card types can appear on a real week of your data.
- [ ] Optional journal prompt saves and appears on reflection page.
- [ ] Single weekly reflection page satisfies mvp.md §6.6 acceptance criteria.
- [ ] You’ve completed **one** full loop with your own calendar.

### Exit criteria

- [ ] All “In scope (v1)” items in [mvp.md §5](mvp.md#5-scope) are either done or cut with a note in mvp.md.
- [ ] Copy pass against [mvp.md §7](mvp.md#7-content--tone-guardrails) (no shame language).

**Dependencies before starting Phase 1:** See §7.

---

## 4. Phase 2 — Polish for portfolio

**Goal:** Make v1 credible on a portfolio page and pleasant for repeated weekly use—still solo dogfood.

### Outcomes

- [ ] Re-import flow for a new week (per decision in mvp.md §10.2).
- [ ] Empty states and error states feel on-brand (calm, not alarming).
- [ ] Weekly reflection page is screenshot-ready (hierarchy, spacing, readable type).
- [ ] Landing / welcome copy matches positioning (2–3 lines, not a manifesto).
- [ ] You’ve completed **four** weekly loops (mvp.md §8 learning metrics).
- [ ] Fill portfolio placeholders in [case-study.md §10–11](case-study.md#10-portfolio-artifacts-checklist).

### Exit criteria

- [ ] Definition of done (§10) met.
- [ ] case-study.md narrative gaps (§11) updated with at least one real tradeoff story.

---

## 5. Phase 3 — Stretch (optional, not scheduled)

Only after Phase 2 is done and you still have energy. **None of this is required for v1.**

| Item | Notes |
|------|--------|
| Google Calendar sync | Replaces manual ICS habit |
| Week-over-week comparison | Trends across imports |
| Richer journal | Multiple prompts, surprise/gratitude from idea.md |
| Gentle planning nudges | Anti-overplanning suggestions |
| Prioritization exercises | “What to fail at this season” |
| Private beta (5–10 users) | Requires hosting + maybe accounts—decide then |

Pull full vision from [idea.md](idea.md); do not expand Phase 3 without cutting something or extending timeline consciously.

---

## 6. Milestones checklist (by phase)

### Phase 0
- [ ] mvp.md edited and “ready for build”
- [ ] case-study.md edited
- [ ] ICS export tested on your calendar
- [ ] Open questions resolved or deferred in writing

### Phase 1
- [ ] ICS import works
- [ ] Life-area mapping works
- [ ] Allocation + stats work
- [ ] Insight cards work (mechanism chosen)
- [ ] Lite journal works
- [ ] Weekly reflection page works
- [ ] First personal dogfood week complete

### Phase 2
- [ ] Re-import works
- [ ] Empty/error states done
- [ ] Visual polish for screenshots
- [ ] Four dogfood weeks complete
- [ ] case-study.md artifacts checklist started

### Phase 3 (optional)
- [ ] *You define if/when*

---

## 7. Dependencies

Work in this order where possible:

```text
mvp.md decisions (especially §10)
    ↓
Insight card patterns + copy (what to say, when)
    ↓
ICS import behavior (date range, edge cases)
    ↓
Life-area mapping
    ↓
Allocation + stats
    ↓
Insight cards (wired to stats)
    ↓
Lite journal
    ↓
Weekly reflection page (layout combines all outputs)
    ↓
Re-import behavior
    ↓
Polish + portfolio capture
```

**Blocking decisions (from mvp.md):**
- Insight generation approach → before building insight cards.
- Re-import replace vs history → before building re-import.
- Event titles vs aggregates only → before any UI that lists events.

---

## 8. Risks & contingencies

| Risk | Signal | Contingency |
|------|--------|-------------|
| Timeline slip (part-time solo) | Phase 1 not started weeks after Phase 0 | Cut re-import to Phase 2; reduce insight card types to 2 |
| ICS quirks | Hours don’t match calendar app | Document rules; narrow v1 to one calendar provider you test |
| Insights feel weak | You don’t trust cards on your own data | Pause build; rewrite insight patterns in mvp.md §7; consider manual cards for dogfood |
| Scope creep | Building journal/planning/sync “while here” | Re-read mvp.md §5 Out of scope; move idea to Phase 3 |
| Portfolio without users | Interviews ask “who used it?” | Lead with dogfood + optional 2–3 conversations; honest n in case-study |

---

## 9. Open build questions

*Fill these in when you start implementation planning. Leave blank until then.*

### Product (should be answered in mvp.md first)

- [ ] Insight generation approach: ___
- [ ] Re-import behavior: ___
- [ ] Default life areas: ___
- [ ] Event titles in UI: ___
- [ ] Week comparison in v1: ___

### Implementation (decide in a future tech appendix or here)

- [ ] Stack / framework: ___
- [ ] Where data persists for solo v1: ___
- [ ] Hosting / URL (if any for portfolio): ___
- [ ] Privacy copy (local-only vs server): ___

### AI / automation (optional future appendix)

- [ ] Use automated interpretation in v1? Yes / No / Later
- [ ] If yes, what inputs and what guardrails: ___

---

## 10. Definition of done (v1)

v1 is **done** when all of the following are true:

1. **mvp.md** acceptance criteria for §6.1–6.7 are met (or consciously cut with doc update).
2. You have used the product for **four** weekly cycles with your own ICS exports.
3. You can tell **one** specific tradeoff story (written in case-study.md §11).
4. Weekly reflection page is **portfolio-ready** (screenshots you’d show a hiring manager).
5. No shame-language violations per mvp.md §7 on shipped copy.
6. case-study.md artifacts checklist has at least: pitch, tradeoffs table, 3 screenshot placeholders filled.

**Not required for v1 done:** Google sync, other users, public launch, AI, tasks, planning assistant.

---

*Edit this plan as your timeline and priorities shift. When you’re ready for tech, add an appendix section below or a separate `tech.md`—not required now.*

### Appendix placeholder (future)

```text
## Tech & implementation notes
(add when ready)
```
