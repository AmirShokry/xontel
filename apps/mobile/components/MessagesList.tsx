import { FlatList, Text, View } from "react-native";
import { EMPLOYEE_SENDER_ID } from "@repo/shared/constants";
import { useMessagesContext } from "@/context/MessagesContext";
import { useRef } from "react";
export function MessagesList() {
  const { messages, isLoading } = useMessagesContext();
  const flatListRef = useRef<FlatList>(null);
  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: false });
    }, 100);
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };
  return (
    <FlatList
      className="w-full mb-2"
      ref={flatListRef}
      data={messages}
      keyExtractor={(item) => item.id}
      onContentSizeChange={handleContentSizeChange}
      onLayout={scrollToBottom}
      renderItem={({ item }) => {
        const isEmployee = item.senderId === EMPLOYEE_SENDER_ID;
        const timestamp = new Date(item.timestamp).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        return (
          <>
            <View
              className={`max-w-[70%] rounded-lg p-4 mb-2 
                ${isEmployee ? "self-start bg-blue-500 " : "self-end bg-green-500"}`}
            >
              <Text className="text-white">{item.text}</Text>
              <Text className="text-white text-xs opacity-70 mt-1">
                {timestamp}
              </Text>
            </View>
          </>
        );
      }}
    />
  );
}
