#!/usr/bin/env node
/**
 * Serves public/ and /api/analyze for week picker UI.
 * Default port 5199 — NOT 5173 (Vite/Pomodoro often use 5173).
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getCustomRange } from "../src/lib/week-range.mjs";
import { runAnalysis } from "../src/lib/run-analysis.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
/** Avoid 5173 — commonly used by Vite and other local apps (e.g. Pomodoro timers). */
const DEFAULT_PORT = 5199;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json",
};

function createHandler() {
  return async (req, res) => {
    res.setHeader("X-Im-Time", "1");
    try {
      const port = req.socket.localPort;
      const url = new URL(req.url || "/", `http://localhost:${port}`);

      if (url.pathname === "/api/health") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ app: "im-time", ok: true }));
        return;
      }

      if (url.pathname === "/api/analyze") {
        const from = url.searchParams.get("from");
        const to = url.searchParams.get("to");
        if (!from || !to) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Use ?from=YYYY-MM-DD&to=YYYY-MM-DD" }));
          return;
        }
        const weekRange = getCustomRange(from, to);
        const result = await runAnalysis(weekRange);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
        return;
      }

      let filePath = url.pathname === "/" ? "/index.html" : url.pathname;
      filePath = path.normalize(filePath).replace(/^(\.\.[/\\])+/, "");
      const full = path.join(PUBLIC, filePath);
      if (!full.startsWith(PUBLIC) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end(
          `<!DOCTYPE html><html><body style="font-family:system-ui;padding:2rem"><h1>I'm Time</h1><p>Not found: ${filePath}</p><p><a href="/week.html">Pick a week →</a></p></body></html>`
        );
        return;
      }
      const ext = path.extname(full);
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      res.end(fs.readFileSync(full));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
  };
}

function listen(port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(createHandler());
    server.on("error", (err) => reject({ err, port }));
    server.listen(port, () => resolve({ server, port }));
  });
}

async function main() {
  const preferred = Number(process.env.PORT || DEFAULT_PORT);
  const portsToTry = [preferred, preferred + 1, preferred + 2, 5173].filter(
    (p, i, a) => a.indexOf(p) === i
  );

  for (const port of portsToTry) {
    try {
      const { port: bound } = await listen(port);
      const base = `http://localhost:${bound}`;
      console.log("\n  ┌─────────────────────────────────────────────────┐");
      console.log("  │  I'm Time — dev server (NOT Pomodoro / Vite)     │");
      console.log("  └─────────────────────────────────────────────────┘");
      console.log(`\n  Open this URL in your browser:\n`);
      console.log(`    ${base}/week.html\n`);
      console.log(`  Sanity check: ${base}/api/health  →  {"app":"im-time","ok":true}`);
      console.log(`\n  If you still see another app, you are on the wrong port.\n`);
      if (bound !== preferred) {
        console.log(`  Note: port ${preferred} was busy; using ${bound} instead.\n`);
      }
      return;
    } catch ({ err, port }) {
      if (err.code !== "EADDRINUSE") throw err;
    }
  }
  console.error("\n  Could not bind a port. Stop other dev servers and try again.\n");
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
