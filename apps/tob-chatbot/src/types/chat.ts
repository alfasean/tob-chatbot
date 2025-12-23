import { z } from 'zod';
import { COMPANY_INFO_TYPES } from '@/constants';

// Type definitions for the TOB Chatbot following the project rules

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface ChatSession {
  id: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
  metadata?: Record<string, unknown>;
}

export interface CompanyInfoQuery {
  type: typeof COMPANY_INFO_TYPES[number];
  query: string;
  context?: string;
}

export interface RAGResult {
  content: string;
  source: string;
  score: number;
  metadata?: Record<string, unknown>;
}

export interface ChatResponse {
  id: string;
  content: string;
  sources?: RAGResult[];
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

// Zod schemas for validation
export const MessageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
  timestamp: z.coerce.date(),
  metadata: z.record(z.unknown()).optional(),
});

export const ChatSessionSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  messages: z.array(MessageSchema),
  metadata: z.record(z.unknown()).optional(),
});

export const CompanyInfoQuerySchema = z.object({
  type: z.enum(COMPANY_INFO_TYPES),
  query: z.string(),
  context: z.string().optional(),
});