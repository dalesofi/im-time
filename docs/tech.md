# I'm Time — Technical notes

> Implementation guide for v1. **Not a final architecture review**—decisions you can change as you build.

**Related:** [features.md](features.md) (what to build) · [mvp.md](mvp.md) (product decisions) · [plan.md](plan.md) (phases)

---

## 1. Context from project scoping

| Topic | Decision |
|-------|----------|
| Builder | Solo, technical, ~4–8 weeks part-time |
| Platform | Web, responsive, **desktop-first** |
| MVP wedge | Calendar **awareness** (allocation + interpretation) |
| Calendar input | **ICS** (not Google OAuth in v1) |
| Insights v1 | **Rules + templates + stats** — not LLM |
| Privacy in UI | **Aggregates only** — no event titles; user-editable category labels |
| Default range | **Last 7 days** (weekly reflection); monthly/annual later |
| v1 usage model | **Single import / single session** — no re-import UI yet |
| Dogfood data | [calendars/merged.ics](../calendars/merged.ics) in repo |
| Auth / hosting v1 | None required for solo dogfood |
| User research | Later iteration; solo dogfood enough for portfolio |

---

## 2. Calendar data

### Source files (personal)

Three Google exports in [calendars/](../calendars/):

- `sofia@buttonschool.com.ics` — Button School (~855 events)
- `sofia@rbl.media.ics` — RBL (~6 events)
- `sodalponte@gmail.com.ics` — personal (~4,859 events)

### Merged file

**`calendars/merged.ics`** (~4,192 unique events after UID dedupe)

Each event includes:

```text
X-IMTIME-SOURCE-CALENDAR:buttonschool|rbl|personal
X-IMTIME-SOURCE-LABEL:<human-readable source>
```

Use source calendar as the **first mapping signal** for life areas (before color/keyword rules).

### Regenerating merge

When any source `.ics` is refreshed, re-run the merge script (to be checked in as `scripts/merge-calendars.py`). Logic:

1. Parse `VEVENT` from each file.
2. Tag with source property.
3. Deduplicate by `UID` (keep richer record on collision).
4. Combine `VTIMEZONE` blocks into one `VCALENDAR`.

---

## 3. Re-import modes (product → tech)

Explained for when you build **v1.1**; **v1 uses none of these in the UI.**

| Mode | Behavior | Risk |
|------|----------|------|
| **Replace** | New upload replaces the current analysis snapshot. One active week/view. | Simple; loses previous snapshot unless saved elsewhere. |
| **Merge** | New events append into current dataset; same date range may double-count without UID dedupe. | Needs dedupe rules; good for multi-calendar upload in one session. |
| **History** | Each upload stored as its own week record; user browses past weeks and compares. | Needs storage model + UI; enables week-over-week and trimester views. |

**v1 choice:** Treat analysis as **one-shot**: load merged ICS (or one upload), pick date range, show reflection. No “upload new week” yet.

**v1.1 direction:** **History + compare** (your preference from scoping), plus optional re-import flow.

---

## 4. ICS parsing (requirements)

- Libraries to evaluate when scaffolding: `ical.js`, `node-ical`, or Python `icalendar` for scripts only.
- Handle: `TZID`, floating times, `DTSTART`/`DTEND`, all-day events, recurring events (`RRULE` / instances).
- **Cancelled events:** exclude `STATUS:CANCELLED` if present.
- **Duration:** use timed events for hour totals; define rule for all-day (e.g. count as 0 scheduled hours or fixed block—document choice in code).
- **Meetings heuristic (v1):** event has `ATTENDEE` or keyword in categories—tune during dogfood.

---

## 5. Date ranges

| Range | v1 | Notes |
|-------|-----|------|
| Last 7 days | **Yes (default)** | Align copy with “weekly reflection” |
| Calendar week Mon–Sun | Optional | Pick one default and stick to it |
| Custom range picker | Nice-to-have | |
| Month / quarter / year | **v1.1+** | You asked for trimester overview later |

Filter events where `start` falls within range (define inclusive boundaries in code).

---

## 6. Life-area mapping (logic)

**Priority order:**

1. User override (localStorage)
2. **Color** → area from [calendar-colors.json](../config/calendar-colors.json) when `colorId`/color present
3. **Keywords** (e.g. beach, park → pets/Lua)
4. `X-IMTIME-SOURCE-CALENDAR` → default area ([life-areas-default.json](../config/life-areas-default.json))
5. Uncategorized

**ICS note:** Google `.ics` export usually **does not include event colors**. v1 dogfood uses source calendar + stored color legend for onboarding; colors apply fully with Google API (v1.1).

**Exceptions:** Banana/yellow = **always** Pets (Lua), any calendar.

**Lavender:** default → `social_life`; keywords → `home_cleaning`, `laundry`, `day_rest` (siesta/podcast only—not RBL).

**Blueberry:** `dj|djing|mix` → `djing_music`; `rbl|fem barri|volunteer` → `radio`; **onboarding required** when ambiguous.

**Related blocks:** `config/calendar-colors.json` → `relatedBlocks.rules` — e.g. CAPRIXXO → `radio` + `djing_music`; lavender errand → `social_life` + `radio`. Mapper returns `alsoAreas[]`; stats count hours in both.

**DJing keywords:** prep, sort, mix, caprixxo, … — subcategories by verb deferred to v2.

**Compound blocks:** banana/basil + friend name → v1.1 UI ([calendar-onboarding.md](calendar-onboarding.md)).

**Sleep:** do not schedule or infer from gaps.

**Keyword routing uses event titles internally only** — never displayed in UI (forest, not trees).

**Category labels (forest, not trees):**

- Do **not** show raw `SUMMARY` in UI.
- Derive a **display label** for bucketing only, e.g.:
  - Source calendar name, or
  - Normalized category from import metadata if available, or
  - Generic “Scheduled block” for v1 dogfood.
- User can **rename** the label bucket so it “makes sense to them” ([mvp.md](mvp.md)).

---

## 7. Insight engine (v1)

**No AI.** Pipeline:

```text
events in range → stats (F4) → rule evaluation → template fill → insight cards
```

- Config: [config/insights-rules.json](../config/insights-rules.json) — edit guide: [INSIGHTS.md](INSIGHTS.md).
- Max **3** cards/week; priority order in JSON.
- Key thresholds: meetings **≥10h**; admin **≥4h** (ceiling goal: under 4h); radio **&lt;3h** (“crumbs” card); job **&lt;2h** thin week; exercise **&lt;5h**; free mornings before **11:00** Mon–Fri; open evenings after **20:00**.

---

## 8. Persistence (v1 solo)

| Data | Suggested v1 |
|------|----------------|
| Calendar events | Read from file each run, or cache parsed JSON in `localStorage` / repo dev cache |
| Life-area config | `localStorage` or small JSON file in repo for dogfood |
| Journal text | `localStorage` keyed by date-range id |

You noted calendar truth stays in **files in `calendars/`**; app state (mapping, journal) can be browser-local until accounts exist.

---

## 9. Stack (decided for scaffold)

| Layer | v1 choice | Notes |
|-------|-----------|--------|
| Package manager | **pnpm** | Node project in repo root or `app/` |
| App (phase A) | **Vanilla JS** | HTML + ES modules, no framework yet |
| App (phase B) | **Vite** | Migrate when HMR / bundling helps; same `src/` where possible |
| Styling | **CSS + design tokens** | `tokens.css` — you own values; app uses variables only |
| ICS parse | **TBD at scaffold** | e.g. `ical.js` or `node-ical` — browser-side for upload path |
| Charts | CSS bars first | No chart library until needed |
| Deploy (later) | Static host | Vercel / Netlify when portfolio-ready |

**Avoid for v1:** React/Next (until Vite migration if ever), database, auth, LLM APIs.

**Migration path:** vanilla shell → move scripts to `src/` modules → add `vite.config` + `pnpm dev` without rewriting logic.

---

## 10. Repo layout

```text
im-time/
  calendars/              # source + merged.ics (gitignore if public)
  config/
    life-areas-default.json   # life areas + source calendar defaults
    calendar-colors.json      # Google swatch → area (+ keyword overrides)
    insights-rules.json       # rules, thresholds, sample goals
  docs/
    INSIGHTS.md               # how to edit insight config
  docs/
  scripts/
    merge-calendars.py    # exists — regenerate merged.ics
  public/                 # static assets (favicon, etc.)
  src/                    # app (scaffold next)
    index.html
    main.js
    styles/
      tokens.css          # UI tokens — you manage
      main.css            # layout + components using var(--*)
    lib/
      parse-ics.js
      stats.js
      insights.js
      storage.js
  package.json
  pnpm-lock.yaml
```

---

## 11. Privacy & security

- v1 dogfood: personal ICS in repo — **keep private** or gitignore before public push.
- Product promise: analysis is **pattern-level**; no event title gallery.
- When you add upload UI: prefer **client-side parse** (file never leaves browser) for portfolio story.

---

## 12. Technical decisions (resolved)

| Topic | Decision |
|-------|----------|
| Week boundary | **Calendar week Mon–Sun** (not rolling 7 days) |
| Default window | **Last complete Mon–Sun week** (or current week to date—implementer picks one rule and documents in code) |
| All-day events | **Do not add to scheduled hours.** Track separately (e.g. count / “All-day” life-area or day markers). |
| Meeting detection | **ATTENDEE present** = meeting; tune thresholds during dogfood on merged data |
| Mapping persistence | **`localStorage`** for user edits; **seed** from `config/life-areas-default.json` |
| Journal persistence | **`localStorage`** keyed by week id |
| Onboarding state | **`localStorage`** — skip/later/completed; no auth session |
| Merge script | **`scripts/merge-calendars.py`** in repo — run after refreshing exports |
| Insights config | **`config/insights-rules.json`** — rules, templates, thresholds; **you co-author** with agent |

---

## 13. Scaffold plan (next — no code until you say go)

### Phase A — Vanilla shell (first PR)

1. `pnpm init` at repo root (or `app/` if you prefer isolation).
2. Add `package.json` scripts: `"dev": "…"` using a static server (`vite preview` later; initially `pnpm dlx serve public` or Vite in lib mode).
3. Create `src/index.html`, `src/main.js`, `src/styles/tokens.css`, `src/styles/main.css`.
4. **UI tokens** (`tokens.css`): only CSS custom properties — colors, spacing, font families/sizes, radii, shadows. No component rules in tokens file; you edit tokens, app references `var(--color-surface)` etc.
5. Stub `main.js`: fetch `/calendars/merged.ics` (or copy to `public/` for dev), log event count.
6. `.gitignore`: `node_modules`, optionally `calendars/*.ics` if repo goes public.

### Phase B — Core logic (F1–F4)

1. `src/lib/parse-ics.js` — parse, filter Mon–Sun week, exclude cancelled.
2. `src/lib/stats.js` — hours by area, meetings, open blocks, evenings, all-day counts.
3. Wire allocation UI (CSS bars, tokens only).

### Phase C — Insights + reflection (F5–F7)

1. `config/insights-rules.json` — placeholder rules; **you fill templates/thresholds** with help.
2. `src/lib/insights.js` — evaluate rules → fill templates.
3. Reflection page layout + optional journal → `localStorage`.

### Phase D — Vite (when vanilla feels slow)

1. Add `vite.config.js`, point root to `src/`.
2. `pnpm dev` with HMR; keep vanilla JS (no React required).
3. Same `tokens.css` import path.

### Collaborative artifact (before / during Phase C)

**[config/insights-rules.json](../config/insights-rules.json)** (to create) — structure:

```json
{
  "rules": [
    {
      "id": "high_meeting_load",
      "when": { "meetingPercentGte": 35 },
      "template": "About {meeting_percent}% of your scheduled time this week was in meetings…"
    }
  ],
  "sampleGoals": [
    { "id": "protect_evening", "label": "Leave two evenings open", "editable": true }
  ]
}
```

You edit copy and thresholds; code only evaluates `when` clauses.

---

## 14. UI tokens (starter set to define in `tokens.css`)

You manage values; app only references variables.

| Token group | Examples |
|-------------|----------|
| Color | `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-border` |
| Space | `--space-xs` … `--space-xl` |
| Type | `--font-family`, `--font-size-body`, `--font-size-heading`, `--line-height-relaxed` |
| Radius / shadow | `--radius-card`, `--shadow-soft` |

Design intent from [mvp.md §7](mvp.md#7-content--tone-guardrails): calm, spacious, no alarm red/green.

---

*Last updated: May 2026 — ready to scaffold on your go.*
