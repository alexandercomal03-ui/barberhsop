import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Services from './pages/Services'
import { LayoutDashboard, CalendarDays, Scissors, LogOut } from 'lucide-react'

const PIN = "1234"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('admin_logged_in') === 'true'
  })
  const [page, setPage] = useState('dashboard')

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  if (!isLoggedIn) {
    return <Login onLogin={() => {
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
      case 'dashboard': return <Dashboard onNavigate={setPage} />
      case 'bookings': return <Bookings />
      case 'services': return <Services />
      default: return <Dashboard onNavigate={setPage} />
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
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

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 flex justify-around py-2 z-50">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg transition-colors ${
              page === item.id
                ? 'text-amber-400'
                : 'text-slate-400 hover:text-white'
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
