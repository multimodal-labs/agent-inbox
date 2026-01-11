"use client";

import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";

const GREETING = "How can I help you today?";

const STARTER_PROMPTS = [
  {
    label: "Get started",
    prompt: "What can you help me with?",
    icon: "sparkle" as const,
  },
  {
    label: "Ask a question",
    prompt: "I have a question about...",
    icon: "circle-question" as const,
  },
];

export type ChatKitControl = ReturnType<typeof useChatKit>;

type ChatKitPanelProps = {
  onChatKitReady?: (chatkit: ChatKitControl) => void;
  className?: string;
};

export function ChatKitPanel({ onChatKitReady, className }: ChatKitPanelProps) {
  const chatkitRef = useRef<ChatKitControl | null>(null);
  const onChatKitReadyRef = useRef(onChatKitReady);
  onChatKitReadyRef.current = onChatKitReady;

  const chatkit = useChatKit({
    api: { url: "http://127.0.0.1:8000", domainKey: "domain_pk_localhost_dev" },
    theme: {
      density: "spacious",
      colorScheme: "light",
      color: {
        grayscale: {
          hue: 220,
          tint: 6,
          shade: -4,
        },
        accent: {
          primary: "#0f172a",
          level: 1,
        },
      },
      radius: "round",
    },
    startScreen: {
      greeting: GREETING,
      prompts: STARTER_PROMPTS,
    },
    composer: {
      placeholder: "Type a message...",
    },
    threadItemActions: {
      feedback: false,
    },
    onError: ({ error }) => {
      console.error("ChatKit error", error);
    },
    onReady: () => {
      if (chatkitRef.current) {
        onChatKitReadyRef.current?.(chatkitRef.current);
      }
    },
  });

  chatkitRef.current = chatkit;

  useEffect(() => {
    if (chatkit && onChatKitReady) {
      onChatKitReady(chatkit);
    }
  }, [chatkit, onChatKitReady]);

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ height: "calc(100vh - 80px)" }}
    >
      <ChatKit control={chatkit.control} className="block h-full w-full" />
    </div>
  );
}
