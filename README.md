# I'm Time

A reflective companion for finite humans — **make space for what matters.**

Most calendar tools optimize; I'm Time helps you see where your time actually went and reflect on it with calm, honest interpretation.

**Status:** Docs + merged calendars + insight/color config + **CLI weekly analyze** (`pnpm analyze`). UI shell next.

**Living process doc:** [docs/case-study.md](docs/case-study.md) — portfolio narrative plus **§12 Build log** (backfilled after each dogfood week or milestone). Working notes stay in [plan.md](docs/plan.md) and specialized docs; merge highlights into the case study when something ships or surprises you.

## Documents

| File | What it is |
|------|------------|
| [docs/idea.md](docs/idea.md) | Full product thesis, philosophy, and long-term vision |
| [docs/mvp.md](docs/mvp.md) | v1 product spec, decisions, tone, metrics |
| [docs/features.md](docs/features.md) | **What to build** — ordered feature list and acceptance |
| [docs/tech.md](docs/tech.md) | **How to build** — data, parsing, insights, open tech choices |
| [docs/INSIGHTS.md](docs/INSIGHTS.md) | How to edit insight rules, thresholds, and goals |
| [config/](config/) | `insights-rules.json`, `calendar-colors.json`, `life-areas-default.json`, `onboarding-questions.json` |
| [docs/calendar-onboarding.md](docs/calendar-onboarding.md) | Why we ask how you color-code your calendar |
| [docs/onboarding-ux.md](docs/onboarding-ux.md) | Skip / later / edit — no account, localStorage |
| [docs/targets-audit.md](docs/targets-audit.md) | When weekly targets add up or tension |
| [docs/curiosity-reflection.md](docs/curiosity-reflection.md) | Questions, curiosity, reflection-powered (not AI-as-hero) |
| [docs/dev-setup.md](docs/dev-setup.md) | **Step-by-step:** install, analyze, browser preview |
| [docs/data-display.md](docs/data-display.md) | Text first → Python viz → custom charts |
| [docs/priorities.md](docs/priorities.md) | 1–2 priorities, label clarifications, career vs care signal |
| [docs/plan.md](docs/plan.md) | Phases, milestones, decisions log |
| [docs/case-study.md](docs/case-study.md) | PM portfolio narrative + **§12 build log** (living process) |

## Calendar data

| Path | What it is |
|------|------------|
| [calendars/](calendars/) | Personal ICS exports + **merged.ics** (3 calendars combined) |
| [scripts/merge-calendars.py](scripts/merge-calendars.py) | Regenerate merged file after updating exports |

```bash
python3 scripts/merge-calendars.py
```

**Suggested reading order:** idea → mvp → features → tech → plan → case-study.

**Try it:** [docs/dev-setup.md](docs/dev-setup.md) — install, analyze, browser preview.

```bash
pnpm install
pnpm dev          # → http://localhost:5199/week.html (not 5173 — often Pomodoro/Vite)
pnpm analyze:dogfood   # terminal: 17–23 May 2026
```

**Data display roadmap:** [docs/data-display.md](docs/data-display.md) (text first → Python charts → custom UI).

**Next build step:** Tune mapping until allocation feels true; then wire UI (Phase 1b in [plan.md](docs/plan.md)).
