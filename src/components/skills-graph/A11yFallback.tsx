import {
  ALL_GROUP_IDS,
  EDGES,
  GROUPS,
  NODES,
  categoryOf,
  type GraphNode,
  type GroupId,
} from "./data";

interface A11yFallbackProps {
  onSelect: (node: GraphNode) => void;
}

export function A11yFallback({ onSelect }: A11yFallbackProps) {
  const skillsByGroup = (gid: GroupId) =>
    EDGES.filter((e) => e.target === gid).map((e) => e.source);
  const nodeById = new Map(NODES.map((n) => [n.id, n] as const));

  return (
    <nav
      aria-label="Skills and experiences (text view)"
      className="sr-only focus-within:not-sr-only"
    >
      <ul>
        {ALL_GROUP_IDS.map((gid) => {
          const g = GROUPS[gid];
          const expNode = nodeById.get(gid);
          return (
            <li key={gid}>
              <button
                type="button"
                onClick={() => expNode && onSelect(expNode)}
              >
                {g.label} — {g.year}
              </button>
              <ul>
                {skillsByGroup(gid).map((skillId) => {
                  const sn = nodeById.get(skillId);
                  const cat = categoryOf(skillId);
                  return (
                    <li key={`${gid}-${skillId}`}>
                      <button
                        type="button"
                        onClick={() => sn && onSelect(sn)}
                      >
                        {skillId}
                        {cat ? ` (${cat})` : ""}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
