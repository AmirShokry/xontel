import { View, TextInput, Pressable, Text } from "react-native";
import { useSendMessage } from "@/hooks/useSendMessage";
export function MessagesSender() {
  const { inputText, setInputText, handleSendMessage } = useSendMessage();
  return (
    <View className="flex flex-row w-full px-2 py-2 border-t border-gray-200">
      <TextInput
        className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
        placeholder="Send a message..."
        value={inputText}
        onChangeText={setInputText}
      />
      <Pressable onPress={handleSendMessage}>
        <View className="bg-gray-500 rounded-lg px-4 py-2 justify-center">
          <Text className="text-white font-semibold">Send</Text>
        </View>
      </Pressable>
    </View>
  );
}
