"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Key, Fingerprint, Bot, Cpu, LineChart } from "lucide-react";

const capabilities = [
  {
    icon: Shield,
    title: "Secure Identity",
    description: "Blockchain-based agent verification",
    position: { top: "0%", left: "0%" },
  },
  {
    icon: Key,
    title: "Access Control",
    description: "Granular permission management",
    position: { top: "0%", right: "0%" },
  },
  {
    icon: Fingerprint,
    title: "Authentication",
    description: "Multi-factor security",
    position: { bottom: "30%", left: "-5%" },
  },
  {
    icon: Bot,
    title: "AI Agents",
    description: "Intelligent automation",
    position: { bottom: "30%", right: "-5%" },
  },
  {
    icon: Cpu,
    title: "Processing",
    description: "High-performance compute",
    position: { bottom: "0%", left: "0%" },
  },
  {
    icon: LineChart,
    title: "Analytics",
    description: "Real-time monitoring",
    position: { bottom: "0%", right: "0%" },
  },
];

export function LandingHero() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-blue-50/50 overflow-hidden">
      <div className="container mx-auto px-4 py-12 relative">
        {/* Hero Text */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-5xl font-bold mb-4 text-blue-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to KYAgent
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The next generation platform for AI agent identity and verification
          </motion.p>
        </div>

        {/* Center Logo and Capabilities */}
        <div className="relative w-full max-w-5xl mx-auto h-[700px]">
          {/* Center Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]">
            <motion.div
              className="w-full h-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.6,
              }}
            >
              <Image
                src="/KYAgent.svg"
                alt="KYAgent Logo"
                layout="fill"
                objectFit="contain"
                priority
              />
            </motion.div>
          </div>

          {/* Capability Cards */}
          {capabilities.map((item, index) => (
            <motion.div
              key={item.title}
              className="absolute hidden lg:block"
              style={{
                ...item.position,
                width: "250px",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
            >
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-blue-100 mb-4">
                    <item.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Grid View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden mt-8">
          {capabilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-blue-100 mb-4">
                    <item.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </div>
  );
}
