import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { CompanyInfoType } from "@/constants";
import { isValidQuery } from "@/utils/error-handler";

export const companyInfoTool = createTool({
  id: "get-company-info",
  description: "Get information about the company based on the requested type",
  inputSchema: z.object({
    infoType: z.enum([
      "company-profile",
      "company-structure",
      "partner-workshops",
      "services",
      "contact-info",
      "policies",
    ] as [CompanyInfoType, ...CompanyInfoType[]]),
    query: z.string().min(1).max(500),
  }),
  outputSchema: z.object({
    content: z.string(),
    source: z.string(),
    score: z.number(),
    metadata: z.record(z.unknown()).optional(),
  }),
  execute: async ({ context }) => {
    const { infoType, query } = context;

    if (!isValidQuery(query)) {
      throw new Error("Invalid query provided");
    }

    // This would normally call the RAG system to get company information
    // For now, returning mock data based on infoType
    console.log(`Retrieving ${infoType} information for query: ${query}`);

    const mockInfo = {
      "company-profile":
        "Our company is a leading provider of innovative solutions with 20+ years of experience in the industry.",
      "company-structure":
        "Our organization consists of executive leadership, operations, sales, marketing, and support departments.",
      "partner-workshops":
        "We have partnerships with 50+ certified workshops nationwide.",
      services: "We offer consulting, development, and support services.",
      "contact-info": "Contact us at info@company.com or +1-800-123-4567.",
      policies:
        "Our policies include 30-day return policy and 24/7 customer support.",
    };

    return {
      content:
        mockInfo[infoType as keyof typeof mockInfo] ||
        "No information available for the requested category.",
      source: "company_database",
      score: 0.95,
      metadata: {
        infoType,
        timestamp: new Date().toISOString(),
      },
    };
  },
});
