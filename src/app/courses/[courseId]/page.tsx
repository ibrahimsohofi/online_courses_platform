import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Clock, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getCourseById,
  getLessonsByCourseId,
  courses
} from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CoursePageProps = {
  params: {
    courseId: string;
  };
};

// Generate all possible paths for static generation
export function generateStaticParams() {
  return courses.map((course) => ({
    courseId: course.id,
  }));
}

export default function CourseDetailPage({ params }: CoursePageProps) {
  const course = getCourseById(params.courseId);
  if (!course) return notFound();

  const lessons = getLessonsByCourseId(params.courseId);

  return (
    <div className="min-h-screen">
      {/* Course Header */}
      <div className="w-full bg-muted py-12">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm px-3 py-1 bg-primary/10 rounded-full text-primary">
                {course.category}
              </span>
              <span className="text-sm px-3 py-1 bg-secondary/10 rounded-full text-secondary">
                {course.level}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground">{course.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {course.rating} ({course.reviews} reviews)
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {course.students} students
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
            <div className="flex items-center gap-2">
              <p>Created by:</p>
              <Link href={`/instructors/${course.instructor}`} className="font-medium hover:underline">
                {course.instructor}
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-2xl font-bold">
                ${course.discountPrice?.toFixed(2) || course.price.toFixed(2)}
              </p>
              {course.discountPrice && (
                <p className="text-lg text-muted-foreground line-through">
                  ${course.price.toFixed(2)}
                </p>
              )}
            </div>
            <Button size="lg" className="w-full md:w-auto">Enroll Now</Button>
          </div>
          <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-8">
            <TabsTrigger
              value="overview"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="curriculum"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
            >
              Curriculum
            </TabsTrigger>
            <TabsTrigger
              value="instructor"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
            >
              Instructor
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                  <p className="text-muted-foreground">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">Course Details</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Lessons</span>
                      <span className="font-medium">{course.lessons}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{course.duration}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Level</span>
                      <span className="font-medium">{course.level}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Language</span>
                      <span className="font-medium">English</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Certificate</span>
                      <span className="font-medium">Yes</span>
                    </li>
                  </ul>
                </div>

                <Button className="w-full">Enroll Now</Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>30-day money-back guarantee</p>
                  <p>Full lifetime access</p>
                  <p>Access on mobile and TV</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Course Curriculum</h2>
                  <p className="text-muted-foreground">
                    {course.lessons} lessons • {course.duration} total length
                  </p>
                </div>

                {lessons.length > 0 ? (
                  <div className="space-y-4">
                    {lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="p-4 border rounded-lg"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-muted">
                              <Clock className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {lesson.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">{lesson.description}</p>
                            </div>
                          </div>
                          <span className="text-sm font-medium">{lesson.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No lessons available for this course yet.</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Instructor Tab */}
          <TabsContent value="instructor" className="mt-0">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex flex-col items-center md:items-start gap-4 md:w-1/3">
                <div className="relative h-48 w-48 rounded-full overflow-hidden border-4 border-muted">
                  <Image
                    src={`https://randomuser.me/api/portraits/${course.instructor.includes('John') || course.instructor.includes('Michael') ? 'men' : 'women'}/1.jpg`}
                    alt={course.instructor}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold">{course.instructor}</h2>
                  <p className="text-primary">{course.category} Expert</p>
                </div>
              </div>

              <div className="md:w-2/3 space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">About the Instructor</h3>
                  <p className="text-muted-foreground">
                    {course.instructor} is a seasoned expert in {course.category} with over 10 years of professional experience.
                    They have worked with numerous clients and companies, helping them achieve their goals through
                    expert knowledge and practical applications.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-0">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 bg-muted p-6 rounded-lg">
                  <div className="text-center">
                    <h2 className="text-5xl font-bold mb-2">{course.rating}</h2>
                    <p className="text-muted-foreground">{course.reviews} ratings</p>
                  </div>
                </div>

                <div className="md:w-2/3 space-y-6">
                  <h2 className="text-2xl font-bold">Student Reviews</h2>

                  <div className="text-center py-12">
                    <p>Student reviews will be shown here</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
