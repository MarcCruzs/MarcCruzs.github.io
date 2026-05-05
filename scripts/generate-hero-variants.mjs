#!/usr/bin/env node
/**
 * Generate responsive hero image variants from a single source photo.
 *
 * Usage:
 *   node scripts/generate-hero-variants.mjs <source-image-path>
 *
 * Output: public/images/hero/hero-{390,820,1440,2560}w.{webp,jpg}
 *
 * Pipe these into a <picture> in Hero.tsx:
 *   <picture>
 *     <source type="image/webp" srcSet="/images/hero/hero-390w.webp 390w, ..." sizes="100vw">
 *     <img src="/images/hero/hero-1440w.jpg" srcSet="..." sizes="100vw">
 *   </picture>
 */

import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, basename } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const OUTPUT_DIR = resolve(PROJECT_ROOT, "public/images/hero");

const WIDTHS = [390, 820, 1440, 2560];
const JPEG_QUALITY = 82;
const WEBP_QUALITY = 78;

const sourceArg = process.argv[2];
if (!sourceArg) {
  console.error("Usage: node scripts/generate-hero-variants.mjs <source-image-path>");
  process.exit(1);
}

const sourcePath = resolve(sourceArg);
try {
  await stat(sourcePath);
} catch {
  console.error(`Source image not found: ${sourcePath}`);
  process.exit(1);
}

await mkdir(OUTPUT_DIR, { recursive: true });

const meta = await sharp(sourcePath).metadata();
console.log(`Source: ${basename(sourcePath)} (${meta.width}x${meta.height}, ${meta.format})`);
console.log(`Output: ${OUTPUT_DIR}\n`);

const rows = [];
for (const width of WIDTHS) {
  if (width > meta.width) {
    console.warn(`  Skipping ${width}w — wider than source (${meta.width}px)`);
    continue;
  }

  const base = sharp(sourcePath).resize({ width, withoutEnlargement: true });

  const jpegPath = resolve(OUTPUT_DIR, `hero-${width}w.jpg`);
  const webpPath = resolve(OUTPUT_DIR, `hero-${width}w.webp`);

  const jpegInfo = await base
    .clone()
    .jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true })
    .toFile(jpegPath);

  const webpInfo = await base
    .clone()
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(webpPath);

  rows.push({
    width,
    height: jpegInfo.height,
    jpeg: (jpegInfo.size / 1024).toFixed(1) + " KiB",
    webp: (webpInfo.size / 1024).toFixed(1) + " KiB",
  });
}

console.table(rows);
console.log("\nNext: wire <picture> in Hero.tsx using these files.");
