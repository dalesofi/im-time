# I'm Time — Case Study (PM portfolio draft)

> **Purpose:** Story for hiring managers and your portfolio site. Complements a future live demo.  
> **Not included here:** Tech stack, architecture, or how insights are built.

**Related docs:** [mvp.md](mvp.md) (product spec) · [plan.md](plan.md) (phases) · [idea.md](idea.md) (full thesis)

---

## 1. Elevator pitch

Most people who use calendars already have the data—they just don’t have a humane way to look at it. Productivity tools turn time into a scorecard: optimize, hustle, fix your schedule. I'm Time starts elsewhere: **finite humans deserve reflection, not judgment.**

**I'm Time** is a reflective web companion that imports a week from your calendar (via ICS in v1), shows where your time actually went, and offers calm interpretation—insight cards and a weekly reflection moment—plus an optional prompt about surprise or gratitude. The differentiator is **interpretation, not optimization.**

I’m building it as a portfolio product to demonstrate product thinking end-to-end: problem framing, scoped MVP, dogfood, and a clear point of view on a crowded market.

---

## 2. Why this problem

Calendar apps answer *what’s on the schedule*. They rarely help answer *what kind of life this week resembled*—how much was meetings vs rest, how much space was left unplanned, whether the week matched what actually matters.

Meanwhile, “productivity culture” promises that the right system will eliminate tradeoffs. Oliver Burkeman’s *Four Thousand Weeks* and similar humane-time thinking argue the opposite: life is finite; choosing is renouncing; overplanning is often anxiety in disguise.

**Personal connection (for narrative, not ICP):** I’ve felt the exhaustion of optimizing time without feeling more at peace. I'm Time is an experiment in building the tool I wished existed—while designing for a broader “reflective optimizer” persona, not “software for me only.”

**Gap in the market:** Tools cluster at extremes—raw calendars, ruthless optimizers, or generic wellness apps. Few products sit in the middle: **data-informed, emotionally intelligent, anti-hustle.**

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
| Humane calendar interpretation | AI life coach or therapist |
| Weekly awareness ritual | Daily optimization dashboard |

**Tagline:** *Make space for what matters.*

---

## 4. Problem validation plan

*Fill in findings as you learn. This section is your research log outline.*

### Methods

| Method | Purpose | Status |
|--------|---------|--------|
| Founder dogfood | 4+ weekly ICS → reflection cycles on own calendar | Not started |
| ICS export test | Confirm export works from your calendar provider | Not started |
| 2–3 informal conversations | Validate language (“calm” vs “productive”), willingness to re-import weekly | Optional |
| Portfolio review | Does the story land with 1–2 PM mentors? | Optional |

### Questions to explore

- Do people feel **guilty** looking at calendar stats today? What wording makes it worse/better?
- Is **manual weekly ICS upload** a dealbreaker or acceptable for a reflective ritual?
- Which insight feels **true** vs **generic** on a real week?

### Findings (placeholder)

```text
[ Date ] — Observation:
[ Date ] — Observation:
```

---

## 5. Hypotheses

Testable beliefs to validate during dogfood and conversations.

| # | Hypothesis | How we’d know | Status |
|---|------------|---------------|--------|
| H1 | Compassionate framing reduces guilt vs raw calendar stats alone | Dogfood journal + self-report; optional user quotes | Untested |
| H2 | A single weekly reflection page is more valuable than a daily dashboard | Users return weekly; don’t ask for daily view in v1 | Untested |
| H3 | “Where time went” (allocation) is the right v1 wedge before planning or tasks | Users complete loop without needing tasks | Untested |
| H4 | Manual ICS import is acceptable for v1 if reflection quality is high | You complete 4 cycles; others don’t bounce at upload | Untested |
| H5 | One optional journal prompt adds meaning without feeling like homework | Some weeks you write; skip feels fine | Untested |

*Add, edit, or remove hypotheses as you learn.*

---

## 6. Solution overview

**v1 summary:** Web app, desktop-first. User uploads ICS → maps calendar signals to life areas → sees week allocation and stats → reads insight cards → optionally answers one surprise/gratitude-style prompt → lands on a single **weekly reflection** page.

Full feature list and acceptance criteria: [mvp.md](mvp.md).

### Hero journey (prose)

You open I'm Time and see a calm welcome—this is not another productivity app. You export last week from your calendar and upload the file. The first time, you tell the app how your colors or categories map to what matters: work, relationships, rest, and the rest. Then you see the truth of the week: not a grade, but a distribution—hours in meetings, open blocks, quiet evenings. A few observations appear in plain language, careful not to shame. If you want, you write one line about what surprised you. You leave with a single page that feels like closing a notebook. Next week, you do it again.

---

## 7. Key decisions & tradeoffs

| Decision | Options considered | Choice (v1) | Why |
|----------|-------------------|-------------|-----|
| MVP wedge | Awareness · Reflection/journal · Planning · Prioritization | **Awareness** | Strongest proof of “interpretation not optimization”; uses calendar data directly |
| Calendar input | Google OAuth · ICS import · Demo data only | **ICS import** | Ships learning loop without OAuth complexity; good for solo dogfood |
| Journal depth | Full gratitude journal · Lite one prompt · None | **Lite one prompt** | Counterweight to data without building a second product |
| Platform | Web · Mobile native · Extension | **Web, responsive, desktop-first** | Fastest path to portfolio screenshots and solo use |
| Live bar | Auth + deploy · Local solo · Private beta | **Simplest solo try first** | Validate loop before accounts and hosting |
| Insight mechanism | Rules · Templates · Manual · Automated | **TBD** | Documented as open question—decide after reading specs, not defaulted |
| Google sync | v1 · v1.1 · v2 | **v1.1+** | Defer integration cost; manual export is acceptable for ritual |
| AI in positioning | Lead with AI · Lead with philosophy | **Philosophy / interpretation** | Differentiation is tone and framing, not “another AI calendar” |

*Edit this table as decisions change.*

---

## 8. Success metrics

### If this were a real launch

| Type | Metric |
|------|--------|
| Activation | % who complete first ICS upload and see allocation |
| Engagement | Weekly return rate (second upload within 14 days) |
| Quality | Qualitative: “felt calmer / more intentional” in interviews |
| Depth | % who optional-complete journal prompt |
| Anti-metric | Low churn *because* of guilt language (watch support/feedback) |

### What I’ll demonstrate with v1 dogfood (n=1)

- [ ] 4 weekly reflection cycles completed.
- [ ] 1 articulated tradeoff (e.g. scheduled rest vs actual meeting creep).
- [ ] 3 screenshots of weekly reflection page.
- [ ] 1 paragraph in my voice on what changed in how I relate to my calendar.

*Quantitative numbers from others: fill after optional conversations.*

---

## 9. Roadmap snapshot

No dates committed—sequence only.

### v1 (MVP)
- ICS import · life-area mapping · allocation + stats · insight cards · lite journal · weekly reflection page · solo dogfood

### v1.1 (likely next)
- Google Calendar sync · history across weeks · improved re-import / comparison

### v2 (vision from idea.md)
- Richer gratitude/surprise journal · gentle planning assistant · prioritization exercises · pattern recognition with humane framing · optional lightweight todos

### Long-term
- A credible “humane productivity” category—tools that acknowledge finitude, emotion, and unpredictability rather than machine optimization.

---

## 10. Portfolio artifacts checklist

Use on portfolio site and in interviews.

- [ ] **One-liner** + tagline (from §1)
- [ ] **Problem slide** — productivity guilt vs humane reflection (§2–3)
- [ ] **Hero journey** diagram or 3-step visual (§6)
- [ ] **Tradeoffs table** excerpt (§7)
- [ ] **Screenshot** — allocation view
- [ ] **Screenshot** — insight cards
- [ ] **Screenshot** — full weekly reflection page
- [ ] **Dogfood story** — 1 tradeoff paragraph (§11)
- [ ] **Quote** — from you or a tester (*permission if not you*)
- [ ] **Link** — repo or demo URL (*when exists*)
- [ ] **Role clarity** — “I owned product definition, scoping, copy direction, and build” (*adjust to truth*)

---

## 11. Open narrative gaps

Complete after dogfood and polish. Replace bracketed placeholders.

- **Before:** How I related to my calendar before I'm Time — *[ write ]*
- **After:** What shifted after 4 weeks — *[ write ]*
- **Surprise:** What I didn’t expect in the data — *[ write ]*
- **Tradeoff:** One conscious renunciation I noticed — *[ write ]*
- **User voice:** Quote from conversation or your own — *"[ quote ]"*
- **What I’d do next:** Top 2 roadmap items if I had 3 more months — *[ write ]*
- **What I cut and why:** Scope you said no to — *[ write ]*

---

*This is a living draft. Update after each dogfood week and before sharing on your portfolio site.*
