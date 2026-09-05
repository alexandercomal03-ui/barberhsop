import { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Alert } from "react-native";
import { useFocusEffect } from "expo-router";
import { fetchServices, createService, updateService, deleteService as apiDeleteService } from "../../utils/api";

export default function Services() {
  const [services, setServices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", duration: "" });

  useFocusEffect(useCallback(() => { loadServices(); }, []));

  async function loadServices() { setServices(await fetchServices()); }

  function openAdd() { setEditing(null); setForm({ name: "", description: "", price: "", duration: "" }); setModalVisible(true); }
  function openEdit(item) { setEditing(item); setForm({ name: item.name, description: item.description, price: String(item.price), duration: String(item.duration) }); setModalVisible(true); }

  async function handleSave() {
    if (!form.name || !form.price) { Alert.alert("Error", "Nama dan harga wajib diisi"); return; }
    const data = { name: form.name, description: form.description, price: parseInt(form.price) || 0, duration: parseInt(form.duration) || 30 };
    if (editing) { await updateService(editing.id, data); } else { await createService(data); }
    setModalVisible(false); loadServices();
  }

  async function handleDelete(id) {
    Alert.alert("Hapus Menu", "Yakin?", [
      { text: "Batal", style: "cancel" },
      { text: "Hapus", style: "destructive", onPress: async () => { await apiDeleteService(id); loadServices(); } },
    ]);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addBtn} onPress={openAdd}><Text style={styles.addBtnText}>+ Tambah Menu</Text></TouchableOpacity>
      <FlatList data={services} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
            <Text style={styles.cardPrice}>Rp{item.price.toLocaleString("id-ID")} · {item.duration} menit</Text>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity onPress={() => openEdit(item)} style={styles.editBtn}><Text style={styles.editText}>Edit</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}><Text style={styles.deleteText}>Hapus</Text></TouchableOpacity>
          </View>
        </View>
      )} />
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editing ? "Edit Menu" : "Tambah Menu"}</Text>
            <TextInput style={styles.input} placeholder="Nama Menu" value={form.name} onChangeText={(t) => setForm({ ...form, name: t })} />
            <TextInput style={styles.input} placeholder="Deskripsi" value={form.description} onChangeText={(t) => setForm({ ...form, description: t })} />
            <TextInput style={styles.input} placeholder="Harga" value={form.price} onChangeText={(t) => setForm({ ...form, price: t })} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Durasi (menit)" value={form.duration} onChangeText={(t) => setForm({ ...form, duration: t })} keyboardType="numeric" />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}><Text style={styles.cancelText}>Batal</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.saveBtn}><Text style={styles.saveText}>Simpan</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 12 },
  addBtn: { backgroundColor: "#D97706", padding: 14, borderRadius: 12, alignItems: "center", marginBottom: 16 },
  addBtnText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 12, elevation: 1 },
  cardBody: { flex: 1 },
  cardName: { fontSize: 16, fontWeight: "600", color: "#111827" },
  cardDesc: { fontSize: 13, color: "#6B7280", marginTop: 4 },
  cardPrice: { fontSize: 14, color: "#D97706", fontWeight: "600", marginTop: 6 },
  cardActions: { flexDirection: "row", gap: 8, marginTop: 12 },
  editBtn: { flex: 1, padding: 10, borderRadius: 8, backgroundColor: "#EFF6FF", alignItems: "center" },
  editText: { color: "#3B82F6", fontWeight: "600", fontSize: 13 },
  deleteBtn: { flex: 1, padding: 10, borderRadius: 8, backgroundColor: "#FEF2F2", alignItems: "center" },
  deleteText: { color: "#EF4444", fontWeight: "600", fontSize: 13 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 40 },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#111827", marginBottom: 16 },
  input: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 10, padding: 12, fontSize: 14, marginBottom: 12 },
  modalActions: { flexDirection: "row", gap: 12, marginTop: 8 },
  cancelBtn: { flex: 1, padding: 14, borderRadius: 10, backgroundColor: "#F3F4F6", alignItems: "center" },
  cancelText: { color: "#6B7280", fontWeight: "600" },
  saveBtn: { flex: 1, padding: 14, borderRadius: 10, backgroundColor: "#D97706", alignItems: "center" },
  saveText: { color: "#fff", fontWeight: "600" },
});
