import Link from "next/link";
import Image from "next/image";
import { Star, Clock, BookOpen, Award } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Course } from "@/lib/data";
import { CourseCardActions } from "./course-card-actions";

export interface CourseCardProps {
  course: Course;
  className?: string;
}

export function CourseCard({ course, className }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className={`overflow-hidden transition-all hover:shadow-md ${className}`}>
        <div className="relative h-48 w-full">
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover"
          />
          {course.featured && (
            <div className="absolute left-0 top-4 bg-yellow-500 py-1 px-3 text-xs font-medium text-white">
              Featured
            </div>
          )}
          <div className="absolute right-0 top-4 bg-black/70 py-1 px-3 text-xs font-medium text-white">
            {course.level}
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {course.rating}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {course.lessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.duration}
            </span>
          </div>
          <h3 className="mb-2 line-clamp-2 text-lg font-bold">{course.title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {course.description}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm">By {course.instructor}</span>
          </div>
          <CourseCardActions course={course} courseId={course.id} />
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4">
          <div className="flex items-center gap-2">
            {course.discountPrice ? (
              <>
                <span className="text-lg font-bold">${course.discountPrice.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground line-through">
                  ${course.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">${course.price.toFixed(2)}</span>
            )}
          </div>
          <div className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
            {course.category}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
