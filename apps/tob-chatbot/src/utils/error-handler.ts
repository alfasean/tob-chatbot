import { ERROR_MESSAGES } from "@/constants";

export interface ChatbotError extends Error {
  code?: string;
  statusCode?: number;
  details?: unknown;
}

export class ChatbotError extends Error {
  code?: string;
  statusCode?: number;
  details?: unknown;

  constructor(
    message: string,
    code?: string,
    statusCode?: number,
    details?: unknown
  ) {
    super(message);
    this.name = "Chatbot Error";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const handleChatbotError = (error: unknown): ChatbotError => {
  if (error instanceof ChatbotError) {
    return error;
  }

  if (error instanceof Error) {
    return new ChatbotError(error.message, "UNKNOWN_ERROR", 500, {
      originalError: error,
    });
  }

  return new ChatbotError(ERROR_MESSAGES.GENERAL_ERROR, "UNKNOWN_ERROR", 500, {
    originalError: error,
  });
};

export const isValidQuery = (query: string): boolean => {
  return (
    typeof query === "string" && query.trim().length > 0 && query.length <= 1000
  );
};
