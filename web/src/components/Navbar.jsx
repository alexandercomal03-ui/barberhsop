import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Scissors } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/booking", label: "Booking" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-md z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Scissors className="w-5 h-5 text-amber-500" />
            <span className="text-lg font-bold text-white">SeenBarber</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className={`text-sm font-medium transition-colors ${location.pathname === link.to ? "text-amber-500" : "text-gray-400 hover:text-white"}`}>
                {link.label}
              </Link>
            ))}
            <Link to="/booking" className="bg-amber-500 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-amber-400 transition-colors">
              Booking
            </Link>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-400 hover:text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/5">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)} className={`block text-sm font-medium ${location.pathname === link.to ? "text-amber-500" : "text-gray-400"}`}>
                {link.label}
              </Link>
            ))}
            <Link to="/booking" onClick={() => setIsOpen(false)} className="block bg-amber-500 text-black px-5 py-2 rounded-full text-sm font-bold text-center">
              Booking
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
