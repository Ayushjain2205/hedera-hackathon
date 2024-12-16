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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TechnicalConfigStep({ form }) {
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
      <FormField
        control={form.control}
        name="technical.auth.type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Authentication Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select authentication type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="apiKey">API Key</SelectItem>
                <SelectItem value="bearer">Bearer Token</SelectItem>
                <SelectItem value="oauth">OAuth 2.0</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Render different auth config fields based on selected type */}
      <FormField
        control={form.control}
        name="technical.rateLimit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rate Limit (requests/minute)</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="technical.timeout"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Timeout (milliseconds)</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormDescription>Default: 30000 ms (30 seconds)</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
