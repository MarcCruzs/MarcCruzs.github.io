import { ExternalLink, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: project.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.45 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="bento-card p-4 flex flex-col gap-3 select-none">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <button
            {...attributes}
            {...listeners}
            className="text-theme-dim hover:text-theme-muted cursor-grab active:cursor-grabbing p-0.5 flex-shrink-0 transition-colors hover:scale-110"
            aria-label="Drag to reorder"
          >
            <GripVertical size={15} />
          </button>
          <h3 className="text-sm font-bold text-theme truncate">{project.title}</h3>
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] text-[#4a9eff] hover:text-blue-300 transition-all hover:scale-105 flex-shrink-0"
          >
            <ExternalLink size={11} />
            Open
          </a>
        )}
      </div>

      {/* Subtitle */}
      {project.subtitle && (
        <p className="text-xs text-theme-muted font-medium -mt-1">{project.subtitle}</p>
      )}

      {/* Description */}
      <p className="text-xs text-theme-muted leading-relaxed flex-1 line-clamp-5">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Resize handle visual cue */}
      <div className="absolute bottom-1.5 right-1.5 opacity-20 pointer-events-none">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M9 1L1 9M9 5L5 9M9 9L9 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
