import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import { MessagesProvider } from "@/context/MessagesContext";
import "./global.css";

export default function RootLayout() {
  const router = useRouter();
  return (
    <MessagesProvider>
      <StatusBar />
      <Stack
        screenOptions={{
          title: "Chat with HR",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable
              onPress={() => {
                if (router.canGoBack()) router.back();
              }}
              className="pl-2"
            >
              <Text style={{ fontSize: 20 }}>⬅</Text>
            </Pressable>
          ),
        }}
      />
    </MessagesProvider>
  );
}
