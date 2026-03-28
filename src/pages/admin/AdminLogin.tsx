import { useState } from 'react'
import { Lock, AlertTriangle } from 'lucide-react'

interface AdminLoginProps {
  onLogin: () => void
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin'
    if (password === adminPassword) {
      sessionStorage.setItem('admin_authenticated', 'true')
      onLogin()
    } else {
      setError('Invalid password. Please try again.')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-frolick-darker flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-frolick-yellow text-frolick-dark font-oswald font-bold text-3xl px-3 py-1">
              F
            </div>
            <div>
              <h1 className="font-oswald font-bold text-2xl text-white tracking-wide">FROLICK</h1>
              <p className="text-frolick-yellow text-xs font-roboto tracking-widest -mt-1">ADMIN DASHBOARD</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-frolick-dark rounded-xl p-8 shadow-2xl border border-frolick-charcoal">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-frolick-charcoal rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-frolick-yellow" />
            </div>
          </div>

          <h2 className="font-oswald font-bold text-xl text-white text-center mb-2">Admin Access</h2>
          <p className="text-frolick-gray-light text-sm font-roboto text-center mb-6">
            Enter your admin password to continue
          </p>

          {error && (
            <div className="flex items-center gap-2 bg-frolick-red/20 border border-frolick-red/40 text-frolick-red rounded-lg px-4 py-3 mb-4">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span className="text-sm font-roboto">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 bg-frolick-charcoal border border-frolick-gray/30 rounded-lg text-white font-roboto text-sm focus:outline-none focus:border-frolick-yellow transition-colors placeholder:text-frolick-gray-light/50"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-frolick-yellow text-frolick-dark font-oswald font-bold py-3 rounded-lg hover:bg-frolick-amber transition-colors tracking-wide"
            >
              SIGN IN
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
