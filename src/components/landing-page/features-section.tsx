"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Code, Globe, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Experience unparalleled speed and efficiency.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Access your data from anywhere in the world.",
  },
  {
    icon: Code,
    title: "Powerful API",
    description: "Integrate seamlessly with your existing tools.",
  },
  {
    icon: CheckCircle,
    title: "99.9% Uptime",
    description: "Rely on our robust and stable infrastructure.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-secondary flex justify-center items-center"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center bg-card p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <feature.icon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
