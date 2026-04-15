import { useScrollReveal } from "@/hooks/useScrollReveal";

const techStack = [
  "React", "TypeScript", "Python", "Node.js",
  "SEO", "Analytics", "AI / LLM", "PostgreSQL",
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
            ref={textRef as React.RefObject<HTMLDivElement>}
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
              className="text-3xl lg:text-4xl font-bold leading-tight mb-6"
              style={{
                color: "var(--color-text)",
                fontFamily: "var(--font-display)",
              }}
            >
              Technical Chops.{" "}
              <span style={{ color: "var(--color-primary)" }}>
                Creative Instincts.
              </span>
            </h2>

            <div className="space-y-4 mb-8">
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                I'm a full-stack developer based in Orange County, working with
                clients across the US. I understand the visual, emotional, and
                narrative needs of creative businesses — and I build sites that
                reflect that.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                I don't outsource. I don't use account managers. When you hire
                me, you get me — start to finish. Outside of code, I've spent
                years in the performing arts, which keeps my eye sharp for
                composition and rhythm.
              </p>
            </div>

            {/* Tech stack badges */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--color-text-subtle)" }}
              >
                Technologies
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
            ref={imgRef as React.RefObject<HTMLDivElement>}
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
              <img
                src="/images/marc-portrait.jpg"
                alt="Marc Cruz, web developer based in Orange County"
                width={320}
                height={384}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
