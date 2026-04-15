import { PhotoCard } from "@/components/PhotoCard";
import { PreviouslyCard } from "@/components/PreviouslyCard";
import { HeroCard } from "@/components/HeroCard";
import { FeaturedWorksCard } from "@/components/FeaturedWorksCard";
import { ImgCard } from "@/components/ImgCard";
import { NasaEtlCard } from "@/components/NasaEtlCard";
import { SeaPortalCard } from "@/components/SeaPortalCard";
import { UavCard } from "@/components/UavCard";
import { MoreProjectsBar } from "@/components/MoreProjectsBar";
import { GetInTouchCard } from "@/components/GetInTouchCard";
import { LinkBar } from "@/components/LinkBar";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-2">

      {/* ── Row 1: Hero + Photo + Previously ────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2" style={{ minHeight: "280px" }}>
        <div className="md:col-span-3 min-h-[260px] md:min-h-0">
          <HeroCard />
        </div>
        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-2 min-h-[180px] md:min-h-0">
          <PhotoCard />
          <PreviouslyCard />
        </div>
      </div>

      <div className="h-3 sm:h-4" />

      {/* ── Row 2: Featured Works + Image ───────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <div className="md:col-span-2 min-h-[200px] md:min-h-[220px]">
          <FeaturedWorksCard />
        </div>
        <div className="md:col-span-3">
          <ImgCard
            src="/images/palace-of-fine-arts.jpg"
            alt="Palace of Fine Arts"
            fallback="linear-gradient(135deg, #1a2535 0%, #2a3545 100%)"
            minH="min-h-[180px] md:min-h-[220px]"
          />
        </div>
      </div>

      {/* ── Row 3: NASA Image + NASA ETL ────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <div className="md:col-span-3">
          <ImgCard
            src="/images/nasa-sky.jpg"
            alt="NASA atmospheric data"
            fallback="linear-gradient(180deg, #0a0a1a 0%, #1a2535 100%)"
            minH="min-h-[160px] md:min-h-[200px]"
          />
        </div>
        <div className="md:col-span-2 min-h-[160px] md:min-h-0">
          <NasaEtlCard />
        </div>
      </div>

      {/* ── Row 4: SEA Portal + Map ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="min-h-[200px]">
          <SeaPortalCard />
        </div>
        <ImgCard
          src="/images/cpp-campus-map.jpg"
          alt="CPP Campus Map"
          fallback="linear-gradient(135deg, #1a2a1a 0%, #2a3a2a 100%)"
          minH="min-h-[160px] sm:min-h-0"
        />
      </div>

      {/* ── Row 5: Drone + UAV ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <ImgCard
          src="/images/uav-drone.jpg"
          alt="UAV Drone"
          fallback="linear-gradient(180deg, #1a2535 0%, #2a3a4a 100%)"
          minH="min-h-[160px] sm:min-h-0"
        />
        <div className="min-h-[200px]">
          <UavCard />
        </div>
      </div>

      {/* ── More Projects ────────────────────────────────────────────────── */}
      <MoreProjectsBar />

      <div className="h-3 sm:h-4" />

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <div className="md:col-span-2 min-h-[160px] md:min-h-0">
          <GetInTouchCard />
        </div>
        <div className="md:col-span-3">
          <ImgCard
            src="/images/umbrella.jpg"
            alt="Person with umbrella"
            fallback="linear-gradient(135deg, #1a1a2a 0%, #2a1a2a 100%)"
            minH="min-h-[160px] md:min-h-0"
          />
        </div>
      </div>

      {/* ── Link bars ────────────────────────────────────────────────────── */}
      <LinkBar label="EMAIL" href="mailto:marc@marccruzs.com" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <LinkBar label="RESUME" href="/resume.pdf" />
        <LinkBar label="LINKEDIN" href="https://linkedin.com/in/marccruzs" />
        <LinkBar label="GITHUB" href="https://github.com/marccruzs" />
      </div>
    </div>
  );
}
