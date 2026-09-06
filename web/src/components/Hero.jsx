import { Link } from "react-router-dom";
import { barbershop } from "../data/dummyData";
import { MessageCircle, ArrowRight, MapPin, Clock, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-16">
      <div className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1400&q=80"
            alt="Barber at work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-semibold">{barbershop.tagline}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-6 tracking-tight">
              Barber datang<br />
              <span className="text-amber-500">ke rumah Anda.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
              Tanpa antre, tanpa ribet. Pilih layanan, kirim alamat, kami yang datang.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/booking" className="group bg-amber-500 text-black px-8 py-4 rounded-full text-sm font-bold hover:bg-amber-400 transition-all flex items-center justify-center gap-2">
                Pesan Sekarang
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`https://wa.me/${barbershop.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors">
                <MessageCircle size={18} /> Chat WhatsApp
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-amber-500" /> Area: {barbershop.areas.join(", ")}</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full hidden sm:block" />
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-amber-500" /> {barbershop.hours.weekday}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      </div>
    </section>
  );
}
