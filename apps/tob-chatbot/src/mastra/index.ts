import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { companyInfoWorkflow } from "./workflows/company-info-workflow";
import { companyInfoAgent } from "./agents/company-info-agent";
import { weatherAgent } from "./agents/weather-agent";
import { weatherWorkflow } from "./workflows/weather-workflow";

export const mastra = new Mastra({
  workflows: { companyInfoWorkflow, weatherWorkflow },
  agents: { companyInfoAgent, weatherAgent },
  logger: new PinoLogger({
    name: "TOB-Chatbot",
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
  }),
});

export { companyInfoAgent, companyInfoWorkflow, weatherAgent, weatherWorkflow };
