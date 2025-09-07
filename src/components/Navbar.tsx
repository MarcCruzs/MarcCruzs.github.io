import { Link, NavLink } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'
import { ThemeCycleButton } from './ThemeToggleButton'

export default function Navbar() {
  const base = "px-3 py-2 rounded-md text-sm font-medium hover:bg-card transition"
  const active = "bg-card text-[hsl(var(--primary))] border border-[hsl(var(--border))]";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur">
      <div className="container-w flex items-center justify-between py-3">
        <Link to="/" className="text-2xl font-bold">Marc Cruz</Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={({isActive}) => base + (isActive ? ' ' + active : '')}>Home</NavLink>
          <NavLink to="/projects" className={({isActive}) => base + (isActive ? ' ' + active : '')}>Projects</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <a className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/70 hover:bg-border-[hsl(var(--border))]" 
            href="https://github.com/MarcCruzs" target="_blank" rel="noopener" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/70 hover:bg-card" href="https://www.linkedin.com/in/marc-cruz13/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/70 hover:bg-card" href="mailto:marc.cruz.office@gmail.com" aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>
          <ThemeCycleButton></ThemeCycleButton>
        </div>
      </div>

      <details className="md:hidden border-t border-border/60">
        <summary className="container-w py-2 cursor-pointer text-right">Menu</summary>
        <div className="container-w pb-3 flex flex-col gap-1">
          <NavLink to="/" end className={({isActive}) => base + (isActive ? ' ' + active : '')}>Home</NavLink>
          <NavLink to="/projects" className={({isActive}) => base + (isActive ? ' ' + active : '')}>Projects</NavLink>
        </div>
      </details>
    </header>
  )
}
