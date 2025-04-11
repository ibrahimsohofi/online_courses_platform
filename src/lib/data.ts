export type Course = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  reviews: number;
  students: number;
  price: number;
  discountPrice?: number;
  duration: string; // Format: "3h 45m"
  lessons: number;
  thumbnailUrl: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Lesson = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string; // Format: "10:30"
  videoUrl: string;
  order: number;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  courses: number;
  iconName: string;
};

export type Instructor = {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
  courses: number;
  students: number;
  rating: number;
};

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Web Development",
    description: "Learn how to build websites and web applications",
    courses: 120,
    iconName: "Code",
  },
  {
    id: "cat-2",
    name: "Data Science",
    description: "Master data analysis, visualization, and machine learning",
    courses: 85,
    iconName: "BarChart",
  },
  {
    id: "cat-3",
    name: "Business",
    description: "Develop skills in management, marketing, and entrepreneurship",
    courses: 95,
    iconName: "Briefcase",
  },
  {
    id: "cat-4",
    name: "Design",
    description: "Create beautiful designs for web, mobile, and print",
    courses: 75,
    iconName: "Paintbrush",
  },
  {
    id: "cat-5",
    name: "Photography",
    description: "Learn photography techniques and editing skills",
    courses: 50,
    iconName: "Camera",
  },
  {
    id: "cat-6",
    name: "Music",
    description: "Master musical instruments and music production",
    courses: 65,
    iconName: "Music",
  },
];

export const instructors: Instructor[] = [
  {
    id: "inst-1",
    name: "John Smith",
    bio: "Full-stack developer with 10+ years of experience. Specializes in React and Node.js.",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    courses: 12,
    students: 35000,
    rating: 4.8,
  },
  {
    id: "inst-2",
    name: "Sarah Johnson",
    bio: "Data scientist with a PhD in Computer Science. Passionate about machine learning and AI.",
    avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    courses: 8,
    students: 28000,
    rating: 4.9,
  },
  {
    id: "inst-3",
    name: "Michael Chen",
    bio: "Business consultant and entrepreneur. Helped launch over 50 successful startups.",
    avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    courses: 15,
    students: 42000,
    rating: 4.7,
  },
  {
    id: "inst-4",
    name: "Emily Davis",
    bio: "UX/UI designer with experience at major tech companies. Adobe Certified Expert.",
    avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    courses: 10,
    students: 31000,
    rating: 4.8,
  },
];

export const courses: Course[] = [
  {
    id: "course-1",
    title: "Complete Web Development Bootcamp",
    description: "Learn web development from scratch. Master HTML, CSS, JavaScript, React, Node.js, and more in this comprehensive bootcamp.",
    instructor: "John Smith",
    category: "Web Development",
    level: "Beginner",
    rating: 4.8,
    reviews: 2345,
    students: 15000,
    price: 99.99,
    discountPrice: 84.99,
    duration: "42h 30m",
    lessons: 150,
    thumbnailUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    featured: true,
    createdAt: "2023-05-12T10:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "course-2",
    title: "Data Science and Machine Learning",
    description: "Comprehensive guide to data science, machine learning, and AI. Includes Python, pandas, NumPy, scikit-learn, and TensorFlow.",
    instructor: "Sarah Johnson",
    category: "Data Science",
    level: "Intermediate",
    rating: 4.9,
    reviews: 1856,
    students: 12000,
    price: 129.99,
    discountPrice: 109.99,
    duration: "38h 15m",
    lessons: 135,
    thumbnailUrl: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    featured: true,
    createdAt: "2023-06-18T09:15:00Z",
    updatedAt: "2024-02-22T11:45:00Z",
  },
  {
    id: "course-3",
    title: "Entrepreneurship: Start Your Business",
    description: "Learn how to start and scale a successful business from scratch. Covers business planning, marketing, finance, and growth strategies.",
    instructor: "Michael Chen",
    category: "Business",
    level: "Beginner",
    rating: 4.7,
    reviews: 1452,
    students: 9800,
    price: 89.99,
    discountPrice: 74.99,
    duration: "32h 45m",
    lessons: 120,
    thumbnailUrl: "https://images.unsplash.com/photo-1556761175-129418cb2dfe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    featured: true,
    createdAt: "2023-07-24T14:20:00Z",
    updatedAt: "2024-03-10T16:50:00Z",
  },
  {
    id: "course-4",
    title: "UI/UX Design Masterclass",
    description: "Complete guide to UI/UX design. Learn design principles, user research, wireframing, prototyping, and design tools like Figma and Adobe XD.",
    instructor: "Emily Davis",
    category: "Design",
    level: "Intermediate",
    rating: 4.8,
    reviews: 1678,
    students: 11200,
    price: 109.99,
    discountPrice: 94.99,
    duration: "35h 20m",
    lessons: 130,
    thumbnailUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    featured: true,
    createdAt: "2023-08-05T11:10:00Z",
    updatedAt: "2024-02-28T13:25:00Z",
  },
  {
    id: "course-5",
    title: "Advanced JavaScript: From Fundamentals to Expert",
    description: "Deep dive into JavaScript. Master advanced concepts like closures, prototypes, async/await, and modern ES6+ features.",
    instructor: "John Smith",
    category: "Web Development",
    level: "Advanced",
    rating: 4.9,
    reviews: 1245,
    students: 8500,
    price: 119.99,
    discountPrice: 99.99,
    duration: "28h 15m",
    lessons: 100,
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    featured: false,
    createdAt: "2023-09-12T13:45:00Z",
    updatedAt: "2024-01-30T15:20:00Z",
  },
  {
    id: "course-6",
    title: "Photography Fundamentals",
    description: "Learn the art of photography from basics to advanced techniques. Covers camera settings, composition, lighting, and editing.",
    instructor: "Emily Davis",
    category: "Photography",
    level: "Beginner",
    rating: 4.7,
    reviews: 1356,
    students: 9200,
    price: 79.99,
    discountPrice: 64.99,
    duration: "24h 30m",
    lessons: 85,
    thumbnailUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    featured: false,
    createdAt: "2023-10-08T10:30:00Z",
    updatedAt: "2024-03-15T12:40:00Z",
  },
  {
    id: "course-7",
    title: "Digital Marketing Mastery",
    description: "Comprehensive digital marketing course. Learn SEO, social media marketing, email marketing, content marketing, and PPC advertising.",
    instructor: "Michael Chen",
    category: "Business",
    level: "Intermediate",
    rating: 4.8,
    reviews: 1578,
    students: 10500,
    price: 99.99,
    discountPrice: 84.99,
    duration: "30h 15m",
    lessons: 110,
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    featured: false,
    createdAt: "2023-11-15T15:50:00Z",
    updatedAt: "2024-02-18T17:35:00Z",
  },
  {
    id: "course-8",
    title: "Piano for Beginners to Intermediate",
    description: "Learn to play piano from the basics to intermediate level. Covers music theory, techniques, and popular songs.",
    instructor: "Sarah Johnson",
    category: "Music",
    level: "Beginner",
    rating: 4.9,
    reviews: 1245,
    students: 8300,
    price: 89.99,
    discountPrice: 74.99,
    duration: "26h 45m",
    lessons: 95,
    thumbnailUrl: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    featured: false,
    createdAt: "2023-12-20T09:45:00Z",
    updatedAt: "2024-03-22T11:30:00Z",
  },
];

export const lessonsByCourse: Record<string, Lesson[]> = {
  "course-1": [
    {
      id: "lesson-1-1",
      courseId: "course-1",
      title: "Introduction to Web Development",
      description: "Overview of the course and introduction to web development concepts.",
      duration: "15:30",
      videoUrl: "https://example.com/videos/lesson-1-1.mp4",
      order: 1,
    },
    {
      id: "lesson-1-2",
      courseId: "course-1",
      title: "HTML Fundamentals",
      description: "Learn the basics of HTML, tags, attributes, and document structure.",
      duration: "28:45",
      videoUrl: "https://example.com/videos/lesson-1-2.mp4",
      order: 2,
    },
    {
      id: "lesson-1-3",
      courseId: "course-1",
      title: "CSS Basics",
      description: "Introduction to CSS, selectors, properties, and styling elements.",
      duration: "32:15",
      videoUrl: "https://example.com/videos/lesson-1-3.mp4",
      order: 3,
    },
    {
      id: "lesson-1-4",
      courseId: "course-1",
      title: "JavaScript Introduction",
      description: "Getting started with JavaScript, variables, data types, and operators.",
      duration: "40:20",
      videoUrl: "https://example.com/videos/lesson-1-4.mp4",
      order: 4,
    },
    {
      id: "lesson-1-5",
      courseId: "course-1",
      title: "Building Your First Webpage",
      description: "Combine HTML, CSS, and JavaScript to build a simple webpage.",
      duration: "45:10",
      videoUrl: "https://example.com/videos/lesson-1-5.mp4",
      order: 5,
    },
  ],
  "course-2": [
    {
      id: "lesson-2-1",
      courseId: "course-2",
      title: "Introduction to Data Science",
      description: "Overview of data science and the data analysis process.",
      duration: "18:45",
      videoUrl: "https://example.com/videos/lesson-2-1.mp4",
      order: 1,
    },
    {
      id: "lesson-2-2",
      courseId: "course-2",
      title: "Python for Data Science",
      description: "Learn Python programming fundamentals for data analysis.",
      duration: "35:20",
      videoUrl: "https://example.com/videos/lesson-2-2.mp4",
      order: 2,
    },
    {
      id: "lesson-2-3",
      courseId: "course-2",
      title: "Data Cleaning and Preprocessing",
      description: "Techniques for cleaning and preparing data for analysis.",
      duration: "42:10",
      videoUrl: "https://example.com/videos/lesson-2-3.mp4",
      order: 3,
    },
    {
      id: "lesson-2-4",
      courseId: "course-2",
      title: "Exploratory Data Analysis",
      description: "Methods for exploring and visualizing data to extract insights.",
      duration: "38:55",
      videoUrl: "https://example.com/videos/lesson-2-4.mp4",
      order: 4,
    },
    {
      id: "lesson-2-5",
      courseId: "course-2",
      title: "Introduction to Machine Learning",
      description: "Basics of machine learning algorithms and model evaluation.",
      duration: "47:30",
      videoUrl: "https://example.com/videos/lesson-2-5.mp4",
      order: 5,
    },
  ],
};

// Helper functions
export function getFeaturedCourses(): Course[] {
  return courses.filter(course => course.featured);
}

export function getPopularCourses(): Course[] {
  return [...courses].sort((a, b) => b.students - a.students).slice(0, 4);
}

export function getNewestCourses(): Course[] {
  return [...courses].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 4);
}

export function getCourseById(id: string): Course | undefined {
  return courses.find(course => course.id === id);
}

export function getCoursesByCategory(categoryId: string): Course[] {
  const category = categories.find(cat => cat.id === categoryId);
  if (!category) return [];
  return courses.filter(course => course.category === category.name);
}

export function getCoursesByInstructor(instructorId: string): Course[] {
  const instructor = instructors.find(inst => inst.id === instructorId);
  if (!instructor) return [];
  return courses.filter(course => course.instructor === instructor.name);
}

export function getLessonsByCourseId(courseId: string): Lesson[] {
  return lessonsByCourse[courseId] || [];
}
