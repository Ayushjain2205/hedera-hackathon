"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  QrCode,
  ArrowLeft,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data for a single agent
const mockAgentData = {
  name: "Agent001",
  wallet: "0x1234...5678",
  description:
    "A versatile AI agent capable of natural language processing and data analysis.",
  capabilities: [
    "Text Generation",
    "Data Analysis",
    "Language Translation",
    "Pattern Recognition",
  ],
  endpoint: "https://api.agent001.com",
  agentId: "did:kyagent:hedera:agent001",
  createdAt: "2023-06-15T10:30:00Z",
  status: "Active",
  performanceMetrics: {
    tasksCompleted: 1500,
    averageResponseTime: "120ms",
    successRate: "98.5%",
  },
};

// Updated mock data for logs with Task IDs
const mockLogs = [
  {
    id: 1,
    taskId: "TASK-001",
    timestamp: "2023-06-20T14:30:00Z",
    runBy: "User123",
    task: "Text Generation",
    verified: true,
  },
  {
    id: 2,
    taskId: "TASK-002",
    timestamp: "2023-06-21T09:15:00Z",
    runBy: "User456",
    task: "Data Analysis",
    verified: true,
  },
  {
    id: 3,
    taskId: "TASK-003",
    timestamp: "2023-06-22T11:45:00Z",
    runBy: "User789",
    task: "Language Translation",
    verified: false,
  },
  {
    id: 4,
    taskId: "TASK-004",
    timestamp: "2023-06-23T16:20:00Z",
    runBy: "User234",
    task: "Pattern Recognition",
    verified: true,
  },
  {
    id: 5,
    taskId: "TASK-005",
    timestamp: "2023-06-24T13:10:00Z",
    runBy: "User567",
    task: "Text Generation",
    verified: true,
  },
  {
    id: 6,
    taskId: "TASK-006",
    timestamp: "2023-06-25T13:10:00Z",
    runBy: "User568",
    task: "Text Generation",
    verified: false,
  },
  {
    id: 7,
    taskId: "TASK-007",
    timestamp: "2023-06-26T13:10:00Z",
    runBy: "User569",
    task: "Text Generation",
    verified: true,
  },
  {
    id: 8,
    taskId: "TASK-008",
    timestamp: "2023-06-27T13:10:00Z",
    runBy: "User570",
    task: "Text Generation",
    verified: true,
  },
  {
    id: 9,
    taskId: "TASK-009",
    timestamp: "2023-06-28T13:10:00Z",
    runBy: "User571",
    task: "Text Generation",
    verified: false,
  },
  {
    id: 10,
    taskId: "TASK-010",
    timestamp: "2023-06-29T13:10:00Z",
    runBy: "User572",
    task: "Text Generation",
    verified: true,
  },
];

export default function AgentPage() {
  const params = useParams();
  const router = useRouter();
  const [agent, setAgent] = useState(mockAgentData);
  const [logs, setLogs] = useState(mockLogs);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  useEffect(() => {
    // In a real application, you would fetch the agent data and logs here
    // based on the ID from the URL params
    console.log("Fetching agent with ID:", params.id);
    // For now, we're using mock data
    setAgent(mockAgentData);
    setLogs(mockLogs);
  }, [params.id]);

  const handleViewTask = (taskId: string) => {
    router.push(`/task/${taskId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-10 px-4">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>

        <Card className="w-full max-w-2xl mx-auto overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{agent.name}</h1>
            <p className="text-sm opacity-80">Agent ID: {agent.agentId}</p>
          </div>
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-16 w-16 text-gray-400" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Controller Wallet
                  </p>
                  <p className="text-sm font-mono">{agent.wallet}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    API Endpoint
                  </p>
                  <p className="text-sm font-mono">{agent.endpoint}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge
                    variant={
                      agent.status === "Active"
                        ? "active"
                        : agent.status === "Inactive"
                        ? "inactive"
                        : "pending"
                    }
                  >
                    {agent.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="text-sm mt-1">{agent.description}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Capabilities
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {agent.capabilities.map((capability, index) => (
                    <Badge key={index} variant="default">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Performance Metrics
                </p>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="text-sm font-medium">Tasks Completed</p>
                    <p className="text-lg">
                      {agent.performanceMetrics.tasksCompleted}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Avg. Response Time</p>
                    <p className="text-lg">
                      {agent.performanceMetrics.averageResponseTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Success Rate</p>
                    <p className="text-lg">
                      {agent.performanceMetrics.successRate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <div className="bg-gray-100 p-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>
                Created: {new Date(agent.createdAt).toLocaleDateString("en-US")}
              </p>
            </div>
            <QrCode className="h-10 w-10 text-gray-400" />
          </div>
        </Card>

        <Card className="w-full max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Execution Logs</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/5">Task ID</TableHead>
                    <TableHead className="w-1/5">Timestamp</TableHead>
                    <TableHead className="w-1/5">Run By</TableHead>
                    <TableHead className="w-1/5">Task</TableHead>
                    <TableHead className="w-1/5 text-center">
                      Verified
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs
                    .slice(
                      (currentPage - 1) * logsPerPage,
                      currentPage * logsPerPage
                    )
                    .map((log) => (
                      <TableRow
                        key={log.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleViewTask(log.taskId)}
                      >
                        <TableCell className="font-medium">
                          {log.taskId}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell>{log.runBy}</TableCell>
                        <TableCell>{log.task}</TableCell>
                        <TableCell className="text-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                {log.verified ? (
                                  <CheckCircle className="h-5 w-5 text-green-500 inline-block" />
                                ) : (
                                  <XCircle className="h-5 w-5 text-red-500 inline-block" />
                                )}
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {log.verified ? "Verified" : "Not Verified"}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Showing{" "}
                {Math.min((currentPage - 1) * logsPerPage + 1, logs.length)} to{" "}
                {Math.min(currentPage * logsPerPage, logs.length)} of{" "}
                {logs.length} entries
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, Math.ceil(logs.length / logsPerPage))
                    )
                  }
                  disabled={
                    currentPage === Math.ceil(logs.length / logsPerPage)
                  }
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
