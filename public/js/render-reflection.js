const STORAGE_PREFIX = "imtime-reflection-";
const SLEEP_KEY = "imtime-sleep-threshold-hours";

function storageKey(from, to) {
  return `${STORAGE_PREFIX}${from}_${to}`;
}

export function loadReflection(from, to) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(from, to)) || "{}");
  } catch {
    return {};
  }
}

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function renderSavedPanel(from, to, saved) {
  const hasContent = Boolean(saved.surprising?.trim() || saved.grateful?.trim());
  if (!hasContent) {
    return `<div class="reflection-display" id="reflection-display" hidden></div>`;
  }
  const surprising = saved.surprising?.trim()
    ? `<div class="reflection-display-block">
        <p class="reflection-display-label">Something surprising</p>
        <p class="reflection-display-text">${esc(saved.surprising)}</p>
      </div>`
    : "";
  const grateful = saved.grateful?.trim()
    ? `<div class="reflection-display-block">
        <p class="reflection-display-label">Grateful for</p>
        <p class="reflection-display-text">${esc(saved.grateful)}</p>
      </div>`
    : "";
  return `
    <div class="reflection-display" id="reflection-display">
      <h3 class="reflection-display-heading">Your reflections this week</h3>
      <p class="reflection-display-hint">Saved on this device — edit below anytime.</p>
      ${surprising}
      ${grateful}
    </div>`;
}

export function renderReflection(from, to) {
  const key = `${from}_${to}`;
  const saved = loadReflection(from, to);
  return `
    <section class="reflection" aria-labelledby="reflection-heading">
      <h2 id="reflection-heading">Close the week</h2>
      <p class="reflection-lede">Optional — a few lines help future-you remember what the numbers missed.</p>
      ${renderSavedPanel(from, to, saved)}
      <div class="reflection-field">
        <label for="surprising-${key}">Something surprising</label>
        <p class="reflection-prompt">What surprised you about how this week actually felt — not what the calendar predicted?</p>
        <textarea id="surprising-${key}" rows="3" placeholder="A moment, a mismatch, a quiet win…">${esc(saved.surprising || "")}</textarea>
      </div>
      <div class="reflection-field">
        <label for="grateful-${key}">Grateful for</label>
        <p class="reflection-prompt">One thing you're grateful for this week — big, small, or silly.</p>
        <textarea id="grateful-${key}" rows="3" placeholder="Lua, a conversation, rest, a meal…">${esc(saved.grateful || "")}</textarea>
      </div>
      <p class="note reflection-saved" hidden data-reflection-status>Saved on this device.</p>
    </section>`;
}

function updateDisplay(from, to, saved) {
  const wrap = document.getElementById("reflection-display");
  if (!wrap) return;
  const parent = wrap.parentElement;
  const html = renderSavedPanel(from, to, saved);
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const next = temp.firstElementChild;
  if (wrap && next) wrap.replaceWith(next);
}

export function bindReflection(from, to) {
  const surprising = document.getElementById(`surprising-${from}_${to}`);
  const grateful = document.getElementById(`grateful-${from}_${to}`);
  const status = document.querySelector("[data-reflection-status]");
  if (!surprising || !grateful) return;

  const save = () => {
    const payload = { surprising: surprising.value, grateful: grateful.value };
    localStorage.setItem(storageKey(from, to), JSON.stringify(payload));
    updateDisplay(from, to, payload);
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

export function getSleepThreshold(defaultHours = 50) {
  const v = Number(localStorage.getItem(SLEEP_KEY));
  return Number.isFinite(v) && v > 0 ? v : defaultHours;
}
