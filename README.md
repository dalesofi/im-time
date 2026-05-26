# I'm Time

A reflective companion for finite humans — **make space for what matters.**

Most calendar tools optimize; I'm Time helps you see where your time actually went and reflect on it with calm, honest interpretation.

**Status:** Documentation + calendar data + **insight/color config**. App scaffold next ([tech.md §13](docs/tech.md#13-scaffold-plan-next--no-code-until-you-say-go)).

## Documents

| File | What it is |
|------|------------|
| [docs/idea.md](docs/idea.md) | Full product thesis, philosophy, and long-term vision |
| [docs/mvp.md](docs/mvp.md) | v1 product spec, decisions, tone, metrics |
| [docs/features.md](docs/features.md) | **What to build** — ordered feature list and acceptance |
| [docs/tech.md](docs/tech.md) | **How to build** — data, parsing, insights, open tech choices |
| [docs/INSIGHTS.md](docs/INSIGHTS.md) | How to edit insight rules, thresholds, and goals |
| [config/](config/) | `insights-rules.json`, `calendar-colors.json`, `life-areas-default.json` |
| [docs/plan.md](docs/plan.md) | Phases, milestones, decisions log |
| [docs/case-study.md](docs/case-study.md) | PM portfolio narrative |

## Calendar data

| Path | What it is |
|------|------------|
| [calendars/](calendars/) | Personal ICS exports + **merged.ics** (3 calendars combined) |
| [scripts/merge-calendars.py](scripts/merge-calendars.py) | Regenerate merged file after updating exports |

```bash
python3 scripts/merge-calendars.py
```

**Suggested reading order:** idea → mvp → features → tech → plan → case-study.

**Next build step:** Say **go scaffold** to run Phase 1a (pnpm, `tokens.css`, vanilla shell).
