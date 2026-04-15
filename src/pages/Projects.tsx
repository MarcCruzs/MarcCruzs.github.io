import { useState, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { ForceGraph } from "@/components/ForceGraph";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, filterCategories, type Project } from "@/data/projects";

type TabType = "Categories" | "Skills";

export default function Projects() {
  const [activeTab, setActiveTab] = useState<TabType>("Categories");
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [projectList, setProjectList] = useState<Project[]>(projects);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const filtered = useMemo(() => {
    return projectList.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesFilter =
        activeFilter === "All"
          ? true
          : activeFilter === "Python"
          ? p.tags.some((t) => t.toLowerCase() === "python")
          : p.category.some(
              (c) =>
                c.toLowerCase().replace(/\s+/g, "") ===
                activeFilter.toLowerCase().replace(/\s+/g, "")
            );

      return matchesSearch && matchesFilter;
    });
  }, [projectList, activeFilter, search]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setProjectList((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* Page title */}
      <h1 className="text-4xl sm:text-5xl font-black uppercase text-theme mb-5 sm:mb-6">
        PROJECTS
      </h1>

      {/* Graph panel */}
      <div className="bento-card mb-5 sm:mb-6 overflow-hidden">
        {/* Tabs */}
        <div className="flex gap-2 p-3 border-b" style={{ borderColor: "var(--c-border)" }}>
          {(["Categories", "Skills"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                activeTab === tab
                  ? "bg-[#4a9eff] text-white shadow-sm"
                  : "text-theme-muted hover:text-theme"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Force graph — shorter on mobile */}
        <div className="h-[260px] sm:h-[340px]">
          <ForceGraph />
        </div>
      </div>

      {/* Search + filter bar */}
      <div className="flex items-center gap-2 mb-4 sm:mb-5 flex-wrap">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg px-3 py-1.5 text-sm text-theme placeholder-theme-dim focus:outline-none focus:border-[#4a9eff] w-28 sm:w-32 transition-colors"
          style={{
            background: "var(--c-card)",
            border: "1px solid var(--c-border)",
          }}
        />
        <div className="flex items-center gap-1.5 flex-wrap">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 hover:scale-105 active:scale-95 ${
                activeFilter === cat
                  ? "bg-white text-black border-white"
                  : "text-theme-muted border-[--c-border] hover:text-theme hover:border-[--c-border-hover]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Draggable project grid — 1 col mobile, 2 col tablet+ */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filtered.map((p) => p.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {filtered.length === 0 && (
        <div className="text-center text-theme-dim py-16">No projects match your search.</div>
      )}
    </div>
  );
}
