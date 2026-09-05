import { Link } from "react-router-dom";
import { testimonials } from "../data/dummyData";

export default function CTA() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Siap tampil lebih rapi?</h2>
          <p className="text-gray-400 mb-8">Amankan jadwalmu hari ini.</p>
          <Link to="/booking" className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-amber-700 transition-colors">Booking sekarang</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-gray-800 rounded-2xl p-6">
              <p className="text-gray-300 mb-4 italic">"{t.message}"</p>
              <p className="text-sm text-amber-400 font-semibold">— {t.name}, langganan {t.since}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
