import { useMemo, useState } from "react";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import { GripVertical, ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { buildLayoutsSmart } from "@/utils/layoutEngine";
import { PATTERN_A, PATTERN_B, PATTERN_C, assignSizeClasses } from "@/utils/layoutPatterns";
import { pinnedFromSizeClasses } from "@/utils/pinnedFromPattern";
import { buildLayoutsShelf } from "@/utils/layoutBuilderShelf";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);
const COLS = { lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 };

function ProjectCard({ title, summary, tags, url }: any) {
  const isGithub = url?.includes("github.com");
  return (
    <article className="h-full w-full rounded-xl border border-border bg-card shadow-soft overflow-hidden flex flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2 cursor-grab drag-handle">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold leading-none">{title}</h3>
        </div>
        {url && (
          <a href={url} target="_blank" rel="noopener"
             className="inline-flex items-center gap-1 rounded-full border border-border bg-primary/10 px-2 py-0.5 text-xs text-primary hover:bg-primary/20">
            {isGithub ? <Github className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
            Open
          </a>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col">
        {summary && <p className="text-xs text-muted-foreground line-clamp-4">{summary}</p>}
        {tags?.length ? (
          <div className="mt-auto pt-3 flex flex-wrap gap-1.5">
            {tags.map((t: string) => (
              <span key={t} className="inline-flex items-center rounded-full border border-border bg-secondary/30 px-2 py-0.5 text-[10px]">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function DraggableCatalogue() {
  const [patternName, setPatternName] = useState<"A"|"B"|"C">("C");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [group, setGroup] = useState<string | null>(null);

  // choose the pattern
  const pattern = patternName === "A" ? PATTERN_A : patternName === "B" ? PATTERN_B : PATTERN_C;

  // map ids → size class via pattern (repeats)
  const ids = useMemo(() => projects.map(p => p.id), []);
  const sizeClassById = useMemo(() => assignSizeClasses(ids, pattern), [ids, pattern]);

  // convert size classes to pinned-size specs (no x/y)
  const PINNED_SIZES = useMemo(() => pinnedFromSizeClasses(sizeClassById), [sizeClassById]);

  const noFilterActive = !query && !tag && !group;

  // build layouts with scoring/filter; sizes fixed by pattern
  const layouts = noFilterActive
  ? buildLayoutsShelf(ids, sizeClassById, { lg:6, md:4, sm:2, xs:1, xxs:1 })
  : buildLayoutsSmart({
      items: projects,
      cols: { lg:6, md:4, sm:2, xs:1, xxs:1 },
      pinned: pinnedFromSizeClasses(sizeClassById), // still provides minW/minH + sizes
      defaults: { w: 1, h: 2 },
      filter: { query, tag: tag ?? undefined, group: group ?? undefined },
    });

  return (
    <div className="mt-6">
      {/* Controls */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <input
          className="rounded-md border border-border bg-background px-3 py-1 text-sm"
          placeholder="Search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={`rounded-full border border-border px-3 py-1 text-sm ${!tag && !group ? "bg-muted/60" : "hover:bg-muted"}`} onClick={() => { setTag(null); setGroup(null); }}>
          All
        </button>
        <button className="rounded-full border border-border px-3 py-1 text-sm hover:bg-muted" onClick={() => { setTag("web"); setGroup(null); }}>
          Web
        </button>
        <button className="rounded-full border border-border px-3 py-1 text-sm hover:bg-muted" onClick={() => { setTag("ml"); setGroup(null); }}>
          Data/ML
        </button>

      </div>

      <ResponsiveGridLayout
        className="layout"
        cols={COLS}
        breakpoints={{ lg: 1024, md: 768, sm: 640, xs: 480, xxs: 0 }}
        rowHeight={90}
        margin={[12, 12]}
        containerPadding={[0, 0]}
        layouts={layouts}           // computed each render
        draggableHandle=".drag-handle"
        compactType="vertical"
        preventCollision={false}
        onLayoutChange={() => { /* no persistence → refresh restores pattern */ }}
      >
        {projects.map((p) => (
          <div key={p.id}>
            <ProjectCard
              title={p.title}
              summary={(p as any).summary ?? (p as any).description}
              tags={p.tags}
              url={p.url}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
