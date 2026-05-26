function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(item, statusClass) {
  const label = item.emoji ? `${item.emoji} ${item.label}` : item.label;
  return `
    <div class="snap-row ${statusClass}">
      <div class="snap-head">
        <span class="snap-label">${escapeHtml(label)}</span>
        <span class="snap-hours">${item.hours != null ? `${item.hours}h` : escapeHtml(item.value || "")}</span>
      </div>
      <p class="snap-detail">${escapeHtml(item.detail || "")}</p>
    </div>`;
}

export function renderWeekSnapshotHtml(snapshot) {
  if (!snapshot) return "";

  const p = snapshot.priority;
  const priorityBlock = p
    ? `
    <div class="snap-priority snap-${p.status}" role="status">
      <p class="snap-section-label">Your goal this season</p>
      <div class="snap-priority-main">
        <span class="snap-priority-emoji">${p.emoji}</span>
        <div>
          <span class="snap-priority-title">${escapeHtml(p.label)}</span>
          <span class="snap-priority-hours">${p.hours}h</span>
        </div>
      </div>
      <p class="snap-detail">${escapeHtml(p.detail)}${p.status === "celebrate" ? " 🎉" : ""}</p>
      <p class="snap-target">${escapeHtml(p.targetLabel || "")}</p>
    </div>`
    : "";

  const onTarget =
    snapshot.onTarget.length > 0
      ? `<div class="snap-group snap-group-ok">
      <p class="snap-section-label">On target & care</p>
      ${snapshot.onTarget.map((i) => row(i, i.status === "track" ? "track" : "on_target")).join("")}
    </div>`
      : "";

  const nudge =
    snapshot.nudge.length > 0
      ? `<div class="snap-group snap-group-nudge">
      <p class="snap-section-label">Gentle nudge</p>
      ${snapshot.nudge.map((i) => row(i, "nudge")).join("")}
    </div>`
      : "";

  const alerts =
    snapshot.alerts.length > 0
      ? `<div class="snap-group snap-group-alert">
      <p class="snap-section-label">Worth noticing</p>
      ${snapshot.alerts.map((i) => row(i, "alert")).join("")}
    </div>`
      : "";

  const rhythm =
    snapshot.rhythm.length > 0
      ? `<div class="snap-rhythm">
      ${snapshot.rhythm
        .map(
          (r) =>
            `<span class="rhythm-chip"><span aria-hidden="true">${r.icon}</span> ${escapeHtml(r.label)}: <strong>${escapeHtml(r.value)}</strong></span>`
        )
        .join("")}
    </div>`
      : "";

  const mealsNote = snapshot.mealsCalendarNote
    ? `<p class="meals-note">🥕 ${escapeHtml(snapshot.mealsCalendarNote)}</p>`
    : "";

  return `${priorityBlock}${onTarget}${nudge}${alerts}${rhythm}${mealsNote}`;
}
