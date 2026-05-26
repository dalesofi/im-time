function titleMatches(summaryLower, keywords) {
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

function matchColorKeywordRoutes(summaryLower, colors) {
  for (const colorDef of Object.values(colors.googleEventColors || {})) {
    for (const route of colorDef.keywordRoutes || []) {
      if (!titleMatches(summaryLower, route.keywords)) continue;
      return {
        areaId: route.lifeAreaId,
        alsoAreas: [...(route.alsoAreas || [])],
        silentInsight: false,
      };
    }
  }
  return null;
}

function routeLavender(summaryLower, colors) {
  const lav = colors.googleEventColors?.lavender;
  return {
    areaId: lav?.lifeAreaId || "social_life",
    alsoAreas: [],
    silentInsight: false,
  };
}

const DJING_KEYWORDS = [
  "dj", "djing", "mix", "mixing", "prep", "sort", "gig",
  "export", "listen", "ordenar", "clasificar", "caprixxo",
];

const RADIO_LIFE_KEYWORDS = [
  "radio", "equipment", "equipos", "equipo", "rbl",
  "fem barri", "mescladis", "volunteer", "isa enes", "isaenes",
];

const PM_LIFE_KEYWORDS = [
  "apply", "typeform", "pearson", "linkedin", "cv", "portfolio",
  "hacienda", "segir", "quantic", "lab65", "audiii", "brand", "pm ",
];

const MEALS_KEYWORDS = [
  "supermarket", "supermercado", "cooking", "cocinar", "eat", "eating",
  "comer", "comida", "lunch", "dinner", "cena", "almuerzo", "desayuno",
  "breakfast", "brunch", "food", "restaurant",
];

const PET_KEYWORDS = ["lua", "dog-mum", "dog mum", "dogmom", "paseo lua", "walk lua", "lua walk", "paseo con lua"];
const WALK_LUA_KEYWORDS = ["paseo lua", "walk lua", "lua walk", "paseo con lua", "dog walk"];

export function buildMapper(config) {
  const { colors, lifeAreas } = config;
  const globalKw = colors.keywordOverrides || [];
  const sourceDefaults = lifeAreas.sourceCalendarDefaults || {};
  const silentWork = lifeAreas.workCalendarInsightPolicy === "silent";
  const meetingAlso = lifeAreas.meetingAlsoCountsAs || "job_search";

  return function mapEvent(ev) {
    const s = ev.summaryLower;
    let base;

    const kw = matchKeywordOverride(s, globalKw);
    if (kw) base = applyRelatedBlocks(s, colors, kw);
    else {
      const colorRoute = matchColorKeywordRoutes(s, colors);
      if (colorRoute) base = applyRelatedBlocks(s, colors, colorRoute);
      else if (ev.sourceCalendar === "buttonschool") {
        base = { areaId: sourceDefaults.buttonschool || "job_search", alsoAreas: [], silentInsight: silentWork };
      } else if (ev.sourceCalendar === "rbl") {
        base = { areaId: sourceDefaults.rbl || "passion_rbl", alsoAreas: [], silentInsight: false };
      } else if (titleMatches(s, ["cleaning", "limpiar", "limpieza"])) {
        base = { areaId: "home_cleaning", alsoAreas: [], silentInsight: false };
      } else if (titleMatches(s, ["ropa", "colada", "laundry"])) {
        base = { areaId: "laundry", alsoAreas: [], silentInsight: false };
      } else if (titleMatches(s, WALK_LUA_KEYWORDS)) {
        base = { areaId: "pets", alsoAreas: ["health"], silentInsight: false };
      } else if (titleMatches(s, PET_KEYWORDS)) {
        base = { areaId: "pets", alsoAreas: [], silentInsight: false };
      } else if (titleMatches(s, ["shower", "ducha", "skincare", "skin care", "hair", "pelo", "self care", "self-care", "autocuidado", "bath", "baño"])) {
        base = { areaId: "self_care", alsoAreas: [], silentInsight: false };
      } else if (titleMatches(s, RADIO_LIFE_KEYWORDS)) {
        base = { areaId: "passion_rbl", alsoAreas: titleMatches(s, ["isa enes", "isaenes"]) ? ["social_life"] : [], silentInsight: false };
      } else if (titleMatches(s, ["siesta", "siest", "podcast"])) {
        base = { areaId: "day_rest", alsoAreas: [], silentInsight: false };
      } else if (titleMatches(s, MEALS_KEYWORDS)) {
        base = { areaId: "meals", alsoAreas: [], silentInsight: false };
      } else if (titleMatches(s, PM_LIFE_KEYWORDS)) {
        base = { areaId: "job_search", alsoAreas: [], silentInsight: false };
      } else if (titleMatches(s, ["pilates", "yoga", "gap", "gym", "exercise", "entreno", "sport", "deporte", "fitness"])) {
        base = { areaId: "health", alsoAreas: [], silentInsight: false };
      } else if (titleMatches(s, DJING_KEYWORDS)) {
        base = {
          areaId: "djing_music",
          alsoAreas: titleMatches(s, ["caprixxo"]) ? ["passion_rbl"] : [],
          silentInsight: false,
        };
        base = applyRelatedBlocks(s, colors, base);
      } else if (titleMatches(s, ["errand", "recoger", "pick up", "pickup", "entrega"])) {
        base = applyRelatedBlocks(s, colors, {
          areaId: "social_life", alsoAreas: ["passion_rbl"], silentInsight: false,
        });
      } else if (titleMatches(s, ["beach", "park"])) {
        base = { areaId: "pets", alsoAreas: ["health"], silentInsight: false };
      } else if (ev.sourceCalendar === "personal") {
        base = applyRelatedBlocks(s, colors, routeLavender(s, colors));
      } else {
        base = applyRelatedBlocks(s, colors, routeLavender(s, colors));
      }
    }

    if (ev.isMeeting && meetingAlso) {
      const also = [...(base.alsoAreas || [])];
      if (!also.includes(meetingAlso) && base.areaId !== meetingAlso) {
        also.push(meetingAlso);
      }
      return { ...base, alsoAreas: also };
    }
    return base;
  };
}
