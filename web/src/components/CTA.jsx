import { Link } from "react-router-dom";
import { testimonials } from "../data/dummyData";
import { Star, MapPin } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-[#111] relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1400&q=80"
          alt="Barbershop Atmosphere"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-[#111]/90" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Siap potong rambut?</h2>
          <p className="text-gray-400 mb-8">Pesan sekarang, kami datang ke rumah Anda.</p>
          <Link to="/booking" className="inline-block bg-amber-500 text-black px-8 py-4 rounded-full text-sm font-bold hover:bg-amber-400 transition-colors">
            Pesan Sekarang
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-amber-500/20 transition-colors">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={14} className="fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic leading-relaxed">"{t.message}"</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-amber-400 font-semibold">— {t.name}</p>
                <span className="flex items-center gap-1 text-xs text-gray-600">
                  <MapPin size={10} /> {t.area}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
