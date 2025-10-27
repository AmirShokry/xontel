import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@repo/firebase";
import type { Feedback } from "@/types/feedbacks";

interface SubscribeToFeedbackSnapshotParams {
  onUpdate: (feedbacks: Feedback[]) => void; // Callback function to be executed when the feedback data is updated.
  onError?: (error: Error) => void; // Optional callback function to be executed if an error occurs during the snapshot listener.
}

/**
 * Sets up a real-time listener (snapshot) on the "feedback" collection in Firestore.
 *
 * This function uses the `onSnapshot` listener to automatically receive data updates
 * whenever a document is added, modified, or deleted in the collection.
 * It also formats the Firestore document data, including converting the Firebase Timestamp
 * for the 'date' field into a standard ISO date string (YYYY-MM-DD).
 * @returns An unsubscribe function to stop the real-time listener.
 */
export function subscribeToFeedbackSnapshot({
  onUpdate,
  onError,
}: SubscribeToFeedbackSnapshotParams): () => void {
  const feedbackRef = collection(db, "feedback");

  return onSnapshot(
    feedbackRef,
    (querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Assuming doc.data().date is a Firebase Timestamp
        date: doc.data()?.date?.toDate()?.toISOString().split("T")[0],
      }));
      onUpdate(docs as Feedback[]);
    },
    (error) => {
      console.error("Error listening to feedbacks:", error);
      onError?.(error as Error);
    }
  );
}
