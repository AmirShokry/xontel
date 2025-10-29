import { useState, useEffect } from "react";
import { subscribeToEmployeeMessages } from "@/data/messages";
import type { Message } from "@/types/chat";

export const useSubscribeMessages = (currentEmployeeId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!currentEmployeeId) {
      setMessages([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);

    const unsubscribe = subscribeToEmployeeMessages({
      employeeId: currentEmployeeId,
      onUpdate: (updatedConversations) => {
        setMessages(updatedConversations);
        setIsLoading(false);
      },
      onError: (err) => {
        setError(err);
        setIsLoading(false);
      },
    });

    // Cleanup subscription when employee changes or component unmounts
    return () => unsubscribe();
  }, [currentEmployeeId]); // Re-run when selectedEmployeeId changes

  return { messages, isLoading, error };
};
