export const barbershop = {
  name: "PotongRambut",
  description: "Barbershop dengan potongan rapi dan suasana santai. Pesan kursi, datang, selesai.",
  address: "Jl. Kenanga No. 12, Solo",
  phone: "0857-9999-7317",
  whatsapp: "6285799997317",
  hours: {
    weekday: "Senin – Jumat · 09.00 – 21.00",
    weekend: "Sabtu – Minggu · 10.00 – 20.00",
  },
  copyright: "© 2026 PotongRambut Barbershop",
};

export const testimonials = [
  { id: 1, name: "Aditya", since: "sejak 2021", message: "Tinggal pesan dari HP, datang, langsung dipotong. Nggak perlu nunggu lama." },
  { id: 2, name: "Raka", since: "sejak 2022", message: "Barber-nya jago, hasilnya selalu sesuai yang diminta." },
  { id: 3, name: "Dimas", since: "sejak 2023", message: "Booking online bikin hemat waktu, datang pas jadwal langsung dilayani." },
];

export const steps = [
  { number: "01", title: "Pilih layanan", description: "Tentukan potongan atau perawatan yang kamu mau." },
  { number: "02", title: "Pilih jam", description: "Ambil slot yang kosong sesuai jadwalmu." },
  { number: "03", title: "Kami konfirmasi", description: "Pesanan masuk ke admin dan dikabari via WhatsApp." },
];

export const generateTimeSlots = (date) => {
  const day = new Date(date).getDay();
  const isWeekend = day === 0 || day === 6;
  const startHour = isWeekend ? 10 : 9;
  const endHour = isWeekend ? 20 : 21;
  const slots = [];
  for (let h = startHour; h < endHour; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }
  return slots;
};
