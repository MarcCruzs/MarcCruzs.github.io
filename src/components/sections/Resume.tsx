import { lazy, Suspense } from "react";
import { Briefcase, GraduationCap, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const SkillsGraph = lazy(() =>
  import("@/components/skills-graph").then((m) => ({ default: m.SkillsGraph })),
);

const RESUME_URL =
  "https://docs.google.com/document/d/1v0CnThSdvPtlZdpv-VHKAyzF9BMCvYfGqxP7-imTgjE/edit?usp=sharing";

interface ResumeEntry {
  kind: "role" | "education";
  title: string;
  org: string;
  period: string;
  location?: string;
  bullets: string[];
  tags: string[];
}

const entries: ResumeEntry[] = [
  {
    kind: "role",
    title: "Software Engineer (Independent)",
    org: "Marc Cruz Studio",
    period: "2025 — Present",
    location: "Orange County, CA",
    bullets: [
      "Designed and built this site end-to-end: React 18 + TypeScript + Tailwind, Vite tooling, accessibility widget, dark mode, custom design system.",
      "Deliver custom websites and AI integrations for small businesses, owning scope, design, build, and deploy.",
      "Ship to Cloudflare Pages with edge headers, image optimization, and analytics wired in for every client engagement.",
    ],
    tags: ["React", "TypeScript", "Tailwind", "Vite", "Cloudflare"],
  },
  {
    kind: "role",
    title: "Software Engineer",
    org: "NASA Ames Research Center · Crown Innovations Inc. (NAMS-2 Contract)",
    period: "Dec 2024 — Jul 2025",
    location: "Mountain View, CA",
    bullets: [
      "Designed modular, scalable Python libraries to streamline air traffic management R&D workflows for NASA's NAMS-2 research initiatives.",
      "Built reusable backend components automating experiment setup, simulation data parsing, and results processing across multiple airspace system models.",
      "Integrated centralized logging and monitoring throughout all software components, enabling reproducible workflows and simplifying debugging of distributed systems.",
      "Authored automated build scripts for packaging and deployment in isolated environments using Conda and Docker.",
      "Contributed to cross-team documentation and interface specifications, improving onboarding time for new engineers by 30%.",
    ],
    tags: ["Python", "Docker", "Conda", "Logging", "Distributed Systems"],
  },
  {
    kind: "role",
    title: "Sustainable Aviation Operations Intern",
    org: "NASA Ames Research Center — Contrail Prediction",
    period: "Jun 2024 — Nov 2024",
    location: "Mountain View, CA",
    bullets: [
      "Built and deployed scalable ETL pipelines retrieving and integrating atmospheric datasets from NOAA and NASA REST APIs, improving ingestion reliability and reproducibility.",
      "Automated daily ingestion and transformation of multi-source datasets (humidity, temperature, flight routes), reducing manual processing from days to hours.",
      "Refactored a legacy MATLAB workflow into a modular Python system using Pandas, Xarray, and NumPy to enable scalable, parallel data processing.",
      "Extended dataset coverage from days to over 2 years, enabling higher statistical significance for contrail validation models.",
      "Standardized environments with Ruff and Conda for linting and reproducible deployment, reducing integration and debugging time by 40%.",
    ],
    tags: ["Python", "Pandas", "Xarray", "REST APIs", "ETL"],
  },
  {
    kind: "role",
    title: "Software Lead — SUAS Competition",
    org: "Cal Poly Pomona UAV Lab",
    period: "Aug 2023 — Jun 2024",
    location: "Pomona, CA",
    bullets: [
      "Led a cross-functional team of 12 engineers building an autonomous aerial object-detection system for an international UAV competition (Lockheed Martin sponsored).",
      "Designed the full software architecture covering CV preprocessing, object recognition, and real-time telemetry using PyTorch and OpenCV.",
      "Deployed and optimized inference models on NVIDIA Jetson Orin Nano hardware to meet real-time latency under flight constraints.",
      "Authored UML class and sequence diagrams to formalize architecture and keep modules consistent across the team.",
      "Established Git branching workflows and Jira-driven agile sprints, cutting task turnaround and idle time by 20%.",
    ],
    tags: ["PyTorch", "OpenCV", "Jetson", "Jira", "Team Lead"],
  },
  {
    kind: "role",
    title: "ML Researcher — Precision Agriculture (NSF REU)",
    org: "Cal Poly Pomona — UAV Weed Detection",
    period: "2023",
    location: "Pomona, CA",
    bullets: [
      "Designed and trained YOLOv5 object detection models for autonomous weed detection in UAV imagery, improving classification precision by 15% through data augmentation and hyperparameter tuning.",
      "Managed a 9-person data labeling team using Roboflow to produce a 1,500+ image agricultural dataset with consistent labeling standards across reviewers.",
      "Built end-to-end training and evaluation pipelines in PyTorch, owning data ingestion, augmentation, model training, and metric reporting for each iteration.",
      "Validated detection performance against held-out aerial imagery to confirm the model generalized beyond the training fields.",
    ],
    tags: ["PyTorch", "OpenCV", "Roboflow", "YOLOv5", "UAV"],
  },
  {
    kind: "role",
    title: "ML Researcher — Mobility Scooter Safety (NSF REU)",
    org: "Cal Poly Pomona — Driver Behavior Classification",
    period: "2022",
    location: "Pomona, CA",
    bullets: [
      "Trained LSTM and GRU models in TensorFlow to classify temporal driving sequences from mobility scooter sensor data, achieving ~85% accuracy.",
      "Built feature extraction pipelines converting raw accelerometer, gyroscope, and GPS signals into structured training-ready features.",
      "Co-authored “Mobility Scooter User Driving Behavior Classification,” published at IEEE Big Data 2022.",
    ],
    tags: ["TensorFlow", "LSTM", "GRU", "Time-series", "IEEE"],
  },
  {
    kind: "education",
    title: "B.S. Computer Science",
    org: "California State Polytechnic University, Pomona",
    period: "2020 — May 2025",
    location: "Pomona, CA",
    bullets: [
      "Magna Cum Laude, GPA 3.75.",
      "Relevant coursework: GPU computing (CUDA C), parallel processing, data structures & algorithms, ML applications, computer networking, software engineering, OOP.",
      "Research assistant on UAV-based ML and applied data infrastructure across NSF REU and SUAS programs.",
    ],
    tags: ["CUDA C", "C++", "Algorithms", "ML"],
  },
];

export function Resume() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollReveal(0.05);
  const { ref: graphRef, isVisible: graphVisible } = useScrollReveal(0.05);

  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-12 reveal${headerVisible ? " is-visible" : ""}`}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--color-primary)" }}
          >
            Resume
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              id="resume-heading"
              className="text-step-5 font-bold leading-tight"
              style={{
                color: "var(--color-text)",
                fontFamily: "var(--font-display)",
              }}
            >
              Experience &amp; Education
            </h2>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.97] self-start"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-primary-ink)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-primary-dark)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-primary)")
              }
              data-umami-event="resume-download-click"
            >
              <ExternalLink size={14} />
              View Resume
            </a>
          </div>
        </div>

        {/* Timeline (full width) */}
        <div className="card-grid grid grid-cols-1 gap-10">
          <div
            ref={timelineRef}
            className={`space-y-6 reveal-left${timelineVisible ? " is-visible" : ""}`}
          >
            {entries.map((entry, i) => {
              const Icon = entry.kind === "role" ? Briefcase : GraduationCap;
              return (
                <article
                  key={`${entry.org}-${i}`}
                  className="card-grid__item rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "var(--color-surface-raised)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "0 4px 12px hsl(var(--shadow-color) / 0.06)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--color-primary) 12%, transparent)",
                      }}
                    >
                      <Icon
                        size={18}
                        style={{ color: "var(--color-primary)" }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                        <h3
                          className="text-lg font-semibold leading-snug"
                          style={{
                            color: "var(--color-text)",
                            fontFamily: "var(--font-display)",
                          }}
                        >
                          {entry.title}
                        </h3>
                        <span
                          className="text-xs font-medium whitespace-nowrap"
                          style={{
                            color: "var(--color-text-subtle)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {entry.period}
                        </span>
                      </div>
                      <p
                        className="text-sm font-medium mb-1"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {entry.org}
                        {entry.location && (
                          <span style={{ color: "var(--color-text-subtle)" }}>
                            {" "}
                            · {entry.location}
                          </span>
                        )}
                      </p>
                      <ul className="space-y-1.5 mt-3 mb-4">
                        {entry.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="text-sm leading-relaxed pl-4 relative"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            <span
                              aria-hidden="true"
                              className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: "var(--color-primary)" }}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] px-2 py-0.5 rounded-md"
                            style={{
                              backgroundColor: "var(--color-surface)",
                              color: "var(--color-text-subtle)",
                              border: "1px solid var(--color-border)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Skills graph — Obsidian-style associations between skills and experiences */}
          <section
            ref={graphRef}
            className={`reveal${graphVisible ? " is-visible" : ""}`}
            aria-labelledby="skills-graph-heading"
          >
            <div
              className="rounded-xl p-6"
              style={{
                backgroundColor: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5">
                <h3
                  id="skills-graph-heading"
                  className="text-base font-semibold"
                  style={{
                    color: "var(--color-text)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Skills &times; Experience
                </h3>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  How each skill traces back to where I actually used it.
                </p>
              </div>
              {graphVisible ? (
                <Suspense
                  fallback={
                    <div
                      className="rounded-lg"
                      style={{
                        height: "min(560px, 60vh)",
                        backgroundColor: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                      }}
                      aria-busy="true"
                      aria-label="Loading skills graph"
                    />
                  }
                >
                  <SkillsGraph />
                </Suspense>
              ) : (
                <div
                  className="rounded-lg"
                  style={{
                    height: "min(560px, 60vh)",
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                  aria-hidden="true"
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
