function fill(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

function areaH(stats, id) {
  return stats.areaHours[id] || 0;
}

export function evaluateInsights(config, stats, thresholds) {
  const vars = {
    meeting_hours: Math.round(stats.meetingHours * 10) / 10,
    free_mornings_before_11: stats.freeMorningsBefore11,
    rbl_hours: Math.round(areaH(stats, "passion_rbl") * 10) / 10,
    job_hours: Math.round(areaH(stats, "job_search") * 10) / 10,
    admin_hours: Math.round(areaH(stats, "admin") * 10) / 10,
    health_hours: Math.round(areaH(stats, "health") * 10) / 10,
    rel_hours: Math.round(areaH(stats, "relationships") * 10) / 10,
    meals_hours: Math.round(areaH(stats, "meals") * 10) / 10,
    cleaning_hours: Math.round(stats.homeCleaningRolling * 10) / 10,
    laundry_hours: Math.round(areaH(stats, "laundry") * 10) / 10,
    open_evenings_after_20: stats.openEveningsAfter20,
    social_hours: Math.round(areaH(stats, "social_life") * 10) / 10,
    social_target: thresholds.socialLifeWeeklyHoursTarget || 10,
    self_care_hours: Math.round(areaH(stats, "self_care") * 10) / 10,
    djing_hours: Math.round(areaH(stats, "djing_music") * 10) / 10,
    window_weeks: thresholds.monthlyEvaluationWindowWeeks || 4,
  };

  const matched = [];
  for (const rule of config.rules) {
    if (rule.when?.fallback) continue;
    if (matches(rule.when, stats, thresholds)) {
      const templates = rule.templates || [];
      const text = fill(templates[0], vars);
      matched.push({ id: rule.id, priority: rule.priority, text });
    }
  }
  matched.sort((a, b) => a.priority - b.priority);
  const max = config.meta?.maxCardsPerWeek ?? 3;
  if (matched.length === 0) {
    const quiet = config.rules.find((r) => r.when?.fallback);
    if (quiet?.templates?.[0]) {
      return [{ id: "quiet_week", priority: 99, text: fill(quiet.templates[0], vars) }];
    }
  }
  return matched.slice(0, max);
}

function matches(when, stats, t) {
  if (when.meetingHoursGte != null && stats.meetingHours < when.meetingHoursGte) return false;
  if (when.freeWeekdayMorningsBefore11Lt != null && stats.freeMorningsBefore11 >= when.freeWeekdayMorningsBefore11Lt) return false;
  if (when.freeWeekdayMorningsBefore11Gte != null && stats.freeMorningsBefore11 < when.freeWeekdayMorningsBefore11Gte) return false;
  if (when.openWeekdayEveningsAfter20Gte != null && stats.openEveningsAfter20 < when.openWeekdayEveningsAfter20Gte) return false;
  if (when.openWeekdayEveningsAfter20Lte != null && stats.openEveningsAfter20 > when.openWeekdayEveningsAfter20Lte) return false;
  if (when.scheduledHoursGt != null && stats.scheduledTimedHours <= when.scheduledHoursGt) return false;
  if (when.dayRestAnyDayHoursGt != null && stats.dayRestMaxDay <= when.dayRestAnyDayHoursGt) return false;

  if (when.hoursAreaLt) {
    const h = areaH(stats, when.hoursAreaLt.area);
    if (h >= when.hoursAreaLt.hours) return false;
  }
  if (when.hoursAreaGte) {
    const h = areaH(stats, when.hoursAreaGte.area);
    if (h < when.hoursAreaGte.hours) return false;
  }
  if (when.hoursAreaRollingWeeksLt) {
    const id = when.hoursAreaRollingWeeksLt.area;
    const minH = when.hoursAreaRollingWeeksLt.hours;
    let h = 0;
    if (id === "home_cleaning") h = stats.homeCleaningRolling;
    else h = areaH(stats, id);
    if (h >= minH) return false;
  }
  return true;
}
