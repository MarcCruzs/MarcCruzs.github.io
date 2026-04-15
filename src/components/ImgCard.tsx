interface ImgCardProps {
  src: string;
  alt: string;
  fallback: string;
  minH?: string;
}

export function ImgCard({ src, alt, fallback, minH = "min-h-[180px]" }: ImgCardProps) {
  return (
    <div
      className={`bento-card h-full ${minH} bg-cover bg-center`}
      style={{ backgroundImage: `url('${src}'), ${fallback}` }}
      role="img"
      aria-label={alt}
    />
  );
}
