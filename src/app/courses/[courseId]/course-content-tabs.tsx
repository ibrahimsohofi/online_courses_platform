"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Clock, ChevronRight, Play, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Course, Lesson } from "@/lib/data";

interface CourseContentTabsProps {
  course: Course;
  lessons: Lesson[];
}

export default function CourseContentTabs({ course, lessons }: CourseContentTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const currentLesson = lessons[currentLessonIndex];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

            <div>
              <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Master the fundamentals of {course.category}</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Build real-world projects from scratch</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Learn best practices and industry standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Get feedback on your work from experts</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Access a community of like-minded learners</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Receive a certificate upon completion</span>
                </li>
              </ul>
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
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`p-4 border rounded-lg ${currentLessonIndex === index ? 'border-primary bg-primary/5' : ''}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            currentLessonIndex === index
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <Play className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {index + 1}. {lesson.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{lesson.description}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">{lesson.duration}</span>
                    </div>
                    <Button
                      variant="ghost"
                      className="mt-2 w-full justify-start text-left"
                      onClick={() => setCurrentLessonIndex(index)}
                    >
                      {currentLessonIndex === index ? 'Currently Playing' : 'Play Lesson'}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No lessons available for this course yet.</p>
              </div>
            )}
          </div>

          {currentLesson && (
            <div className="space-y-4">
              <div className="sticky top-24">
                <div className="bg-muted rounded-lg overflow-hidden">
                  <div className="aspect-video bg-black flex items-center justify-center">
                    <Play className="h-16 w-16 text-white opacity-70" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1">
                      {currentLesson.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {currentLesson.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
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
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                4.8 Instructor Rating
              </span>
              <span className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                15+ Courses
              </span>
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

            <div>
              <h3 className="text-xl font-bold mb-2">Instructor's Expertise</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{course.category} Specialist</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Industry Consultant</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Published Author</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Conference Speaker</span>
                </li>
              </ul>
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
                <div className="flex items-center justify-center mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={`star-${i}`}
                      className={`h-5 w-5 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">{course.reviews} ratings</p>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">5 stars</span>
                  <div className="h-2 rounded-full bg-muted-foreground/20 flex-1">
                    <div className="h-2 rounded-full bg-yellow-400" style={{ width: '75%' }} />
                  </div>
                  <span className="text-sm">75%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">4 stars</span>
                  <div className="h-2 rounded-full bg-muted-foreground/20 flex-1">
                    <div className="h-2 rounded-full bg-yellow-400" style={{ width: '18%' }} />
                  </div>
                  <span className="text-sm">18%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">3 stars</span>
                  <div className="h-2 rounded-full bg-muted-foreground/20 flex-1">
                    <div className="h-2 rounded-full bg-yellow-400" style={{ width: '5%' }} />
                  </div>
                  <span className="text-sm">5%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">2 stars</span>
                  <div className="h-2 rounded-full bg-muted-foreground/20 flex-1">
                    <div className="h-2 rounded-full bg-yellow-400" style={{ width: '1%' }} />
                  </div>
                  <span className="text-sm">1%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">1 star</span>
                  <div className="h-2 rounded-full bg-muted-foreground/20 flex-1">
                    <div className="h-2 rounded-full bg-yellow-400" style={{ width: '1%' }} />
                  </div>
                  <span className="text-sm">1%</span>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 space-y-6">
              <h2 className="text-2xl font-bold">Student Reviews</h2>

              {/* Sample Reviews */}
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <div className="flex items-start gap-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
                      <Image
                        src="https://randomuser.me/api/portraits/women/23.jpg"
                        alt="Reviewer"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">Emma Wilson</h3>
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={`review1-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">2 months ago</p>
                      <p>
                        This course exceeded my expectations! The instructor explains complex concepts in an easy-to-understand
                        way. I've already applied what I learned to my current project.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <div className="flex items-start gap-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
                      <Image
                        src="https://randomuser.me/api/portraits/men/42.jpg"
                        alt="Reviewer"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">James Miller</h3>
                        <div className="flex">
                          {Array.from({ length: 4 }, (_, i) => (
                            <Star key={`review2-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">3 months ago</p>
                      <p>
                        Great course with lots of practical examples. I would have liked more advanced content
                        towards the end, but overall it was worth the investment.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
                      <Image
                        src="https://randomuser.me/api/portraits/women/54.jpg"
                        alt="Reviewer"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">Sophia Chen</h3>
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={`review3-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">1 month ago</p>
                      <p>
                        The instructor is fantastic! Clear explanations, helpful exercises, and responsive to questions.
                        I'm already looking forward to taking more courses from this instructor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">Load More Reviews</Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
