import { useState, useEffect } from 'react'
import { RefreshCw, Check, X, Clock, Trash2, CalendarDays } from 'lucide-react'
import { fetchBookings, fetchServices, updateBooking, deleteBooking } from '../../utils/api'

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [updating, setUpdating] = useState(null)

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 10000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      const [bRes, sRes] = await Promise.all([fetchBookings(), fetchServices()])
      setBookings(Array.isArray(bRes) ? bRes : (bRes.value || []))
      setServices(Array.isArray(sRes) ? sRes : (sRes.value || []))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getServiceName = (serviceId) => {
    const numericId = parseInt(serviceId)
    const svc = services.find(s => s.id === numericId || s.id === serviceId || s.id === Number(serviceId))
    return svc ? svc.name : 'Tidak diketahui'
  }

  const getServicePrice = (serviceId) => {
    const numericId = parseInt(serviceId)
    const svc = services.find(s => s.id === numericId || s.id === serviceId || s.id === Number(serviceId))
    return svc ? svc.price : 0
  }

  const formatRupiah = (n) => 'Rp ' + n.toLocaleString('id-ID')

  const handleStatus = async (id, status) => {
    setUpdating(id)
    try {
      await updateBooking(id, { status })
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
    } catch (err) {
      console.error(err)
    } finally {
      setUpdating(null)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus booking ini?')) return
    setUpdating(id)
    try {
      await deleteBooking(id)
      setBookings(prev => prev.filter(b => b.id !== id))
    } catch (err) {
      console.error(err)
    } finally {
      setUpdating(null)
    }
  }

  const filtered = bookings
    .filter(b => {
      if (filter === 'all') return true
      if (filter === 'pending') return !b.status || b.status === 'pending'
      if (filter === 'done') return b.status === 'done'
      if (filter === 'cancelled') return b.status === 'cancelled'
      return true
    })
    .sort((a, b) => b.id - a.id)

  const filterCounts = {
    all: bookings.length,
    pending: bookings.filter(b => !b.status || b.status === 'pending').length,
    done: bookings.filter(b => b.status === 'done').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Booking</h2>
        <button
          onClick={loadData}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {['all', 'pending', 'done', 'cancelled'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f
                ? 'bg-amber-500 text-black'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {f === 'all' ? 'Semua' :
             f === 'pending' ? 'Menunggu' :
             f === 'done' ? 'Selesai' : 'Batal'}
            <span className="ml-1 opacity-70">({filterCounts[f]})</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Tidak ada booking</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(b => (
            <div key={b.id} className="bg-slate-800 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-sm text-slate-400">{b.phone}</p>
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

              <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {b.date} • {b.time}
                </span>
              </div>

              <div className="flex items-center justify-between mb-3 py-2 border-t border-slate-700">
                <span className="text-sm text-slate-400">{getServiceName(b.serviceId)}</span>
                <span className="font-semibold text-amber-400">{formatRupiah(getServicePrice(b.serviceId))}</span>
              </div>

              {(!b.status || b.status === 'pending') && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatus(b.id, 'done')}
                    disabled={updating === b.id}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" /> Selesai
                  </button>
                  <button
                    onClick={() => handleStatus(b.id, 'cancelled')}
                    disabled={updating === b.id}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4" /> Batal
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    disabled={updating === b.id}
                    className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
