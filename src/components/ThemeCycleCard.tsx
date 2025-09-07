// components/ThemeCycleCard.tsx
import { cloneElement, isValidElement } from "react";
import { useTheme } from "@/utils/ThemeContext";
import { Tetragon } from "akar-icons";

export function ThemeCycleCard() {
  const { cycle, label, icon } = useTheme();

  return (
    <button
      onClick={cycle}
      className="
        w-full h-full rounded-lg
        border border-[hsl(var(--border))]
        bg-[hsl(var(--card))] text-[hsl(var(--foreground))]
        shadow-soft
        flex flex-col items-center justify-center gap-3
        select-none
        hover:bg-[hsl(var(--muted))]
        transition-colors

      "
      title={`Theme: ${label}`}
      aria-label="Cycle color theme"
      onPointerDown={(e) => e.stopPropagation()} /* avoid RGL drag start */
    >
      <span className="text-current">{<Tetragon strokeWidth={2} size={128} />}</span>
    </button>
  );
}
