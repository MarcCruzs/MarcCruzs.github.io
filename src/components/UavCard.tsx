export function UavCard() {
  return (
    <div className="bento-card h-full p-5 sm:p-6 flex flex-col">
      <h3 className="text-lg sm:text-xl font-black uppercase text-[#a0b4c8] mb-3">
        UAV COMPETITION
      </h3>
      <p className="text-xs text-theme-muted leading-relaxed mb-auto">
        I helped develop the computer vision system for our SUAS competition UAV, creating software
        that identified objects and supported the team's autonomous mission tasks.
      </p>
      <div className="flex gap-2 mt-5">
        <a
          href="https://github.com/marccruzs"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border border-[--c-border] text-theme text-xs font-semibold rounded-md hover:border-[--c-border-hover] hover:scale-105 transition-all duration-200 active:scale-95"
        >
          Github
        </a>
        <button className="px-4 py-2 border border-[--c-border] text-theme text-xs font-semibold rounded-md hover:border-[--c-border-hover] hover:scale-105 transition-all duration-200 active:scale-95">
          Details
        </button>
      </div>
    </div>
  );
}
