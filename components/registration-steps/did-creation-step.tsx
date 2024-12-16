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
import { Checkbox } from "@/components/ui/checkbox";

export function DidCreationStep({ form }) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="did.identifier"
        render={({ field }) => (
          <FormItem>
            <FormLabel>DID Identifier</FormLabel>
            <FormControl>
              <Input readOnly {...field} />
            </FormControl>
            <FormDescription>Your generated DID</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>
        <h3 className="text-lg font-medium">Verification Summary</h3>
        {/* Display summary of collected information */}
        <ul className="list-disc list-inside mt-2">
          <li>Agent Name: {form.watch("basicInfo.name")}.agent</li>
          <li>Controller Wallet: {form.watch("basicInfo.wallet")}</li>
          <li>API Endpoint: {form.watch("technical.endpoint")}</li>
          <li>
            Selected Capabilities:{" "}
            {form.watch("basicInfo.capabilities").join(", ")}
          </li>
        </ul>
      </div>
      <FormField
        control={form.control}
        name="did.status"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value === "created"}
                onCheckedChange={(checked) => {
                  field.onChange(checked ? "created" : "pending");
                }}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I confirm that all information provided is correct and I agree
                to the terms of service.
              </FormLabel>
              <FormDescription>
                By checking this box, you agree to create your DID on the Hedera
                network.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
