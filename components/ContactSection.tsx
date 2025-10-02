'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, FileText, Building2, Users } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: 'general',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          inquiryType: 'general',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call/Text Us',
      details: ['+1 (404) 889-5545'],
      description: 'Talk directly with our RFP experts',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['support@rfp.auction', 'sales@rfp.auction'],
      description: 'Get detailed information about our platform',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: MapPin,
      title: 'Atlanta, GA',
      details: ['2960 Olympic Industrial Dr SE', 'Suite 2, GA 30339'],
      description: 'American made auction solutions',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 7:00 AM - 6:00 PM EST', 'Weekends: Emergency Support Only'],
      description: 'Extended hours for global auction support',
      color: 'bg-orange-100 text-orange-600'
    }
  ]

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: MessageCircle },
    { value: 'vendor', label: 'Vendor Registration', icon: Building2 },
    { value: 'enterprise', label: 'Enterprise Solutions', icon: Users },
    { value: 'support', label: 'Platform Support', icon: FileText }
  ]

  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-max">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-secondary-900">
            Connect With Our RFP Experts
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-secondary-600">
            Ready to transform your procurement process? Our RFP auction specialists are here 
            to help you maximize savings, streamline bidding, and achieve better outcomes 
            for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-6 text-2xl font-semibold text-secondary-900">
                Multiple Ways to Reach Us
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon
                  return (
                    <div
                      key={index}
                      className="p-6 transition-shadow bg-white border shadow-sm rounded-xl border-secondary-100 hover:shadow-md"
                    >
                      <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center mb-4`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h4 className="mb-2 font-semibold text-secondary-900">
                        {method.title}
                      </h4>
                      <div className="mb-3 space-y-1">
                        {method.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="font-medium text-secondary-700">
                            {detail}
                          </p>
                        ))}
                      </div>
                      <p className="text-sm text-secondary-600">
                        {method.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-8 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <h3 className="mb-4 text-xl font-semibold">
                Need Immediate Auction Support?
              </h3>
              <p className="mb-6 text-blue-100">
                Our dedicated support team is available for urgent auction inquiries, 
                platform demonstrations, and technical assistance during live bidding events.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+1555123RFPA"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors border rounded-lg bg-white/20 hover:bg-white/30 border-white/30"
                >
                  <Phone className="w-4 h-4" />
                  Emergency Support
                </a>
                <a
                  href="mailto:support@rfp.auction"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors border rounded-lg bg-white/20 hover:bg-white/30 border-white/30"
                >
                  <Mail className="w-4 h-4" />
                  Priority Email
                </a>
              </div>
            </div>

            {/* Platform Features */}
            <div className="p-6 bg-white border rounded-2xl border-secondary-100">
              <h4 className="mb-4 font-semibold text-secondary-900">
                Why Choose RFP.AUCTION?
              </h4>
              <ul className="space-y-2 text-sm text-secondary-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Real-time competitive bidding
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Transparent vendor selection
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Average 15-30% cost savings
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Global vendor network
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Secure platform with audit trails
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 bg-white border shadow-sm rounded-2xl border-secondary-100">
            <h3 className="mb-6 text-2xl font-semibold text-secondary-900">
              Start Your Auction Journey
            </h3>

            {submitStatus === 'success' && (
              <div className="p-4 mb-6 border border-green-200 rounded-lg bg-green-50">
                <p className="text-green-800">
                  Thank you! Your inquiry has been received. Our auction specialist will contact you within 1 business hour.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
                <p className="text-red-800">
                  Sorry, there was an error sending your message. Please try again or contact us directly at support@rfp.auction.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-secondary-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-colors border rounded-lg border-secondary-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-secondary-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-colors border rounded-lg border-secondary-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-secondary-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-colors border rounded-lg border-secondary-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block mb-2 text-sm font-medium text-secondary-700">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-colors border rounded-lg border-secondary-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              {/* Inquiry Type */}
              <div>
                <label className="block mb-3 text-sm font-medium text-secondary-700">
                  I'm Interested In *
                </label>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {inquiryTypes.map((type) => {
                    const IconComponent = type.icon
                    return (
                      <label
                        key={type.value}
                        className="flex items-center p-3 transition-colors border rounded-lg cursor-pointer hover:bg-secondary-50"
                      >
                        <input
                          type="radio"
                          name="inquiryType"
                          value={type.value}
                          checked={formData.inquiryType === type.value}
                          onChange={handleChange}
                          className="mr-3 text-blue-600"
                        />
                        <IconComponent className="w-4 h-4 mr-2 text-secondary-600" />
                        <span className="text-sm font-medium">{type.label}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-secondary-700">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 transition-colors border rounded-lg border-secondary-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief subject of your inquiry"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-secondary-700">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 transition-colors border rounded-lg resize-none border-secondary-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about your procurement needs, budget range, timeline, and any specific requirements..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Request Free Consultation
                  </>
                )}
              </button>

              <p className="text-xs text-center text-secondary-500">
                By submitting, you agree to our Privacy Policy and consent to contact 
                about our auction platform services.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}