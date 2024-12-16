import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ApiVerificationStep({ form }) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="verification.testConfig"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Test Configuration</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter your test configuration in JSON format"
                {...field}
                value={JSON.stringify(field.value, null, 2)}
                onChange={(e) => {
                  try {
                    field.onChange(JSON.parse(e.target.value));
                  } catch (error) {
                    // Handle JSON parse error
                  }
                }}
              />
            </FormControl>
            <FormDescription>
              Enter the JSON configuration for your API test
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="button">Run Test</Button>
      <FormField
        control={form.control}
        name="verification.testResult"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Test Result</FormLabel>
            <FormControl>
              <Textarea
                readOnly
                value={field.value ? JSON.stringify(field.value, null, 2) : ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="verification.openApiSpec"
        render={({ field }) => (
          <FormItem>
            <FormLabel>OpenAPI Specification</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Your OpenAPI specification will appear here"
                {...field}
                value={field.value ? JSON.stringify(field.value, null, 2) : ""}
                onChange={(e) => {
                  try {
                    field.onChange(JSON.parse(e.target.value));
                  } catch (error) {
                    // Handle JSON parse error
                  }
                }}
              />
            </FormControl>
            <FormDescription>
              You can edit the auto-generated OpenAPI specification here
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
