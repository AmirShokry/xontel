import { useState, useEffect } from "react";
import { sendMessageAPI } from "@/data/messages";
import { EMPLOYEE_SENDER_ID, EMPLOYEE_NAME } from "@/constants";

export function useSendMessage() {
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isSending) return;

    setIsSending(true);
    try {
      const message = {
        senderId: EMPLOYEE_SENDER_ID,
        text: inputText.trim(),
      };
      await sendMessageAPI({
        employeeId: EMPLOYEE_SENDER_ID,
        employeeName: EMPLOYEE_NAME,
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
