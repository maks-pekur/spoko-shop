"use client";

import { Cart } from "@/components/cart";
import { useCategory } from "@/store/use-category";
import { Category } from "@/types";
import { cn } from "@/utils";
import Link from "next/link";
import { useRef } from "react";

interface NavbarProps {
  categories: Category[];
}

export const Navbar = ({ categories }: NavbarProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { activeCategory } = useCategory();

  return (
    <div
      ref={sectionRef}
      className="py-2 sticky top-0 z-50 w-full backdrop-blur group"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 py-2">
          <nav className="flex items-center gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`#${category.slug}`}
                className={cn(
                  "text-md transition-colors hover:text-primary",
                  activeCategory === category.slug &&
                    "text-primary font-semibold "
                )}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
        <Cart />
      </div>
    </div>
  );
};
