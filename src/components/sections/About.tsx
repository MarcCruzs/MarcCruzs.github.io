import { useScrollReveal } from "@/hooks/useScrollReveal";

const techStack = [
  "Python", "TypeScript", "React", "PyTorch",
  "TensorFlow", "CUDA C", "Node.js", "Apache Airflow",
  "PostgreSQL", "REST APIs", "Docker", "Linux / HPC",
];

export function About() {
  const { ref: textRef, isVisible: textVisible } = useScrollReveal();
  const { ref: imgRef, isVisible: imgVisible } = useScrollReveal();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div
            ref={textRef}
            className={`reveal-left${textVisible ? " is-visible" : ""}`}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--color-primary)" }}
            >
              About Marc
            </p>
            <h2
              id="about-heading"
              className="text-step-5 font-bold leading-tight mb-6"
              style={{
                color: "var(--color-text)",
                fontFamily: "var(--font-display)",
              }}
            >
              Engineer With{" "}
              <span style={{ color: "var(--color-primary)" }}>
                Range.
              </span>
            </h2>

            <div className="space-y-4 mb-8">
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                I'm a full-stack engineer who's worked across the stack:
                production data pipelines at NASA Ames, ML research on UAVs
                and precision agriculture, GPU programming on HPC clusters,
                and modern TypeScript front-ends.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                What I bring isn't just one stack. It's the ability to learn
                a system fast, ship something that works, and keep iterating.
                I've led a team under competition deadlines and shipped this
                site end to end.
              </p>
            </div>

            {/* Tech stack badges */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--color-text-subtle)" }}
              >
                Core Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm px-3 py-1.5 rounded-lg font-medium transition-all duration-150 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      color: "var(--color-text-muted)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Photo / visual */}
          <div
            ref={imgRef}
            className={`relative flex justify-center reveal-right${imgVisible ? " is-visible" : ""}`}
          >
            {/* Photo placeholder — swap src for real photo when available */}
            <div
              className="w-80 h-96 rounded-2xl overflow-hidden relative"
              style={{
                border: "1px solid var(--color-border)",
                boxShadow: "0 20px 25px hsl(var(--shadow-color) / 0.12)",
              }}
            >
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/marc-portrait-320w.webp 320w, /images/marc-portrait-640w.webp 640w, /images/marc-portrait-960w.webp 960w"
                  sizes="(min-width: 1024px) 320px, 80vw"
                />
                <img
                  src="/images/marc-portrait-640w.jpg"
                  srcSet="/images/marc-portrait-320w.jpg 320w, /images/marc-portrait-640w.jpg 640w, /images/marc-portrait-960w.jpg 960w"
                  sizes="(min-width: 1024px) 320px, 80vw"
                  alt="Marc Cruz, full-stack software engineer"
                  width={320}
                  height={384}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
