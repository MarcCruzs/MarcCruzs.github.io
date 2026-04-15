const enterUp = (delay: number): React.CSSProperties => ({
  animation: `hero-up 0.7s var(--ease-out) ${delay}ms both`,
});

const enterFade = (delay: number): React.CSSProperties => ({
  animation: `hero-fade 0.8s var(--ease-out) ${delay}ms both`,
});

export function Hero() {
  return (
    <section
      id="hero"
      className="hero-espresso relative min-h-screen flex items-center justify-center pt-24 sm:pt-20 pb-12"
      aria-labelledby="hero-heading"
    >
      {/* Warm mustard grid overlay */}
      <div aria-hidden="true" className="hero-grid-overlay" />

      {/* Decorative mid-century arch — terracotta, top-right */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[520px] max-h-[520px] opacity-[0.12] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom left, var(--color-primary) 0%, var(--color-primary) 60%, transparent 62%)",
          borderBottomLeftRadius: "100%",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Overline pill */}
        <div className="flex justify-center mb-8" style={enterFade(100)}>
          <span
            className="glass-warm-ink inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-accent"
          >
            Web Design · SEO · AI
          </span>
        </div>

        {/* H1 — display serif, balanced */}
        <h1
          id="hero-heading"
          className="font-display font-semibold leading-[1.05] tracking-tight mb-6"
          style={{
            color: "var(--color-on-dark)",
            fontSize: "var(--step-6)",
            textWrap: "balance",
            ...enterUp(200),
          }}
        >
          Websites That{" "}
          <span className="italic" style={{ color: "var(--color-accent)" }}>
            Get You Found
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="font-body max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{
            fontSize: "var(--step-1)",
            color: "color-mix(in srgb, var(--color-on-dark) 82%, transparent)",
            ...enterUp(350),
          }}
        >
          Custom-built sites with SEO, analytics &amp; AI — designed for small
          businesses in Orange County and across the US.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={enterUp(480)}
        >
          <a
            href="#contact"
            className="btn-terracotta inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold"
            data-umami-event="cta-hero-click"
          >
            Start Your Project
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold transition-all duration-fast ease-out active:scale-[0.97]"
            style={{
              border: "1px solid color-mix(in srgb, var(--color-on-dark) 28%, transparent)",
              color: "color-mix(in srgb, var(--color-on-dark) 88%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--color-on-dark) 6%, transparent)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--color-on-dark) 12%, transparent)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--color-on-dark) 6%, transparent)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            data-umami-event="cta-work-click"
          >
            See My Work
          </a>
        </div>

        {/* Meta proof */}
        <p
          className="mt-10 text-sm"
          style={{
            color: "color-mix(in srgb, var(--color-on-dark) 55%, transparent)",
            ...enterFade(700),
          }}
        >
          The site you're looking at is my proof of work — judge the craft by what's in front of you.
        </p>
      </div>
    </section>
  );
}
