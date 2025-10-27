/**
 * Custom hook to calculate the distribution of feedback ratings (1-5).
 *
 * It consumes the list of all feedbacks and returns an array of rating objects,
 * including count and percentage for each rating level.
 *
 * @returns ratings An object containing the calculated rating distribution.
 */
import type { Feedback } from "@/types/feedbacks";
import { useMemo } from "react";
export function useFeedbackRatings(feedbacks: Feedback[]) {
  // Use a traditional loop instead of reduce for calculating counts.
  const ratings = useMemo(() => {
    // Initialize counts array for scores 1 through 5 (indices 0 through 4).
    const counts = new Array(5).fill(0);
    let total = 0; // Keep track of the total valid feedbacks

    // 1. Calculate the counts for each rating (1-5) and the total.
    for (const fb of feedbacks) {
      const score = Number(fb.score);

      // Validate the score is an integer between 1 and 5
      if (!Number.isNaN(score) && score >= 1 && score <= 5) {
        // Increment the count at the correct index (score - 1)
        counts[score - 1]++;
        total++;
      }
    }

    // 2. Map the counts into the final structured array.
    return counts.map((count, i) => ({
      rating: String(i + 1), // The rating is the index + 1
      count,
      // Calculate percentage only if total > 0
      percentage: total > 0 ? (count / total) * 100 : 0,
      fill: `var(--color-${i + 1})`,
    }));
  }, [feedbacks]);

  return { ratings };
}
