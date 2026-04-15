import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowUpRight, Calendar, CheckCircle2, Clock, Mail, MessageSquare,
  Monitor, Send, Sparkles,
} from "lucide-react";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { getClient } from "@/data/clients";
import { PHASES, phaseIndex, type ClientConfig, type Phase } from "@/data/clients/types";

/* ── Helpers ─────────────────────────────────────────────────────────── */
function daysBetween(fromISO: string, toISO: string = new Date().toISOString()): number {
  const a = new Date(fromISO).getTime();
  const b = new Date(toISO).getTime();
  return Math.max(0, Math.floor((b - a) / 86_400_000));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/* ── Minimal portal header (no main nav, this is a client-only area) ──── */
function PortalHeader({ marcEmail }: { marcEmail: string }) {
  return (
    <header
      className="sticky top-0 z-30"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-background) 88%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-semibold text-xl tracking-tight" style={{ color: "var(--color-text)" }}>
          Marc Cruz
        </Link>
        <a
          href={`mailto:${marcEmail}`}
          className="btn-terracotta inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold"
        >
          <Mail size={14} /> Email Marc
        </a>
      </div>
    </header>
  );
}

/* ── Phase progress strip ─────────────────────────────────────────────── */
function PhaseProgress({ currentPhase, phaseProgress = 50 }: { currentPhase: Phase; phaseProgress?: number }) {
  const currentIdx = phaseIndex(currentPhase);
  return (
    <div className="p-6 md:p-7 rounded-2xl" style={{ backgroundColor: "var(--color-surface-raised)", border: "1px solid var(--color-border)" }}>
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-primary)" }}>
        Project pipeline
      </p>
      <div className="flex items-center justify-between gap-1">
        {PHASES.map((phase, i) => {
          const done = i < currentIdx;
          const current = i === currentIdx;
          return (
            <div key={phase.id} className="flex-1 flex flex-col items-center min-w-0">
              <div
                className="relative w-full h-1.5 rounded-full mb-3"
                style={{
                  backgroundColor: done || current
                    ? "var(--color-primary)"
                    : "var(--color-border)",
                  opacity: i === 0 ? 0 : 1,
                }}
              >
                {current && phaseProgress > 0 && (
                  <span
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${Math.max(0, Math.min(100, phaseProgress))}%`,
                      backgroundColor: "var(--color-accent)",
                    }}
                  />
                )}
              </div>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  backgroundColor: done
                    ? "var(--color-primary)"
                    : current
                      ? "var(--color-accent)"
                      : "var(--color-surface)",
                  color: done || current ? "var(--color-primary-ink)" : "var(--color-text-subtle)",
                  border: current ? "none" : "1px solid var(--color-border)",
                  transform: current ? "scale(1.08)" : "scale(1)",
                }}
              >
                {done ? <CheckCircle2 size={16} /> : i + 1}
              </div>
              <span
                className="mt-2 text-[11px] sm:text-xs font-medium text-center truncate w-full"
                style={{ color: done || current ? "var(--color-text)" : "var(--color-text-subtle)" }}
              >
                {phase.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Prototype window — iframe or placeholder ─────────────────────────── */
function PrototypeWindow({ client }: { client: ClientConfig }) {
  const hasPreview = !!client.previewUrl;
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "var(--color-surface-raised)", border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--color-danger)" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--color-olive)" }} />
          </span>
          <span className="text-xs font-mono ml-2" style={{ color: "var(--color-text-muted)" }}>
            {hasPreview ? "Live prototype" : "Awaiting prototype"}
          </span>
        </div>
        {hasPreview && (
          <a
            href={client.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold transition-all hover:opacity-80"
            style={{ color: "var(--color-primary)" }}
          >
            Open full screen <ArrowUpRight size={12} />
          </a>
        )}
      </div>

      {hasPreview ? (
        <div className="relative" style={{ aspectRatio: "16 / 10" }}>
          <iframe
            src={client.previewUrl}
            title={`${client.name} prototype`}
            className="absolute inset-0 w-full h-full"
            style={{ border: "none" }}
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center text-center px-6 py-16"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <Monitor size={36} style={{ color: "var(--color-text-subtle)" }} />
          <p className="mt-4 font-display text-2xl font-semibold" style={{ color: "var(--color-text)" }}>
            Prototype coming soon
          </p>
          <p className="mt-2 max-w-sm text-sm" style={{ color: "var(--color-text-muted)" }}>
            {client.previewReadyDate
              ? `Expected ${formatDate(client.previewReadyDate)}. I'll post an update here the moment it's ready to review.`
              : "I'll post an update here the moment it's ready to review."}
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Update feed ─────────────────────────────────────────────────────── */
function UpdateFeed({ updates }: { updates: ClientConfig["updates"] }) {
  if (!updates.length) {
    return (
      <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
        No updates yet. Check back after our kickoff call.
      </p>
    );
  }
  return (
    <ol className="space-y-5 relative" style={{ paddingLeft: "1.75rem" }}>
      <span className="absolute left-[11px] top-2 bottom-2 w-px" style={{ backgroundColor: "var(--color-border)" }} aria-hidden="true" />
      {updates.map((u, i) => (
        <li key={`${u.date}-${i}`} className="relative">
          <span
            className="absolute -left-7 top-1.5 w-[11px] h-[11px] rounded-full"
            style={{
              backgroundColor: i === 0 ? "var(--color-primary)" : "var(--color-surface-raised)",
              border: `2px solid ${i === 0 ? "var(--color-primary)" : "var(--color-border)"}`,
              boxShadow: i === 0 ? "0 0 0 4px color-mix(in srgb, var(--color-primary) 18%, transparent)" : undefined,
            }}
            aria-hidden="true"
          />
          <time className="text-[11px] font-mono uppercase tracking-wider" style={{ color: "var(--color-text-subtle)" }}>
            {formatDate(u.date)}
          </time>
          <p className="mt-0.5 text-base font-semibold" style={{ color: "var(--color-text)" }}>{u.title}</p>
          {u.body && (
            <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              {u.body}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

/* ── Feedback form — posts to Web3Forms same as Contact ──────────────── */
function FeedbackForm({ client }: { client: ClientConfig }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) return;

    const accessKey = import.meta.env.VITE_WEB3FORM_KEY_MARCCRUZS;
    if (!accessKey) {
      console.error(
        "[Portal] VITE_WEB3FORM_KEY_MARCCRUZS is not set. " +
        "Add it to marc/.env.local and restart `vite`."
      );
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portal feedback — ${client.name}`,
          from_name: `${client.name} (portal)`,
          slug: client.slug,
          phase: client.currentPhase,
          message,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setStatus("success");
        setMessage("");
      } else {
        console.error("[Portal] Web3Forms rejected the submission:", data ?? res.statusText);
        setStatus("error");
      }
    } catch (err) {
      console.error("[Portal] Network error submitting feedback:", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="p-6 rounded-2xl flex items-start gap-3"
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
          border: "1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)",
        }}
      >
        <CheckCircle2 size={20} style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: 2 }} />
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>Got it — thanks!</p>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
            Marc will review your feedback and post an update here within 24 hours.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-xs font-semibold mt-2 underline underline-offset-4"
            style={{ color: "var(--color-primary)" }}
          >
            Send another note
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 md:p-7 rounded-2xl"
      style={{ backgroundColor: "var(--color-surface-raised)", border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare size={16} style={{ color: "var(--color-primary)" }} />
        <p className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
          Send feedback on this iteration
        </p>
      </div>
      <p className="text-xs mb-4" style={{ color: "var(--color-text-muted)" }}>
        What feels off? Anything missing? Anything you love? The more specific, the faster I can iterate.
      </p>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        placeholder="Tell Marc what you think…"
        className="w-full px-3 py-2.5 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2"
        style={{
          backgroundColor: "var(--color-background)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text)",
          resize: "vertical",
          fontFamily: "var(--font-body)",
        }}
        required
      />
      {status === "error" && (
        <p
          className="text-xs mb-3 px-3 py-2 rounded"
          style={{
            color: "var(--color-danger)",
            backgroundColor: "color-mix(in srgb, var(--color-danger) 10%, transparent)",
            border: "1px solid color-mix(in srgb, var(--color-danger) 25%, transparent)",
          }}
        >
          Something went wrong. Try again or email Marc directly at {client.marcEmail ?? "marc.cruz.office@gmail.com"}.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading" || !message.trim()}
        className="btn-terracotta inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending…" : <>Send feedback <Send size={13} /></>}
      </button>
    </form>
  );
}

/* ── 404 — slug not recognized ───────────────────────────────────────── */
function PortalNotFound({ slug }: { slug: string }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PortalHeader marcEmail="marc.cruz.office@gmail.com" />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-primary)" }}>
            Portal not found
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold" style={{ color: "var(--color-text)" }}>
            Hmm, no project here.
          </h1>
          <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
            The portal link <code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--color-surface)" }}>/portal/{slug}</code> doesn't match any active client. Double-check the URL Marc sent, or email him.
          </p>
          <a
            href="mailto:marc.cruz.office@gmail.com"
            className="btn-terracotta inline-flex items-center gap-1.5 mt-6 px-4 py-2.5 rounded-lg text-sm font-semibold"
          >
            <Mail size={14} /> Email Marc
          </a>
        </div>
      </main>
    </div>
  );
}

/* ── The portal page ─────────────────────────────────────────────────── */
export default function ClientPortal() {
  const { slug = "" } = useParams<{ slug: string }>();
  const client = useMemo(() => getClient(slug), [slug]);

  // Set a meaningful page title per client
  useEffect(() => {
    if (client) {
      document.title = `${client.name} · Project Portal — Marc Cruz`;
    }
    return () => {
      document.title = "Marc Cruz | Web Design, SEO & AI · Orange County, CA";
    };
  }, [client]);

  if (!client) {
    return <PortalNotFound slug={slug} />;
  }

  const marcEmail = client.marcEmail ?? "marc.cruz.office@gmail.com";
  const daysIn = daysBetween(client.startDate);
  const currentPhaseLabel = PHASES.find((p) => p.id === client.currentPhase)?.label ?? "";

  return (
    <div style={{ backgroundColor: "var(--color-background)", color: "var(--color-text)" }}>
      <PortalHeader marcEmail={marcEmail} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

        {/* Hero — greeting + meta */}
        <section aria-labelledby="portal-heading" className="mb-10 md:mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-primary)" }}>
            {client.contactName ? `Hi ${client.contactName}` : "Welcome"} · Project Portal
          </p>
          <h1
            id="portal-heading"
            className="mt-2 font-display font-semibold leading-[1.05] tracking-tight text-3xl md:text-5xl"
            style={{ color: "var(--color-text)", textWrap: "balance" }}
          >
            {client.projectTitle}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles size={14} style={{ color: "var(--color-primary)" }} />
              Phase: <strong style={{ color: "var(--color-text)" }}>{currentPhaseLabel}</strong>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} style={{ color: "var(--color-primary)" }} />
              Day {daysIn} · Started {formatDate(client.startDate)}
            </span>
            {client.estimatedLaunch && (
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} style={{ color: "var(--color-primary)" }} />
                Target launch: <strong style={{ color: "var(--color-text)" }}>{formatDate(client.estimatedLaunch)}</strong>
              </span>
            )}
          </div>
        </section>

        {/* Phase progress */}
        <section className="mb-8 md:mb-10">
          <PhaseProgress currentPhase={client.currentPhase} phaseProgress={client.phaseProgress} />
        </section>

        {/* Prototype window — big, above the fold */}
        <section aria-labelledby="prototype-heading" className="mb-10 md:mb-14">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-primary)" }}>
                Your prototype
              </p>
              <h2 id="prototype-heading" className="font-display text-2xl md:text-3xl font-semibold mt-1" style={{ color: "var(--color-text)" }}>
                Take a look
              </h2>
            </div>
          </div>
          <PrototypeWindow client={client} />
        </section>

        {/* 2-col: updates + sidebar (next up + feedback) */}
        <section className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-primary)" }}>
                Updates from Marc
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-semibold mt-1" style={{ color: "var(--color-text)" }}>
                Latest progress
              </h2>
            </div>
            <UpdateFeed updates={client.updates} />
          </div>

          <aside className="space-y-6">
            <div
              className="p-6 rounded-2xl"
              style={{ backgroundColor: "var(--color-surface-raised)", border: "1px solid var(--color-border)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-primary)" }}>
                What's next
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {client.nextUp}
              </p>
            </div>

            <FeedbackForm client={client} />

            <div
              className="p-6 rounded-2xl"
              style={{ backgroundColor: "var(--color-surface-raised)", border: "1px solid var(--color-border)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-primary)" }}>
                Got a question?
              </p>
              <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
                Anything outside scope of the feedback form — reach me directly.
              </p>
              <a
                href={`mailto:${marcEmail}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                <Mail size={14} /> {marcEmail}
              </a>
            </div>
          </aside>
        </section>

        {/* Footer line */}
        <p className="mt-16 text-center text-xs" style={{ color: "var(--color-text-subtle)" }}>
          This portal is private. Bookmark it — the link only works for you.
        </p>
      </main>

      <AccessibilityWidget />
    </div>
  );
}
