import { useState, useEffect } from 'react'
import { CalendarDays, Scissors, TrendingUp, Clock, ChevronRight } from 'lucide-react'
import { fetchBookings, fetchServices } from '../utils/api'

export default function Dashboard({ onNavigate }) {
  const [bookings, setBookings] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [bRes, sRes] = await Promise.all([fetchBookings(), fetchServices()])
      setBookings(bRes.value || [])
      setServices(sRes.value || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]
  const todayBookings = bookings.filter(b => b.date === today)
  const pendingBookings = bookings.filter(b => b.status === 'pending' || !b.status)
  const totalRevenue = bookings
    .filter(b => b.status === 'done')
    .reduce((sum, b) => {
      const svc = services.find(s => s.id === b.serviceId)
      return sum + (svc ? svc.price : 0)
    }, 0)

  const formatRupiah = (n) => 'Rp ' + n.toLocaleString('id-ID')

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <CalendarDays className="w-4 h-4" />
            Booking Hari Ini
          </div>
          <p className="text-3xl font-bold text-amber-400">{todayBookings.length}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <Clock className="w-4 h-4" />
            Menunggu
          </div>
          <p className="text-3xl font-bold text-orange-400">{pendingBookings.length}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <TrendingUp className="w-4 h-4" />
            Total Selesai
          </div>
          <p className="text-3xl font-bold text-green-400">
            {bookings.filter(b => b.status === 'done').length}
          </p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <Scissors className="w-4 h-4" />
            Layanan
          </div>
          <p className="text-3xl font-bold text-blue-400">{services.length}</p>
        </div>
      </div>

      {totalRevenue > 0 && (
        <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-xl p-4">
          <p className="text-sm text-amber-300/80">Pendapatan (selesai)</p>
          <p className="text-2xl font-bold text-amber-400">{formatRupiah(totalRevenue)}</p>
        </div>
      )}

      <div className="bg-slate-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Booking Terbaru</h3>
          <button
            onClick={() => onNavigate('bookings')}
            className="text-amber-400 text-sm flex items-center gap-1 hover:text-amber-300"
          >
            Lihat semua <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        {bookings.length === 0 ? (
          <p className="text-slate-500 text-sm">Belum ada booking</p>
        ) : (
          <div className="space-y-2">
            {bookings.slice(0, 5).map(b => (
              <div key={b.id} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                <div>
                  <p className="font-medium text-sm">{b.name}</p>
                  <p className="text-xs text-slate-400">{b.date} • {b.time}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  b.status === 'done' ? 'bg-green-500/20 text-green-400' :
                  b.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                  'bg-amber-500/20 text-amber-400'
                }`}>
                  {b.status === 'done' ? 'Selesai' :
                   b.status === 'cancelled' ? 'Dibatalkan' : 'Menunggu'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
