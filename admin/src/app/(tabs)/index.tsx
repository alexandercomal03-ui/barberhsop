import { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchBookings, fetchServices } from "../../utils/api";

export default function Dashboard() {
  const [stats, setStats] = useState({ totalBookings: 0, pending: 0, accepted: 0, completed: 0, totalServices: 0 });

  useFocusEffect(useCallback(() => { loadData(); }, []));

  async function loadData() {
    const bookings = await fetchBookings();
    const services = await fetchServices();
    setStats({
      totalBookings: bookings.length,
      pending: bookings.filter((b) => b.status === "pending").length,
      accepted: bookings.filter((b) => b.status === "accepted").length,
      completed: bookings.filter((b) => b.status === "completed").length,
      totalServices: services.length,
    });
  }

  function handleLogout() {
    Alert.alert("Logout", "Yakin ingin logout?", [
      { text: "Batal", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: async () => { await AsyncStorage.removeItem("@admin_logged_in"); router.replace("/login"); } },
    ]);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ringkasan</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}><Text style={styles.logoutText}>Logout</Text></TouchableOpacity>
      </View>
      <View style={styles.grid}>
        <StatCard label="Total Booking" value={stats.totalBookings} color="#F59E0B" />
        <StatCard label="Menunggu" value={stats.pending} color="#EAB308" />
        <StatCard label="Diterima" value={stats.accepted} color="#3B82F6" />
        <StatCard label="Selesai" value={stats.completed} color="#22C55E" />
        <StatCard label="Total Menu" value={stats.totalServices} color="#8B5CF6" />
      </View>
      <View style={styles.infoBox}><Text style={styles.infoText}>Data sinkron dengan website customer.</Text></View>
    </ScrollView>
  );
}

function StatCard({ label, value, color }) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={[styles.cardValue, { color }]}>{value}</Text>
      <Text style={styles.cardLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  title: { fontSize: 20, fontWeight: "bold", color: "#111827" },
  logoutBtn: { backgroundColor: "#EF4444", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  logoutText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  grid: { gap: 12 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, borderLeftWidth: 4, elevation: 1 },
  cardValue: { fontSize: 28, fontWeight: "bold" },
  cardLabel: { fontSize: 14, color: "#6B7280", marginTop: 4 },
  infoBox: { backgroundColor: "#DCFCE7", borderRadius: 12, padding: 16, marginTop: 16 },
  infoText: { color: "#166534", fontSize: 14 },
});
