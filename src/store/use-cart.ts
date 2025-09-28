import type { CartItem } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const PROMO_TABLE: Record<string, number> = {
  SAVE10: 10,
  WELCOME5: 5,
};

interface CartState {
  isOpen: boolean;
  items: CartItem[];
  promoCode: string | null;
  promoDiscountPct: number;

  setOpen: (open: boolean) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, quantity: number) => void;
  clear: () => void;
  applyPromo: (code: string) => void;
  resetPromo: () => void;
}

export const selectSubtotal = (s: CartState) =>
  s.items.reduce((acc, i) => acc + i.price * i.quantity, 0);

export const selectDiscount = (s: CartState) => {
  const subtotal = selectSubtotal(s);
  return (subtotal * s.promoDiscountPct) / 100;
};

export const selectBonus = (s: CartState) => {
  const subtotal = selectSubtotal(s);
  return subtotal * 0.05;
};

export const selectTotal = (s: CartState) => {
  const subtotal = selectSubtotal(s);
  const discount = selectDiscount(s);
  return Math.max(0, subtotal - discount);
};

export const selectPromo = (s: CartState) => ({
  code: s.promoCode,
  pct: s.promoDiscountPct,
});

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      isOpen: false,
      items: [],
      promoCode: null,
      promoDiscountPct: 0,

      setOpen: (open) => set({ isOpen: open }),

      addItem: (item) =>
        set((state) => {
          const idx = state.items.findIndex((i) => i.id === item.id);
          if (idx === -1) {
            return {
              items: [
                ...state.items,
                { ...item, quantity: Math.max(1, item.quantity || 1) },
              ],
            };
          }
          const next = [...state.items];
          next[idx] = {
            ...next[idx],
            quantity: next[idx].quantity + Math.max(1, item.quantity || 1),
          };
          return { items: next };
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQty: (id, quantity) =>
        set((state) => {
          const q = Math.max(0, Math.floor(quantity));
          const next = state.items
            .map((i) => (i.id === id ? { ...i, quantity: q } : i))
            .filter((i) => i.quantity > 0);
          return { items: next };
        }),

      clear: () => set({ items: [], promoCode: null, promoDiscountPct: 0 }),

      applyPromo: (raw) =>
        set(() => {
          const code = raw.trim().toUpperCase();
          const pct = PROMO_TABLE[code] ?? 0;
          return {
            promoCode: pct ? code : null,
            promoDiscountPct: pct,
          };
        }),

      resetPromo: () => set({ promoCode: null, promoDiscountPct: 0 }),
    }),
    {
      name: "cart-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        promoDiscountPct: state.promoDiscountPct,
      }),
    }
  )
);
