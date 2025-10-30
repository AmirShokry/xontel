import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useConversationContext } from "./ConversationsContext";
import { useMessagesContext } from "./MessagesContext";

type NotificationsContextType = {
  unreadEmployees: Set<string>;
  markAsRead: (employeeId: string) => void;
};

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const NotificationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [unreadEmployees, setUnreadEmployees] = useState<Set<string>>(
    new Set()
  );
  const { employeesConversations } = useConversationContext();
  const { selectedEmployeeId } = useMessagesContext();

  const loadTimestamp = useState(() => new Date())[0];

  useEffect(() => {
    employeesConversations.forEach((conv) => {
      if (!conv.lastMessageTimestamp) return;

      // Only notify for messages newer than load time
      if (
        conv.lastMessageTimestamp > loadTimestamp &&
        conv.employeeId !== selectedEmployeeId
      )
        setUnreadEmployees((prev) => new Set(prev).add(conv.employeeId));
    });
  }, [employeesConversations, selectedEmployeeId, loadTimestamp]);

  // Mark as read when employee is selected
  useEffect(() => {
    if (selectedEmployeeId) markAsRead(selectedEmployeeId);
  }, [selectedEmployeeId]);

  const markAsRead = (employeeId: string) => {
    setUnreadEmployees((prev) => {
      const next = new Set(prev);
      next.delete(employeeId);
      return next;
    });
  };

  return (
    <NotificationsContext.Provider value={{ unreadEmployees, markAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error(
      "useNotificationsContext must be used within NotificationsProvider"
    );
  }
  return ctx;
};
