export default function About() {
  return (
    <section className="border border-border rounded-lg bg-card shadow-soft p-6 space-y-4">
      <h1 className="text-3xl font-bold">About me</h1>
      <p>
        I’m a software engineer who enjoys building data-intensive systems and clear APIs.
        I’ve worked on research software, ML pipelines, and full-stack projects.
      </p>
      <p className="text-muted-foreground">
        I like teams that care about quality, documentation, and thoughtful design.
        Outside of work I tinker with Raspberry Pi, NAS setups, and small automation projects.
      </p>
      <div>
        <h2 className="text-xl font-semibold">Skills</h2>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Languages: Python, Rust, TypeScript, SQL, C++</li>
          <li>Data & ML: Pandas, PyTorch, ONNX, Airflow</li>
          <li>Infra: Docker, GitHub Actions, Linux</li>
        </ul>
      </div>
    </section>
  )
}
