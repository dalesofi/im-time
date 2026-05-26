import { renderBars } from "./render-bars.js";

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

export function areaLabel(r) {
  return r.emoji ? `${r.emoji} ${r.label}` : r.label;
}

export function renderAllocationSection(data) {
  const copy = data.observeCopy?.allocation || {};
  const chartRows = data.chartAllocation || data.allocation;
  const fullList = (data.fullBreakdown || data.allocation)
    .map(
      (r) =>
        `<li><span class="breakdown-emoji" aria-hidden="true">${r.emoji || ""}</span> <span>${esc(r.label)}: <strong>${r.hours}h</strong> <span class="pct">(${r.percent}%)</span></span></li>`
    )
    .join("");

  return `
    <section class="allocation-section" aria-labelledby="alloc-heading">
      <p class="section-eyebrow">${esc(copy.eyebrow || "Time flies, but…")}</p>
      <h2 id="alloc-heading">${esc(copy.title || "Where did time go this week?")}</h2>
      ${renderBars(chartRows)}
      <details class="full-detail">
        <summary>Full breakdown</summary>
        <ul class="full-list breakdown-list">${fullList}</ul>
      </details>
    </section>`;
}
