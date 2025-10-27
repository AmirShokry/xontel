import {
  type ReactNode,
  useContext,
  useState,
  createContext,
  useEffect,
} from "react";
import type { Feedback } from "@/types/feedbacks";
import { subscribeToFeedbackSnapshot } from "@/data/feedbacks";
interface FeedbackContenxtType {
  feedbacks: Feedback[];
  isLoading: boolean;
  error?: Error | null;
}

const FeedbacksContext = createContext<FeedbackContenxtType | undefined>(
  undefined
);

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
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

  return (
    <FeedbacksContext.Provider value={{ feedbacks, isLoading, error }}>
      {children}
    </FeedbacksContext.Provider>
  );
};
export const useFeedbackContext = () => {
  const context = useContext(FeedbacksContext);
  if (!context)
    throw new Error(
      "useFeedbackContext must be used within a FeedbackProvider"
    );

  return context;
};
