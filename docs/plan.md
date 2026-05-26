# I'm Time — Build Plan

> Phases, milestones, and **decisions log**. Build list: [features.md](features.md). Tech: [tech.md](tech.md). Product spec: [mvp.md](mvp.md).

---

## 1. North star for build

**Product north star:** Help someone see where their week went and reflect on it with calm interpretation—not optimization pressure.

**Process north star:** Documentation → build smallest loop ([features.md](features.md) F1–F8) → dogfood on [calendars/merged.ics](../calendars/merged.ics) → polish for portfolio.

**Ready to build when:**
- [x] Product decisions captured in [mvp.md §10](mvp.md#10-product-decisions)
- [x] Technical decisions in [tech.md §12](tech.md#12-technical-decisions-resolved)
- [ ] You’ve skimmed [features.md](features.md) and [tech.md §13 scaffold](tech.md#13-scaffold-plan-next--no-code-until-you-say-go)
- [ ] You can explain the hero journey in one minute
- [ ] You say **go** to scaffold (Phase A in tech.md §13)

---

## 2. Phase 0 — Validate documentation

**Goal:** Trust the docs; real calendar data in repo.

### Activities

- [x] Edit [mvp.md](mvp.md) — decisions in §10
- [x] Merge three ICS exports → [calendars/merged.ics](../calendars/merged.ics)
- [ ] Edit [case-study.md](case-study.md) after first dogfood insights
- [ ] Spot-check one week in merged data vs Google Calendar
- [ ] *(Later)* 2–3 informal conversations — noted in case-study; **not blocking v1 build**

### Exit criteria

- [x] No blocking open product questions (technical fine points stay in [tech.md §12](tech.md#12-open-technical-questions))
- [ ] One manual sanity check: event counts / hours for a known week feel plausible

---

## 3. Phase 1a — Scaffold (vanilla + pnpm)

**Goal:** Empty app shell per [tech.md §13 Phase A](tech.md#13-scaffold-plan-next--no-code-until-you-say-go).

- [ ] `pnpm init`, `tokens.css`, `main.js` stub, load `merged.ics`
- [x] `config/insights-rules.json` + `config/life-areas-default.json` + `config/calendar-colors.json` + [INSIGHTS.md](INSIGHTS.md)

**Exit:** `pnpm dev` (or serve) opens a calm landing page; console shows parsed event count.

---

## 4. Phase 1b — Core awareness loop

**Goal:** F1–F7 from [features.md](features.md) on merged data. No re-import UI.

### Outcomes

- [ ] Load merged ICS; default last-7-days view
- [ ] Life-area mapping with defaults + custom areas
- [ ] Allocation + stats (aggregates only)
- [ ] ≥3 insight card types (rules + templates)
- [ ] Optional journal + weekly reflection page
- [ ] **One** full personal dogfood pass

### Exit criteria

- [ ] [features.md](features.md) acceptance checklist (core items) met
- [ ] Copy pass per [mvp.md §7](mvp.md#7-content--tone-guardrails)

---

## 5. Phase 2 — Polish for portfolio

**Goal:** Screenshot-ready; four reflection cycles (can use same import with different date ranges until re-import exists).

### Outcomes

- [ ] Landing copy and empty/error states
- [ ] Reflection page visual polish
- [ ] Four weekly reflection sessions documented (journal optional)
- [ ] [case-study.md §11](case-study.md#11-open-narrative-gaps) — at least tradeoff story drafted

### Exit criteria

- [ ] Definition of done (§10 below) met

**Note:** Re-import moved to Phase 3 / v1.1—not required for Phase 2 exit.

---

## 6. Phase 3 — Stretch & v1.1 (optional)

| Item | Notes |
|------|--------|
| **Re-import + week history + compare** | Replace/merge/history — see [tech.md §3](tech.md#3-re-import-modes-product--tech) |
| Trimester / monthly / annual views | On same or historical imports |
| Multi-calendar upload in UI | Mirror merge script |
| Google Calendar sync | OAuth |
| User research / 3–5 user beta | After solo dogfood story exists |
| Richer journal, planning, tasks | v2 per [idea.md](idea.md) |

---

## 7. Milestones checklist

### Phase 0
- [x] mvp.md §10 decisions
- [x] merged.ics created
- [x] insight + color + life-area configs
- [ ] case-study.md updated post-dogfood
- [ ] Calendar spot-check

### Phase 1a
- [ ] pnpm + vanilla shell + tokens.css
- [ ] merged.ics loads in browser

### Phase 1b
- [ ] F1–F7 shipped
- [ ] insights-rules.json populated (with your help)
- [ ] First dogfood week

### Phase 2
- [ ] Portfolio polish
- [ ] Four reflection cycles
- [ ] case-study §11 tradeoff story

### Phase 3
- [ ] *If/when*

---

## 8. Dependencies

```text
mvp.md §10 decisions
    ↓
features.md F1 (data load) — merged.ics
    ↓
F2 life-area mapping (seed from X-IMTIME-SOURCE-CALENDAR)
    ↓
F3 allocation + F4 stats
    ↓
F5 insight rules + copy
    ↓
F6 journal + F7 reflection page
    ↓
F8 landing
    ↓
Phase 2 polish
    ↓
(v1.1) re-import / history / compare
```

---

## 9. Risks & contingencies

| Risk | Signal | Contingency |
|------|--------|-------------|
| Timeline slip | Phase 1 stalls | Drop to 2 insight types; simplify stats |
| ICS quirks | Hours don’t match Google | Document rules in tech.md; fix parser |
| Insights feel generic | You don’t trust cards | Add more rules; tune thresholds on your data |
| Scope creep | Building compare before F7 done | Re-read [features.md](features.md) “not v1” |
| Personal data in git | Public repo | gitignore `calendars/*.ics` |

---

## 10. Decisions log

*Synced with [mvp.md §10](mvp.md#10-product-decisions). Anchor: §10 Decisions log.*

### Product — resolved

| Topic | Decision |
|-------|----------|
| Insight generation | **Rules + templates + data analysis** (no LLM v1) |
| Re-import / history | **None in v1**; v1.1 = **history + compare** |
| Default life areas | **Yes**, user can add/edit (Health, Hobbies, Pets, …) |
| Event titles in UI | **No** — aggregates only; editable labels; forest/trees metaphor |
| Default date range | **Last 7 days**; monthly/annual/trimester later |
| Dogfood data | **`calendars/merged.ics`** (+ source exports) |
| Week comparison | **Out of v1**; stretch trimester later |
| User research / beta | **Later**; solo dogfood for portfolio |

### Implementation — resolved

| Topic | Decision |
|-------|----------|
| Package manager | **pnpm** |
| Stack phase A | **Vanilla JS** (HTML + ES modules) |
| Stack phase B | **Vite** when HMR/bundling worth it ([tech.md §13](tech.md#13-scaffold-plan-next--no-code-until-you-say-go)) |
| UI styling | **`src/styles/tokens.css`** — you manage token values |
| Default week boundary | **Mon–Sun** |
| All-day events | **Not in hour totals**; separate day/all-day tracking |
| Mapping persistence | **localStorage** + seed `config/life-areas-default.json` |
| Insights config | **`config/insights-rules.json`** ✓ (see [INSIGHTS.md](INSIGHTS.md)) |
| Color legend | **`config/calendar-colors.json`** ✓ + swatch onboarding in product |
| Admin threshold | **≥4h/week** triggers insight (goal: under 4h) |
| Exercise goal | **≥5h/week**; insight if below |
| RBL goal | 2× **2–3h** blocks/week |
| Job search | Thin **&lt;2h**; aspiration **3–4h daily** (trimester) |
| Lavender | Split: day rest / home cleaning / laundry (keywords) |
| Day rest | Max **2h/day** (siesta, podcast, radio) |
| Meals | **~14h/week** target band |
| Home cleaning | **10h/month** (4-week roll); **3h** / 2 weeks |
| Laundry | **2h/week** |
| Sleep | Not inferred |
| Merge script | **`scripts/merge-calendars.py`** ✓ |
| Hosting / public URL | ___ when portfolio needs a live URL |

### AI / automation

| Topic | Decision |
|-------|----------|
| LLM in v1 | **No** |
| LLM later | Optional; not part of portfolio thesis |

---

## 11. Definition of done (v1)

1. [features.md](features.md) core checklist complete (F1–F8).
2. **Four** weekly reflection sessions on your data (same or different 7-day windows).
3. One **tradeoff story** in [case-study.md §11](case-study.md#11-open-narrative-gaps).
4. Weekly reflection page **portfolio-ready** (screenshots).
5. No shame-language violations ([mvp.md §7](mvp.md#7-content--tone-guardrails)).
6. case-study artifacts checklist started (§10).

**Not required:** re-import, Google sync, other users, LLM, public launch.

---

*Last updated: May 2026.*
