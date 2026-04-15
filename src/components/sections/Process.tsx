import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "You share your goals, audience, and what you have. I ask the right questions to understand what success looks like.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "I build a mockup tailored to your brand. No templates — every layout decision is made for your specific business.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Full-stack development with SEO, analytics, and any AI features baked in from the start.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "I deploy, test, and hand you the keys — with documentation on how to manage your new site.",
  },
];

export function Process() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollReveal(0.08);

  return (
    <section
      aria-labelledby="process-heading"
      className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 reveal${headerVisible ? " is-visible" : ""}`}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--color-primary)" }}
          >
            How I Work
          </p>
          <h2
            id="process-heading"
            className="text-3xl lg:text-4xl font-bold leading-tight"
            style={{
              color: "var(--color-text)",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
            }}
          >
            A Process Built for Clarity
          </h2>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 relative"
        >
          {/* Animated connector line */}
          <div
            className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px overflow-hidden"
            aria-hidden="true"
          >
            <div
              style={{
                height: "100%",
                borderTop: "2px dashed var(--color-border)",
                transform: stepsVisible ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 200ms",
              }}
            />
          </div>

          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative flex flex-col items-center text-center md:px-4 reveal${stepsVisible ? " is-visible" : ""}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Number circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold mb-6 relative z-10 transition-all duration-300"
                style={{
                  backgroundColor: i === 0 ? "var(--color-primary)" : "var(--color-surface-raised)",
                  color: i === 0 ? "white" : "var(--color-text-muted)",
                  border: i === 0 ? "none" : "2px solid var(--color-border)",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.12)";
                  if (i !== 0) e.currentTarget.style.borderColor = "var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  if (i !== 0) e.currentTarget.style.borderColor = "var(--color-border)";
                }}
              >
                {step.number}
              </div>

              <h3
                className="text-lg font-semibold mb-3"
                style={{
                  color: "var(--color-text)",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                }}
              >
                {step.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
