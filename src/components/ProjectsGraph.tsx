import { useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D, { ForceGraphMethods } from "react-force-graph-2d";
import * as d3 from "d3-force";
import type { Project } from "@/data/projects";
import { ICON_URLS, DEFAULT_ICON_URL } from "@/icons";

type NodeType = "project" | "tag" | "group";
export type GNode = { id: string; name: string; type: NodeType; url?: string; __neighbors?: Set<string> };
export type GLink = { source: string; target: string; kind?: "gg" };
export type GData = { nodes: GNode[]; links: GLink[] };

type Props = {
  items: Project[];
  initialMode?: "tags" | "groups";
  className?: string;
  minZoom?: number;
  maxZoom?: number;
  onNodeClickUrl?: (url: string) => void;
};


const iconCache = new Map<string, HTMLImageElement>();
const tintedIconCache = new Map<string, HTMLCanvasElement>();
const normKey = (s: string) => (s || "").toLowerCase().trim();

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

function getTintedIcon(key: string, url: string, tintColor: string, onLoad?: () => void) {
  const cacheKey = `${normKey(key)}_${tintColor}`;
  const cached = tintedIconCache.get(cacheKey);
  if (cached) return cached;

  const originalImg = getIcon(key, url);
  if (!(originalImg as any)?.complete) {
    
    return originalImg;
  }

  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = originalImg.width;
  canvas.height = originalImg.height;

  
  ctx.drawImage(originalImg, 0, 0);

  
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = tintColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  tintedIconCache.set(cacheKey, canvas);
  onLoad?.();
  return canvas;
}

function seedPositions(nodes: any[], outerR: number, innerR: number) {
  const prj = nodes.filter((n: any) => n.type === "project");
  const oth = nodes.filter((n: any) => n.type !== "project");
  const twoPi = Math.PI * 2;
  prj.forEach((n: any, i: number) => {
    const t = (i / Math.max(1, prj.length)) * twoPi;
    n.x = Math.cos(t) * outerR; n.y = Math.sin(t) * outerR;
  });
  oth.forEach((n: any, i: number) => {
    const t = (i / Math.max(1, oth.length)) * twoPi;
    n.x = Math.cos(t) * innerR; n.y = Math.sin(t) * innerR;
  });
}

function buildGraph(items: Project[], mode: "tags" | "groups"): GData {
  const nodes: GNode[] = [];
  const links: GLink[] = [];
  items.forEach(p => nodes.push({ id: p.id, name: p.title, type: "project", url: p.url }));

  if (mode === "tags") {
    const tagSet = new Set<string>();
    items.forEach(p => p.tags.forEach(t => tagSet.add(t)));
    [...tagSet].forEach(t => nodes.push({ id: "tag:" + t, name: t, type: "tag" }));
    items.forEach(p => p.tags.forEach(t => links.push({ source: p.id, target: "tag:" + t })));
  } else {
    const arr = (g?: string | string[]) => (g ? (Array.isArray(g) ? g : [g]) : []);
    const groupSet = new Set<string>();
    items.forEach(p => arr(p.group).forEach(g => groupSet.add(g)));
    [...groupSet].forEach(g => nodes.push({ id: "group:" + g, name: g, type: "group" }));
    items.forEach(p => arr(p.group).forEach(g => links.push({ source: p.id, target: "group:" + g })));
    const groupIds = nodes.filter(n => n.type === "group").map(n => n.id);
    for (let i = 0; i < groupIds.length - 1; i++) links.push({ source: groupIds[i], target: groupIds[i + 1], kind: "gg" });
  }

  const neighborMap: Record<string, Set<string>> = {};
  nodes.forEach(n => (neighborMap[n.id] = new Set([n.id])));
  links.forEach(({ source, target }) => {
    const s = String((source as any).id ?? source);
    const t = String((target as any).id ?? target);
    neighborMap[s].add(t); neighborMap[t].add(s);
  });
  nodes.forEach(n => (n.__neighbors = neighborMap[n.id]));
  return { nodes, links };
}

function drawLabel(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number, color: string) {
  ctx.font = `${fontSize}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillStyle = color;
  ctx.fillText(` ${text}`, x - 8, y + 9);
}


function hslFromVar(name: string, alpha?: number) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim(); 
  return alpha == null ? `hsl(${v})` : `hsl(${v} / ${alpha})`;
}

export default function ProjectsGraph({
  items,
  initialMode = "groups",
  className,
  minZoom = 0.85,
  maxZoom = 3,
  onNodeClickUrl,
}: Props) {
  const fgRef = useRef<ForceGraphMethods>();
  const wrapRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [mode, setMode] = useState<"tags" | "groups">(initialMode);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  
  const [colors, setColors] = useState(() => ({
    background: "transparent",
    link:       "#22c55e80",
    linkHover:  "#22c55e",
    linkDim:    "#22c55e26",
    nodeStroke: "#22c55e",
    nodeBadgeFill: "#22c55e1A",
    projectFill:   "#22c55e",
    label: "#E6EDF5",
    deEmphasisAlpha: 0.25,
  }));

  
  useEffect(() => {
    const compute = () => {
      const primary = hslFromVar("--primary");
      setColors({
        background: "transparent",
        link:       hslFromVar("--primary", 0.55),
        linkHover:  hslFromVar("--primary", 0.95),
        linkDim:    hslFromVar("--primary", 0.15),
        nodeStroke: primary,
        nodeBadgeFill: "transparent",
        projectFill:   primary,
        label:     hslFromVar("--foreground", 0.95),
        deEmphasisAlpha: 0.25,
      });
    };

    compute();

    
    const mo = new MutationObserver(compute);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    return () => mo.disconnect();
  }, []);

  
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

  const data: GData = useMemo(() => buildGraph(items, mode), [items, mode]);

  
  useEffect(() => {
  if (!fgRef.current || size.w === 0 || size.h === 0) return;

  
  const outer = Math.round(Math.min(size.w, size.h) * 0.42);
  const inner = Math.round(outer * 0.55);

  const g = (fgRef.current as any)?.graphData?.();
  if (g?.nodes?.length) seedPositions(g.nodes, outer, inner);

  fgRef.current.d3Force("radial",
    d3.forceRadial((n: any) => (n.type === "group" ? inner : outer), 0, 0)
      .strength(0.04) 
  );
  fgRef.current.d3Force("center", d3.forceCenter(0, 0));
  fgRef.current.d3Force("x", d3.forceX(0).strength(0.01));
  fgRef.current.d3Force("y", d3.forceY(0).strength(0.01));

  
  fgRef.current.d3Force("charge",
    d3.forceManyBody()
      .strength((n: any) =>
        n.type === "project" ? -60 : n.type === "tag" ? -50 : -30
      )
      .distanceMin(1)
      .distanceMax(220)
  );

  
  fgRef.current.d3Force("collide",
    d3.forceCollide((n: any) => {
      
      return n.type === "project" ? 12 : n.type === "tag" ? 18 : 22;
    }).strength(0.9)
  );

  
  
  const deg = new Map<string, number>();
  data.links.forEach(l => {
    const s = String((l as any).source.id ?? (l as any).source);
    const t = String((l as any).target.id ?? (l as any).target);
    deg.set(s, (deg.get(s) || 0) + 1);
    deg.set(t, (deg.get(t) || 0) + 1);
  });

  const linkForce: any = fgRef.current.d3Force("link");
  if (linkForce) {
    linkForce
      .distance((l: any) => {
        const s = String(l.source.id ?? l.source);
        const t = String(l.target.id ?? l.target);
        const d = (deg.get(s) || 0) + (deg.get(t) || 0);
        const base = l.kind === "gg" ? 34 : 80; 
        return base + 3 * Math.sqrt(d);
      })
      .strength((l: any) => (l.kind === "gg" ? 0.3 : 0.2)); 
  }
  fgRef.current.d3ReheatSimulation();
}, [size.w, size.h, mode, data.links]);


  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => setMode("groups")} className={`px-3 py-1.5 rounded-full border ${mode === "groups" ? "bg-primary text-primary-foreground" : "hover:bg-muted"} border-border`}>Categories</button>
        <button onClick={() => setMode("tags")}   className={`px-3 py-1.5 rounded-full border ${mode === "tags"   ? "bg-primary text-primary-foreground" : "hover:bg-muted"} border-border`}>Skills</button>
      </div>

      <div ref={wrapRef} className="relative h-[360px] sm:h-[470px] lg:h-[470px] w-full rounded-md overflow-hidden border border-foreground/30">
        {size.w > 0 && size.h > 0 && (
          <ForceGraph2D
            ref={fgRef}
            width={size.w}
            height={size.h}
            minZoom={minZoom}
            maxZoom={maxZoom}
            onZoom={t => setZoom(t.k)}
            nodeLabel={n => (zoom > 1.2 ? "" : (n as any).name)}
            graphData={{ nodes: data.nodes, links: data.links.filter(l => l.kind !== "gg") }}
            backgroundColor={colors.background}
            cooldownTicks={220}
            onNodeHover={(n: any) => {
                const id = n ? String(n.id) : null;
                setHoverId(prev => (prev === id ? prev : id));
              }}
            onNodeClick={(node: any) => {
              const n = node as GNode;
              if (!n.url) return;
              if (onNodeClickUrl) onNodeClickUrl(n.url);
              else window.open(n.url, "_blank", "noopener,noreferrer");
            }}
            linkColor={(l: any) => {
              if (!hoverId) return colors.link;
              const s = String(l.source.id ?? l.source);
              const t = String(l.target.id ?? l.target);
              return s === hoverId || t === hoverId ? colors.linkHover : colors.linkDim;
            }}
            linkWidth={(l: any) => {
              if (!hoverId) return 1;
              const s = String(l.source.id ?? l.source);
              const t = String(l.target.id ?? l.target);
              return s === hoverId || t === hoverId ? 2 : 1;
            }}
            nodeRelSize={6}
            nodeCanvasObject={(node: any, ctx, globalScale) => {
              const n = node as GNode & { x: number; y: number };
              const scale = Math.max(1, globalScale);
              const show = !hoverId || n.__neighbors?.has(hoverId);
              const alpha = show ? 1 : colors.deEmphasisAlpha;

              if (n.type === "project") {
                const r = 6;
                ctx.beginPath();
                ctx.arc(n.x, n.y, r, 0, 2 * Math.PI);
                ctx.fillStyle = colors.projectFill;
                ctx.globalAlpha = alpha;
                ctx.fill();
                ctx.globalAlpha = 1;
                if (globalScale > 1.2) drawLabel(ctx, n.name, n.x + r + 2, n.y, 12 / scale, colors.label);
                return;
              }

              const canvasBg = `hsl(${getComputedStyle(document.documentElement)
                    .getPropertyValue('--card')
                    .trim()})`;

              const r = n.type === "group" ? 20 / scale : 16 / scale;

              
              ctx.beginPath();
              ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
              ctx.globalAlpha = alpha;
              ctx.fillStyle = canvasBg; 
              ctx.fill();
              ctx.lineWidth = 1.4;
              ctx.strokeStyle = colors.nodeStroke;
              ctx.stroke();
              ctx.globalAlpha = 1;

              const key = normKey(n.name);
              const url = ICON_URLS[key] ?? DEFAULT_ICON_URL;
              
              
              const tintedIcon = getTintedIcon(key, url, colors.nodeStroke, () => (fgRef.current as any)?.refresh?.());
              const iconSize = r * 1.3;

              if (tintedIcon && ((tintedIcon as HTMLImageElement).complete || (tintedIcon as HTMLCanvasElement).width > 0)) {
                ctx.save();
                ctx.globalAlpha = alpha;
                
                
                ctx.beginPath();
                ctx.arc(n.x, n.y, r - 1, 0, Math.PI * 2);
                ctx.clip();
                
                
                ctx.drawImage(tintedIcon, n.x - iconSize / 2, n.y - iconSize / 2, iconSize, iconSize);
                ctx.restore();
              } else {
                
                const originalIcon = getIcon(key, url, () => (fgRef.current as any)?.refresh?.());
                if ((originalIcon as any)?.complete) {
                  ctx.save();
                  ctx.globalAlpha = alpha;
                  ctx.beginPath();
                  ctx.arc(n.x, n.y, r - 1, 0, Math.PI * 2);
                  ctx.clip();
                  ctx.drawImage(originalIcon, n.x - iconSize / 2, n.y - iconSize / 2, iconSize, iconSize);
                  ctx.restore();
                }
              }

              ctx.globalAlpha = 1;

              if (globalScale > 1.2) {
                ctx.font = `${11 / scale}px sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "top";
                ctx.fillStyle = colors.label;
                ctx.fillText(n.name, n.x, n.y + r + 3);
              }
            }}
            nodePointerAreaPaint={(node: any, color, ctx, globalScale) => {
              const n = node as GNode & { x: number; y: number };
              const scale = Math.max(1, globalScale);
              const r = n.type === "project" ? 6 : n.type === "group" ? 16 / scale : 14 / scale;
              ctx.beginPath();
              ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
              ctx.fillStyle = color;
              ctx.fill();
            }}
          />
        )}
      </div>
    </div>
  );
}