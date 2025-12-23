import { Agent } from "@mastra/core/agent";
import { z } from "zod";
import { companyInfoTool } from "../tools/company-info-tool";

import { CompanyInfoType } from "@/constants";
import { google } from "@ai-sdk/google";

export const companyInfoAgent = new Agent({
  name: "Company Info Agent",
  instructions: `You are a helpful company information assistant that can provide accurate information about the company.
  You can provide information about: company profile, company structure, partner workshops, services, contact information, and policies.
  Always be professional and accurate in your responses.`,
  model: google("gemini-2.5-flash"),
  tools: { companyInfoTool },
});
