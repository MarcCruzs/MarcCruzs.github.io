// src/context/ThemeContext.tsx (or similar)

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Sun, Moon } from "akar-icons";

export type ThemeClass = "" | "dark";
const THEMES: ThemeClass[] = ["", "dark"];

type ThemeLabel = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeClass;      // "" or "dark"
  idx: number;            // index in THEMES
  label: ThemeLabel;      // "light" or "dark"
  icon: JSX.Element;      // Sun or Moon
  setTheme: (t: ThemeClass) => void;
  cycle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function toThemeKey(name: ThemeClass): ThemeLabel {
  return name === "dark" ? "dark" : "light";
}

function applyThemeToDom(name: ThemeClass) {
  if (typeof document === "undefined") return;

  // Remove all known theme classes
  THEMES.forEach((t) => {
    if (t) document.documentElement.classList.remove(t);
  });

  // Add the new one if not empty ("" is light / default)
  if (name) {
    document.documentElement.classList.add(name);
  }

  // Optional, if you want a data attribute for other tooling
  document.documentElement.setAttribute("data-theme", name || "default");

  // Persist
  window.localStorage.setItem("theme-name", name);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [idx, setIdx] = useState(0);

  // On mount, choose initial theme
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("theme-name") as ThemeClass | null;

    let initialTheme: ThemeClass = "";

    if (stored && THEMES.includes(stored)) {
      initialTheme = stored;
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      initialTheme = "dark";
    }

    const initialIndex = THEMES.indexOf(initialTheme);
    const safeIndex = initialIndex >= 0 ? initialIndex : 0;
    const safeTheme = THEMES[safeIndex];

    setIdx(safeIndex);
    applyThemeToDom(safeTheme);
  }, []);

  const setTheme = (t: ThemeClass) => {
    const index = THEMES.indexOf(t);
    const safeIndex = index >= 0 ? index : 0;
    const safeTheme = THEMES[safeIndex];

    setIdx(safeIndex);
    applyThemeToDom(safeTheme);
  };

  const cycle = () => {
    setTheme(THEMES[(idx + 1) % THEMES.length]);
  };

  const theme = THEMES[idx];
  const label = toThemeKey(theme);
  const icon = label === "dark" ? <Moon /> : <Sun />;

  const value = useMemo(
    () => ({ theme, idx, label, icon, setTheme, cycle }),
    [theme, idx, label, icon]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
