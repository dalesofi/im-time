function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderThresholdEditorsHtml(observeThresholds) {
  const thresholds = observeThresholds?.thresholds || [];
  if (!thresholds.length) return "";
  const rows = thresholds
    .map(
      (t) => `
        <div class="threshold-row">
          <label for="threshold-${escapeHtml(t.id)}">${escapeHtml(t.label)}</label>
          <input type="number" id="threshold-${escapeHtml(t.id)}" data-threshold-key="${escapeHtml(t.storageKey)}"
            min="${t.min ?? 1}" max="${t.max ?? 200}" step="1" value="${t.default}" />
          <span class="threshold-suffix">${escapeHtml(t.suffix || "")}</span>
        </div>`
    )
    .join("");
  return `
    <div class="threshold-editors" data-threshold-editors>
      <p class="threshold-editors-title">Your floors &amp; ceilings</p>
      <p class="note">Saved on this device — tunes gentle alarms in insight cards.</p>
      ${rows}
    </div>`;
}
