"use client";

import { ProductCard } from "@/components/product-card";
import { useIntersection } from "@/hooks";
import { useCategory } from "@/store/use-category";
import type { Category } from "@/types";
import { cn } from "@/utils";
import { useEffect, useRef } from "react";

interface ProductListGroupProps {
  category: Category;
  className?: string;
  rootMargin?: string;
  threshold?: number;
}

function useRafThrottle<Args extends unknown[]>(fn: (...args: Args) => void) {
  const frame = useRef<number | null>(null);
  const lastArgs = useRef<Args | null>(null);

  return (...args: Args) => {
    lastArgs.current = args;
    if (frame.current == null) {
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        if (lastArgs.current) {
          fn(...lastArgs.current);
        }
      });
    }
  };
}

export const ProductListGroup: React.FC<ProductListGroupProps> = ({
  category,
  className,
  rootMargin = "0px 0px -40% 0px",
  threshold = 0.6,
}: ProductListGroupProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { setActiveCategory } = useCategory();

  const slug = category.slug;

  const intersection = useIntersection(sectionRef, {
    root: null,
    rootMargin,
    threshold,
  });

  const setActiveThrottled = useRafThrottle((s: string) => {
    setActiveCategory(s);
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveThrottled(slug);
    }
  }, [intersection?.isIntersecting, slug, setActiveThrottled]);

  const headingId = `category-heading-${slug}`;

  return (
    <section
      className={cn("container mx-auto mb-20", className)}
      id={slug}
      ref={sectionRef}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="mb-4 text-xl font-semibold">
        {category.name}
      </h3>

      <div
        className={cn(
          "grid gap-6",
          "sm:grid-cols-2",
          "lg:grid-cols-3",
          "xl:grid-cols-4"
        )}
      >
        {category.products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};
