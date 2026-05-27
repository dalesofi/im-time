# Calendar meaning onboarding

> **Product principle:** If we guess wrong about colors and labels, every insight is wrong.

## Why this exists

Calendar apps store **events**. They do not store **meaning**. The same color can mean social life, volunteer work, paid creative work, or laundry—depending on the person.

I'm Time must **ask** before it assumes. This is not a one-time settings screen; it's the **first** expression of learning through the **right questions**—curious, not a productivity audit. See [curiosity-reflection.md](curiosity-reflection.md).

**Cryptic labels** (friend names, party names): ask once, store in [calendar-colors.json](../config/calendar-colors.json) → `labelClarifications` (e.g. chermi → DJing, dembooty → social, rob → social). See [priorities.md](priorities.md).

## When it runs

| Moment | What happens |
|--------|----------------|
| **First open** | Short interview: colors you use, what each means, how you label blocks |
| **After import** | Confirm or adjust mapping; flag ambiguous colors (e.g. blueberry = two things) |
| **Optional revisit** | "Has your system changed?" when insights feel off |

**Every step:** Answer · **Skip** · **Set later** — always editable. No account required; see [onboarding-ux.md](onboarding-ux.md).

Config seed for Sofia: [onboarding-questions.json](../config/onboarding-questions.json)  
Color legend: [calendar-colors.json](../config/calendar-colors.json)

## Question themes

1. Which colors do you use?
2. What does each color **usually** mean?
3. When **one color = two meanings** (blueberry: RBL vs DJing), how do you tell them apart in labels?
4. Do you **combine** activities (friend's name on meal or dog-walk color)?
5. Do you schedule sleep?
6. How do you label blocks (person, venue, project)?

## Sofia's system (dogfood reference)

### Lavender → social life (default)

- Person's name or event you're attending.
- **~10h/week** is a first threshold for insights.
- Exceptions on same color: **self-care** (shower, skin/hair), cleaning, laundry, siesta/podcast (keywords).
- **Self-care target: ~10h/week** (insight if below).

### Blueberry → two worlds (same color)

| Meaning | Area | Notes |
|---------|------|--------|
| RBL community radio | `radio` | Volunteer lead, Barcelona |
| DJing & music prep | `djing_music` | Paid; goal **€400/month**; labels = party, venue, friend/mix |

**DJing title keywords:** `prep`, `sort`, `mix`, `dj`/`djing`, `gig`, `export`, `listen`, `ordenar`, `clasificar` — *subcategories by verb (prep vs sort) = v2 feature.*

**CAPRIXXO** → counts as **both** `radio` and `djing_music` (related block).

**~10h/week** on DJing for "worth investing" insights—not only "do more hustle."

### Lavender errands (social surface, RBL substance)

Sometimes lavender is a **person's name** for a pickup or handoff (e.g. someone collecting something from your house for RBL). Looks social; also links to **`radio`**. Product: **related blocks**, not misclassification.

Errand-ish keywords: `recoger`, `pickup`, `entrega` — or person names you flag in onboarding.

### Banana + basil + social

- Yellow = Lua; green = meals.
- Often writes a **friend's name** on yellow or green when walking the dog or eating together.
- Product should notice **compound blocks** (integration, not double guilt).

## Related blocks (more common than we think)

One event, **multiple areas** — hours can count toward each when configured:

| Pattern | Areas |
|---------|--------|
| **CAPRIXXO** | RBL + DJing |
| Lavender errand / handoff | Social + RBL |
| Friend on banana/basil | Pets or meals + social (compound) |

v1 CLI: dual-count hours for `alsoAreas`.  
v1.1 UI: user confirms links; optional insight when a block serves two worlds.

## Compound blocks (product feature v1.1)

Detect or let user mark: *"This was social + meals"* or *"social + pets."*  
Insight tone: enjoying life in combination—not optimizing two to-do lists.

## Out of scope for onboarding

- Shaming color choices
- "Correct" productivity categories
- Forcing one color = one area when user says otherwise

---

*Linked from [mvp.md](mvp.md), [features.md](features.md) F2.*
