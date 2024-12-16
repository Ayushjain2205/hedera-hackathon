"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Cpu, Shield, Database, Globe } from "lucide-react";

const features = [
  {
    title: "Decentralized Identity",
    description:
      "Secure and verifiable identities for AI agents on the blockchain.",
    icon: Shield,
  },
  {
    title: "Automated Verification",
    description:
      "Streamlined process for verifying AI agent capabilities and compliance.",
    icon: Cpu,
  },
  {
    title: "Credential Management",
    description:
      "Easy-to-use dashboard for managing agent credentials and permissions.",
    icon: Database,
  },
  {
    title: "Interoperability",
    description:
      "Seamless integration with various blockchain networks and AI platforms.",
    icon: Globe,
  },
];

export function FeatureCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 my-16">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
            <CardHeader>
              <div className="mb-2 text-blue-600 group-hover:text-cyan-500 transition-colors duration-300">
                <feature.icon size={24} />
              </div>
              <CardTitle className="text-blue-600 group-hover:text-cyan-500 transition-colors duration-300">
                {feature.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
