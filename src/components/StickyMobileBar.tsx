interface StickyMobileBarProps {
  visible: boolean;
}

export function StickyMobileBar({ visible }: StickyMobileBarProps) {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3 transition-all duration-300"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-background) 95%, transparent)",
        borderTop: "1px solid var(--color-border)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        boxSizing: "border-box",
      }}
    >
      <a
        href="#contact"
        className="btn-terracotta block w-full max-w-xs mx-auto text-center px-4 py-2.5 rounded-lg text-sm font-semibold"
        data-umami-event="cta-sticky-click"
      >
        Get in Touch
      </a>
    </div>
  );
}
