"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Code, Globe } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Share Anywhere",
    description: "One link to share all your social media and content.",
  },
  {
    icon: Code,
    title: "Custom Themes",
    description: "Personalize your profile page with custom themes.",
  },
  {
    icon: CheckCircle,
    title: "Analytics & Insights",
    description: "Track clicks and engagement on all your links.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-secondary flex justify-center items-center"
    >
      <div className="container">
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
