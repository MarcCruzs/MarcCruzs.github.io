export function FeaturedWorksCard() {
  return (
    <div className="bento-card h-full p-5 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-black uppercase text-theme mb-3">
        FEATURED
        <br />
        WORKS
      </h2>
      <p className="text-xs text-theme-muted leading-relaxed mb-3">
        A selection of projects that highlight my work in backend systems, data engineering, and
        software architecture. Each showcases how I approach scalability, clarity, and real-world
        problem solving.
      </p>
      <p className="text-xs text-theme-muted leading-relaxed">
        These projects represent the systems I've built across research, student organizations, and
        engineering work. From NASA data pipelines to internal tools that streamline operations and
        automate workflows.
      </p>
    </div>
  );
}
