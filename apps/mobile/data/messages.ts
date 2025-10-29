import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "@repo/firebase";
import type { NewMessage } from "@/types/chat";
import type { Message } from "@/types/chat";
import { HR_NAME } from "@/constants";

interface SubscribeToMessagesParams {
  employeeId: string;
  onUpdate: (messages: Message[]) => void;
  onError?: (error: Error) => void;
}
interface SendMessageAPIParams {
  employeeId: string;
  employeeName: string;
  message: NewMessage;
}

/**
 * Subscribe to messages for a specific conversation (employeeId)
 */
export function subscribeToEmployeeMessages({
  employeeId,
  onUpdate,
  onError,
}: SubscribeToMessagesParams) {
  const messagesRef = collection(db, "conversations", employeeId, "messages");
  const queryRef = query(messagesRef, orderBy("timestamp", "asc"));

  return onSnapshot(
    queryRef,
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        senderId: doc.data().senderId,
        text: doc.data().text,
        timestamp: doc.data().timestamp?.toDate() || new Date(),
      }));
      onUpdate(messages as Message[]);
    },
    (error) => {
      console.error("Error listening to messages:", error);
      onError?.(error as Error);
    }
  );
}
/**
 * Send a message in a conversation
 */
export async function sendMessageAPI({
  employeeId,
  employeeName,
  message,
}: SendMessageAPIParams) {
  const timestamp = Timestamp.now();

  // Add message to subcollection
  const messagesRef = collection(db, "conversations", employeeId, "messages");
  const docRef = await addDoc(messagesRef, {
    senderId: message.senderId,
    text: message.text,
    timestamp,
  });

  const conversationRef = doc(db, "conversations", employeeId);
  const conversationDoc = await getDoc(conversationRef);

  if (!conversationDoc.exists())
    await setDoc(conversationRef, {
      participantNames: [HR_NAME, employeeName],
      lastMessage: message.text,
      lastMessageTimestamp: timestamp,
    });
  else
    await updateDoc(conversationRef, {
      lastMessage: message.text,
      lastMessageTimestamp: timestamp,
    });

  return {
    id: docRef.id,
    senderId: message.senderId,
    text: message.text,
    timestamp: timestamp.toDate(),
  };
}
