import { forceCollide, forceX, forceY } from "d3-force";
import { useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D, {
  type ForceGraphMethods,
} from "react-force-graph-2d";
import { A11yFallback } from "./A11yFallback";
import { DetailPanel } from "./DetailPanel";
import { Filters } from "./Filters";
import {
  ACTIVE_RING,
  ALL_GROUP_IDS,
  EDGES,
  GROUPS,
  NODES,
  SKILL_STROKE,
  type GraphNode,
  type GroupId,
  type SkillCategory,
  neighborsOf,
} from "./data";

const DIM_OPACITY = 0.18;
const SEARCH_FADE_OPACITY = 0.12;
const FILTER_DIM_OPACITY = 0.12;

/* Opacity easing — when filter/hover/search changes, displayed opacity
   lerps toward target each frame. EASE_SPEED is the per-frame fraction
   of the remaining gap to close (~60fps → settles in ~12 frames).
   TRANSITION_MS is how long we keep refreshing the canvas after a
   change so the easing actually runs even when the sim has cooled. */
const EASE_SPEED = 0.22;
const EASE_EPSILON = 0.005;
const TRANSITION_MS = 280;

/* Force constants tuned for ~30 skills + 5 experience hubs.
   Shorter links + lighter skill repulsion keep the cloud compact;
   stronger experience charge keeps the hubs separated. Collide
   padding is sized so 11px skill labels stay legible without the
   graph spilling outside the viewport. */
const LINK_DISTANCE = 78;
const LINK_STRENGTH = 0.38;
const CHARGE_EXPERIENCE = -380;
const CHARGE_SKILL = -170;
const COLLIDE_PADDING = 34;
const CENTER_STRENGTH = 0.07;

interface FGNode extends GraphNode {
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
  vx?: number;
  vy?: number;
}

interface FGLink {
  source: string | FGNode;
  target: string | FGNode;
}

function nodeRadius(n: FGNode): number {
  return n.type === "experience" ? 16 : 7;
}

function linkEndId(end: string | FGNode): string {
  return typeof end === "string" ? end : end.id;
}

export function SkillsGraph() {
  const fgRef = useRef<ForceGraphMethods<FGNode, FGLink>>();
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeGroup, setActiveGroup] = useState<GroupId | null>(null);
  const [activeCategories, setActiveCategories] = useState<Set<SkillCategory>>(
    () => new Set(),
  );
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [search, setSearch] = useState("");
  const [size, setSize] = useState({ w: 900, h: 560 });
  const [reducedMotion, setReducedMotion] = useState(false);

  const graphData = useMemo(() => {
    const nodes: FGNode[] = NODES.map((n) => ({ ...n }));
    const links: FGLink[] = EDGES.map((e) => ({
      source: e.source,
      target: e.target,
    }));
    return { nodes, links };
  }, []);

  /* Configure runtime d3 forces — single source of truth for layout.
     forceX/forceY pull every node toward the origin, keeping the graph
     a centered, roughly circular cloud rather than drifting outward.
     COLLIDE_PADDING enforces label headroom around every node. */
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    fg.d3Force("link")?.distance(LINK_DISTANCE).strength(LINK_STRENGTH);
    fg.d3Force("charge")?.strength((n: FGNode) =>
      n.type === "experience" ? CHARGE_EXPERIENCE : CHARGE_SKILL,
    );
    fg.d3Force(
      "collide",
      forceCollide<FGNode>().radius((n) => nodeRadius(n) + COLLIDE_PADDING),
    );
    fg.d3Force("x", forceX<FGNode>(0).strength(CENTER_STRENGTH));
    fg.d3Force("y", forceY<FGNode>(0).strength(CENTER_STRENGTH));
  }, []);

  /* Reduced motion detection */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  /* Container size tracking — read actual rendered box so the
     CSS max-height clamp (which keeps the graph in the fold) wins
     over any aspect-ratio-driven height. */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Re-fit on container resize (after sim is already settled) */
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    const t = setTimeout(() => fg.zoomToFit(reducedMotion ? 0 : 300, 80), 80);
    return () => clearTimeout(t);
  }, [size.w, size.h, reducedMotion]);

  /* Drive the canvas through the opacity transition. After the d3 sim
     cools, force-graph pauses redraws (autoPauseRedraw). Flipping it
     off during the transition window forces per-frame repaints so the
     eased opacity values actually get sampled. Reduced-motion users
     still need a brief flip to repaint at the snapped target. */
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      nodeOpacityRef.current.clear();
      linkOpacityRef.current.clear();
    }
    setTransitioning(true);
    const t = setTimeout(
      () => setTransitioning(false),
      reducedMotion ? 32 : TRANSITION_MS,
    );
    return () => clearTimeout(t);
  }, [activeGroup, activeCategories, hovered, search, reducedMotion]);

  /* Adjacency for hover dimming */
  const adjacency = useMemo(() => {
    const m: Record<string, Set<string>> = {};
    for (const e of EDGES) {
      (m[e.source] ??= new Set()).add(e.target);
      (m[e.target] ??= new Set()).add(e.source);
    }
    return m;
  }, []);

  /* Group-filter visibility (null = all) */
  const isInActiveGroup = (id: string): boolean => {
    if (activeGroup == null) return true;
    if (id === activeGroup) return true;
    return adjacency[id]?.has(activeGroup) ?? false;
  };

  /* Category-filter visibility (empty set = no constraint).
     Experience hubs are always considered to match so toggling
     a category never hides the structural anchors of the graph. */
  const matchesCategoryFilter = (n: FGNode): boolean => {
    if (activeCategories.size === 0) return true;
    if (n.type === "experience") return true;
    return n.category != null && activeCategories.has(n.category);
  };

  const matchesSearch = (label: string): boolean => {
    if (!search.trim()) return true;
    return label.toLowerCase().includes(search.trim().toLowerCase());
  };

  const neighborSetOfHover = useMemo(
    () => (hovered ? neighborsOf(hovered) : null),
    [hovered],
  );

  /* Per-node target opacity = combined filter/search/hover state.
     Filter mismatch dims rather than hides so the graph's overall
     shape stays stable when chips toggle on/off. */
  const nodeTargetOpacity = (n: FGNode): number => {
    let o = 1;
    if (!isInActiveGroup(n.id)) o = Math.min(o, FILTER_DIM_OPACITY);
    if (!matchesCategoryFilter(n)) o = Math.min(o, FILTER_DIM_OPACITY);
    if (hovered && n.id !== hovered) {
      const isNeighbor = neighborSetOfHover?.has(n.id) ?? false;
      if (!isNeighbor) o = Math.min(o, DIM_OPACITY);
    }
    if (!matchesSearch(n.label)) o = Math.min(o, SEARCH_FADE_OPACITY);
    return o;
  };

  const nodeById = useMemo(() => {
    const m = new Map<string, FGNode>();
    for (const n of graphData.nodes) m.set(n.id, n);
    return m;
  }, [graphData]);

  const linkTargetOpacity = (l: FGLink): number => {
    const a = linkEndId(l.source);
    const b = linkEndId(l.target);
    let o: number;
    if (hovered) {
      const active = a === hovered || b === hovered;
      o = active ? 0.95 : DIM_OPACITY;
    } else {
      o = 0.55;
    }
    if (!isInActiveGroup(a) || !isInActiveGroup(b)) {
      o = Math.min(o, FILTER_DIM_OPACITY);
    }
    if (activeCategories.size > 0) {
      const na = nodeById.get(a);
      const nb = nodeById.get(b);
      const aMatch = na ? matchesCategoryFilter(na) : true;
      const bMatch = nb ? matchesCategoryFilter(nb) : true;
      if (!aMatch || !bMatch) o = Math.min(o, FILTER_DIM_OPACITY);
    }
    return o;
  };

  /* Displayed opacity lerps toward target each frame. First sighting of
     a node/link snaps to target so initial paint isn't a fade-in. */
  const nodeOpacityRef = useRef<Map<string, number>>(new Map());
  const linkOpacityRef = useRef<Map<string, number>>(new Map());

  const easedNodeOpacity = (n: FGNode): number => {
    const target = nodeTargetOpacity(n);
    if (reducedMotion) {
      nodeOpacityRef.current.set(n.id, target);
      return target;
    }
    const prev = nodeOpacityRef.current.get(n.id);
    if (prev == null) {
      nodeOpacityRef.current.set(n.id, target);
      return target;
    }
    const next =
      Math.abs(target - prev) < EASE_EPSILON
        ? target
        : prev + (target - prev) * EASE_SPEED;
    nodeOpacityRef.current.set(n.id, next);
    return next;
  };

  const linkKey = (l: FGLink): string =>
    `${linkEndId(l.source)}::${linkEndId(l.target)}`;

  const easedLinkOpacity = (l: FGLink): number => {
    const target = linkTargetOpacity(l);
    const key = linkKey(l);
    if (reducedMotion) {
      linkOpacityRef.current.set(key, target);
      return target;
    }
    const prev = linkOpacityRef.current.get(key);
    if (prev == null) {
      linkOpacityRef.current.set(key, target);
      return target;
    }
    const next =
      Math.abs(target - prev) < EASE_EPSILON
        ? target
        : prev + (target - prev) * EASE_SPEED;
    linkOpacityRef.current.set(key, next);
    return next;
  };

  const labelFade = (_n: FGNode, _scale: number): number => 1;

  const drawNode = (
    n: FGNode,
    ctx: CanvasRenderingContext2D,
    globalScale: number,
  ) => {
    const op = easedNodeOpacity(n);
    if (op === 0 || n.x == null || n.y == null) return;

    const isHover = hovered === n.id;
    const isSelected = selected?.id === n.id;
    const r = nodeRadius(n);

    ctx.globalAlpha = op;

    if (isHover || isSelected) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, r + 5, 0, Math.PI * 2);
      ctx.strokeStyle = isSelected ? ACTIVE_RING : n.color;
      ctx.globalAlpha = op * 0.55;
      ctx.lineWidth = 2 / globalScale;
      ctx.stroke();
      ctx.globalAlpha = op;
    }

    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fillStyle = n.color;
    ctx.fill();
    ctx.lineWidth = (isHover || isSelected ? 2.2 : 1.2) / globalScale;
    ctx.strokeStyle =
      n.type === "skill"
        ? SKILL_STROKE
        : "rgba(0, 24, 18, 0.55)";
    ctx.stroke();

    const lf = labelFade(n, globalScale) * op;
    if (lf > 0.02) {
      const fontSize = (n.type === "experience" ? 13 : 11) / globalScale;
      ctx.font = `${n.type === "experience" ? 600 : 500} ${fontSize}px Inter, system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.globalAlpha = lf;
      ctx.lineWidth = 3 / globalScale;
      ctx.strokeStyle = "rgba(10, 26, 22, 0.92)";
      ctx.lineJoin = "round";
      ctx.strokeText(n.label, n.x, n.y + r + 4 / globalScale);
      ctx.fillStyle = "rgba(245, 251, 248, 0.96)";
      ctx.fillText(n.label, n.x, n.y + r + 4 / globalScale);
    }

    ctx.globalAlpha = 1;
  };

  /* Pointer hit-area: same shape as the visible node so click lands on
     the circle. Dimmed nodes stay clickable — users filtering to a
     group can still inspect adjacent skills. */
  const drawPointerArea = (
    n: FGNode,
    paintColor: string,
    ctx: CanvasRenderingContext2D,
  ) => {
    if (n.x == null || n.y == null) return;
    ctx.fillStyle = paintColor;
    ctx.beginPath();
    ctx.arc(n.x, n.y, nodeRadius(n) + 4, 0, Math.PI * 2);
    ctx.fill();
  };

  const linkColor = (l: FGLink): string => {
    const op = easedLinkOpacity(l);
    if (op === 0) return "rgba(0,0,0,0)";
    const a = linkEndId(l.source);
    const b = linkEndId(l.target);
    const active = hovered != null && (a === hovered || b === hovered);
    if (active) return `rgba(160, 220, 200, ${op})`;
    return `rgba(220, 240, 232, ${op * 0.5})`;
  };

  const linkWidth = (l: FGLink): number => {
    const a = linkEndId(l.source);
    const b = linkEndId(l.target);
    return hovered != null && (a === hovered || b === hovered) ? 1.6 : 1;
  };

  const onResetView = () => {
    fgRef.current?.zoomToFit(reducedMotion ? 0 : 400, 80);
    setActiveGroup(null);
    setActiveCategories(new Set());
    setSearch("");
    setHovered(null);
    setSelected(null);
  };

  /* Pre-tick before first paint so the graph appears settled instead of
     animating from chaos. Reduced-motion users get more warmup and zero
     cooldown so they see no visible motion at all. */
  const cooldownTicks = reducedMotion ? 0 : 60;
  const warmupTicks = reducedMotion ? 300 : 200;

  return (
    <div className="w-full">
      <Filters
        active={activeGroup}
        onChange={setActiveGroup}
        search={search}
        onSearchChange={setSearch}
        activeCategories={activeCategories}
        onCategoriesChange={setActiveCategories}
      />

      <div
        ref={containerRef}
        className="relative w-full"
        style={{
          aspectRatio: "900 / 600",
          /* Cap so the whole graph (header + chips + canvas + legend
             + caption) fits in a single fold on a typical laptop.
             clamp keeps it readable on phones (min 300px); upper bound
             grew with the skill count so 30 nodes have room to breathe. */
          maxHeight: "clamp(300px, 62vh, 620px)",
          backgroundColor: "var(--color-surface-dark)",
          borderRadius: "var(--radius-lg)",
          border:
            "1px solid color-mix(in srgb, var(--color-on-dark) 14%, transparent)",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" className="absolute inset-0">
          <ForceGraph2D<FGNode, FGLink>
            ref={fgRef}
            graphData={graphData}
            width={size.w}
            height={size.h}
            backgroundColor="rgba(0,0,0,0)"
            autoPauseRedraw={!transitioning}
            cooldownTicks={cooldownTicks}
            warmupTicks={warmupTicks}
            d3AlphaDecay={reducedMotion ? 1 : 0.04}
            d3VelocityDecay={0.55}
            minZoom={0.7}
            maxZoom={2.6}
            enableNodeDrag={!reducedMotion}
            nodeRelSize={1}
            nodeCanvasObjectMode={() => "replace"}
            nodeCanvasObject={drawNode}
            nodePointerAreaPaint={drawPointerArea}
            linkColor={linkColor}
            linkWidth={linkWidth}
            onNodeHover={(n) => setHovered(n ? n.id : null)}
            onNodeClick={(n) => setSelected({ ...(n as FGNode) })}
            onBackgroundClick={() => setSelected(null)}
            onEngineStop={() => fgRef.current?.zoomToFit(reducedMotion ? 0 : 600, 80)}
          />
        </div>

        <DetailPanel
          node={selected}
          onClose={() => setSelected(null)}
          onJumpToGroup={(g) => {
            setActiveGroup(g);
            setSelected(null);
          }}
        />

        <button
          type="button"
          onClick={onResetView}
          aria-label="Reset graph view"
          className="motion-reduce:transition-none absolute right-3 bottom-3 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-on-dark) 14%, transparent)",
            color: "var(--color-on-dark)",
            border:
              "1px solid color-mix(in srgb, var(--color-on-dark) 28%, transparent)",
            backdropFilter: "blur(6px)",
            display: selected ? "none" : "block",
          }}
        >
          Reset view
        </button>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: "hsl(163, 38%, 60%)" }}
            aria-hidden="true"
          />
          <span style={{ color: "var(--color-text-muted)" }}>Skill</span>
        </div>
        {ALL_GROUP_IDS.map((gid) => {
          const g = GROUPS[gid];
          return (
            <div key={gid} className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: g.color }}
                aria-hidden="true"
              />
              <span style={{ color: "var(--color-text-muted)" }}>{g.label}</span>
            </div>
          );
        })}
      </div>

      <p className="mt-2 text-xs" style={{ color: "var(--color-text-subtle)" }}>
        Hover a node to highlight its connections. Click for detail · drag to
        reposition · scroll to zoom · drag empty space to pan.
      </p>

      <A11yFallback onSelect={(n) => setSelected(n)} />
    </div>
  );
}
