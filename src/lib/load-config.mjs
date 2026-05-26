import fs from "node:fs";
import { PATHS } from "./paths.mjs";

export function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

export function loadConfig() {
  return {
    insights: loadJson(PATHS.insights),
    colors: loadJson(PATHS.colors),
    lifeAreas: loadJson(PATHS.lifeAreas),
    weekSnapshot: loadJson(PATHS.weekSnapshot),
    branding: loadJson(PATHS.branding),
  };
}
