import { useState, useEffect } from "react";
import { subscribeToConversationsSnapshot } from "@/data/conversations";
import type { Conversation } from "@repo/shared/types/chat";

export const useSubscribeConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const unsubscribe = subscribeToConversationsSnapshot({
      onUpdate: (updatedConversations) => {
        setConversations(updatedConversations);
        setIsLoading(false);
      },
      onError: (err) => {
        setError(err);
        setIsLoading(false);
      },
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs once on mount

  return { conversations, isLoading, error };
};
