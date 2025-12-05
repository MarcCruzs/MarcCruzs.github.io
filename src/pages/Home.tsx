import { useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { LinkCard } from "@/components/LinkCard";
import { ThemeCycleCard } from "@/components/ThemeCycleCard";
import { Dot, Orbit, Rocket, SatelliteDish, Users2} from "lucide-react";
import { Plane } from "akar-icons"
import { ListCard } from "@/components/ListCard";
const ResponsiveGridLayout = WidthProvider(Responsive);

// 3 columns on lg/md; 2 on sm; 1 on xs/xxs
const COLS = {lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 };
const ICON_COLOR = "#ffffff"

const initialLayouts: Layouts = {
  lg: [
    // SPACERS
    // { i: "spacer-1", x: 2, y: 6, w: 3, h: 2, minW: 1, minH: 1 },
    { i: "spacer-2", x: 0, y: 4,  w: 3, h: 2, minW: 1, minH: 1 },
    { i: "spacer-3", x: 0, y: 30, w: 3, h: 2, minW: 1, minH: 1 },

    // BLOCKS
    { i: "block",   x: 0, y: 0,  w: 2, h: 6, minW: 1, minH: 3 },
    { i: "block-2", x: 2, y: 6,  w: 1, h: 5, minW: 1, minH: 2 },
    { i: "block-3", x: 0, y: 5,  w: 1, h: 5, minW: 1, minH: 1 },
    { i: "block-4", x: 2, y: 2,  w: 1, h: 3, minW: 1, minH: 3 },
    { i: "block-5", x: 0, y: 2,  w: 2, h: 4, minW: 2, minH: 3 },
    { i: "block-6", x: 0, y: 7,  w: 1, h: 5, minW: 1, minH: 2 },
    { i: "block-7", x: 2, y: 8,  w: 1, h: 5, minW: 1, minH: 2 },

    { i: "block-8",  x: 0, y: 31, w: 1, h: 4, minW: 1, minH: 4 },
    { i: "block-9",  x: 0, y: 32, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-10", x: 1, y: 32, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-11", x: 2, y: 32, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-12", x: 1, y: 33, w: 1, h: 3, minW: 1, minH: 3 },

    // LINKS
    { i: "link-1", x: 2, y: 31, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-2", x: 1, y: 31, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-3", x: 0, y: 33, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-4", x: 0, y: 9,  w: 3, h: 1, minW: 1, minH: 1 },
    { i: "link-5", x: 0, y: 31, w: 1, h: 1, minW: 1, minH: 1 },

    // HEROES
    { i: "hero",   x: 2, y: 0,  w: 1, h: 3, minW: 1, minH: 3 },
    { i: "hero-2", x: 0, y: 6,  w: 2, h: 5, minW: 1, minH: 3 },
    { i: "hero-3", x: 1, y: 4,  w: 2, h: 5, minW: 1, minH: 3 },
    { i: "hero-4", x: 2, y: 7,  w: 2, h: 5, minW: 1, minH: 3 },
    { i: "hero-5", x: 0, y: 8,  w: 2, h: 5, minW: 1, minH: 3 },
    { i: "hero-6", x: 1, y: 30, w: 2, h: 5, minW: 1, minH: 3 },
  ],

  md: [
    // SPACERS
    { i: "spacer-2", x: 2, y: 7,  w: 1, h: 2, minW: 1, minH: 1 },
    { i: "spacer-3", x: 2, y: 100, w: 1, h: 2, minW: 1, minH: 1 },

    // CORE BLOCKS
    { i: "block",   x: 0, y: 0,  w: 2, h: 8, minW: 2, minH: 4 },
    { i: "hero",    x: 2, y: 0,  w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-3", x: 0, y: 8,  w: 3, h: 4, minW: 2, minH: 3 },
    { i: "block-4", x: 2, y: 6,  w: 1, h: 4, minW: 1, minH: 3 },

    // FEATURED PROJECT CARDS
    { i: "block-2", x: 0, y: 10, w: 1, h: 6, minW: 1, minH: 4 },
    { i: "block-6", x: 1, y: 10, w: 1, h: 6, minW: 1, minH: 4 },
    { i: "block-7", x: 2, y: 10, w: 1, h: 6, minW: 1, minH: 4 },

    // BLOCK-5 (extra text / section)
    { i: "block-5", x: 0, y: 16, w: 3, h: 4, minW: 1, minH: 3 },

    // SKILL / EXTRA BLOCKS
    { i: "block-8",  x: 0, y: 20, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-9",  x: 1, y: 20, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-10", x: 2, y: 20, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-11", x: 0, y: 24, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-12", x: 1, y: 24, w: 2, h: 3, minW: 1, minH: 3 },

    // LINKS
    { i: "link-1", x: 0, y: 27, w: 1, h: 2, minW: 1, minH: 1 },
    { i: "link-2", x: 1, y: 27, w: 1, h: 2, minW: 1, minH: 1 },
    { i: "link-3", x: 2, y: 27, w: 1, h: 2, minW: 1, minH: 1 },
    { i: "link-4", x: 0, y: 29, w: 1, h: 2, minW: 1, minH: 1 },
    { i: "link-5", x: 2, y: 29, w: 1, h: 2, minW: 1, minH: 1 },

    // HEROES
    { i: "hero-2", x: 0, y: 31, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "hero-3", x: 1, y: 31, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "hero-4", x: 2, y: 31, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "hero-5", x: 2, y: 35, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "hero-6", x: 1, y: 39, w: 1, h: 4, minW: 1, minH: 3 },
  ],

  sm: [
    // SPACERS
    { i: "spacer-2", x: 0, y: 12, w: 2, h: 1, minW: 1, minH: 1 },
    { i: "spacer-3", x: 0, y: 24, w: 2, h: 1, minW: 1, minH: 1 },

    // CORE BLOCKS
    { i: "block",   x: 0, y: 0,  w: 2, h: 6, minW: 2, minH: 4 },
    { i: "hero",    x: 0, y: 6,  w: 2, h: 4, minW: 2, minH: 3 },
    { i: "block-4", x: 0, y: 10, w: 2, h: 5, minW: 2, minH: 3 },
    { i: "block-3", x: 0, y: 11, w: 2, h: 4, minW: 2, minH: 3 },

    // FEATURED PROJECT CARDS
    { i: "block-2", x: 0, y: 18, w: 2, h: 6, minW: 2, minH: 4 },
    { i: "block-6", x: 0, y: 24, w: 2, h: 6, minW: 2, minH: 4 },
    { i: "block-7", x: 0, y: 30, w: 2, h: 6, minW: 2, minH: 4 },

    // BLOCK-5
    { i: "block-5", x: 0, y: 36, w: 2, h: 4, minW: 2, minH: 3 },

    // EXTRA BLOCKS (stacked)
    { i: "block-8",  x: 0, y: 40, w: 2, h: 4, minW: 2, minH: 3 },
    { i: "block-9",  x: 0, y: 44, w: 2, h: 4, minW: 2, minH: 3 },
    { i: "block-10", x: 0, y: 48, w: 2, h: 4, minW: 2, minH: 3 },
    { i: "block-11", x: 0, y: 52, w: 2, h: 4, minW: 2, minH: 3 },
    { i: "block-12", x: 0, y: 56, w: 2, h: 3, minW: 2, minH: 3 },

    // LINKS
    { i: "link-1", x: 0, y: 59, w: 1, h: 2, minW: 1, minH: 1 },
    { i: "link-2", x: 1, y: 59, w: 1, h: 2, minW: 1, minH: 1 },
    { i: "link-3", x: 0, y: 61, w: 1, h: 2, minW: 1, minH: 1 },
    { i: "link-4", x: 1, y: 61, w: 1, h: 2, minW: 1, minH: 1 },
    { i: "link-5", x: 0, y: 63, w: 2, h: 2, minW: 1, minH: 1 },

    // HEROES
    { i: "hero-2", x: 0, y: 65, w: 2, h: 4, minW: 2, minH: 3 },
    { i: "hero-3", x: 0, y: 69, w: 2, h: 4, minW: 2, minH: 3 },
    { i: "hero-4", x: 0, y: 73, w: 2, h: 4, minW: 2, minH: 3 },
    { i: "hero-5", x: 0, y: 77, w: 2, h: 4, minW: 2, minH: 3 },
    { i: "hero-6", x: 0, y: 81, w: 2, h: 4, minW: 2, minH: 3 },
  ],

  xs: [
    // CORE STACK
    { i: "block",   x: 0, y: 0,  w: 1, h: 9, minW: 1, minH: 4 },
    { i: "hero",    x: 0, y: 6,  w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-4", x: 0, y: 10, w: 1, h: 5, minW: 1, minH: 3 },
    { i: "block-3", x: 0, y: 14, w: 1, h: 5, minW: 1, minH: 3 },

    { i: "block-2", x: 0, y: 20, w: 1, h: 7, minW: 1, minH: 4 },
    { i: "block-6", x: 0, y: 27, w: 1, h: 7, minW: 1, minH: 4 },
    { i: "block-7", x: 0, y: 34, w: 1, h: 7, minW: 1, minH: 4 },

    // BLOCK-5
    { i: "block-5", x: 0, y: 41, w: 1, h: 4, minW: 1, minH: 3 },

    // EXTRA BLOCKS
    { i: "block-8",  x: 0, y: 45, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-9",  x: 0, y: 49, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-10", x: 0, y: 53, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-11", x: 0, y: 57, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-12", x: 0, y: 61, w: 1, h: 3, minW: 1, minH: 3 },

    // LINKS
    { i: "link-1", x: 0, y: 64, w: 1, h: 2, minW: 1, minH: 1 },
    { i: "link-2", x: 0, y: 66, w: 1, h: 2, minW: 1, minH: 1 },
    { i: "link-3", x: 0, y: 68, w: 1, h: 2, minW: 1, minH: 1 },
    { i: "link-4", x: 0, y: 70, w: 1, h: 2, minW: 1, minH: 1 },
    { i: "link-5", x: 0, y: 72, w: 1, h: 2, minW: 1, minH: 1 },

    // HEROES
    { i: "hero-2", x: 0, y: 74, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "hero-3", x: 0, y: 78, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "hero-4", x: 0, y: 82, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "hero-5", x: 0, y: 86, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "hero-6", x: 0, y: 90, w: 1, h: 4, minW: 1, minH: 3 },

    // SPACERS
    { i: "spacer-2", x: 0, y: 94, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "spacer-3", x: 0, y: 95, w: 1, h: 1, minW: 1, minH: 1 },
  ],

  xxs: [
    // Same structure as xs for now
    { i: "block",   x: 0, y: 0,  w: 1, h: 9, minW: 1, minH: 4 },
    { i: "hero",    x: 0, y: 6,  w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-3", x: 0, y: 20, w: 1, h: 5, minW: 1, minH: 3 },
    { i: "block-4", x: 0, y: 10, w: 1, h: 5, minW: 1, minH: 3 },

    { i: "block-2", x: 0, y: 20, w: 1, h: 7, minW: 1, minH: 4 },
    { i: "block-6", x: 0, y: 27, w: 1, h: 7, minW: 1, minH: 4 },
    { i: "block-7", x: 0, y: 34, w: 1, h: 7, minW: 1, minH: 4 },

    { i: "block-5", x: 0, y: 41, w: 1, h: 4, minW: 1, minH: 3 },

    { i: "block-8",  x: 0, y: 45, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-9",  x: 0, y: 49, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-10", x: 0, y: 53, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-11", x: 0, y: 57, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-12", x: 0, y: 61, w: 1, h: 3, minW: 1, minH: 3 },

    { i: "link-1", x: 0, y: 64, w: 1, h: 2, minW: 1, minH: 1 },
    { i: "link-2", x: 0, y: 66, w: 1, h: 2, minW: 1, minH: 1 },
    { i: "link-3", x: 0, y: 68, w: 1, h: 2, minW: 1, minH: 1 },
    { i: "link-4", x: 0, y: 70, w: 1, h: 2, minW: 1, minH: 1 },
    { i: "link-5", x: 0, y: 72, w: 1, h: 2, minW: 1, minH: 1 },

    { i: "hero-2", x: 0, y: 74, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "hero-3", x: 0, y: 78, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "hero-4", x: 0, y: 82, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "hero-5", x: 0, y: 86, w: 1, h: 4, minW: 1, minH: 3 },
    { i: "hero-6", x: 0, y: 90, w: 1, h: 4, minW: 1, minH: 3 },

    { i: "spacer-2", x: 0, y: 94, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "spacer-3", x: 0, y: 95, w: 1, h: 1, minW: 1, minH: 1 },
  ],
};


const roles = [
  {
    text: "NASA SWE Contractor ",
    linkText: "(NAMS-2)",
    href: "https://nams-2-crown.com/"
  },
  {
    text: "President, ",
    linkText: "Software Engineering Association",
    href: "https://cppsea.com/",
  },
  {
    text: "Computer Vision Lead — ",
    linkText: "CPP SUAS Team",
    href: "https://www.bronco-astra.com/",
  },
];


export default function Home() {
  const [layouts, setLayouts] = useState<Layouts>(initialLayouts);
  const DRAGGABLE_BREAKPOINTS = new Set(["lg", "md", "sm"]);

  const [isDragEnabled, setIsDragEnabled] = useState(true);

  const [rowHeight, setRowHeight] = useState<number | null>(null);

  useEffect(() => {
    function update() {
      const h = Math.max(60, window.innerHeight * 0.05); 
      setRowHeight(h);
    }
    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section>
      {rowHeight !== null && (
      <ResponsiveGridLayout
        className={isDragEnabled ? "cursor-grab" : "cursor-default"}
        layouts={layouts}
        cols={COLS}
        breakpoints={{ lg: 1024, md: 768, sm: 640, xs: 480, xxs: 0 }}
        rowHeight={rowHeight}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        compactType="vertical"
        preventCollision={false}
        isDraggable={isDragEnabled}
        isResizable={false}
        draggableCancel="a, button, .no-drag"
        onBreakpointChange={(bp) => {
          setIsDragEnabled(DRAGGABLE_BREAKPOINTS.has(bp));
        }}
      >

        {/* ================== SPACERS ================== */}
        <div
          key="spacer-2"
          className="pointer-events-none select-none"
        >
          {/* empty on purpose */}
        </div>

        <div
          key="spacer-3"
          className="pointer-events-none select-none"
        >
          {/* empty on purpose */}
        </div>

        {/* ================== BLOCKS (CONTENT CARDS) ================== */}

        {/* Main hero / intro */}
        <div
          key="block"
          className="relative select-none rounded-lg shadow-soft p-6 flex flex-col bg-foreground/5 border border-foreground/30 glass-card overflow-hidden"
        >
          {/* Lava lamp background layer */}
          <div className="lava-bg">
            <div className="blob-3"></div>
          </div>

          {/* Foreground content */}
          <div className="relative z-10 flex flex-col h-full">
            <h1 className="text-8xl font-black font-poppins mb-4">MARC CRUZ</h1>

            <h2 className="text-3xl font-semibold text-foreground/90 leading-snug mb-8">
              I build scalable backend systems and data pipelines that stay clean and dependable.
            </h2>

            {/* Newspaper column */}
            <div className="space-y-4 max-w-xs">
              <p className="text-xs text-muted-foreground text-justify leading-loose">
                My experience spans NASA ETL pipelines, distributed processing systems, and
                data-intensive web platforms. I focus on building systems that remain
                robust and maintainable as they grow.
              </p>
            </div>

            {/* Button anchored to bottom */}
            <Button
              variant="secondary"
              size="lg"
              asChild
              className="self-start mt-auto px-6 py-3 text-base font-semibold rounded-md shadow-sm hover:shadow-md"
            >
              <HashLink smooth to="/#contact">
                Get in Touch
              </HashLink>
            </Button>
          </div>
        </div>


        {/* Featured projects intro */}
        <div
          id="featured-projects"
          key="block-3"
          className="rounded-lg shadow-soft p-6 flex flex-col bg-foreground/5 border-foreground/30 glass-card"
        >
          <h3 className="text-3xl font-black font-poppins mb-auto">FEATURED WORKS</h3>
          <br />
          <p className="text-xs">
            A selection of projects that highlight my work in backend systems, data
            engineering, and software architecture. Each showcases how I approach
            scalability, clarity, and real-world problem solving.
          </p>
          <br />
          <p className="text-xs">
            These projects represent the systems I’ve built across research, student
            organizations, and engineering work. From NASA data pipelines to internal tools
            that streamline operations and automate workflows.
          </p>
        </div>

        {/* Previously roles list */}
        <div
          key="block-4"
          className="select-none shadow-soft rounded-lg border bg-foreground/5 overflow-hidden h-full flex flex-col border-foreground/30 glass-card"
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-foreground/10">
            <h3 className="font-black font-poppins text-md text-foreground/80 tracking-wide">
              PREVIOUSLY
            </h3>
          </div>

          {/* List (fills remaining space) */}
          <ul className="flex flex-col flex-1 divide-y divide-foreground/10">
            {roles.map((role, i) => (
              <li
                key={i}
                className="flex-1 flex items-center px-4 hover:bg-foreground/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-sm bg-foreground/40" />

                  <span className="text-sm text-foreground/80">
                    {role.text}
                    {role.linkText && (
                      <a
                        href={role.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-foreground"
                      >
                        {role.linkText}
                      </a>
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* NASA ETL PIPELINE project card */}
        <div key="block-2" className="relative w-full h-full">
          {/* Background image (one layer below the card) */}
          <img
            alt=""
            src="/sky.jpg"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-60 no-drag"
            loading="eager"
            decoding="sync"
          />

          {/* Foreground card */}
          <div
            className="relative z-10 h-full select-none rounded-lg shadow-soft p-6 flex flex-col
                      bg-foreground/5 border border-foreground/30 glass-card backdrop-blur-sm"
          >
            <h1 className="text-2xl font-black font-poppins mb-4">NASA ETL PIPELINE</h1>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-sm text-justify leading-loose">
                I developed and optimized ETL pipelines for NASA’s atmospheric data workflows,
                improving how large scientific datasets were ingested, processed, and prepared
                for research and modeling.
              </p>
            </div>


            <Button
              variant="secondary"
              size="lg"
              className="mt-auto self-end px-6 py-3 text-base font-semibold rounded-md
                        shadow-sm hover:shadow-md"
              disabled
            >
                Under NDA
            </Button>
          </div>
        </div>

        {/* SEA PORTAL project card */}
        <div key="block-6" className="relative w-full h-full">
          {/* Background image (one layer below the card) */}
          <img
            alt=""
            src="/img4.png"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-60 no-drag"
            loading="eager"
            decoding="sync"
          />

          {/* Foreground card */}
          <div
            className="relative z-10 h-full select-none rounded-lg shadow-soft p-6 flex flex-col
                      bg-foreground/5 border border-foreground/30 glass-card backdrop-blur-sm"
          >
            <h1 className="text-2xl font-black font-poppins mb-4">SEA PORTAL</h1>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-sm text-justify leading-loose">
                I built the SEA Portal to streamline how the club manages members, events, and
                internal data. It replaces manual processes with a scalable, automated system
                that improves transparency, organization, and decision-making for future boards.
              </p>
            </div>

            {/* Buttons */}
            {/* <Button
              variant="secondary"
              size="lg"
              asChild
              className="self-end mt-auto px-6 py-3 text-base font-semibold rounded-md
                        shadow-sm hover:shadow-md"
            >
              <a href="..." target="_blank" rel="noopener noreferrer">
                Github
              </a>
            </Button> */}

            <Button
              variant="secondary"
              size="lg"
              asChild
              className="self-end px-6 py-3 text-base font-semibold rounded-md
                        shadow-sm hover:shadow-md mt-auto"
            >
              <a href="#/projects/sea-portal" target="_blank" rel="noopener noreferrer">
                Details
              </a>
            </Button>
          </div>
        </div>

        {/* UAV COMPETITION project card */}
        <div key="block-7" className="relative w-full h-full">
          {/* Background image (one layer below the card) */}
          <img
            alt="SUAS UAV"
            src="/drone.jpg"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-60 no-drag"
            loading="eager"
            decoding="sync"
          />

          {/* Foreground card */}
          <div
            className="relative z-10 h-full select-none rounded-lg shadow-soft p-6 flex flex-col
                      bg-foreground/5 border border-foreground/30 glass-card backdrop-blur-sm"
          >
            <h1 className="text-2xl font-black font-poppins mb-4">UAV COMPETITION</h1>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-sm text-justify leading-loose">
                I helped develop the computer vision system for our SUAS competition UAV,
                creating software that identified objects and supported the team’s
                autonomous mission tasks.
              </p>
            </div>

            {/* Buttons */}
            <Button
              variant="secondary"
              size="lg"
              asChild
              className="self-end mt-auto px-6 py-3 text-base font-semibold rounded-md
                        shadow-sm hover:shadow-md"
            >
              <a href="https://github.com/MarcCruzs/ODLC_Machine_Inferencing_System" target="_blank" rel="noopener noreferrer">
                Github
              </a>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              asChild
              className="self-end mt-5 px-6 py-3 text-base font-semibold rounded-md
                        shadow-sm hover:shadow-md"
            >
              <a href="https://www.bronco-astra.com/" target="_blank" rel="noopener noreferrer">
                Details
              </a>
            </Button>
          </div>
        </div>

        {/* ================== LINK CARDS ================== */}

        <div key="link-1">
          <LinkCard
            title="GITHUB"
            to="https://github.com/MarcCruzs"
            bgClass="bg-card"
            hoverClass="hover:bg-[hsl(var(--brand-github-hover))]"
            hoverFgClass="hover:text-[hsl(var(--brand-github-hover-fg))]"
            className="glass-card"
          />
        </div>

        <div key="link-2">
          <LinkCard
            title="LINKEDIN"
            to="https://www.linkedin.com/in/marc-cruz13/"
            bgClass="bg-card"
            hoverClass="hover:bg-[hsl(var(--brand-linkedin-hover))]"
            hoverFgClass="hover:text-[hsl(var(--brand-linkedin-hover-fg))]"
            className="glass-card"
          />
        </div>

        <div key="link-3">
          <LinkCard
            title="RESUME"
            to="https://docs.google.com/document/d/1v0CnThSdvPtlZdpv-VHKAyzF9BMCvYfGqxP7-imTgjE/edit?usp=sharing"
            bgClass="bg-card"
            className="glass-card" 
          />
        </div>

        <div key="link-4">
          <LinkCard
            title="MORE PROJECTS"
            to="/projects"
            bgClass="bg-card"
            className="glass-card"
          />
        </div>

        {/* ================== HERO IMAGES ================== */}

        <div
          key="hero"
          className="rounded-lg shadow-soft overflow-hidden bg-foreground/5 border-foreground/30 glass-card"
        >
          <img
            alt="Marc Cruz"
            src={"/pfp.jpg"}
            className="w-full h-full rounded-md object-cover no-drag"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
        </div>

        <div
          key="hero-2"
          className="rounded-lg shadow-soft flex bg-foreground/5 border-foreground/30 glass-card"
        >
          <img
            alt="Earth Observations taken during Expedition Four (NASA ID: iss004e11807)"
            src={"/sky.jpg"}
            className="rounded-md w-full h-full object-cover no-drag"
            loading="eager"
            decoding="sync"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
          />
        </div>

        <div
          key="hero-3"
          className="rounded-lg shadow-soft flex bg-foreground/5 border-foreground/30 glass-card"
        >
          <img
            alt="Palace of Fine Arts"
            src={"/img3.JPG"}
            className="rounded-md w-full h-full object-center object-cover no-drag"
            loading="eager"
            decoding="sync"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
          />
        </div>

        <div
          key="hero-4"
          className="rounded-lg shadow-soft flex bg-foreground/5 border-foreground/30 glass-card"
        >
          <img
            alt="White lotus flower"
            src={"/img4.png"}
            className="rounded-md w-full h-full object-cover no-drag"
            loading="eager"
            decoding="sync"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
          />
        </div>

        <div
          key="hero-5"
          className="rounded-lg shadow-soft flex bg-foreground/5 border-foreground/30 glass-card"
        >
          <img
            alt="UAV"
            src={"/drone.jpg"}
            className="rounded-md w-full h-full object-cover no-drag"
            loading="eager"
            decoding="sync"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
          />
        </div>

          {/* ================== CONTACT SECTION ================== */}


        {/* Contact block */}
        <div
          id="contact"
          key="block-8"
          className="select-none rounded-lg shadow-soft p-6 flex flex-col bg-foreground/5 border border-foreground/30 glass-card"
        >
          <h2 className="text-2xl font-black font-poppins mb-3">
            Get in Touch
          </h2>
          <p className="text-sm leading-relaxed max-w-md">
            I’m open to collaborating on software engineering and data engineering work. 
            From backend systems and ETL pipelines to internal tools that support teams.
          </p>
        </div>

        {/* Email link card */}
        <div key="link-5">
          <LinkCard
            title="EMAIL"
            to="mailto:your.email@example.com"
            bgClass="bg-card"
            className="glass-card"
          />
        </div>

        {/* Contact hero image */}
        <div
          key="hero-6"
          className="rounded-lg shadow-soft flex bg-foreground/5 border-foreground/30 glass-card"
        >
          <img
            alt="Umbrella Man"
            src={"/img6.jpg" /* or reuse one of your existing images */}
            className="rounded-md w-full h-full object-cover no-drag"
            loading="eager"
            decoding="sync"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
          />
        </div>


      </ResponsiveGridLayout>
      )}
    </section>
  );
}