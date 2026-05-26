import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const PATHS = {
  mergedIcs: path.join(ROOT, "calendars/merged.ics"),
  insights: path.join(ROOT, "config/insights-rules.json"),
  colors: path.join(ROOT, "config/calendar-colors.json"),
  lifeAreas: path.join(ROOT, "config/life-areas-default.json"),
};
