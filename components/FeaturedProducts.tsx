import Link from 'next/link'
import { Services } from '@/types'
import { ArrowRight, Clock, Zap, Star, FileText, TrendingUp } from 'lucide-react'

interface FeaturedServicesProps {
  services: Services[]
}

export default function FeaturedServices({ services }: FeaturedServicesProps) {
  // Default RFP services if none provided
  const defaultServices: Partial<Product>[] = [
    {
      id: '1',
      slug: '24-hour-rfp-rescue',
      title: '24-Hour RFP Rescue',
      metadata: {
        description: 'Emergency RFP completion service with guaranteed 24-hour turnaround for urgent deadlines',
        price: 1497,
        delivery_time: '24 Hours',
        service_type: 'emergency',
        features: ['Guaranteed 24-hour delivery', 'Expert RFP writing', 'Priority support', 'Unlimited revisions'],
        featured_image: {
          url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
          imgix_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
        }
      }
    },
    {
      id: '2',
      slug: 'government-rfp-template-pack',
      title: 'Government RFP Template Pack',
      metadata: {
        description: 'Complete suite of government-compliant RFP templates for federal, state, and local contracts',
        price: 497,
        delivery_time: 'Instant',
        service_type: 'template',
        features: ['FAR/DFARS compliant', 'All 50 states covered', 'Scoring matrices included', 'Ready to use'],
        featured_image: {
          url: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9',
          imgix_url: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9'
        }
      }
    },
    {
      id: '3',
      slug: 'ai-rfp-co-pilot',
      title: 'AI RFP Co-Pilot',
      metadata: {
        description: 'AI-powered RFP analysis and generation with custom training on your business requirements',
        price: 297,
        delivery_time: '1 Week',
        service_type: 'ai',
        features: ['Custom AI training', 'Unlimited RFP drafts', 'Vendor matching', 'Performance analytics'],
        featured_image: {
          url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
          imgix_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
        }
      }
    }
  ]

  const displayServices = services.length > 0 ? services : defaultServices

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured RFP Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our most popular RFP solutions trusted by businesses to save time, reduce costs, 
            and win more contracts with blockchain-verified quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.slice(0, 6).map((service, index) => {
            const imageUrl = service.metadata?.featured_image?.imgix_url
              ? `${service.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`
              : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format,compress'

            return (
              <div
                key={service.id || index}
                className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={service.title || ''}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {service.metadata?.service_type?.toUpperCase() || 'SERVICE'}
                    </div>
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {service.metadata?.delivery_time || 'Custom'}
                    </div>
                  </div>
                </div>

                {/* Service Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 leading-relaxed">
                      {service.metadata?.description || 'Professional RFP service solution'}
                    </p>
                  </div>

                  {/* Service Features Preview */}
                  {service.metadata?.features && (
                    <div className="mb-4 space-y-2">
                      {service.metadata.features.slice(0, 3).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <Zap className="w-3 h-3 text-blue-500 flex-shrink-0" />
                          <span className="line-clamp-1">{feature}</span>
                        </div>
                      ))}
                      {service.metadata.features.length > 3 && (
                        <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                          <TrendingUp className="w-3 h-3" />
                          <span>+{service.metadata.features.length - 3} more features</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Blockchain Verification Badge */}
                  <div className="mb-4 flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    <FileText className="w-4 h-4" />
                    <span>Blockchain-Verified Quality</span>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      {service.metadata?.price && (
                        <div className="text-2xl font-bold text-blue-600">
                          ${service.metadata.price.toFixed(0)}
                        </div>
                      )}
                      <div className="text-sm text-gray-500">
                        One-time payment • No hidden fees
                      </div>
                    </div>

                    <Link
                      href={`/services/${service.slug}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-1 text-sm"
                    >
                      Book Service
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Service Categories Quick Links */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/services?serviceType=emergency"
            className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all border border-gray-200 hover:border-blue-300 group"
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
            <div className="font-semibold text-gray-900 group-hover:text-blue-600">Emergency RFPs</div>
            <div className="text-sm text-gray-600">24-72 hour delivery</div>
          </Link>

          <Link
            href="/services?serviceType=template"
            className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all border border-gray-200 hover:border-blue-300 group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="font-semibold text-gray-900 group-hover:text-blue-600">RFP Templates</div>
            <div className="text-sm text-gray-600">Ready-to-use packs</div>
          </Link>

          <Link
            href="/services?serviceType=ai"
            className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all border border-gray-200 hover:border-blue-300 group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div className="font-semibold text-gray-900 group-hover:text-blue-600">AI Services</div>
            <div className="text-sm text-gray-600">Smart RFP tools</div>
          </Link>

          <Link
            href="/services?serviceType=consulting"
            className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all border border-gray-200 hover:border-blue-300 group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <div className="font-semibold text-gray-900 group-hover:text-blue-600">Consulting</div>
            <div className="text-sm text-gray-600">Expert guidance</div>
          </Link>
        </div>

        {/* View All Services CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors inline-flex items-center gap-2 text-lg"
          >
            Explore All RFP Services
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-gray-600 mt-4 text-sm">
            Join 500+ businesses using RFP.AUCTION to streamline their procurement process
          </p>
        </div>
      </div>
    </section>
  )
}
