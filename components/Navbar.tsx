"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/", label: "Products" },
  { href: "/", label: "New Arrivals" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`rounded-[10px] px-3 py-2 text-[14px] font-medium transition-colors hover:bg-muted ${
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Cart Button */}
        <Link
          href="/cart"
          aria-label={`Cart with ${totalItems} items`}
          className="relative inline-flex items-center gap-2 rounded-[10px] bg-neutral-900 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Cart
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold"
            >
              {totalItems}
            </Badge>
          )}
        </Link>
      </div>
    </header>
  );
}
