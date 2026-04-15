export function PhotoCard() {
  return (
    <div
      className="bento-card h-full min-h-[140px]"
      style={{
        backgroundImage: "url('/images/marc-photo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundColor: "#2a3545",
      }}
    >
      <div className="w-full h-full bg-gradient-to-br from-slate-700/60 to-slate-900/60 flex items-end p-3">
        <span className="text-xs text-white/40">Marc Cruz</span>
      </div>
    </div>
  );
}
