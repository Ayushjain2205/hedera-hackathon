"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Puzzle,
  Zap,
  Rocket,
  Blocks,
  Bot,
  Workflow,
  Brain,
  Globe,
  Shield,
} from "lucide-react";

const roadmapItems = [
  {
    title: "Advanced Agent Framework Integrations",
    description:
      "Expanded integrations with next-gen agent frameworks and AI models.",
    icon: Puzzle,
    timeline: "Q1 2025",
  },
  {
    title: "AI-Assisted Agent Builder",
    description:
      "Create complex AI agents with the help of our own AI assistant.",
    icon: Blocks,
    timeline: "Q2 2025",
  },
  {
    title: "Quantum-Enhanced Agent Simulator",
    description:
      "Leverage quantum computing for ultra-realistic agent simulations and testing.",
    icon: Bot,
    timeline: "Q3 2025",
  },
  {
    title: "Interplanetary Agent Network",
    description:
      "Prepare your AI agents for deployment across Earth and future space colonies.",
    icon: Globe,
    timeline: "Q4 2025",
  },
  {
    title: "Neuro-Symbolic AI Integration",
    description:
      "Combine symbolic reasoning with neural networks for more capable agents.",
    icon: Brain,
    timeline: "Q1 2026",
  },
  {
    title: "Ethical AI Governance Framework",
    description:
      "Implement advanced ethical guidelines and governance for AI agents.",
    icon: Shield,
    timeline: "Q2 2026",
  },
  {
    title: "Holographic Agent Interfaces",
    description:
      "Interact with your AI agents through cutting-edge holographic technology.",
    icon: Zap,
    timeline: "Q3 2026",
  },
  {
    title: "Autonomous Agent Ecosystems",
    description:
      "Create self-sustaining ecosystems of AI agents that evolve and improve over time.",
    icon: Workflow,
    timeline: "Q4 2026",
  },
];

export default function WhatsNextPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <main className="container mx-auto py-10 px-4">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          The Future of KYAgent
        </motion.h1>
        <motion.p
          className="text-xl text-center text-gray-600 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Our visionary roadmap for revolutionizing AI agent management and
          integration
        </motion.p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <item.icon className="w-6 h-6 mr-2 text-blue-500" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <Badge variant="secondary">{item.timeline}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
