import { ExternalLink, Mail, FileText, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h1 className="text-4xl sm:text-5xl font-black uppercase text-theme mb-6 sm:mb-8">
        CONTACT
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Get in touch */}
        <div className="bento-card p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-theme mb-3">Get in Touch</h2>
          <p className="text-sm text-theme-muted leading-relaxed mb-6">
            I'm open to collaborating on software engineering and data engineering work. From
            backend systems and ETL pipelines to internal tools that support teams.
          </p>
          <a
            href="mailto:marc@marccruzs.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-[#e0e0e0] transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Mail size={16} />
            Send an Email
          </a>
        </div>

        {/* Links */}
        <div className="bento-card p-5 sm:p-6 space-y-3">
          {[
            {
              icon: <Linkedin size={18} />,
              label: "LinkedIn",
              href: "https://linkedin.com/in/marccruzs",
            },
            { icon: <Github size={18} />, label: "GitHub", href: "https://github.com/marccruzs" },
            { icon: <FileText size={18} />, label: "Resume", href: "/resume.pdf" },
          ].map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-md group"
              style={{ background: "var(--c-card)", border: "1px solid var(--c-border)" }}
            >
              <span className="flex items-center gap-3 text-sm font-semibold text-theme">
                <span className="text-theme-muted group-hover:text-theme transition-colors">
                  {icon}
                </span>
                {label}
              </span>
              <ExternalLink
                size={14}
                className="text-theme-dim group-hover:text-theme transition-colors"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
