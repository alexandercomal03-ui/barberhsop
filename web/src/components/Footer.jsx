import { barbershop } from "../data/dummyData";
import { MessageCircle, MapPin, Clock, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-sm text-gray-500 leading-relaxed">{barbershop.description}</p>
          </div>
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-4">
              <Clock size={14} className="text-amber-500" /> Jam Operasional
            </h4>
            <p className="text-sm text-gray-500">{barbershop.hours.weekday}</p>
            <p className="text-sm text-gray-500">{barbershop.hours.weekend}</p>
            <p className="text-xs text-gray-600 mt-2">*Jam bisa berubah, konfirmasi via WhatsApp</p>
          </div>
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-4">
              <MapPin size={14} className="text-amber-500" /> Area Layanan
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {barbershop.areas.map((area) => (
                <span key={area} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs text-gray-400">
                  {area}
                </span>
              ))}
            </div>
            <a href={`https://wa.me/${barbershop.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-amber-500 hover:text-amber-400 font-semibold transition-colors">
              <MessageCircle size={16} /> WhatsApp {barbershop.phone}
            </a>
            <a href="https://www.instagram.com/seenbarbershop?stkn=ZWJrdHVycmxmamE2&utm_source=qr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-pink-500 font-semibold transition-colors mt-3">
              <Instagram size={16} /> @seenbarbershop
            </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">{barbershop.copyright}</p>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>Tukang Cukur Panggilan #1 di Solo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
