import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element scrolls into view.
 * Adds `is-visible` class to trigger CSS reveal transitions.
 */
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
