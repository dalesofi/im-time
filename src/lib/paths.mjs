import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const PATHS = {
  mergedIcs: path.join(ROOT, "calendars/merged.ics"),
  insights: path.join(ROOT, "config/insights-rules.json"),
  colors: path.join(ROOT, "config/calendar-colors.json"),
  lifeAreas: path.join(ROOT, "config/life-areas-default.json"),
  weekSnapshot: path.join(ROOT, "config/week-snapshot.json"),
  branding: path.join(ROOT, "config/app-branding.json"),
  observeCopy: path.join(ROOT, "config/observe-copy.json"),
  observeThresholds: path.join(ROOT, "config/observe-thresholds.json"),
  publicReportHtml: path.join(ROOT, "public/report.html"),
};
