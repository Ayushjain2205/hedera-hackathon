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
import { Textarea } from "@/components/ui/textarea";
import Select from "react-select";

const capabilities = {
  text: ["Text Generation", "Content Summarization", "Language Translation"],
  code: ["Code Generation", "Code Review", "Documentation Generation"],
  analysis: ["Data Processing", "Image Analysis", "Pattern Recognition"],
  planning: ["Task Planning", "Resource Optimization", "Schedule Management"],
  knowledge: ["Question Answering", "Research", "Information Retrieval"],
  financial: ["Transaction Processing", "Risk Assessment", "Market Analysis"],
  custom: ["Custom Capability"],
};

const capabilityOptions = Object.entries(capabilities).flatMap(
  ([category, items]) =>
    items.map((item) => ({ value: item, label: item, group: category }))
);

export function BasicInfoStep({ form }) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="basicInfo.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Agent Name</FormLabel>
            <FormControl>
              <Input placeholder="myagent" {...field} />
            </FormControl>
            <FormDescription>
              3-30 characters, alphanumeric and hyphens only. ".agent" will be
              automatically added.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="basicInfo.wallet"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Controller Wallet</FormLabel>
            <FormControl>
              <Input placeholder="Enter wallet address" {...field} />
            </FormControl>
            <FormDescription>
              Enter the Hedera account ID or public key of the controlling
              wallet
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="basicInfo.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Describe your agent..." {...field} />
            </FormControl>
            <FormDescription>Maximum 500 characters</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="basicInfo.capabilities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Capabilities</FormLabel>
            <FormControl>
              <Select
                isMulti
                options={capabilityOptions}
                value={capabilityOptions.filter((option) =>
                  field.value.includes(option.value)
                )}
                onChange={(selectedOptions) => {
                  field.onChange(selectedOptions.map((option) => option.value));
                }}
                placeholder="Select capabilities..."
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </FormControl>
            <FormDescription>Select up to 10 capabilities</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
