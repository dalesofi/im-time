import { renderWeekNumbers, bindWeekNumbers, mergeSleepInsight, getSleepThreshold } from "./render-week-numbers.js";
import { renderBars } from "./render-bars.js";
import { renderReflection, bindReflection } from "./render-reflection.js";

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function areaLabel(r) {
  return r.emoji ? `${r.emoji} ${r.label}` : r.label;
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
      const kind = c.kind || (c.id === "pm_life_celebrate" ? "celebrate" : c.id?.includes("sleep") ? "alarm" : "");
      return `<article class="insight${kind ? ` insight--${kind}` : ""}">
        <p class="insight-text">${esc(c.text)}</p>
        <p class="insight-id">${esc(c.id)}</p>
      </article>`;
    })
    .join("");
}

let latestData = null;

function paintInsights(data, threshold) {
  const merged = mergeSleepInsight(data.insights, data, threshold);
  const el = document.getElementById("insights-list");
  if (el) el.innerHTML = renderInsights(merged) || "<p class='note'>None this week.</p>";
}

function render(data) {
  latestData = data;
  const chartRows = data.chartAllocation || data.allocation;
  const fullList = data.allocation
    .map((r) => `<li>${esc(areaLabel(r))}: <strong>${r.hours}h</strong> (${r.percent}%)</li>`)
    .join("");
  const threshold = getSleepThreshold(data.sleepThresholdDefault ?? 50);

  document.getElementById("app").innerHTML = `
    ${renderHeader(data)}
    <section><h2>Where your timed hours went</h2>${renderBars(chartRows)}
      <p class="note">Bar fill = your Google color · width = share of the ${data.weekHours}h week. ${data.eventCount} events in range.</p>
      <details><summary>Full breakdown</summary><ul>${fullList}</ul></details></section>
    <div id="week-numbers">${renderWeekNumbers(data)}</div>
    <section><h2>Insight cards</h2><div id="insights-list">${renderInsights(mergeSleepInsight(data.insights, data, threshold))}</div></section>
    <div id="reflection-wrap">${renderReflection(data.weekFrom, data.weekTo)}</div>`;

  bindWeekNumbers(data, (t) => paintInsights(data, t));
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
