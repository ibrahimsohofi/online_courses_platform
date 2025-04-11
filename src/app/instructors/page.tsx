import Link from "next/link";
import Image from "next/image";
import { Star, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { instructors } from "@/lib/data";

export default function InstructorsPage() {
  return (
    <div className="container py-12">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Our Expert Instructors</h1>
        <p className="text-xl text-muted-foreground">
          Learn from industry professionals with years of experience and a passion for teaching
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {instructors.map((instructor) => (
          <Card key={instructor.id} className="overflow-hidden transition-all hover:shadow-md">
            <div className="pt-6 px-6 text-center">
              <div className="relative h-36 w-36 rounded-full overflow-hidden mx-auto mb-4 border-4 border-muted">
                <Image
                  src={instructor.avatarUrl}
                  alt={instructor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-bold mb-1">{instructor.name}</h2>
              <p className="text-sm text-primary mb-3">{instructor.id.includes('1') || instructor.id.includes('3') ? 'Web Development Expert' : 'Data Science Expert'}</p>
              <div className="flex flex-wrap justify-center gap-3 mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{instructor.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{instructor.courses} courses</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{(instructor.students / 1000).toFixed(1)}k students</span>
                </div>
              </div>
            </div>

            <CardContent className="px-6">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {instructor.bio}
              </p>
            </CardContent>

            <CardFooter className="px-6 pb-6">
              <Button className="w-full" asChild>
                <Link href={`/instructors/${instructor.id}`}>View Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Join as Instructor section */}
      <div className="mt-16 bg-muted rounded-lg p-10 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Become an Instructor</h2>
          <p className="text-xl text-muted-foreground mb-6">
            Join our team of expert instructors and share your knowledge with students around the world
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">01</div>
              <h3 className="text-lg font-bold mb-2">Create Your Course</h3>
              <p className="text-sm text-muted-foreground">
                Build your course using our comprehensive tools and resources
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">02</div>
              <h3 className="text-lg font-bold mb-2">Publish and Promote</h3>
              <p className="text-sm text-muted-foreground">
                Get your course in front of thousands of potential students
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">03</div>
              <h3 className="text-lg font-bold mb-2">Earn Revenue</h3>
              <p className="text-sm text-muted-foreground">
                Receive payment for every student that enrolls in your course
              </p>
            </div>
          </div>
          <Button size="lg" asChild>
            <Link href="/become-instructor">Apply to Become an Instructor</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
