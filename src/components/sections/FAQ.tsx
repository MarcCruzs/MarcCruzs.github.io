import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    q: "Why not just use Wix or Squarespace?",
    a: "Wix is great for a digital business card. I build sites that get found in Google, track your visitors, and convert them into leads. Templates can't do that.",
  },
  {
    q: "Do you have client reviews?",
    a: "Not yet — I'm building my client list. The site you're on right now is my proof of work. Judge my craft by what's in front of you.",
  },
  {
    q: "How long does a project take?",
    a: "Depends on scope — a basic site typically runs 2–4 weeks, more complex builds 6–10 weeks. I'll give you a specific timeline before we start, not a vague estimate.",
  },
  {
    q: "Do I need to handle my own hosting?",
    a: "No. I handle deployment on Cloudflare Pages — fast, free, and reliable. You keep full ownership — I hand you the keys with full documentation.",
  },
  {
    q: "What's bookkeeping?",
    a: "I'm adding bookkeeping services for small businesses — coming soon. Get in touch if you want to be notified when it's available.",
  },
  {
    q: "What if I need changes after launch?",
    a: "Minor tweaks are included in all packages. For larger changes or ongoing work, we set up a retainer. I'll always be clear about what's in scope.",
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-5 text-left transition-colors duration-150 group"
        style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}
      >
        <span
          className="text-base font-medium pr-4 transition-colors duration-150"
          style={{
            color: isOpen ? "var(--color-primary)" : "var(--color-text)",
            fontFamily: "var(--font-display)",
          }}
        >
          {item.q}
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            color: "var(--color-text-muted)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? "500px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p
          className="pb-5 text-base leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: listRef, isVisible: listVisible } = useScrollReveal(0.05);

  return (
    <section
      aria-labelledby="faq-heading"
      className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-12 reveal${headerVisible ? " is-visible" : ""}`}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--color-primary)" }}
          >
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="text-3xl lg:text-4xl font-bold leading-tight"
            style={{
              color: "var(--color-text)",
              fontFamily: "var(--font-display)",
            }}
          >
            Common Questions
          </h2>
        </div>

        <div
          ref={listRef as React.RefObject<HTMLDivElement>}
          className={`rounded-2xl overflow-hidden reveal${listVisible ? " is-visible" : ""}`}
          style={{
            backgroundColor: "var(--color-surface-raised)",
            border: "1px solid var(--color-border)",
            padding: "0 2rem",
            transitionDelay: "100ms",
          }}
        >
          {faqs.map((item, i) => (
            <AccordionItem
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
