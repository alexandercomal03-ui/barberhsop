import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchServices, createBooking } from "../utils/api";
import { generateTimeSlots } from "../data/dummyData";
import { CheckCircle, Calendar, Clock, Scissors } from "lucide-react";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("layanan") || "";
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ service: preselectedService, date: "", time: "", name: "", whatsapp: "" });
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
    const result = await createBooking(formData);
    setBookingId(result.id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Diterima!</h2>
          <p className="text-gray-500 mb-4">Nomor referensi kamu:</p>
          <p className="text-2xl font-bold text-amber-600 mb-6">{bookingId}</p>
          <p className="text-sm text-gray-500 mb-6">Admin akan mengkonfirmasi pesanan via WhatsApp.</p>
          <a href={`https://wa.me/6285799997317?text=Halo, saya sudah booking dengan referensi ${bookingId}`} target="_blank" rel="noopener noreferrer" className="block bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition-colors">
            Konfirmasi via WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Jadwal</h1>
          <p className="text-gray-500">Pilih layanan dan jam yang kamu mau.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"><Scissors size={16} /> Pilih Layanan</label>
            <select name="service" value={formData.service} onChange={handleChange} required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
              <option value="">-- Pilih Layanan --</option>
              {services.map((s) => (<option key={s.id} value={s.name}>{s.name} — Rp{s.price.toLocaleString("id-ID")}</option>))}
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"><Calendar size={16} /> Pilih Tanggal</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"><Clock size={16} /> Pilih Jam</label>
            {formData.date ? (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {availableSlots.map((slot) => (
                  <button key={slot} type="button" onClick={() => setFormData({ ...formData, time: slot })} className={`py-2 rounded-lg text-sm font-medium transition-colors ${formData.time === slot ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    {slot}
                  </button>
                ))}
              </div>
            ) : <p className="text-sm text-gray-400">Pilih tanggal terlebih dahulu.</p>}
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Nama Lengkap</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Masukkan nama kamu" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Nomor WhatsApp</label>
            <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required placeholder="08xxxxxxxxxx" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <button type="submit" disabled={!formData.time} className="w-full bg-amber-600 text-white py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
            Konfirmasi Booking
          </button>
        </form>
      </div>
    </div>
  );
}
