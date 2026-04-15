export function SeaPortalCard() {
  return (
    <div className="bento-card h-full p-5 sm:p-6 flex flex-col">
      <h3 className="text-lg sm:text-xl font-black uppercase text-[#a0c878] mb-3">SEA PORTAL</h3>
      <p className="text-xs text-theme-muted leading-relaxed mb-auto">
        I built the SEA Portal to streamline how the club manages members, events, and internal
        data. It replaces manual processes with a scalable, automated system that improves
        transparency, organization, and decision-making for future boards.
      </p>
      <button className="mt-5 self-start px-4 py-2 border border-[--c-border] text-theme text-xs font-semibold rounded-md hover:border-[--c-border-hover] hover:scale-105 transition-all duration-200 active:scale-95">
        Details
      </button>
    </div>
  );
}
