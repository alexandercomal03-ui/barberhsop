import { useState, useEffect } from 'react'
import { LayoutDashboard, CalendarDays, Scissors, LogOut, ArrowLeft } from 'lucide-react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import AdminBookings from './AdminBookings'
import AdminServices from './AdminServices'

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('admin_logged_in') === 'true'
  })
  const [page, setPage] = useState('dashboard')

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => {
      localStorage.setItem('admin_logged_in', 'true')
      setIsLoggedIn(true)
    }} />
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in')
    setIsLoggedIn(false)
    setPage('dashboard')
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Booking', icon: CalendarDays },
    { id: 'services', label: 'Layanan', icon: Scissors },
  ]

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <AdminDashboard onNavigate={setPage} />
      case 'bookings': return <AdminBookings />
      case 'services': return <AdminServices />
      default: return <AdminDashboard onNavigate={setPage} />
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <a href="/" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <Scissors className="w-5 h-5 text-amber-400" />
          <h1 className="font-bold text-lg">Admin Barbershop</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </header>

      <main className="flex-1 p-4 pb-20 max-w-2xl mx-auto w-full">
        {renderPage()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 flex justify-around py-2 px-4 z-50">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-lg transition-colors min-w-[70px] ${
              page === item.id
                ? 'text-amber-400'
                : 'text-slate-400 active:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
