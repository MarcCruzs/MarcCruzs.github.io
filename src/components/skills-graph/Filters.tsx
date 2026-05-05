import {
  ALL_CATEGORIES,
  ALL_GROUP_IDS,
  GROUPS,
  type GroupId,
  type SkillCategory,
} from "./data";

interface FiltersProps {
  active: GroupId | null;
  onChange: (group: GroupId | null) => void;
  search: string;
  onSearchChange: (q: string) => void;
  activeCategories: ReadonlySet<SkillCategory>;
  onCategoriesChange: (next: Set<SkillCategory>) => void;
}

export function Filters({
  active,
  onChange,
  search,
  onSearchChange,
  activeCategories,
  onCategoriesChange,
}: FiltersProps) {
  const toggleCategory = (c: SkillCategory) => {
    const next = new Set(activeCategories);
    if (next.has(c)) next.delete(c);
    else next.add(c);
    onCategoriesChange(next);
  };

  return (
    <div className="mb-3 flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter graph by experience"
        >
          <FilterChip
            label="All"
            color="var(--color-text)"
            isActive={active === null}
            onClick={() => onChange(null)}
          />
          {ALL_GROUP_IDS.map((id) => {
            const g = GROUPS[id];
            return (
              <FilterChip
                key={id}
                label={g.label}
                color={g.color}
                isActive={active === id}
                onClick={() => onChange(active === id ? null : id)}
              />
            );
          })}
        </div>
        <label className="relative block w-full sm:w-56">
          <span className="sr-only">Search skills and experiences</span>
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search…"
            className="w-full rounded-md px-3 py-1.5 text-xs outline-none transition-colors focus:ring-2 focus:ring-offset-1"
            style={{
              backgroundColor: "var(--color-surface, transparent)",
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
            }}
          />
        </label>
      </div>
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter skills by category"
      >
        <FilterChip
          label="All categories"
          color="var(--color-text)"
          isActive={activeCategories.size === 0}
          onClick={() => onCategoriesChange(new Set())}
        />
        {ALL_CATEGORIES.map((c) => (
          <FilterChip
            key={c}
            label={c}
            color="var(--color-text)"
            isActive={activeCategories.has(c)}
            onClick={() => toggleCategory(c)}
          />
        ))}
      </div>
    </div>
  );
}

interface ChipProps {
  label: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterChip({ label, color, isActive, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className="motion-reduce:transition-none inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-150 hover:-translate-y-0.5"
      style={{
        backgroundColor: isActive
          ? "color-mix(in srgb, " + color + " 18%, transparent)"
          : "color-mix(in srgb, var(--color-text) 8%, transparent)",
        color: "var(--color-text)",
        border: isActive
          ? `1px solid ${color}`
          : "1px solid color-mix(in srgb, var(--color-text) 18%, transparent)",
      }}
    >
      <span
        aria-hidden="true"
        className="inline-block h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </button>
  );
}
