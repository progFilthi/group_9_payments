"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import CheckoutForm from "@/components/CheckoutForm";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-[20px] font-semibold text-foreground">
          Nothing to checkout
        </h1>
        <p className="mt-1 text-[14px] text-muted-foreground">
          Add some items to your cart first.
        </p>
        <Link href="/" className="mt-6">
          <Button variant="outline" className="gap-2 rounded-[10px]">
            Browse Products
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-8">
      {/* Back link */}
      <Link
        href="/cart"
        className="mb-6 inline-flex items-center gap-1 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to cart
      </Link>

      <h1 className="mb-6 text-[28px] font-semibold tracking-tight text-foreground">
        Checkout
      </h1>

      {/* Checkout Form */}
      <div className="rounded-[12px] border bg-card p-6">
        <CheckoutForm />
      </div>
    </main>
  );
}
