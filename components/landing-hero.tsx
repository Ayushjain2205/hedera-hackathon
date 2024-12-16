"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function LandingHero() {
  return (
    <div className="text-center py-20">
      <motion.h1
        className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to KYAgent
      </motion.h1>
      <motion.p
        className="text-xl mb-10 text-gray-600 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Decentralized identity and verification platform for AI agents. Secure,
        transparent, and efficient.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
          Get Started
        </Button>
      </motion.div>
    </div>
  );
}
