import { useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D, { ForceGraphMethods } from "react-force-graph-2d";
import * as d3 from "d3-force";
import { projects } from "@/data/projects";
import { ICON_URLS, DEFAULT_ICON_URL } from "@/icons";
import DraggableCatalogue from "@/components/DraggableCatalogue";

import { ExternalLink, Github } from "lucide-react";

type NodeType = "project" | "tag" | "group";

type GNode = {
  id: string;
  name: string;
  type: NodeType;
  url?: string;
  __neighbors?: Set<string>;
};

type GLink = {
  source: string;
  target: string;
  kind?: "gg"; // optional marker for group↔group tethers
};

type GData = { nodes: GNode[]; links: GLink[] };

const TAG_COLOR = "hsl(142, 40%, 70%)";
const GROUP_COLOR = "hsl(142, 40%, 70%)";
const NODE_COLOR  = "hsl(142, 40%, 70%)";
const PROJECT_FILL = "hsl(142, 71%, 45%)";
const LABEL_LIGHT = "rgba(230, 237, 245, 0.95)";

// --- icon cache shared across renders ---
const iconCache = new Map<string, HTMLImageElement>();

// normalize keys like "Data/ML" -> "data/ml"
function normKey(s: string) {
  return (s || "").toLowerCase().trim();
}

function bentoPattern(i: number) {
  // Cycle through 3 tile types
  const patterns = [
    { col: "lg:col-span-3", aspect: "aspect-video" },     // wide
    { col: "lg:col-span-2", aspect: "aspect-square" },    // square
    { col: "lg:col-span-1", aspect: "aspect-[4/5]" },     // tall-ish
  ];
  return patterns[i % patterns.length];
}

function bentoClasses(i: number, b?: { sm?: string; lg?: string; aspect?: "square"|"video"|"golden" }) {
  // simple defaults by index if no explicit bento provided
  const fallbacks = [
    { sm: "col-2 row-1", lg: "col-3 row-2", aspect: "video"  },
    { sm: "col-2 row-1", lg: "col-2 row-1", aspect: "square" },
    { sm: "col-2 row-1", lg: "col-1 row-1", aspect: "golden" },
  ];
  const pick = b ?? fallbacks[i % fallbacks.length];

  const colSm = pick.sm?.includes("col-2") ? "sm:col-span-2" : pick.sm?.includes("col-1") ? "sm:col-span-1" : "sm:col-span-2";
  const rowSm = pick.sm?.includes("row-2") ? "sm:row-span-2" : "sm:row-span-1";

  const colLg = pick.lg?.includes("col-3") ? "lg:col-span-3"
              : pick.lg?.includes("col-2") ? "lg:col-span-2"
              : pick.lg?.includes("col-1") ? "lg:col-span-1" : "lg:col-span-2";
  const rowLg = pick.lg?.includes("row-2") ? "lg:row-span-2" : "lg:row-span-1";

  const aspect =
    pick.aspect === "square" ? "aspect-square" :
    pick.aspect === "golden" ? "aspect-[1.618/1]" :
    /* video */               "aspect-video";

  return `${colSm} ${rowSm} ${colLg} ${rowLg} ${aspect}`;
}

function getIcon(key: string, url: string, onLoad?: () => void) {
  const k = normKey(key);
  const cached = iconCache.get(k);
  if (cached) return cached;
  const img = new Image();
  img.src = url;
  img.onload = () => onLoad?.();
  iconCache.set(k, img);
  return img;
}

function seedPositions(nodes: any[], outerR: number, innerR: number) {
  const prj = nodes.filter(n => n.type === "project");
  const oth = nodes.filter(n => n.type !== "project"); // tags/groups

  const twoPi = Math.PI * 2;
  prj.forEach((n, i) => {
    const theta = (i / prj.length) * twoPi;
    n.x = Math.cos(theta) * outerR;
    n.y = Math.sin(theta) * outerR;
  });
  oth.forEach((n, i) => {
    const theta = (i / Math.max(1, oth.length)) * twoPi;
    n.x = Math.cos(theta) * innerR;
    n.y = Math.sin(theta) * innerR;
  });
}

export default function Projects() {
    const fgRef = useRef<ForceGraphMethods>();
    const wrapRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ w: 0, h: 0 });
    const [mode, setMode] = useState<"tags" | "groups">("groups");
    const [hoverId, setHoverId] = useState<string | null>(null);
    
  // request a redraw safely (some builds don't type .refresh)
  const requestRedraw = () => {
    (fgRef.current as any)?.refresh?.();
    // fgRef.current?.d3ReheatSimulation();
  };

  // measure container
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.max(220, r.width), h: Math.max(320, r.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // build graph for current mode
  const data: GData = useMemo(() => buildGraph(projects, mode), [mode]);

  // forces: two-ring radial (groups inner, projects outer) + gentle center
  useEffect(() => {
    if (!fgRef.current || size.w === 0 || size.h === 0) return;

    const outer = Math.round(Math.min(size.w, size.h) * 0.36); // project ring
    const inner = Math.round(outer * 0.45);                    // group/tag ring
    const g = (fgRef.current as any)?.graphData?.();
    if (g?.nodes?.length) {
    seedPositions(g.nodes, outer, inner);
    }
    fgRef.current.d3Force(
      "radial",
      d3.forceRadial((n: any) => (n.type === "group" ? inner : outer), 0, 0).strength(0.02)
    );
    fgRef.current.d3Force("center", d3.forceCenter(0, 0));
    fgRef.current.d3Force("x", d3.forceX(0).strength(0.06));
    fgRef.current.d3Force("y", d3.forceY(0).strength(0.06));

    // per-link config: group↔group tethers short & strong
    const linkForce: any = fgRef.current.d3Force("link");
    if (linkForce) {
      linkForce
        .distance((l: any) => (l.kind === "gg" ? 20 : 45))
        .strength((l: any) => (l.kind === "gg" ? 1.0 : 0.9));
    }

    // weaker repulsion for groups so they cluster nearer
    fgRef.current.d3Force(
      "charge",
      d3.forceManyBody().strength((n: any) => (n.type === "group" ? -8 : -28))
    );

    // prevent overlap; larger for groups (circles with icons)
    fgRef.current.d3Force(
      "collide",
      d3.forceCollide((n: any) => (n.type === "group" ? 18 : n.type === "tag" ? 16 : 10))
    );

    fgRef.current.d3ReheatSimulation();
    const t = setTimeout(() => fgRef.current?.zoomToFit(650, 100), 0);
    return () => clearTimeout(t);
  }, [size.w, size.h, mode]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Projects</h1>

        <div className="flex items-center gap-2">
          
          <button
            onClick={() => setMode("groups")}
            className={`px-3 py-1.5 rounded-full border ${mode === "groups" ? "bg-primary text-primary-foreground" : "hover:bg-muted"} border-border`}
            title="Show connections to predefined groups"
          >
            Groups
          </button>
          
          <button
            onClick={() => setMode("tags")}
            className={`px-3 py-1.5 rounded-full border ${mode === "tags" ? "bg-primary text-primary-foreground" : "hover:bg-muted"} border-border`}
            title="Show connections to tags"
          >
            Tags
          </button>

          {/* <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener"
            className="ml-2 inline-flex items-center gap-2 rounded-full px-4 py-2 bg-primary text-primary-foreground border border-border shadow-soft"
          >
            View on GitHub
          </a> */}
        </div>
      </div>

      <div className="grid md:grid-cols-1 gap-4">
        <div className="border border-border rounded-lg bg-card shadow-soft p-4">
          <p className="text-muted-foreground">
            {mode === "tags" ? (
              <>Bipartite view: <span className="text-primary">projects</span> connect to their <em>tags</em>.</>
            ) : (
              <>Bipartite view: <span className="text-primary">projects</span> connect to predefined <em>groups</em>.</>
            )}
          </p>

          <div
            ref={wrapRef}
            className="relative mt-3 h-[360px] sm:h-[480px] lg:h-[560px] w-full rounded-md overflow-hidden border border-border"

          >
            {size.w > 0 && size.h > 0 && (
              <ForceGraph2D
                ref={fgRef}
                width={size.w}
                height={size.h}
                minZoom={0.85}
                maxZoom={3}
                graphData={{
                  nodes: data.nodes,
                  // hide gg tethers in the renderer, keep them in the force
                  links: data.links.filter((l) => l.kind !== "gg"),
                }}
                backgroundColor="rgba(0,0,0,0)"
                cooldownTicks={220}
                onEngineStop={() => {fgRef.current?.zoomToFit(700, 100);}}
                onNodeHover={(n: any) => setHoverId(n ? String(n.id) : null)}

                linkColor={(l: any) => {
                  if (!hoverId) return "rgba(16,185,129,0.5)";
                  const s = String(l.source.id ?? l.source);
                  const t = String(l.target.id ?? l.target);
                  return (s === hoverId || t === hoverId)
                    ? "rgba(16,185,129,0.9)"
                    : "rgba(16,185,129,0.15)";
                }}
                linkWidth={(l: any) =>
                  hoverId &&
                  (String(l.source.id ?? l.source) === hoverId ||
                    String(l.target.id ?? l.target) === hoverId)
                    ? 2
                    : 1
                }
                nodeRelSize={6}
                nodeCanvasObject={(node: any, ctx, globalScale) => {
                  const n = node as GNode & { x: number; y: number };
                  const scale = Math.max(1, globalScale);
                  const show = !hoverId || n.__neighbors?.has(hoverId);
                  const alpha = show ? 1 : 0.25;

                  if (n.type === "project") {
                    const r = 6;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, r, 0, 2 * Math.PI);
                    ctx.fillStyle = PROJECT_FILL;
                    ctx.globalAlpha = alpha;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                    if (globalScale > 1.2) {
                        drawLabel(ctx, n.name, n.x + r + 2, n.y, 12 / scale);
                    }
                    return;
                  }

                  // Tag / Group: circular badge with SVG icon + label below
                  const r = n.type === "group" ? 16 / scale : 14 / scale;

                  // badge
                  ctx.beginPath();
                  ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
                  ctx.globalAlpha = alpha;
                  ctx.fillStyle = "rgba(16,185,129,0.10)";
                  ctx.fill();
                  ctx.lineWidth = 1.4;
                  ctx.strokeStyle = NODE_COLOR;
                  ctx.stroke();
                  ctx.globalAlpha = 1;

                  // icon
                  const key = normKey(n.name);
                  const url = ICON_URLS[key] ?? DEFAULT_ICON_URL;
                  const img = getIcon(key, url, requestRedraw);
                  const iconSize = r * 1.3;

                  if (img && (img as any).complete) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, r - 1, 0, Math.PI * 2);
                    ctx.clip();
                    ctx.drawImage(img, n.x - iconSize / 2, n.y - iconSize / 2, iconSize, iconSize);
                    ctx.globalCompositeOperation = "source-atop"; // tint icon
                    ctx.fillStyle = "#fff";
                    ctx.fillRect(n.x - iconSize/2, n.y - iconSize/2, iconSize, iconSize);
                    ctx.restore();
                  }

                  // label under the circle
                  if (globalScale > 1.2) {
                    ctx.font = `${11 / scale}px sans-serif`;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "top";
                    ctx.fillStyle = LABEL_LIGHT;
                    ctx.fillText(n.name, n.x, n.y + r + 3);
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
      

{/* ---------------- Projects (Bento) ---------------- */}
<DraggableCatalogue />



    </section>
  );
}

/* ---------- graph builder ---------- */
function buildGraph(items: typeof projects, mode: "tags" | "groups"): GData {
  const nodes: GNode[] = [];
  const links: GLink[] = [];

  // project nodes
  items.forEach((p) => nodes.push({ id: p.id, name: p.title, type: "project", url: p.url }));

  if (mode === "tags") {
    const tagSet = new Set<string>();
    items.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    Array.from(tagSet).forEach((t) => nodes.push({ id: "tag:" + t, name: t, type: "tag" }));
    items.forEach((p) => p.tags.forEach((t) => links.push({ source: p.id, target: "tag:" + t })));
  } else {
    // groups mode
    const toArray = (g?: string | string[]) => (g ? (Array.isArray(g) ? g : [g]) : []);
    const groupSet = new Set<string>();
    items.forEach((p) => toArray(p.group).forEach((g) => groupSet.add(g)));
    Array.from(groupSet).forEach((g) => nodes.push({ id: "group:" + g, name: g, type: "group" }));
    items.forEach((p) => toArray(p.group).forEach((g) => links.push({ source: p.id, target: "group:" + g })));

    // weak group↔group tethers to keep groups closer
    const groupIds = nodes.filter((n) => n.type === "group").map((n) => n.id);
    for (let i = 0; i < groupIds.length - 1; i++) {
      links.push({ source: groupIds[i], target: groupIds[i + 1], kind: "gg" });
    }
  }

  // neighbors for hover highlight
  const neighborMap: Record<string, Set<string>> = {};
  nodes.forEach((n) => (neighborMap[n.id] = new Set([n.id])));
  links.forEach(({ source, target }) => {
    const s = String((source as any).id ?? source);
    const t = String((target as any).id ?? target);
    neighborMap[s].add(t);
    neighborMap[t].add(s);
  });
  nodes.forEach((n) => (n.__neighbors = neighborMap[n.id]));

  return { nodes, links };
}

/* ---------- canvas helpers ---------- */
function drawLabel(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number) {
  ctx.font = `${fontSize}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillStyle = LABEL_LIGHT;
  ctx.fillText(` ${text}`, x - 8, y + 9);
}


function ProjectCard({
  title,
  summary,
  tags,
  url,
}: {
  title: string;
  summary?: string;
  tags?: string[];
  url?: string;
}) {
  const isGithub = url?.includes("github.com");
  return (
    <article className="rounded-xl border border-border bg-card p-4 shadow-soft transition-shadow hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-primary/10 px-2.5 py-1 text-xs text-primary hover:bg-primary/20"
            title="Open"
          >
            {isGithub ? <Github className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
            Open
          </a>
        )}
      </div>

      {summary && <p className="mt-2 text-sm text-muted-foreground">{summary}</p>}

      {tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-border bg-secondary/30 px-2 py-0.5 text-xs"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
