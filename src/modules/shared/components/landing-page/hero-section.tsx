"use client";

import { Button } from "@/modules/shared/components/ui/button";
import Link from "next/link";
import { Vortex } from "@/modules/shared/components/ui/vortex";
import { GRADIENT_STYLES } from "@/config/theme/styles";
import { SparklesIcon } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative mx-auto h-[calc(100vh-4rem)] overflow-hidden">
      <Vortex
        rangeY={400}
        particleCount={350}
        baseHue={30}
        baseSpeed={0.2}
        rangeSpeed={2}
        baseRadius={1.5}
      >
        <div className="flex flex-col h-full justify-center items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Your path, <br />{" "}
            <span className={GRADIENT_STYLES}>brilliantly lit.</span>
          </h1>
          <p className="mx-auto max-w-[700px] md:text-xl text-muted-foreground">
            Turn your audience into a thriving community with dynamic profiles,
            get personalized insights on engaging fans, selling merch, and
            growing your reach. Every step forward, illuminated.
          </p>
          <div className="space-x-4">
            <Link href="/auth" passHref>
              <Button className="mt-4">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </Vortex>
      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-black to-transparent pointer-events-none" />
      {/* Horizontal fade edges */}
      <div className="absolute bottom-0 left-0 w-[15vw] h-[30vh] bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[15vw] h-[20vh] bg-gradient-to-l from-black to-transparent pointer-events-none" />
    </div>
  );
}
