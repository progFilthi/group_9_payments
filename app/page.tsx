"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductsPage() {
  const { totalItems } = useCart();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">
          Our Products
        </h1>
        <p className="mt-1 text-[14px] text-muted-foreground">
          Browse our selection of premium beverages
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Proceed to Cart */}
      {totalItems > 0 && (
        <div className="mt-12 flex justify-center">
          <Link href="/cart">
            <Button
              size="lg"
              className="gap-2 rounded-[10px] bg-neutral-900 px-8 text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Proceed to payment
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
}
