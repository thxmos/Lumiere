import Image from "next/image";
import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      company: "Tech Co.",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "This solution has transformed our business. We've seen incredible results in just a few months.",
    },
    {
      name: "Jane Smith",
      company: "Innovation Inc.",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "I can't imagine running our company without this tool. It's been a game-changer for us.",
    },
    {
      name: "Alex Johnson",
      company: "Growth Corp",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The ROI we've seen is off the charts. I highly recommend this to any business looking to scale.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={100}
                    height={100}
                    className="rounded-full mb-4"
                  />
                  <Quote className="text-primary h-8 w-8 mb-4" />
                  <blockquote className="mb-4 text-lg italic">
                    {testimonial.quote}
                  </blockquote>
                  <cite className="not-italic font-semibold">
                    {testimonial.name}
                  </cite>
                  <span className="text-sm text-gray-500">
                    {testimonial.company}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
