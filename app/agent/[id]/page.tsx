"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for a single agent
const agentData = {
  id: 1,
  name: "Agent001",
  status: "Active",
  score: 95,
  tasks: 150,
  type: "General Purpose",
  creationDate: "2023-05-15",
  lastActive: "2023-06-20",
  capabilities: [
    "Natural Language Processing",
    "Image Recognition",
    "Data Analysis",
  ],
  performance: {
    accuracy: 0.98,
    responseTime: "120ms",
    uptime: "99.9%",
  },
};

export default function AgentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [agent, setAgent] = useState(agentData);

  useEffect(() => {
    // In a real application, you would fetch the agent data here
    // based on the ID from the URL params
    console.log("Fetching agent with ID:", params.id);
    // For now, we're using mock data
    setAgent(agentData);
  }, [params.id]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="container mx-auto py-10 px-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6"
        >
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold mb-8 text-blue-600">
          Agent Details: {agent.name}
        </h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>ID:</strong> {agent.id}
              </p>
              <p>
                <strong>Type:</strong> {agent.type}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <Badge
                  variant={
                    agent.status === "Active" ? "success" : "destructive"
                  }
                >
                  {agent.status}
                </Badge>
              </p>
              <p>
                <strong>Score:</strong> {agent.score}
              </p>
              <p>
                <strong>Tasks Completed:</strong> {agent.tasks}
              </p>
              <p>
                <strong>Creation Date:</strong> {agent.creationDate}
              </p>
              <p>
                <strong>Last Active:</strong> {agent.lastActive}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {agent.capabilities.map((capability, index) => (
                  <li key={index}>{capability}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Accuracy:</strong> {agent.performance.accuracy * 100}%
              </p>
              <p>
                <strong>Average Response Time:</strong>{" "}
                {agent.performance.responseTime}
              </p>
              <p>
                <strong>Uptime:</strong> {agent.performance.uptime}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <Button>Update Agent</Button>
              <Button variant="outline">View Logs</Button>
              <Button variant="destructive">Deactivate Agent</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
