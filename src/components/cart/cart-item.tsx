import type { CartItem as CartItemType } from "@/types";
import { convertToLocale } from "@/utils";
import { motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const CartItem = ({ item }: { item: CartItemType }) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex rounded-lg border bg-card p-2 shadow-sm transition-colors hover:bg-accent/50"
      exit={{ opacity: 0, y: -10 }}
      initial={{ opacity: 0, y: 10 }}
      key={item.id}
      layout
      transition={{ duration: 0.15 }}
    >
      <div className="relative h-20 w-20 overflow-hidden rounded">
        <Image alt={item.name} className="object-cover" fill src={item.image} />
      </div>
      <div className="ml-4 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <Link
              className="line-clamp-2 text-sm font-medium group-hover:text-primary"
              href={`/products/${item.id}`}
              onClick={() => {}}
            >
              {item.name}
            </Link>
            <button
              className="-mt-1 -mr-1 ml-2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
              onClick={() => {}}
              type="button"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove item</span>
            </button>
          </div>
          <p className="text-xs text-muted-foreground">{item.category}</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center rounded-md border">
            <button
              className="flex h-7 w-7 items-center justify-center rounded-l-md border-r text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              disabled={item.quantity <= 1}
              onClick={() => {}}
              type="button"
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </button>
            <span className="flex h-7 w-7 items-center justify-center text-xs font-medium">
              {item.quantity}
            </span>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-r-md border-l text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => {}}
              type="button"
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </button>
          </div>
          <div className="text-sm font-medium">
            {convertToLocale({ amount: item.price * item.quantity })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
