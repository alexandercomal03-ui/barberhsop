import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("@admin_logged_in").then((v) => setIsLoggedIn(v === "true"));
  }, []);

  if (isLoggedIn === null) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F9FAFB" }}><ActivityIndicator size="large" color="#D97706" /></View>;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="login" />}
    </Stack>
  );
}
