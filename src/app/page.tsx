import Link from "next/link";
import Image from "next/image";
import { BookOpen, ChevronRight, Award, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/courses/course-card";
import { getFeaturedCourses, getPopularCourses, getNewestCourses, categories } from "@/lib/data";

export default function Home() {
  const featuredCourses = getFeaturedCourses();
  const popularCourses = getPopularCourses();
  const newestCourses = getNewestCourses();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-primary/5">
        <div className="container flex flex-col md:flex-row items-center py-16 md:py-24 gap-8">
          <div className="flex flex-col space-y-6 md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Expand your skills, with online courses
            </h1>
            <p className="text-xl text-muted-foreground">
              Access high-quality courses taught by expert instructors.
              Learn at your own pace and achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/courses">
                  Explore Courses
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/categories">
                  Browse Categories
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>500+ Courses</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>Expert Instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Lifetime Access</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <Image
              src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="Students learning online"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">100k+ Students</p>
                  <p className="text-sm text-muted-foreground">Joined our platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="w-full py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Courses</h2>
              <p className="text-muted-foreground mt-1">
                Handpicked courses recommended by our team
              </p>
            </div>
            <Button variant="outline" asChild className="gap-1">
              <Link href="/courses">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 bg-muted/50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">
              Browse by Category
            </h2>
            <p className="text-muted-foreground mt-2">
              Explore our wide range of courses by category
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="bg-card rounded-lg p-6 text-center hover:shadow-md transition-all"
              >
                <div className="bg-primary/10 mx-auto h-14 w-14 rounded-full flex items-center justify-center mb-3">
                  <span className="text-primary text-xl font-semibold">{category.iconName.charAt(0)}</span>
                </div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.courses} courses</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="w-full py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Popular Courses</h2>
              <p className="text-muted-foreground mt-1">
                Most enrolled courses by our students
              </p>
            </div>
            <Button variant="outline" asChild className="gap-1">
              <Link href="/courses">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Newest Courses Section */}
      <section className="w-full py-12 bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Newest Courses</h2>
              <p className="text-muted-foreground mt-1">
                Recently added courses to our platform
              </p>
            </div>
            <Button variant="outline" asChild className="gap-1">
              <Link href="/courses">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newestCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="w-full py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to start learning?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of students who are already learning and growing with our courses.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/courses">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
