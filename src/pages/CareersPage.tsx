import { Link } from 'react-router-dom'
import { ArrowLeft, Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react'

const openings = [
  { title: 'Senior Political Correspondent', location: 'Washington, D.C.', type: 'Full-time', department: 'News' },
  { title: 'Data Visualization Engineer', location: 'New York, NY', type: 'Full-time', department: 'Engineering' },
  { title: 'Investigative Reporter', location: 'Remote', type: 'Full-time', department: 'Investigations' },
  { title: 'Social Media Manager', location: 'New York, NY', type: 'Full-time', department: 'Digital' },
  { title: 'Video Editor', location: 'New York, NY', type: 'Full-time', department: 'Production' },
  { title: 'Breaking News Producer', location: 'Atlanta, GA', type: 'Full-time', department: 'Production' },
  { title: 'Freelance Science Writer', location: 'Remote', type: 'Freelance', department: 'News' },
  { title: 'UX/UI Designer', location: 'New York, NY', type: 'Full-time', department: 'Engineering' },
]

export default function CareersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-frolick-yellow-dark hover:text-frolick-yellow font-oswald font-semibold mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-10 bg-frolick-yellow rounded-full" />
        <h1 className="font-oswald font-bold text-3xl md:text-4xl text-frolick-dark">CAREERS</h1>
      </div>

      <div className="bg-frolick-dark rounded-xl p-8 md:p-12 mb-10">
        <h2 className="font-oswald font-bold text-2xl md:text-3xl text-white mb-3">Join the Frolick Team</h2>
        <p className="text-gray-300 font-roboto max-w-2xl leading-relaxed">
          We're looking for passionate, curious, and talented individuals who want to shape the future of journalism. At Frolick, you'll work alongside some of the best minds in media.
        </p>
      </div>

      <h3 className="font-oswald font-bold text-xl text-frolick-dark mb-6">Open Positions ({openings.length})</h3>

      <div className="space-y-4">
        {openings.map((job) => (
          <div key={job.title} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="font-oswald font-bold text-lg text-frolick-dark group-hover:text-frolick-yellow-dark transition-colors">{job.title}</h4>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500 font-roboto">
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.department}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                </div>
              </div>
              <button className="flex items-center gap-2 text-frolick-yellow-dark font-oswald font-semibold text-sm hover:text-frolick-yellow transition-colors shrink-0">
                APPLY NOW <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
