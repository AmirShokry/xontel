import { type ReactNode, useContext, createContext } from "react";
import type { Feedback } from "@/types/feedbacks";
import { useSubscribeFeedbacks } from "@/hooks/useSubscribeFeedbacks";
interface FeedbackContenxtType {
  feedbacks: Feedback[];
  isLoading: boolean;
  error?: Error | null;
}

const FeedbacksContext = createContext<FeedbackContenxtType | undefined>(
  undefined
);

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const { feedbacks, isLoading, error } = useSubscribeFeedbacks();

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
