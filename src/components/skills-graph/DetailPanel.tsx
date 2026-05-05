import {
  EDGES,
  GROUPS,
  type GraphNode,
  type GroupId,
  categoryOf,
  groupsForSkill,
} from "./data";

interface DetailPanelProps {
  node: GraphNode | null;
  onClose: () => void;
  onJumpToGroup: (group: GroupId) => void;
}

export function DetailPanel({ node, onClose, onJumpToGroup }: DetailPanelProps) {
  if (!node) return null;

  const isExperience = node.type === "experience";
  const group = isExperience ? GROUPS[node.group as GroupId] : null;
  const usedAt = isExperience ? [] : groupsForSkill(node.id);
  const usedAtCount = usedAt.length;
  const skillCategory = isExperience ? null : node.category ?? categoryOf(node.id);

  return (
    <aside
      role="dialog"
      aria-labelledby="skills-graph-detail-title"
      className="motion-reduce:transition-none absolute right-3 bottom-3 z-10 max-w-[min(320px,calc(100%-1.5rem))] rounded-lg p-4 shadow-lg backdrop-blur-md transition-opacity duration-150 sm:right-4 sm:bottom-4"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--color-surface-dark) 78%, transparent)",
        color: "var(--color-on-dark)",
        border:
          "1px solid color-mix(in srgb, var(--color-on-dark) 22%, transparent)",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close detail panel"
        className="absolute top-2 right-2 rounded p-1 text-xs leading-none transition-colors hover:bg-white/10"
        style={{ color: "var(--color-on-dark)" }}
      >
        ✕
      </button>
      <div className="mb-2 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="inline-block h-3 w-3 rounded-full"
          style={{ backgroundColor: node.color }}
        />
        <span
          className="text-[10px] font-semibold tracking-widest uppercase"
          style={{
            color: "color-mix(in srgb, var(--color-on-dark) 70%, transparent)",
          }}
        >
          {isExperience ? "Experience" : "Skill"}
        </span>
      </div>
      <h3
        id="skills-graph-detail-title"
        className="mb-1 text-base font-semibold"
        style={{ color: "var(--color-on-dark)" }}
      >
        {node.label}
      </h3>
      {group ? (
        <>
          <p
            className="mb-2 text-xs"
            style={{
              color:
                "color-mix(in srgb, var(--color-on-dark) 75%, transparent)",
            }}
          >
            {group.year}
          </p>
          <p
            className="mb-3 text-xs leading-relaxed"
            style={{
              color:
                "color-mix(in srgb, var(--color-on-dark) 88%, transparent)",
            }}
          >
            {group.summary}
          </p>
          {group.link ? (
            <a
              href={group.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs underline-offset-2 hover:underline"
              style={{ color: "var(--color-primary)" }}
            >
              View work →
            </a>
          ) : null}
        </>
      ) : (
        <>
          {skillCategory ? (
            <p
              className="mb-1 text-[11px] font-medium tracking-wide"
              style={{
                color:
                  "color-mix(in srgb, var(--color-on-dark) 82%, transparent)",
              }}
            >
              {skillCategory}
            </p>
          ) : null}
          <p
            className="mb-2 text-xs"
            style={{
              color:
                "color-mix(in srgb, var(--color-on-dark) 75%, transparent)",
            }}
          >
            Connected to {usedAtCount} {usedAtCount === 1 ? "experience" : "experiences"}
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {usedAt.map((gid) => {
              const g = GROUPS[gid];
              return (
                <li key={gid}>
                  <button
                    type="button"
                    onClick={() => onJumpToGroup(gid)}
                    className="motion-reduce:transition-none inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors hover:bg-white/10"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, " + g.color + " 14%, transparent)",
                      color: "var(--color-on-dark)",
                      border: `1px solid ${g.color}`,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: g.color }}
                    />
                    {g.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {/* Edge count footer for experience nodes */}
      {isExperience ? (
        <p
          className="mt-3 text-[10px]"
          style={{
            color:
              "color-mix(in srgb, var(--color-on-dark) 60%, transparent)",
          }}
        >
          {countSkillsAtGroup(node.id as GroupId)} skills connected
        </p>
      ) : null}
    </aside>
  );
}

function countSkillsAtGroup(gid: GroupId): number {
  return EDGES.filter((e) => e.target === gid).length;
}
