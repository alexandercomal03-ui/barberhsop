import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchServices, createBooking } from "../utils/api";
import { generateTimeSlots } from "../data/dummyData";
import { CheckCircle, Calendar, Clock, Scissors, MapPin, User, Phone } from "lucide-react";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("layanan") || "";
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    serviceId: preselectedService,
    date: "",
    time: "",
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => { fetchServices().then(setServices); }, []);
  useEffect(() => {
    if (formData.date) {
      setAvailableSlots(generateTimeSlots(formData.date));
      setFormData((prev) => ({ ...prev, time: "" }));
    }
  }, [formData.date]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createBooking({
      ...formData,
      serviceId: parseInt(formData.serviceId),
    });
    setBookingId(result.id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-[#0a0a0a]">
        <div className="bg-[#111] border border-white/5 rounded-3xl p-8 max-w-md w-full mx-4 text-center">
          <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Pesanan Diterima!</h2>
          <p className="text-gray-500 mb-4">Nomor referensi kamu:</p>
          <p className="text-3xl font-black text-amber-500 mb-6">{bookingId}</p>
          <p className="text-sm text-gray-500 mb-8">Barber kami akan mengkonfirmasi via WhatsApp dan datang sesuai jadwal.</p>
          <a
            href={`https://wa.me/6285799997317?text=Halo, saya sudah pesan tukang cukur panggilan dengan referensi ${bookingId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-green-600 text-white py-4 rounded-full font-bold hover:bg-green-500 transition-colors"
          >
            Konfirmasi via WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-12 bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Pesan Tukang Cukur</h1>
          <p className="text-gray-500">Isi data di bawah, kami datang ke tempat Anda.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#111] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-5">
          {/* Service Selection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-3">
              <Scissors size={16} className="text-amber-500" /> Pilih Layanan
            </label>
            <select name="serviceId" value={formData.serviceId} onChange={handleChange} required className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none cursor-pointer">
              <option value="" className="bg-[#1a1a1a]">-- Pilih Layanan --</option>
              {services.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#1a1a1a]">{s.name} — Rp{s.price.toLocaleString("id-ID")}</option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-3">
                <Calendar size={16} className="text-amber-500" /> Tanggal
              </label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} required className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-3">
                <Clock size={16} className="text-amber-500" /> Jam
              </label>
              {formData.date ? (
                <select name="time" value={formData.time} onChange={handleChange} required className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none cursor-pointer">
                  <option value="" className="bg-[#1a1a1a]">-- Pilih Jam --</option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot} className="bg-[#1a1a1a]">{slot}</option>
                  ))}
                </select>
              ) : (
                <p className="text-sm text-gray-600 bg-[#1a1a1a] rounded-xl px-4 py-3.5 border border-white/5">Pilih tanggal dulu</p>
              )}
            </div>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-3">
                <User size={16} className="text-amber-500" /> Nama
              </label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Nama lengkap" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-3">
                <Phone size={16} className="text-amber-500" /> WhatsApp
              </label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="08xxxxxxxxxx" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-3">
              <MapPin size={16} className="text-amber-500" /> Alamat Lengkap
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Jl. Kenanga No. 12, RT 03/RW 05, Kel. Kepatihan, Kec. Banjarsari, Solo"
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-600 mt-1">Tambahkan patokan agar mudah ditemukan (dekat mana, warna rumah, dll)</p>
          </div>

          {/* Note */}
          <div>
            <label className="text-sm font-bold text-gray-300 mb-3 block">Catatan (Opsional)</label>
            <input
              type="text"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Contoh: minta fade tipis, ada garis samping"
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Summary */}
          {formData.serviceId && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <p className="text-xs text-amber-400 font-semibold mb-1">Ringkasan Pesanan</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">
                  {services.find(s => s.id === parseInt(formData.serviceId))?.name || '-'}
                </span>
                <span className="text-sm font-bold text-amber-400">
                  Rp{(services.find(s => s.id === parseInt(formData.serviceId))?.price || 0).toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!formData.time || !formData.address}
            className="w-full bg-amber-500 text-black py-4 rounded-full font-bold text-sm hover:bg-amber-400 transition-all disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)] disabled:shadow-none"
          >
            Pesan Sekarang
          </button>
        </form>
      </div>
    </div>
  );
}
