import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, QrCode, Hash } from "lucide-react";

function generateAgentId(name: string) {
  const randomString = Math.random().toString(36).substring(2, 10);
  return `did:kyagent:mantle:${name.toLowerCase()}-${randomString}`;
}

export function DidCreationStep({ form }) {
  const { name, wallet, description, capabilities } = form.watch("basicInfo");
  const { endpoint } = form.watch("technical");
  const agentId = generateAgentId(name || "unknown");
  const transactionHash =
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
          <h2 className="text-2xl font-bold">KYAgent ID Card</h2>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <Bot className="h-12 w-12 text-gray-400" />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Agent Name</p>
                <p className="text-lg font-bold">{name || "N/A"}.agent</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Controller Wallet
                </p>
                <p className="text-xs font-mono truncate">
                  {wallet || "Not connected"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  API Endpoint
                </p>
                <p className="text-xs font-mono truncate">
                  {endpoint || "Not specified"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="text-sm line-clamp-2">
                {description || "No description provided"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Capabilities</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {capabilities && capabilities.length > 0 ? (
                  capabilities.slice(0, 3).map((capability, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {capability}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm italic text-gray-400">
                    No capabilities selected
                  </p>
                )}
                {capabilities && capabilities.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{capabilities.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <div className="bg-gray-100 p-4 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p className="font-medium">Agent ID:</p>
              <p className="font-mono text-xs break-all">{agentId}</p>
            </div>
            <QrCode className="h-10 w-10 text-gray-400" />
          </div>
          <div className="text-sm text-gray-600">
            <p className="font-medium flex items-center">
              <Hash className="h-4 w-4 mr-1" />
              Transaction Hash:
            </p>
            <p className="font-mono text-xs break-all">{transactionHash}</p>
          </div>
          <p className="text-xs text-gray-500">
            Created: {new Date().toLocaleDateString()}
          </p>
        </div>
      </Card>

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
                By checking this box, you agree to create your Agent ID on the
                Mantle network.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
