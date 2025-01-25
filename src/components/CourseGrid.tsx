import CourseCard from "./CourseCard";
import { Code2, BookOpen, Users, MessageSquare } from "lucide-react";

const courses = [
  {
    title: "Web Development",
    description: "Learn modern web development with React and Node.js",
    icon: <Code2 className="w-8 h-8" />,
  },
  {
    title: "Soft Skills",
    description: "Develop essential communication and leadership skills",
    icon: <Users className="w-8 h-8" />,
  },
  {
    title: "Computer Science",
    description: "Master fundamental computer science concepts",
    icon: <BookOpen className="w-8 h-8" />,
  },
  {
    title: "Business Management",
    description: "Learn key business strategies and management skills",
    icon: <MessageSquare className="w-8 h-8" />,
  },
];

const CourseGrid = () => {
  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseGrid;