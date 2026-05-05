import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";

interface NavbarProps {
  dark: boolean;
  onToggleDark: () => void;
}

type NavLink = {
  label: string;
  href: string;
  isRoute?: boolean;
  isNew?: boolean;
};

const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Resume", href: "#resume" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ dark, onToggleDark }: NavbarProps) {
  const [scrolledState, setScrolledState] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onShowroom = location.pathname !== "/";

  // Non-home routes have no dark hero — force "scrolled" styling so text uses
  // the theme text color instead of the cream-over-espresso treatment.
  const scrolled = scrolledState || onShowroom;

  useEffect(() => {
    const handleScroll = () => setScrolledState(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background-color var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--color-background) 85%, transparent)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid var(--color-border)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
      role="banner"
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Wordmark — cream over dark hero, switches to theme text color once scrolled */}
        <Link
          to="/"
          className="font-display font-semibold text-xl tracking-tight transition-all duration-base ease-out hover:opacity-80"
          style={{
            color: scrolled ? "var(--color-text)" : "var(--color-on-dark)",
          }}
        >
          Marc Cruz
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = link.isRoute && location.pathname === link.href;
            const baseColor = isActive
              ? "var(--color-accent)"
              : scrolled
                ? "var(--color-text-muted)"
                : "color-mix(in srgb, var(--color-on-dark) 75%, transparent)";
            const hoverColor = isActive
              ? "var(--color-accent)"
              : scrolled
                ? "var(--color-text)"
                : "var(--color-on-dark)";

            const linkContent = (
              <span className="inline-flex items-center gap-1.5">
                {link.label}
                {link.isNew && (
                  <span
                    className="px-1 py-px rounded text-[9px] font-bold uppercase tracking-wider leading-none"
                    style={{ backgroundColor: "var(--color-accent)", color: "var(--color-accent-ink)" }}
                  >
                    New
                  </span>
                )}
              </span>
            );

            if (link.isRoute) {
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium transition-all duration-300"
                  style={{ color: baseColor }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = baseColor)}
                >
                  {linkContent}
                </Link>
              );
            }

            // Hash links: if not on home page, use React Router navigate so
            // ScrollToHash can scroll to the section after the page mounts
            return (
              <a
                key={link.href}
                href={onShowroom ? `/${link.href}` : link.href}
                className="text-sm font-medium transition-all duration-300"
                style={{ color: baseColor }}
                onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = baseColor)}
                onClick={onShowroom ? (e) => {
                  e.preventDefault();
                  navigate(`/${link.href}`);
                } : undefined}
              >
                {linkContent}
              </a>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleDark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-lg transition-all duration-fast ease-out hover:scale-110 active:scale-95"
            style={{ color: scrolled ? "var(--color-text-muted)" : "color-mix(in srgb, var(--color-on-dark) 75%, transparent)" }}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href={onShowroom ? "/#contact" : "#contact"}
            onClick={onShowroom ? (e) => {
              e.preventDefault();
              navigate("/#contact");
            } : undefined}
            className="btn-terracotta hidden md:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold"
            data-umami-event="cta-nav-click"
          >
            Get In Touch
          </a>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="md:hidden p-2 rounded-lg transition-all duration-fast ease-out"
            style={{ color: scrolled ? "var(--color-text-muted)" : "color-mix(in srgb, var(--color-on-dark) 75%, transparent)" }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-4 space-y-1"
          style={{
            backgroundColor: "var(--color-background)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          {navLinks.map((link) => {
            const inner = (
              <span className="inline-flex items-center gap-1.5">
                {link.label}
                {link.isNew && (
                  <span
                    className="px-1 py-px rounded text-[9px] font-bold uppercase tracking-wider leading-none"
                    style={{ backgroundColor: "var(--color-accent)", color: "var(--color-accent-ink)" }}
                  >
                    New
                  </span>
                )}
              </span>
            );

            if (link.isRoute) {
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150"
                  style={{ color: "var(--color-text-muted)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-text)";
                    e.currentTarget.style.backgroundColor = "var(--color-surface)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text-muted)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {inner}
                </Link>
              );
            }

            return (
              <a
                key={link.href}
                href={onShowroom ? `/${link.href}` : link.href}
                onClick={onShowroom ? (e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  navigate(`/${link.href}`);
                } : () => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150"
                style={{ color: "var(--color-text-muted)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-text)";
                  e.currentTarget.style.backgroundColor = "var(--color-surface)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text-muted)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {inner}
              </a>
            );
          })}
          <a
            href={onShowroom ? "/#contact" : "#contact"}
            onClick={onShowroom ? (e) => {
              e.preventDefault();
              setMobileOpen(false);
              navigate("/#contact");
            } : () => setMobileOpen(false)}
            className="btn-terracotta block w-full text-center px-4 py-3 rounded-lg text-sm font-semibold mt-2"
          >
            Get In Touch
          </a>
        </div>
      )}
    </header>
  );
}
