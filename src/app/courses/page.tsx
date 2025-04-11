import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CourseCard } from "@/components/courses/course-card";
import { courses, categories } from "@/lib/data";

// For static site generation
export function generateStaticParams() {
  return [];
}

export default function CoursesPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Sidebar - Filters */}
        <div className="w-full md:w-1/4 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Search Courses</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Link
                    href={`/categories/${category.id}`}
                    className="text-sm hover:underline"
                  >
                    {category.name}
                    <span className="text-muted-foreground ml-1">({category.courses})</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Level</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="beginner"
                  type="checkbox"
                  className="mr-2"
                />
                <label htmlFor="beginner" className="text-sm">
                  Beginner
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="intermediate"
                  type="checkbox"
                  className="mr-2"
                />
                <label htmlFor="intermediate" className="text-sm">
                  Intermediate
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="advanced"
                  type="checkbox"
                  className="mr-2"
                />
                <label htmlFor="advanced" className="text-sm">
                  Advanced
                </label>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Price</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="paid"
                  type="radio"
                  name="price"
                  className="mr-2"
                />
                <label htmlFor="paid" className="text-sm">
                  Paid
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="discounted"
                  type="radio"
                  name="price"
                  className="mr-2"
                />
                <label htmlFor="discounted" className="text-sm">
                  Discounted
                </label>
              </div>
            </div>
          </div>

          <Button className="w-full">Apply Filters</Button>
        </div>

        {/* Main Content - Course List */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">All Courses</h1>
              <p className="text-muted-foreground">
                Browse all available courses
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Sort By
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
