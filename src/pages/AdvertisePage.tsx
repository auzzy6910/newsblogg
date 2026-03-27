import { Link } from 'react-router-dom'
import { ArrowLeft, BarChart3, Users, Monitor, Megaphone } from 'lucide-react'

export default function AdvertisePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-frolick-yellow-dark hover:text-frolick-yellow font-oswald font-semibold mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-10 bg-frolick-yellow rounded-full" />
        <h1 className="font-oswald font-bold text-3xl md:text-4xl text-frolick-dark">ADVERTISE WITH US</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 border border-gray-100 mb-10">
        <h2 className="font-oswald font-bold text-2xl text-frolick-dark mb-4">Reach Millions of Engaged Readers</h2>
        <p className="text-gray-600 font-roboto leading-relaxed max-w-3xl mb-8">
          Partner with Frolick News Network to connect with a highly engaged, influential audience. Our multi-platform advertising solutions deliver your message across digital, broadcast, and social media channels.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, stat: '45M+', label: 'Monthly unique visitors' },
            { icon: Monitor, stat: '120M+', label: 'Monthly page views' },
            { icon: BarChart3, stat: '8.5 min', label: 'Avg. time on site' },
            { icon: Megaphone, stat: '3.2M', label: 'Social media followers' },
          ].map((item) => (
            <div key={item.label} className="text-center p-6 bg-frolick-dark rounded-lg">
              <item.icon className="w-8 h-8 text-frolick-yellow mx-auto mb-3" />
              <div className="font-oswald font-bold text-3xl text-white mb-1">{item.stat}</div>
              <p className="text-gray-400 font-roboto text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-frolick-yellow/10 rounded-xl p-8 border border-frolick-yellow/20">
        <h3 className="font-oswald font-bold text-xl text-frolick-dark mb-3">Get in Touch</h3>
        <p className="text-gray-600 font-roboto mb-4">
          Ready to grow your brand with Frolick? Contact our advertising team for rates and custom solutions.
        </p>
        <p className="text-frolick-dark font-roboto font-medium">
          Email: <a href="mailto:advertising@frolick.com" className="text-frolick-yellow-dark hover:underline">advertising@frolick.com</a>
        </p>
        <p className="text-frolick-dark font-roboto font-medium">
          Phone: +1 (800) 555-FROL
        </p>
      </div>
    </div>
  )
}
