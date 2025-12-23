import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { companyInfoAgent } from "../agents/company-info-agent";

const companyInfoStep = createStep({
  id: "company-info-step",
  description: "Get company information based on query",
  inputSchema: z.object({
    query: z.string(),
  }),
  outputSchema: z.object({
    answer: z.string(),
  }),
  execute: async ({ inputData }) => {
    const result = await companyInfoAgent.generate(inputData.query);
    return { answer: result.text };
  },
});

export const companyInfoWorkflow = createWorkflow({
  id: "company-info-workflow",
  inputSchema: z.object({
    query: z.string(),
  }),
  outputSchema: z.object({
    answer: z.string(),
  }),
}).then(companyInfoStep);

companyInfoWorkflow.commit();
