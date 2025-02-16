import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shared/components/ui/card";
import { Clock, DollarSign, Frown } from "lucide-react";

export default function PainPoints() {
  const painPoints = [
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Time Wasted",
      description: "Hours lost on inefficient processes",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-primary" />,
      title: "Money Lost",
      description: "Revenue slipping through the cracks",
    },
    {
      icon: <Frown className="h-8 w-8 text-primary" />,
      title: "Frustration",
      description: "Dealing with outdated systems",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Common Challenges We Solve
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="flex flex-col items-center text-center gap-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    {point.icon}
                  </div>
                  <span>{point.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">{point.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
