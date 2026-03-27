import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ArticlePage from './pages/ArticlePage'
import { OpinionListPage, OpinionDetailPage } from './pages/OpinionPage'
import VideoPage from './pages/VideoPage'
import { ShowsListPage, ShowDetailPage } from './pages/ShowsPage'
import {
  AboutPage, CareersPage, AdvertisePage, ContactPage,
  PressPage, TermsPage, PrivacyPage, AccessibilityPage,
  SubscribePage, NewsletterPage, LoginPage,
} from './pages/CompanyPages'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Category Pages */}
          <Route path="/category/:slug" element={<CategoryPage />} />

          {/* Article Detail */}
          <Route path="/article/:id" element={<ArticlePage />} />

          {/* Opinion */}
          <Route path="/opinion" element={<OpinionListPage />} />
          <Route path="/opinion/:id" element={<OpinionDetailPage />} />

          {/* Video */}
          <Route path="/video" element={<VideoPage />} />

          {/* Shows */}
          <Route path="/shows" element={<ShowsListPage />} />
          <Route path="/shows/:slug" element={<ShowDetailPage />} />

          {/* Company Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/advertise" element={<AdvertisePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />

          {/* Account */}
          <Route path="/subscribe" element={<SubscribePage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* 404 */}
          <Route path="*" element={
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
              <h1 className="font-oswald font-bold text-6xl text-frolick-yellow-dark">404</h1>
              <p className="font-oswald text-2xl text-gray-400 mt-4">Page Not Found</p>
              <a href="/" className="text-frolick-yellow-dark font-oswald mt-6 inline-block hover:text-frolick-dark transition-colors">
                Back to Home
              </a>
            </div>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
