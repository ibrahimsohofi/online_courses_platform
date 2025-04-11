"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-provider";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, totalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle checkout for a single course
  const handleCheckout = (courseId: string) => {
    router.push(`/checkout/${courseId}`);
  };

  // Handle checkout for all courses - we'll implement this later when we have a multi-course checkout page
  const handleCheckoutAll = () => {
    // For now, if there's only one course, go directly to its checkout
    if (items.length === 1) {
      router.push(`/checkout/${items[0].courseId}`);
      return;
    }

    // Placeholder for future multi-course checkout
    alert("Multi-course checkout will be implemented in a future update. Please checkout courses individually for now.");
  };

  if (!mounted) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-muted/50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <ShoppingCart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            It looks like you haven't added any courses to your cart yet. Browse our courses to find something you like.
          </p>
          <Button size="lg" asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
      <p className="text-muted-foreground mb-8">Review your cart and proceed to checkout</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.courseId}
              className="border rounded-lg overflow-hidden bg-card"
            >
              <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
                <div className="relative h-48 md:h-32 md:w-56 rounded-md overflow-hidden">
                  <Image
                    src={item.course.thumbnailUrl}
                    alt={item.course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">By {item.course.instructor}</p>
                      <div className="flex gap-2 text-sm mb-4">
                        <span className="bg-muted px-2 py-1 rounded-full">{item.course.level}</span>
                        <span className="bg-muted px-2 py-1 rounded-full">{item.course.lessons} lessons</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex flex-col items-end">
                        <p className="font-bold text-lg">
                          ${(item.course.discountPrice || item.course.price).toFixed(2)}
                        </p>
                        {item.course.discountPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            ${item.course.price.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 flex items-center gap-1 px-2"
                      onClick={() => removeItem(item.courseId)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleCheckout(item.courseId)}
                    >
                      Checkout this course
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="border rounded-lg bg-card p-6 sticky top-8">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>

            <div className="space-y-2 border-b pb-4">
              {items.map((item) => (
                <div key={item.courseId} className="flex justify-between text-sm">
                  <span className="line-clamp-1">{item.course.title}</span>
                  <span>${(item.course.discountPrice || item.course.price).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button className="w-full" onClick={handleCheckoutAll}>
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => clearCart()}
              >
                Clear Cart
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Secure checkout powered by LearnOnline
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
