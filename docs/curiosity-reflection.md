# Curiosity & reflection — product pillar

> **Thesis:** The product learns about you by asking the **right** questions—not by scoring your calendar. Patterns become conscious when **you** get involved. **Reflection-powered**, not optimization-powered (and not “AI power” as the hero).

**Related:** [idea.md](idea.md) · [calendar-onboarding.md](calendar-onboarding.md) · [onboarding-ux.md](onboarding-ux.md) · [mvp.md](mvp.md) · [case-study.md](case-study.md)

---

## 1. Founder insight (why this matters)

Many people already look at their calendar often—out of habit, anxiety, or **genuine curiosity**. They notice how time actually flows: colors, names, gaps, overload weeks, quiet weeks. That habit is rarely supported well:

| What calendars do | What people often want |
|---------------------|-------------------------|
| Show the schedule | Wonder *what kind of week this was* |
| Imply you should fix gaps | Sit with something confusing until it clarifies |
| Optimize toward goals | **Observe** without a performance mindset |

I'm Time should meet that curiosity: **“I look at my calendar a lot—but I’m not trying to win at planning. I want to understand myself.”**

**Control without control-freakery:** You don’t get calm by micromanaging every block. You get it by **observing** something messy (a week that doesn’t add up, a color you use for three different things) until it makes sense—then choosing, lightly, what might deserve attention next week. No verdict. No streak.

---

## 2. Questions are the product (not just onboarding)

Onboarding (“what does lavender mean?”) is the **first** interview—not the only one.

| Phase | Role of questions |
|-------|-------------------|
| **v1 (MVP)** | Calendar-meaning interview + optional journal prompt ([onboarding-questions.json](../config/onboarding-questions.json)) |
| **v1.1+** | Follow-ups when data is ambiguous (“You used blueberry 12h—mostly RBL, DJing, or mixed?”) |
| **v2+** | Pattern-triggered reflection: gentle prompts when the forest shifts (“Evenings got busier for 3 weeks—worth a one-line note?”) |

**Principles for “right” questions:**

- **Specific to their system** — colors, names, compound blocks—not generic productivity quizzes.
- **Skip / later / edit always** — curiosity dies under interrogation ([onboarding-ux.md](onboarding-ux.md)).
- **One at a time when possible** — respect attention; weekly ritual not daily homework.
- **Open enough to surprise** — “What felt off about this week?” not “Rate your productivity 1–5.”
- **Tied to aggregates** — questions reference patterns (hours, evenings, meeting load), not a parade of event titles.

Wrong questions feel like a coach. Right questions feel like a friend who noticed something and is curious with you.

---

## 3. Reflection-powered vs AI-powered

| Reflection-powered (this product) | AI-as-hero (not v1) |
|-----------------------------------|---------------------|
| Rules + templates from **your** mapping and thresholds | Opaque model “insights” |
| You answer; app remembers meaning | App guesses meaning and hopes it’s right |
| Optional one-line journal | Generated life advice paragraphs |
| Silence when nothing useful to say | Filler noise every week |

LLM may appear later for **optional** phrasing—not as the source of truth. Trust comes from **you** teaching the system how you code time, then seeing honest aggregates.

---

## 4. Making patterns conscious (participation)

Insights alone can feel passive. Consciousness grows when the user **does something small**:

1. **Teach** — answer a mapping question, fix a swatch, add a keyword.
2. **Notice** — read an insight card; no required action.
3. **Reflect** — optional journal line; skip is neutral.
4. **Revisit** — “Has your system changed?” when colors drift.

The loop is: **confusing aggregate → question or prompt → your words → clearer meaning next week.**

Example (future, not v1):

> “~70% of this week is still ‘uncategorized’ in our first pass. That’s not failure—it means we don’t know your legend yet. Which color should we ask about first?”

---

## 5. Curiosity, not goal-orientation

The app may **surface** intentions (meals ~14h, social ~10h) as **context**, not as a scoreboard. The emotional stance is:

- **Curious:** “You blocked almost no exercise this week—how did that feel?”
- **Not optimizing:** “You failed your 5h exercise goal.”
- **Not hustling:** “Here’s how to fix next week.”

Goals in config exist for **dogfood honesty** and gentle nudges—not gamification. See [targets-audit.md](targets-audit.md) for when many targets tension each other.

---

## 6. MVP vs later

| In v1 | Later |
|-------|--------|
| Calendar meaning interview (skip/later/edit) | Ambiguity prompts after import |
| Rule-based insight cards (max 3) | Question triggered by pattern change |
| One optional journal prompt | Rotating reflection prompts library |
| Aggregates-only UI | “What does this block mean?” inline on one ambiguous slice |

**Portfolio line:** *We learn how you see time by asking—then we reflect with you, not at you.*

---

## 7. Product calibration (Sofia — May 2026)

| Question | Answer |
|----------|--------|
| Follow-up questions after onboarding? | **Only when ambiguous** or a pattern shifts—not a fixed weekly quiz |
| What do you look at curiously? | **Big blocks** — *what did I actually do?* (duration + meaning, not minute-by-minute optimization) |
| “Confusing week” prompts? | TBD — keep gentle; tie to uncategorized % or color drift, not “you failed” |

**Implication for build:** v1 = mapping interview + optional journal. v1.1+ = **ambiguity-triggered** prompts (e.g. high uncategorized, blueberry split unclear), not another obligation every Sunday.

---

*Last updated: 26 May 2026.*
