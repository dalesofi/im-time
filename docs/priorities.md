# Weekly priorities (1–2 only)

> **Product principle:** Hard threshold nudges apply only to **1–2 priorities** the user chooses. Everything else is context—OK if lighter or skipped this week.

**Config:** [insights-rules.json](../config/insights-rules.json) → `priorities`  
**Labels:** [calendar-colors.json](../config/calendar-colors.json) → `labelClarifications`

---

## Why

Many goals together contradict each other ([targets-audit.md](targets-audit.md)). The app should not imply you failed eleven floors at once.

| Tier | Behavior |
|------|----------|
| **Priority (max 2)** | Hard nudges when thresholds missed (job search thin, DJing low, etc.) |
| **Context** | Shown in goals list; no guilt cards unless you promote to priority |
| **Observe** | Pattern cards (meetings, mornings, **personal/care vs career balance**) |

---

## Sofia (dogfood default)

| Priority | Area |
|----------|------|
| 1 | Job search & brand |
| 2 | DJing & music prep |

**Balance signal:** If personal/care hours are high (social, rest, meals, body…) **and** career blocks are light while career is a priority → gentle observe card (`personal_care_vs_career_focus`). Not shame.

---

## Clarifying questions (labels)

Cryptic titles get taught once, then stored:

| Label | Meaning | Area |
|-------|---------|------|
| chermi | Friend's birthday — DJ set | DJing |
| dembooty | Party attended | Social |
| rob | Person — getting to know | Social |

**v1.1:** Prompt automatically on first unknown label in a week.

---

## UI (planned)

- Onboarding: pick 1–2 priorities (required; editable later)
- Reflection page: show ★ priorities vs · context goals
- Unknown label → one question → save to `localStorage` + export to config

---

*Last updated: 26 May 2026.*
