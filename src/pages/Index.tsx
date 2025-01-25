import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CourseGrid from "@/components/CourseGrid";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <CourseGrid />
      <ChatInterface />
    </div>
  );
};

export default Index;