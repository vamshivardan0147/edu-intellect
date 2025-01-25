import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CourseProgress {
  hoursSpent: number;
  quizResults: {
    score: number;
    totalQuizzes: number;
  };
  weakTopics: string[];
  completionPercentage: number;
}

interface CourseCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress?: CourseProgress;
}

const CourseCard = ({ title, description, icon, progress }: CourseCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <CardHeader>
        <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
        <CardTitle className="mb-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {progress && (
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-sm text-muted-foreground">
                  {progress.completionPercentage}%
                </span>
              </div>
              <Progress value={progress.completionPercentage} />
            </div>
            
            <div className="text-sm">
              <p className="font-medium mb-1">Hours Spent: {progress.hoursSpent}h</p>
              <p className="font-medium mb-1">
                Quiz Score: {progress.quizResults.score}% ({progress.quizResults.totalQuizzes} quizzes)
              </p>
              {progress.weakTopics.length > 0 && (
                <div>
                  <p className="font-medium text-yellow-600">Areas for Improvement:</p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {progress.weakTopics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default CourseCard;