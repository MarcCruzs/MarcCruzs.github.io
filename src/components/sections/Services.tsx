import { Check, X, Minus } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type CellValue = "yes" | "no" | "partial" | string;

function CellIcon({ value }: { value: CellValue }) {
  if (value === "yes") return <Check size={16} style={{ color: "var(--color-primary)" }} />;
  if (value === "no") return <X size={16} style={{ color: "var(--color-danger)" }} />;
  if (value === "partial") return <Minus size={16} style={{ color: "var(--color-warn)" }} />;
  // Text label (e.g. "Add-on $$", "Depends")
  return (
    <span className="text-xs font-medium" style={{ color: "var(--color-text-subtle)" }}>
      {value}
    </span>
  );
}

function ComparisonRow({ feature, values }: { feature: string; values: [CellValue, CellValue, CellValue] }) {
  return (
    <>
      <div
        className="px-5 py-4 text-sm"
        style={{
          color: "var(--color-text-muted)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {feature}
      </div>
      {values.map((val, i) => (
        <div
          key={`${feature}-${i}`}
          className="px-5 py-4 flex justify-center items-center"
          style={{
            borderBottom: "1px solid var(--color-border)",
            borderLeft: "1px solid var(--color-border)",
            ...(i === 2 ? { backgroundColor: "color-mix(in srgb, var(--color-primary) 4%, transparent)" } : {}),
          }}
        >
          <CellIcon value={val} />
        </div>
      ))}
    </>
  );
}

const services = [
  {
    name: "Launch",
    badge: "Most Popular",
    featured: false,
    idealFor: "New businesses replacing a DIY site",
    description: "A professional site that loads fast, looks sharp, and actually gets found on Google.",
    includes: [
      "5-page custom design",
      "Mobile-first, responsive",
      "Contact form with email routing",
      "On-page SEO basics",
      "Fast hosting on Cloudflare Pages",
    ],
    cta: "Start Your Project",
  },
  {
    name: "Professional",
    badge: "Best Value",
    featured: true,
    idealFor: "Growing businesses ready to track & convert",
    description: "Everything in Launch plus the analytics and SEO engine that turns visitors into leads.",
    includes: [
      "Everything in Launch",
      "Advanced SEO & keyword strategy",
      "Analytics dashboard (Umami)",
      "Session recordings (Clarity)",
      "CMS for easy content updates",
    ],
    cta: "Let's Talk Strategy",
  },
  {
    name: "Full Stack",
    badge: "Premium",
    featured: false,
    idealFor: "Businesses that need custom automation",
    description: "Everything in Professional plus AI features and integrations tailored to your workflow.",
    includes: [
      "Everything in Professional",
      "AI chatbot or lead qualifier",
      "Custom analytics & reporting",
      "API integrations",
      "Ongoing support retainer",
    ],
    cta: "Book a Consultation",
  },
];

const comparison: { feature: string; diy: CellValue; agency: CellValue; marc: CellValue }[] = [
  { feature: "Custom design", diy: "partial", agency: "yes", marc: "yes" },
  { feature: "SEO that actually ranks", diy: "partial", agency: "yes", marc: "yes" },
  { feature: "Analytics & session replay", diy: "no", agency: "Add-on $$", marc: "yes" },
  { feature: "AI features (chatbot, lead qualifier)", diy: "no", agency: "Premium tier", marc: "yes" },
  { feature: "You own the code", diy: "no", agency: "Depends", marc: "yes" },
  { feature: "Direct access to your developer", diy: "no", agency: "no", marc: "yes" },
  { feature: "Transparent flat-rate pricing", diy: "yes", agency: "no", marc: "yes" },
];

export function Services() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal(0.05);
  const { ref: tableRef, isVisible: tableVisible } = useScrollReveal(0.05);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 reveal${headerVisible ? " is-visible" : ""}`}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--color-primary)" }}
          >
            Services
          </p>
          <h2
            id="services-heading"
            className="text-3xl lg:text-4xl font-bold leading-tight mb-4"
            style={{
              color: "var(--color-text)",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
            }}
          >
            What I Build
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "var(--color-text-muted)" }}
          >
            Every project is scoped to your goals. No templates. No account
            managers. Just clean, effective code.
          </p>
        </div>

        {/* Service cards */}
        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {services.map((svc, i) => (
            <div
              key={svc.name}
              className={`rounded-xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 reveal-scale${cardsVisible ? " is-visible" : ""}`}
              style={{
                transitionDelay: `${i * 100}ms`,
                backgroundColor: "var(--color-surface-raised)",
                border: svc.featured
                  ? "1px solid var(--color-primary)"
                  : "1px solid var(--color-border)",
                boxShadow: svc.featured
                  ? "0 0 0 1px var(--color-primary), 0 10px 15px hsl(var(--shadow-color) / 0.10)"
                  : "0 4px 6px hsl(var(--shadow-color) / 0.07)",
                borderTop: `4px solid ${svc.featured ? "var(--color-primary)" : "var(--color-border)"}`,
              }}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-xl font-semibold"
                  style={{
                    color: "var(--color-text)",
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                  }}
                >
                  {svc.name}
                </h3>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={
                    svc.featured
                      ? {
                          backgroundColor: "var(--color-primary)",
                          color: "white",
                        }
                      : {
                          backgroundColor: "var(--color-surface)",
                          color: "var(--color-text-muted)",
                          border: "1px solid var(--color-border)",
                        }
                  }
                >
                  {svc.badge}
                </span>
              </div>

              <p
                className="text-[11px] font-medium uppercase tracking-wide mb-2"
                style={{ color: "var(--color-primary)", opacity: 0.8 }}
              >
                {svc.idealFor}
              </p>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--color-text-muted)" }}
              >
                {svc.description}
              </p>

              <ul className="space-y-3 flex-1 mb-8">
                {svc.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <Check
                      size={15}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: "var(--color-primary)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="block text-center py-3 rounded-lg text-sm font-semibold transition-all duration-150 active:scale-[0.98]"
                style={
                  svc.featured
                    ? {
                        backgroundColor: "var(--color-primary)",
                        color: "white",
                      }
                    : {
                        border: "1px solid var(--color-primary)",
                        color: "var(--color-primary)",
                        backgroundColor: "transparent",
                      }
                }
                onMouseEnter={(e) => {
                  if (svc.featured) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-primary-dark)";
                  } else {
                    e.currentTarget.style.backgroundColor =
                      "color-mix(in srgb, var(--color-primary) 8%, transparent)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (svc.featured) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-primary)";
                  } else {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
                data-umami-event="cta-services-click"
              >
                {svc.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Multi-alternative comparison */}
        <div
          ref={tableRef as React.RefObject<HTMLDivElement>}
          className={`rounded-2xl overflow-hidden reveal${tableVisible ? " is-visible" : ""}`}
          style={{
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface-raised)",
          }}
        >
          <div
            className="px-8 py-6"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            <h3
              className="text-xl font-semibold mb-1"
              style={{
                color: "var(--color-text)",
                fontFamily: '"Plus Jakarta Sans", sans-serif',
              }}
            >
              How the options actually compare
            </h3>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              An honest look — every option has trade-offs.
            </p>
          </div>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-4 min-w-[540px]">
              {/* Headers */}
              <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--color-border)" }}>
                <span className="text-sm font-semibold" style={{ color: "var(--color-text-subtle)" }}>Feature</span>
              </div>
              <div
                className="px-5 py-4 text-center"
                style={{ borderBottom: "1px solid var(--color-border)", borderLeft: "1px solid var(--color-border)" }}
              >
                <span className="text-sm font-semibold" style={{ color: "var(--color-text-muted)" }}>DIY Builders</span>
                <span className="block text-[10px] mt-0.5" style={{ color: "var(--color-text-subtle)" }}>Wix, Squarespace</span>
              </div>
              <div
                className="px-5 py-4 text-center"
                style={{ borderBottom: "1px solid var(--color-border)", borderLeft: "1px solid var(--color-border)" }}
              >
                <span className="text-sm font-semibold" style={{ color: "var(--color-text-muted)" }}>Agencies</span>
                <span className="block text-[10px] mt-0.5" style={{ color: "var(--color-text-subtle)" }}>$5k–$25k+</span>
              </div>
              <div
                className="px-5 py-4 text-center"
                style={{
                  borderBottom: "1px solid var(--color-border)",
                  borderLeft: "1px solid var(--color-border)",
                  backgroundColor: "color-mix(in srgb, var(--color-primary) 5%, transparent)",
                }}
              >
                <span className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>Marc Cruz</span>
              </div>

              {/* Rows */}
              {comparison.map(({ feature, diy, agency, marc }) => (
                <ComparisonRow key={feature} feature={feature} values={[diy, agency, marc]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
