#!/usr/bin/env node
/**
 * Build → preview → Lighthouse mobile run → print headline metrics.
 *
 * Usage:
 *   node scripts/lh.mjs           # build + preview + lighthouse mobile
 *   node scripts/lh.mjs --skip-build
 *   node scripts/lh.mjs --desktop
 *
 * Output: prints scores + sub-1.0 audits to stdout, writes the full JSON
 * report to .tmp/lh-latest.json for deeper inspection.
 */

import { spawn, spawnSync } from "node:child_process";
import { writeFileSync, mkdirSync, existsSync, readFileSync, statSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const TMP_DIR = resolve(PROJECT_ROOT, ".tmp");
const REPORT_PATH = resolve(TMP_DIR, "lh-latest.json");

const args = new Set(process.argv.slice(2));
const skipBuild = args.has("--skip-build");
const desktop = args.has("--desktop");
const PORT = 4185;

function run(cmd, cmdArgs, opts = {}) {
  const r = spawnSync(cmd, cmdArgs, {
    cwd: PROJECT_ROOT,
    stdio: opts.silent ? "pipe" : "inherit",
    shell: true,
    ...opts,
  });
  if (r.status !== 0) {
    if (opts.silent) console.error(r.stderr?.toString());
    throw new Error(`${cmd} ${cmdArgs.join(" ")} exited ${r.status}`);
  }
  return r;
}

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`Server at ${url} did not respond within ${timeoutMs}ms`);
}

mkdirSync(TMP_DIR, { recursive: true });

if (!skipBuild) {
  console.log("→ vite build");
  run("npx", ["vite", "build"], { silent: true });
  console.log("  done");
}

console.log(`→ vite preview --port ${PORT}`);
const preview = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
  cwd: PROJECT_ROOT,
  stdio: "pipe",
  shell: true,
});
preview.on("error", (e) => console.error("preview error:", e));

try {
  await waitForServer(`http://localhost:${PORT}/`);
  console.log(`  ready at http://localhost:${PORT}/`);

  console.log(`→ lighthouse (${desktop ? "desktop" : "mobile"})`);
  // remove stale report so we know if the run actually produced output
  if (existsSync(REPORT_PATH)) rmSync(REPORT_PATH);

  const lhArgs = [
    "lighthouse",
    `http://localhost:${PORT}/`,
    "--quiet",
    "--chrome-flags=--headless=new --no-sandbox",
    "--only-categories=performance",
    "--output=json",
    `--output-path=${REPORT_PATH}`,
  ];
  if (desktop) {
    lhArgs.push("--preset=desktop");
  } else {
    lhArgs.push("--form-factor=mobile");
    lhArgs.push("--screenEmulation.mobile=true");
  }
  // Lighthouse on Windows often EPERMs on chrome temp-dir cleanup AFTER a
  // successful audit. Treat the run as successful if the report file was
  // written, regardless of exit code.
  spawnSync("npx", lhArgs, { cwd: PROJECT_ROOT, stdio: "inherit", shell: true });
  if (!existsSync(REPORT_PATH) || statSync(REPORT_PATH).size < 1000) {
    throw new Error("Lighthouse did not produce a report");
  }

  const data = JSON.parse(readFileSync(REPORT_PATH, "utf8"));
  const perf = data.categories.performance.score;
  const metrics = [
    "first-contentful-paint",
    "largest-contentful-paint",
    "total-blocking-time",
    "cumulative-layout-shift",
    "speed-index",
    "interactive",
    "max-potential-fid",
  ];

  console.log("\n========== LIGHTHOUSE RESULTS ==========");
  console.log(`Performance: ${(perf * 100).toFixed(0)}/100   (${data.configSettings.formFactor})\n`);
  console.log("Core metrics:");
  for (const m of metrics) {
    const a = data.audits[m];
    if (!a) continue;
    const score = a.score == null ? "—" : a.score.toFixed(2);
    console.log(`  ${m.padEnd(28)} score=${score}  ${a.displayValue ?? ""}`);
  }

  console.log("\nSub-1.0 audits (most impactful first):");
  const failing = Object.entries(data.audits)
    .filter(([, a]) => a.score != null && a.score < 1)
    .sort((a, b) => (a[1].score ?? 0) - (b[1].score ?? 0));
  for (const [id, a] of failing) {
    console.log(`  ${id.padEnd(40)} score=${a.score.toFixed(2)}  ${a.displayValue ?? ""}`);
  }

  console.log(`\nFull report: ${REPORT_PATH}`);
  console.log("========================================\n");
} finally {
  preview.kill();
}
