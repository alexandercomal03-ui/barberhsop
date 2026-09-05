import { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "expo-router";
import { fetchBookings, updateBooking, deleteBooking as apiDeleteBooking } from "../../utils/api";

const statusConfig = {
  pending: { label: "Menunggu", color: "#EAB308", bg: "#FEF9C3" },
  accepted: { label: "Diterima", color: "#3B82F6", bg: "#DBEAFE" },
  completed: { label: "Selesai", color: "#22C55E", bg: "#DCFCE7" },
  rejected: { label: "Ditolak", color: "#EF4444", bg: "#FEE2E2" },
};

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");

  useFocusEffect(useCallback(() => { loadBookings(); }, []));

  async function loadBookings() { setBookings(await fetchBookings()); }

  async function handleUpdateStatus(id, status) { await updateBooking(id, { status }); loadBookings(); }

  async function handleDelete(id) {
    Alert.alert("Hapus Booking", "Yakin?", [
      { text: "Batal", style: "cancel" },
      { text: "Hapus", style: "destructive", onPress: async () => { await apiDeleteBooking(id); loadBookings(); } },
    ]);
  }

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        {["all", "pending", "accepted", "completed", "rejected"].map((f) => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[styles.filterBtn, filter === f && styles.filterBtnActive]}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f === "all" ? "Semua" : statusConfig[f]?.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {filtered.length === 0 ? (
        <View style={styles.empty}><Text style={styles.emptyText}>Belum ada booking.</Text></View>
      ) : (
        <FlatList data={filtered} keyExtractor={(item) => item.id} renderItem={({ item }) => {
          const cfg = statusConfig[item.status] || statusConfig.pending;
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardId}>{item.id}</Text>
                <View style={[styles.badge, { backgroundColor: cfg.bg }]}><Text style={[styles.badgeText, { color: cfg.color }]}>{cfg.label}</Text></View>
              </View>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardDetail}>{item.service} · {item.date} {item.time}</Text>
              <Text style={styles.cardWa}>WA: {item.whatsapp}</Text>
              <View style={styles.actions}>
                {item.status === "pending" && (<>
                  <TouchableOpacity onPress={() => handleUpdateStatus(item.id, "accepted")} style={[styles.actionBtn, { backgroundColor: "#3B82F6" }]}><Text style={styles.actionText}>Terima</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => handleUpdateStatus(item.id, "rejected")} style={[styles.actionBtn, { backgroundColor: "#EF4444" }]}><Text style={styles.actionText}>Tolak</Text></TouchableOpacity>
                </>)}
                {item.status === "accepted" && (<TouchableOpacity onPress={() => handleUpdateStatus(item.id, "completed")} style={[styles.actionBtn, { backgroundColor: "#22C55E" }]}><Text style={styles.actionText}>Selesai</Text></TouchableOpacity>)}
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.actionBtn, { backgroundColor: "#6B7280" }]}><Text style={styles.actionText}>Hapus</Text></TouchableOpacity>
              </View>
            </View>
          );
        }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  filterRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, padding: 12 },
  filterBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: "#fff", borderWidth: 1, borderColor: "#E5E7EB" },
  filterBtnActive: { backgroundColor: "#D97706", borderColor: "#D97706" },
  filterText: { fontSize: 12, color: "#6B7280" },
  filterTextActive: { color: "#fff", fontWeight: "600" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#9CA3AF", fontSize: 16 },
  card: { backgroundColor: "#fff", marginHorizontal: 12, marginBottom: 12, borderRadius: 12, padding: 14, elevation: 1 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  cardId: { fontWeight: "bold", color: "#D97706", fontSize: 13 },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12 },
  badgeText: { fontSize: 11, fontWeight: "600" },
  cardName: { fontSize: 16, fontWeight: "600", color: "#111827" },
  cardDetail: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  cardWa: { fontSize: 12, color: "#9CA3AF", marginTop: 4 },
  actions: { flexDirection: "row", gap: 8, marginTop: 12 },
  actionBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  actionText: { color: "#fff", fontSize: 12, fontWeight: "600" },
});
