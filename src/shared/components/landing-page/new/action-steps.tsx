import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shared/components/ui/card";

export default function ActionSteps() {
  const steps = [
    { title: "Sign Up", description: "Create your account in just 2 minutes" },
    {
      title: "Customize",
      description: "Set up your preferences and integrations",
    },
    {
      title: "Launch",
      description: "Start using the platform and see immediate results",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          How to Get Started
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-2xl">{step.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
