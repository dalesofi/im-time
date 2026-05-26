function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

export function getThreshold(storageKey, defaultVal) {
  const v = Number(localStorage.getItem(storageKey));
  return Number.isFinite(v) && v > 0 ? v : defaultVal;
}

export function renderThresholdEditors(thresholds = []) {
  if (!thresholds.length) return "";
  const rows = thresholds
    .map((t) => {
      const val = getThreshold(t.storageKey, t.default);
      return `
        <div class="threshold-row">
          <label for="threshold-${esc(t.id)}">${esc(t.label)}</label>
          <input type="number" id="threshold-${esc(t.id)}" data-threshold-key="${esc(t.storageKey)}"
            min="${t.min ?? 1}" max="${t.max ?? 200}" step="1" value="${val}" />
          <span class="threshold-suffix">${esc(t.suffix || "")}</span>
        </div>`;
    })
    .join("");
  return `
    <div class="threshold-editors" data-threshold-editors>
      <p class="threshold-editors-title">Your floors &amp; ceilings</p>
      <p class="note">Saved on this device — adjusts gentle alarms in insight cards.</p>
      ${rows}
    </div>`;
}

export function bindThresholdEditors(onChange) {
  document.querySelectorAll("[data-threshold-editors] input").forEach((input) => {
    const key = input.dataset.thresholdKey;
    if (key) {
      const saved = localStorage.getItem(key);
      if (saved) input.value = saved;
    }
    input.addEventListener("change", () => {
      if (key) localStorage.setItem(key, String(input.value));
      onChange?.();
    });
  });
}

export function applyClientInsights(insights, data, thresholdsConfig) {
  const t = thresholdsConfig?.thresholds || [];
  const sleep = getThreshold(
    t.find((x) => x.id === "unscheduled_sleep")?.storageKey || "imtime-sleep-threshold-hours",
    data.sleepThresholdDefault ?? 50
  );
  const pmFloor = getThreshold(
    t.find((x) => x.id === "pm_life_celebrate")?.storageKey || "imtime-threshold-pm-life",
    12
  );
  const djingFloor = getThreshold(
    t.find((x) => x.id === "djing_music")?.storageKey || "imtime-threshold-djing",
    10
  );

  let out = insights.filter(
    (i) =>
      ![
        "unscheduled_sleep_low_client",
        "night_rest_low_client",
        "pm_life_celebrate_client",
        "djing_music_low_client",
      ].includes(i.id)
  );

  const unscheduled = data.unscheduledHours ?? 0;
  if (unscheduled < sleep) {
    out = [
      {
        id: "unscheduled_sleep_low_client",
        text: `Unscheduled time is about ${unscheduled}h this week — below your ${sleep}h line. Space off the calendar may be thin; worth noticing.`,
        kind: "alarm",
      },
      ...out.filter((i) => i.id !== "night_rest_low" && i.id !== "unscheduled_sleep_low"),
    ];
  }

  const pmH = data.areaHoursSummary?.job_search ?? data.pmLifeHours ?? 0;
  if (pmH >= pmFloor) {
    const hasCelebrate = out.some((i) => i.id === "pm_life_celebrate");
    if (!hasCelebrate) {
      out = [
        {
          id: "pm_life_celebrate_client",
          text: `💼 PM Life: ${pmH}h on the calendar — at or above your ${pmFloor}h target. That season focus is showing up.`,
          kind: "celebrate",
        },
        ...out,
      ];
    }
  }

  const djingH = data.areaHoursSummary?.djing_music ?? 0;
  if (djingH < djingFloor) {
    out = [
      ...out.filter((i) => i.id !== "djing_music_low"),
      {
        id: "djing_music_low_client",
        text: `DJing & music: about ${djingH}h — under your ${djingFloor}h gentle floor. Paid creative path — worth protecting when you can.`,
      },
    ];
  }

  return out.slice(0, 5);
}
