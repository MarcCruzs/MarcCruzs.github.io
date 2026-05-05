import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Work } from "@/components/sections/Work";
import { Resume } from "@/components/sections/Resume";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function App() {
  // Boot script in index.html has already applied .dark before React mounts;
  // mirror that so the toggle button reflects the current state on first paint.
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark"),
  );
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (_) {
      /* localStorage unavailable (private mode, quota) — non-fatal */
    }
  }, [dark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    const hero = document.getElementById("hero");
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ backgroundColor: "var(--color-background)", color: "var(--color-text)" }}>
      <Navbar dark={dark} onToggleDark={() => setDark((d) => !d)} />
      <main>
        <Hero />
        <TrustBar />
        <Work />
        <Resume />
        <About />
        <Contact />
      </main>
      <Footer />
      <StickyMobileBar visible={!heroVisible} />
      <AccessibilityWidget />
    </div>
  );
}
