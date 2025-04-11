"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import ClientCheckout from "./client-checkout";
import { getCourseById, Course } from "@/lib/data";

export default function CheckoutPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundCourse = getCourseById(courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    }
    setLoading(false);
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-md text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  // If course doesn't exist, show 404
  if (!course) return notFound();

  return <ClientCheckout course={course} courseId={courseId} />;
}
