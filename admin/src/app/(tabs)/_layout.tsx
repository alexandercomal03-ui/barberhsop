import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#D97706", tabBarInactiveTintColor: "#9CA3AF", headerStyle: { backgroundColor: "#D97706" }, headerTintColor: "#fff", headerTitleStyle: { fontWeight: "bold" } }}>
      <Tabs.Screen name="index" options={{ title: "Dashboard", tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📊</Text> }} />
      <Tabs.Screen name="bookings" options={{ title: "Booking", tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📋</Text> }} />
      <Tabs.Screen name="services" options={{ title: "Menu", tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>✂️</Text> }} />
    </Tabs>
  );
}
