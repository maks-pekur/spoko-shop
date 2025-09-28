"use client";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks";
import { useCart } from "@/store";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { CartContent } from "./cart-content";
import { CartFooter } from "./cart-footer";

interface CartProps {
  className?: string;
}

export function Cart({ className }: CartProps) {
  const [isMounted, setIsMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { items, isOpen, setOpen } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const Trigger = (
    <Button
      aria-label="Open cart"
      className="relative h-8 w-8 rounded-full"
      size="icon"
      variant="outline"
    >
      <ShoppingCart className="h-4 w-4" />
      {items.length > 0 && (
        <Badge
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-[10px]"
          variant="default"
        >
          {items.length}
        </Badge>
      )}
    </Button>
  );

  if (!isMounted) {
    return (
      <div className={cn("relative", className)}>
        <Button
          aria-label="Open cart"
          className="relative h-8 w-8 rounded-full"
          size="icon"
          variant="outline"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {isDesktop ? (
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>{Trigger}</SheetTrigger>
          <SheetContent className="flex w-[400px] flex-col p-0">
            <SheetHeader className="px-4 pt-4">
              <SheetTitle>Shopping Cart</SheetTitle>
            </SheetHeader>
            <CartContent />
            <SheetFooter>
              <CartFooter />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <Drawer open={isOpen} onOpenChange={setOpen}>
          <DrawerTrigger asChild>{Trigger}</DrawerTrigger>
          <DrawerContent className="p-0">
            <CartContent />
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
