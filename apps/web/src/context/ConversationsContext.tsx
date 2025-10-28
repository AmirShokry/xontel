import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { useSubscribeConversations } from "@/hooks/useSubscribeConversations";
import { useEmployeesList } from "@/hooks/useEmployeesList";

type ConversationsContextType = {
  employeesConversations: {
    employeeId: string;
    employeeName: string;
    conversationId: string | null;
    lastMessage: string;
    lastMessageTimestamp: Date | null;
  }[];
  isLoading: boolean;
  error: Error | null;
};

const ConversationsContext = createContext<
  ConversationsContextType | undefined
>(undefined);
export const ConversationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { employees } = useEmployeesList();

  const { conversations, isLoading, error } = useSubscribeConversations();

  const employeesConversations = useMemo(() => {
    return employees.map((employee) => {
      const conversation = conversations.find((conv) =>
        conv.id.includes(employee.id)
      );

      return {
        conversationId: conversation?.id ?? null,
        employeeId: employee.id,
        employeeName: employee.name,
        participants: conversation?.participantNames ?? [],
        lastMessage: conversation?.lastMessage ?? "",
        lastMessageTimestamp: conversation?.lastMessageTimestamp ?? null,
      };
    });
  }, [employees, conversations]);

  return (
    <ConversationsContext.Provider
      value={{
        employeesConversations,
        isLoading,
        error,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

export const useConversationContext = () => {
  const ctx = useContext(ConversationsContext);
  if (!ctx)
    throw new Error("useChatContext must be used within a ChatProvider");
  return ctx;
};
