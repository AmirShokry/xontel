import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { useSubscribeMessages } from "@/hooks/useSubscribeMessages";

import type { Message } from "@repo/shared/types/chat";

type MessagesContext = {
  selectedEmployeeId: string | null;
  setSelectedEmployeeId: (id: string | null) => void;
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
};

const MessagesContext = createContext<MessagesContext | undefined>(undefined);
export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );
  const { messages, isLoading, error } =
    useSubscribeMessages(selectedEmployeeId);

  return (
    <MessagesContext.Provider
      value={{
        selectedEmployeeId,
        setSelectedEmployeeId,
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
