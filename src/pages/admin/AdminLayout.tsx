import { useState } from 'react'
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { label: 'All Posts', to: '/admin/posts', icon: FileText },
  { label: 'New Post', to: '/admin/posts/new', icon: PlusCircle },
]

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated')
    navigate('/admin')
    window.location.reload()
  }

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-frolick-dark transform transition-transform duration-200 lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-5 border-b border-frolick-charcoal">
            <div className="flex items-center justify-between">
              <Link to="/admin" className="flex items-center gap-2">
                <div className="bg-frolick-yellow text-frolick-dark font-oswald font-bold text-xl px-2 py-0.5">
                  F
                </div>
                <div>
                  <span className="font-oswald font-bold text-lg text-white">FROLICK</span>
                  <span className="block text-frolick-yellow text-[10px] font-roboto tracking-widest -mt-1">
                    ADMIN
                  </span>
                </div>
              </Link>
              <button
                className="lg:hidden text-frolick-gray-light hover:text-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.to)
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-roboto font-medium transition-colors ${
                    active
                      ? 'bg-frolick-yellow text-frolick-dark'
                      : 'text-frolick-gray-light hover:bg-frolick-charcoal hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                  {active && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="px-3 py-4 border-t border-frolick-charcoal">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-roboto text-frolick-gray-light hover:bg-frolick-charcoal hover:text-white transition-colors mb-1"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-roboto text-frolick-red hover:bg-frolick-red/10 transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between lg:px-8 sticky top-0 z-30">
          <button
            className="lg:hidden text-frolick-dark p-1"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="font-oswald font-semibold text-frolick-dark text-lg">
            {navItems.find((i) => isActive(i.to))?.label ?? 'Admin'}
          </div>
          <div className="text-xs font-roboto text-gray-400">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
