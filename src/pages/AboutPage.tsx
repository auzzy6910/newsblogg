import { Link } from 'react-router-dom'
import { ArrowLeft, Users, Award, Globe, Shield } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-frolick-yellow-dark hover:text-frolick-yellow font-oswald font-semibold mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-10 bg-frolick-yellow rounded-full" />
        <h1 className="font-oswald font-bold text-3xl md:text-4xl text-frolick-dark">ABOUT US</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 border border-gray-100">
        <div className="max-w-3xl">
          <p className="text-gray-700 font-roboto text-lg leading-relaxed mb-6">
            Frolick News Network is a leading global news organization committed to delivering fair, fearless, and first-rate journalism. Founded with the mission to inform and empower citizens, we provide comprehensive coverage of the stories that shape our world.
          </p>
          <p className="text-gray-600 font-roboto leading-relaxed mb-8">
            Our team of award-winning journalists, analysts, and correspondents work around the clock to bring you breaking news, investigative reports, and expert commentary from every corner of the globe. We believe in the power of truthful, unbiased reporting to strengthen democracy and foster informed public discourse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[
            { icon: Users, title: 'Our Team', desc: '500+ journalists and correspondents in 40+ countries' },
            { icon: Award, title: 'Awards', desc: 'Multiple Pulitzer and Peabody Award winners on staff' },
            { icon: Globe, title: 'Global Reach', desc: 'Available in 195 countries across all platforms' },
            { icon: Shield, title: 'Trust', desc: 'Rated among the most trusted news sources since 2010' },
          ].map((item) => (
            <div key={item.title} className="p-6 bg-gray-50 rounded-lg text-center">
              <item.icon className="w-8 h-8 text-frolick-yellow mx-auto mb-3" />
              <h3 className="font-oswald font-bold text-frolick-dark mb-2">{item.title}</h3>
              <p className="text-gray-500 font-roboto text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
