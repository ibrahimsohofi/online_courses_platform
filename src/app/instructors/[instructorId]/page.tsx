"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  User,
  Mail,
  BookOpen,
  Star,
  Users,
  Award,
  Twitter,
  Linkedin,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/courses/course-card";
import { instructors, getCoursesByInstructor, Instructor, Course } from "@/lib/data";

export default function InstructorPage() {
  const params = useParams();
  const instructorId = params.instructorId as string;
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [instructorCourses, setInstructorCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find instructor by ID
    const foundInstructor = instructors.find(inst => inst.id === instructorId);
    if (foundInstructor) {
      setInstructor(foundInstructor);
      // Get instructor's courses
      const courses = getCoursesByInstructor(instructorId);
      setInstructorCourses(courses);
    }
    setLoading(false);
  }, [instructorId]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-md text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading instructor profile...</p>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Instructor Header */}
      <div className="w-full bg-muted py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3 flex flex-col items-center md:items-start">
              <div className="relative h-48 w-48 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                <Image
                  src={instructor.avatarUrl}
                  alt={instructor.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{instructor.name}</h1>
                <p className="text-primary font-medium mb-4">Expert Instructor</p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{instructor.rating} Rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{instructor.students.toLocaleString()} Students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{instructor.courses} Courses</span>
                  </div>
                </div>

                <div className="flex justify-center md:justify-start gap-4 mt-6">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">About Me</h2>
                <p className="text-muted-foreground mb-4">{instructor.bio}</p>
                <p className="text-muted-foreground">
                  I've been teaching online for over 5 years, helping thousands of students achieve their goals.
                  My teaching approach focuses on practical, real-world applications that you can use immediately
                  in your work or projects.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-background border rounded-lg p-6 shadow-sm">
                  <div className="mb-3">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">Teaching Experience</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Over 8 years of teaching experience in both academic and industry settings.
                  </p>
                </div>

                <div className="bg-background border rounded-lg p-6 shadow-sm">
                  <div className="mb-3">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">Student Support</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Responsive to questions with an average response time of 24 hours.
                  </p>
                </div>

                <div className="bg-background border rounded-lg p-6 shadow-sm">
                  <div className="mb-3">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">Course Updates</h3>
                  </div>
                  <p className="text-muted-foreground">
                    All courses are regularly updated to keep content fresh and relevant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructor Courses */}
      <div className="container py-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Courses by {instructor.name}</h2>

            {instructorCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {instructorCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center p-12 border rounded-lg bg-muted/30">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No courses available</h3>
                <p className="text-muted-foreground">
                  This instructor hasn't published any courses yet.
                </p>
              </div>
            )}
          </div>

          {/* Contact Instructor */}
          <div className="bg-muted rounded-lg p-8 mt-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-2">Want to Work with {instructor.name}?</h2>
              <p className="text-muted-foreground mb-6">
                Get in touch for custom training, workshops, or consulting services.
              </p>
              <Button className="gap-2" asChild>
                <Link href={`mailto:${instructor.name.toLowerCase().replace(' ', '.')}@example.com`}>
                  <Mail className="h-4 w-4" />
                  Contact Instructor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
