import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";
import { MessagesList } from "@/components/MessagesList";
import { MessagesSender } from "@/components/MessagesSender";

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="w-full flex-1"
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 90}
      >
        <MessagesList />
        <MessagesSender />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
