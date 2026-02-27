"use client";

import React from "react";
import Image from "next/image";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/types";

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 rounded-[12px] border bg-card p-4">
      {/* Thumbnail */}
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-[10px] bg-muted">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div>
          <h3 className="text-[14px] font-semibold text-foreground">
            {item.name}
          </h3>
          <p className="text-[12px] text-muted-foreground">
            {item.description}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            aria-label={`Decrease ${item.name} quantity`}
            className="h-7 w-7 rounded-full"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="min-w-[1.5rem] text-center text-[13px] font-medium">
            {item.quantity}
          </span>
          <Button
            size="icon"
            variant="outline"
            aria-label={`Increase ${item.name} quantity`}
            className="h-7 w-7 rounded-full"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label={`Remove ${item.name} from cart`}
            className="ml-auto h-7 w-7 text-destructive hover:bg-destructive/10"
            onClick={() => removeFromCart(item.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-shrink-0 items-start">
        <p className="text-[14px] font-semibold text-foreground">
          ${item.price * item.quantity}
        </p>
      </div>
    </div>
  );
}
