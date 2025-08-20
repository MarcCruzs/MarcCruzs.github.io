import { useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D, { ForceGraphMethods } from "react-force-graph-2d";
import * as d3 from "d3-force";
import { projects } from "../data/projects";

type NodeType = "project" | "tag" | "group";
type GNode = { id: string; name: string; type: NodeType; url?: string; __neighbors?: Set<string> };
type GLink = { source: string; target: string };
type GData = { nodes: GNode[]; links: GLink[] };

const TAG_PREFIX = "tag:";
const GROUP_PREFIX = "group:";

const TAG_COLOR = "hsl(210, 20%, 80%)";
const GROUP_COLOR = "hsl(142, 40%, 70%)"; // lighter green outline for groups
const PROJECT_FILL = "hsl(142, 71%, 45%)";
const LABEL_LIGHT = "rgba(230, 237, 245, 0.95)";

type Mode = "tags" | "groups";

export default function Projects() {
  const fgRef = useRef<ForceGraphMethods>();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [mode, setMode] = useState<Mode>("tags"); // 🔀 toggle state
  const [hoverId, setHoverId] = useState<string | null>(null);

  // Measure container
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setSize({ w: Math.max(220, rect.width), h: Math.max(320, rect.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Build graph for current mode
  const data: GData = useMemo(() => buildGraph(projects, mode), [mode]);

  // Circle + centering forces
    useEffect(() => {
        if (!fgRef.current || size.w === 0 || size.h === 0) return;

        const outer = Math.round(Math.min(size.w, size.h) * 0.36); // projects
        const inner = Math.round(outer * 0.45);                    // groups sit closer to center

        // Radial radius depends on node type
        const radial = d3.forceRadial((n: any) => (n.type === "group" ? inner : outer), 0, 0)
                        .strength(0.015);
        fgRef.current.d3Force("radial", radial);

        // Keep everything centered
        fgRef.current.d3Force("center", d3.forceCenter(0, 0));
        fgRef.current.d3Force("x", d3.forceX(0).strength(0.06));
        fgRef.current.d3Force("y", d3.forceY(0).strength(0.06));

        // Per-link tuning: group↔group (“gg”) are short/strong
        const linkForce: any = fgRef.current.d3Force("link");
        if (linkForce) {
            linkForce
            .distance((l: any) => (l.kind === "gg" ? 20 : 45))
            .strength((l: any) => (l.kind === "gg" ? 1.0 : 0.9));
        }

        // Weaker repulsion for groups so they can sit closer together near center
        fgRef.current.d3Force(
            "charge",
            d3.forceManyBody().strength((n: any) => (n.type === "group" ? -8 : -28))
        );

        fgRef.current.d3Force(
        "collide",
        d3.forceCollide((n: any) => {
            if (n.type === "project") return 10;   // small circle
            if (n.type === "group")   return 18;   // bigger diamond
            return 16;                              // tag diamond
        })
        );
        fgRef.current.d3ReheatSimulation();
        const t = setTimeout(() => fgRef.current?.zoomToFit(650, 100), 0);
        return () => clearTimeout(t);
    }, [size.w, size.h, mode]);


  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Projects</h1>

        {/* Toggle: Tags / Groups */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode("tags")}
            className={`px-3 py-1.5 rounded-full border ${mode === "tags" ? "bg-primary text-primary-foreground" : "hover:bg-muted"} border-border`}
            title="Show connections to tags"
          >
            Tags
          </button>
          <button
            onClick={() => setMode("groups")}
            className={`px-3 py-1.5 rounded-full border ${mode === "groups" ? "bg-primary text-primary-foreground" : "hover:bg-muted"} border-border`}
            title="Show connections to predefined groups"
          >
            Groups
          </button>

          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener"
            className="ml-2 inline-flex items-center gap-2 rounded-full px-4 py-2 bg-primary text-primary-foreground border border-border shadow-soft"
          >
            View on GitHub
          </a>
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
            className="relative mt-3 h-[480px] md:h-[560px] w-full rounded-md overflow-hidden border border-border"
          >
            {size.w > 0 && size.h > 0 && (
              <ForceGraph2D
                ref={fgRef}
                width={size.w}
                height={size.h}
                graphData={{
                    nodes: data.nodes,
                    links: data.links.filter((l: any) => l.kind !== "gg"), // render only normal links
                }}
                backgroundColor="rgba(0,0,0,0)"
                cooldownTicks={200}
                onEngineStop={() => fgRef.current?.zoomToFit(700, 100)}
                onNodeHover={(n: any) => setHoverId(n ? String(n.id) : null)}
                onNodeClick={(n: any) => {
                  if (n.type === "project" && n?.url) window.open(n.url, "_blank");
                }}
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
                   String(l.target.id ?? l.target) === hoverId) ? 2 : 1}
                nodeRelSize={6}
                nodeCanvasObject={(node: any, ctx, globalScale) => {
                    const n = node as GNode & { x: number; y: number };
                    const scale = Math.max(1, globalScale);
                    const show = !hoverId || n.__neighbors?.has(hoverId);
                    const alpha = show ? 1 : 0.25;

                    if (n.type === "project") {
                        // unchanged — green circle + label to the right
                        const r = 6;
                        ctx.beginPath();
                        ctx.arc(n.x, n.y, r, 0, 2 * Math.PI);
                        ctx.fillStyle = PROJECT_FILL;
                        ctx.globalAlpha = alpha;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        drawLabel(ctx, n.name, n.x + r + 2, n.y, 12 / scale);
                    } else if (n.type === "tag") {
                        // NEW: diamond with centered label
                        drawDiamondWithLabel(ctx, {
                        cx: n.x,
                        cy: n.y,
                        size: 24 / scale,     // diamond “radius” (corner-to-center)
                        alpha,
                        fill: "transparent",  // outline only (or set to a color if you want filled)
                        stroke: TAG_COLOR,
                        text: n.name,
                        textColor: LABEL_LIGHT,
                        fontSize: 11 / scale,
                        });
                    } else {
                        // group node as diamond, slightly larger & different color
                        drawDiamondWithLabel(ctx, {
                        cx: n.x,
                        cy: n.y,
                        size: 32 / scale,
                        alpha,
                        fill: "transparent",
                        stroke: GROUP_COLOR,
                        text: n.name,
                        textColor: LABEL_LIGHT,
                        fontSize: 11 / scale,
                        });
                    }
                    }}

              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- graph builder -------- */
function buildGraph(items: typeof projects, mode: "tags" | "groups"): GData {
  const nodes: GNode[] = [];
  const links: (GLink & { kind?: string })[] = [];

  // project nodes
  items.forEach(p => nodes.push({ id: p.id, name: p.title, type: "project", url: p.url }));

  if (mode === "tags") {
    const tagSet = new Set<string>();
    items.forEach(p => p.tags.forEach(t => tagSet.add(t)));
    Array.from(tagSet).forEach(t => nodes.push({ id: "tag:" + t, name: t, type: "tag" }));
    items.forEach(p => p.tags.forEach(t => links.push({ source: p.id, target: "tag:" + t })));
  } else {
    // groups mode
    const toArray = (g?: string | string[]) => (g ? (Array.isArray(g) ? g : [g]) : []);
    const groupSet = new Set<string>();
    items.forEach(p => toArray(p.group).forEach(g => groupSet.add(g)));
    Array.from(groupSet).forEach(g => nodes.push({ id: "group:" + g, name: g, type: "group" }));
    items.forEach(p => toArray(p.group).forEach(g => links.push({ source: p.id, target: "group:" + g })));

    // 🔗 🔽 ADD THIS: weak group↔group tethers so groups sit closer together
    const groupIds = nodes.filter(n => n.type === "group").map(n => n.id);
    for (let i = 0; i < groupIds.length - 1; i++) {
      links.push({ source: groupIds[i], target: groupIds[i + 1], kind: "gg" });
    }
    // If you prefer all-pairs instead of a chain, use:
    // for (let i = 0; i < groupIds.length; i++) {
    //   for (let j = i + 1; j < groupIds.length; j++) {
    //     links.push({ source: groupIds[i], target: groupIds[j], kind: "gg" });
    //   }
    // }
  }

  // neighbors for hover highlighting
  const neighborMap: Record<string, Set<string>> = {};
  nodes.forEach(n => (neighborMap[n.id] = new Set([n.id])));
  links.forEach(({ source, target }) => {
    const s = String((source as any).id ?? source), t = String((target as any).id ?? target);
    neighborMap[s].add(t);
    neighborMap[t].add(s);
  });
  nodes.forEach(n => (n.__neighbors = neighborMap[n.id]));

  return { nodes, links };
}


/* -------- canvas helpers -------- */
function drawLabel(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number) {
  ctx.font = `${fontSize}px sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = LABEL_LIGHT;
  ctx.fillText(` ${text}`, x, y);
}

function drawPill(
  ctx: CanvasRenderingContext2D,
  text: string, cx: number, cy: number,
  fontSize: number, alpha: number, strokeColor: string
) {
  const padX = 8, padY = 4;
  ctx.font = `${fontSize}px sans-serif`;
  const textWidth = ctx.measureText(text).width;
  const w = textWidth + padX * 2;
  const h = fontSize + padY * 2;
  const x = cx - w / 2;
  const y = cy - h / 2;
  const r = h / 2;

  ctx.beginPath();
  roundRect(ctx, x, y, w, h, r);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = LABEL_LIGHT;
  ctx.fillText(text, cx, cy);
}

function drawDiamondWithLabel(
  ctx: CanvasRenderingContext2D,
  opts: {
    cx: number; cy: number;
    size: number;            // distance from center to a corner
    alpha: number;
    fill: string;            // "transparent" for none
    stroke: string;
    text: string;
    textColor: string;
    fontSize: number;
    lineWidth?: number;
  }
) {
  const { cx, cy, size, alpha, fill, stroke, text, textColor, fontSize } = opts;
  const lw = opts.lineWidth ?? 1.4;

  // Diamond = rotated square: top, right, bottom, left
  const pts = [
    [cx, cy - size],
    [cx + size, cy],
    [cx, cy + size],
    [cx - size, cy],
  ];

  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();

  ctx.globalAlpha = alpha;

  if (fill !== "transparent") {
    ctx.fillStyle = fill;
    ctx.fill();
  }

  ctx.strokeStyle = stroke;
  ctx.lineWidth = lw;
  ctx.stroke();

  ctx.globalAlpha = 1;

  // Centered label
  ctx.font = `${fontSize}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = textColor;
  ctx.fillText(text, cx, cy);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, h / 2, w / 2);
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
