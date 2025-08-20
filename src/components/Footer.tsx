export default function Footer() {
  return (
    <footer className="mt-8 border-t border-border/60 bg-background/70">
      <div className="container-w py-4 text-sm text-muted-foreground flex items-center justify-between flex-wrap gap-2">
        <div>© {new Date().getFullYear()} Marc Cruz</div>
        <div className="opacity-80">Built with React + Tailwind</div>
      </div>
    </footer>
  )
}
