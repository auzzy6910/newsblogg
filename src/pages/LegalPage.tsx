import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const legalContent: Record<string, { title: string; sections: { heading: string; text: string }[] }> = {
  'terms-of-use': {
    title: 'Terms of Use',
    sections: [
      { heading: 'Acceptance of Terms', text: 'By accessing and using the Frolick News Network website and services, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.' },
      { heading: 'Use of Content', text: 'All content published on Frolick News Network, including text, images, video, audio, and graphics, is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without express written permission.' },
      { heading: 'User Conduct', text: 'You agree to use our services only for lawful purposes. You may not use our platforms to transmit harmful, threatening, abusive, or otherwise objectionable content. We reserve the right to remove content and suspend accounts that violate these terms.' },
      { heading: 'Comments and User Content', text: 'By submitting comments or other content to our platforms, you grant Frolick News Network a non-exclusive, royalty-free license to use, reproduce, and display such content. You are solely responsible for the content you submit.' },
      { heading: 'Disclaimer of Warranties', text: 'Our services are provided "as is" without warranties of any kind. While we strive for accuracy in our reporting, we do not guarantee that all information is complete, current, or error-free.' },
      { heading: 'Limitation of Liability', text: 'Frolick News Network shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.' },
      { heading: 'Changes to Terms', text: 'We reserve the right to modify these terms at any time. Continued use of our services following changes constitutes acceptance of the modified terms.' },
    ],
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    sections: [
      { heading: 'Information We Collect', text: 'We collect information you provide directly, such as when you subscribe to our newsletter, create an account, or contact us. We also automatically collect certain information about your device and usage patterns through cookies and similar technologies.' },
      { heading: 'How We Use Your Information', text: 'We use your information to provide and improve our services, personalize your experience, send newsletters and updates you have opted into, analyze usage patterns, and comply with legal obligations.' },
      { heading: 'Information Sharing', text: 'We do not sell your personal information. We may share information with service providers who help us operate our platform, when required by law, or with your consent.' },
      { heading: 'Cookies and Tracking', text: 'We use cookies and similar technologies to enhance your experience, analyze traffic, and serve relevant content. You can manage cookie preferences through your browser settings.' },
      { heading: 'Data Security', text: 'We implement industry-standard security measures to protect your information. However, no method of transmission over the Internet is 100% secure.' },
      { heading: 'Your Rights', text: 'You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time by clicking the unsubscribe link in our emails.' },
      { heading: 'Contact Us', text: 'For privacy-related questions or requests, contact our Privacy Team at privacy@frolick.com.' },
    ],
  },
  'accessibility': {
    title: 'Accessibility',
    sections: [
      { heading: 'Our Commitment', text: 'Frolick News Network is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.' },
      { heading: 'Standards', text: 'We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at the AA level. These guidelines explain how to make web content more accessible for people with disabilities.' },
      { heading: 'Features', text: 'Our website includes features such as keyboard navigation support, alt text for images, proper heading hierarchy, sufficient color contrast, resizable text, and screen reader compatibility.' },
      { heading: 'Ongoing Efforts', text: 'We regularly review our website for accessibility issues and work to resolve them promptly. Our team receives ongoing training in accessibility best practices.' },
      { heading: 'Feedback', text: 'If you encounter any accessibility barriers on our website, please contact us at accessibility@frolick.com. We welcome your feedback and will make reasonable efforts to address your concerns.' },
    ],
  },
}

export default function LegalPage() {
  const { slug } = useParams<{ slug: string }>()
  const content = slug ? legalContent[slug] : undefined

  if (!content) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-frolick-yellow-dark hover:text-frolick-yellow font-oswald font-semibold mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="text-center py-16">
          <h1 className="font-oswald font-bold text-3xl text-frolick-dark mb-4">Page Not Found</h1>
          <p className="text-gray-500 font-roboto">The page you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-frolick-yellow-dark hover:text-frolick-yellow font-oswald font-semibold mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-10 bg-frolick-yellow rounded-full" />
        <h1 className="font-oswald font-bold text-3xl md:text-4xl text-frolick-dark">{content.title.toUpperCase()}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 border border-gray-100">
        <p className="text-gray-400 font-roboto text-sm mb-8">Last updated: March 1, 2026</p>
        <div className="space-y-8">
          {content.sections.map((section, i) => (
            <div key={i}>
              <h2 className="font-oswald font-bold text-lg text-frolick-dark mb-2">{section.heading}</h2>
              <p className="text-gray-600 font-roboto leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
