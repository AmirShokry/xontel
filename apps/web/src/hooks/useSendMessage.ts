import { useState, useEffect } from "react";
import { sendMessageAPI } from "@/data/messages";
import { HR_SENDER_ID } from "@repo/shared/constants";

export function useSendMessage(employeeId: string, employeeName: string) {
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Reset input when employee changes
  useEffect(() => {
    setInputText("");
  }, [employeeId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;

    setIsSending(true);
    try {
      const message = {
        senderId: HR_SENDER_ID,
        text: inputText.trim(),
      };
      await sendMessageAPI({
        employeeId,
        employeeName,
        message,
      });
      setInputText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return {
    inputText,
    setInputText,
    isSending,
    handleSendMessage,
  };
}
