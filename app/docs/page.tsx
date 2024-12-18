"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "@/components/code-editor";
import { Navbar } from "@/components/navbar";

export default function DocsPage() {
  const docs = [
    {
      title: "Getting Started",
      content: (
        <div className="space-y-4">
          <p>
            Welcome to KYAgent, the cutting-edge platform for decentralized
            identity and verification of AI agents. In an era where AI is
            becoming increasingly prevalent and powerful, establishing trust and
            accountability is paramount. KYAgent addresses this critical need by
            providing a robust framework for agent identity management and
            verification.
          </p>
          <h3 className="text-xl font-semibold">Why KYAgent Matters</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Trust in AI:</strong> As AI agents become more autonomous
              and influential, it's crucial to have a system that can verify
              their identities and capabilities. KYAgent provides this
              assurance, enabling users to interact with AI agents confidently.
            </li>
            <li>
              <strong>Decentralized Security:</strong> By leveraging blockchain
              technology, KYAgent ensures that agent identities are immutable
              and resistant to tampering or fraud.
            </li>
            <li>
              <strong>Interoperability:</strong> KYAgent's standardized approach
              to agent identity allows for seamless integration across various
              platforms and ecosystems, fostering innovation and collaboration.
            </li>
          </ul>
          <h3 className="text-xl font-semibold">Quick Start Guide</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Sign up for a KYAgent account at our registration page.</li>
            <li>
              Create your first AI agent identity using our intuitive dashboard.
            </li>
            <li>
              Integrate KYAgent into your existing AI applications using our SDK
              (see Integration Guide for details).
            </li>
            <li>
              Start verifying and managing your AI agents with confidence!
            </li>
          </ol>
          <p>
            By choosing KYAgent, you're not just adopting a tool; you're joining
            a movement towards a more transparent, secure, and trustworthy AI
            ecosystem. Let's build the future of AI together!
          </p>
        </div>
      ),
    },
    {
      title: "API Reference",
      content: (
        <div className="space-y-4">
          <p>
            The KYAgent API is the backbone of our platform, providing powerful
            endpoints for agent management, verification, and task execution.
            Our comprehensive API allows developers to seamlessly integrate
            KYAgent's capabilities into their applications, ensuring robust
            identity management for AI agents.
          </p>
          <h3 className="text-xl font-semibold">Key Endpoints</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Agent Registration:</strong>{" "}
              <code>/v1/agents/register</code>
              <p>Create a new agent identity on the KYAgent platform.</p>
            </li>
            <li>
              <strong>Agent Verification:</strong>{" "}
              <code>/v1/agents/verify/{"{agentId}"}</code>
              <p>Verify the identity and status of an AI agent.</p>
            </li>
            <li>
              <strong>Task Execution:</strong> <code>/v1/tasks/execute</code>
              <p>Execute a task using a verified AI agent.</p>
            </li>
            <li>
              <strong>Agent Update:</strong>{" "}
              <code>/v1/agents/update/{"{agentId}"}</code>
              <p>Update an agent's information or capabilities.</p>
            </li>
          </ul>
          <h3 className="text-xl font-semibold">Authentication</h3>
          <p>
            All API requests must be authenticated using JWT tokens. Include the
            token in the Authorization header of your requests:
          </p>
          <CodeEditor
            code={`
Authorization: Bearer your_jwt_token_here
            `}
            language="http"
          />
          <h3 className="text-xl font-semibold">Rate Limiting</h3>
          <p>
            To ensure fair usage and system stability, API requests are
            rate-limited to 1000 requests per minute per API key. Exceeding this
            limit will result in a 429 Too Many Requests response.
          </p>
          <p>
            For detailed information on request/response formats, error
            handling, and advanced usage scenarios, please refer to our full API
            documentation.
          </p>
        </div>
      ),
    },
    {
      title: "Best Practices",
      content: (
        <div className="space-y-4">
          <p>
            Implementing KYAgent effectively is crucial for maintaining a secure
            and efficient AI agent ecosystem. Follow these best practices to
            optimize your use of KYAgent and ensure the highest standards of
            identity management and verification.
          </p>
          <h3 className="text-xl font-semibold">
            1. Secure Agent Creation and Management
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use strong, unique passwords for each agent account.</li>
            <li>
              Implement multi-factor authentication for agent registration and
              updates.
            </li>
            <li>
              Regularly audit and update agent information to maintain accuracy.
            </li>
          </ul>
          <h3 className="text-xl font-semibold">
            2. Efficient Verification Processes
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Cache verification results to reduce API calls and improve
              performance.
            </li>
            <li>
              Implement a retry mechanism with exponential backoff for failed
              verifications.
            </li>
            <li>
              Use webhook notifications to stay updated on agent status changes.
            </li>
          </ul>
          <h3 className="text-xl font-semibold">
            3. Optimizing Task Execution
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Batch similar tasks to reduce overhead and improve throughput.
            </li>
            <li>
              Implement proper error handling and logging for all task
              executions.
            </li>
            <li>
              Monitor task performance and adjust resource allocation as needed.
            </li>
          </ul>
          <h3 className="text-xl font-semibold">
            4. Maintaining Privacy and Compliance
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Only store essential agent information to comply with data
              protection regulations.
            </li>
            <li>Implement data encryption at rest and in transit.</li>
            <li>
              Regularly review and update your privacy policies in line with
              KYAgent's evolving features.
            </li>
          </ul>
          <h3 className="text-xl font-semibold">
            5. Continuous Monitoring and Improvement
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Set up alerts for unusual agent activity or verification failures.
            </li>
            <li>
              Regularly analyze agent performance metrics to identify areas for
              improvement.
            </li>
            <li>
              Stay updated with KYAgent's latest features and integrate them
              into your workflow.
            </li>
          </ul>
          <p>
            By following these best practices, you'll not only enhance the
            security and efficiency of your AI agent operations but also
            contribute to building a more trustworthy and robust AI ecosystem.
            Remember, the strength of KYAgent lies in its community of users
            committed to maintaining the highest standards of AI identity
            management.
          </p>
        </div>
      ),
    },
    {
      title: "Integration Guide",
      content: (
        <div className="space-y-4">
          <p>
            Integrate KYAgent into your existing codebase with ease. Follow
            these steps to get started:
          </p>

          <h3 className="text-lg font-semibold">1. Install the KYAgent SDK</h3>
          <CodeEditor code={`npm install kyagent-sdk`} language="bash" />

          <h3 className="text-lg font-semibold">
            2. Initialize the KYAgent client
          </h3>
          <CodeEditor
            code={`
import { KYAgentClient } from 'kyagent-sdk';

const client = new KYAgentClient({
  baseUrl: 'https://kyaagent.netlify.app',
  agentId: 'your-agent-id-here'
});
            `}
            language="javascript"
          />

          <h3 className="text-lg font-semibold">
            3. Verify an agent's identity
          </h3>
          <CodeEditor
            code={`
async function verifyAgent(agentId) {
  try {
    const result = await client.verifyAgent(agentId);
    console.log('Agent verification result:', result);
    return result.isVerified;
  } catch (error) {
    console.error('Error verifying agent:', error);
    return false;
  }
}
            `}
            language="javascript"
          />

          <h3 className="text-lg font-semibold">
            4. Execute a task with KYAgent
          </h3>
          <CodeEditor
            code={`
async function executeTask(taskType, taskData) {
  try {
    const result = await client.executeTask(taskType, taskData);
    console.log('Task execution result:', result);
    return result;
  } catch (error) {
    console.error('Error executing task:', error);
    throw error;
  }
}
            `}
            language="javascript"
          />

          <h3 className="text-lg font-semibold">5. Monitor agent activity</h3>
          <CodeEditor
            code={`
client.on('taskCompleted', (taskInfo) => {
  console.log('Task completed:', taskInfo);
  // Update your UI or perform any necessary actions
});

client.on('verificationUpdate', (verificationInfo) => {
  console.log('Verification status updated:', verificationInfo);
  // Update agent's verification status in your application
});
            `}
            language="javascript"
          />

          <p>
            For more detailed information on API endpoints, response formats,
            and advanced usage, please refer to our full API documentation.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900 relative">
      <Navbar />
      <main className="container mx-auto py-10 px-4 relative z-10">
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
                <TabsList className="grid w-full grid-cols-4">
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
                        {typeof doc.content === "string" ? (
                          <p>{doc.content}</p>
                        ) : (
                          doc.content
                        )}
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
