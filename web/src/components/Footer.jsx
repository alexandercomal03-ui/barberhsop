import { barbershop } from "../data/dummyData";
import { MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{barbershop.name}</h3>
            <p className="text-sm text-gray-500">{barbershop.description}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3">Jam Buka</h4>
            <p className="text-sm text-gray-500">{barbershop.hours.weekday}</p>
            <p className="text-sm text-gray-500">{barbershop.hours.weekend}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3">Kontak</h4>
            <p className="text-sm text-gray-500 mb-2">{barbershop.address}</p>
            <a href={`https://wa.me/${barbershop.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-semibold">
              <MessageCircle size={16} /> WhatsApp {barbershop.phone}
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">{barbershop.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
