"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Course } from "@/lib/data";

type CartItem = {
  courseId: string;
  course: Course;
};

interface CartContextType {
  items: CartItem[];
  addItem: (courseId: string, course: Course) => void;
  removeItem: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart data:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (courseId: string, course: Course) => {
    setItems((prev) => {
      // Check if item already exists
      if (prev.some((item) => item.courseId === courseId)) {
        return prev;
      }
      return [...prev, { courseId, course }];
    });
  };

  const removeItem = (courseId: string) => {
    setItems((prev) => prev.filter((item) => item.courseId !== courseId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (courseId: string) => {
    return items.some((item) => item.courseId === courseId);
  };

  const totalItems = items.length;

  const totalPrice = items.reduce(
    (total, item) => total + (item.course.discountPrice || item.course.price),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
