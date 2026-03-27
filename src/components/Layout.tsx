import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Search, Menu, X, Play, Clock, Flame,
  Facebook, Twitter, Instagram, Youtube,
  ChevronRight, Zap, ArrowRight,
} from 'lucide-react'
import { breakingNews, navCategories } from '../data/newsData'

// ─── BREAKING TICKER ────────────────────────────────────────────────────────────

function BreakingTicker() {
  return (
    <div className="bg-frolick-red text-white overflow-hidden">
      <div className="flex items-center">
        <div className="bg-frolick-red-dark px-4 py-2 font-oswald font-bold text-sm tracking-wider flex items-center gap-2 shrink-0 z-10">
          <Flame className="w-4 h-4 animate-pulse" />
          BREAKING
        </div>
        <div className="overflow-hidden whitespace-nowrap py-2">
          <div className="inline-block animate-marquee">
            {breakingNews.map((news, i) => (
              <span key={i} className="mx-8 text-sm font-roboto">
                {news}
                {i < breakingNews.length - 1 && <span className="mx-8 text-frolick-yellow">●</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── TOP BAR ────────────────────────────────────────────────────────────────────

function TopBar() {
  return (
    <div className="bg-frolick-darker text-frolick-gray-light text-xs font-roboto border-b border-frolick-charcoal">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-1.5">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <Link to="/" className="hidden sm:inline text-frolick-yellow font-medium hover:text-white transition-colors">LIVE UPDATES</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/subscribe" className="hover:text-frolick-yellow transition-colors">Subscribe</Link>
          <Link to="/newsletter" className="hover:text-frolick-yellow transition-colors">Newsletter</Link>
          <Link to="/login" className="hover:text-frolick-yellow transition-colors">Login</Link>
        </div>
      </div>
    </div>
  )
}

// ─── HEADER ─────────────────────────────────────────────────────────────────────

const categoryRoutes: Record<string, string> = {
  "Home": "/",
  "U.S.": "/category/us",
  "World": "/category/world",
  "Politics": "/category/politics",
  "Business": "/category/business",
  "Tech": "/category/tech",
  "Science": "/category/science",
  "Health": "/category/health",
  "Sports": "/category/sports",
  "Entertainment": "/category/entertainment",
  "Opinion": "/opinion",
  "Video": "/video",
}

function Header({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean, setMobileMenuOpen: (v: boolean) => void }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="bg-frolick-dark sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <button
            className="lg:hidden text-white p-2 hover:bg-frolick-charcoal rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="bg-frolick-yellow text-frolick-dark font-oswald font-bold text-3xl px-3 py-1 tracking-tight">
              F
            </div>
            <div>
              <h1 className="font-oswald font-bold text-2xl md:text-3xl text-white tracking-wide">
                FROLICK
              </h1>
              <p className="text-frolick-yellow text-xs font-roboto tracking-widest -mt-1 hidden sm:block">
                FAIR · FEARLESS · FIRST
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {searchOpen ? (
              <div className="flex items-center bg-frolick-charcoal rounded-full px-3 py-1.5">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="bg-transparent text-white text-sm outline-none w-32 md:w-48 font-roboto"
                  autoFocus
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X className="w-4 h-4 text-frolick-gray-light" />
                </button>
              </div>
            ) : (
              <button
                className="text-white p-2 hover:bg-frolick-charcoal rounded-full transition-colors"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            <Link to="/video" className="hidden md:flex items-center gap-2 bg-frolick-yellow text-frolick-dark font-oswald font-semibold px-4 py-2 rounded hover:bg-frolick-amber transition-colors text-sm">
              <Play className="w-4 h-4" />
              WATCH LIVE
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-frolick-charcoal border-t border-frolick-gray/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden lg:flex items-center gap-0">
            {navCategories.map((cat) => {
              const path = categoryRoutes[cat] || '/'
              return (
                <Link
                  key={cat}
                  to={path}
                  className={`px-4 py-2.5 text-sm font-oswald font-medium tracking-wide transition-colors ${
                    isActive(path)
                      ? 'text-frolick-yellow border-b-2 border-frolick-yellow'
                      : 'text-white hover:text-frolick-yellow hover:bg-frolick-dark/50'
                  }`}
                >
                  {cat}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-frolick-dark border-t border-frolick-charcoal">
          {navCategories.map((cat) => {
            const path = categoryRoutes[cat] || '/'
            return (
              <Link
                key={cat}
                to={path}
                className="block px-6 py-3 text-white font-oswald text-lg hover:bg-frolick-charcoal hover:text-frolick-yellow transition-colors border-b border-frolick-charcoal/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat}
              </Link>
            )
          })}
          <div className="p-4">
            <Link
              to="/video"
              className="w-full flex items-center justify-center gap-2 bg-frolick-yellow text-frolick-dark font-oswald font-semibold px-4 py-3 rounded hover:bg-frolick-amber transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Play className="w-5 h-5" />
              WATCH LIVE
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────────

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-frolick-darker text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4" onClick={scrollToTop}>
              <div className="bg-frolick-yellow text-frolick-dark font-oswald font-bold text-2xl px-2 py-0.5">F</div>
              <span className="font-oswald font-bold text-xl text-white">FROLICK</span>
            </Link>
            <p className="font-roboto text-sm leading-relaxed">
              Your trusted source for breaking news, in-depth analysis, and expert commentary on the stories that matter most.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-frolick-charcoal hover:bg-frolick-yellow hover:text-frolick-dark rounded-full flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-frolick-charcoal hover:bg-frolick-yellow hover:text-frolick-dark rounded-full flex items-center justify-center transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-frolick-charcoal hover:bg-frolick-yellow hover:text-frolick-dark rounded-full flex items-center justify-center transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-frolick-charcoal hover:bg-frolick-yellow hover:text-frolick-dark rounded-full flex items-center justify-center transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-oswald font-bold text-white text-sm tracking-wider mb-4">NEWS</h4>
            <ul className="space-y-2 text-sm font-roboto">
              {[
                { label: "U.S. News", path: "/category/us" },
                { label: "World", path: "/category/world" },
                { label: "Politics", path: "/category/politics" },
                { label: "Business", path: "/category/business" },
                { label: "Technology", path: "/category/tech" },
                { label: "Science", path: "/category/science" },
                { label: "Health", path: "/category/health" },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:text-frolick-yellow transition-colors flex items-center gap-1 group" onClick={scrollToTop}>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-oswald font-bold text-white text-sm tracking-wider mb-4">SHOWS</h4>
            <ul className="space-y-2 text-sm font-roboto">
              {[
                { label: "Morning Report", path: "/shows/morning-report" },
                { label: "Midday Briefing", path: "/shows/midday-briefing" },
                { label: "Evening Roundup", path: "/shows/evening-roundup" },
                { label: "Weekend Review", path: "/shows/weekend-review" },
                { label: "Special Investigations", path: "/shows/special-investigations" },
                { label: "Frolick Debates", path: "/shows/frolick-debates" },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:text-frolick-yellow transition-colors flex items-center gap-1 group" onClick={scrollToTop}>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-oswald font-bold text-white text-sm tracking-wider mb-4">COMPANY</h4>
            <ul className="space-y-2 text-sm font-roboto">
              {[
                { label: "About Us", path: "/about" },
                { label: "Careers", path: "/careers" },
                { label: "Advertise With Us", path: "/advertise" },
                { label: "Contact", path: "/contact" },
                { label: "Press", path: "/press" },
                { label: "Terms of Use", path: "/terms" },
                { label: "Privacy Policy", path: "/privacy" },
                { label: "Accessibility", path: "/accessibility" },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:text-frolick-yellow transition-colors flex items-center gap-1 group" onClick={scrollToTop}>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-frolick-charcoal mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs font-roboto">
          <span>&copy; {new Date().getFullYear()} FROLICK News Network. All Rights Reserved.</span>
          <span className="mt-2 md:mt-0">
            This material may not be published, broadcast, rewritten, or redistributed.
          </span>
        </div>
      </div>

      {/* Back to top */}
      <div className="bg-frolick-dark py-3 text-center">
        <button
          onClick={scrollToTop}
          className="text-frolick-yellow font-oswald text-sm flex items-center gap-1 mx-auto hover:text-white transition-colors"
        >
          <ArrowRight className="w-4 h-4 -rotate-90" />
          BACK TO TOP
        </button>
      </div>

      {/* Bottom links bar */}
      <div className="bg-frolick-darker border-t border-frolick-charcoal py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-4 text-xs font-roboto text-gray-500">
          <Link to="/terms" className="hover:text-frolick-yellow transition-colors" onClick={scrollToTop}>Terms of Use</Link>
          <span>|</span>
          <Link to="/privacy" className="hover:text-frolick-yellow transition-colors" onClick={scrollToTop}>Privacy Policy</Link>
          <span>|</span>
          <Link to="/accessibility" className="hover:text-frolick-yellow transition-colors" onClick={scrollToTop}>Accessibility</Link>
          <span>|</span>
          <Link to="/advertise" className="hover:text-frolick-yellow transition-colors" onClick={scrollToTop}>Ad Choices</Link>
          <span>|</span>
          <Link to="/contact" className="hover:text-frolick-yellow transition-colors" onClick={scrollToTop}>Contact Us</Link>
        </div>
      </div>
    </footer>
  )
}

// ─── NEWSLETTER SECTION ─────────────────────────────────────────────────────────

function NewsletterBanner() {
  return (
    <section className="bg-frolick-yellow py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Zap className="w-10 h-10 text-frolick-dark mx-auto mb-3" />
          <h2 className="font-oswald font-bold text-3xl text-frolick-dark">GET THE FROLICK NEWSLETTER</h2>
          <p className="font-roboto text-frolick-gray mt-2">
            Stay informed with breaking news, exclusive analysis, and expert opinions delivered straight to your inbox every morning.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg font-roboto text-sm border-2 border-frolick-dark/20 focus:border-frolick-dark outline-none"
            />
            <button className="bg-frolick-dark text-frolick-yellow font-oswald font-bold px-6 py-3 rounded-lg hover:bg-frolick-darker transition-colors tracking-wide">
              SUBSCRIBE
            </button>
          </div>
          <p className="text-xs text-frolick-gray mt-3 font-roboto">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── LAYOUT ─────────────────────────────────────────────────────────────────────

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
      <TopBar />
      <BreakingTicker />
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main>{children}</main>
      <NewsletterBanner />
      <Footer />
    </div>
  )
}
