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
      <div className="hero-photo-wrap" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="
              /images/hero/hero-390w.webp 390w,
              /images/hero/hero-820w.webp 820w,
              /images/hero/hero-1440w.webp 1440w,
              /images/hero/hero-2560w.webp 2560w
            "
            sizes="100vw"
          />
          <img
            className="hero-photo"
            src="/images/hero/hero-1440w.jpg"
            srcSet="
              /images/hero/hero-390w.jpg 390w,
              /images/hero/hero-820w.jpg 820w,
              /images/hero/hero-1440w.jpg 1440w,
              /images/hero/hero-2560w.jpg 2560w
            "
            sizes="100vw"
            alt=""
            width={1440}
            height={956}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div className="hero-scrim" />
        <div className="hero-vignette" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Overline pill */}
        <div className="flex justify-center mb-8" style={enterFade(100)}>
          <span
            className="glass-warm-ink inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-accent"
          >
            Full-Stack · ML / Data · Systems
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
            textShadow: "0 2px 18px hsl(165 30% 4% / 0.55), 0 1px 2px hsl(165 30% 4% / 0.45)",
            ...enterUp(200),
          }}
        >
          Engineer Who{" "}
          <span className="italic" style={{ color: "var(--color-accent)" }}>
            Ships
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="font-body max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{
            fontSize: "var(--step-1)",
            color: "color-mix(in srgb, var(--color-on-dark) 92%, transparent)",
            textShadow: "0 1px 12px hsl(165 30% 4% / 0.55)",
            ...enterUp(350),
          }}
        >
          Full-stack engineer with NASA R&amp;D, ML research, and UAV
          competition experience. Python, TypeScript, React, PyTorch, CUDA,
          and a track record of delivering under deadline.
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
            Get In Touch
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
          className="mt-10 text-sm max-w-2xl mx-auto"
          style={{
            color: "color-mix(in srgb, var(--color-on-dark) 72%, transparent)",
            textShadow: "0 1px 8px hsl(165 30% 4% / 0.5)",
            ...enterFade(700),
          }}
        >
          This site is my proof of work, every line written from scratch. Judge the craft by what's in front of you.
        </p>
      </div>
    </section>
  );
}
