import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@repo/firebase";
import type { Conversation } from "@/types/chat";
/**
 * Subscribe to all conversations, ordered by last message timestamp
 */
interface SubscribeToConversationsParams {
  onUpdate: (conversations: Conversation[]) => void;
  onError?: (error: Error) => void;
}

export function subscribeToConversationsSnapshot({
  onUpdate,
  onError,
}: SubscribeToConversationsParams) {
  const conversationsRef = collection(db, "conversations");
  const queryRef = query(
    conversationsRef,
    orderBy("lastMessageTimestamp", "desc")
  );

  return onSnapshot(
    queryRef,
    (querySnapshot) => {
      const conversations = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        participantNames: doc.data()?.participantNames || [],
        lastMessage: doc.data()?.lastMessage || "",
        lastMessageTimestamp:
          doc.data().lastMessageTimestamp?.toDate() || new Date(),
      }));
      onUpdate(conversations as Conversation[]);
    },
    (error) => {
      console.error("Error listening to conversations:", error);
      onError?.(error as Error);
    }
  );
}
