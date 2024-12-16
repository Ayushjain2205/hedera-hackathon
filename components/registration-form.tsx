"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  agentName: z.string().min(3).max(50),
  apiEndpoint: z.string().url(),
  publicKey: z.string().min(10),
  controllerWallet: z.string().min(42).max(42),
  capabilities: z.array(z.string()).min(1),
  cpuLimit: z.number().min(1),
  memoryLimit: z.number().min(1),
  storageLimit: z.number().min(1),
});

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentName: "",
      apiEndpoint: "",
      publicKey: "",
      controllerWallet: "",
      capabilities: [],
      cpuLimit: 1,
      memoryLimit: 1,
      storageLimit: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
    }, 2000);
  }

  return (
    <Form {...form}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-2xl mx-auto border border-neutral-200 border-gray-200 dark:border-neutral-800"
        >
          <FormField
            control={form.control}
            name="agentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="myagent.agent"
                    {...field}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                <FormDescription className="text-gray-600">
                  This will be your agent's unique identifier.
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apiEndpoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Endpoint URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://api.myagent.com"
                    {...field}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publicKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Public Key</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your public key"
                    {...field}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="controllerWallet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Controller Wallet Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0x..."
                    {...field}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capabilities"
            render={() => (
              <FormItem>
                <FormLabel>Basic Capabilities</FormLabel>
                <div className="space-y-2">
                  {[
                    "Text Generation",
                    "Image Recognition",
                    "Data Analysis",
                    "Language Translation",
                  ].map((capability) => (
                    <FormField
                      key={capability}
                      control={form.control}
                      name="capabilities"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={capability}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(capability)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        capability,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== capability
                                        )
                                      );
                                }}
                                className="border-gray-300"
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-gray-700">
                              {capability}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpuLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPU Limit (cores)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="memoryLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Memory Limit (GB)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="storageLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Storage Limit (GB)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white transition-all duration-300"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </motion.div>
    </Form>
  );
}
