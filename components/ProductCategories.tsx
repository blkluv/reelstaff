import Link from 'next/link'
import { Category } from '@/types'
import { ArrowRight } from 'lucide-react'

interface ProductCategoriesProps {
  categories: Category[]
}

export default function ProductCategories({ categories }: ProductCategoriesProps) {
  // Default categories if none provided
  const defaultCategories = [
    {
      id: '1',
      slug: 'electrical-wires',
      title: 'Electrical Wires',
      metadata: {
        description: 'High-quality electrical wires for residential and commercial use',
        icon: '⚡',
        color: '#3b82f6'
      }
    },
    {
      id: '2',
      slug: 'power-cables',
      title: 'Power Cables',
      metadata: {
        description: 'Heavy-duty power cables for industrial applications',
        icon: '🔌',
        color: '#10b981'
      }
    },
    {
      id: '3',
      slug: 'communication-cables',
      title: 'Communication Cables',
      metadata: {
        description: 'Data and communication cables for modern connectivity',
        icon: '📡',
        color: '#8b5cf6'
      }
    },
    {
      id: '4',
      slug: 'specialized-cables',
      title: 'Specialized Cables',
      metadata: {
        description: 'Custom and specialized cables for unique requirements',
        icon: '🎯',
        color: '#f59e0b'
      }
    }
  ]

  const displayCategories = categories.length > 0 ? categories : defaultCategories

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            Our Product Categories
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Comprehensive range of electrical solutions designed for reliability, 
            safety, and performance across all applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayCategories.map((category, index) => (
            <div
              key={category.id || index}
              className="group relative bg-white rounded-2xl shadow-sm border border-secondary-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: category.metadata?.color || '#3b82f6' }}
              >
                {category.metadata?.icon || '⚡'}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200">
                  {category.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {category.metadata?.description || 'Quality electrical solutions for your needs'}
                </p>
              </div>

              {/* Link */}
              <Link
                href={`/shop?category=${category.slug}`}
                className="absolute inset-0 z-10"
                aria-label={`Browse ${category.title}`}
              />

              {/* Arrow Icon */}
              <div className="absolute top-8 right-8 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ArrowRight className="w-5 h-5" />
              </div>

              {/* Featured Image - only render if it exists */}
              {category.metadata?.featured_image && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl overflow-hidden">
                  <img
                    src={`${category.metadata.featured_image.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Link
            href="/shop"
            className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}