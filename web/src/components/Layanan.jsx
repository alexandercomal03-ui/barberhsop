import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchServices } from "../utils/api";
import { Scissors } from "lucide-react";

export default function Layanan() {
  const [services, setServices] = useState([]);
  useEffect(() => { fetchServices().then(setServices); }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Grooming yang terasa pas.</h2>
          <p className="text-gray-600 max-w-md mx-auto">Dari potongan klasik sampai warna yang lebih berani.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={service.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-semibold text-gray-400">{String(index + 1).padStart(2, "0")}</span>
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  <Scissors size={18} className="text-amber-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-amber-600">Rp{service.price.toLocaleString("id-ID")}</span>
                <Link to={`/booking?layanan=${encodeURIComponent(service.name)}`} className="text-sm font-semibold text-gray-600 hover:text-amber-600 transition-colors">Book →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
