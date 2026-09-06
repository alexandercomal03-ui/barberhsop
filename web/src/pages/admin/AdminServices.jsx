import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, RefreshCw, X, Clock, DollarSign, ImagePlus, Upload } from 'lucide-react'
import { fetchServices, createService, updateService, deleteService } from '../../utils/api'

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', price: '', duration: '', image: '' })
  const [imagePreview, setImagePreview] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const res = await fetchServices()
      setServices(Array.isArray(res) ? res : (res.value || []))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatRupiah = (n) => 'Rp ' + n.toLocaleString('id-ID')

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran gambar maksimal 5MB')
      return
    }

    setUploading(true)
    try {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target.result
        setForm(prev => ({ ...prev, image: base64 }))
        setImagePreview(base64)
        setUploading(false)
      }
      reader.onerror = () => {
        setUploading(false)
        alert('Gagal membaca file')
      }
      reader.readAsDataURL(file)
    } catch (err) {
      setUploading(false)
      console.error(err)
    }
  }

  const handlePasteUrl = (url) => {
    setForm(prev => ({ ...prev, image: url }))
    setImagePreview(url)
  }

  const removeImage = () => {
    setForm(prev => ({ ...prev, image: '' }))
    setImagePreview('')
  }

  const openCreate = () => {
    setEditing(null)
    setForm({ name: '', description: '', price: '', duration: '', image: '' })
    setImagePreview('')
    setShowForm(true)
  }

  const openEdit = (svc) => {
    setEditing(svc)
    setForm({
      name: svc.name,
      description: svc.description,
      price: svc.price.toString(),
      duration: svc.duration.toString(),
      image: svc.image || '',
    })
    setImagePreview(svc.image || '')
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.duration) return
    setSaving(true)
    try {
      const data = {
        name: form.name,
        description: form.description,
        price: parseInt(form.price),
        duration: parseInt(form.duration),
        image: form.image,
      }
      if (editing) {
        await updateService(editing.id, data)
        setServices(prev => prev.map(s => s.id === editing.id ? { ...s, ...data } : s))
      } else {
        const res = await createService(data)
        const newService = res.id ? res : (res.value || null)
        if (newService) {
          setServices(prev => [...prev, newService])
        } else {
          await loadData()
        }
      }
      setShowForm(false)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus layanan ini?')) return
    try {
      await deleteService(id)
      setServices(prev => prev.filter(s => s.id !== id))
    } catch (err) {
      console.error(err)
    }
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
        <h2 className="text-xl font-bold">Layanan</h2>
        <div className="flex gap-2">
          <button
            onClick={loadData}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={openCreate}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" /> Tambah
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-slate-800 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{editing ? 'Edit Layanan' : 'Tambah Layanan'}</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Nama Layanan</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Contoh: Potong Rambut"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Deskripsi</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  rows={2}
                  placeholder="Deskripsi singkat"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Harga (Rp)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Durasi (menit)</label>
                  <input
                    type="number"
                    value={form.duration}
                    onChange={e => setForm({ ...form, duration: e.target.value })}
                    className="w-full bg-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="30"
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Foto Hasil / Testimoni</label>

                {imagePreview ? (
                  <div className="relative rounded-lg overflow-hidden border border-slate-600">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                      onError={() => {
                        setImagePreview('')
                        setForm(prev => ({ ...prev, image: '' }))
                      }}
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white hover:bg-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {/* File Upload Button */}
                    <label className="flex items-center justify-center gap-2 w-full py-8 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-amber-500/50 hover:bg-slate-700/50 transition-colors">
                      <Upload className="w-5 h-5 text-slate-400" />
                      <span className="text-sm text-slate-400">
                        {uploading ? 'Mengupload...' : 'Klik untuk upload foto'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>

                    {/* Or paste URL */}
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={form.image.startsWith('data:') ? '' : form.image}
                        onChange={e => handlePasteUrl(e.target.value)}
                        className="flex-1 bg-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Atau paste URL gambar"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={saving || uploading}
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold transition-colors disabled:opacity-50"
              >
                {saving ? 'Menyimpan...' : editing ? 'Simpan' : 'Tambah'}
              </button>
            </form>
          </div>
        </div>
      )}

      {services.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <p>Belum ada layanan</p>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map(svc => (
            <div key={svc.id} className="bg-slate-800 rounded-xl overflow-hidden">
              {svc.image && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold">{svc.name}</h3>
                    {svc.description && (
                      <p className="text-sm text-slate-400 mt-0.5">{svc.description}</p>
                    )}
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => openEdit(svc)}
                      className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-amber-400 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(svc.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-amber-400 font-semibold">
                    <DollarSign className="w-3.5 h-3.5" />
                    {formatRupiah(svc.price)}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {svc.duration} menit
                  </span>
                  {svc.image && (
                    <span className="flex items-center gap-1 text-green-400">
                      <ImagePlus className="w-3.5 h-3.5" />
                      Ada foto
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
