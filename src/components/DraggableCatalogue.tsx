import { useMemo, useState } from "react";
import {
  Responsive,
  WidthProvider,
  type Layouts,
  type Layout,
} from "react-grid-layout";
import { GripVertical, ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { buildLayoutsSmart } from "@/utils/layoutEngine";
import {
  PATTERN_A,
  PATTERN_B,
  PATTERN_C,
  assignSizeClasses,
} from "@/utils/layoutPatterns";
import { buildLayoutsShelf } from "@/utils/layoutBuilderShelf";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);
const COLS = { lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 };

function parseMarkdown(text: string): JSX.Element {
  if (!text) return <></>;

  const lines = text.split("\n");
  const elements: JSX.Element[] = [];
  let currentParagraph: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const paragraphText = currentParagraph.join("\n");
      elements.push(
        <p key={`p-${key++}`} className="mb-2 last:mb-0">
          {parseInlineMarkdown(paragraphText)}
        </p>
      );
      currentParagraph = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
      flushParagraph();
      elements.push(
        <ul key={`ul-${key++}`} className="mb-2 last:mb-0 ml-4 list-disc">
          <li className="mb-1">
            {parseInlineMarkdown(trimmedLine.substring(2))}
          </li>
        </ul>
      );
    } else if (/^\d+\.\s/.test(trimmedLine)) {
      flushParagraph();
      const content = trimmedLine.replace(/^\d+\.\s/, "");
      elements.push(
        <ol key={`ol-${key++}`} className="mb-2 last:mb-0 ml-4 list-decimal">
          <li className="mb-1">{parseInlineMarkdown(content)}</li>
        </ol>
      );
    } else if (trimmedLine === "") {
      flushParagraph();
    } else {
      currentParagraph.push(line);
    }
  });

  flushParagraph();

  return <>{elements}</>;
}

function parseInlineMarkdown(text: string): (string | JSX.Element)[] {
  const elements: (string | JSX.Element)[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch =
      remaining.match(/^(.*?)\*\*(.*?)\*\*(.*)/s) ||
      remaining.match(/^(.*?)__(.*?)__(.*)/s);
    if (boldMatch) {
      if (boldMatch[1])
        elements.push(...parseTextWithLineBreaks(boldMatch[1], key));
      elements.push(
        <strong key={`b-${key++}`}>
          {parseTextWithLineBreaks(boldMatch[2], key)}
        </strong>
      );
      remaining = boldMatch[3];
      continue;
    }

    const italicMatch =
      remaining.match(/^(.*?)\*(.*?)\*(.*)/s) ||
      remaining.match(/^(.*?)_(.*?)_(.*)/s);
    if (italicMatch && !remaining.match(/^\*\*/)) {
      // Make sure it's not part of bold
      if (italicMatch[1])
        elements.push(...parseTextWithLineBreaks(italicMatch[1], key));
      elements.push(
        <em key={`i-${key++}`}>
          {parseTextWithLineBreaks(italicMatch[2], key)}
        </em>
      );
      remaining = italicMatch[3];
      continue;
    }

    const codeMatch = remaining.match(/^(.*?)`(.*?)`(.*)/s);
    if (codeMatch) {
      if (codeMatch[1])
        elements.push(...parseTextWithLineBreaks(codeMatch[1], key));
      elements.push(
        <code
          key={`c-${key++}`}
          className="bg-muted px-1 py-0.5 rounded text-xs font-mono"
        >
          {codeMatch[2]}
        </code>
      );
      remaining = codeMatch[3];
      continue;
    }

    const linkMatch = remaining.match(/^(.*?)\[([^\]]+)\]\(([^)]+)\)(.*)/s);
    if (linkMatch) {
      if (linkMatch[1])
        elements.push(...parseTextWithLineBreaks(linkMatch[1], key));
      elements.push(
        <a
          key={`l-${key++}`}
          href={linkMatch[3]}
          target="_blank"
          rel="noopener,noreferrer"
          className="text-primary hover:underline"
        >
          {linkMatch[2]}
        </a>
      );
      remaining = linkMatch[4];
      continue;
    }

    elements.push(...parseTextWithLineBreaks(remaining, key));
    break;
  }

  return elements;
}

function parseTextWithLineBreaks(
  text: string,
  keyOffset: number
): (string | JSX.Element)[] {
  if (!text.includes("\n")) {
    return [text];
  }

  const parts = text.split("\n");
  const result: (string | JSX.Element)[] = [];

  parts.forEach((part, index) => {
    if (index > 0) {
      result.push(<br key={`br-${keyOffset}-${index}`} />);
    }
    if (part) {
      result.push(part);
    }
  });

  return result;
}

function ProjectCard({ title, summary, tags, url }: any) {
  const isGithub = url?.includes("github.com");
  return (
    <article className="glass-card h-full w-full rounded-xl border border-border bg-card shadow-soft overflow-hidden flex flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-foreground/30 px-3 py-2 cursor-grab drag-handle">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold leading-none">{title}</h3>
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener,noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-border bg-primary/10 px-2 py-0.5 text-xs text-primary hover:bg-primary/20"
          >
            {<ExternalLink className="h-3 w-3" />}
            Open
          </a>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col">
        {summary && (
          <div className="text-[15px] text-muted-foreground line-clamp-5 prose prose-sm max-w-none">
            {parseMarkdown(summary)}
          </div>
        )}
        {tags?.length ? (
          <div className="responsive-tag mt-auto pt-3 flex flex-wrap gap-1.5">
            {tags.map((t: string) => (
              <span
                key={t}
                className="select-none hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--primary))] inline-flex items-center rounded-full border border-border bg-secondary/30 px-3 py-1 text-[12px] transition-colors duration-500 ease-out"
              >
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
  const [patternName, setPatternName] = useState<"A" | "B" | "C">("C");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [group, setGroup] = useState<string | null>(null);

  const pattern =
    patternName === "A"
      ? PATTERN_A
      : patternName === "B"
      ? PATTERN_B
      : PATTERN_C;

  const norm = (s: string) => s.toLowerCase();

  const activeItems = useMemo(() => {
    let arr = projects;

    if (query) {
      const q = norm(query);
      arr = arr.filter(
        (p) =>
          norm(p.title).includes(q) ||
          norm((p as any).summary ?? (p as any).description ?? "").includes(
            q
          ) ||
          (p.tags || []).some((t) => norm(t).includes(q))
      );
    }

    if (tag) {
      const t = norm(tag);
      arr = arr.filter((p) =>
        (p.tags || []).some((x) => norm(x) === t || norm(x).includes(t))
      );
    }

    if (group) {
      const g = norm(group);
      arr = arr.filter((p) =>
        Array.isArray(p.group)
          ? p.group.some((x) => norm(x) === g)
          : norm(p.group || "") === g
      );
    }

    return arr;
  }, [projects, query, tag, group]);

  const ids = useMemo(() => activeItems.map((p) => p.id), [activeItems]);
  const sizeClassById = useMemo(
    () => assignSizeClasses(ids, pattern),
    [ids, pattern]
  );
  const noFilterActive = !query && !tag && !group;

  const clampMinSize = (ls: Layouts, minH = 2): Layouts =>
    Object.fromEntries(
      Object.entries(ls).map(([bp, arr]) => [
        bp,
        arr.map((item: Layout) => ({
          ...item,
          minH: Math.max(item.minH ?? minH, minH),
        })),
      ])
    );

  const raw_layouts = noFilterActive
    ? buildLayoutsShelf(ids, sizeClassById, {
        lg: 3,
        md: 3,
        sm: 2,
        xs: 1,
        xxs: 1,
      })
    : buildLayoutsSmart({
        items: projects,
        cols: { lg: 6, md: 4, sm: 2, xs: 1, xxs: 1 },
        defaults: { w: 3, h: 2 },
        filter: { query, tag: tag ?? undefined, group: group ?? undefined },
      });

  const layouts = clampMinSize(raw_layouts);

  return (
    <div className="mt-6">
      {/* Controls */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <input
          className="rounded-md border border-border bg-background px-3 py-1 text-sm glass-card"
          placeholder={tag == null ? "Search..." : tag}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className={`glass-card rounded-full border border-border px-3 py-1 text-sm ${
            !tag && !group ? "bg-muted/60" : "hover:bg-muted"
          }`}
          onClick={() => {
            setTag(null);
            setGroup(null);
          }}
        >
          All
        </button>
        <button
          className="glass-card rounded-full border border-border px-3 py-1 text-sm hover:bg-muted"
          onClick={() => {
            setTag(null);
            setGroup("Data Science");
          }}
        >
          Data Science
        </button>
        <button
          className="glass-card rounded-full border border-border px-3 py-1 text-sm hover:bg-muted"
          onClick={() => {
            setTag(null);
            setGroup("Machine Learning");
          }}
        >
          Machine Learning
        </button>
        <button
          className="glass-card rounded-full border border-border px-3 py-1 text-sm hover:bg-muted"
          onClick={() => {
            setTag(null);
            setGroup("Web Dev");
          }}
        >
          Web Development
        </button>
        <button
          className="glass-card rounded-full border border-border px-3 py-1 text-sm hover:bg-muted"
          onClick={() => {
            setTag(null);
            setGroup("Class Work");
          }}
        >
          Class Work
        </button>
        <button
          className="glass-card rounded-full border border-border px-3 py-1 text-sm hover:bg-muted"
          onClick={() => {
            setTag("python");
            setGroup(null);
          }}
        >
          Python
        </button>
      </div>

      <ResponsiveGridLayout
        className="layout rgl-custom"
        cols={COLS}
        breakpoints={{ lg: 1024, md: 768, sm: 640, xs: 480, xxs: 0 }}
        rowHeight={90}
        margin={[12, 12]}
        containerPadding={[0, 0]}
        layouts={layouts}
        draggableHandle=".drag-handle"
        compactType="vertical"
        preventCollision={false}
        draggableCancel=".no-drag, a, button"
      >
        {activeItems.map((p) => (
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
