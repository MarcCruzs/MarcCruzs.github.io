import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type ProjectSize = "medium" | "small";

interface Project {
  id: string;
  title: string;
  group: string;
  tags: string[];
  description: string;
  url: string | null;
  size: ProjectSize;
  image: string | null;
  imageAlt: string;
  gradient: string;
}

const projects: Project[] = [
  // Engineering background — credibility, not the main pitch
  {
    id: "nasa-rd",
    title: "NASA R&D",
    group: "Data Pipelines",
    tags: ["Python", "ETL", "pandas", "HPC", "REST API"],
    description:
      "Built data pipelines and contributed to contrail research at NASA Ames — the same engineering rigor behind every site I build.",
    url: null,
    size: "medium",
    image: "/images/portfolio/nasa-contrails.jpg",
    imageAlt: "Satellite view of aircraft contrails over mountainous terrain",
    gradient: "linear-gradient(135deg, hsl(25,28%,18%) 0%, hsl(14,50%,32%) 100%)",
  },
  {
    id: "suas-competition",
    title: "SUAS Competition",
    group: "Software Lead",
    tags: ["Python", "PyTorch", "Roboflow", "UAV", "Jira"],
    description:
      "Led a team building an object detection system for an international UAV competition — shipping under deadline pressure.",
    url: "https://github.com/MarcCruzs/ODLC_Machine_Inferencing_System",
    size: "medium",
    image: "/images/portfolio/suas-drone.jpg",
    imageAlt: "Custom-built UAV drone in flight against blue sky",
    gradient: "linear-gradient(135deg, hsl(72,36%,26%) 0%, hsl(72,30%,38%) 100%)",
  },
  {
    id: "precision-agriculture",
    title: "Precision Agriculture",
    group: "ML Research",
    tags: ["Python", "PyTorch", "OpenCV", "UAV"],
    description:
      "Built UAV object detection for autonomous weed removal as part of an NSF REU program.",
    url: "https://github.com/cppuavlab/UGV_UAV",
    size: "medium",
    image: "/images/portfolio/precision-ag-aerial.png",
    imageAlt: "Aerial map view of agricultural research campus",
    gradient: "linear-gradient(135deg, hsl(72,36%,22%) 0%, hsl(60,40%,32%) 100%)",
  },
  {
    id: "mobility-scooters",
    title: "Mobility Scooters DL",
    group: "ML Research",
    tags: ["Python", "TensorFlow", "Raspberry Pi"],
    description:
      "Deep learning research for mobility scooter safety — real-world impact for elderly and disabled users.",
    url: "https://github.com/MarcCruzs/NSFREU2022-Mobility-Scooter",
    size: "small",
    image: null,
    imageAlt: "",
    gradient: "linear-gradient(135deg, hsl(182,38%,22%) 0%, hsl(182,38%,36%) 100%)",
  },
  {
    id: "gpu-computing",
    title: "GPU Computing",
    group: "Systems",
    tags: ["CUDA C", "C++", "HPC", "Slurm"],
    description:
      "Low-level GPU programming on an HPC cluster — thread scheduling, batch ops, performance at scale.",
    url: "https://github.com/MarcCruzs/CS4990-gpu-computing",
    size: "small",
    image: null,
    imageAlt: "",
    gradient: "linear-gradient(135deg, hsl(25,28%,18%) 0%, hsl(25,35%,28%) 100%)",
  },
  {
    id: "apache-sdap",
    title: "Apache SDAP Airflow",
    group: "Data Pipelines",
    tags: ["Python", "Apache Airflow"],
    description:
      "Integrated Airflow into Apache SDAP for better logging and pipeline orchestration.",
    url: "https://github.com/MarcCruzs/Apache-SDAP-Airflow",
    size: "small",
    image: null,
    imageAlt: "",
    gradient: "linear-gradient(135deg, hsl(14,55%,22%) 0%, hsl(14,57%,40%) 100%)",
  },
];

/* ── Thumbnail (shared — real image or gradient fallback) ───────────────── */
function Thumbnail({
  project,
  className,
  children,
}: {
  project: Project;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{ background: project.gradient }}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <span
            className="font-bold text-center leading-tight opacity-40 text-xl"
            style={{
              color: "white",
              fontFamily: "var(--font-display)",
            }}
          >
            {project.title}
          </span>
        </div>
      )}
      {/* Scrim for readability when image is present */}
      {project.image && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, hsl(25 25% 6% / 0.55) 0%, transparent 60%)",
          }}
        />
      )}
      {children}
    </div>
  );
}

/* ── Medium Card (research projects) ────────────────────────────────────── */
function MediumCard({ project }: { project: Project }) {
  return (
    <article
      className="rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 group h-full"
      style={{
        backgroundColor: "var(--color-surface-raised)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 4px 12px hsl(var(--shadow-color) / 0.07)",
      }}
    >
      {/* Thumbnail */}
      <Thumbnail project={project} className="h-44">
        {/* Hover overlay with GitHub link */}
        {project.url && (
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            style={{ backgroundColor: "hsl(25 25% 6% / 0.6)" }}
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{
                backgroundColor: "hsl(30 60% 97% / 0.12)",
                backdropFilter: "blur(4px)",
                border: "1px solid hsl(30 60% 97% / 0.22)",
              }}
              data-umami-event="portfolio-item-click"
            >
              <Github size={14} />
              View on GitHub
            </a>
          </div>
        )}
      </Thumbnail>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-primary)" }}
          >
            {project.group}
          </span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="transition-opacity duration-150 hover:opacity-70"
              style={{ color: "var(--color-text-subtle)" }}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        <h3
          className="text-lg font-semibold mb-2"
          style={{
            color: "var(--color-text)",
            fontFamily: "var(--font-display)",
          }}
        >
          {project.title}
        </h3>

        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "var(--color-text-muted)" }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md"
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text-subtle)",
                border: "1px solid var(--color-border)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ── Compact Card (coursework / smaller projects) ───────────────────────── */
function CompactCard({ project }: { project: Project }) {
  return (
    <article
      className="rounded-xl p-5 flex flex-col transition-all duration-300 hover:-translate-y-1 group h-full"
      style={{
        backgroundColor: "var(--color-surface-raised)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span
          className="text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-primary)" }}
        >
          {project.group}
        </span>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="transition-all duration-150 hover:opacity-70 opacity-0 group-hover:opacity-100"
            style={{ color: "var(--color-text-subtle)" }}
            data-umami-event="portfolio-item-click"
          >
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>

      <h3
        className="text-base font-semibold mb-2"
        style={{
          color: "var(--color-text)",
          fontFamily: "var(--font-display)",
        }}
      >
        {project.title}
      </h3>

      <p
        className="text-xs leading-relaxed flex-1"
        style={{ color: "var(--color-text-muted)" }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 rounded"
            style={{
              backgroundColor: "var(--color-surface)",
              color: "var(--color-text-subtle)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

/* ── Main Section ───────────────────────────────────────────────────────── */
export function Work() {
  const mediumProjects = projects.filter((p) => p.size === "medium");
  const smallProjects = projects.filter((p) => p.size === "small");

  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: containerRef, isVisible: containerVisible } = useScrollReveal(0.03);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`mb-10 reveal${headerVisible ? " is-visible" : ""}`}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--color-primary)" }}
          >
            Portfolio
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              id="work-heading"
              className="text-3xl lg:text-4xl font-bold leading-tight"
              style={{
                color: "var(--color-text)",
                fontFamily: "var(--font-display)",
              }}
            >
              Built, Not Assembled
            </h2>
            <p
              className="text-sm max-w-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              From NASA data pipelines to UAV computer vision — everything I ship is custom code.
            </p>
          </div>
        </div>

        {/* Portfolio container — theme-aware */}
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className={`rounded-2xl p-4 sm:p-6 lg:p-8 reveal${containerVisible ? " is-visible" : ""}`}
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 20px 40px hsl(var(--shadow-color) / 0.10)",
          }}
        >
          {/* Row 1: Medium cards — asymmetric 3/2 split */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
            <div className="md:col-span-3">
              <MediumCard project={mediumProjects[0]} />
            </div>
            <div className="md:col-span-2">
              <MediumCard project={mediumProjects[1]} />
            </div>
          </div>

          {/* Row 2: Last medium card (2/5) + compact cards (each ~1/5) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <MediumCard project={mediumProjects[2]} />
            </div>
            {smallProjects.map((project) => (
              <div key={project.id} className="md:col-span-1">
                <CompactCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
