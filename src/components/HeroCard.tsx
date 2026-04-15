export function HeroCard() {
  return (
    <div className="bento-card h-full p-6 sm:p-8 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 25% 40%, rgba(59,130,246,0.3) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10">
        <h1 className="text-5xl sm:text-6xl font-black leading-none tracking-tight text-theme mb-4 uppercase">
          MARC
          <br />
          CRUZ
        </h1>
        <p className="text-base sm:text-xl font-bold text-theme leading-snug mb-4 max-w-xs">
          I build scalable backend systems and data pipelines that stay clean and dependable.
        </p>
        <p className="text-xs text-theme-muted leading-relaxed max-w-xs">
          My experience spans NASA ETL pipelines, distributed processing systems, and
          data-intensive web platforms. I focus on building systems that remain robust and
          maintainable as they grow.
        </p>
      </div>
    </div>
  );
}
