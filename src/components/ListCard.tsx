interface ListItem {
  text: string;
  linkText?: string;
  href?: string;
}

interface ListCardProps {
  title: string;
  items: ListItem[];
}

export function ListCard({ title, items }: ListCardProps) {
  const columns = chunkIntoColumns(items, 5); // 5 items per column

  return (
    <div className="select-none rounded-lg border bg-foreground/5 overflow-hidden h-full flex flex-col border-foreground/30 glass-card">
      {/* Header */}
      <div className="px-4 py-2 border-b border-foreground/10">
        <h3 className="font-black font-poppins text-md text-foreground/80 tracking-wide">
          {title}
        </h3>
      </div>

      {/* Columns */}
      <div className="flex flex-1 divide-x divide-foreground/10">
        {columns.map((col, colIdx) => (
          <ul key={colIdx} className="flex-1 flex flex-col">
            {col.map((item, rowIdx) => (
              <li
                key={rowIdx}
                className="flex-1 flex items-center px-4 hover:bg-foreground/10 transition-colors"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-3 w-3 rounded-sm bg-foreground/40" />
                  <span className="text-sm text-foreground/80">
                    {item.text}
                    {item.linkText && (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-foreground ml-1"
                      >
                        {item.linkText}
                      </a>
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

// Helper: chunk items into columns of given size
function chunkIntoColumns<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}
