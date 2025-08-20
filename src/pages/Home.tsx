import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="grid md:grid-cols-2 gap-4 items-center">
      <div className="border border-border rounded-lg bg-card shadow-soft p-6">
        <h1 className="text-3xl font-bold mb-2">Hello, I'm Marc.</h1>
        <p className="text-muted-foreground mb-4">
          Backend & data engineer with applied ML experience. I build clean systems that ship.
        </p>
        <div className="flex gap-2 flex-wrap">
          <a className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-primary text-primary-foreground border border-border shadow-soft" href="/assets/Marc_Cruz_Resume.pdf" download>
            <span>Download Resume</span>
          </a>
          <Link to="/projects" className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-border hover:bg-muted">
            <span>See Projects</span>
          </Link>
        </div>
      </div>
      <div className="border border-border rounded-lg bg-card shadow-soft p-2">
        <img
          alt="Abstract developer desk"
          className="rounded-md border border-border w-full"
          src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop"
        />
      </div>
    </section>
  )
}
