"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  MessageCircleMore,
  X,
  LoaderCircle,
  SendHorizonal,
  User,
  Bot,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import AvatarAgent from "./AvatarAgent";

interface Message {
  role: string;
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    AOS.init();
  }, []);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (newMessages: Message[]) => {
      setMessages([...newMessages, { role: "assistant", content: "" }]);

      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: newMessages }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error("Response body is empty");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          chunk.split("\n\n").forEach((event) => {
            if (event.startsWith("data:")) {
              const dataStr = event.replace(/^data:\s*/, "");
              if (dataStr === "[DONE]") {
                done = true;
                return;
              }
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.type === "text") {
                  assistantContent += parsed.value;
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      role: "assistant",
                      content: assistantContent,
                    };
                    return updated;
                  });
                } else if (parsed.type === "error") {
                  assistantContent += `\n[Error]: ${parsed.value}`;
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      role: "assistant",
                      content: assistantContent,
                    };
                    return updated;
                  });
                  done = true;
                }
              } catch (e) {
                console.error("Failed to parse SSE data chunk:", dataStr, e);
              }
            }
          });
        }
      }
    },
    onError: (error: Error) => {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: `Error: ${error.message}`,
        };
        return updated;
      });
    },
  });

  const handleSendMessage = () => {
    if (!input.trim() || isPending) return;
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input.trim() },
    ];
    setMessages(newMessages);
    setInput("");
    sendMessage(newMessages);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  if (!isOpen) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={"icon"}
            className="fixed bottom-8 right-8 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => setIsOpen(true)}
          >
            <MessageCircleMore className="h-6 w-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Chat with AI</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div
      className="fixed bottom-8 right-8 w-96 h-[40rem] bg-white rounded-xl shadow-2xl flex flex-col border z-50"
      data-aos="fade-up"
    >
      <div className="p-4 bg-primary text-white rounded-t-xl flex justify-between items-center">
        <h3 className="font-bold text-lg">Chat with AI</h3>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <Button
              size={"sm"}
              variant="ghost"
              className="text-white hover:bg-white/20 text-xs"
              onClick={clearChat}
              disabled={isPending}
            >
              Clear
            </Button>
          )}
          <Button
            size={"icon"}
            variant="ghost"
            className="rounded-full cursor-pointer text-white hover:bg-white/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-gray-500 text-center py-8">
            <MessageCircleMore className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">
              Start a conversation with the AI assistant!
            </p>
            <p className="text-xs mt-2 opacity-70">You can ask about:</p>
            <ul className="text-xs mt-1 opacity-70 list-disc list-inside text-left max-w-xs mx-auto">
              <li>Weather conditions and forecasts</li>
              <li>Company structure and personnel</li>
              <li>Department leads and roles</li>
            </ul>
          </div>
        )}

        {messages.map((msg, i) => {
          const isUser = msg.role === "user";
          const isError = msg.content.startsWith("Error:");
          return (
            <div
              key={i}
              className={`flex items-end ${isUser ? "justify-end" : "justify-start"} gap-3`}
            >
              {!isUser && <AvatarAgent />}

              <div
                className={`rounded-2xl px-4 py-3 max-w-[75%] shadow-sm border text-sm leading-relaxed whitespace-pre-wrap
                  ${
                    isError
                      ? "bg-red-50 border-red-200 text-red-700"
                      : isUser
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-gray-100 border-gray-200 text-gray-800"
                  }`}
              >
                {msg.content ||
                  (msg.role === "assistant" && isPending && (
                    <div className="flex items-center gap-2">
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      <span className="text-xs opacity-70">Thinking...</span>
                    </div>
                  ))}
              </div>

              {isUser && (
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white shrink-0 border border-blue-400">
                  <User className="h-5 w-5" />
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t bg-gray-50 rounded-b-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 rounded-lg border border-gray-300 p-3 text-gray-800
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all auto-expand"
            placeholder="Ask about weather or company structure..."
            disabled={isPending}
            maxLength={500}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isPending || !input.trim()}
            className="rounded-lg mt-2 py-4 transition-all"
            size="default"
          >
            {isPending ? (
              <LoaderCircle className="h-5 w-5 animate-spin" />
            ) : (
              <SendHorizonal className="h-5 w-5" />
            )}
          </Button>
        </div>
        {input.length > 450 && (
          <p className="text-xs text-gray-500 mt-1">
            {500 - input.length} characters remaining
          </p>
        )}
      </div>
    </div>
  );
}
