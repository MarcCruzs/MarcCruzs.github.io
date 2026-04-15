import { Linkedin, Github, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Showroom", href: "/showroom", isRoute: true },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const location = useLocation();
  const onShowroom = location.pathname === "/showroom";

  return (
    <footer
      style={{
        backgroundColor: "var(--color-surface-dark)",
        color: "color-mix(in srgb, var(--color-on-dark) 62%, transparent)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Col 1: Wordmark */}
          <div>
            <p
              className="font-display font-semibold text-2xl mb-2"
              style={{ color: "var(--color-on-dark)" }}
            >
              Marc Cruz
            </p>
            <p className="text-sm leading-relaxed">
              Websites. SEO. AI.
            </p>
            <p className="text-sm mt-1">Orange County, CA · US-wide</p>
          </div>

          {/* Col 2: Nav links */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "color-mix(in srgb, var(--color-on-dark) 42%, transparent)" }}
            >
              Navigation
            </p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {navLinks.map((link) => {
                  const href = !link.isRoute && onShowroom ? `/${link.href}` : link.href;
                  if (link.isRoute) {
                    return (
                      <li key={link.href}>
                        <Link
                          to={link.href}
                          className="text-sm transition-colors duration-fast ease-out"
                          style={{ color: "color-mix(in srgb, var(--color-on-dark) 62%, transparent)" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "var(--color-accent)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "color-mix(in srgb, var(--color-on-dark) 62%, transparent)")
                          }
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={link.href}>
                      <a
                        href={href}
                        className="text-sm transition-colors duration-fast ease-out"
                        style={{ color: "color-mix(in srgb, var(--color-on-dark) 62%, transparent)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--color-accent)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "color-mix(in srgb, var(--color-on-dark) 62%, transparent)")
                        }
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Col 3: Contact */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "color-mix(in srgb, var(--color-on-dark) 42%, transparent)" }}
            >
              Get in Touch
            </p>
            <a
              href="mailto:marc.cruz.office@gmail.com"
              className="flex items-center gap-2 text-sm mb-3 transition-colors duration-fast ease-out"
              style={{ color: "color-mix(in srgb, var(--color-on-dark) 62%, transparent)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "color-mix(in srgb, var(--color-on-dark) 62%, transparent)")
              }
              data-umami-event="email-tap"
            >
              <Mail size={14} />
              marc.cruz.office@gmail.com
            </a>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/marc-cruz13/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="transition-all duration-fast ease-out hover:scale-110 hover:opacity-90"
                style={{ color: "color-mix(in srgb, var(--color-on-dark) 62%, transparent)" }}
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/MarcCruzs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="transition-all duration-fast ease-out hover:scale-110 hover:opacity-90"
                style={{ color: "color-mix(in srgb, var(--color-on-dark) 62%, transparent)" }}
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{
            borderTop: "1px solid color-mix(in srgb, var(--color-on-dark) 12%, transparent)",
            color: "color-mix(in srgb, var(--color-on-dark) 38%, transparent)",
          }}
        >
          <span>© 2026 Marc Cruz</span>
          <span>Built by Marc Cruz</span>
        </div>
      </div>
    </footer>
  );
}
