import Link from 'next/link'
import { Service } from '@/types' // Changed from Services to Service
import { ArrowRight, Clock, Zap, Star, FileText, TrendingUp } from 'lucide-react'

interface FeaturedServicesProps {
  services: Service[] // Changed from Services[] to Service[]
}

export default function FeaturedServices({ services }: FeaturedServicesProps) {
  // Default RFP services if none provided - using Service type
  const defaultServices: Partial<Service>[] = [ // Changed from Product to Service
    {
      id: '1',
      slug: '24-hour-rfp-rescue',
      title: '24-Hour RFP Rescue',
      type: 'rfp-services',
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      metadata: {
        description: 'Emergency RFP completion service with guaranteed 24-hour turnaround for urgent deadlines',
        price: 1497,
        delivery_time: '24 Hours',
        service_type: 'emergency',
        features: ['Guaranteed 24-hour delivery', 'Expert RFP writing', 'Priority support', 'Unlimited revisions'],
        featured_image: {
          url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
          imgix_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
        },
        featured: true
      }
    },
    {
      id: '2',
      slug: 'government-rfp-template-pack',
      title: 'Government RFP Template Pack',
      type: 'rfp-services',
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      metadata: {
        description: 'Complete suite of government-compliant RFP templates for federal, state, and local contracts',
        price: 497,
        delivery_time: 'Instant',
        service_type: 'template',
        features: ['FAR/DFARS compliant', 'All 50 states covered', 'Scoring matrices included', 'Ready to use'],
        featured_image: {
          url: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9',
          imgix_url: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9'
        },
        featured: true
      }
    },
    {
      id: '3',
      slug: 'ai-rfp-co-pilot',
      title: 'AI RFP Co-Pilot',
      type: 'rfp-services',
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      metadata: {
        description: 'AI-powered RFP analysis and generation with custom training on your business requirements',
        price: 297,
        delivery_time: '1 Week',
        service_type: 'ai',
        features: ['Custom AI training', 'Unlimited RFP drafts', 'Vendor matching', 'Performance analytics'],
        featured_image: {
          url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
          imgix_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
        },
        featured: true
      }
    }
  ]

  // Use provided services or default services
  const displayServices = services && services.length > 0 ? services : defaultServices

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container-max">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Featured RFP Services
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Our most popular RFP solutions trusted by businesses to save time, reduce costs, 
            and win more contracts with blockchain-verified quality.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayServices.slice(0, 6).map((service, index) => {
            const imageUrl = service.metadata?.featured_image?.imgix_url
              ? `${service.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`
              : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format,compress'

            return (
              <div
                key={service.id || index}
                className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-lg group rounded-2xl hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={service.title || ''}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute flex flex-col gap-2 top-4 right-4">
                    <div className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
                      {service.metadata?.service_type?.toUpperCase() || 'SERVICE'}
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-full">
                      <Clock className="w-3 h-3" />
                      {service.metadata?.delivery_time || 'Custom'}
                    </div>
                  </div>
                </div>

                {/* Service Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                      {service.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600 line-clamp-2">
                      {service.metadata?.description || 'Professional RFP service solution'}
                    </p>
                  </div>

                  {/* Service Features Preview */}
                  {service.metadata?.features && (
                    <div className="mb-4 space-y-2">
                      {service.metadata.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <Zap className="flex-shrink-0 w-3 h-3 text-blue-500" />
                          <span className="line-clamp-1">{feature}</span>
                        </div>
                      ))}
                      {service.metadata.features.length > 3 && (
                        <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                          <TrendingUp className="w-3 h-3" />
                          <span>+{service.metadata.features.length - 3} more features</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Blockchain Verification Badge */}
                  <div className="flex items-center gap-2 px-3 py-2 mb-4 text-sm text-green-600 rounded-lg bg-green-50">
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
                      className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
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
        <div className="grid grid-cols-2 gap-4 mt-12 md:grid-cols-4">
          <Link
            href="/services?serviceType=emergency"
            className="p-4 text-center transition-all bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-300 group"
          >
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-red-100 rounded-xl">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
            <div className="font-semibold text-gray-900 group-hover:text-blue-600">Emergency RFPs</div>
            <div className="text-sm text-gray-600">24-72 hour delivery</div>
          </Link>

          <Link
            href="/services?serviceType=template"
            className="p-4 text-center transition-all bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-300 group"
          >
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-xl">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="font-semibold text-gray-900 group-hover:text-blue-600">RFP Templates</div>
            <div className="text-sm text-gray-600">Ready-to-use packs</div>
          </Link>

          <Link
            href="/services?serviceType=ai"
            className="p-4 text-center transition-all bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-300 group"
          >
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-purple-100 rounded-xl">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div className="font-semibold text-gray-900 group-hover:text-blue-600">AI Services</div>
            <div className="text-sm text-gray-600">Smart RFP tools</div>
          </Link>

          <Link
            href="/services?serviceType=consulting"
            className="p-4 text-center transition-all bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-300 group"
          >
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-green-100 rounded-xl">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <div className="font-semibold text-gray-900 group-hover:text-blue-600">Consulting</div>
            <div className="text-sm text-gray-600">Expert guidance</div>
          </Link>
        </div>

        {/* View All Services CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-blue-600 transition-colors bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
          >
            Explore All RFP Services
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            Join 500+ businesses using RFP.AUCTION to streamline their procurement process
          </p>
        </div>
      </div>
    </section>
  )
}