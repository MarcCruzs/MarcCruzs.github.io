import { LinkCard } from "@/components/LinkCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { HashLink } from "react-router-hash-link";

const ResponsiveGridLayout = WidthProvider(Responsive);

const COLS = {lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 };

const initialLayouts: Layouts = {
  lg: [
    // SPACERS
    // { i: "spacer-1", x: 3, y: 6, w: 3, h: 2, minW: 1, minH: 1 },
    { i: "spacer-2", x: 3, y: 4,  w: 3, h: 2, minW: 1, minH: 1 },
    { i: "spacer-3", x: 3, y: 30, w: 3, h: 2, minW: 1, minH: 1 },

    // BLOCKS
    { i: "block",   x: 0, y: 0,  w: 3, h: 5, minW: 1, minH: 3 },
    { i: "block-2", x: 0, y: 4,  w: 2, h: 5, minW: 1, minH: 2 },
    { i: "block-3", x: 2, y: 4,  w: 1, h: 10, minW: 1, minH: 1 },
    { i: "block-4", x: 0, y: 5,  w: 2, h: 5, minW: 1, minH: 3 },
    { i: "block-5", x: 2, y: 4,  w: 1, h: 10, minW: 1, minH: 3 },
    { i: "block-6", x: 0, y: 7,  w: 2, h: 5, minW: 1, minH: 2 },
    { i: "block-7", x: 2, y: 8,  w: 2, h: 5, minW: 1, minH: 2 },

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
    { i: "hero-2", x: 0, y: 6,  w: 2, h: 10, minW: 1, minH: 3 },
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
    { i: "block",   x: 0, y: 0,  w: 1, h: 8, minW: 1, minH: 4 },
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
    { i: "block",   x: 0, y: 0,  w: 1, h: 8, minW: 1, minH: 4 },
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

export default function SeaPortal() {
  const [layouts, setLayouts] = useState<Layouts>(initialLayouts);
  const DRAGGABLE_BREAKPOINTS = new Set(["lg", "md", "sm"]);

  const [isDragEnabled, setIsDragEnabled] = useState(true);

  const [rowHeight, setRowHeight] = useState(0);

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
        // isResizable={false}
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

        {/* ================== BLOCKS (CONTENT CARDS) ================== */}

        {/* Main hero / intro */}
        <div
          key="block"
          className="select-none rounded-lg shadow-soft p-6 flex flex-col bg-foreground/5 border border-foreground/30 glass-card"
        >
          <h1 className="text-8xl font-black font-poppins mb-4">[PROJECT_NAME]</h1>

          <h2 className="text-3xl font-semibold text-foreground/90 leading-snug mb-8 ">
            [PUNCHY DESC]
          </h2>

          {/* Newspaper column */}
          <div className="space-y-4 max-w-lg">
            <p className="text-xs text-muted-foreground text-justify leading-loose">
              [REAL DESCRIPTION] My experience spans NASA ETL pipelines, distributed processing systems, and
              data-intensive web platforms. I focus on building systems that remain
              robust and maintainable as they grow.
            </p>
          </div>
        </div>

        {/* Featured projects intro */}
        <div
          id="featured-projects"
          key="block-2"
          className="rounded-lg shadow-soft p-6 flex flex-col bg-foreground/5 border-foreground/30 glass-card"
        >
          <h3 className="text-3xl font-black font-poppins mb-auto">THE PROBLEM</h3>
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

        <div
          id="featured-projects"
          key="block-3"
          className="rounded-lg shadow-soft p-6 flex flex-col bg-foreground/5 border-foreground/30 glass-card"
        >
          <h3 className="text-3xl font-black font-poppins mb-auto">THE ENVIRONMENT</h3>
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

        <div
          id="featured-projects"
          key="block-4"
          className="rounded-lg shadow-soft p-6 flex flex-col bg-foreground/5 border-foreground/30 glass-card"
        >
          <h3 className="text-3xl font-black font-poppins mb-auto">THE ACTIONS</h3>
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

        <div
          id="featured-projects"
          key="block-5"
          className="rounded-lg shadow-soft p-6 flex flex-col bg-foreground/5 border-foreground/30 glass-card"
        >
          <h3 className="text-3xl font-black font-poppins mb-auto">DETAILS</h3>
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

        <div
          key="block-6"
          className="rounded-lg shadow-soft p-6 flex flex-col bg-foreground/5 border-foreground/30 glass-card"
        >
          <h3 className="text-3xl font-black text-muted-foreground font-poppins mb-auto">THE RESULTS</h3>
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

        <div
          id="featured-projects"
          key="block-7"
          className="rounded-lg shadow-soft p-6 flex flex-col bg-foreground/5 border-foreground/30 glass-card"
        >
          <h3 className="text-3xl font-black font-poppins mb-auto">THE LESSONS</h3>
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



        {/* ================== LINK CARDS ================== */}

        <div key="link-4">
          <LinkCard
            title="MORE PROJECTS"
            to="/projects"
            bgClass="bg-card"
            className="glass-card"
          />
        </div>

        {/* ================== HERO IMAGES ================== */}

        {/* <div
          key="hero"
          className="rounded-lg shadow-soft overflow-hidden bg-foreground/5 border-foreground/30 glass-card"
        >
          <img
            alt="Marc Cruz"
            src={"/pfp.jpg"}
            className="w-full h-full rounded-md object-cover no-drag"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div> */}

        <div
          key="hero-2"
          className="rounded-lg shadow-soft flex bg-foreground/5 border-foreground/30 glass-card"
        >
          <img
            alt="White lotus flower"
            src={"/img2.JPG"}
            className="rounded-md w-full h-full object-cover no-drag"
            loading="eager"
            decoding="async"
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
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
          />
        </div>

        <div
          key="hero-4"
          className="rounded-lg shadow-soft flex bg-foreground/5 border-foreground/30 glass-card"
        >
          <img
            alt="White lotus flower"
            src={"/img4.jpg"}
            className="rounded-md w-full h-full object-cover no-drag"
            loading="eager"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
          />
        </div>

        <div
          key="hero-5"
          className="rounded-lg shadow-soft flex bg-foreground/5 border-foreground/30 glass-card"
        >
          <img
            alt="White lotus flower"
            src={"/img5.JPG"}
            className="rounded-md w-full h-full object-cover no-drag"
            loading="eager"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
          />
        </div>




      </ResponsiveGridLayout>

    </section>
  );
}