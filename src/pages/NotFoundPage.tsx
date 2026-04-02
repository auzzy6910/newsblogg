import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="bg-frolick-yellow text-frolick-dark font-oswald font-bold text-8xl w-32 h-32 flex items-center justify-center rounded-lg mx-auto mb-6">
          404
        </div>
        <h1 className="font-oswald font-bold text-3xl text-frolick-dark mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-600 font-roboto mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to the latest news.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-2.5 border-2 border-frolick-dark text-frolick-dark font-oswald font-semibold rounded hover:bg-frolick-dark hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-frolick-yellow text-frolick-dark font-oswald font-semibold rounded hover:bg-frolick-amber transition-colors"
          >
            <Home className="w-4 h-4" />
            Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
