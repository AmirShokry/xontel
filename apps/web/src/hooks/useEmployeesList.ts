import { useMemo } from "react";
import { useFeedbackContext } from "@/context/FeedbackContext";
import { EMPLOYEE_NAME, EMPLOYEE_SENDER_ID } from "@/constants";

/**
 * Generates a deterministic employee ID based on employee name.
 * - Alice Johnson gets special ID: emp_alice_johnson_42
 * - Others get: emp_name[underscore_separated]_randomNumber
 */
function generateEmployeeId(name: string): string {
  if (name === EMPLOYEE_NAME) return EMPLOYEE_SENDER_ID;
  // Convert name to lowercase and replace spaces with underscores
  const nameSlug = name?.toLowerCase().replace(/\s+/g, "_");
  // Generate a random number between 1 and 999
  const randomNum = Math.floor(Math.random() * 999) + 1;
  return `emp_${nameSlug}_${randomNum}`;
}

export const useEmployeesList = () => {
  const { feedbacks } = useFeedbackContext();

  // Extract unique employees and generate IDs if not present.
  // Uses a Map keyed by employee name to handle duplicates and ensure
  // each unique employee appears only once in the result.
  const employees = useMemo<{ id: string; name: string }[]>(() => {
    const employeeMap = new Map<string, { id: string; name: string }>();

    feedbacks.forEach((feedback) => {
      const { employeeName } = feedback;

      // Only add if this employee hasn't been seen yet
      if (!employeeMap.has(employeeName)) {
        const employeeId = generateEmployeeId(employeeName);
        employeeMap.set(employeeName, {
          id: employeeId,
          name: employeeName,
        });
      }
    });

    return Array.from(employeeMap.values());
  }, [feedbacks]);

  return { employees };
};
