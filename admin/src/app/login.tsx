import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (pin.length !== 4) { Alert.alert("Error", "PIN harus 4 digit"); return; }
    setLoading(true);
    if (pin === "1234") {
      await AsyncStorage.setItem("@admin_logged_in", "true");
      router.replace("/");
    } else {
      Alert.alert("Salah", "PIN tidak benar");
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>🔒</Text>
        <Text style={styles.title}>Admin Login</Text>
        <Text style={styles.subtitle}>Masukkan PIN untuk akses admin</Text>
        <TextInput style={styles.input} placeholder="PIN (default: 1234)" value={pin} onChangeText={setPin} keyboardType="numeric" maxLength={4} secureTextEntry />
        <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
          <Text style={styles.btnText}>{loading ? "Memeriksa..." : "Masuk"}</Text>
        </TouchableOpacity>
        <Text style={styles.hint}>PIN default: 1234</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", justifyContent: "center", alignItems: "center", padding: 20 },
  card: { backgroundColor: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 360, alignItems: "center", elevation: 3 },
  icon: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: "bold", color: "#111827", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#6B7280", marginBottom: 24 },
  input: { width: "100%", borderWidth: 2, borderColor: "#E5E7EB", borderRadius: 12, padding: 16, fontSize: 24, textAlign: "center", letterSpacing: 12, marginBottom: 16 },
  btn: { width: "100%", backgroundColor: "#D97706", padding: 16, borderRadius: 12, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  hint: { fontSize: 12, color: "#9CA3AF", marginTop: 16 },
});
