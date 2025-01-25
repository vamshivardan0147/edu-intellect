import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative py-20 px-6 bg-gradient-to-br from-primary/10 to-accent/30">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
          Empowering Learning Through AI
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
          Experience personalized education powered by artificial intelligence.
          Learn at your own pace with our adaptive learning system.
        </p>
        <Button size="lg" className="animate-fade-in">
          Start Learning Now
        </Button>
      </div>
    </div>
  );
};

export default Hero;