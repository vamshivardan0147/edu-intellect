import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface CourseCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CourseCard = ({ title, description, icon }: CourseCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <CardHeader>
        <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
        <CardTitle className="mb-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CourseCard;