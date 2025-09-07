
import type { Layout, Layouts } from "react-grid-layout";

export type PinnedSpec = {
  
  w?: number; h?: number; x?: number; y?: number;
  bp?: Partial<Record<"lg"|"md"|"sm"|"xs"|"xxs", { w?: number; h?: number; x?: number; y?: number }>>;
  weight?: number; 
};

export type LayoutInputs = {
  
  items: Array<{ id: string; title?: string; tags?: string[]; group?: string | string[]; date?: string }>;
  cols: Record<"lg"|"md"|"sm"|"xs"|"xxs", number>;
  defaults?: { w: number; h: number };
  pinned?: Record<string, PinnedSpec>;
  
  filter?: { tag?: string; group?: string; query?: string };
  
  scoreFn?: (item: LayoutInputs["items"][number]) => number;
};

function sizeFor(id: string, pinned: LayoutInputs["pinned"], bp: keyof Layouts, defaults: { w: number; h: number }, maxCols: number) {
    const pin = pinned?.[id];
    const bpSpec = pin?.bp?.[bp] ?? {};
    const w = Math.min(maxCols, bpSpec.w ?? pin?.w ?? defaults.w);
    const h = bpSpec.h ?? pin?.h ?? defaults.h;
    
    const isSmall = bp === "sm" || bp === "xs" || bp === "xxs";
    
    const wClamped = isSmall ? maxCols : Math.min(maxCols, w);
    const hClamped = isSmall ? 2 : h;
    return { w: wClamped, h: hClamped, pin, bpSpec };
}

function norm(s?: string) { return (s ?? "").toLowerCase(); }
function toArr(x: unknown): string[] { return Array.isArray(x) ? x as string[] : x ? [String(x)] : []; }

function defaultScore(item: LayoutInputs["items"][number], filter?: LayoutInputs["filter"]) {
  let score = 0;

  
  const tags = (item.tags ?? []).map(norm);
  const groups = toArr(item.group).map(norm);
  const q = norm(filter?.query);
  const t = norm(filter?.tag);
  const g = norm(filter?.group);

  if (t && tags.includes(t)) score += 50;
  if (g && groups.includes(g)) score += 50;
  if (q) {
    const hay = [norm(item.title), ...tags, ...groups].join(" ");
    if (hay.includes(q)) score += 30;
  }

  
  if (item.date) {
    const ms = Date.parse(item.date);
    if (!Number.isNaN(ms)) {
      const ageDays = (Date.now() - ms) / (1000 * 60 * 60 * 24);
      
      score += Math.max(0, 40 - Math.min(40, ageDays / 7));
    }
  }

  return score;
}

/** Build responsive layouts:
 *  - explicitly pinned (x/y given) placed first
 *  - remaining items sorted by score (filter + recency + custom)
 *  - packed into columns (top-left first), with their preferred sizes
 */
export function buildLayoutsSmart({
  items,
  cols,
  defaults = { w: 1, h: 2 },
  pinned = {},
  filter,
  scoreFn,
}: LayoutInputs): Layouts {
  const bps: Array<keyof Layouts> = ["lg","md","sm","xs","xxs"];
  const layouts: Partial<Layouts> = {};

  for (const bp of bps) {
    const numCols = cols[bp];
    const pinnedPlaced: Layout[] = [];
    const toPlace: typeof items = [];

    
    for (const it of items) {
      const pin = pinned[it.id];
      const bpSpec = pin?.bp?.[bp];
      const hasXY = (bpSpec?.x ?? pin?.x) !== undefined && (bpSpec?.y ?? pin?.y) !== undefined;

      if (pin && hasXY) {
        const { w, h } = sizeFor(it.id, pinned, bp, defaults, numCols);
        const x = bpSpec?.x ?? pin!.x!;
        const y = bpSpec?.y ?? pin!.y!;
        pinnedPlaced.push({ i: it.id, x, y, w, h });
      } else {
        toPlace.push(it);
      }
    }

    
    const heights = Array(numCols).fill(0);
    for (const p of pinnedPlaced) {
      for (let k = 0; k < p.w; k++) {
        heights[p.x + k] = Math.max(heights[p.x + k], p.y + p.h);
      }
    }

    
    const scored = toPlace
      .map((it) => {
        const base = defaultScore(it, filter);
        const custom = scoreFn ? scoreFn(it) : 0;
        const pinWeight = pinned[it.id]?.weight ?? 0;
        return { it, score: base + custom + pinWeight };
      })
      .sort((a, b) => b.score - a.score || a.it.id.localeCompare(b.it.id));

    
    const autoPlaced: Layout[] = [];
    for (const { it } of scored) {
      const { w, h } = sizeFor(it.id, pinned, bp, defaults, numCols);
      let bestX = 0, bestY = Number.MAX_SAFE_INTEGER;
      for (let x = 0; x <= numCols - w; x++) {
        let colY = 0;
        for (let k = 0; k < w; k++) colY = Math.max(colY, heights[x + k]);
        if (colY < bestY) { bestY = colY; bestX = x; }
      }
      autoPlaced.push({ i: it.id, x: bestX, y: bestY, w, h });
      for (let k = 0; k < w; k++) heights[bestX + k] = bestY + h;
    }

    layouts[bp] = [...pinnedPlaced, ...autoPlaced];
  }

  return layouts as Layouts;
}
