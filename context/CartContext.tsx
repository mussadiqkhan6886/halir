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
}

export interface CartContextType {
  cart: CartItem[];
  totalAmount: number;
  totalItems: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (sku: string) => void;
  clearCart: () => void;
  updateQuantity: (sku: string, quantity: number) => void;
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

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.sku === newItem.sku);

      if (existing) {
        const updatedQuantity = Math.min(
          existing.quantity + newItem.quantity,
          newItem.stock
        );
        return prev.map((item) =>
          item.sku === newItem.sku
            ? { ...item, quantity: updatedQuantity }
            : item
        );
      }

      const quantity = Math.min(newItem.quantity, newItem.stock);
      return [...prev, { ...newItem, quantity }];
    });
  };

  const removeFromCart = (sku: string) => {
    setCart((prev) => prev.filter((item) => item.sku !== sku));
  };

  const updateQuantity = (sku: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.sku === sku
          ? { ...item, quantity: Math.min(Math.max(1, quantity), item.stock) }
          : item
      )
    );
  };

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
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};