import { useState } from "react";
import { Loader2, CheckCircle2, Mail, MapPin, Clock, Shield } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Step = 1 | 2;
type Status = "idle" | "loading" | "success" | "error";

const serviceOptions = [
  "Full-Time Role",
  "Contract / Freelance",
  "Internship",
  "Open-Source Collaboration",
  "Something Else",
];

// Web3Forms drops any submission where the honeypot field is non-empty —
// real users never see this field, so a populated value implies a bot.
const HONEYPOT_FIELD = "botcheck";
// Minimum gap between Send-It clicks (ms) — blocks rapid resubmits via step-back.
const SUBMIT_COOLDOWN_MS = 30_000;

export function Contact() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal();
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [botcheck, setBotcheck] = useState("");
  const [lastSubmitAt, setLastSubmitAt] = useState(0);

  const validateStep1 = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.includes("@"))
      e.email = "Email must include an @ symbol, e.g. you@example.com";
    if (!form.service) e.service = "Please select a service.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message.trim()) {
      setErrors({ message: "Please share a bit about the role." });
      return;
    }

    const now = Date.now();
    if (now - lastSubmitAt < SUBMIT_COOLDOWN_MS) {
      // Silent throttle — a real user clicking once never trips this.
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORM_KEY_MARCCRUZS;
    if (!accessKey) {
      console.error(
        "[Contact] VITE_WEB3FORM_KEY_MARCCRUZS is not set. " +
        "Add it to marc/.env.local and restart `vite`."
      );
      setStatus("error");
      return;
    }

    setLastSubmitAt(now);
    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New opportunity inquiry — ${form.name}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          opportunity_type: form.service,
          message: form.message,
          [HONEYPOT_FIELD]: botcheck,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setStatus("success");
        window.umami?.track("form-submitted", { opportunity_type: form.service });
      } else {
        console.error("[Contact] Web3Forms rejected the submission:", data ?? res.statusText);
        setStatus("error");
      }
    } catch (err) {
      console.error("[Contact] Network error submitting form:", err);
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid var(--color-border)",
    backgroundColor: "var(--color-surface)",
    color: "var(--color-text)",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "6px",
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--color-text-muted)",
  };

  const errorStyle: React.CSSProperties = {
    marginTop: "4px",
    fontSize: "12px",
    color: "var(--color-danger)",
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          ref={sectionRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Left: Form */}
          <div className={`reveal-left${sectionVisible ? " is-visible" : ""}`}>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--color-primary)" }}
            >
              Get In Touch
            </p>
            <h2
              id="contact-heading"
              className="text-step-5 font-bold leading-tight mb-8"
              style={{
                color: "var(--color-text)",
                fontFamily: "var(--font-display)",
              }}
            >
              Hiring? Let's Talk.
            </h2>

            {/* Success state */}
            {status === "success" ? (
              <div
                className="rounded-2xl p-8 text-center"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <CheckCircle2
                  size={48}
                  className="mx-auto mb-4"
                  style={{ color: "var(--color-primary)" }}
                />
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    color: "var(--color-text)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Got it!
                </h3>
                <p style={{ color: "var(--color-text-muted)" }}>
                  I'll be in touch within 24 hours. Check your inbox for a
                  confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot — hidden from real users; bots fill it and Web3Forms drops the submission. */}
                <input
                  type="text"
                  name={HONEYPOT_FIELD}
                  value={botcheck}
                  onChange={(e) => setBotcheck(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                />
                {/* Step indicator */}
                <div className="flex items-center gap-3 mb-8">
                  {[1, 2].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
                        style={{
                          backgroundColor:
                            step >= s
                              ? "var(--color-primary)"
                              : "var(--color-surface)",
                          color: step >= s ? "white" : "var(--color-text-subtle)",
                          border:
                            step >= s
                              ? "none"
                              : "1px solid var(--color-border)",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {s}
                      </div>
                      <span
                        className="text-xs font-medium"
                        style={{
                          color:
                            step === s
                              ? "var(--color-text)"
                              : "var(--color-text-subtle)",
                        }}
                      >
                        {s === 1 ? "About You" : "Your Project"}
                      </span>
                      {s < 2 && (
                        <div
                          className="w-8 h-px"
                          style={{
                            backgroundColor:
                              step > s
                                ? "var(--color-primary)"
                                : "var(--color-border)",
                            transition: "background-color 0.3s ease",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1 */}
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" style={labelStyle}>
                        Your name
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor =
                            "var(--color-primary)")
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.borderColor =
                            "var(--color-border)")
                        }
                        style={inputStyle}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p id="name-error" style={errorStyle} role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" style={labelStyle}>
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor =
                            "var(--color-primary)")
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.borderColor =
                            "var(--color-border)")
                        }
                        style={inputStyle}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p id="email-error" style={errorStyle} role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="service" style={labelStyle}>
                        What kind of opportunity?
                      </label>
                      <select
                        id="service"
                        value={form.service}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, service: e.target.value }))
                        }
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor =
                            "var(--color-primary)")
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.borderColor =
                            "var(--color-border)")
                        }
                        style={{ ...inputStyle, cursor: "pointer" }}
                        aria-describedby={errors.service ? "service-error" : undefined}
                        aria-invalid={!!errors.service}
                      >
                        <option value="" style={{ backgroundColor: "var(--color-surface)" }}>
                          Select an opportunity type…
                        </option>
                        {serviceOptions.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                            style={{ backgroundColor: "var(--color-surface)" }}
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p id="service-error" style={errorStyle} role="alert">
                          {errors.service}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.98] mt-2"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "white",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--color-primary-dark)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--color-primary)")
                      }
                    >
                      Next →
                    </button>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="message" style={labelStyle}>
                        Tell me about the role
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        placeholder="Role, team, stack, location/remote. The more detail, the better."
                        value={form.message}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor =
                            "var(--color-primary)")
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.borderColor =
                            "var(--color-border)")
                        }
                        style={{ ...inputStyle, resize: "vertical" }}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <p id="message-error" style={errorStyle} role="alert">
                          {errors.message || "Please share a bit about the role."}
                        </p>
                      )}
                    </div>

                    {status === "error" && (
                      <p
                        className="text-sm rounded-lg px-4 py-3"
                        style={{
                          color: "var(--color-danger)",
                          backgroundColor: "color-mix(in srgb, var(--color-danger) 10%, transparent)",
                          border: "1px solid color-mix(in srgb, var(--color-danger) 25%, transparent)",
                        }}
                        role="alert"
                      >
                        Something went wrong. Try emailing me directly at{" "}
                        <a
                          href="mailto:marc.cruz.office@gmail.com"
                          className="underline font-medium"
                        >
                          marc.cruz.office@gmail.com
                        </a>
                      </p>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.98]"
                        style={{
                          border: "1px solid var(--color-border)",
                          backgroundColor: "transparent",
                          color: "var(--color-text-muted)",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "var(--color-surface)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "transparent")
                        }
                      >
                        ← Back
                      </button>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2"
                        style={{
                          backgroundColor:
                            status === "loading"
                              ? "var(--color-primary)"
                              : "var(--color-accent)",
                          color: "var(--color-accent-ink)",
                          cursor: status === "loading" ? "not-allowed" : "pointer",
                          opacity: status === "loading" ? 0.8 : 1,
                        }}
                        onMouseEnter={(e) => {
                          if (status !== "loading")
                            e.currentTarget.style.opacity = "0.9";
                        }}
                        onMouseLeave={(e) => {
                          if (status !== "loading")
                            e.currentTarget.style.opacity = "1";
                        }}
                        data-umami-event="cta-contact-click"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending…
                          </>
                        ) : (
                          "Send It"
                        )}
                      </button>
                    </div>

                    <p
                      className="text-xs text-center"
                      style={{ color: "var(--color-text-subtle)" }}
                    >
                      No obligation · Reply within 24 hrs · Your info is never shared.
                    </p>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Right: Info */}
          <div className={`lg:pt-24 reveal-right${sectionVisible ? " is-visible" : ""}`} style={{ transitionDelay: "150ms" }}>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                  }}
                >
                  <Mail
                    size={18}
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: "var(--color-text-subtle)" }}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:marc.cruz.office@gmail.com"
                    className="text-sm font-medium transition-colors duration-150"
                    style={{ color: "var(--color-text)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--color-primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--color-text)")
                    }
                    data-umami-event="email-tap"
                  >
                    marc.cruz.office@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                  }}
                >
                  <MapPin size={18} style={{ color: "var(--color-primary)" }} />
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: "var(--color-text-subtle)" }}
                  >
                    Location
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text)" }}
                  >
                    Orange County, CA · Open to remote / relocation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                  }}
                >
                  <Clock size={18} style={{ color: "var(--color-primary)" }} />
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: "var(--color-text-subtle)" }}
                  >
                    Response time
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text)" }}
                  >
                    Within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Value callouts */}
            <div className="grid grid-cols-1 gap-3 mt-10">
              {[
                { icon: Shield, label: "No obligation", sub: "An intro chat, zero pressure" },
                { icon: Clock, label: "24-hour response", sub: "I reply fast, no ghosting" },
                { icon: Mail, label: "Direct contact", sub: "You talk to me, not a mailing list" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <Icon size={18} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-text)" }}
                    >
                      {label}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-text-subtle)" }}>
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
