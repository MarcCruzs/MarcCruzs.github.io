import { useState, useEffect, useRef } from "react";

interface A11yState {
  fontSize: number; // 0 = default, 1 = large, 2 = x-large
  highContrast: boolean;
  reduceMotion: boolean;
  dyslexiaFont: boolean;
  focusHighlight: boolean;
  lineHeight: boolean;
}

const defaults: A11yState = {
  fontSize: 0,
  highContrast: false,
  reduceMotion: false,
  dyslexiaFont: false,
  focusHighlight: false,
  lineHeight: false,
};

const STORAGE_KEY = "a11y-prefs";

function load(): A11yState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch {}
  return { ...defaults };
}

function save(state: A11yState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function applyToDOM(state: A11yState) {
  const html = document.documentElement;

  // Font size
  html.classList.remove("a11y-font-lg", "a11y-font-xl");
  if (state.fontSize === 1) html.classList.add("a11y-font-lg");
  if (state.fontSize === 2) html.classList.add("a11y-font-xl");

  // High contrast
  html.classList.toggle("a11y-high-contrast", state.highContrast);

  // Reduce motion
  html.classList.toggle("a11y-reduce-motion", state.reduceMotion);

  // Dyslexia font
  html.classList.toggle("a11y-dyslexia", state.dyslexiaFont);

  // Focus highlight
  html.classList.toggle("a11y-focus-highlight", state.focusHighlight);

  // Line height
  html.classList.toggle("a11y-line-height", state.lineHeight);
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(load);
  const panelRef = useRef<HTMLDivElement>(null);

  // Apply on mount and whenever state changes
  useEffect(() => {
    applyToDOM(state);
    save(state);
  }, [state]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const toggle = (key: keyof A11yState) => {
    setState((s) => ({ ...s, [key]: !s[key] }));
  };

  const cycleFontSize = () => {
    setState((s) => ({ ...s, fontSize: (s.fontSize + 1) % 3 }));
  };

  const resetAll = () => setState({ ...defaults });

  const fontLabels = ["Default", "Large", "X-Large"];

  return (
    <div
      ref={panelRef}
      className="fixed left-6 z-[9999] bottom-24 md:bottom-6"
    >
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Accessibility options"
        aria-expanded={open}
        className="transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundColor: "var(--color-primary)",
          color: "var(--color-primary-ink)",
          border: "2px solid hsl(30 60% 97% / 0.28)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px hsl(var(--shadow-color) / 0.25)",
          fontSize: 20,
        }}
      >
        {/* Universal accessibility icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4.5" r="2" />
          <path d="M12 7v5" />
          <path d="M8 9h8" />
          <path d="M9 17l3-5 3 5" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Accessibility settings"
          style={{
            position: "absolute",
            bottom: 60,
            left: 0,
            width: 280,
            borderRadius: 16,
            padding: 20,
            backgroundColor: "var(--color-surface-raised)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 12px 40px hsl(var(--shadow-color) / 0.18)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }}>
              Accessibility
            </h3>
            <button
              onClick={resetAll}
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--color-text-muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              Reset All
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Font Size */}
            <A11yOption
              label="Text Size"
              value={fontLabels[state.fontSize]}
              onClick={cycleFontSize}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7V4h16v3"/><path d="M12 4v16"/><path d="M8 20h8"/></svg>
              }
            />

            {/* High Contrast */}
            <A11yToggle
              label="High Contrast"
              active={state.highContrast}
              onToggle={() => toggle("highContrast")}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20" /><path d="M12 2a10 10 0 0 1 0 20" fill="currentColor"/></svg>
              }
            />

            {/* Reduce Motion */}
            <A11yToggle
              label="Reduce Motion"
              active={state.reduceMotion}
              onToggle={() => toggle("reduceMotion")}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              }
            />

            {/* Dyslexia Font */}
            <A11yToggle
              label="Dyslexia Font"
              active={state.dyslexiaFont}
              onToggle={() => toggle("dyslexiaFont")}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 20h16"/><path d="M7 4l5 12 5-12"/></svg>
              }
            />

            {/* Focus Highlight */}
            <A11yToggle
              label="Focus Highlights"
              active={state.focusHighlight}
              onToggle={() => toggle("focusHighlight")}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h6"/></svg>
              }
            />

            {/* Line Height */}
            <A11yToggle
              label="Increased Spacing"
              active={state.lineHeight}
              onToggle={() => toggle("lineHeight")}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10H3"/><path d="M21 6H3"/><path d="M21 14H3"/><path d="M21 18H3"/></svg>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function A11yToggle({ label, active, onToggle, icon }: {
  label: string;
  active: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={active}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "10px 12px",
        borderRadius: 10,
        border: active ? "1.5px solid var(--color-primary)" : "1.5px solid var(--color-border)",
        backgroundColor: active ? "var(--color-primary)" : "transparent",
        color: active ? "white" : "var(--color-text)",
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 600,
        textAlign: "left",
        transition: "all 0.15s ease",
      }}
    >
      <span style={{ opacity: active ? 1 : 0.6, flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      <span style={{ fontSize: 11, opacity: 0.7 }}>{active ? "ON" : "OFF"}</span>
    </button>
  );
}

function A11yOption({ label, value, onClick, icon }: {
  label: string;
  value: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "10px 12px",
        borderRadius: 10,
        border: "1.5px solid var(--color-border)",
        backgroundColor: "transparent",
        color: "var(--color-text)",
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 600,
        textAlign: "left",
        transition: "all 0.15s ease",
      }}
    >
      <span style={{ opacity: 0.6, flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      <span style={{
        fontSize: 11,
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: 6,
        backgroundColor: "var(--color-surface)",
      }}>
        {value}
      </span>
    </button>
  );
}
