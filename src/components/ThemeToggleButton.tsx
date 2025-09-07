// components/ThemeCycleButton.tsx
import { useTheme } from "@/utils/ThemeContext";

export function ThemeCycleButton() {
  const { cycle, label, icon } = useTheme();
  return (
    <button
      onClick={cycle}
      className="rounded-full border border-[hsl(var(--border))] px-1.5 py-1.5 inline-flex items-center gap-2 text-[hsl(var(--foreground))]"
      title={`Theme: ${label}`}
      aria-label="Cycle color theme"
    >
      <span className="text-current">{icon}</span>
    </button>
  );
}
