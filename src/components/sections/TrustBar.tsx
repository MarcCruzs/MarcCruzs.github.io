import { Code2, MapPin, Rocket, GraduationCap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const items = [
  { icon: Code2, label: "Full-Stack Engineer" },
  { icon: Rocket, label: "NASA R&D · ML Research" },
  { icon: GraduationCap, label: "B.S. Computer Science · Cal Poly Pomona" },
  { icon: MapPin, label: "Orange County · Open to Remote" },
];

export function TrustBar() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      aria-label="Credentials"
      style={{
        backgroundColor: "var(--color-background)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        ref={ref}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10">
          {items.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className={`flex items-center gap-2 text-sm font-medium reveal${isVisible ? " is-visible" : ""}`}
              style={{
                color: "var(--color-text-muted)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <Icon
                size={16}
                aria-hidden="true"
                style={{ color: "var(--color-primary)", flexShrink: 0 }}
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
