"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  name: string;
  price: number;
  onSale: boolean;
  salePrice: number | null;
  quantity: number;
  image: string;
  selectedSize: number;
  stock: number;
  sku: string;
  personlized?: string
}

export interface CartContextType {
  cart: CartItem[];
  totalAmount: number;
  totalItems: number;
  addToCart: (item: CartItem) => boolean;
  removeFromCart: (sku: string, personlized?: string) => void;
  clearCart: () => void;
  increment: (sku: string, personlized?: string) => void
  decrement: (sku: string, personlized?: string) => void
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // 1. Load from localStorage on Mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart data", error);
      }
    }
  }, []);

  // 2. Save to localStorage whenever cart changes
  useEffect(() => {
    // We check for length or a specific 'initial' state if needed, 
    // but usually stringifying the array is fine.
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 3. Calculate Totals
  useEffect(() => {
    const amount = cart.reduce(
      (sum, item) =>
        item.onSale && item.salePrice !== null
          ? sum + item.salePrice * item.quantity
          : sum + item.price * item.quantity,
      0
    );
    const items = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalAmount(amount);
    setTotalItems(items);
  }, [cart]);

  const addToCart = (newItem: CartItem): boolean => {
    let wasAdded = false

    setCart((prev) => {
        // Sum all quantities for this sku across all personalizations
        const totalSkuQuantity = prev
            .filter((item) => item.sku === newItem.sku)
            .reduce((sum, item) => sum + item.quantity, 0)

        // Check against stock before doing anything
        if (totalSkuQuantity + newItem.quantity > newItem.stock) {
            wasAdded = false
            return prev
        }

        const existing = prev.find(
            (item) => item.sku === newItem.sku && item.personlized === newItem.personlized
        )

        if (existing) {
            wasAdded = true
            return prev.map((item) =>
                item.sku === newItem.sku && item.personlized === newItem.personlized
                    ? { ...item, quantity: existing.quantity + newItem.quantity }
                    : item
            )
        }

        wasAdded = true
        return [...prev, { ...newItem, quantity: newItem.quantity }]
    })

    return wasAdded
}

  const removeFromCart = (sku: string, personlized?: string) => {
    setCart((prev) =>
        prev.filter((item) => !(item.sku === sku && item.personlized === personlized))
    )
}


  const increment = (sku: string, personlized?: string) => {
    setCart((prev) =>
        prev.map((item) =>
            item.sku === sku && item.personlized === personlized
                ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
                : item
        )
    )
}


const decrement = (sku: string, personlized?: string) => {
    setCart((prev) =>
        prev.flatMap((item) => {
            if (!(item.sku === sku && item.personlized === personlized)) return [item]
            if (item.quantity <= 1) return []
            return [{ ...item, quantity: item.quantity - 1 }]
        })
    )
}

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalAmount,
        totalItems,
        addToCart,
        removeFromCart,
        clearCart,
        increment,
        decrement
      }}
    >
      {children}
    </CartContext.Provider>
  );
};