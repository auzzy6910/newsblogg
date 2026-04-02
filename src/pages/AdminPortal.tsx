import { useState, useEffect } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import AdminLoginPage from './AdminLoginPage'
import AdminDashboardPage from './AdminDashboardPage'
import NotFoundPage from './NotFoundPage'
import { Loader2 } from 'lucide-react'

export default function AdminPortal() {
  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    return sessionStorage.getItem('frolick_admin_email')
  })

  const adminVerification = useQuery(
    api.adminUsers.verifyAdmin,
    adminEmail ? { email: adminEmail } : "skip"
  )

  useEffect(() => {
    if (adminEmail) {
      sessionStorage.setItem('frolick_admin_email', adminEmail)
    } else {
      sessionStorage.removeItem('frolick_admin_email')
    }
  }, [adminEmail])

  const handleLogin = (email: string) => {
    setAdminEmail(email)
  }

  const handleLogout = () => {
    setAdminEmail(null)
    sessionStorage.removeItem('frolick_admin_email')
  }

  // Not logged in — show login page
  if (!adminEmail) {
    return <AdminLoginPage onLogin={handleLogin} />
  }

  // Verifying admin status
  if (adminVerification === undefined) {
    return (
      <div className="min-h-screen bg-frolick-dark flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-frolick-yellow animate-spin mx-auto mb-3" />
          <p className="text-frolick-gray-light font-roboto text-sm">Verifying access...</p>
        </div>
      </div>
    )
  }

  // Not an admin — redirect to 404
  if (!adminVerification.isAdmin) {
    return <NotFoundPage />
  }

  // Verified admin — show dashboard
  return (
    <AdminDashboardPage
      adminEmail={adminEmail}
      onLogout={handleLogout}
    />
  )
}
