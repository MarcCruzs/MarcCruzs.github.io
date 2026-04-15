import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function MoreProjectsBar() {
  return (
    <Link
      to="/projects"
      className="bento-card flex items-center justify-between px-5 sm:px-6 py-4 group"
    >
      <span className="text-sm sm:text-base font-black uppercase text-theme">MORE PROJECTS</span>
      <span className="w-8 h-8 flex items-center justify-center border border-[--c-border] rounded-md group-hover:border-[--c-border-hover] transition-colors">
        <ArrowUpRight size={16} className="text-theme" />
      </span>
    </Link>
  );
}
