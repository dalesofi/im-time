const STORAGE_PREFIX = "imtime-reflection-";

export function renderReflection(from, to) {
  const key = `${from}_${to}`;
  return `
    <section class="reflection" aria-labelledby="reflection-heading">
      <h2 id="reflection-heading">Close the week</h2>
      <div class="reflection-field">
        <label for="surprising-${key}">Something surprising</label>
        <p class="reflection-prompt">What surprised you about how this week actually felt — not what the calendar predicted?</p>
        <textarea id="surprising-${key}" rows="3" placeholder="A moment, a mismatch, a quiet win…"></textarea>
      </div>
      <div class="reflection-field">
        <label for="grateful-${key}">Grateful for</label>
        <p class="reflection-prompt">One thing you're grateful for this week — big, small, or silly.</p>
        <textarea id="grateful-${key}" rows="3" placeholder="Lua, a conversation, rest, a meal…"></textarea>
      </div>
      <p class="note reflection-saved" hidden data-reflection-status>Saved on this device.</p>
    </section>`;
}

export function bindReflection(from, to) {
  const storageKey = `${STORAGE_PREFIX}${from}_${to}`;
  const surprising = document.getElementById(`surprising-${from}_${to}`);
  const grateful = document.getElementById(`grateful-${from}_${to}`);
  const status = document.querySelector("[data-reflection-status]");
  if (!surprising || !grateful) return;

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    if (saved.surprising) surprising.value = saved.surprising;
    if (saved.grateful) grateful.value = saved.grateful;
  } catch {
    /* ignore */
  }

  const save = () => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ surprising: surprising.value, grateful: grateful.value })
    );
    if (status) {
      status.hidden = false;
      clearTimeout(status._t);
      status._t = setTimeout(() => {
        status.hidden = true;
      }, 2000);
    }
  };

  surprising.addEventListener("input", save);
  grateful.addEventListener("input", save);
}

const SLEEP_KEY = "imtime-sleep-threshold-hours";

export function renderSleepThresholdControl(defaultHours) {
  const stored = getSleepThreshold(defaultHours);
  return `
    <div class="sleep-threshold" data-sleep-threshold-wrap>
      <label for="sleep-threshold-input">
        Unscheduled time alarm (mostly night sleep) if under
        <input type="number" id="sleep-threshold-input" min="20" max="120" step="1" value="${stored}" />
        h / week
      </label>
      <p class="note">Unscheduled = week hours minus what's on your calendar. Edit threshold — saved on this device.</p>
    </div>`;
}

export function getSleepThreshold(defaultHours = 50) {
  const v = Number(localStorage.getItem(SLEEP_KEY));
  return Number.isFinite(v) && v > 0 ? v : defaultHours;
}

export function bindSleepThreshold(onChange) {
  const input = document.getElementById("sleep-threshold-input");
  if (!input) return;
  input.addEventListener("change", () => {
    localStorage.setItem(SLEEP_KEY, String(input.value));
    onChange(Number(input.value));
  });
}

export function sleepInsightText(unscheduledHours, threshold) {
  if (unscheduledHours >= threshold) return null;
  return `Only about ${unscheduledHours}h unscheduled this week (nights & off-calendar time) — below your ${threshold}h sleep margin. The calendar may be overcrowded; worth protecting rest.`;
}
