"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CartItemRow from "@/components/CartItemRow";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, totalAmount } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-[20px] font-semibold text-foreground">
          Your cart is empty
        </h1>
        <p className="mt-1 text-[14px] text-muted-foreground">
          Looks like you haven&apos;t added any items yet.
        </p>
        <Link href="/" className="mt-6">
          <Button variant="outline" className="gap-2 rounded-[10px]">
            Browse Products
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-[28px] font-semibold tracking-tight text-foreground">
        Cart
      </h1>

      {/* Cart Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </div>

      <Separator className="my-8" />

      {/* Total */}
      <div className="flex items-center justify-between rounded-[12px] bg-muted p-4">
        <span className="text-[14px] font-medium text-muted-foreground">
          Total amount
        </span>
        <span className="text-[28px] font-bold text-foreground">
          ${totalAmount}
        </span>
      </div>

      {/* Proceed */}
      <div className="mt-8 flex justify-center">
        <Link href="/checkout">
          <Button
            size="lg"
            className="gap-2 rounded-[10px] bg-neutral-900 px-8 text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Proceed to checkout
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
