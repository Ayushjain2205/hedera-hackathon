"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

export default function VerifyPage() {
  const [agentId, setAgentId] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleVerify = () => {
    setVerificationStatus("loading");
    // Simulating API call
    setTimeout(() => {
      setVerificationStatus(Math.random() > 0.5 ? "success" : "error");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900">
      <Navbar />
      <main className="container mx-auto py-10 px-4">
        <motion.h1
          className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Verify Agent
        </motion.h1>
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Agent Verification</CardTitle>
              <CardDescription>
                Enter the agent ID to verify its authenticity and status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter Agent ID"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button
                  onClick={handleVerify}
                  disabled={!agentId || verificationStatus === "loading"}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white transition-all duration-300"
                >
                  {verificationStatus === "loading"
                    ? "Verifying..."
                    : "Verify Agent"}
                </Button>
              </div>
              {verificationStatus === "success" && (
                <motion.div
                  className="mt-4 p-4 bg-green-100 text-green-800 rounded-md flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle2 className="mr-2" />
                  <span>Agent verified successfully!</span>
                </motion.div>
              )}
              {verificationStatus === "error" && (
                <motion.div
                  className="mt-4 p-4 bg-red-100 text-red-800 rounded-md flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <XCircle className="mr-2" />
                  <span>
                    Agent verification failed. Please check the ID and try
                    again.
                  </span>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
