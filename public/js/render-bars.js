export function renderBars(rows) {
  return rows
    .map((row) => {
      const color = row.hex || "#5c6b8a";
      const emoji = row.emoji || "";
      const name = row.label || row.id;
      const pct = row.weekPercent ?? row.percent ?? 0;
      const w = row.hours > 0 ? Math.max(3, Math.min(100, Math.round(pct))) : 0;
      const nudge = row.nudge ? `<p class="bar-nudge">${esc(row.nudge)}</p>` : "";
      return `
        <div class="bar-row${row.hours <= 0 ? " bar-row--empty" : ""}">
          <div class="bar-label">
            <span class="bar-emoji" aria-hidden="true">${emoji}</span>
            <span class="bar-name">${esc(name)}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${w}%;background:${color}"></div>
          </div>
          <div class="bar-meta">${row.hours}h <span class="pct">${row.percent}%</span></div>
          ${nudge}
        </div>`;
    })
    .join("");
}

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}
