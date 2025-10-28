import { useEffect, useState } from "react";
import type { Feedback } from "@/types/feedbacks";
import { subscribeToFeedbackSnapshot } from "@/data/feedbacks";
export function useSubscribeFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Subscribe to real-time updates
    const unsubscribe = subscribeToFeedbackSnapshot({
      onUpdate: (updatedFeedbacks) => {
        setFeedbacks(updatedFeedbacks);
        setIsLoading(false);
      },
      onError: (err) => {
        setError(err);
        setIsLoading(false);
      },
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return { feedbacks, isLoading, error };
}
