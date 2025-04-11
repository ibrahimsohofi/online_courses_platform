"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  LucideLoader2,
  CheckCircle2,
  Lock,
  Calendar,
  ShieldCheck,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import type { Course } from "@/lib/data";

interface ClientCheckoutProps {
  course: Course;
  courseId: string;
}

export default function ClientCheckout({ course, courseId }: ClientCheckoutProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const finalPrice = course.discountPrice || course.price;

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        setFormData(prev => ({
          ...prev,
          name: userData.name || "",
          email: userData.email || ""
        }));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .substring(0, 19);

      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }

    // Format expiry date with slash
    if (name === "expiryDate") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "$1/$2")
        .substring(0, 5);

      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }

    // Limit CVC to 3-4 digits
    if (name === "cvc") {
      const formattedValue = value.replace(/\D/g, "").substring(0, 4);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      // Store enrolled course in localStorage
      try {
        const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
        enrolledCourses.push(courseId);
        localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
      } catch (error) {
        console.error("Failed to update enrolled courses:", error);
      }

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 2000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen flex-col justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-md text-center">
          <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. You now have access to "{course.title}".
          </p>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container">
        <Link
          href={`/courses/${courseId}`}
          className="flex items-center gap-2 text-sm font-medium hover:underline mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to course
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-muted-foreground mb-6">
              Complete your purchase to gain access to this course
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
                <CardDescription>
                  All transactions are secure and encrypted
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium block mb-1">
                        Name on card
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Smith"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="text-sm font-medium block mb-1">
                        Email address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="cardNumber" className="text-sm font-medium block mb-1">
                        Card number
                      </label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="4242 4242 4242 4242"
                          required
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="pr-10"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="text-sm font-medium block mb-1">
                          Expiry date
                        </label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          required
                          value={formData.expiryDate}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="text-sm font-medium block mb-1">
                          CVC
                        </label>
                        <Input
                          id="cvc"
                          name="cvc"
                          placeholder="123"
                          required
                          value={formData.cvc}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>Pay ${finalPrice.toFixed(2)}</>
                      )}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Your payment information is secure
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex gap-4">
                  <div className="relative h-20 w-32 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={course.thumbnailUrl}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">By {course.instructor}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-muted px-2 py-1 rounded-full">{course.level}</span>
                      <span className="bg-muted px-2 py-1 rounded-full">{course.category}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Full lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Access on mobile and TV</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>{course.lessons} on-demand lessons</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between mb-2">
                    <span>Original price:</span>
                    <span>${course.price.toFixed(2)}</span>
                  </div>

                  {course.discountPrice && (
                    <div className="flex justify-between mb-2 text-green-600">
                      <span>Discount:</span>
                      <span>-${(course.price - course.discountPrice).toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                    <span>Total:</span>
                    <span>${finalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
