"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function RegistrationStatus() {
  const [agentName, setAgentName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const checkStatus = () => {
    setStatus("loading");
    // Simulating an API call
    setTimeout(() => {
      setStatus(Math.random() > 0.5 ? "success" : "error");
    }, 1500);
  };

  return (
    <motion.div
      className="max-w-md mx-auto bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg border border-neutral-200 border-gray-200 dark:border-neutral-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
        Check Registration Status
      </h2>
      <div className="flex space-x-2 mb-6">
        <Input
          type="text"
          placeholder="Enter agent name"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
          className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        <Button
          onClick={checkStatus}
          disabled={status === "loading" || !agentName}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white transition-all duration-300"
        >
          {status === "loading" ? "Checking..." : "Check"}
        </Button>
      </div>
      {status === "success" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="bg-green-50 border-green-200 text-green-800">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Agent "{agentName}" is registered and active.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="bg-red-50 border-red-200 text-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Agent "{agentName}" is not registered or inactive.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </motion.div>
  );
}
