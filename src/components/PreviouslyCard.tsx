interface Role {
  label: string;
  sub: string;
  href: string;
}

const roles: Role[] = [
  { label: "NASA S.W.E. Contractor", sub: "NAMS 2", href: "#" },
  { label: "President", sub: "Software Engineering Association", href: "#" },
  { label: "Computer Vision Lead", sub: "CPP SUAS Team", href: "#" },
];

export function PreviouslyCard() {
  return (
    <div className="bento-card h-full p-4 sm:p-5">
      <p className="text-[10px] font-bold tracking-widest text-theme-muted mb-3 uppercase">
        Previously
      </p>
      <ul className="space-y-2.5">
        {roles.map((r) => (
          <li key={r.label} className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4a9eff] flex-shrink-0" />
            <span className="text-xs text-theme leading-snug">
              {r.label}{" "}
              <a href={r.href} className="text-[#4a9eff] hover:underline">
                ({r.sub})
              </a>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
