import { Link } from "react-router-dom";
import { barbershop } from "../data/dummyData";
import { MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-16">
      <div className="relative h-[80vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img src="https://picsum.photos/seed/barbershop/1200/800" alt="Barber" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <span className="inline-block px-3 py-1 bg-amber-600/90 rounded-full text-xs font-semibold mb-4">● {barbershop.name} Barbershop</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 max-w-2xl">Potong rambut, tanpa antre lama.</h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-xl">Pesan jadwal dari HP, pilih jamnya. Kursi sudah siap saat kamu datang.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/booking" className="bg-amber-600 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-amber-700 transition-colors text-center">
              Booking sekarang
            </Link>
            <a href={`https://wa.me/${barbershop.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors">
              <MessageCircle size={18} /> Chat WhatsApp
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-300">{barbershop.address} · {barbershop.phone}</p>
        </div>
      </div>
    </section>
  );
}
