"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, MapPin } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Address, CardInfo } from "@/types";

export default function CheckoutForm() {
  const router = useRouter();
  const { items, totalAmount, clearCart } = useCart();

  const [address, setAddress] = useState<Address>({
    name: "",
    email: "",
    address: "",
    city: "",
  });

  const [card, setCard] = useState<CardInfo>({
    cardName: "",
    cardNumber: "",
    cvc: "",
    expiry: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddressChange = (field: keyof Address, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (field: keyof CardInfo, value: string) => {
    setCard((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // TODO: Replace with actual API call to Spring Boot backend
    const payload = {
      address,
      card,
      items,
      totalAmount,
    };
    console.log("Checkout payload:", payload);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert("Payment successful! Thank you for your purchase.");
    clearCart();
    setIsProcessing(false);
    router.push("/");
  };

  const isFormValid =
    address.name &&
    address.email &&
    address.address &&
    address.city &&
    card.cardName &&
    card.cardNumber &&
    card.cvc &&
    card.expiry;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Address Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-[18px] font-semibold text-foreground">
            Address Info
          </h2>
        </div>

        <div className="grid gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-[13px] font-medium">
              Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={address.name}
              onChange={(e) => handleAddressChange("name", e.target.value)}
              className="rounded-[10px]"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[13px] font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={address.email}
              onChange={(e) => handleAddressChange("email", e.target.value)}
              className="rounded-[10px]"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="address" className="text-[13px] font-medium">
              Address
            </Label>
            <Input
              id="address"
              placeholder="123 Main Street"
              value={address.address}
              onChange={(e) => handleAddressChange("address", e.target.value)}
              className="rounded-[10px]"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="city" className="text-[13px] font-medium">
              City
            </Label>
            <Input
              id="city"
              placeholder="Cape Town"
              value={address.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              className="rounded-[10px]"
              required
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Card Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-[18px] font-semibold text-foreground">
            Card Info
          </h2>
        </div>

        <div className="grid gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="cardName" className="text-[13px] font-medium">
              Name on Card
            </Label>
            <Input
              id="cardName"
              placeholder="John Doe"
              value={card.cardName}
              onChange={(e) => handleCardChange("cardName", e.target.value)}
              className="rounded-[10px]"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cardNumber" className="text-[13px] font-medium">
              Card Number
            </Label>
            <Input
              id="cardNumber"
              placeholder="4242 4242 4242 4242"
              value={card.cardNumber}
              onChange={(e) => handleCardChange("cardNumber", e.target.value)}
              className="rounded-[10px]"
              maxLength={19}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="cvc" className="text-[13px] font-medium">
                CVC
              </Label>
              <Input
                id="cvc"
                placeholder="123"
                value={card.cvc}
                onChange={(e) => handleCardChange("cvc", e.target.value)}
                className="rounded-[10px]"
                maxLength={4}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="expiry" className="text-[13px] font-medium">
                Expiry
              </Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={card.expiry}
                onChange={(e) => handleCardChange("expiry", e.target.value)}
                className="rounded-[10px]"
                maxLength={5}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Total */}
      <div className="flex items-center justify-between rounded-[12px] bg-muted p-4">
        <span className="text-[14px] text-muted-foreground">Total Amount</span>
        <span className="text-[24px] font-bold text-foreground">
          ${totalAmount}
        </span>
      </div>

      {/* Pay Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-[10px] bg-neutral-900 text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
        disabled={!isFormValid || isProcessing || items.length === 0}
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Processing...
          </span>
        ) : (
          `Pay $${totalAmount}`
        )}
      </Button>
    </form>
  );
}
