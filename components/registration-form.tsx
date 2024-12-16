"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { BasicInfoStep } from "./registration-steps/basic-info-step";
import { TechnicalConfigStep } from "./registration-steps/technical-config-step";
import { ApiVerificationStep } from "./registration-steps/api-verification-step";
import { DidCreationStep } from "./registration-steps/did-creation-step";
import { Steps } from "./steps";

const formSchema = z.object({
  basicInfo: z.object({
    name: z
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z0-9-]+$/),
    wallet: z.string(),
    description: z.string().max(500),
    capabilities: z.array(z.string()).min(1).max(10),
  }),
  technical: z.object({
    endpoint: z.string().url(),
    auth: z.object({
      type: z.enum(["apiKey", "bearer", "oauth"]),
      config: z.any(),
    }),
    rateLimit: z.number().min(1),
    timeout: z.number().min(1000).max(60000),
  }),
  verification: z.object({
    testConfig: z.any(),
    testResult: z.any(),
    openApiSpec: z.any(),
  }),
  did: z.object({
    identifier: z.string(),
    status: z.enum(["pending", "created"]),
    timestamp: z.string(),
  }),
});

type RegistrationFormValues = z.infer<typeof formSchema>;

const steps = [
  { title: "Basic Information", description: "Agent details and capabilities" },
  {
    title: "Technical Configuration",
    description: "API and authentication setup",
  },
  { title: "API Verification", description: "Test and validate API" },
  { title: "DID Creation", description: "Review and create DID" },
];

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      basicInfo: {
        name: "",
        wallet: "",
        description: "",
        capabilities: [],
      },
      technical: {
        endpoint: "",
        auth: {
          type: "apiKey",
          config: {},
        },
        rateLimit: 60,
        timeout: 30000,
      },
      verification: {
        testConfig: {},
        testResult: null,
        openApiSpec: null,
      },
      did: {
        identifier: "",
        status: "pending",
        timestamp: "",
      },
    },
  });

  function onSubmit(data: RegistrationFormValues) {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log(data);
      // Here you would typically send the data to your backend
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="pt-6">
        <Steps currentStep={currentStep} steps={steps} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            {currentStep === 0 && <BasicInfoStep form={form} />}
            {currentStep === 1 && <TechnicalConfigStep form={form} />}
            {currentStep === 2 && <ApiVerificationStep form={form} />}
            {currentStep === 3 && <DidCreationStep form={form} />}
            <div className="flex justify-between">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              )}
              <Button type="submit">
                {currentStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
