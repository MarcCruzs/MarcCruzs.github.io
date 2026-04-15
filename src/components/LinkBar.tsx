import { ExternalLink } from "lucide-react";

interface LinkBarProps {
  label: string;
  href: string;
}

export function LinkBar({ label, href }: LinkBarProps) {
  return (
    <a
      href={href}
      target={href.startsWith("http") || href.startsWith("mailto") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="bento-card flex items-center justify-between px-4 sm:px-5 py-3.5 group"
    >
      <span className="text-xs sm:text-sm font-black uppercase text-theme tracking-wide">
        {label}
      </span>
      <span className="w-6 h-6 flex items-center justify-center border border-[--c-border] rounded-md group-hover:border-[--c-border-hover] transition-colors flex-shrink-0">
        <ExternalLink size={12} className="text-theme" />
      </span>
    </a>
  );
}
