import { useEffect, useRef } from "react";
import type { Message } from "@/types/chat";
import { HR_SENDER_ID } from "@/constants";
interface MessageListProps {
  messages: Message[];
}
export function ChatMessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLLIElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">
          No messages yet. Start the conversation!
        </p>
      </div>
    );

  return (
    <ul className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/10">
      {messages.map((message) => {
        const isHR = message.senderId === HR_SENDER_ID;
        return (
          <li
            key={message.id}
            className={`flex ${isHR ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] p-3 border-border border ${isHR ? "bg-primary text-primary-foreground" : "bg-background"}`}
            >
              <p className="text-sm wrap-break-word">{message.text}</p>
              <p
                className={`text-xs mt-1 ${isHR ? "text-primary-foreground/70" : "text-muted-foreground"}`}
              >
                {message.timestamp.toLocaleDateString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </li>
        );
      })}
      <li ref={messagesEndRef} />
    </ul>
  );
}
