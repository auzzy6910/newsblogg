import { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminLayout from './AdminLayout'

export default function AdminWrapper() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('admin_authenticated') === 'true'
  )

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />
  }

  return <AdminLayout />
}
