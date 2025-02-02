"use client";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/constants/app";
import Link from "next/link";
import { Vortex } from "../ui/vortex";
import { GRADIENT_STYLES } from "@/constants/aceternity";
import { SparklesIcon } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="mx-auto h-[calc(100vh-4rem)] overflow-hidden">
      <Vortex
        rangeY={400}
        particleCount={200}
        baseSpeed={0.001}
        baseHue={30}
        containerClassName="flex-1"
      >
        <div className="flex flex-col h-full justify-center items-center space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Manage your links with
            <span className={GRADIENT_STYLES}>{APP_NAME}</span>
          </h1>
          <p className="mx-auto max-w-[700px] md:text-xl">
            Light up the path forward. Create profiles that evolve with you,
            while getting smart insights on growing your audience and turning
            connections into opportunities.
          </p>
          <div className="space-x-4">
            <Link href="/auth" passHref>
              <Button className="text-xl">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </Vortex>
    </div>
  );
}
