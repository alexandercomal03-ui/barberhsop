import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { barbershop } from "../data/dummyData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/booking", label: "Booking" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-900">{barbershop.name}</Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className={`text-sm font-medium transition-colors ${location.pathname === link.to ? "text-amber-600" : "text-gray-600 hover:text-gray-900"}`}>
                {link.label}
              </Link>
            ))}
            <Link to="/booking" className="bg-amber-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-amber-700 transition-colors">
              Booking
            </Link>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)} className={`block text-sm font-medium ${location.pathname === link.to ? "text-amber-600" : "text-gray-600"}`}>
                {link.label}
              </Link>
            ))}
            <Link to="/booking" onClick={() => setIsOpen(false)} className="block bg-amber-600 text-white px-5 py-2 rounded-full text-sm font-semibold text-center">
              Booking
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
