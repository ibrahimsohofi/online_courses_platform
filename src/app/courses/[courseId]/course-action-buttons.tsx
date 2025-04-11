"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-provider";
import { ShoppingCart, Check } from "lucide-react";
import type { Course } from "@/lib/data";

interface CourseActionButtonsProps {
  course: Course;
  courseId: string;
}

export default function CourseActionButtons({ course, courseId }: CourseActionButtonsProps) {
  const { addItem, isInCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(isInCart(courseId));

  const handleAddToCart = () => {
    addItem(courseId, course);
    setAddedToCart(true);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        size="lg"
        className="w-full md:w-auto"
        asChild
      >
        <Link href={`/checkout/${course.id}`}>Enroll Now</Link>
      </Button>

      {addedToCart ? (
        <Button
          variant="outline"
          size="lg"
          className="w-full md:w-auto"
          asChild
        >
          <Link href="/cart">
            <Check className="h-4 w-4 mr-2" />
            View in Cart
          </Link>
        </Button>
      ) : (
        <Button
          variant="outline"
          size="lg"
          className="w-full md:w-auto"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      )}
    </div>
  );
}
