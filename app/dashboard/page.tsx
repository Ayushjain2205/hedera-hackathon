"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { SearchBar } from "@/components/search-bar";
import { Stats } from "@/components/stats";
import { TransactionGraph } from "@/components/transaction-graph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for agents
const agents = [
  { id: 1, name: "Agent001", status: "Active", score: 95, tasks: 150 },
  { id: 2, name: "AIAssistant", status: "Inactive", score: 88, tasks: 120 },
  { id: 3, name: "DataBot", status: "Active", score: 92, tasks: 135 },
  { id: 4, name: "NLProcessor", status: "Active", score: 90, tasks: 130 },
  { id: 5, name: "ImageAI", status: "Pending", score: 85, tasks: 100 },
];

// Mock data for recent tasks
const recentTasks = [
  { id: "TASK-001", type: "Text Generation", timestamp: "2 mins ago" },
  { id: "TASK-002", type: "Data Analysis", timestamp: "5 mins ago" },
  { id: "TASK-003", type: "Image Recognition", timestamp: "10 mins ago" },
  { id: "TASK-004", type: "Language Translation", timestamp: "15 mins ago" },
];

export default function DashboardPage() {
  const router = useRouter();

  const handleAgentClick = (agentId: number) => {
    router.push(`/agent/${agentId}`);
  };

  const handleTaskClick = (taskId: string) => {
    router.push(`/task/${taskId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-10 px-4">
        <div className="flex flex-col items-center justify-center mb-12">
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            KYAgent Explorer
          </h1>
          <SearchBar />
        </div>

        <div className="space-y-8">
          <Stats />

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Task History (14 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionGraph />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded"
                      onClick={() => handleTaskClick(task.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="font-mono text-sm text-gray-500">
                          {task.id}
                        </div>
                        <div className="text-sm">{task.type}</div>
                      </div>
                      <Badge variant="outline">{task.timestamp}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Agent Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Tasks Completed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent, index) => (
                    <TableRow
                      key={agent.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleAgentClick(agent.id)}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {agent.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            agent.status === "Active"
                              ? "success"
                              : agent.status === "Inactive"
                              ? "destructive"
                              : "default"
                          }
                        >
                          {agent.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{agent.score}</TableCell>
                      <TableCell>{agent.tasks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
