import type { Feedback } from "@/types/feedbacks";
import { useState, useCallback, useMemo } from "react";
export const useFeedbackSearch = (feedbacks: Feedback[]) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const targetFeedbacks = useMemo(() => {
    const searchValueLower = searchValue.toLowerCase().trim();
    if (!searchValueLower) return feedbacks;

    return feedbacks.filter((feedback) =>
      feedback.employeeName.toLowerCase().includes(searchValueLower)
    );
  }, [feedbacks, searchValue]);

  return { searchValue, handleSearchChange, targetFeedbacks };
};
