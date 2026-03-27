import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Send, Briefcase, Award, Shield, Eye, FileText, Users, Globe, Heart } from 'lucide-react'

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="bg-frolick-dark py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 text-sm font-roboto text-gray-400 mb-4">
          <Link to="/" className="hover:text-frolick-yellow transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">{title}</span>
        </div>
        <h1 className="font-oswald font-bold text-3xl md:text-4xl text-white">{title}</h1>
        {subtitle && <p className="font-roboto text-gray-400 mt-2 max-w-2xl">{subtitle}</p>}
      </div>
    </div>
  )
}

// ─── ABOUT US ───────────────────────────────────────────────────────────────────

export function AboutPage() {
  return (
    <>
      <PageHeader title="About Us" subtitle="The story behind FROLICK News Network" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-frolick-yellow text-frolick-dark font-oswald font-bold text-5xl px-4 py-2">F</div>
            <div>
              <h2 className="font-oswald font-bold text-2xl text-frolick-dark">FROLICK NEWS NETWORK</h2>
              <p className="text-frolick-yellow-dark font-roboto text-sm tracking-widest">FAIR · FEARLESS · FIRST</p>
            </div>
          </div>

          <div className="space-y-6 font-roboto text-gray-700 leading-relaxed">
            <p>
              Founded in 2020, FROLICK News Network has rapidly grown into one of the most trusted names in digital journalism. Our mission is simple: deliver accurate, unbiased, and timely news to audiences around the world, free from political influence and corporate pressure.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Globe className="w-8 h-8 text-frolick-yellow-dark mx-auto mb-3" />
                <h3 className="font-oswald font-bold text-2xl text-frolick-dark">50+</h3>
                <p className="text-sm text-gray-500 mt-1">Countries with correspondents</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Users className="w-8 h-8 text-frolick-yellow-dark mx-auto mb-3" />
                <h3 className="font-oswald font-bold text-2xl text-frolick-dark">2,500+</h3>
                <p className="text-sm text-gray-500 mt-1">Journalists and staff</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Award className="w-8 h-8 text-frolick-yellow-dark mx-auto mb-3" />
                <h3 className="font-oswald font-bold text-2xl text-frolick-dark">47</h3>
                <p className="text-sm text-gray-500 mt-1">Journalism awards</p>
              </div>
            </div>

            <h3 className="font-oswald font-bold text-xl text-frolick-dark mt-8">Our Values</h3>
            <p>
              At FROLICK, we believe that a well-informed public is the cornerstone of democracy. Our editorial team is committed to rigorous fact-checking, diverse perspectives, and accountability journalism that holds power to account.
            </p>
            <p>
              We invest heavily in investigative reporting, data journalism, and on-the-ground coverage because we believe the stories that matter most are often the hardest to tell. Our award-winning team of correspondents spans over 50 countries, ensuring comprehensive coverage of global events.
            </p>

            <h3 className="font-oswald font-bold text-xl text-frolick-dark mt-8">Our Commitment</h3>
            <p>
              FROLICK is committed to editorial independence. Our newsroom operates with complete separation from our business operations, ensuring that commercial interests never influence our reporting. We maintain the highest ethical standards and are transparent about our methods, sources, and corrections.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── CAREERS ────────────────────────────────────────────────────────────────────

export function CareersPage() {
  const openings = [
    { title: "Senior Investigative Reporter", department: "News", location: "Washington, D.C.", type: "Full-time" },
    { title: "Data Visualization Engineer", department: "Technology", location: "New York, NY", type: "Full-time" },
    { title: "Video Producer", department: "Digital Media", location: "Los Angeles, CA", type: "Full-time" },
    { title: "Foreign Correspondent - Middle East", department: "International", location: "Beirut, Lebanon", type: "Full-time" },
    { title: "Social Media Manager", department: "Marketing", location: "Remote", type: "Full-time" },
    { title: "Podcast Host/Producer", department: "Audio", location: "New York, NY", type: "Full-time" },
    { title: "Copy Editor", department: "Editorial", location: "Remote", type: "Contract" },
    { title: "AI/ML Engineer - News Personalization", department: "Technology", location: "San Francisco, CA", type: "Full-time" },
  ]

  return (
    <>
      <PageHeader title="Careers" subtitle="Join the team that's redefining journalism for the digital age" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-frolick-yellow/10 border border-frolick-yellow rounded-lg p-6">
            <Briefcase className="w-8 h-8 text-frolick-yellow-dark mb-3" />
            <h2 className="font-oswald font-bold text-xl text-frolick-dark">Why Work at FROLICK?</h2>
            <p className="font-roboto text-gray-700 mt-2 leading-relaxed">
              We offer competitive salaries, comprehensive benefits, flexible work arrangements, and the opportunity to work on stories that make a real difference in the world. Our culture values curiosity, integrity, and collaboration.
            </p>
          </div>
        </div>

        <h2 className="font-oswald font-bold text-2xl text-frolick-dark mb-6 flex items-center gap-3">
          <div className="w-1.5 h-8 bg-frolick-yellow rounded-full" />
          OPEN POSITIONS ({openings.length})
        </h2>

        <div className="space-y-4">
          {openings.map((job, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h3 className="font-oswald font-semibold text-lg text-frolick-dark group-hover:text-frolick-yellow-dark transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500 font-roboto">
                    <span>{job.department}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                    <span className="bg-frolick-yellow/20 text-frolick-yellow-dark px-2 py-0.5 rounded text-xs font-medium">{job.type}</span>
                  </div>
                </div>
                <button className="bg-frolick-dark text-frolick-yellow font-oswald font-bold px-6 py-2 rounded hover:bg-frolick-charcoal transition-colors text-sm whitespace-nowrap">
                  APPLY NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── ADVERTISE ──────────────────────────────────────────────────────────────────

export function AdvertisePage() {
  return (
    <>
      <PageHeader title="Advertise With Us" subtitle="Reach millions of engaged readers with FROLICK's advertising solutions" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="font-oswald font-bold text-2xl text-frolick-dark">45M+</h3>
              <p className="text-sm text-gray-500 mt-1">Monthly unique visitors</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="font-oswald font-bold text-2xl text-frolick-dark">12M+</h3>
              <p className="text-sm text-gray-500 mt-1">Newsletter subscribers</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="font-oswald font-bold text-2xl text-frolick-dark">8.5 min</h3>
              <p className="text-sm text-gray-500 mt-1">Average time on site</p>
            </div>
          </div>

          <div className="space-y-6 font-roboto text-gray-700 leading-relaxed">
            <h3 className="font-oswald font-bold text-xl text-frolick-dark">Advertising Solutions</h3>
            <p>
              FROLICK offers a range of advertising solutions designed to connect brands with our highly engaged, affluent, and educated audience. From display advertising and sponsored content to video pre-roll and podcast sponsorships, we provide the reach and targeting capabilities that deliver results.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {[
                { title: "Display Advertising", desc: "Premium placements across our website and mobile app" },
                { title: "Sponsored Content", desc: "Native articles created by our branded content studio" },
                { title: "Video Advertising", desc: "Pre-roll, mid-roll, and branded video segments" },
                { title: "Podcast Sponsorship", desc: "Host-read ads and segment sponsorships" },
                { title: "Newsletter Ads", desc: "Reach 12M+ subscribers in their inbox" },
                { title: "Event Sponsorship", desc: "Brand presence at FROLICK live events and summits" },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="font-oswald font-semibold text-frolick-dark">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-frolick-dark text-white rounded-lg p-6 text-center">
              <h3 className="font-oswald font-bold text-xl text-frolick-yellow">READY TO GET STARTED?</h3>
              <p className="text-gray-300 mt-2 text-sm">Contact our advertising team for a customized media kit and rate card.</p>
              <button className="mt-4 bg-frolick-yellow text-frolick-dark font-oswald font-bold px-8 py-3 rounded hover:bg-frolick-amber transition-colors">
                REQUEST MEDIA KIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── CONTACT ────────────────────────────────────────────────────────────────────

export function ContactPage() {
  return (
    <>
      <PageHeader title="Contact Us" subtitle="Get in touch with FROLICK News Network" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-oswald font-bold text-2xl text-frolick-dark mb-6">SEND US A MESSAGE</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-roboto font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg font-roboto text-sm focus:border-frolick-yellow outline-none" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-roboto font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg font-roboto text-sm focus:border-frolick-yellow outline-none" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-roboto font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-lg font-roboto text-sm focus:border-frolick-yellow outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-roboto font-medium text-gray-700 mb-1">Subject</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg font-roboto text-sm focus:border-frolick-yellow outline-none bg-white">
                  <option>General Inquiry</option>
                  <option>News Tip</option>
                  <option>Technical Support</option>
                  <option>Advertising</option>
                  <option>Careers</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-roboto font-medium text-gray-700 mb-1">Message</label>
                <textarea className="w-full px-4 py-3 border border-gray-200 rounded-lg font-roboto text-sm focus:border-frolick-yellow outline-none resize-none h-32" placeholder="Your message..." />
              </div>
              <button type="button" className="bg-frolick-yellow text-frolick-dark font-oswald font-bold px-8 py-3 rounded-lg hover:bg-frolick-amber transition-colors flex items-center gap-2">
                <Send className="w-4 h-4" />
                SEND MESSAGE
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <h2 className="font-oswald font-bold text-2xl text-frolick-dark mb-6">GET IN TOUCH</h2>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-frolick-yellow-dark mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-oswald font-semibold text-frolick-dark">Headquarters</h4>
                  <p className="font-roboto text-sm text-gray-600">30 Rockefeller Plaza, New York, NY 10112</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-frolick-yellow-dark mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-oswald font-semibold text-frolick-dark">Phone</h4>
                  <p className="font-roboto text-sm text-gray-600">+1 (212) 555-0100</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-frolick-yellow-dark mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-oswald font-semibold text-frolick-dark">Email</h4>
                  <p className="font-roboto text-sm text-gray-600">contact@frolick.news</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-oswald font-semibold text-frolick-dark mb-3">BUREAU OFFICES</h4>
              <div className="grid grid-cols-2 gap-3 text-sm font-roboto text-gray-600">
                <div>
                  <span className="font-medium text-frolick-dark block">Washington, D.C.</span>
                  <span>1600 K Street NW</span>
                </div>
                <div>
                  <span className="font-medium text-frolick-dark block">London</span>
                  <span>1 Canada Square, Canary Wharf</span>
                </div>
                <div>
                  <span className="font-medium text-frolick-dark block">Beijing</span>
                  <span>China World Tower</span>
                </div>
                <div>
                  <span className="font-medium text-frolick-dark block">Dubai</span>
                  <span>Dubai Media City</span>
                </div>
              </div>
            </div>

            <div className="bg-frolick-dark rounded-lg p-6">
              <h4 className="font-oswald font-bold text-frolick-yellow">NEWS TIPS</h4>
              <p className="font-roboto text-gray-300 text-sm mt-2">
                Have a news tip? Our investigative team wants to hear from you. All tips are confidential.
              </p>
              <p className="font-roboto text-frolick-yellow text-sm mt-2 font-medium">tips@frolick.news</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── PRESS ──────────────────────────────────────────────────────────────────────

export function PressPage() {
  const pressReleases = [
    { date: "March 25, 2026", title: "FROLICK News Network Wins Three Peabody Awards for Investigative Reporting" },
    { date: "March 15, 2026", title: "FROLICK Launches Enhanced Mobile App with Personalized News Feed" },
    { date: "March 1, 2026", title: "FROLICK Expands International Bureau Network to 50 Countries" },
    { date: "February 20, 2026", title: "FROLICK News Network Reaches 45 Million Monthly Unique Visitors" },
    { date: "February 10, 2026", title: "FROLICK Announces Partnership with Reuters for Wire Service Coverage" },
    { date: "January 28, 2026", title: "FROLICK Digital Subscriptions Surpass 5 Million Milestone" },
  ]

  return (
    <>
      <PageHeader title="Press" subtitle="News and announcements about FROLICK News Network" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-oswald font-bold text-frolick-dark">MEDIA CONTACT</h3>
            <p className="font-roboto text-sm text-gray-600 mt-2">
              For press inquiries, interview requests, and media information, please contact:
            </p>
            <p className="font-roboto text-sm text-frolick-dark mt-2">
              <strong>Press Office:</strong> press@frolick.news | +1 (212) 555-0150
            </p>
          </div>

          <h2 className="font-oswald font-bold text-2xl text-frolick-dark mb-6 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-frolick-yellow rounded-full" />
            PRESS RELEASES
          </h2>

          <div className="space-y-4">
            {pressReleases.map((release, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all cursor-pointer group">
                <span className="text-xs text-gray-400 font-roboto">{release.date}</span>
                <h3 className="font-oswald font-semibold text-lg text-frolick-dark group-hover:text-frolick-yellow-dark transition-colors mt-1">
                  {release.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// ─── TERMS OF USE ───────────────────────────────────────────────────────────────

export function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Use" subtitle="Last updated: March 1, 2026" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-6 font-roboto text-gray-700 leading-relaxed">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-frolick-yellow-dark" />
            <h2 className="font-oswald font-bold text-xl text-frolick-dark">Agreement to Terms</h2>
          </div>
          <p>
            By accessing or using the FROLICK News Network website, mobile applications, and related services (collectively, the "Services"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our Services.
          </p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">1. Use of Services</h3>
          <p>You may use our Services only for lawful purposes and in accordance with these Terms. You agree not to use our Services in any way that violates any applicable federal, state, local, or international law or regulation. You are responsible for ensuring that your use of the Services complies with all applicable laws and these Terms.</p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">2. Intellectual Property</h3>
          <p>All content on our Services, including text, graphics, logos, images, audio, video, and software, is the property of FROLICK News Network or its content suppliers and is protected by United States and international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.</p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">3. User Accounts</h3>
          <p>When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding your password and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.</p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">4. User Content</h3>
          <p>By submitting content to our Services, including comments, feedback, and suggestions, you grant FROLICK a non-exclusive, worldwide, royalty-free, perpetual license to use, reproduce, modify, and distribute such content. You represent that you have the right to grant this license.</p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">5. Disclaimers</h3>
          <p>Our Services are provided on an "as is" and "as available" basis. FROLICK makes no warranties, expressed or implied, regarding the reliability, accuracy, or availability of the Services. We do not guarantee that the Services will be uninterrupted, secure, or error-free.</p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">6. Limitation of Liability</h3>
          <p>To the maximum extent permitted by law, FROLICK shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of the Services.</p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">7. Changes to Terms</h3>
          <p>We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on our website. Your continued use of the Services after such modifications constitutes your acceptance of the updated Terms.</p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">8. Contact</h3>
          <p>If you have any questions about these Terms, please contact us at legal@frolick.news.</p>
        </div>
      </div>
    </>
  )
}

// ─── PRIVACY POLICY ─────────────────────────────────────────────────────────────

export function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" subtitle="Last updated: March 1, 2026" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-6 font-roboto text-gray-700 leading-relaxed">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-frolick-yellow-dark" />
            <h2 className="font-oswald font-bold text-xl text-frolick-dark">Your Privacy Matters</h2>
          </div>
          <p>
            At FROLICK News Network, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Services.
          </p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">1. Information We Collect</h3>
          <p>We collect information that you provide directly to us, including when you create an account, subscribe to our newsletter, post comments, or contact us. This may include your name, email address, postal address, phone number, and payment information. We also automatically collect certain information when you use our Services, including your IP address, browser type, device information, and browsing behavior.</p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">2. How We Use Your Information</h3>
          <p>We use the information we collect to provide, maintain, and improve our Services; to process transactions and send related information; to send you technical notices, updates, and support messages; to respond to your comments and questions; and to personalize and improve your experience with our content.</p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">3. Information Sharing</h3>
          <p>We do not sell your personal information to third parties. We may share your information with service providers who perform services on our behalf, with business partners for joint marketing initiatives (with your consent), and as required by law or to protect the rights and safety of FROLICK and our users.</p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">4. Data Security</h3>
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">5. Cookies and Tracking</h3>
          <p>We use cookies and similar tracking technologies to collect and track information about your browsing behavior. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of our Services may not function properly without cookies.</p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">6. Your Rights</h3>
          <p>Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal data. You may also have the right to opt out of certain data processing activities. To exercise these rights, please contact us at privacy@frolick.news.</p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">7. Children's Privacy</h3>
          <p>Our Services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete that information.</p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">8. Contact Us</h3>
          <p>If you have questions about this Privacy Policy, please contact our Data Protection Officer at privacy@frolick.news or write to us at 30 Rockefeller Plaza, New York, NY 10112.</p>
        </div>
      </div>
    </>
  )
}

// ─── ACCESSIBILITY ──────────────────────────────────────────────────────────────

export function AccessibilityPage() {
  return (
    <>
      <PageHeader title="Accessibility" subtitle="Our commitment to making news accessible to everyone" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-6 font-roboto text-gray-700 leading-relaxed">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-frolick-yellow-dark" />
            <h2 className="font-oswald font-bold text-xl text-frolick-dark">Accessibility Statement</h2>
          </div>
          <p>
            FROLICK News Network is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards to ensure we provide equal access to all users.
          </p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">Conformance Status</h3>
          <p>
            We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone.
          </p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">Measures We Take</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Include accessibility as part of our mission and development practices</li>
            <li>Provide alt text for all informative images</li>
            <li>Ensure sufficient color contrast ratios throughout our design</li>
            <li>Support keyboard navigation across all interactive elements</li>
            <li>Provide closed captions and transcripts for video and audio content</li>
            <li>Use semantic HTML markup for proper screen reader interpretation</li>
            <li>Conduct regular accessibility audits using automated and manual testing</li>
            <li>Train our editorial and development teams on accessibility best practices</li>
          </ul>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">Assistive Technologies</h3>
          <p>Our website is designed to be compatible with the following assistive technologies: screen readers (JAWS, NVDA, VoiceOver), screen magnifiers, speech recognition software, and keyboard-only navigation.</p>

          <h3 className="font-oswald font-bold text-lg text-frolick-dark mt-6">Feedback</h3>
          <p>
            We welcome your feedback on the accessibility of the FROLICK website. If you encounter accessibility barriers, please contact us:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mt-2">
            <p><strong>Email:</strong> accessibility@frolick.news</p>
            <p><strong>Phone:</strong> +1 (212) 555-0175</p>
            <p className="text-sm text-gray-500 mt-2">We aim to respond to accessibility feedback within 2 business days.</p>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── SUBSCRIBE ───────────────────────────────────────────────────────────────────

export function SubscribePage() {
  return (
    <>
      <PageHeader title="Subscribe" subtitle="Choose the plan that's right for you" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { name: "Basic", price: "Free", features: ["Limited articles per month", "Breaking news alerts", "Daily newsletter", "Mobile app access"] },
            { name: "Premium", price: "$9.99/mo", features: ["Unlimited articles", "Ad-free experience", "Exclusive content", "Podcast access", "Early access to features", "Premium newsletter"], highlight: true },
            { name: "Team", price: "$24.99/mo", features: ["Everything in Premium", "Up to 5 accounts", "Team sharing features", "Priority support", "Custom news feeds", "API access"] },
          ].map((plan, i) => (
            <div key={i} className={`rounded-lg p-6 ${plan.highlight ? 'bg-frolick-dark text-white border-2 border-frolick-yellow shadow-xl scale-105' : 'bg-white border border-gray-200 shadow-sm'}`}>
              {plan.highlight && <span className="bg-frolick-yellow text-frolick-dark text-xs font-oswald font-bold px-3 py-1 rounded-full">MOST POPULAR</span>}
              <h3 className={`font-oswald font-bold text-2xl mt-3 ${plan.highlight ? 'text-frolick-yellow' : 'text-frolick-dark'}`}>{plan.name}</h3>
              <p className={`font-oswald font-bold text-3xl mt-2 ${plan.highlight ? 'text-white' : 'text-frolick-dark'}`}>{plan.price}</p>
              <ul className="space-y-3 mt-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className={`flex items-center gap-2 text-sm font-roboto ${plan.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Heart className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-frolick-yellow' : 'text-frolick-yellow-dark'}`} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full mt-6 font-oswald font-bold py-3 rounded transition-colors ${
                plan.highlight
                  ? 'bg-frolick-yellow text-frolick-dark hover:bg-frolick-amber'
                  : 'bg-frolick-dark text-frolick-yellow hover:bg-frolick-charcoal'
              }`}>
                GET STARTED
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── NEWSLETTER PAGE ────────────────────────────────────────────────────────────

export function NewsletterPage() {
  return (
    <>
      <PageHeader title="Newsletter" subtitle="Stay informed with FROLICK's curated newsletters" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            { name: "The Morning Brief", frequency: "Daily, 6:00 AM ET", desc: "Start your day with the top 10 stories you need to know, curated by our senior editors." },
            { name: "Breaking News Alerts", frequency: "As it happens", desc: "Real-time notifications for major breaking news events worldwide." },
            { name: "The Weekend Read", frequency: "Saturdays", desc: "Long-form journalism, in-depth analysis, and feature stories for your weekend." },
            { name: "Tech & Innovation", frequency: "Tuesdays & Thursdays", desc: "The latest in technology, AI, startups, and digital transformation." },
            { name: "Markets & Money", frequency: "Weekdays, 4:00 PM ET", desc: "Daily market wrap-up with expert analysis of financial trends." },
            { name: "Opinion Digest", frequency: "Wednesdays", desc: "The best opinion pieces and analysis from our columnists and guest contributors." },
          ].map((newsletter, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-oswald font-bold text-lg text-frolick-dark">{newsletter.name}</h3>
                <p className="font-roboto text-sm text-gray-600 mt-1">{newsletter.desc}</p>
                <span className="text-xs text-frolick-yellow-dark font-roboto font-medium mt-1 block">{newsletter.frequency}</span>
              </div>
              <button className="bg-frolick-yellow text-frolick-dark font-oswald font-bold px-6 py-2 rounded hover:bg-frolick-amber transition-colors whitespace-nowrap shrink-0">
                SUBSCRIBE
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── LOGIN PAGE ─────────────────────────────────────────────────────────────────

export function LoginPage() {
  return (
    <>
      <PageHeader title="Sign In" subtitle="Access your FROLICK account" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-2 justify-center mb-6">
              <div className="bg-frolick-yellow text-frolick-dark font-oswald font-bold text-2xl px-2 py-0.5">F</div>
              <span className="font-oswald font-bold text-xl text-frolick-dark">FROLICK</span>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-roboto font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-lg font-roboto text-sm focus:border-frolick-yellow outline-none" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-roboto font-medium text-gray-700 mb-1">Password</label>
                <input type="password" className="w-full px-4 py-3 border border-gray-200 rounded-lg font-roboto text-sm focus:border-frolick-yellow outline-none" placeholder="••••••••" />
              </div>
              <div className="flex items-center justify-between text-sm font-roboto">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-frolick-yellow-dark hover:text-frolick-dark transition-colors">Forgot password?</a>
              </div>
              <button type="button" className="w-full bg-frolick-yellow text-frolick-dark font-oswald font-bold py-3 rounded-lg hover:bg-frolick-amber transition-colors">
                SIGN IN
              </button>
            </form>
            <div className="text-center mt-6 text-sm font-roboto text-gray-600">
              Don&apos;t have an account?{' '}
              <Link to="/subscribe" className="text-frolick-yellow-dark font-medium hover:text-frolick-dark transition-colors">
                Subscribe now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
