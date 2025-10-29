import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useSubscribeMessages } from "@/hooks/useSubscribeMessages";
import { EMPLOYEE_SENDER_ID } from "@/constants";
import type { Message } from "@/types/chat";

type MessagesContext = {
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
};

const MessagesContext = createContext<MessagesContext | undefined>(undefined);
export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const { messages, isLoading, error } =
    useSubscribeMessages(EMPLOYEE_SENDER_ID);

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isLoading,
        error,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessagesContext = () => {
  const ctx = useContext(MessagesContext);
  if (!ctx)
    throw new Error("useMessagesContext must be used within a MessageProvider");
  return ctx;
};
