function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Colored stat cards for "This week in numbers" (no Events row). */
export function renderWeekNumbersHtml(result) {
  const statCards = [
    { icon: "⏱", label: "Timed on calendar", value: `${result.scheduledTimedHours}h`, accent: "#5c6b8a" },
    { icon: "🌙", label: "Unscheduled (sleep)", value: `${result.unscheduledHours}h`, accent: "#616161" },
    { icon: "💼", label: "Meetings → PM Life", value: `${result.meetingHours}h`, accent: "#F4511E" },
    { icon: "🌅", label: "Free mornings", value: `${result.freeMorningsBefore11} days`, accent: "#33B679" },
    { icon: "🌃", label: "Open evenings", value: `${result.openEveningsAfter20} days`, accent: "#7986CB" },
    { icon: "🧹", label: "Cleaning (4w)", value: `${result.homeCleaningRolling4w}h`, accent: "#9cb89c" },
  ]
    .map(
      (s) => `
      <div class="stat-card" style="--accent:${s.accent}">
        <span class="stat-icon" aria-hidden="true">${s.icon}</span>
        <div class="stat-body">
          <span class="stat-label">${escapeHtml(s.label)}</span>
          <span class="stat-value">${escapeHtml(String(s.value))}</span>
        </div>
      </div>`
    )
    .join("");

  const mealsNote = result.mealsNote
    ? `<p class="note meals-note">🥕 ${escapeHtml(result.mealsNote)}</p>`
    : "";

  const defaultSleep = result.sleepThresholdDefault ?? 50;

  return `
    <section class="stats-hero" aria-labelledby="stats-heading">
      <h2 id="stats-heading">This week in numbers</h2>
      <div class="stats-grid">${statCards}</div>
      <div class="sleep-threshold" data-sleep-threshold-wrap>
        <label for="sleep-threshold-input">
          Unscheduled-time alarm if under
          <input type="number" id="sleep-threshold-input" min="20" max="120" step="1" value="${defaultSleep}" />
          h / week
        </label>
        <p class="note">Unscheduled ≈ night sleep & off-calendar rest (${result.weekHours}h in this range).</p>
      </div>
      ${mealsNote}
    </section>`;
}
