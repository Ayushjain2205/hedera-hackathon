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
import { Button } from "@/components/ui/button";
import { CopyBlock, dracula } from "react-code-blocks";
import { CheckCircle, XCircle } from "lucide-react";

export function ApiVerificationStep({ form }) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const apiOutput = form.watch("technical.apiOutput");

  const verifyApi = () => {
    // In a real scenario, you'd perform actual verification here
    // For this example, we'll just simulate a successful verification
    setIsVerified(true);
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="verification.apiOutput"
        render={({ field }) => (
          <FormItem>
            <FormLabel>API Test Result</FormLabel>
            <FormControl>
              <div className="rounded-md overflow-hidden">
                <CopyBlock
                  text={apiOutput || "// No API test result available"}
                  language="json"
                  theme={dracula}
                  wrapLines
                  codeBlock
                />
              </div>
            </FormControl>
            <FormDescription>
              Result from the API test in Step 2
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="button" onClick={verifyApi} className="w-full">
        Verify API
      </Button>
      {isVerified !== null && (
        <div
          className={`p-4 rounded-md ${
            isVerified ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {isVerified ? (
            <div className="flex items-center text-green-800">
              <CheckCircle className="mr-2 h-5 w-5" />
              API verified successfully!
            </div>
          ) : (
            <div className="flex items-center text-red-800">
              <XCircle className="mr-2 h-5 w-5" />
              API verification failed. Please check your endpoint and try again.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
