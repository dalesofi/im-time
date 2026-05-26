# Onboarding UX (MVP)

> **No account required for v1.** Everything can live in **localStorage** on your machine.

## Principles

Every onboarding step must offer:

| Action | Meaning |
|--------|---------|
| **Answer now** | Save to local mapping |
| **Skip** | Don't ask again this session; use defaults |
| **Set later** | Placeholder in settings; gentle reminder on reflection page |

User can **always edit** mapping, goals, and notes later (settings or `config/` export for dogfood).

## What we store locally (v1)

```text
localStorage keys (planned):
  imtime_onboarding_v1     — completed / skipped question ids
  imtime_life_areas        — user overrides on defaults
  imtime_color_map         — swatch → area + related blocks
  imtime_journal_YYYY-Www  — optional weekly journal line
```

No server, no login, no session cookie—unless you add auth in v1.1.

## MVP scope

| In v1 | Out of v1 |
|-------|-----------|
| CLI + config files for Sofia dogfood | Full swatch UI |
| Documented question flow | Polished multi-step wizard |
| localStorage spec in [tech.md](tech.md) | Cloud sync |

**OK for portfolio:** “Designed onboarding with skip/defer/edit; shipped CLI-first to validate rules before UI.”

## Mimicking locally today

1. Edit [config/calendar-colors.json](../config/calendar-colors.json) and [life-areas-default.json](../config/life-areas-default.json).
2. Run `pnpm analyze` to see allocation + insights.
3. Optional: copy `config/` to `localStorage` when the web shell exists.

## Link to calendar meaning

Interview content: [calendar-onboarding.md](calendar-onboarding.md)  
Question seed: [onboarding-questions.json](../config/onboarding-questions.json)
