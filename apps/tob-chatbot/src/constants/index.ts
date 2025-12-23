// Constants for the TOB Chatbot application

export const CHATBOT_NAME = "TOB Chatbot";
export const CHATBOT_VERSION = "1.0.0";

// Use const assertion to preserve literal types
export const COMPANY_INFO_TYPES = [
  "company-profile",
  "company-structure",
  "partner-workshops",
  "services",
  "contact-info",
  "policies",
] as const;

export type CompanyInfoType = (typeof COMPANY_INFO_TYPES)[number];

export const DEFAULT_MODEL = "gemini-2.5-flash";
export const DEFAULT_TEMPERATURE = 0.7;

export const RAG_CONFIG = {
  CHUNK_SIZE: 1000,
  OVERLAP_SIZE: 200,
  TOP_K: 5,
} as const;

export const ERROR_MESSAGES = {
  INVALID_QUERY: "Unable to process your query. Please try rephrasing.",
  NO_CONTEXT: "No relevant information found for your query.",
  GENERAL_ERROR: "An error occurred while processing your request.",
} as const;
