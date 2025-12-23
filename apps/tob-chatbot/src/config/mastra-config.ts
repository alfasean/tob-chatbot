import { z } from "zod";

const ConfigSchema = z.object({
  openaiApiKey: z.string().min(1, "OpenAI API key is required"),
  googleGenerativeApiKey: z
    .string()
    .min(1, "Google Generative AI API key is required"),
  model: z.string().default("gpt-4"),
  temperature: z.number().min(0).max(1).default(0.7),
  ragEnabled: z.boolean().default(true),
  maxTokens: z.number().min(1).default(1000),
});

export type AppConfig = z.infer<typeof ConfigSchema>;

export const loadConfig = (): AppConfig => {
  const config = ConfigSchema.parse({
    openaiApiKey: process.env.OPENAI_API_KEY,
    googleGenerativeApiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    model: process.env.MODEL || "gpt-4",
    temperature: parseFloat(process.env.TEMPERATURE || "0.7"),
    ragEnabled: process.env.RAG_ENABLED?.toLowerCase() !== "false",
    maxTokens: parseInt(process.env.MAX_TOKENS || "1000", 10),
  });

  return config;
};

export const appConfig = loadConfig();
