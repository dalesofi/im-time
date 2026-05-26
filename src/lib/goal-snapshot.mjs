function areaH(stats, id) {
  return Math.round((stats.areaHours[id] || 0) * 10) / 10;
}

function metaFor(areaId, lifeAreas) {
  const a = lifeAreas.lifeAreas?.find((x) => x.id === areaId);
  return {
    id: areaId,
    label: a?.label || areaId,
    emoji: a?.emoji || "",
    hex: a?.hex || "#5c6b8a",
  };
}

export function buildWeekSnapshot(stats, snapshotConfig, lifeAreas, priorities = []) {
  const cfg = snapshotConfig || {};
  const scheduled = stats.scheduledTimedHours || 1;
  const out = { priority: null, onTarget: [], nudge: [], alerts: [], rhythm: [] };

  const pg = cfg.priorityGoal;
  if (pg) {
    const hours = areaH(stats, pg.areaId);
    let status = "ok";
    let detail = `About ${hours}h on the calendar this week.`;
    const target = pg.onTargetHoursGte ?? 12;
    if (hours >= target * 1.15) {
      status = "celebrate";
      detail = pg.detailCelebrate || pg.detailStrong || "You hit your PM Life target — nicely done.";
    } else if (hours >= target) {
      status = "on_target";
      detail = pg.detailOnTarget || detail;
    } else if (hours < (pg.thinHoursLt ?? 8)) {
      status = "thin";
      detail = pg.detailThin || detail;
    }
    out.priority = {
      ...metaFor(pg.areaId, lifeAreas),
      hours,
      status,
      detail,
      targetLabel: `aim ~${pg.onTargetHoursGte ?? 12}h+/week on calendar`,
      isMainGoal: true,
    };
  }

  for (const item of cfg.onTarget || []) {
    const hours = areaH(stats, item.areaId);
    let hit = false;
    if (item.bandMin != null && item.bandMax != null) {
      hit = hours >= item.bandMin && hours <= item.bandMax;
    } else if (item.minHours != null) {
      hit = hours >= item.minHours;
    }
    if (item.alwaysShow && hours < (item.minHours ?? 0.5)) {
      out.onTarget.push({
        ...metaFor(item.areaId, lifeAreas),
        hours,
        status: "track",
        detail: item.detailWhenLight || item.detailOnTarget || "Light on calendar this week.",
      });
      continue;
    }
    if (!hit) continue;
    out.onTarget.push({
      ...metaFor(item.areaId, lifeAreas),
      hours,
      status: "on_target",
      detail: item.detailOnTarget || `${hours}h this week.`,
    });
  }

  for (const item of cfg.gentleNudge || []) {
    if (item.isPriority && priorities.includes(item.areaId)) {
      // Priority areas get insight cards; still show in nudge if below target
    }
    const hours = areaH(stats, item.areaId);
    const target = item.targetHours ?? 5;
    if (hours >= target) continue;
    out.nudge.push({
      ...metaFor(item.areaId, lifeAreas),
      hours,
      targetHours: target,
      status: "nudge",
      detail: item.detailNudge || `About ${hours}h — you're often aiming for ~${target}h.`,
    });
  }

  for (const item of cfg.alerts || []) {
    const hours = areaH(stats, item.areaId);
    const pct = Math.round((hours / scheduled) * 100);
    const hoursHit = item.hoursGte != null && hours >= item.hoursGte;
    const pctHit = item.percentOfScheduledGte != null && pct >= item.percentOfScheduledGte;
    if (!hoursHit && !pctHit) continue;
    out.alerts.push({
      ...metaFor(item.areaId, lifeAreas),
      hours,
      percent: pct,
      status: "alert",
      detail: item.detailAlert || `${hours}h (${pct}% of scheduled time).`,
    });
  }

  for (const r of cfg.rhythm || []) {
    const val = stats[r.key];
    if (val == null) continue;
    out.rhythm.push({
      icon: r.icon || "·",
      label: r.label,
      value: `${val}${r.suffix || ""}`,
    });
  }

  if (areaH(stats, "meals") < 7) {
    out.mealsCalendarNote =
      "Meals you don't block won't appear — log eating on basil 🥕 in Google Calendar.";
  }

  return out;
}
