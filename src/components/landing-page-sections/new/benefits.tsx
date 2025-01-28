import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function Benefits() {
  const benefits = [
    "Increase productivity by 50%",
    "Reduce costs by 30%",
    "Improve customer satisfaction",
    "Scale your business effortlessly",
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-10 mb-10 lg:mb-0">
            <h2 className="text-4xl font-bold mb-8">
              The Benefits You'll Experience
            </h2>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 h-6 w-6 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 relative">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Benefits visualization"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="font-bold text-2xl text-primary">30%</p>
              <p>Cost Reduction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
