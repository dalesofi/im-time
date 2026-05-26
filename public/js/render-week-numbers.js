import {
  renderSleepThresholdControl,
  bindSleepThreshold,
  getSleepThreshold,
  sleepInsightText,
} from "./render-reflection.js";

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

export function renderWeekNumbers(data) {
  const statCards = [
    { icon: "⏱", label: "Timed on calendar", value: `${data.scheduledTimedHours}h`, accent: "#5c6b8a" },
    { icon: "🌙", label: "Unscheduled (sleep)", value: `${data.unscheduledHours}h`, accent: "#616161" },
    { icon: "💼", label: "Meetings → PM Life", value: `${data.meetingHours}h`, accent: "#F4511E" },
    { icon: "🌅", label: "Free mornings", value: `${data.freeMorningsBefore11} days`, accent: "#33B679" },
    { icon: "🌃", label: "Open evenings", value: `${data.openEveningsAfter20} days`, accent: "#7986CB" },
    { icon: "🧹", label: "Cleaning (4w)", value: `${data.homeCleaningRolling4w}h`, accent: "#9cb89c" },
  ]
    .map(
      (s) => `
      <div class="stat-card" style="--accent:${s.accent}">
        <span class="stat-icon" aria-hidden="true">${s.icon}</span>
        <div class="stat-body">
          <span class="stat-label">${esc(s.label)}</span>
          <span class="stat-value">${esc(String(s.value))}</span>
        </div>
      </div>`
    )
    .join("");

  const mealsNote = data.mealsNote
    ? `<p class="note meals-note">🥕 ${esc(data.mealsNote)}</p>`
    : "";

  return `
    <section class="stats-hero" aria-labelledby="stats-heading">
      <h2 id="stats-heading">This week in numbers</h2>
      <div class="stats-grid">${statCards}</div>
      ${renderSleepThresholdControl(data.sleepThresholdDefault ?? 50)}
      ${mealsNote}
    </section>`;
}

export function bindWeekNumbers(data, onInsightsRefresh) {
  bindSleepThreshold((threshold) => {
    onInsightsRefresh?.(threshold);
  });
}

export function mergeSleepInsight(insights, data, threshold) {
  const text = sleepInsightText(data.unscheduledHours, threshold);
  const rest = insights.filter((i) => i.id !== "unscheduled_sleep_low_client");
  if (!text) return rest;
  const alarm = {
    id: "unscheduled_sleep_low_client",
    text,
    kind: "alarm",
  };
  const withoutServerSleep = rest.filter((i) => i.id !== "unscheduled_sleep_low");
  return [alarm, ...withoutServerSleep];
}

export { getSleepThreshold };
