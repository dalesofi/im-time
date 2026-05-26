function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Bar width = share of week hours; fill uses Google legend hex. Emoji only (no dots). */
export function renderBarsHtml(rows) {
  return rows
    .map((row) => {
      const color = row.hex || "#5c6b8a";
      const emoji = row.emoji || "";
      const name = row.label || row.id;
      const pct = row.weekPercent ?? row.percent ?? 0;
      const w = row.hours > 0 ? Math.max(3, Math.min(100, Math.round(pct))) : 0;
      const nudge = row.nudge
        ? `<p class="bar-nudge">${escapeHtml(row.nudge)}</p>`
        : "";
      return `
        <div class="bar-row${row.hours <= 0 ? " bar-row--empty" : ""}">
          <div class="bar-label">
            <span class="bar-emoji" aria-hidden="true">${emoji}</span>
            <span class="bar-name">${escapeHtml(name)}</span>
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

export function renderAppHeaderHtml(result, branding) {
  const name = branding?.appName || "I'm Time";
  const slogan = branding?.slogan || "You are time. Prioritize what matters.";
  return `
    <header class="app-header">
      <p class="app-name">${escapeHtml(name)}</p>
      <h1 class="app-slogan">${escapeHtml(slogan)}</h1>
      <p class="sub">Week of ${escapeHtml(result.week)} · ${result.eventCount} events on calendar</p>
    </header>`;
}

export function renderReflectionHtml(from, to) {
  const key = `${from}_${to}`;
  return `
    <section class="reflection" aria-labelledby="reflection-heading">
      <h2 id="reflection-heading">Close the week</h2>
      <div class="reflection-field">
        <label for="surprising-${key}">Something surprising</label>
        <p class="reflection-prompt" id="surprising-hint-${key}">What surprised you about how this week actually felt — not what the calendar predicted?</p>
        <textarea id="surprising-${key}" name="surprising" rows="3" aria-describedby="surprising-hint-${key}" placeholder="A moment, a mismatch, a quiet win…"></textarea>
      </div>
      <div class="reflection-field">
        <label for="grateful-${key}">Grateful for</label>
        <p class="reflection-prompt" id="grateful-hint-${key}">One thing you're grateful for this week — big, small, or silly.</p>
        <textarea id="grateful-${key}" name="grateful" rows="3" aria-describedby="grateful-hint-${key}" placeholder="Lua, a conversation, rest, a meal…"></textarea>
      </div>
      <p class="note reflection-saved" hidden data-reflection-status>Saved on this device.</p>
    </section>`;
}
