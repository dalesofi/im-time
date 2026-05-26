#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { parseWeekArgs } from "../lib/week-range.mjs";
import { runAnalysis } from "../lib/run-analysis.mjs";
import { buildHtmlReport } from "../lib/report-html.mjs";
import { PATHS } from "../lib/paths.mjs";
import { loadConfig } from "../lib/load-config.mjs";

const jsonOut = process.argv.includes("--json");
const htmlOut = process.argv.includes("--html");

async function main() {
  const weekRange = parseWeekArgs(process.argv);
  const result = await runAnalysis(weekRange);
  const config = loadConfig();

  if (jsonOut) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (htmlOut) {
    const html = buildHtmlReport(result);
    writeFileSync(PATHS.publicReportHtml, html, "utf8");
    console.log(`\n  Wrote visual report → ${PATHS.publicReportHtml}`);
    console.log("  Open: pnpm dev → http://localhost:5199/week.html\n");
    return;
  }

  printReport(result, config);
}

function printReport(result, config) {
  const line = "─".repeat(52);
  console.log("\n  I'm Time — weekly analysis (CLI)\n");
  console.log(`  Week: ${result.week}`);
  console.log(`  Events in week: ${result.eventCount}`);
  console.log(line);
  console.log("\n  Where your timed hours went\n");
  for (const row of result.allocation) {
    const bar = "█".repeat(Math.min(24, Math.round(row.percent / 4)));
    console.log(
      `  ${row.label.padEnd(22)} ${String(row.hours).padStart(5)}h  ${String(row.percent).padStart(3)}%  ${bar}`
    );
  }
  console.log(line);
  console.log("\n  This week in numbers\n");
  console.log(`  Meeting hours:        ${result.meetingHours}h`);
  console.log(`  Scheduled (timed):    ${result.scheduledTimedHours}h`);
  console.log(`  Free mornings (<11):  ${result.freeMorningsBefore11} weekdays`);
  console.log(`  Open evenings (>20):  ${result.openEveningsAfter20} weekdays`);
  console.log(`  Home cleaning (4w):   ${result.homeCleaningRolling4w}h`);
  console.log(`  Max day-rest 1 day:   ${result.dayRestMaxHoursOneDay}h`);
  console.log(line);
  console.log("\n  Insight cards\n");
  for (const card of result.insights) {
    console.log(`  · [${card.id}]`);
    console.log(`    ${card.text}\n`);
  }
  console.log(line);
  const pri = config.insights.priorities?.defaultForSofia || [];
  if (pri.length) {
    console.log("\n  Your priorities (hard nudges only for these)\n");
    for (const id of pri) {
      const g = config.insights.sampleGoals?.find((x) => x.areaId === id);
      console.log(`  ★ ${g?.label || id}`);
    }
  }
  console.log("\n  Context intentions (lighter — OK if not hit)\n");
  for (const g of result.goals) {
    if (g.startsWith("PRIORITY:") || g.startsWith("This season:")) continue;
    console.log(`  · ${g}`);
  }
  console.log("\n  Edit thresholds: config/insights-rules.json");
  console.log("  Edit colors/areas: config/calendar-colors.json\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
