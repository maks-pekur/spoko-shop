import { RefObject, useEffect, useState } from "react";

export function useIntersection(
  ref: RefObject<HTMLElement | null>,
  options: IntersectionObserverInit
): IntersectionObserverEntry | null {
  const [intersectionObserverEntry, setIntersectionObserverEntry] =
    useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (ref.current && typeof IntersectionObserver === "function") {
      const handler = (entries: IntersectionObserverEntry[]) => {
        setIntersectionObserverEntry(entries[0]);
      };

      const observer = new IntersectionObserver(handler, options);
      observer.observe(ref.current);

      return () => {
        setIntersectionObserverEntry(null);
        observer.disconnect();
      };
    }
    return () => {};
  }, [options.threshold, options.root, options.rootMargin, ref, options]);

  return intersectionObserverEntry;
}
