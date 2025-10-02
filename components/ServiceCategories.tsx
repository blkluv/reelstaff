import Link from 'next/link'
import { Category } from '@/types'
import { ArrowRight, Zap, Code, TrendingUp, Users, Settings } from 'lucide-react'

interface ServiceCategoriesProps {
  categories: Category[]
}

export default function ServiceCategories({ categories }: ServiceCategoriesProps) {
  // RFP Service categories for RFP.AUCTION
  const defaultCategories = [
    {
      id: '1',
      slug: 'government-rfp',
      title: 'Government RFP',
      metadata: {
        description: 'Compliant RFP templates and writing services for federal, state, and local government contracts',
        icon: '🏛️',
        color: '#1e40af',
        featured_image: null
      }
    },
    {
      id: '2', 
      slug: 'it-technology',
      title: 'IT & Technology',
      metadata: {
        description: 'Technical RFP services for software development, cloud migration, and IT infrastructure',
        icon: '💻',
        color: '#059669',
        featured_image: null
      }
    },
    {
      id: '3',
      slug: 'construction-infrastructure',
      title: 'Construction & Infrastructure',
      metadata: {
        description: 'RFP templates and consulting for construction projects, contractors, and infrastructure development',
        icon: '🏗️',
        color: '#ea580c',
        featured_image: null
      }
    },
    {
      id: '4',
      slug: 'marketing-creative',
      title: 'Marketing & Creative',
      metadata: {
        description: 'RFP services for agencies, content creation, branding, and digital marketing campaigns',
        icon: '🎨',
        color: '#7c3aed',
        featured_image: null
      }
    },
    {
      id: '5',
      slug: 'consulting-strategy',
      title: 'Consulting & Strategy',
      metadata: {
        description: 'Strategic RFP development for business consulting, management, and advisory services',
        icon: '📊',
        color: '#dc2626',
        featured_image: null
      }
    },
    {
      id: '6',
      slug: 'healthcare-medical',
      title: 'Healthcare & Medical',
      metadata: {
        description: 'HIPAA-compliant RFP services for healthcare providers, medical equipment, and services',
        icon: '🏥',
        color: '#0891b2',
        featured_image: null
      }
    },
    {
      id: '7',
      slug: 'emergency-rfp',
      title: 'Emergency RFP',
      metadata: {
        description: '24-hour turnaround RFP services for urgent projects and deadline rescues',
        icon: '🚨',
        color: '#dc2626',
        featured_image: null
      }
    },
    {
      id: '8',
      slug: 'ai-automation',
      title: 'AI & Automation',
      metadata: {
        description: 'AI-powered RFP generation, automation tools, and custom GPT solutions',
        icon: '🤖',
        color: '#6d28d9',
        featured_image: null
      }
    }
  ]

  const displayCategories = categories.length > 0 ? categories : defaultCategories

  // Icon mapping for consistent icons
  const iconMap = {
    '🏛️': Users,
    '💻': Code,
    '🏗️': Settings,
    '🎨': TrendingUp,
    '📊': TrendingUp,
    '🏥': Users,
    '🚨': Zap,
    '🤖': Code
  }

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            RFP Service Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional RFP templates, writing services, and consulting across all industries. 
            Get the right RFP solution for your specific needs with guaranteed quality and compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((category, index) => {
            const IconComponent = iconMap[category.metadata?.icon as keyof typeof iconMap] || Zap
            
            return (
              <div
                key={category.id || index}
                className="group relative bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md"
                  style={{ backgroundColor: category.metadata?.color || '#3b82f6' }}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                    {category.metadata?.description || 'Professional RFP services and templates'}
                  </p>
                </div>

                {/* Service Count Badge */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {Math.floor(Math.random() * 20) + 5} services
                  </span>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    From ${Math.floor(Math.random() * 200) + 97}
                  </span>
                </div>

                {/* Link */}
                <Link
                  href={`/services?category=${category.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={`Browse ${category.title} RFP services`}
                />

                {/* Arrow Icon */}
                <div className="absolute top-6 right-6 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowRight className="w-4 h-4" />
                </div>

                {/* Featured Image - only render if it exists */}
                {category.metadata && 'featured_image' in category.metadata && category.metadata.featured_image && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl overflow-hidden">
                    <img
                      src={`${category.metadata.featured_image.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Need a Custom RFP Solution?
            </h3>
            <p className="text-gray-600 mb-6">
              We specialize in bespoke RFP services tailored to your unique requirements. 
              Get a free consultation and quote for your specific project needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 font-semibold"
              >
                Browse All Services
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/consultation"
                className="btn-secondary inline-flex items-center gap-2 px-6 py-3 font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
