# How we show data (roadmap)

> **Principle:** Text and honest interpretation first. Graphics when they earn their place.

**Related:** [mvp.md](mvp.md) · [features.md](features.md) · [plan.md](plan.md) · [curiosity-reflection.md](curiosity-reflection.md)

---

## Why text first

- Wrong charts look authoritative; **plain language** admits uncertainty.
- Dogfood needs **tunable mapping** before pretty viz.
- Portfolio story: “interpretation, not dashboards.”

**v1 order:**

1. **CLI** — `pnpm analyze` (bars in terminal)
2. **Text summary** — area lines on [view.html](../public/view.html)
3. **Simple HTML bars** — Google legend colors + emoji (💼 🥕 🐕 📻); rolled-up chart + full breakdown
4. **Goal snapshot box** — PM Life goal, on-target, gentle nudge, alerts ([week-snapshot.json](../config/week-snapshot.json))
4. **Optional static HTML** — `pnpm analyze --html` → `public/report.html`

---

## Phases

| Phase | What | When |
|-------|------|------|
| **1 — Now** | Week picker + text + CSS bars (`week.html`, `view.html`, CLI) | MVP / dogfood |
| **2 — Python charts** | Scripts in `scripts/viz/` (matplotlib or similar) for portfolio PNGs/SVGs; reads analyze JSON | After mapping trustworthy |
| **3 — Custom UI graphics** | In-app charts (canvas/SVG), design tokens, accessible | v1.1+ when weekly compare ships |
| **4 — Optional** | Export share image for reflection page | Polish |

**Not v1:** D3-heavy dashboards, real-time animation, red/green scoring.

---

## Week selection (MVP: yes)

| Option | Verdict |
|--------|---------|
| Fixed “last 7 days” only | Too weak for dogfood |
| **User picks week (from/to)** | **Yes — MVP** — required to validate mapping on known weeks |
| Fancy calendar UI | v1.1 |

Implemented: [week.html](../public/week.html) + `pnpm analyze --from --to` + API on `pnpm dev`.

**Note:** Product ritual is **Mon–Sun**; you may also analyze **Sun–Sat** (e.g. 17–23 May) — label the range clearly in UI.

---

## Python viz (phase 2 sketch)

```bash
pnpm analyze --from 2026-05-17 --to 2026-05-23 --json > /tmp/week.json
python3 scripts/viz/week_chart.py /tmp/week.json -o docs/assets/week-dogfood.png
```

Dependencies: add only when you start phase 2 (`requirements-viz.txt` or similar).

---

## Custom graphics (phase 3)

- Reuse `tokens.css` colors per life area
- Week-over-week compare (v1.1): small multiples, not one busy pie
- Keep **aggregates only** — no event title chart

---

*Last updated: 26 May 2026.*
