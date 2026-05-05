/**
 * QA build verification script for marc-portfolio production build.
 * Run from the project root after `npm run build`.
 */
import { execSync, spawn } from 'child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { platform } from 'os';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const DIST = join(ROOT, 'dist');

const results = [];
let buildOutput = '';

function pass(name, detail = '') { results.push({ status: 'PASS', name, detail }); }
function fail(name, detail = '') { results.push({ status: 'FAIL', name, detail }); }

// ─── 1. Build ────────────────────────────────────────────────────────────────
console.log('\n[1] Running vite build...');
try {
  buildOutput = execSync('npx vite build', { cwd: ROOT, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
  pass('build_exit_code', 'Exit 0');
  console.log('Build succeeded.');
} catch (e) {
  buildOutput = (e.stdout || '') + (e.stderr || '');
  fail('build_exit_code', e.message.slice(0, 200));
  console.error('Build FAILED:', e.message.slice(0, 200));
}

// Extract chunk sizes from build output
const chunkLines = (buildOutput + '').split('\n').filter(l =>
  l.includes('.js') || l.includes('.css') || l.includes('kB') || l.includes('KB')
);
console.log('\nChunk sizes from build output:');
chunkLines.forEach(l => console.log(' ', l.trim()));

// ─── 2. Dist asset checks ────────────────────────────────────────────────────
console.log('\n[2] Checking dist/ assets...');

// 2a. No .orig.* files
function findOrig(dir) {
  if (!existsSync(dir)) return [];
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...findOrig(full));
    else if (entry.name.includes('.orig.')) found.push(full);
  }
  return found;
}
const origFiles = findOrig(DIST);
if (origFiles.length === 0) pass('no_orig_files', 'dist/ is clean');
else fail('no_orig_files', `Found: ${origFiles.join(', ')}`);

// 2b. Portfolio images
const PORT_DIR = join(DIST, 'images', 'portfolio');
const SLUGS = ['nasa-contrails', 'suas-drone', 'precision-ag-aerial'];
const WIDTHS = [440, 880, 1320];
const FMTS = ['jpg', 'webp'];

// precision-ag-aerial has no 1320w
const EXPECTED = [];
for (const slug of SLUGS) {
  for (const w of WIDTHS) {
    if (slug === 'precision-ag-aerial' && w === 1320) continue;
    for (const fmt of FMTS) {
      EXPECTED.push(`${slug}-${w}w.${fmt}`);
    }
  }
}

if (!existsSync(PORT_DIR)) {
  fail('portfolio_images', `dist/images/portfolio/ does not exist`);
} else {
  const actual = readdirSync(PORT_DIR).sort();
  const expected = EXPECTED.sort();
  const missing = expected.filter(f => !actual.includes(f));
  const extra = actual.filter(f => !expected.includes(f));
  if (missing.length === 0 && extra.length === 0) {
    pass('portfolio_images', `All ${expected.length} files present`);
  } else {
    fail('portfolio_images', `Missing: [${missing.join(', ')}] | Extra: [${extra.join(', ')}]`);
  }
  console.log('Portfolio dir contents:', actual.join(', '));
}

// 2c. Portrait + hero images
const IMG_DIR = join(DIST, 'images');
const PORTRAIT_SIZES = [320, 640, 960];
const PORTRAIT_EXPECTED = PORTRAIT_SIZES.flatMap(s => [`marc-portrait-${s}w.jpg`, `marc-portrait-${s}w.webp`]);
if (!existsSync(IMG_DIR)) {
  fail('portrait_images', 'dist/images/ does not exist');
} else {
  const imgFiles = readdirSync(IMG_DIR).filter(f => f.startsWith('marc-portrait'));
  const missing = PORTRAIT_EXPECTED.filter(f => !imgFiles.includes(f));
  if (missing.length === 0) pass('portrait_images', `All ${PORTRAIT_EXPECTED.length} portrait files present`);
  else fail('portrait_images', `Missing: [${missing.join(', ')}]`);

  const heroDir = join(IMG_DIR, 'hero');
  if (existsSync(heroDir)) {
    const heroFiles = readdirSync(heroDir);
    pass('hero_dir', `hero/ exists with ${heroFiles.length} files: ${heroFiles.join(', ')}`);
  } else {
    fail('hero_dir', 'dist/images/hero/ does not exist');
  }
}

// 2d. Total dist size < 4 MB
function dirSize(dir) {
  if (!existsSync(dir)) return 0;
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) total += dirSize(full);
    else total += statSync(full).size;
  }
  return total;
}
const totalBytes = dirSize(DIST);
const totalMB = (totalBytes / 1024 / 1024).toFixed(2);
if (totalBytes < 4 * 1024 * 1024) pass('dist_size', `${totalMB} MB < 4 MB`);
else fail('dist_size', `${totalMB} MB exceeds 4 MB limit`);

// ─── 3. HTML correctness ─────────────────────────────────────────────────────
console.log('\n[3] Checking dist/index.html...');
const HTML_PATH = join(DIST, 'index.html');
if (!existsSync(HTML_PATH)) {
  fail('html_preload', 'dist/index.html missing');
  fail('html_chunks', 'dist/index.html missing');
} else {
  const html = readFileSync(HTML_PATH, 'utf8');

  // 3a. Exactly one hero preload with imagesrcset + imagesizes
  const preloadMatches = [...html.matchAll(/<link[^>]+rel="preload"[^>]+as="image"[^>]*>/gi)];
  const heroPreloads = preloadMatches.filter(m => m[0].includes('imagesrcset') && m[0].includes('imagesizes'));
  if (heroPreloads.length === 1) {
    pass('html_preload', `1 hero preload found: ${heroPreloads[0][0].slice(0, 120)}`);
  } else if (heroPreloads.length === 0) {
    fail('html_preload', `No <link rel="preload" as="image" imagesrcset imagesizes> found. All preloads: ${preloadMatches.map(m => m[0].slice(0, 80)).join(' | ')}`);
  } else {
    fail('html_preload', `Expected 1, found ${heroPreloads.length}`);
  }

  // 3b. Chunk references: react + router + index entry present; graph chunk NOT in HTML
  const ASSETS_DIR = join(DIST, 'assets');
  let graphChunk = '';
  if (existsSync(ASSETS_DIR)) {
    const assetFiles = readdirSync(ASSETS_DIR);
    const graphFile = assetFiles.find(f => f.startsWith('graph-') && f.endsWith('.js'));
    if (graphFile) graphChunk = graphFile;
  }

  const hasReact = /react[-.]/.test(html) || /modulepreload[^>]+react/i.test(html);
  const hasRouter = /router[-.]/.test(html);
  const hasIndex = /index[-.]/.test(html) && html.includes('type="module"');
  const graphInHtml = graphChunk ? html.includes(graphChunk) : false;

  console.log('  Graph chunk file:', graphChunk || '(not found in assets)');
  console.log('  Graph chunk in HTML:', graphInHtml);

  const chunkDetail = `react=${hasReact}, router=${hasRouter}, index=${hasIndex}, graph_absent=${!graphInHtml}`;
  if (hasReact && hasRouter && hasIndex && !graphInHtml) {
    pass('html_chunks', chunkDetail);
  } else {
    fail('html_chunks', chunkDetail);
  }
}

// ─── 4. Runtime serving ──────────────────────────────────────────────────────
console.log('\n[4] Starting vite preview on port 4180...');
let previewProc = null;
let previewFailed = false;

async function probe(url, label) {
  try {
    const res = await fetch(url);
    const ct = res.headers.get('content-type') || '';
    return { ok: res.ok, status: res.status, ct };
  } catch (e) {
    return { ok: false, status: 0, ct: '', err: e.message };
  }
}

async function runRuntimeTests() {
  previewProc = spawn('npx', ['vite', 'preview', '--port', '4180'], {
    cwd: ROOT, shell: true, stdio: 'pipe'
  });

  previewProc.stderr.on('data', d => process.stdout.write('[preview] ' + d));

  // Wait for server to be ready
  await new Promise(r => setTimeout(r, 4000));

  const BASE = 'http://localhost:4180';

  // Resolve graph chunk name
  let graphChunkPath = '';
  const ASSETS_DIR = join(DIST, 'assets');
  if (existsSync(ASSETS_DIR)) {
    const assetFiles = readdirSync(ASSETS_DIR);
    const gf = assetFiles.find(f => f.startsWith('graph-') && f.endsWith('.js'));
    if (gf) graphChunkPath = `/assets/${gf}`;
  }

  const probes = [
    { url: `${BASE}/`, label: 'root_html', expectCt: 'text/html', expectStatus: 200 },
    { url: `${BASE}/images/hero/hero-1440w.webp`, label: 'hero_webp', expectCt: 'image/webp', expectStatus: 200 },
    { url: `${BASE}/images/portfolio/nasa-contrails-880w.webp`, label: 'portfolio_webp', expectStatus: 200 },
    { url: `${BASE}/images/marc-portrait-640w.webp`, label: 'portrait_webp', expectStatus: 200 },
  ];
  if (graphChunkPath) {
    probes.push({ url: `${BASE}${graphChunkPath}`, label: 'graph_chunk_js', expectCt: 'application/javascript', expectStatus: 200 });
  } else {
    fail('graph_chunk_js', 'No graph-*.js chunk found in dist/assets');
  }

  for (const p of probes) {
    const r = await probe(p.url, p.label);
    if (r.ok && r.status === p.expectStatus) {
      pass(p.label, `${r.status} ct=${r.ct}`);
    } else {
      fail(p.label, `status=${r.status} ct=${r.ct} err=${r.err || ''}`);
    }
  }

  previewProc.kill();
  console.log('Preview server stopped.');
}

// ─── 5. TypeScript check ─────────────────────────────────────────────────────
async function runTsCheck() {
  console.log('\n[5] Running tsc --noEmit...');
  try {
    const out = execSync('npx tsc --noEmit', { cwd: ROOT, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    pass('typescript', 'No type errors');
  } catch (e) {
    const errOut = ((e.stdout || '') + (e.stderr || '')).trim();
    fail('typescript', errOut.slice(0, 500));
    console.error('TS errors:\n', errOut.slice(0, 500));
  }
}

// ─── Run async parts ─────────────────────────────────────────────────────────
await runRuntimeTests();
await runTsCheck();

// ─── Final report ────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════');
console.log('QA REPORT — marc-portfolio production build');
console.log('═══════════════════════════════════════════════');
const passed = results.filter(r => r.status === 'PASS').length;
const failed = results.filter(r => r.status === 'FAIL').length;
console.log(`Status: ${failed === 0 ? 'PASS' : 'FAIL'} | Tests: ${results.length} | Passed: ${passed} | Failed: ${failed}\n`);
for (const r of results) {
  const icon = r.status === 'PASS' ? '[PASS]' : '[FAIL]';
  console.log(`${icon} ${r.name}: ${r.detail}`);
}

console.log('\nChunk sizes (raw build output):');
chunkLines.forEach(l => console.log(' ', l.trim()));
