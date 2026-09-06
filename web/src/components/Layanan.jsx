import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchServices } from "../utils/api";
import { Scissors, ArrowRight } from "lucide-react";

export default function Layanan() {
  const [services, setServices] = useState([]);
  useEffect(() => { fetchServices().then(setServices); }, []);

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-500 text-sm font-semibold tracking-widest uppercase">Layanan Kami</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-4">Grooming yang terasa pas.</h2>
          <p className="text-gray-500 max-w-md mx-auto">Dari potongan klasik sampai warna yang lebih berani.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={service.id} className="group bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300 hover:shadow-[0_0_40px_-15px_rgba(245,158,11,0.15)]">
              <div className="flex items-start justify-between mb-6">
                <span className="text-xs font-bold text-gray-700 tracking-wider">{String(index + 1).padStart(2, "0")}</span>
                <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <Scissors size={18} className="text-amber-500" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{service.name}</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">{service.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xl font-black text-amber-500">Rp{service.price.toLocaleString("id-ID")}</span>
                <Link to={`/booking?layanan=${service.id}`} className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-amber-500 transition-colors group/link">
                  Book <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
