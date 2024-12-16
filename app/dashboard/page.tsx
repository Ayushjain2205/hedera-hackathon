"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

export default function DashboardPage() {
  const [activeAgents, setActiveAgents] = useState(42);
  const [totalVerifications, setTotalVerifications] = useState(1337);
  const router = useRouter();

  const handleAgentClick = (agentId: number) => {
    router.push(`/agent/${agentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
          Agent Dashboard
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Active Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-blue-600">{activeAgents}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-cyan-500">
                {totalVerifications}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold text-green-500">
                Operational
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="mb-8">
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
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent, index) => (
                  <TableRow key={agent.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{agent.name}</TableCell>
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
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAgentClick(agent.id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
