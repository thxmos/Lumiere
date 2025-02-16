import { Button } from "@/modules/shared/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden bg-gray-100">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-10 mb-10 lg:mb-0">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Transform Your Business Today
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            Unlock your potential with our revolutionary solution that boosts
            productivity and drives growth.
          </p>
          <div className="flex space-x-4">
            <Button asChild size="lg">
              <Link href="#cta">Get Started Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Product showcase"
            width={600}
            height={400}
            className="rounded-lg shadow-xl"
          />
          <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
            <p className="font-bold">50% Productivity Boost</p>
            <p>Experienced by our clients</p>
          </div>
        </div>
      </div>
    </section>
  );
}
