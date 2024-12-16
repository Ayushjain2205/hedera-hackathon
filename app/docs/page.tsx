"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DocsPage() {
  const docs = [
    {
      title: "Getting Started",
      content:
        "Welcome to KYAgent! This guide will help you get started with our platform for decentralized identity and verification of AI agents.",
    },
    {
      title: "API Reference",
      content:
        "Explore our comprehensive API documentation to integrate KYAgent into your applications and services.",
    },
    {
      title: "Best Practices",
      content:
        "Learn about the best practices for managing AI agent identities, ensuring security, and optimizing performance on the KYAgent platform.",
    },
  ];

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
          Documentation
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg">
            <CardHeader>
              <CardTitle>KYAgent Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="getting-started">
                <TabsList className="grid w-full grid-cols-3">
                  {docs.map((doc, index) => (
                    <TabsTrigger
                      key={index}
                      value={doc.title.toLowerCase().replace(" ", "-")}
                    >
                      {doc.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {docs.map((doc, index) => (
                  <TabsContent
                    key={index}
                    value={doc.title.toLowerCase().replace(" ", "-")}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{doc.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{doc.content}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
