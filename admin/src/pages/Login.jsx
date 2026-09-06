import { useState } from 'react'
import { Lock, Eye, EyeOff, Scissors } from 'lucide-react'

export default function Login({ onLogin }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [showPin, setShowPin] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pin === '1234') {
      onLogin()
    } else {
      setError('PIN salah!')
      setPin('')
    }
  }

  const handlePinInput = (digit) => {
    if (pin.length < 6) {
      const newPin = pin + digit
      setPin(newPin)
      setError('')
      if (newPin.length === 4) {
        if (newPin === '1234') {
          setTimeout(() => onLogin(), 200)
        } else {
          setTimeout(() => {
            setError('PIN salah!')
            setPin('')
          }, 300)
        }
      }
    }
  }

  const handleDelete = () => {
    setPin(pin.slice(0, -1))
    setError('')
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Scissors className="w-10 h-10 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Barbershop</h1>
          <p className="text-slate-400 mt-1">Masukkan PIN untuk masuk</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-center gap-3 mb-6">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  i < pin.length
                    ? 'bg-amber-400 scale-110'
                    : 'bg-slate-600'
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit => (
              <button
                key={digit}
                onClick={() => handlePinInput(digit.toString())}
                className="h-14 rounded-xl bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-xl font-semibold transition-colors"
              >
                {digit}
              </button>
            ))}
            <button
              onClick={handleDelete}
              className="h-14 rounded-xl bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-sm font-medium transition-colors"
            >
              Hapus
            </button>
            <button
              onClick={() => handlePinInput('0')}
              className="h-14 rounded-xl bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-xl font-semibold transition-colors"
            >
              0
            </button>
            <div />
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs mt-4">
          PIN default: 1234
        </p>
      </div>
    </div>
  )
}
