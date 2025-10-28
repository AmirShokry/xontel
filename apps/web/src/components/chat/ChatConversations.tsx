import { useConversationContext } from "@/context/ConversationsContext";
import { useMessagesContext } from "@/context/MessagesContext";
import Spinner from "@/assets/icons/spinner.svg?react";
export function ChatConversations() {
  const { employeesConversations, isLoading } = useConversationContext();
  const { setSelectedEmployeeId, selectedEmployeeId } = useMessagesContext();
  if (isLoading) return <Spinner className="size-8" />;

  return (
    <ul className="flex flex-col gap-2  max-h-[95%]    overflow-y-auto p-4 ">
      {employeesConversations.map((emp) => (
        <li
          className={`cursor-pointer
            hover:bg-accent ${selectedEmployeeId === emp.employeeId ? "border-black bg-accent" : "border-border"}
            p-4 rounded-lg border `}
          onClick={() => setSelectedEmployeeId(emp.employeeId)}
          key={emp.employeeId}
        >
          <p className="font-medium">{emp.employeeName}</p>
          <p className="text-sm text-muted-foreground">{emp.lastMessage}</p>
          <p className="text-xs text-muted-foreground">
            {emp?.lastMessageTimestamp
              ? emp.lastMessageTimestamp.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </p>
        </li>
      ))}
    </ul>
  );
}
