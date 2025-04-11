"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/cart-provider";
import type { Course } from "@/lib/data";

interface CourseCardActionsProps {
  course: Course;
  courseId: string;
}

export function CourseCardActions({ course, courseId }: CourseCardActionsProps) {
  const { addItem, isInCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(isInCart(courseId));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to course detail page
    e.stopPropagation(); // Stop event propagation

    addItem(courseId, course);
    setAddedToCart(true);
  };

  return (
    <div className="mt-2">
      {addedToCart ? (
        <Button
          size="sm"
          variant="outline"
          className="w-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = "/cart";
          }}
        >
          <Check className="h-3.5 w-3.5 mr-1" />
          Added to Cart
        </Button>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-3.5 w-3.5 mr-1" />
          Add to Cart
        </Button>
      )}
    </div>
  );
}
