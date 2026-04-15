import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { ShowroomCTA } from "@/components/sections/ShowroomCTA";
import { Contact } from "@/components/sections/Contact";

export default function App() {
  const [dark, setDark] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  // Sync dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Watch hero visibility for sticky mobile bar
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
        <Services />
        <Work />
        <Process />
        <About />
        <FAQ />
        <ShowroomCTA />
        <Contact />
      </main>
      <Footer />
      <StickyMobileBar visible={!heroVisible} />
      <AccessibilityWidget />
    </div>
  );
}
