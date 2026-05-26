import {
  renderThresholdEditors,
  bindThresholdEditors,
  applyClientInsights,
} from "./render-thresholds.js";

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function pmLifeHero(data) {
  const hours = data.pmLifeHours ?? data.areaHoursSummary?.job_search ?? 0;
  const meetingNote =
    data.meetingHours > 0
      ? `<p class="observe-hero-note">Includes ${data.meetingHours}h of meetings in this category.</p>`
      : "";
  const copy = data.observeCopy || {};
  return `
    <div class="observe-hero observe-hero--target" style="--accent:#F4511E">
      <span class="observe-hero-emoji" aria-hidden="true">💼</span>
      <div class="observe-hero-body">
        <span class="observe-hero-label">${esc(copy.seasonTargetLabel || "Your season target")}</span>
        <span class="observe-hero-title">PM Life</span>
        <span class="observe-hero-value">${hours}h</span>
        <span class="observe-hero-context">Job search, brand & PM work on the calendar this week</span>
        ${meetingNote}
      </div>
    </div>`;
}

export function renderWeekNumbers(data) {
  const copy = data.observeCopy || {};
  const rblH = data.areaHoursSummary?.passion_rbl ?? 0;
  const djingH = data.areaHoursSummary?.djing_music ?? 0;

  const grid = `
      <div class="stat-card stat-card--nudge" style="--accent:#5c6b8a">
        <span class="stat-icon" aria-hidden="true">⏱</span>
        <div class="stat-body">
          <span class="stat-label">${esc(copy.scheduledTime?.label || "Scheduled time")}</span>
          <span class="stat-value">${data.scheduledTimedHours}h</span>
          <p class="stat-nudge">${esc(copy.scheduledTime?.nudge || "")}</p>
        </div>
      </div>
      <div class="stat-card stat-card--note" style="--accent:#616161">
        <span class="stat-icon" aria-hidden="true">🌙</span>
        <div class="stat-body">
          <span class="stat-label">${esc(copy.unscheduled?.label || "Unscheduled time")}</span>
          <span class="stat-value">${data.unscheduledHours}h</span>
          <p class="stat-rule">${esc(copy.unscheduled?.rule || "")}</p>
        </div>
      </div>
      <div class="stat-card" style="--accent:#3F51B5">
        <span class="stat-icon" aria-hidden="true">📻</span>
        <div class="stat-body">
          <span class="stat-label">Radio Life</span>
          <span class="stat-value">${rblH}h</span>
        </div>
      </div>
      <div class="stat-card" style="--accent:#3F51B5">
        <span class="stat-icon" aria-hidden="true">🎧</span>
        <div class="stat-body">
          <span class="stat-label">DJing & music</span>
          <span class="stat-value">${djingH}h</span>
        </div>
      </div>
      <div class="stat-card" style="--accent:#33B679">
        <span class="stat-icon" aria-hidden="true">🌅</span>
        <div class="stat-body">
          <span class="stat-label">Free mornings</span>
          <span class="stat-value">${data.freeMorningsBefore11} days</span>
        </div>
      </div>
      <div class="stat-card" style="--accent:#7986CB">
        <span class="stat-icon" aria-hidden="true">🌃</span>
        <div class="stat-body">
          <span class="stat-label">Open evenings</span>
          <span class="stat-value">${data.openEveningsAfter20} days</span>
        </div>
      </div>`;

  return `
    <section class="stats-hero observe-section" aria-labelledby="observe-heading">
      <h2 id="observe-heading">${esc(copy.sectionTitle || "Take a moment to observe")}</h2>
      <p class="observe-subtitle">${esc(copy.sectionSubtitle || "This week in numbers")}</p>
      ${pmLifeHero(data)}
      <div class="stats-grid">${grid}</div>
      ${renderThresholdEditors(data.observeThresholds?.thresholds || [])}
    </section>`;
}

export function bindWeekNumbers(data, onInsightsRefresh) {
  bindThresholdEditors(() => onInsightsRefresh?.());
}

export function mergeSleepInsight(insights, data, _threshold, thresholdsConfig) {
  return applyClientInsights(insights, data, thresholdsConfig || data.observeThresholds);
}

export { applyClientInsights };
