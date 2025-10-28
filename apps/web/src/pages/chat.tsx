import { ChatMessagesSend } from "@/components/chat/ChatMessageSend";
import { ChatMessagesHeader } from "@/components/chat/ChatMessagesHeader";
import { ChatMessageList } from "@/components/chat/ChatMessageList";
import { ChatConversations } from "@/components/chat/ChatConversations";
import { useConversationContext } from "@/context/ConversationsContext";
import { useMessagesContext } from "@/context/MessagesContext";
import { useSendMessage } from "@/hooks/useSendMessage";
import { useEffect } from "react";
export default function Chat() {
  const { employeesConversations } = useConversationContext();
  const { selectedEmployeeId, messages, setSelectedEmployeeId } =
    useMessagesContext();

  const selectedEmployee = employeesConversations.find(
    (e) => e.employeeId === selectedEmployeeId
  );

  const { inputText, setInputText, isSending, handleSendMessage } =
    useSendMessage(
      selectedEmployee?.employeeId || "",
      selectedEmployee?.employeeName || ""
    );

  useEffect(() => {
    // Reset selected employee when component unmounts
    return () => {
      setSelectedEmployeeId(null);
    };
  }, []);
  return (
    <>
      <div className="flex h-full max-md:flex-col ">
        <div className="h-full max-md:h-[30%] basis-[30%]">
          <ChatConversations />
        </div>
        {!selectedEmployeeId || !selectedEmployee ? (
          <ChatEmptyState />
        ) : (
          <div className="h-full flex flex-col w-full border-l ">
            <ChatMessagesHeader employeeName={selectedEmployee.employeeName} />
            <ChatMessageList messages={messages} />
            <ChatMessagesSend
              inputText={inputText}
              setInputText={setInputText}
              isSending={isSending}
              onSendMessage={handleSendMessage}
            />
          </div>
        )}
      </div>
    </>
  );
}

function ChatEmptyState() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-muted/20">
      <div className="text-center">
        <h3 className="text-lg font-medium text-muted-foreground">
          Select an employee to start chatting
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          Choose an employee from the employees list
        </p>
      </div>
    </div>
  );
}
