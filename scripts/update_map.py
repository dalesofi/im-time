from pathlib import Path
MAP = r'''function titleMatches(summaryLower, keywords) {
  return keywords.some((k) => summaryLower.includes(k.toLowerCase()));
}

function applyRelatedBlocks(summaryLower, colors, base) {
  const rules = colors.relatedBlocks?.rules || [];
  const alsoAreas = [...(base.alsoAreas || [])];
  for (const rule of rules) {
    if (rule.keywords?.length && titleMatches(summaryLower, rule.keywords)) {
      for (const a of rule.areas || []) {
        if (a !== base.areaId && !alsoAreas.includes(a)) alsoAreas.push(a);
      }
    }
  }
  return { ...base, alsoAreas };
}

function matchKeywordOverride(summaryLower, overrides) {
  for (const o of overrides) {
    if (!titleMatches(summaryLower, o.keywords)) continue;
    return { areaId: o.lifeAreaId, alsoAreas: [...(o.alsoAreas || [])], silentInsight: false };
  }
  return null;
}

function routeLavender(summaryLower, colors) {
  const lav = colors.googleEventColors?.lavender;
  for (const r of lav?.keywordRoutes || []) {
    if (titleMatches(summaryLower, r.keywords)) {
      return { areaId: r.lifeAreaId, alsoAreas: [...(r.alsoAreas || [])], silentInsight: false };
    }
  }
  return { areaId: lav?.lifeAreaId || "social_life", alsoAreas: [], silentInsight: false };
}

const DJING_KEYWORDS = [
  "dj", "djing", "mix", "mixing", "prep", "sort", "gig",
  "export", "listen", "ordenar", "clasificar", "caprixxo",
];

export function buildMapper(config) {
  const { colors, lifeAreas } = config;
  const globalKw = colors.keywordOverrides || [];
  const sourceDefaults = lifeAreas.sourceCalendarDefaults || {};
  const silentWork = lifeAreas.workCalendarInsightPolicy === "silent";

  return function mapEvent(ev) {
    const kw = matchKeywordOverride(ev.summaryLower, globalKw);
    if (kw) return applyRelatedBlocks(ev.summaryLower, colors, kw);

    if (ev.sourceCalendar === "buttonschool") {
      return { areaId: sourceDefaults.buttonschool || "work", alsoAreas: [], silentInsight: silentWork };
    }
    if (ev.sourceCalendar === "rbl") {
      return { areaId: sourceDefaults.rbl || "passion_rbl", alsoAreas: [], silentInsight: false };
    }
    if (titleMatches(ev.summaryLower, ["cleaning", "limpiar", "limpieza"])) {
      return { areaId: "home_cleaning", alsoAreas: [], silentInsight: false };
    }
    if (titleMatches(ev.summaryLower, ["ropa", "colada", "laundry"])) {
      return { areaId: "laundry", alsoAreas: [], silentInsight: false };
    }
    if (titleMatches(ev.summaryLower, ["siesta", "podcast"])) {
      return { areaId: "day_rest", alsoAreas: [], silentInsight: false };
    }
    if (titleMatches(ev.summaryLower, ["supermarket", "supermercado", "cooking", "cocinar"])) {
      return { areaId: "meals", alsoAreas: [], silentInsight: false };
    }
    if (titleMatches(ev.summaryLower, DJING_KEYWORDS)) {
      const base = {
        areaId: "djing_music",
        alsoAreas: titleMatches(ev.summaryLower, ["caprixxo"]) ? ["passion_rbl"] : [],
        silentInsight: false,
      };
      return applyRelatedBlocks(ev.summaryLower, colors, base);
    }
    if (titleMatches(ev.summaryLower, ["rbl", "fem barri", "mescladis", "volunteer"])) {
      return { areaId: "passion_rbl", alsoAreas: [], silentInsight: false };
    }
    if (titleMatches(ev.summaryLower, ["errand", "recoger", "pick up", "pickup", "entrega"])) {
      return applyRelatedBlocks(ev.summaryLower, colors, {
        areaId: "social_life", alsoAreas: ["passion_rbl"], silentInsight: false,
      });
    }
    if (titleMatches(ev.summaryLower, ["beach", "park"])) {
      return { areaId: "pets", alsoAreas: [], silentInsight: false };
    }
    if (ev.sourceCalendar === "personal") {
      return { areaId: sourceDefaults.personal || "uncategorized", alsoAreas: [], silentInsight: false };
    }
    return applyRelatedBlocks(ev.summaryLower, colors, routeLavender(ev.summaryLower, colors));
  };
}
'''
Path("src/lib/map-areas.mjs").write_text(MAP)
# stats
p = Path("src/lib/stats.mjs")
t = p.read_text()
if "ev.alsoAreas" not in t:
    t = t.replace(
        "areaHours[ev.areaId] = (areaHours[ev.areaId] || 0) + h;",
        "areaHours[ev.areaId] = (areaHours[ev.areaId] || 0) + h;\n    for (const linked of ev.alsoAreas || []) {\n      areaHours[linked] = (areaHours[linked] || 0) + h;\n    }",
    )
    p.write_text(t)
p = Path("src/cli/analyze.mjs")
t = p.read_text()
if "alsoAreas" not in t:
    t = t.replace(
        "const { areaId } = map(ev);\n    return { ...ev, areaId };",
        "const { areaId, alsoAreas = [], silentInsight } = map(ev);\n    return { ...ev, areaId, alsoAreas, silentInsight };",
    )
    p.write_text(t)
print("done")
