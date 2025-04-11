"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Calendar,
  Clock,
  Award,
  BarChart,
  ChevronRight,
  GraduationCap,
  Layout,
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseCard } from "@/components/courses/course-card";
import { courses } from "@/lib/data";

type User = {
  email: string;
  name: string;
}

// Mock data for enrolled courses (in a real app, this would come from a database)
const mockEnrolledCourses = courses.slice(0, 3);
const mockContinueLearning = courses.slice(0, 1);
const mockCompletedCourses = [courses[4]];

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Failed to parse user data:", error);
      router.push("/login");
    }

    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-20 w-20 rounded-full bg-muted mb-4">
                  <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <h2 className="font-bold text-lg mb-1">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>

                <div className="mt-4 w-full">
                  <Button variant="secondary" className="w-full" size="sm">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>

            <nav className="bg-card rounded-lg border shadow-sm overflow-hidden">
              <div className="bg-muted py-2 px-4">
                <p className="text-xs font-medium">MENU</p>
              </div>
              <div className="p-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium"
                >
                  <Layout className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/my-courses"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/80 font-medium"
                >
                  <BookOpen className="h-4 w-4" />
                  My Courses
                </Link>
                <Link
                  href="/dashboard/achievements"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/80 font-medium"
                >
                  <Award className="h-4 w-4" />
                  Achievements
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/80 font-medium"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/80 w-full text-left font-medium text-red-500"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Welcome message */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Welcome back, {user?.name}!</CardTitle>
                <CardDescription>
                  Your learning journey continues. Track your progress and keep learning.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Enrolled Courses</span>
                    </div>
                    <p className="text-2xl font-bold">{mockEnrolledCourses.length}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                    <p className="text-2xl font-bold">{mockCompletedCourses.length}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Certificates</span>
                    </div>
                    <p className="text-2xl font-bold">{mockCompletedCourses.length}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Hours Spent</span>
                    </div>
                    <p className="text-2xl font-bold">12.5</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Continue Learning */}
            {mockContinueLearning.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Continue Learning</h2>
                  <Button variant="link" asChild className="gap-1 py-0">
                    <Link href="/dashboard/my-courses">
                      View all my courses <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="bg-card rounded-lg border overflow-hidden">
                  {mockContinueLearning.map((course) => (
                    <div key={course.id} className="p-6 flex flex-col md:flex-row gap-6 items-center">
                      <div className="relative h-48 w-full md:h-32 md:w-48 rounded-lg overflow-hidden">
                        <Image
                          src={course.thumbnailUrl}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex items-center gap-6 text-sm mb-4">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>Lesson 3 of {course.lessons}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart className="h-4 w-4" />
                            <span>25% Complete</span>
                          </div>
                        </div>
                        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                        <div className="mt-4">
                          <Button asChild>
                            <Link href={`/courses/${course.id}`}>Continue Learning</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* My Courses Tabs */}
            <Tabs defaultValue="enrolled">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">My Courses</h2>
                <TabsList>
                  <TabsTrigger value="enrolled">Enrolled ({mockEnrolledCourses.length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({mockCompletedCourses.length})</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="enrolled" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockEnrolledCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockCompletedCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Scheduled webinars and learning sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Advanced JavaScript: Live Q&A Session</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        Join the instructor for a live Q&A session to clear your doubts.
                      </p>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Tomorrow, 3:00 PM
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> 1 hour
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto shrink-0">
                      Add to Calendar
                    </Button>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Web Development Workshop</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        Hands-on workshop on building modern web applications.
                      </p>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Friday, 5:00 PM
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> 2 hours
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto shrink-0">
                      Add to Calendar
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/events">View all events</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
