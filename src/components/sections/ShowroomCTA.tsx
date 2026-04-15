import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Sparkles } from "lucide-react";

export function ShowroomCTA() {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  return (
    <section
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent 70%)",
        }}
      />

      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className={`max-w-2xl mx-auto text-center relative z-10 reveal${isVisible ? " is-visible" : ""}`}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--color-text-subtle)" }}
        >
          Not sure what you're looking for?
        </p>

        <h2
          className="text-3xl lg:text-4xl font-bold leading-tight mb-4"
          style={{
            color: "var(--color-text)",
            fontFamily: '"Plus Jakarta Sans", sans-serif',
          }}
        >
          Walk Through the Possibilities
        </h2>

        <p
          className="text-base leading-relaxed mb-8 max-w-md mx-auto"
          style={{ color: "var(--color-text-muted)" }}
        >
          Browse five distinct website styles in our interactive showroom.
          Each one could be yours — customized to your brand.
        </p>

        <Link
          to="/showroom"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.97] group"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "white",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-primary-dark)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-primary)")
          }
        >
          <Sparkles size={16} className="transition-transform duration-200 group-hover:scale-110" />
          Enter the Showroom
          <span
            className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "hsl(38, 50%, 10%)",
              lineHeight: "1.2",
            }}
          >
            New
          </span>
        </Link>
      </div>
    </section>
  );
}
