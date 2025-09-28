"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  selectBonus,
  selectDiscount,
  selectSubtotal,
  selectTotal,
  useCart,
} from "@/store";
import { convertToLocale } from "@/utils";
import { Info } from "lucide-react";
import { useState } from "react";

export const CartFooter = () => {
  const [promo, setPromo] = useState("");

  const { items } = useCart();
  const subtotal = useCart(selectSubtotal);
  const discount = useCart(selectDiscount);
  const bonus = useCart(selectBonus);
  const total = useCart(selectTotal);

  const applyPromo = useCart((s) => s.applyPromo);

  if (!items.length) return null;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Input
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          placeholder="Promo code"
          className="flex-1"
        />
        <Button
          size="sm"
          variant="outline"
          onClick={() => applyPromo(promo)}
          aria-label="Apply promo"
        >
          Apply
        </Button>
      </div>

      <div className="border-t pt-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">
            {convertToLocale({ amount: subtotal })}
          </span>
        </div>

        {!!discount && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span className="font-medium">
              - {convertToLocale({ amount: discount })}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            Bonus
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={12} className="ml-2" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[260px] space-y-1">
                  <p className="text-sm font-semibold text-primary">
                    Кешбэк без ограничений!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Кешбэк 5% начисляется при любом заказе на доставку, в том
                    числе через оператора.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="font-medium">{bonus}</span>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">Total</span>
          <span className="text-base font-semibold">
            {convertToLocale({ amount: total })}
          </span>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" size="lg">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};
