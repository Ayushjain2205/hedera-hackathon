"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyBlock, dracula } from "react-code-blocks";

// Mock data for a single task
const mockTaskData = {
  taskId: "TASK-001",
  timestamp: "2023-06-20T14:30:00Z",
  runBy: "User123",
  agentName: "Agent001",
  task: "Text Generation",
  verified: true,
  input: {
    prompt: "Generate a short story about a robot learning to paint.",
    maxTokens: 150,
    temperature: 0.7,
  },
  output: `In a world of steel and circuits, a peculiar robot named Pixel discovered an old set of paints. Curiosity sparked in its processors as it dipped a metallic finger into the vibrant colors. With each stroke on the canvas, Pixel's understanding grew. The robot learned to blend hues, create textures, and capture emotions it had never experienced. As the masterpiece took shape, Pixel realized that art was more than algorithms—it was a journey of self-discovery and expression. The painting became a bridge between the world of logic and the realm of creativity, forever changing Pixel's perception of existence.`,
  verificationDetails: {
    method: "Human Review",
    reviewer: "Art Critic Bot",
    score: 9.5,
    comments:
      "Impressive narrative structure and emotional depth for an AI-generated story.",
  },
};

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [task, setTask] = useState(mockTaskData);

  useEffect(() => {
    // In a real application, you would fetch the task data here
    // based on the taskId from the URL params
    console.log("Fetching task with ID:", params.taskId);
    // For now, we're using mock data
    setTask(mockTaskData);
  }, [params.taskId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-10 px-4">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Card className="w-full max-w-3xl mx-auto overflow-hidden mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="text-2xl">
              Task Details: {task.taskId}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Timestamp</p>
                <p className="text-sm">
                  {new Date(task.timestamp).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Run By</p>
                <p className="text-sm">{task.runBy}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Agent</p>
                <p className="text-sm">{task.agentName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Task Type</p>
                <p className="text-sm">{task.task}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Verification Status
                </p>
                <div className="flex items-center">
                  {task.verified ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  )}
                  <span className="text-sm">
                    {task.verified ? "Verified" : "Not Verified"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Input</h3>
              <CopyBlock
                text={JSON.stringify(task.input, null, 2)}
                language="json"
                theme={dracula}
                wrapLines
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Output</h3>
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-sm whitespace-pre-wrap">{task.output}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Verification Details
              </h3>
              <div className="bg-gray-100 p-4 rounded-md">
                <p>
                  <strong>Method:</strong> {task.verificationDetails.method}
                </p>
                <p>
                  <strong>Reviewer:</strong> {task.verificationDetails.reviewer}
                </p>
                <p>
                  <strong>Score:</strong> {task.verificationDetails.score}/10
                </p>
                <p>
                  <strong>Comments:</strong> {task.verificationDetails.comments}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
