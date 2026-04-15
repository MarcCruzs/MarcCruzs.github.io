import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Star, Sparkles, Zap, Shield, TrendingUp,
  Mail, Phone, MapPin, Sun, Moon, Palette, Type, ChevronRight, ChevronDown,
  AlertCircle, CheckCircle2, Info, XCircle,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { themes, defaultThemeId, type ShowroomTheme } from "@/data/showroom-themes";

/* ── Scoped theme vars applied to the wrapper ──────────────────────────── */
function useThemeStyle(theme: ShowroomTheme, dark: boolean): React.CSSProperties {
  return useMemo(() => {
    const vars = dark ? theme.dark : theme.light;
    return {
      ...(vars as React.CSSProperties),
      backgroundColor: "var(--s-background)",
      color: "var(--s-text)",
      fontFamily: theme.font.body,
    };
  }, [theme, dark]);
}

/* ── Tiny presentation primitives scoped to showroom ───────────────────── */
const Section: React.FC<{ id: string; label: string; title: string; children: React.ReactNode }> = ({ id, label, title, children }) => (
  <section id={id} className="py-16 md:py-20 border-t" style={{ borderColor: "var(--s-border)" }}>
    <div className="mb-10">
      <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--s-primary)" }}>{label}</p>
      <h2 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight" style={{ fontFamily: "inherit" }}>{title}</h2>
    </div>
    {children}
  </section>
);

/* ── Component demos ──────────────────────────────────────────────────── */

function ButtonsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <button className="px-4 py-2 rounded-[var(--s-radius)] text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
        style={{ backgroundColor: "var(--s-primary)", color: "var(--s-primary-ink)", boxShadow: "0 4px 12px hsl(var(--s-shadow) / 0.2)" }}>
        Primary Action
      </button>
      <button className="px-4 py-2 rounded-[var(--s-radius)] text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
        style={{ backgroundColor: "var(--s-accent)", color: "var(--s-accent-ink)" }}>
        Accent
      </button>
      <button className="px-4 py-2 rounded-[var(--s-radius)] text-sm font-semibold transition-all duration-200 hover:bg-[var(--s-surface)] active:scale-[0.97]"
        style={{ border: "1px solid var(--s-border)", color: "var(--s-text)" }}>
        Outline
      </button>
      <button className="px-4 py-2 rounded-[var(--s-radius)] text-sm font-semibold transition-all duration-200 hover:opacity-70 active:scale-[0.97]"
        style={{ color: "var(--s-text-muted)" }}>
        Ghost
      </button>
      <button className="px-4 py-2 rounded-[var(--s-radius)] text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
        style={{ backgroundColor: "var(--s-danger)", color: "#fff" }}>
        Destructive
      </button>
      <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--s-radius)] text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]"
        style={{ backgroundColor: "var(--s-primary)", color: "var(--s-primary-ink)" }}>
        With Icon <ArrowRight size={14} />
      </button>
      <button className="px-6 py-3 rounded-[var(--s-radius)] text-base font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
        style={{ backgroundColor: "var(--s-primary)", color: "var(--s-primary-ink)", boxShadow: "0 10px 24px hsl(var(--s-shadow) / 0.25)" }}>
        Large CTA
      </button>
      <button className="px-3 py-1.5 rounded-[var(--s-radius)] text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
        style={{ backgroundColor: "var(--s-primary)", color: "var(--s-primary-ink)" }}>
        Small
      </button>
    </div>
  );
}

function BadgesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {[
        { label: "New", bg: "var(--s-primary)", fg: "var(--s-primary-ink)" },
        { label: "Featured", bg: "var(--s-accent)", fg: "var(--s-accent-ink)" },
        { label: "Beta", bg: "var(--s-surface)", fg: "var(--s-text-muted)", border: true },
        { label: "Success", bg: "color-mix(in srgb, var(--s-success) 18%, transparent)", fg: "var(--s-success)", border: true },
        { label: "Warning", bg: "color-mix(in srgb, var(--s-accent) 18%, transparent)", fg: "var(--s-accent)", border: true },
        { label: "Error", bg: "color-mix(in srgb, var(--s-danger) 18%, transparent)", fg: "var(--s-danger)", border: true },
      ].map((b) => (
        <span key={b.label} className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider"
          style={{ backgroundColor: b.bg, color: b.fg, border: b.border ? "1px solid color-mix(in srgb, currentColor 30%, transparent)" : undefined }}>
          {b.label}
        </span>
      ))}
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold"
        style={{ backgroundColor: "color-mix(in srgb, var(--s-primary) 14%, transparent)", color: "var(--s-primary)" }}>
        <Star size={11} fill="currentColor" /> Top pick
      </span>
    </div>
  );
}

function AlertsDemo() {
  const items = [
    { icon: Info, title: "Heads up", body: "Your project starts in 3 days. Check your inbox for the kickoff doc.", tone: "primary" },
    { icon: CheckCircle2, title: "All set", body: "Your invoice has been paid — thanks, you're locked in for Monday.", tone: "success" },
    { icon: AlertCircle, title: "Action needed", body: "We need your brand assets before we can start design.", tone: "accent" },
    { icon: XCircle, title: "Something broke", body: "Form submission failed. Try again or email me directly.", tone: "danger" },
  ] as const;
  const toneMap: Record<string, { bg: string; fg: string; border: string }> = {
    primary: { bg: "color-mix(in srgb, var(--s-primary) 10%, transparent)", fg: "var(--s-primary)", border: "color-mix(in srgb, var(--s-primary) 30%, transparent)" },
    success: { bg: "color-mix(in srgb, var(--s-success) 12%, transparent)", fg: "var(--s-success)", border: "color-mix(in srgb, var(--s-success) 30%, transparent)" },
    accent:  { bg: "color-mix(in srgb, var(--s-accent) 12%, transparent)",  fg: "var(--s-accent)",  border: "color-mix(in srgb, var(--s-accent) 30%, transparent)" },
    danger:  { bg: "color-mix(in srgb, var(--s-danger) 12%, transparent)",  fg: "var(--s-danger)",  border: "color-mix(in srgb, var(--s-danger) 30%, transparent)" },
  };
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(({ icon: Icon, title, body, tone }) => {
        const t = toneMap[tone];
        return (
          <div key={title} className="flex gap-3 p-4 rounded-[var(--s-radius)]"
            style={{ backgroundColor: t.bg, border: `1px solid ${t.border}` }}>
            <Icon size={18} style={{ color: t.fg, flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: t.fg }}>{title}</p>
              <p className="text-sm mt-0.5" style={{ color: "var(--s-text-muted)" }}>{body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FormDemo() {
  return (
    <div className="max-w-md p-6 rounded-[var(--s-radius)]"
      style={{ backgroundColor: "var(--s-surface-raised)", border: "1px solid var(--s-border)" }}>
      <p className="text-sm font-semibold mb-4" style={{ color: "var(--s-text)" }}>Get a quote</p>

      <label className="block text-xs font-medium mb-1" style={{ color: "var(--s-text-muted)" }}>Name</label>
      <input type="text" placeholder="Jane Doe"
        className="w-full px-3 py-2 rounded-[var(--s-radius)] text-sm mb-4 focus:outline-none focus:ring-2"
        style={{ backgroundColor: "var(--s-background)", border: "1px solid var(--s-border)", color: "var(--s-text)" }} />

      <label className="block text-xs font-medium mb-1" style={{ color: "var(--s-text-muted)" }}>Email</label>
      <input type="email" placeholder="jane@company.com"
        className="w-full px-3 py-2 rounded-[var(--s-radius)] text-sm mb-4"
        style={{ backgroundColor: "var(--s-background)", border: "1px solid var(--s-border)", color: "var(--s-text)" }} />

      <label className="block text-xs font-medium mb-1" style={{ color: "var(--s-text-muted)" }}>Service</label>
      <select className="w-full px-3 py-2 rounded-[var(--s-radius)] text-sm mb-4"
        style={{ backgroundColor: "var(--s-background)", border: "1px solid var(--s-border)", color: "var(--s-text)" }}>
        <option>Website Design</option><option>SEO Audit</option><option>AI Integration</option>
      </select>

      <label className="block text-xs font-medium mb-1" style={{ color: "var(--s-text-muted)" }}>Message</label>
      <textarea rows={3} placeholder="Tell me about the project…"
        className="w-full px-3 py-2 rounded-[var(--s-radius)] text-sm mb-4"
        style={{ backgroundColor: "var(--s-background)", border: "1px solid var(--s-border)", color: "var(--s-text)", resize: "none" }} />

      <button className="w-full px-4 py-2.5 rounded-[var(--s-radius)] text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
        style={{ backgroundColor: "var(--s-primary)", color: "var(--s-primary-ink)", boxShadow: "0 4px 12px hsl(var(--s-shadow) / 0.2)" }}>
        Send request
      </button>
      <p className="mt-2 text-[11px] text-center" style={{ color: "var(--s-text-subtle)" }}>Replies within 24 hours · No obligation</p>
    </div>
  );
}

function PricingDemo() {
  const tiers = [
    { name: "Launch", price: "$2.4k", blurb: "A polished 5-page site, done right", features: ["Custom design", "Mobile-first", "Contact form", "Basic SEO"], featured: false },
    { name: "Professional", price: "$4.8k", blurb: "Growth-ready with real analytics", features: ["Everything in Launch", "Advanced SEO", "Analytics dashboard", "CMS"], featured: true },
    { name: "Full Stack", price: "$8k+", blurb: "Custom AI features and integrations", features: ["Everything in Pro", "AI chatbot", "Custom API", "Priority support"], featured: false },
  ];
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {tiers.map((t) => (
        <div key={t.name} className="p-6 rounded-[var(--s-radius)] flex flex-col transition-all duration-300 hover:-translate-y-1"
          style={{
            backgroundColor: "var(--s-surface-raised)",
            border: t.featured ? "2px solid var(--s-primary)" : "1px solid var(--s-border)",
            boxShadow: t.featured ? "0 16px 40px hsl(var(--s-shadow) / 0.18)" : "0 4px 12px hsl(var(--s-shadow) / 0.08)",
          }}>
          {t.featured && (
            <span className="self-start mb-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: "var(--s-primary)", color: "var(--s-primary-ink)" }}>Most popular</span>
          )}
          <p className="text-lg font-semibold" style={{ color: "var(--s-text)" }}>{t.name}</p>
          <p className="text-sm mb-4" style={{ color: "var(--s-text-muted)" }}>{t.blurb}</p>
          <p className="text-3xl font-bold" style={{ color: "var(--s-text)", fontVariantNumeric: "tabular-nums" }}>
            {t.price}<span className="text-sm font-normal" style={{ color: "var(--s-text-subtle)" }}>/project</span>
          </p>
          <ul className="mt-5 space-y-2">
            {t.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "var(--s-text-muted)" }}>
                <Check size={15} style={{ color: "var(--s-primary)", flexShrink: 0, marginTop: 2 }} />
                {f}
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full px-4 py-2.5 rounded-[var(--s-radius)] text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              backgroundColor: t.featured ? "var(--s-primary)" : "transparent",
              color: t.featured ? "var(--s-primary-ink)" : "var(--s-text)",
              border: t.featured ? "none" : "1px solid var(--s-border)",
            }}>
            Get started
          </button>
        </div>
      ))}
    </div>
  );
}

function StatsDemo() {
  const stats = [
    { label: "Avg page load", value: "0.8s", icon: Zap },
    { label: "Client sites live", value: "12+", icon: TrendingUp },
    { label: "Core Web Vitals passing", value: "100%", icon: Shield },
    { label: "Response time", value: "< 24h", icon: Sparkles },
  ];
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="p-5 rounded-[var(--s-radius)]"
          style={{ backgroundColor: "var(--s-surface-raised)", border: "1px solid var(--s-border)" }}>
          <Icon size={18} style={{ color: "var(--s-primary)" }} />
          <p className="mt-3 text-3xl font-bold" style={{ color: "var(--s-text)", fontVariantNumeric: "tabular-nums" }}>{value}</p>
          <p className="text-xs mt-1" style={{ color: "var(--s-text-muted)" }}>{label}</p>
        </div>
      ))}
    </div>
  );
}

function TestimonialsDemo() {
  const items = [
    { name: "Sarah L.", city: "Costa Mesa, CA", quote: "Marc redesigned our bakery site and bookings jumped 40% in the first month. Clean, fast, and he actually answered our emails.", rating: 5 },
    { name: "Diego R.", city: "Irvine, CA", quote: "We were on Wix for 3 years. Marc's rebuild gets us on the first page for our target keywords — we've gotten more calls than ever.", rating: 5 },
    { name: "Priya K.", city: "Newport Beach, CA", quote: "The AI chatbot he built handles 60% of our inquiries automatically. Worth every penny.", rating: 5 },
  ];
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((t) => (
        <figure key={t.name} className="p-6 rounded-[var(--s-radius)] flex flex-col"
          style={{ backgroundColor: "var(--s-surface-raised)", border: "1px solid var(--s-border)" }}>
          <div className="flex gap-0.5 mb-3" aria-label={`${t.rating} of 5 stars`}>
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={14} fill="var(--s-accent)" style={{ color: "var(--s-accent)" }} />
            ))}
          </div>
          <blockquote className="text-sm leading-relaxed flex-1" style={{ color: "var(--s-text-muted)" }}>
            "{t.quote}"
          </blockquote>
          <figcaption className="mt-4 pt-4 text-sm font-semibold" style={{ borderTop: "1px solid var(--s-border)", color: "var(--s-text)" }}>
            {t.name}<span className="font-normal" style={{ color: "var(--s-text-subtle)" }}> · {t.city}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function HeroMiniDemo() {
  return (
    <div className="relative overflow-hidden rounded-[var(--s-radius)] p-8 md:p-12"
      style={{ backgroundColor: "var(--s-surface-raised)", border: "1px solid var(--s-border)" }}>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, var(--s-primary) 0%, transparent 70%)" }} />
      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest mb-4"
        style={{ backgroundColor: "color-mix(in srgb, var(--s-primary) 14%, transparent)", color: "var(--s-primary)" }}>
        Web design · SEO · AI
      </span>
      <h3 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight max-w-xl" style={{ color: "var(--s-text)" }}>
        Websites that actually <span className="italic" style={{ color: "var(--s-primary)" }}>get found</span>.
      </h3>
      <p className="mt-4 max-w-lg text-base leading-relaxed" style={{ color: "var(--s-text-muted)" }}>
        Custom-built. No templates, no page builders. Every detail tuned for speed, accessibility, and Google.
      </p>
      <div className="mt-6 flex gap-3">
        <button className="px-5 py-2.5 rounded-[var(--s-radius)] text-sm font-semibold hover:-translate-y-0.5 transition-all"
          style={{ backgroundColor: "var(--s-primary)", color: "var(--s-primary-ink)", boxShadow: "0 8px 20px hsl(var(--s-shadow) / 0.22)" }}>
          Start your project
        </button>
        <button className="px-5 py-2.5 rounded-[var(--s-radius)] text-sm font-semibold transition-all"
          style={{ border: "1px solid var(--s-border)", color: "var(--s-text)" }}>
          See the work
        </button>
      </div>
    </div>
  );
}

function NavbarMiniDemo() {
  return (
    <div className="rounded-[var(--s-radius)] overflow-hidden" style={{ border: "1px solid var(--s-border)" }}>
      <div className="px-5 py-3 flex items-center justify-between" style={{ backgroundColor: "var(--s-surface-raised)", borderBottom: "1px solid var(--s-border)" }}>
        <span className="font-bold text-sm" style={{ color: "var(--s-text)" }}>ClientCo</span>
        <div className="hidden md:flex gap-6 text-xs font-medium" style={{ color: "var(--s-text-muted)" }}>
          <span>Work</span><span>Services</span><span>About</span><span>Contact</span>
        </div>
        <button className="px-3 py-1.5 rounded-[var(--s-radius)] text-xs font-semibold" style={{ backgroundColor: "var(--s-primary)", color: "var(--s-primary-ink)" }}>Book a call</button>
      </div>
      <div className="px-5 py-4 text-xs" style={{ backgroundColor: "var(--s-background)", color: "var(--s-text-subtle)" }}>
        Home <ChevronRight size={11} className="inline mx-1" /> Services <ChevronRight size={11} className="inline mx-1" /> <span style={{ color: "var(--s-text)" }}>Web Design</span>
      </div>
    </div>
  );
}

function TypographyDemo({ theme }: { theme: ShowroomTheme }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "var(--s-text-subtle)" }}>Display · {theme.font.display.split(",")[0].replace(/["']/g, "")}</p>
        <p className="text-4xl md:text-5xl font-semibold leading-[1.05] tracking-tight" style={{ fontFamily: theme.font.display, color: "var(--s-text)" }}>
          The quick brown fox jumps over the lazy dog.
        </p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "var(--s-text-subtle)" }}>Body · {theme.font.body.split(",")[0].replace(/["']/g, "")}</p>
        <p className="text-base leading-relaxed max-w-2xl" style={{ fontFamily: theme.font.body, color: "var(--s-text-muted)" }}>
          Every interaction must feel engineered — smooth transitions, a form that responds, hover states that reward attention. No happy talk, no imposter hedging.
        </p>
      </div>
    </div>
  );
}

function PaletteSwatches({ theme, dark }: { theme: ShowroomTheme; dark: boolean }) {
  const vars = dark ? theme.dark : theme.light;
  const swatches: { label: string; var: string }[] = [
    { label: "Background", var: "--s-background" },
    { label: "Surface", var: "--s-surface" },
    { label: "Text", var: "--s-text" },
    { label: "Text Muted", var: "--s-text-muted" },
    { label: "Primary", var: "--s-primary" },
    { label: "Accent", var: "--s-accent" },
    { label: "Success", var: "--s-success" },
    { label: "Danger", var: "--s-danger" },
  ];
  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
      {swatches.map((s) => (
        <div key={s.var} className="p-3 rounded-[var(--s-radius)]" style={{ border: "1px solid var(--s-border)", backgroundColor: "var(--s-surface-raised)" }}>
          <div className="h-12 rounded-[calc(var(--s-radius)/1.5)] mb-2" style={{ backgroundColor: `var(${s.var})`, border: "1px solid var(--s-border)" }} />
          <p className="text-[11px] font-semibold" style={{ color: "var(--s-text)" }}>{s.label}</p>
          <p className="text-[10px] font-mono" style={{ color: "var(--s-text-subtle)" }}>{vars[s.var]}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── The Showroom page ─────────────────────────────────────────────────── */
export default function Showroom() {
  const [themeId, setThemeId] = useState<string>(defaultThemeId);
  const [dark, setDark] = useState(false);
  const [navDark, setNavDark] = useState(false);
  const theme = themes.find((t) => t.id === themeId) ?? themes[0];

  // Dynamically inject external font imports if the theme needs them
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    theme.font.importUrls.forEach((url) => {
      if (document.head.querySelector(`link[href="${url}"]`)) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
      links.push(link);
    });
    return () => {
      // don't remove — caching is fine, let other theme switches reuse
    };
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", navDark);
  }, [navDark]);

  const previewStyle = useThemeStyle(theme, dark);

  return (
    <div style={{ backgroundColor: "var(--color-background)", color: "var(--color-text)" }}>
      <Navbar dark={navDark} onToggleDark={() => setNavDark((d) => !d)} />

      {/* Page hero (uses site's own midcentury theme, not the preview) */}
      <section className="pt-28 pb-10 md:pt-32 md:pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-primary)" }}>
            Design Showroom
          </p>
          <h1 className="mt-2 font-display font-semibold leading-[1.05] tracking-tight text-4xl md:text-5xl lg:text-6xl"
            style={{ color: "var(--color-text)", textWrap: "balance" }}>
            Pick a vibe. See the <span className="italic" style={{ color: "var(--color-primary)" }}>whole site</span> change.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Every component below live-updates with the selected theme. This is how we explore palettes, typography, and component styles together before I build your site.
          </p>
          <div className="mt-4 flex items-center gap-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
            <Link to="/" className="underline underline-offset-4 hover:opacity-80">← Back to Marc's site</Link>
            <span>·</span>
            <span>Preview theme: <strong style={{ color: "var(--color-text)" }}>{theme.label}</strong></span>
          </div>
        </div>
      </section>

      {/* Sticky theme switcher bar */}
      <div className="sticky top-16 z-30 border-y backdrop-blur-md"
        style={{ backgroundColor: "color-mix(in srgb, var(--color-background) 85%, transparent)", borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 flex-wrap sm:flex-nowrap">
          <label htmlFor="showroom-theme-select" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest flex-shrink-0" style={{ color: "var(--color-text-muted)" }}>
            <Palette size={13} /> Theme
          </label>

          <div className="relative flex-1 min-w-0 sm:max-w-sm">
            <select
              id="showroom-theme-select"
              value={themeId}
              onChange={(e) => setThemeId(e.target.value)}
              className="w-full appearance-none px-3 py-2 pr-9 rounded-lg text-sm font-semibold cursor-pointer focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: "var(--color-surface-raised)",
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
              }}
              aria-label="Select a preview theme"
            >
              {themes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              aria-hidden="true"
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--color-text-muted)" }}
            />
          </div>

          <button
            onClick={() => setDark((d) => !d)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold flex-shrink-0 transition-all hover:-translate-y-0.5"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-muted)",
              backgroundColor: "var(--color-surface-raised)",
            }}
            aria-label="Toggle preview dark mode"
          >
            {dark ? <Moon size={13} /> : <Sun size={13} />}
            {dark ? "Dark preview" : "Light preview"}
          </button>
        </div>
      </div>

      {/* The preview surface — scoped CSS vars via inline style */}
      <div className="border-y" style={{ borderColor: "var(--color-border)" }}>
        <div style={previewStyle} className="transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Preview header / theme summary */}
            <div className="pt-12 md:pt-16 pb-2">
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--s-text-subtle)" }}>Now previewing</p>
              <p className="mt-2 text-lg md:text-xl max-w-2xl" style={{ color: "var(--s-text-muted)" }}>
                <span className="font-semibold" style={{ color: "var(--s-text)", fontFamily: theme.font.display }}>{theme.label}</span> — {theme.blurb}
              </p>
            </div>

            <Section id="typography" label="01 · Typography" title="The type pairing">
              <TypographyDemo theme={theme} />
            </Section>

            <Section id="palette" label="02 · Palette" title="The color system">
              <PaletteSwatches theme={theme} dark={dark} />
            </Section>

            <Section id="hero" label="03 · Hero" title="A hero section in this theme">
              <HeroMiniDemo />
            </Section>

            <Section id="buttons" label="04 · Buttons" title="Every button variant you'll need">
              <ButtonsDemo />
            </Section>

            <Section id="badges" label="05 · Badges" title="Tags, pills, and status chips">
              <BadgesDemo />
            </Section>

            <Section id="alerts" label="06 · Alerts" title="Inline messages & callouts">
              <AlertsDemo />
            </Section>

            <Section id="form" label="07 · Form" title="Inputs, selects, textareas">
              <FormDemo />
            </Section>

            <Section id="pricing" label="08 · Pricing cards" title="Tiered service cards">
              <PricingDemo />
            </Section>

            <Section id="testimonials" label="09 · Testimonials" title="Social proof cards">
              <TestimonialsDemo />
            </Section>

            <Section id="stats" label="10 · Stats" title="Metric tiles">
              <StatsDemo />
            </Section>

            <Section id="nav" label="11 · Navigation" title="Top nav + breadcrumb">
              <NavbarMiniDemo />
            </Section>

            <Section id="contact" label="12 · Contact info" title="Get in touch block">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { icon: Mail, label: "Email", value: "hello@example.com" },
                  { icon: Phone, label: "Phone", value: "(555) 012-3456" },
                  { icon: MapPin, label: "Location", value: "Orange County, CA" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3 p-4 rounded-[var(--s-radius)]"
                    style={{ backgroundColor: "var(--s-surface-raised)", border: "1px solid var(--s-border)" }}>
                    <div className="p-2 rounded-[var(--s-radius)]" style={{ backgroundColor: "color-mix(in srgb, var(--s-primary) 12%, transparent)" }}>
                      <Icon size={16} style={{ color: "var(--s-primary)" }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--s-text-subtle)" }}>{label}</p>
                      <p className="text-sm mt-0.5" style={{ color: "var(--s-text)" }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <div className="pt-16 pb-20 text-center">
              <Type size={20} style={{ color: "var(--s-primary)" }} className="mx-auto" />
              <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: "var(--s-text-muted)" }}>
                Like this theme? Tell Marc in the kickoff call — or mix and match from multiple. Every component above is production-ready.
              </p>
              <Link
                to="/#contact"
                className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-[var(--s-radius)] text-sm font-semibold transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--s-primary)", color: "var(--s-primary-ink)", boxShadow: "0 10px 24px hsl(var(--s-shadow) / 0.25)" }}
              >
                Start your project <ArrowRight size={15} />
              </Link>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
