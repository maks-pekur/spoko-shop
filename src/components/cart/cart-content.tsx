"use client";

import { CartItem } from "@/components/cart/cart-item";
import { useCart } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export const CartContent = () => {
  const { items } = useCart();

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-4">
        <AnimatePresence>
          {items.length === 0 ? (
            <motion.div
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <div
                className={`
                    mb-4 flex h-20 w-20 items-center justify-center rounded-full
                    bg-muted
                  `}
              >
                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Your cart is empty</h3>
              <p className="mb-6 text-center text-sm text-muted-foreground">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4 py-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
