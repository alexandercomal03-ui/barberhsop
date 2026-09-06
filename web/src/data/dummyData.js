export const barbershop = {
  name: "PotongRambut",
  tagline: "Tukang Cukur Panggilan",
  description: "Barber profesional datang ke rumah Anda. Tanpa antre, tanpa ribet. Tinggal pesan, kami yang datang.",
  phone: "0857-9999-7317",
  whatsapp: "6285799997317",
  hours: {
    weekday: "Senin – Jumat · 08.00 – 21.00",
    weekend: "Sabtu – Minggu · 09.00 – 20.00",
  },
  areas: ["Solo", "Surakarta", "Karanganyar", "Sukoharjo", "Klaten"],
  copyright: "© 2026 PotongRambut — Tukang Cukur Panggilan",
};

export const testimonials = [
  { id: 1, name: "Aditya", area: "Solo", message: "Praktis banget, tinggal pilih jam, barber datang ke kos. Hasilnya rapi!" },
  { id: 2, name: "Raka", area: "Karanganyar", message: "Gak perlu macet-macetan ke barbershop. Barber-nya jago, datang tepat waktu." },
  { id: 3, name: "Dimas", area: "Sukoharjo", message: "Anak saya juga bisa potong di rumah. Hemat waktu dan tenaga." },
];

export const steps = [
  { number: "01", title: "Pilih layanan", description: "Tentukan potongan atau perawatan yang kamu mau." },
  { number: "02", title: "Kirim alamat", description: "Isi alamat lengkap dan jam yang cocok." },
  { number: "03", title: "Barber datang", description: "Tim kami datang ke lokasi Anda sesuai jadwal." },
];

export const generateTimeSlots = (date) => {
  const day = new Date(date).getDay();
  const isWeekend = day === 0 || day === 6;
  const startHour = isWeekend ? 9 : 8;
  const endHour = isWeekend ? 20 : 21;
  const slots = [];
  for (let h = startHour; h < endHour; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
};
