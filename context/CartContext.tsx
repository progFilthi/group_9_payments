"use client";

import React, { createContext, useContext, useReducer, useMemo } from "react";
import { Product, CartItem } from "@/types";

// ---------- State & Actions ----------

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_FROM_CART"; id: string }
  | { type: "UPDATE_QUANTITY"; id: string; quantity: number }
  | { type: "CLEAR_CART" };

// ---------- Reducer ----------

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { ...action.product, quantity: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.id !== action.id) };
      }
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      };
    }
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

// ---------- Context ----------

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalItems: number;
  getItemQuantity: (id: string) => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

// ---------- Provider ----------

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const value = useMemo<CartContextValue>(() => {
    const totalAmount = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalItems = state.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    return {
      items: state.items,
      addToCart: (product: Product) =>
        dispatch({ type: "ADD_TO_CART", product }),
      removeFromCart: (id: string) =>
        dispatch({ type: "REMOVE_FROM_CART", id }),
      updateQuantity: (id: string, quantity: number) =>
        dispatch({ type: "UPDATE_QUANTITY", id, quantity }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
      totalAmount,
      totalItems,
      getItemQuantity: (id: string) =>
        state.items.find((i) => i.id === id)?.quantity ?? 0,
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ---------- Hook ----------

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
