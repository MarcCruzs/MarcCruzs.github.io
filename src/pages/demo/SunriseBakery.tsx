import { useEffect } from "react";
import { Clock, MapPin, Phone, Instagram, ArrowRight, Croissant } from "lucide-react";

/**
 * Dummy bakery prototype — used as a portal preview example.
 * Scoped theme via inline CSS vars on the root div so it looks distinct
 * from Marc's midcentury site.
 */

const bakeryTheme: React.CSSProperties = {
  // Warm peach + caramel + cream — dessert shop palette
  "--b-background":     "#FFF8EF",
  "--b-surface":        "#FBEEDB",
  "--b-surface-raised": "#FFFFFF",
  "--b-text":           "#3A2417",
  "--b-text-muted":     "#7A5A44",
  "--b-text-subtle":    "#B89E86",
  "--b-primary":        "#C96A3A",   // caramel
  "--b-primary-ink":    "#FFF8EF",
  "--b-accent":         "#E8A572",   // warm peach
  "--b-accent-ink":     "#3A2417",
  "--b-border":         "#EDD9BE",
  "--b-shadow":         "24deg 50% 25%",
} as React.CSSProperties;

const items = [
  {
    name: "Cinnamon Morning Roll",
    price: "$4.50",
    blurb: "Laminated brioche, dark brown sugar, Saigon cinnamon, hand-rolled before sunrise.",
    gradient: "linear-gradient(135deg, hsl(24, 65%, 52%) 0%, hsl(35, 80%, 68%) 100%)",
  },
  {
    name: "Country Sourdough",
    price: "$8.00",
    blurb: "48-hour cold ferment, stone-milled heritage flour, baked on hearth stone.",
    gradient: "linear-gradient(135deg, hsl(30, 55%, 42%) 0%, hsl(40, 70%, 60%) 100%)",
  },
  {
    name: "Almond Croissant",
    price: "$5.75",
    blurb: "Twice-baked with frangipane, toasted almonds, and a whisper of orange blossom.",
    gradient: "linear-gradient(135deg, hsl(38, 75%, 58%) 0%, hsl(50, 85%, 78%) 100%)",
  },
  {
    name: "Olive Oil Tea Cake",
    price: "$4.00",
    blurb: "California Mission olive oil, Meyer lemon zest, sea salt finish.",
    gradient: "linear-gradient(135deg, hsl(65, 35%, 50%) 0%, hsl(80, 45%, 70%) 100%)",
  },
];

export default function SunriseBakery() {
  useEffect(() => {
    document.title = "Sunrise Bakery · Freshly Baked Every Morning";
    return () => {
      document.title = "Marc Cruz | Web Design, SEO & AI · Orange County, CA";
    };
  }, []);

  return (
    <div
      style={{
        ...bakeryTheme,
        backgroundColor: "var(--b-background)",
        color: "var(--b-text)",
        minHeight: "100vh",
        fontFamily: '"Inter Variable", system-ui, sans-serif',
      }}
    >
      {/* Nav */}
      <header
        className="sticky top-0 z-30"
        style={{
          backgroundColor: "color-mix(in srgb, var(--b-background) 92%, transparent)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--b-border)",
        }}
      >
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span
            className="font-display font-semibold text-xl tracking-tight flex items-center gap-2"
            style={{ fontFamily: '"Fraunces Variable", Georgia, serif', color: "var(--b-text)" }}
          >
            <Croissant size={20} style={{ color: "var(--b-primary)" }} />
            Sunrise Bakery
          </span>
          <div className="hidden md:flex gap-8 text-sm font-medium" style={{ color: "var(--b-text-muted)" }}>
            <a href="#menu">Menu</a>
            <a href="#story">Our Story</a>
            <a href="#visit">Visit</a>
          </div>
          <a
            href="#order"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{
              backgroundColor: "var(--b-primary)",
              color: "var(--b-primary-ink)",
              boxShadow: "0 6px 16px hsl(var(--b-shadow) / 0.22)",
            }}
          >
            Order online
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-14 md:pb-20 grid gap-10 md:grid-cols-[1.1fr_1fr] items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--b-primary)" }}>
            Costa Mesa · Since 2018
          </p>
          <h1
            className="mt-3 text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight"
            style={{
              fontFamily: '"Fraunces Variable", Georgia, serif',
              color: "var(--b-text)",
              textWrap: "balance",
            }}
          >
            Freshly baked <span className="italic" style={{ color: "var(--b-primary)" }}>every morning</span>.
          </h1>
          <p
            className="mt-5 max-w-lg text-base md:text-lg leading-relaxed"
            style={{ color: "var(--b-text-muted)" }}
          >
            A family bakery on Newport Boulevard. Sourdough, croissants, and seasonal pastries — made from scratch with organic flour and real butter. Come early; the cinnamon rolls sell out by 10am.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--b-primary)",
                color: "var(--b-primary-ink)",
                boxShadow: "0 10px 24px hsl(var(--b-shadow) / 0.25)",
              }}
            >
              See today's menu <ArrowRight size={14} />
            </a>
            <a
              href="#visit"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{
                border: "1px solid var(--b-border)",
                color: "var(--b-text)",
                backgroundColor: "var(--b-surface-raised)",
              }}
            >
              Visit the shop
            </a>
          </div>
        </div>

        {/* Hero decorative image (gradient placeholder) */}
        <div
          className="relative h-72 md:h-96 rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(24, 70%, 55%) 0%, hsl(38, 85%, 68%) 50%, hsl(50, 90%, 82%) 100%)",
            boxShadow: "0 20px 48px hsl(var(--b-shadow) / 0.22)",
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            <Croissant size={110} strokeWidth={1.2} />
          </div>
          <div
            className="absolute bottom-5 left-5 right-5 px-4 py-3 rounded-2xl text-sm font-semibold"
            style={{
              backgroundColor: "color-mix(in srgb, var(--b-background) 85%, transparent)",
              backdropFilter: "blur(6px)",
              color: "var(--b-text)",
            }}
          >
            Today's special: <span style={{ color: "var(--b-primary)" }}>Brown butter apricot galette</span>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20" style={{ borderTop: "1px solid var(--b-border)" }}>
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--b-primary)" }}>
            Today's bake
          </p>
          <h2
            className="mt-2 text-3xl md:text-4xl font-semibold"
            style={{ fontFamily: '"Fraunces Variable", Georgia, serif', color: "var(--b-text)" }}
          >
            What's in the case
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <article
              key={it.name}
              className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "var(--b-surface-raised)",
                border: "1px solid var(--b-border)",
                boxShadow: "0 8px 20px hsl(var(--b-shadow) / 0.12)",
              }}
            >
              <div className="h-40" style={{ background: it.gradient }} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base font-semibold leading-snug" style={{ color: "var(--b-text)", fontFamily: '"Fraunces Variable", Georgia, serif' }}>
                    {it.name}
                  </h3>
                  <span className="text-sm font-bold whitespace-nowrap" style={{ color: "var(--b-primary)", fontVariantNumeric: "tabular-nums" }}>
                    {it.price}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--b-text-muted)" }}>
                  {it.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-14 md:py-20" style={{ backgroundColor: "var(--b-surface)", borderTop: "1px solid var(--b-border)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--b-primary)" }}>
            Our story
          </p>
          <h2
            className="mt-2 text-3xl md:text-4xl font-semibold"
            style={{ fontFamily: '"Fraunces Variable", Georgia, serif', color: "var(--b-text)" }}
          >
            Three generations, one oven.
          </h2>
          <p className="mt-5 text-base md:text-lg leading-relaxed" style={{ color: "var(--b-text-muted)" }}>
            Elena Rodriguez learned to bake from her grandmother in Oaxaca — first the pan dulce for <em>Día de los Muertos</em>, then the laminated doughs of a Paris apprenticeship. Sunrise Bakery opened in 2018 in a converted surfboard shop on Newport Boulevard. Everything is made from scratch, every morning, with organic flour from a small mill in Santa Barbara and cultured butter from a dairy in Petaluma.
          </p>
          <p className="mt-4 text-sm" style={{ color: "var(--b-text-subtle)" }}>
            — Elena
          </p>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20" style={{ borderTop: "1px solid var(--b-border)" }}>
        <div className="grid gap-8 md:grid-cols-3">
          <div
            className="p-6 rounded-2xl flex flex-col gap-3"
            style={{ backgroundColor: "var(--b-surface-raised)", border: "1px solid var(--b-border)" }}
          >
            <MapPin size={22} style={{ color: "var(--b-primary)" }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--b-text)" }}>Visit us</p>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--b-text-muted)" }}>
                2840 Newport Blvd<br />Costa Mesa, CA 92627
              </p>
            </div>
          </div>
          <div
            className="p-6 rounded-2xl flex flex-col gap-3"
            style={{ backgroundColor: "var(--b-surface-raised)", border: "1px solid var(--b-border)" }}
          >
            <Clock size={22} style={{ color: "var(--b-primary)" }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--b-text)" }}>Hours</p>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--b-text-muted)" }}>
                Wed–Sun · 7am – 2pm<br />Closed Mon &amp; Tue
              </p>
            </div>
          </div>
          <div
            className="p-6 rounded-2xl flex flex-col gap-3"
            style={{ backgroundColor: "var(--b-surface-raised)", border: "1px solid var(--b-border)" }}
          >
            <Phone size={22} style={{ color: "var(--b-primary)" }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--b-text)" }}>Get in touch</p>
              <a href="tel:+17145550184" className="text-sm mt-1 block" style={{ color: "var(--b-text-muted)" }}>
                (714) 555-0184
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs mt-2" style={{ color: "var(--b-primary)" }}>
                <Instagram size={12} /> @sunrisebakerycm
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-10 text-center text-sm"
        style={{
          backgroundColor: "var(--b-text)",
          color: "color-mix(in srgb, var(--b-background) 70%, transparent)",
        }}
      >
        <p style={{ fontFamily: '"Fraunces Variable", Georgia, serif' }} className="text-lg font-semibold">
          Sunrise Bakery
        </p>
        <p className="mt-1 text-xs" style={{ color: "color-mix(in srgb, var(--b-background) 45%, transparent)" }}>
          © 2026 · Built by Marc Cruz
        </p>
      </footer>
    </div>
  );
}
