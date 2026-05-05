#!/usr/bin/env node
/**
 * Generate responsive portfolio + portrait variants from sources in scripts/sources/.
 *
 * Usage:
 *   node scripts/generate-portfolio-variants.mjs
 *
 * Inputs (in scripts/sources/):
 *   nasa-contrails.orig.jpg        → public/images/portfolio/nasa-contrails-{440,880,1320}w.{webp,jpg}
 *   suas-drone.orig.jpg            → public/images/portfolio/suas-drone-{...}w.{...}
 *   precision-ag-aerial.orig.png   → public/images/portfolio/precision-ag-aerial-{...}w.{...}
 *   marc-portrait.orig.jpg         → public/images/marc-portrait-{320,640,960}w.{webp,jpg}
 *
 * Reference these via <picture> elements in Work.tsx / About.tsx.
 */

import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join, parse } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const SOURCES_DIR = resolve(PROJECT_ROOT, "scripts/sources");
const PORTFOLIO_OUT = resolve(PROJECT_ROOT, "public/images/portfolio");
const IMAGES_OUT = resolve(PROJECT_ROOT, "public/images");

const PORTFOLIO_WIDTHS = [440, 880, 1320];
const PORTRAIT_WIDTHS = [320, 640, 960];
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 76;

async function generateVariants(sourcePath, outDir, baseName, widths) {
  await mkdir(outDir, { recursive: true });
  const meta = await sharp(sourcePath).metadata();
  console.log(`\n${baseName} source: ${meta.width}x${meta.height} (${meta.format})`);

  const rows = [];
  for (const width of widths) {
    if (width > meta.width) {
      console.warn(`  Skipping ${width}w — wider than source (${meta.width}px)`);
      continue;
    }
    const base = sharp(sourcePath).resize({ width, withoutEnlargement: true });
    const jpegInfo = await base
      .clone()
      .jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true })
      .toFile(join(outDir, `${baseName}-${width}w.jpg`));
    const webpInfo = await base
      .clone()
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(join(outDir, `${baseName}-${width}w.webp`));
    rows.push({
      width,
      height: jpegInfo.height,
      jpeg: (jpegInfo.size / 1024).toFixed(1) + " KiB",
      webp: (webpInfo.size / 1024).toFixed(1) + " KiB",
    });
  }
  console.table(rows);
}

const sources = await readdir(SOURCES_DIR);

for (const f of sources) {
  if (!/\.orig\.(jpg|jpeg|png|webp)$/i.test(f)) continue;
  const src = join(SOURCES_DIR, f);
  await stat(src);
  const baseName = parse(f).name.replace(/\.orig$/, "");
  const isPortrait = baseName === "marc-portrait";
  await generateVariants(
    src,
    isPortrait ? IMAGES_OUT : PORTFOLIO_OUT,
    baseName,
    isPortrait ? PORTRAIT_WIDTHS : PORTFOLIO_WIDTHS,
  );
}

console.log("\nDone. Reference these in <picture> elements with srcset+sizes.");
