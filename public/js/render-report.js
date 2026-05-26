import {
  renderWeekNumbers,
  bindWeekNumbers,
  applyClientInsights,
} from "./render-week-numbers.js";
import { renderAllocationSection } from "./render-allocation.js";
import { renderReflection, bindReflection } from "./render-reflection.js";
function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function renderHeader(data) {
  const name = data.branding?.appName || "I'm Time";
  const slogan = data.branding?.slogan || "You are time. Prioritize what matters.";
  return `
    <header class="app-header">
      <p class="app-name">${esc(name)}</p>
      <h1 class="app-slogan">${esc(slogan)}</h1>
      <p class="sub">Week of ${esc(data.week)} · ${data.eventCount} events on calendar</p>
    </header>`;
}

function renderInsights(insights) {
  return insights
    .map((c) => {
      const kind =
        c.kind ||
        (c.id?.includes("celebrate") || c.id === "pm_life_celebrate"
          ? "celebrate"
          : c.id?.includes("sleep") || c.id?.includes("rest") || c.id?.includes("unscheduled")
            ? "alarm"
            : "");
      return `<article class="insight${kind ? ` insight--${kind}` : ""}">
        <p class="insight-text">${esc(c.text)}</p>
        <p class="insight-id">${esc(c.id)}</p>
      </article>`;
    })
    .join("");
}

function paintInsights(data) {
  const merged = applyClientInsights(data.insights, data, data.observeThresholds);
  const el = document.getElementById("insights-list");
  if (el) el.innerHTML = renderInsights(merged) || "<p class='note'>None this week.</p>";
}

function render(data) {
  document.getElementById("app").innerHTML = `
    ${renderHeader(data)}
    ${renderAllocationSection(data)}
    <div id="week-numbers">${renderWeekNumbers(data)}</div>
    <section><h2>Insight cards</h2><div id="insights-list"></div></section>
    <div id="reflection-wrap">${renderReflection(data.weekFrom, data.weekTo)}</div>`;

  paintInsights(data);
  bindWeekNumbers(data, () => paintInsights(data));
  bindReflection(data.weekFrom, data.weekTo);
}

const params = new URLSearchParams(location.search);
const from = params.get("from");
const to = params.get("to");

if (!from || !to) {
  location.href = "/week.html";
} else {
  fetch(`/api/analyze?from=${from}&to=${to}`)
    .then((r) => r.json())
    .then((data) => {
      if (data.error) throw new Error(data.error);
      render(data);
    })
    .catch((err) => {
      document.getElementById("app").innerHTML = `<p class="err">${esc(err.message)}</p><p>Run <code>pnpm dev</code>.</p>`;
    });
}
