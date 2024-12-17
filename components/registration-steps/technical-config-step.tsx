import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyBlock, dracula } from "react-code-blocks";
import { Loader2 } from "lucide-react";

export function TechnicalConfigStep({ form }) {
  const [apiOutput, setApiOutput] = useState("");
  const [hasRun, setHasRun] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const runApiTest = async () => {
    setIsProcessing(true);
    const endpoint = form.getValues("technical.endpoint");

    // Simulate API call with a delay
    setTimeout(() => {
      const output = JSON.stringify(
        {
          status: "success",
          message: `Successfully connected to ${endpoint}`,
          data: {
            agentName: "MyAgent",
            version: "1.0.0",
            capabilities: ["text generation", "image analysis"],
          },
        },
        null,
        2
      );
      setApiOutput(output);
      setHasRun(true);
      setIsProcessing(false);
    }, 2000); // 2 second delay
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="technical.endpoint"
        render={({ field }) => (
          <FormItem>
            <FormLabel>API Endpoint</FormLabel>
            <FormControl>
              <Input placeholder="https://api.myagent.com" {...field} />
            </FormControl>
            <FormDescription>The base URL for your agent's API</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={runApiTest}
        className="w-full"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Run Test"
        )}
      </Button>
      {(hasRun || isProcessing) && (
        <FormField
          control={form.control}
          name="technical.apiOutput"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Test Output</FormLabel>
              <FormControl>
                <div className="rounded-md overflow-hidden">
                  {isProcessing ? (
                    <div className="bg-gray-800 text-white p-4 h-32 flex items-center justify-center">
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                      Processing API request...
                    </div>
                  ) : (
                    <CopyBlock
                      text={apiOutput}
                      language="json"
                      theme={dracula}
                      wrapLines
                      codeBlock
                    />
                  )}
                </div>
              </FormControl>
              <FormDescription>Output from your API test</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
