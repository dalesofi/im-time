# I'm Time — Case Study (PM portfolio draft)

> **Purpose:** Story for hiring managers and your portfolio site. Complements a future live demo.  
> **Build list:** [features.md](features.md) · **Tech:** [tech.md](tech.md) · **Spec:** [mvp.md](mvp.md)

---

## 1. Elevator pitch

Most people who use calendars already have the data—they just don’t have a humane way to look at it. Productivity tools turn time into a scorecard: optimize, hustle, fix your schedule. I'm Time starts elsewhere: **finite humans deserve reflection, not judgment.**

**I'm Time** is a reflective web companion that reads calendar data (ICS in v1), shows where your time actually went, and offers calm interpretation—rule-based insight cards and a weekly reflection moment—plus an optional prompt about surprise or gratitude. The differentiator is **interpretation, not optimization.**

I’m building it as a portfolio product to demonstrate product thinking end-to-end: problem framing, scoped MVP, dogfood on my own merged calendars (work, passion projects, personal life), and a clear point of view on a crowded market.

---

## 2. Why this problem

Calendar apps answer *what’s on the schedule*. They rarely help answer *what kind of life this week resembled*—how much was meetings vs rest, how much space was left unplanned, whether the week matched what actually matters.

Meanwhile, “productivity culture” promises that the right system will eliminate tradeoffs. Oliver Burkeman’s *Four Thousand Weeks* and similar humane-time thinking argue the opposite: life is finite; choosing is renouncing; overplanning is often anxiety in disguise.

**Personal connection (for narrative, not ICP):** I’ve felt the exhaustion of optimizing time without feeling more at peace. I'm Time is an experiment in building the tool I wished existed—while designing for a broader “reflective optimizer” persona, not “software for me only.”

**Gap in the market:** Tools cluster at extremes—raw calendars, ruthless optimizers, or generic wellness apps. Few products sit in the middle: **data-informed, emotionally intelligent, anti-hustle.**

**Design insight:** A calendar color is not a category until the user says what it means. The product must **interview** users on how they code and annotate—or mislabel social life, paid DJ work, and laundry.

---

## 3. Target user & market framing

### Who benefits

**The reflective optimizer** — uses a digital calendar, has tried productivity apps, wants awareness and alignment without guilt or gamification.

### Who it’s not for (v1)

- Teams needing collaboration features.
- Users requiring instant Google sync.
- People whose primary job-to-be-done is task throughput or habit streaks.

### Category positioning

| Frame as | Avoid framing as |
|----------|------------------|
| Reflective companion for finite humans | Productivity / hustle app |
| Humane calendar interpretation | “AI life coach” |
| Weekly awareness ritual | Daily optimization dashboard |

**Tagline:** *Make space for what matters.*

---

## 4. Problem validation plan

### Methods

| Method | Purpose | Status |
|--------|---------|--------|
| Founder dogfood | Weekly reflection on merged personal calendars | Ready (data in repo) |
| ICS merge + spot-check | Three calendars → one life view | **Done** — [calendars/merged.ics](../calendars/merged.ics) |
| 2–3 informal conversations | Language and willingness to re-import weekly | **Later** (post–v1 loop) |
| Portfolio review | Story lands with PM mentors | Optional |

### Questions to explore

- Does **aggregate-only** framing (“forest, not trees”) feel relieving vs frustrating?
- Do **rule-based insights** feel true on a real week?
- When we add re-import, is **history + compare** the right v1.1 hook?

### Findings (placeholder)

```text
[ Date ] — Observation:
```

---

## 5. Hypotheses

| # | Hypothesis | How we’d know | Status |
|---|------------|---------------|--------|
| H1 | Compassionate framing reduces guilt vs raw stats alone | Dogfood journal + self-report | Untested |
| H2 | One weekly reflection page beats a daily dashboard | You return weekly without wanting daily drill-down | Untested |
| H3 | Awareness wedge is right before planning/tasks | Complete loop without task features | Untested |
| H4 | Aggregate-only UI builds trust (privacy + patterns) | You prefer labels over event titles | Untested |
| H5 | One optional journal prompt adds meaning without homework | You write some weeks, skip others, both feel fine | Untested |

---

## 6. Solution overview

**v1 summary:** Web, desktop-first. Load ICS (dogfood: pre-merged file from three calendars) → map to life areas → last-7-days allocation + stats → rule-based insight cards → optional journal → **weekly reflection** page. **No re-import in v1.**

Details: [mvp.md](mvp.md) · Build order: [features.md](features.md).

### Hero journey (prose)

You open I'm Time and see a calm welcome—this is not another productivity app. Your calendar data loads (one merged view of the different hats you wear). You map how those worlds roll up into what matters: work, rest, relationships, the projects you care about. You see the week as a distribution—not a grade—hours in meetings, open blocks, quiet evenings. A few observations appear in plain language, careful not to shame; they’re patterns in the forest, not a list of every tree. If you want, you write one line about what surprised you. You leave with a single page that feels like closing a notebook. *(Next version: come back next week and compare.)*

---

## 7. Key decisions & tradeoffs

| Decision | Options considered | Choice (v1) | Why |
|----------|-------------------|-------------|-----|
| MVP wedge | Awareness · Reflection · Planning · Prioritization | **Awareness** | Strongest proof of “interpretation not optimization” |
| Calendar input | Google OAuth · ICS · Demo only | **ICS** | Ships without OAuth; real exports for dogfood |
| Multi-calendar life | Single calendar · Merge exports | **Merge 3 ICS → merged.ics** | One person, multiple roles—matches real life |
| Insight mechanism | Rules/templates · LLM · Manual only | **config/insights-rules.json** | Controllable tone; no LLM v1; max 3 cards/week |
| Color mapping | From ICS · Manual · Swatch onboarding | **Swatch onboarding** + `calendar-colors.json` | Google ICS omits colors; legend ready for API sync |
| Hidden goals | Ignore · Chart only · Insights | **Chart + goals list** | Lua/pets, meals, exercise 5h—easy to overlook |
| Admin / RBL / job | Generic thresholds | **Admin ≥4h alert**; RBL &lt;3h + 2× blocks goal; job &lt;2h thin, 3–4h/d aspirational | Personal dogfood thresholds |
| Event titles in UI | Full list · Aggregates only | **Aggregates only** | Privacy, simplicity, pattern-focus; user edits labels |
| Default horizon | Day · Week · Month · Quarter | **Last 7 days** | Weekly reflection ritual; longer views v1.1+ |
| Re-import model | Replace · Merge · History | **No re-import v1**; **history + compare v1.1** | Simplest loop first; recurrent user later |
| Journal depth | Full journal · One prompt · None | **One optional prompt** | Meaning without second product |
| Platform | Web · Native · Extension | **Web, desktop-first** | Portfolio screenshots, solo build |
| Live / research bar | Beta cohort · Solo dogfood | **Solo dogfood for portfolio** | User research scheduled after v1 story exists |
| Google sync | v1 · v1.1 · v2 | **v1.1+** | Defer integration cost |
| AI in positioning | Lead with AI · Lead with philosophy | **Philosophy / interpretation** | Not “another AI calendar” |

---

## 8. Success metrics

### If this were a real launch

| Type | Metric |
|------|--------|
| Activation | Complete first analysis → see allocation |
| Engagement | Return for second weekly reflection (v1.1: re-import) |
| Quality | “Felt calmer / more intentional” in interviews |
| Depth | Optional journal completion rate |
| Anti-metric | Churn driven by guilt-inducing copy |

### v1 dogfood (n=1)

- [ ] 4 weekly reflection sessions
- [ ] 1 tradeoff story (case-study §11)
- [ ] 3 screenshots
- [ ] 1 paragraph on how my relationship to the calendar shifted

---

## 9. Roadmap snapshot

### v1 (MVP)
- Merged ICS / upload · life areas · allocation + stats · rule-based insights · lite journal · reflection page · solo dogfood

### v1.1 (likely next)
- Re-import · **week history** · week-over-week / trimester views · Google sync · multi-file upload in UI

### v2 (vision)
- Richer journal · gentle planning · prioritization exercises · optional humane “pattern” features from [idea.md](idea.md)

### Later
- User research cohort · private beta · tasks

---

## 10. Portfolio artifacts checklist

- [ ] One-liner + tagline
- [ ] Problem slide (§2–3)
- [ ] Hero journey visual (§6)
- [ ] Tradeoffs table excerpt (§7)
- [ ] Screenshot — allocation
- [ ] Screenshot — insight cards
- [ ] Screenshot — weekly reflection
- [ ] Dogfood story (§11)
- [ ] Demo/repo link (*when exists*)
- [ ] Role clarity — product definition, scoping, copy direction, build

---

## 11. Open narrative gaps

- **Before:** *[ how I related to my calendar ]*
- **After:** *[ what shifted after reflection cycles ]*
- **Surprise:** *[ what the merged view revealed across work / projects / personal ]*
- **Tradeoff:** *[ one renunciation I noticed ]*
- **What I cut:** Re-import, comparison, AI, event titles — to ship a honest weekly mirror first
- **What’s next:** History + compare, then user conversations

---

*Last updated: May 2026.*
