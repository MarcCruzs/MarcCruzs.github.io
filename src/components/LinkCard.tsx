import { Link } from "react-router-dom";
import type { ReactNode, HTMLAttributes } from "react";

type LinkCardProps = {
  title: string;
  to: string;
  icon?: ReactNode;
  bgClass?: string;
  borderClass?: string;
  fgClass?: string;
  hoverClass?: string;
  hoverFgClass?: string;
  buttonClass?: string;
  external?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function LinkCard({
  title,
  to,
  icon,
  bgClass = "bg-card",
  borderClass = "border-border",
  buttonClass,
  fgClass = "text-[hsl(var(--foreground))]",
  hoverClass = "hover:bg-foreground hover:border-muted",
  hoverFgClass = "hover:text-[hsl(var(--background))]",
  external = true,
  className = "",
  ...rest
}: LinkCardProps) {
  return (
    <div
      className={[
        "h-full select-none rounded-lg shadow-soft p-5 flex flex-col justify-center",
        borderClass,
        bgClass,
        className,
      ].join(" ")}
      {...rest}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold m-0">{title}</h1>

        <Link
          to={to}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={[
            "shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 border border-muted-foreground",
            "transition-colors duration-1000 ease-out",
            borderClass,
            fgClass,
            hoverClass,
            hoverFgClass,
            buttonClass,
          ].join(" ")}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={title}
        >
          {icon ?? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18" />
              <path d="M8 6h10v10" />
            </svg>
          )}
        </Link>
      </div>
    </div>
  );
}
