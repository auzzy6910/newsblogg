import { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Shield, Loader2, AlertCircle } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

interface AdminLoginPageProps {
  onLogin: (email: string) => void
}

export default function AdminLoginPage({ onLogin }: AdminLoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Only run the login query when submitting
  const [loginAttempt, setLoginAttempt] = useState<{ email: string; password: string } | null>(null)

  const loginResult = useQuery(
    api.adminUsers.login,
    loginAttempt ? { email: loginAttempt.email, password: loginAttempt.password } : "skip"
  )

  // Handle login result
  if (loginResult && isSubmitting) {
    if (loginResult.success) {
      setIsSubmitting(false)
      setLoginAttempt(null)
      onLogin(email)
    } else {
      setError(loginResult.error || 'Login failed')
      setIsSubmitting(false)
      setLoginAttempt(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    setLoginAttempt({ email, password })
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin Access - Frolick News</title>
      </Helmet>
      <div className="min-h-screen bg-frolick-dark flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-frolick-yellow text-frolick-dark w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="font-oswald font-bold text-2xl text-white tracking-wide">
              ADMIN PORTAL
            </h1>
            <p className="text-frolick-gray-light text-sm font-roboto mt-1">
              Authorized personnel only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-frolick-charcoal rounded-lg p-6 shadow-2xl border border-frolick-gray/30">
            {error && (
              <div className="flex items-center gap-2 bg-frolick-red/20 border border-frolick-red/30 rounded px-4 py-3 mb-4">
                <AlertCircle className="w-4 h-4 text-frolick-red shrink-0" />
                <p className="text-frolick-red text-sm font-roboto">{error}</p>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-frolick-gray-light text-sm font-roboto mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-frolick-dark border border-frolick-gray/30 rounded px-4 py-2.5 text-white font-roboto text-sm focus:outline-none focus:border-frolick-yellow transition-colors"
                placeholder="admin@frolick.news"
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-6">
              <label className="block text-frolick-gray-light text-sm font-roboto mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-frolick-dark border border-frolick-gray/30 rounded px-4 py-2.5 text-white font-roboto text-sm focus:outline-none focus:border-frolick-yellow transition-colors"
                placeholder="••••••••"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-frolick-yellow text-frolick-dark font-oswald font-semibold py-2.5 rounded hover:bg-frolick-amber transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-frolick-gray/50 text-xs font-roboto mt-6">
            This is a restricted area. All access attempts are logged.
          </p>
        </div>
      </div>
    </>
  )
}
