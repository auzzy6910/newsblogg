import { Link } from 'react-router-dom'
import { ArrowLeft, FileText, Download, Calendar } from 'lucide-react'

const pressReleases = [
  { date: 'March 15, 2026', title: 'Frolick News Network Launches New Investigative Unit', summary: 'Expanding our commitment to accountability journalism with a dedicated team of 15 reporters.' },
  { date: 'February 28, 2026', title: 'Q4 2025 Viewership Reaches Record Highs', summary: 'Digital and broadcast audiences grew 23% year-over-year across all platforms.' },
  { date: 'January 10, 2026', title: 'Frolick Partners with Global Press Institute', summary: 'New partnership to support independent journalism in developing nations.' },
  { date: 'December 5, 2025', title: 'Annual Journalism Awards Ceremony Announced', summary: 'The 12th annual Frolick Journalism Awards will honor excellence in reporting.' },
  { date: 'November 20, 2025', title: 'New Mobile App Launch', summary: 'Redesigned app features personalized news feeds, offline reading, and live streaming.' },
]

export default function PressPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-frolick-yellow-dark hover:text-frolick-yellow font-oswald font-semibold mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-10 bg-frolick-yellow rounded-full" />
        <h1 className="font-oswald font-bold text-3xl md:text-4xl text-frolick-dark">PRESS</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 mb-8">
        <h2 className="font-oswald font-bold text-xl text-frolick-dark mb-2">Media Inquiries</h2>
        <p className="text-gray-600 font-roboto">
          For press inquiries, interview requests, or media assets, contact us at{' '}
          <a href="mailto:press@frolick.com" className="text-frolick-yellow-dark hover:underline font-medium">press@frolick.com</a>
        </p>
      </div>

      <h3 className="font-oswald font-bold text-xl text-frolick-dark mb-6">Press Releases</h3>

      <div className="space-y-4">
        {pressReleases.map((pr) => (
          <div key={pr.title} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-frolick-yellow/10 rounded-lg flex items-center justify-center shrink-0 mt-1">
                <FileText className="w-5 h-5 text-frolick-yellow" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-roboto mb-1">
                  <Calendar className="w-3 h-3" />
                  {pr.date}
                </div>
                <h4 className="font-oswald font-bold text-lg text-frolick-dark group-hover:text-frolick-yellow-dark transition-colors">{pr.title}</h4>
                <p className="text-gray-500 font-roboto text-sm mt-1">{pr.summary}</p>
              </div>
              <button className="text-gray-400 hover:text-frolick-yellow-dark transition-colors shrink-0" title="Download press release">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
