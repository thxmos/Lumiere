"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Palette, ChartLine } from "lucide-react"; // Changed icons to be more modern

const features = [
  {
    icon: Sparkles,
    title: "Multiple Profiles, One Link",
    description:
      "Share different sides of your story. Music, art, merch — each with its own space, all from one central hub.",
  },
  {
    icon: Palette,
    title: "Your Aesthetic, Your Way",
    description:
      "Create stunning profiles that match your brand with custom themes, animations, and dynamic layouts.",
  },
  {
    icon: ChartLine,
    title: "Growth Insights",
    description:
      "Turn data into direction with real-time analytics and smart recommendations to grow your audience.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-black/[0.96] flex justify-center items-center"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
            Crafted for Creators
          </h2>
          <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
            Every feature designed to amplify your presence and strengthen your
            connection with fans.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-zinc-900/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-[1px] rounded-2xl bg-zinc-900/90" />

                <div className="relative z-10 flex flex-col items-center justify-center">
                  <feature.icon className="h-12 w-12 mb-6 text-orange-500/80 group-hover:text-yellow-500/80 transition-colors duration-500" />
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
