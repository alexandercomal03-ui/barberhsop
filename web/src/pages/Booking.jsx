import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchServices, createBooking } from "../utils/api";
import { generateTimeSlots } from "../data/dummyData";
import { CheckCircle, Calendar, Clock, Scissors, ArrowLeft } from "lucide-react";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("layanan") || "";
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ serviceId: preselectedService, date: "", time: "", name: "", phone: "" });
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
          <h2 className="text-2xl font-black text-white mb-2">Booking Diterima!</h2>
          <p className="text-gray-500 mb-4">Nomor referensi kamu:</p>
          <p className="text-3xl font-black text-amber-500 mb-6">{bookingId}</p>
          <p className="text-sm text-gray-500 mb-8">Admin akan mengkonfirmasi pesanan via WhatsApp.</p>
          <a
            href={`https://wa.me/6285799997317?text=Halo, saya sudah booking dengan referensi ${bookingId}`}
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
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Booking Jadwal</h1>
          <p className="text-gray-500">Pilih layanan dan jam yang kamu mau.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#111] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
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
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-3">
              <Calendar size={16} className="text-amber-500" /> Pilih Tanggal
            </label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} required className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-3">
              <Clock size={16} className="text-amber-500" /> Pilih Jam
            </label>
            {formData.date ? (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {availableSlots.map((slot) => (
                  <button key={slot} type="button" onClick={() => setFormData({ ...formData, time: slot })} className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${formData.time === slot ? "bg-amber-500 text-black shadow-[0_0_20px_-5px_rgba(245,158,11,0.5)]" : "bg-[#1a1a1a] text-gray-400 hover:bg-[#222] hover:text-white border border-white/5"}`}>
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600 bg-[#1a1a1a] rounded-xl px-4 py-3 border border-white/5">Pilih tanggal terlebih dahulu.</p>
            )}
          </div>
          <div>
            <label className="text-sm font-bold text-gray-300 mb-3 block">Nama Lengkap</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Masukkan nama kamu" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-300 mb-3 block">Nomor WhatsApp</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="08xxxxxxxxxx" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
          </div>
          <button type="submit" disabled={!formData.time} className="w-full bg-amber-500 text-black py-4 rounded-full font-bold text-sm hover:bg-amber-400 transition-all disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)] disabled:shadow-none">
            Konfirmasi Booking
          </button>
        </form>
      </div>
    </div>
  );
}
