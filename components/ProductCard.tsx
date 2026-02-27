"use client";

import React from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  return (
    <div className="group overflow-hidden rounded-[12px] border bg-card">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {/* Add / Quantity Controls — top-left */}
        <div className="absolute left-2 top-2">
          {quantity === 0 ? (
            <Button
              size="icon"
              aria-label={`Add ${product.name} to cart`}
              className="h-8 w-8 rounded-full bg-neutral-900 text-white shadow-sm hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => addToCart(product)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex items-center gap-0.5 rounded-full bg-neutral-900 px-1 py-0.5 shadow-sm">
              <Button
                size="icon"
                variant="ghost"
                aria-label={`Decrease ${product.name} quantity`}
                className="h-7 w-7 rounded-full text-white hover:bg-white/10"
                onClick={() => updateQuantity(product.id, quantity - 1)}
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
              <span className="min-w-[1.25rem] text-center text-[12px] font-semibold text-white">
                {quantity}
              </span>
              <Button
                size="icon"
                variant="ghost"
                aria-label={`Increase ${product.name} quantity`}
                className="h-7 w-7 rounded-full text-white hover:bg-white/10"
                onClick={() => updateQuantity(product.id, quantity + 1)}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center justify-between px-3 py-3">
        <p className="text-[14px] font-medium text-foreground truncate">
          {product.name}
        </p>
        <p className="text-[14px] font-semibold text-foreground">
          ${product.price}
        </p>
      </div>
    </div>
  );
}
