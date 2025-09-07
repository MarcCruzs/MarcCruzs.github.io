import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Sun, Moon, Leaf } from "akar-icons";
import { Apple, Banana, Citrus } from "lucide-react";

export type ThemeClass = "" | "dark" | "green" | "dichromacy" | "trichromacy" | "monochromacy"; 
export const THEMES: ThemeClass[] = ["", "dark", "green", "dichromacy", "trichromacy", "monochromacy"];

export function toThemeKey(name: ThemeClass) {
  return name ? name.replace(/^theme-/, "") : "light";
}

const ICON_BY_THEME: Record<string, JSX.Element> = {
  default: <Sun />,
  green: <Leaf  />,
  blue: <Sun />,
  dark: <Moon />,
  dichromacy: <Apple></Apple>,
  trichromacy: <Banana></Banana>,
  monochromacy: <Citrus></Citrus>

};

type ThemeCtx = {
  theme: ThemeClass;
  idx: number;
  label: string;
  icon: JSX.Element;
  setTheme: (t: ThemeClass) => void;
  cycle: () => void;
};

const Ctx = createContext<ThemeCtx | null>(null);

function applyThemeToDom(name: ThemeClass) {
  if (typeof document === "undefined") return;
  
  THEMES.forEach(t => t && document.documentElement.classList.remove(t));
  if (name) document.documentElement.classList.add(name);
  localStorage.setItem("theme-name", name);
  document.documentElement.setAttribute("data-theme", name || "default");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [idx, setIdx] = useState(0);

  
  useEffect(() => {
    const saved = (localStorage.getItem("theme-name") || "") as ThemeClass;
    const startIdx = Math.max(0, THEMES.indexOf(saved));
    setIdx(startIdx);
    applyThemeToDom(saved);
  }, []);

  const setTheme = (t: ThemeClass) => {
    const i = Math.max(0, THEMES.indexOf(t));
    setIdx(i);
    applyThemeToDom(t);
  };

  const cycle = () => setTheme(THEMES[(idx + 1) % THEMES.length]);

  const theme = THEMES[idx];
  const label = toThemeKey(theme);
  const icon = ICON_BY_THEME[label] ?? ICON_BY_THEME.default;

  const value = useMemo(
    () => ({ theme, idx, label, icon, setTheme, cycle }),
    [theme, idx, label, icon]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useTheme must be used within ThemeProvider");
  return v;
}
