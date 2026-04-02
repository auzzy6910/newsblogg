import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-frolick-yellow-dark hover:text-frolick-yellow font-oswald font-semibold mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-10 bg-frolick-yellow rounded-full" />
        <h1 className="font-oswald font-bold text-3xl md:text-4xl text-frolick-dark">CONTACT US</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="font-oswald font-bold text-2xl text-frolick-dark mb-2">Message Sent!</h2>
              <p className="text-gray-500 font-roboto">Thank you for reaching out. We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-oswald font-semibold text-frolick-dark mb-2">NAME</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg font-roboto text-sm focus:outline-none focus:border-frolick-yellow focus:ring-1 focus:ring-frolick-yellow"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-oswald font-semibold text-frolick-dark mb-2">EMAIL</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg font-roboto text-sm focus:outline-none focus:border-frolick-yellow focus:ring-1 focus:ring-frolick-yellow"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-oswald font-semibold text-frolick-dark mb-2">SUBJECT</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg font-roboto text-sm focus:outline-none focus:border-frolick-yellow focus:ring-1 focus:ring-frolick-yellow"
                  placeholder="What is this about?"
                />
              </div>
              <div>
                <label className="block text-sm font-oswald font-semibold text-frolick-dark mb-2">MESSAGE</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg font-roboto text-sm focus:outline-none focus:border-frolick-yellow focus:ring-1 focus:ring-frolick-yellow resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="bg-frolick-yellow text-frolick-dark font-oswald font-bold px-8 py-3 rounded-lg hover:bg-frolick-amber transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> SEND MESSAGE
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          {[
            { icon: Mail, title: 'Email', info: 'newsroom@frolick.com', sub: 'tips@frolick.com' },
            { icon: Phone, title: 'Phone', info: '+1 (800) FROLICK', sub: 'Mon-Fri, 9AM-6PM ET' },
            { icon: MapPin, title: 'Address', info: 'Frolick News HQ', sub: 'New York, NY 10001' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-frolick-yellow/10 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-frolick-yellow" />
                </div>
                <h3 className="font-oswald font-bold text-frolick-dark">{item.title}</h3>
              </div>
              <p className="text-gray-700 font-roboto text-sm font-medium">{item.info}</p>
              <p className="text-gray-400 font-roboto text-xs mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
