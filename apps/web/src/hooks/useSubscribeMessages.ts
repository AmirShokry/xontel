import { useState, useEffect } from "react";
import { subscribeToEmployeeMessages } from "@/data/messages";
import type { Message } from "@/types/chat";

export const useSubscribeMessages = (selectedEmployeeId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!selectedEmployeeId) {
      setMessages([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);

    const unsubscribe = subscribeToEmployeeMessages({
      employeeId: selectedEmployeeId,
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
  }, [selectedEmployeeId]); // Re-run when selectedEmployeeId changes

  return { messages, isLoading, error };
};
