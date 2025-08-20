import { Link, NavLink } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Navbar() {
  const base = "px-3 py-2 rounded-md text-sm font-medium hover:bg-card transition"
  const active = "bg-card"
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur">
      <div className="container-w flex items-center justify-between py-3">
        <Link to="/" className="font-bold">Marc Cruz</Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={({isActive}) => base + (isActive ? ' ' + active : '')}>Home</NavLink>
          <NavLink to="/about" className={({isActive}) => base + (isActive ? ' ' + active : '')}>About Me</NavLink>
          <NavLink to="/projects" className={({isActive}) => base + (isActive ? ' ' + active : '')}>Projects</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <a className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/70 hover:bg-card" href="https://github.com/your-username" target="_blank" rel="noopener" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/70 hover:bg-card" href="https://www.linkedin.com/in/your-handle" target="_blank" rel="noopener" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/70 hover:bg-card" href="mailto:your@email.com" aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      <details className="md:hidden border-t border-border/60">
        <summary className="container-w py-2 cursor-pointer">Menu</summary>
        <div className="container-w pb-3 flex flex-col gap-1">
          <NavLink to="/" end className={({isActive}) => base + (isActive ? ' ' + active : '')}>Home</NavLink>
          <NavLink to="/about" className={({isActive}) => base + (isActive ? ' ' + active : '')}>About Me</NavLink>
          <NavLink to="/projects" className={({isActive}) => base + (isActive ? ' ' + active : '')}>Projects</NavLink>
        </div>
      </details>
    </header>
  )
}
