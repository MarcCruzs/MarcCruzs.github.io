import { HashLink } from "react-router-hash-link";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ThemeCycleButton } from "./ThemeToggleButton";

export default function Navbar() {
  const base =
    "px-3 py-2 rounded-md text-sm font-medium hover:bg-card transition";
  const mobile_base =
    "px-3 py-2 rounded-md text-sm font-medium hover:bg-card transition flex justify-end";
  const active =
    "bg-card text-[hsl(var(--primary))] border border-[hsl(var(--border))]";

  const navigate = useNavigate();
  const location = useLocation();

  const closeMobileMenu = () => {
    const menu = document.getElementById("mobile-menu");
    if (menu) menu.removeAttribute("open");
  };

  const handleContactClick = () => {
    const go = () => {
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(go, 400);
    } else {
      go();
    }

    const menu = document.getElementById("mobile-menu");
    if (menu) menu.removeAttribute("open");
  };
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur">
      <div className="container-w flex items-center justify-between py-3">
        <Link to="/" 
        className="text-2xl font-bold"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          &lt;MarC&gt;
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Page links (keep NavLink) */}
          <NavLink
            to="/"
            end
            className={({ isActive }) => base + (isActive ? " " + active : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) => base + (isActive ? " " + active : "")}
          >
            Projects
          </NavLink>

          <NavLink
            className={base}
            onClick={handleContactClick} to={""}          
          >
            Contact
          </NavLink>

        </nav>

        <div className="flex items-center gap-2">
          <ThemeCycleButton />
        </div>
      </div>

      {/* Mobile nav */}
      <details id="mobile-menu" className="md:hidden border-t border-border/60">
        <summary className="container-w py-2 cursor-pointer text-right">
          Menu
        </summary>
        <div className="container-w pb-3 flex flex-col gap-1">
          <NavLink
            to="/"
            end
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              mobile_base + (isActive ? " " + active : "")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              mobile_base + (isActive ? " " + active : "")
            }
          >
            Projects
          </NavLink>

          <button
            type="button"
            className={mobile_base}
            onClick={handleContactClick}
          >
            Contact
          </button>
        </div>
      </details>
    </header>
  );
}
