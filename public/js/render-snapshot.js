export function renderWeekSnapshot(snapshot) {
  if (!snapshot) return "";

  function esc(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function row(item, cls) {
    const label = item.emoji ? `${item.emoji} ${item.label}` : item.label;
    return `<div class="snap-row ${cls}">
      <div class="snap-head"><span class="snap-label">${esc(label)}</span>
      <span class="snap-hours">${item.hours != null ? item.hours + "h" : esc(item.value || "")}</span></div>
      <p class="snap-detail">${esc(item.detail || "")}</p></div>`;
  }

  const p = snapshot.priority;
  let html = "";
  if (p) {
    const celebrate = p.status === "celebrate" ? " 🎉" : "";
    html += `<div class="snap-priority snap-${p.status}">
      <p class="snap-section-label">Your goal this season</p>
      <div class="snap-priority-main">
        <span class="snap-priority-emoji">${p.emoji}</span>
        <div><span class="snap-priority-title">${esc(p.label)}</span>
        <span class="snap-priority-hours">${p.hours}h</span></div>
      </div>
      <p class="snap-detail">${esc(p.detail)}${celebrate}</p>
      <p class="snap-target">${esc(p.targetLabel || "")}</p></div>`;
  }
  if (snapshot.onTarget.length) {
    html += `<div class="snap-group"><p class="snap-section-label">On target & care</p>`;
    html += snapshot.onTarget
      .map((i) => row(i, i.status === "track" ? "track" : "on_target"))
      .join("");
    html += `</div>`;
  }
  if (snapshot.nudge.length) {
    html += `<div class="snap-group"><p class="snap-section-label">Gentle nudge</p>`;
    html += snapshot.nudge.map((i) => row(i, "nudge")).join("");
    html += `</div>`;
  }
  if (snapshot.alerts.length) {
    html += `<div class="snap-group"><p class="snap-section-label">Worth noticing</p>`;
    html += snapshot.alerts.map((i) => row(i, "alert")).join("");
    html += `</div>`;
  }
  if (snapshot.rhythm.length) {
    html += `<div class="snap-rhythm">`;
    html += snapshot.rhythm
      .map(
        (r) =>
          `<span class="rhythm-chip">${r.icon} ${esc(r.label)}: <strong>${esc(r.value)}</strong></span>`
      )
      .join("");
    html += `</div>`;
  }
  if (snapshot.mealsCalendarNote) {
    html += `<p class="meals-note">🥕 ${esc(snapshot.mealsCalendarNote)}</p>`;
  }
  return html;
}
