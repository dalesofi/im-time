# Dev setup — step by step

If Node or the preview feels confusing, follow this exactly.

## One-time

```bash
cd "/Users/sofi/Documents/AI Course/Projects/im-time"
pnpm install
```

You need **`calendars/merged.ics`** on your machine (not in git). Regenerate if needed:

```bash
python3 scripts/merge-calendars.py
```

## Do you need a UI?

| Tool | Purpose |
|------|---------|
| **CLI** `pnpm analyze:dogfood` | Enough for tuning mapping & insights — no browser |
| **Minimal UI** `pnpm dev` + `/week.html` | Pick dates, see text + bars — optional but helpful |

You do **not** need a full product UI yet. The browser preview is a thin shell around the same analysis as the CLI.

---

## Analyze a week (terminal only — no browser)

```bash
pnpm analyze:dogfood
```

Any week:

```bash
pnpm analyze --from 2026-05-17 --to 2026-05-23
```

---

## Preview in the browser

### Fatal confusion: Pomodoro / wrong app on screen

**Cause:** Port **5173** is used by many tools (Vite, Pomodoro timers, other projects). If something else owns 5173, the browser shows **that** app—not I'm Time.

**I'm Time uses port `5199` by default** so it stays out of the way.

### Steps

**1.** Stop any old server (`Ctrl+C` in that terminal).

**2.** Stop your Pomodoro dev server too if it's running (its terminal → `Ctrl+C`).

**3.**

```bash
pnpm analyze:dogfood:html   # optional — refreshes report.html
pnpm dev
```

**4.** Read the box in the terminal. Open **exactly** the URL it prints, e.g.:

```text
http://localhost:5199/week.html
```

**5.** Sanity check — in the browser open:

```text
http://localhost:5199/api/health
```

You must see: `{"app":"im-time","ok":true}`

- If you see Pomodoro or HTML from another project → **wrong port** in the address bar.
- If you see I'm Time week picker → correct.

**6.** Click **Dogfood (17–23 May)** → **Analyze this week**

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| **Pomodoro timer UI** | Wrong port. Use URL from `pnpm dev` (`:5199`), not `:5173`. Check `/api/health`. |
| “Could not analyze” in browser | Run `pnpm dev` (our server), not `serve` alone. |
| `node-ical` not found | `pnpm install` |
| Numbers look wrong | Edit `config/calendar-colors.json`, run `pnpm analyze:dogfood` again |

### Custom port

```bash
PORT=5200 pnpm dev
```

---

## Stop the server

`Ctrl+C` in the terminal where `pnpm dev` is running.

---

*See [data-display.md](data-display.md) for text-first → charts roadmap.*
