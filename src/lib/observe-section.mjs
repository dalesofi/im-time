import { renderThresholdEditorsHtml } from "./threshold-editors-html.mjs";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pmLifeHeroHtml(result) {
  const hours = result.pmLifeHours ?? result.areaHoursSummary?.job_search ?? 0;
  const meetingNote =
    result.meetingHours > 0
      ? `<p class="observe-hero-note">Includes ${result.meetingHours}h of meetings in this category.</p>`
      : "";
  const copy = result.observeCopy || {};
  return `
    <div class="observe-hero observe-hero--target" style="--accent:#F4511E">
      <span class="observe-hero-emoji" aria-hidden="true">💼</span>
      <div class="observe-hero-body">
        <span class="observe-hero-label">${escapeHtml(copy.seasonTargetLabel || "Your season target")}</span>
        <span class="observe-hero-title">PM Life</span>
        <span class="observe-hero-value">${hours}h</span>
        <span class="observe-hero-context">Job search, brand &amp; PM work on the calendar this week</span>
        ${meetingNote}
      </div>
    </div>`;
}

export function renderObserveSectionHtml(result) {
  const copy = result.observeCopy || {};
  const rblH = result.areaHoursSummary?.passion_rbl ?? 0;
  const djingH = result.areaHoursSummary?.djing_music ?? 0;

  const gridCards = `
      <div class="stat-card stat-card--nudge" style="--accent:#5c6b8a">
        <span class="stat-icon" aria-hidden="true">⏱</span>
        <div class="stat-body">
          <span class="stat-label">${escapeHtml(copy.scheduledTime?.label || "Scheduled time")}</span>
          <span class="stat-value">${result.scheduledTimedHours}h</span>
          <p class="stat-nudge">${escapeHtml(copy.scheduledTime?.nudge || "")}</p>
        </div>
      </div>
      <div class="stat-card stat-card--note" style="--accent:#616161">
        <span class="stat-icon" aria-hidden="true">🌙</span>
        <div class="stat-body">
          <span class="stat-label">${escapeHtml(copy.unscheduled?.label || "Unscheduled time")}</span>
          <span class="stat-value">${result.unscheduledHours}h</span>
          <p class="stat-rule">${escapeHtml(copy.unscheduled?.rule || "")}</p>
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
          <span class="stat-label">DJing &amp; music</span>
          <span class="stat-value">${djingH}h</span>
        </div>
      </div>
      <div class="stat-card" style="--accent:#33B679">
        <span class="stat-icon" aria-hidden="true">🌅</span>
        <div class="stat-body">
          <span class="stat-label">Free mornings</span>
          <span class="stat-value">${result.freeMorningsBefore11} days</span>
        </div>
      </div>
      <div class="stat-card" style="--accent:#7986CB">
        <span class="stat-icon" aria-hidden="true">🌃</span>
        <div class="stat-body">
          <span class="stat-label">Open evenings</span>
          <span class="stat-value">${result.openEveningsAfter20} days</span>
        </div>
      </div>`;

  const thresholdsHtml = renderThresholdEditorsHtml(result.observeThresholds);

  return `
    <section class="stats-hero observe-section" aria-labelledby="observe-heading">
      <h2 id="observe-heading">${escapeHtml(copy.sectionTitle || "Take a moment to observe")}</h2>
      <p class="observe-subtitle">${escapeHtml(copy.sectionSubtitle || "This week in numbers")}</p>
      ${pmLifeHeroHtml(result)}
      <div class="stats-grid">${gridCards}</div>
      ${thresholdsHtml}
    </section>`;
}
