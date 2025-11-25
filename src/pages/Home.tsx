import { useState } from "react";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { LinkCard } from "@/components/LinkCard";
import { ThemeCycleCard } from "@/components/ThemeCycleCard";
import { Dot, Orbit, Rocket, SatelliteDish, Users2} from "lucide-react";
import { Plane } from "akar-icons"
const ResponsiveGridLayout = WidthProvider(Responsive);

// 3 columns on lg/md; 2 on sm; 1 on xs/xxs
const COLS = {lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 };
const ICON_COLOR = "#ffffff"

const initialLayouts: Layouts = {
  lg: [
    // 3 cols
    { i: "block", x: 3, y: 1, w: 2, h: 4, minW: 2, minH: 3 },
    { i: "block-2", x: 1, y: 5, w: 1, h: 2, minW: 1, minH: 2 },
    { i: "block-3", x: 0, y: 5, w: 1, h: 5, minW: 3, minH: 1 },
    { i: "block-4", x: 0, y: 2, w: 1, h: 3, minW: 1, minH: 3 },

    { i: "link-1", x: 0, y: 4, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-2", x: 0, y: 5, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-3", x: 0, y: 6, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-4", x: 1, y: 6, w: 1, h: 1, minW: 1, minH: 1 },

    { i: "hero",  x: 0, y: 0, w: 1, h: 3, minW: 1, minH: 3 },
    { i: "hero-2",  x: 0, y: 5, w: 1, h: 3, minW: 1, minH: 3 },
    { i: "hero-3",  x: 1, y: 4, w: 2, h: 5, minW: 1, minH: 3 },

    { i: "spacer-1", x: 3, y: 3, w: 2, h: 2, minW: 1, minH: 1 },
    { i: "spacer-2", x: 3, y: 4, w: 3, h: 2, minW: 1, minH: 1 },


  ],

  md: [
    // same 3-col logic on md
    { i: "block", x: 3, y: 1, w: 2, h: 3, minW: 2, minH: 3 },
    { i: "block-2", x: 1, y: 2, w: 1, h: 2, minW: 1, minH: 2 },
    { i: "block-3", x: 1, y: 5, w: 3, h: 2, minW: 3, minH: 1 },

    { i: "link-1", x: 0, y: 1, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-2", x: 0, y: 2, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-3", x: 0, y: 3, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-4", x: 1, y: 0, w: 1, h: 1, minW: 1, minH: 1 },

    { i: "hero",  x: 0, y: 0, w: 1, h: 3, minW: 1, minH: 3 },
    { i: "hero-2",  x: 3, y: 1, w: 1, h: 3, minW: 1, minH: 3 },
    { i: "hero-3",  x: 3, y: 1, w: 1, h: 3, minW: 1, minH: 3 },

    { i: "spacer-1", x: 2, y: 4, w: 2, h: 1, minW: 1, minH: 1 },

  ],

  sm: [
    { i: "block",   x: 0, y: 0, w: 2, h: 3, minW: 2, minH: 2 },
    { i: "block-2", x: 0, y: 7, w: 2, h: 2, minW: 2, minH: 2 },
    { i: "block-3", x: 1, y: 5, w: 3, h: 2, minW: 3, minH: 1 },

    // two-up tiles
    { i: "link-1",  x: 0, y: 9,  w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-2",  x: 1, y: 9,  w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-3",  x: 0, y: 10, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-4",  x: 1, y: 10, w: 1, h: 1, minW: 1, minH: 1 },

    { i: "hero",    x: 0, y: 3, w: 1, h: 4, minW: 1, minH: 4 },
    { i: "hero-2",  x: 1, y: 3, w: 1, h: 4, minW: 1, minH: 4 },
    { i: "hero-3",  x: 1, y: 3, w: 1, h: 4, minW: 1, minH: 4 },
  ],

  xs: [
    { i: "block",   x: 0, y: 0,  w: 1, h: 5, minW: 1, minH: 2 },
    { i: "block-2", x: 0, y: 7,  w: 1, h: 2, minW: 1, minH: 2 },
    { i: "block-3", x: 1, y: 5, w: 3, h: 2, minW: 3, minH: 1 },

    { i: "link-1",  x: 0, y: 9,  w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-2",  x: 0, y: 10, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-3",  x: 0, y: 11, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-4",  x: 0, y: 12, w: 1, h: 1, minW: 1, minH: 1 },

    { i: "hero",    x: 0, y: 1,  w: 1, h: 4, minW: 1, minH: 3 },
    { i: "hero-2",  x: 0, y: 13, w: 1, h: 3, minW: 1, minH: 3 },
    { i: "hero-3",  x: 0, y: 13, w: 1, h: 3, minW: 1, minH: 3 },
  ],

  xxs: [
    { i: "block",   x: 0, y: 0,  w: 1, h: 5, minW: 1, minH: 2 },
    { i: "hero",    x: 0, y: 3,  w: 1, h: 4, minW: 1, minH: 3 },
    { i: "block-2", x: 0, y: 7,  w: 1, h: 2, minW: 1, minH: 2 },
    { i: "link-1",  x: 0, y: 9,  w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-2",  x: 0, y: 10, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-3",  x: 0, y: 11, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-4",  x: 0, y: 12, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "hero-2",  x: 0, y: 13, w: 1, h: 3, minW: 1, minH: 3 },
    { i: "hero-3",  x: 0, y: 13, w: 1, h: 3, minW: 1, minH: 3 },
    { i: "block-3", x: 1, y: 15, w: 3, h: 2, minW: 3, minH: 1 },

  ],
};

export default function Home() {
  const [layouts, setLayouts] = useState<Layouts>(initialLayouts);
  const DRAGGABLE_BREAKPOINTS = new Set(["md"]);

  const [isDragEnabled, setIsDragEnabled] = useState(true);
  return (
    <section>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        cols={COLS}
        breakpoints={{ lg: 1024, md: 768, sm: 640, xs: 480, xxs: 0 }}
        rowHeight={67}
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

        <div
          key="spacer-1"
          className="pointer-events-none select-none"
        >
          {/* empty on purpose */}
        </div>

        <div
          key="spacer-2"
          className="pointer-events-none select-none"
        >
          {/* empty on purpose */}
        </div>

        <div key="block" className="rounded-lg bg-card shadow-soft p-6 flex flex-col">
          <h1 className="text-3xl font-bold">Hello, I'm Marc Cruz!</h1>
          <h1 className="text-3xl font-bold mb-5">I develop & build software.</h1>
          
          <p className="text-muted-foreground mb-4 no-drag">
            Most recent experience on NASA’s NAMS-2 program, building pipelines for aviation data. Comfortable with Pandas, NumPy, SQL, Rust, Docker, and Git. I care about clear architecture, testing, and maintainable code.
          </p>
        </div>

        <div key="block-4" className="font-bold rounded-lg bg-card shadow-soft p-6 flex flex-col">

          <p className="mb-4 no-drag">
            <i>Previously</i>
          </p>
          <div className="flex items-center gap-2 py-1">
            <Dot className="text-blue-500" size={32} strokeWidth={3} />
            <p className="text-sm">NASA NAMS-2 SWE Contractor</p>
          </div>
{/* 
          <div className="flex items-center gap-2 py-1">
            <Rocket className="w-5 h-5 text-green-500" />
            <p className="text-sm">NASA Ames - Intern</p>
          </div> */}

          <div className="flex items-center gap-2 py-1">
            <Dot className="text-purple-500" size={32} strokeWidth={3} />
            <p className="text-sm">President, Software Engineering Association</p>
          </div>

          <div className="flex items-center gap-2 py-1">
            <Dot className="text-orange-500" size={32} strokeWidth={3} />
            <p className="text-sm">UAS Object Detection Lead - CPP SUAS Team</p>
          </div>

        </div>

        <div key="block-3" className="rounded-lg bg-card shadow-soft p-6 flex flex-col">
          <p className="text-sm mt-auto font-bold">Featured Projects</p>
          <br></br>
          <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea</p>
          <br></br>
          <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea</p>
          
        </div>

        <div key="link-1">
          <LinkCard
            title="GITHUB"
            to="https://github.com/MarcCruzs"
            bgClass="bg-[hsl(var(--brand-github-bg))]"
            fgClass="text-[hsl(var(--brand-github-fg))]"
            hoverClass="hover:bg-[hsl(var(--brand-github-hover))]"
            hoverFgClass="hover:text-[hsl(var(--brand-github-hover-fg))]"
            borderClass="border-[hsl(var(--brand-github-fg))]"
            className="text-[hsl(var(--brand-github-fg))]"
            />
        </div>

        <div key="link-2">
          <LinkCard
            title="LINKEDIN"
            to="https://www.linkedin.com/in/marc-cruz13/"
            bgClass="bg-[hsl(var(--brand-linkedin-bg))]"
            fgClass="text-[hsl(var(--brand-linkedin-fg))]"
            hoverClass="hover:bg-[hsl(var(--brand-linkedin-hover))]"
            hoverFgClass="hover:text-[hsl(var(--brand-linkedin-hover-fg))]"
            borderClass="border-[hsl(var(--brand-linkedin-fg))]"
            className="text-[hsl(var(--brand-linkedin-fg))]"
          />
        </div>

        <div key="link-3">
          <LinkCard
            title="RESUME"
            to="https://docs.google.com/document/d/1v0CnThSdvPtlZdpv-VHKAyzF9BMCvYfGqxP7-imTgjE/edit?usp=sharing"
            bgClass="bg-[hsl(var(--cream-bg))]"
            fgClass="text-[hsl(var(--cream-fg))]"
            hoverClass="hover:bg-[hsl(var(--cream-hover))] hover:border-[hsl(var(--cream-fg))]"
            hoverFgClass="hover:text-[hsl(var(--cream-hover-fg))]"
            borderClass="border-[hsl(var(--cream-fg))]"
            className="text-[hsl(var(--cream-fg))]" 
          />
        </div>

        <div key="link-4">
          <LinkCard
            title="PROJECTS"
            to="/projects"
            bgClass="bg-card"
          />
        </div>

        <div
          key="block-2">
          <ThemeCycleCard></ThemeCycleCard>
          </div>

        <div key="hero" className="rounded-lg bg-card shadow-soft overflow-hidden">
            <img
              alt="Marc Cruz"
              src={"/pfp.jpg"}
              className="w-full h-full rounded-md object-cover no-drag"

              loading="eager"          
              fetchPriority="high"    
              decoding="async"
            />
        </div>
        
        <div key="hero-2" className="rounded-lg bg-card shadow-soft flex">
          <img
            alt="White lotus flower"
            src={"/img2.JPG"}
            className="rounded-md w-full h-full object-cover no-drag"

            loading="eager"            
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
          />
        </div>

        <div key="hero-3" className="rounded-lg bg-card shadow-soft flex">
          <img
            alt="El Nido's Beach"
            src={"/img3.JPG"}
            className="rounded-md w-full h-full object-center object-cover no-drag"

            loading="eager"            
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
          />
        </div>
      </ResponsiveGridLayout>
    </section>
  );
}
