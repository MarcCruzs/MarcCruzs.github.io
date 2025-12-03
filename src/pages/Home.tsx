import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
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
    
    // { i: "spacer-1", x: 3, y: 6, w: 3, h: 2, minW: 1, minH: 1 },
    { i: "spacer-2", x: 3, y: 4, w: 3, h: 2, minW: 1, minH: 1 },

    // 3 cols
    { i: "block", x: 0, y: 1, w: 2, h: 6, minW: 1, minH: 3 },
    { i: "block-2", x: 2, y: 6, w: 1, h: 6, minW: 1, minH: 2 },
    { i: "block-3", x: 0, y: 5, w: 1, h: 4, minW: 1, minH: 1 },
    { i: "block-4", x: 3, y: 2, w: 1, h: 3, minW: 1, minH: 3 },
    { i: "block-5", x: 0, y: 2, w: 2, h: 4, minW: 2, minH: 3 },
    { i: "block-6", x: 0, y: 7, w: 1, h: 6, minW: 1, minH: 2 },
    { i: "block-7", x: 2, y: 8, w: 1, h: 6, minW: 1, minH: 2 },

    { i: "link-1", x: 0, y: 9, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-2", x: 0, y: 20, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-3", x: 0, y: 9, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-4", x: 0, y: 5, w: 1, h: 1, minW: 1, minH: 1 },

    { i: "hero",  x: 2, y: 0, w: 1, h: 3, minW: 1, minH: 3 },
    { i: "hero-2",  x: 0, y: 6, w: 2, h: 6, minW: 1, minH: 3 },
    { i: "hero-3",  x: 1, y: 4, w: 2, h: 5, minW: 1, minH: 3 },
    { i: "hero-4",  x: 2, y: 7, w: 2, h: 6, minW: 1, minH: 3 },
    { i: "hero-5",  x: 0, y: 8, w: 2, h: 6, minW: 1, minH: 3 },


  ],

  md: [
    // same 3-col logic on md
    { i: "block", x: 3, y: 1, w: 2, h: 3, minW: 2, minH: 3 },
    { i: "block-2", x: 1, y: 2, w: 1, h: 2, minW: 1, minH: 2 },
    { i: "block-3", x: 1, y: 5, w: 1, h: 2, minW: 1, minH: 1 },

    { i: "link-1", x: 0, y: 1, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-2", x: 0, y: 2, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-3", x: 0, y: 3, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "link-4", x: 1, y: 0, w: 1, h: 1, minW: 1, minH: 1 },

    { i: "hero",  x: 0, y: 0, w: 1, h: 3, minW: 1, minH: 3 },
    { i: "hero-2",  x: 3, y: 1, w: 1, h: 3, minW: 1, minH: 3 },
    { i: "hero-3",  x: 1, y: 10, w: 1, h: 3, minW: 1, minH: 3 },

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
        className="layout"
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

        
        <div
          key="spacer-1"
          className="pointer-events-none select-none"
        >
        </div> 
       

        <div
          key="spacer-2"
          className="pointer-events-none select-none"
        >
          {/* empty on purpose */}
        </div>

        <div
          key="block"
          className="select-none rounded-lg shadow-soft p-6 flex flex-col bg-foreground/5 border border-foreground/30 glass-card"
        >
          <h1 className="text-8xl font-black font-poppins mb-4">MARC CRUZ</h1>

          <h2 className="text-3xl font-semibold text-foreground/90 leading-snug mb-8 ">
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
            className="self-start mt-auto px-6 py-3 text-base font-semibold rounded-md
                      shadow-sm hover:shadow-md"
          >
            <a
              href="..."
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>
          </Button>

        </div>


          

{/* 
        <div key="block-5" className="rounded-lg shadow-soft p-6 flex flex-col bg-foreground/5 border-foreground/30 glass-card">
          <p className="text-muted-foreground mb-4 no-drag">
            Most recent experience on NASA’s NAMS-2 program, building pipelines for aviation data. Comfortable with Pandas, NumPy, SQL, Rust, Docker, and Git. I care about clear architecture, testing, and maintainable code.
          </p>
        </div> */}

        <div
          key="block-4"
          className="select-none rounded-lg border bg-foreground/5 overflow-hidden h-full flex flex-col border-foreground/30 glass-card"
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



        <div key="block-3" className="rounded-lg  shadow-soft p-6 flex flex-col bg-foreground/5 border-foreground/30 glass-card">
          <h3 className="text-3xl font-black font-poppins mb-auto">FEATURED PROJECTS</h3>
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
            className="text-[hsl(var(--brand-github-fg))] glass-card"
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
            className="text-[hsl(var(--brand-linkedin-fg))] glass-card"
          />
        </div>
{/* 
        <div key="link-3">
          <LinkCard
            title="RESUME"
            to="https://docs.google.com/document/d/1v0CnThSdvPtlZdpv-VHKAyzF9BMCvYfGqxP7-imTgjE/edit?usp=sharing"
            bgClass="bg-[hsl(var(--cream-bg))]"
            fgClass="text-[hsl(var(--cream-fg))]"
            hoverClass="hover:bg-[hsl(var(--cream-hover))] hover:border-[hsl(var(--cream-fg))]"
            hoverFgClass="hover:text-[hsl(var(--cream-hover-fg))]"
            borderClass="border-[hsl(var(--cream-fg))]"
            className="text-[hsl(var(--cream-fg))] glass-card" 
          />
        </div> */}

        <div key="link-4">
          <LinkCard
            title="PROJECTS"
            to="/projects"
            bgClass="bg-card"
            className="glass-card"
          />
        </div>

        <div
          key="block-2"
          className="select-none rounded-lg shadow-soft p-6 flex flex-col bg-foreground/5 border border-foreground/30 glass-card"
        >
          <h1 className="text-2xl font-black font-poppins mb-4">PROJECT NAME</h1>

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
            className="self-end mt-auto px-6 py-3 text-base font-semibold rounded-md
                      shadow-sm hover:shadow-md"
          >
            <a
              href="..."
              target="_blank"
              rel="noopener noreferrer"
            >
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
            <a
              href="..."
              target="_blank"
              rel="noopener noreferrer"
            >
              Details
            </a>
          </Button>

        </div>

        <div key="hero" className="rounded-lg shadow-soft overflow-hidden bg-foreground/5 border-foreground/30 glass-card">
            <img
              alt="Marc Cruz"
              src={"/pfp.jpg"}
              className="w-full h-full rounded-md object-cover no-drag"

              loading="eager"          
              fetchPriority="high"    
              decoding="async"
            />
        </div>
        
        <div key="hero-2" className="rounded-lg  shadow-soft flex bg-foreground/5 border-foreground/30 glass-card">
          <img
            alt="White lotus flower"
            src={"/img2.JPG"}
            className="rounded-md w-full h-full object-cover no-drag"

            loading="eager"            
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
          />
        </div>

        <div key="hero-3" className="rounded-lg  shadow-soft flex bg-foreground/5 border-foreground/30 glass-card">
          <img
            alt="Palace of Fine Arts"
            src={"/img3.JPG"}
            className="rounded-md w-full h-full object-center object-cover no-drag"

            loading="eager"            
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
          />
        </div>

        <div key="hero-4" className="rounded-lg  shadow-soft flex bg-foreground/5 border-foreground/30 glass-card">
          <img
            alt="White lotus flower"
            src={"/img4.jpg"}
            className="rounded-md w-full h-full object-cover no-drag"

            loading="eager"            
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
          />
        </div>

        <div key="hero-5" className="rounded-lg  shadow-soft flex bg-foreground/5 border-foreground/30 glass-card">
          <img
            alt="White lotus flower"
            src={"/img5.JPG"}
            className="rounded-md w-full h-full object-cover no-drag"

            loading="eager"            
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
          />
        </div>
        
<div
          key="block-6"
          className="select-none rounded-lg shadow-soft p-6 flex flex-col bg-foreground/5 border border-foreground/30 glass-card"
        >
          <h1 className="text-2xl font-black font-poppins mb-4">PROJECT NAME</h1>

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
            className="self-end mt-auto px-6 py-3 text-base font-semibold rounded-md
                      shadow-sm hover:shadow-md"
          >
            <a
              href="..."
              target="_blank"
              rel="noopener noreferrer"
            >
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
            <a
              href="..."
              target="_blank"
              rel="noopener noreferrer"
            >
              Details
            </a>
          </Button>

        </div>

        <div
          key="block-7"
          className="select-none rounded-lg shadow-soft p-6 flex flex-col bg-foreground/5 border border-foreground/30 glass-card"
        >
          <h1 className="text-2xl font-black font-poppins mb-4">PROJECT NAME</h1>

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
            className="self-end mt-auto px-6 py-3 text-base font-semibold rounded-md
                      shadow-sm hover:shadow-md"
          >
            <a
              href="..."
              target="_blank"
              rel="noopener noreferrer"
            >
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
            <a
              href="..."
              target="_blank"
              rel="noopener noreferrer"
            >
              Details
            </a>
          </Button>

        </div>

      </ResponsiveGridLayout>
    </section>
  );
}
