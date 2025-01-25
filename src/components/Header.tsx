import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold text-gray-900">EduAI</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost">Courses</Button>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Contact</Button>
        </nav>
        <Button>Get Started</Button>
      </div>
    </header>
  );
};

export default Header;