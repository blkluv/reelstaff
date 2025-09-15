import Link from 'next/link'
import { Product } from '@/types'
import { ArrowRight, Package, Star } from 'lucide-react'

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  // Default products if none provided
  const defaultProducts: Partial<Product>[] = [
    {
      id: '1',
      slug: 'multi-core-copper-wire',
      title: 'Multi-Core Copper Wire',
      metadata: {
        description: 'High-quality multi-core copper wire for residential applications',
        price: 45.99,
        featured_image: {
          url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
          imgix_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96'
        }
      }
    },
    {
      id: '2',
      slug: 'armored-power-cable',
      title: 'Armored Power Cable',
      metadata: {
        description: 'Heavy-duty armored power cable for industrial use',
        price: 125.00,
        featured_image: {
          url: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890',
          imgix_url: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890'
        }
      }
    },
    {
      id: '3',
      slug: 'fiber-optic-cable',
      title: 'Fiber Optic Cable',
      metadata: {
        description: 'High-speed fiber optic cable for data transmission',
        price: 89.50,
        featured_image: {
          url: 'https://images.unsplash.com/photo-1606314897481-9b5d25abe10f',
          imgix_url: 'https://images.unsplash.com/photo-1606314897481-9b5d25abe10f'
        }
      }
    }
  ]

  const displayProducts = products.length > 0 ? products : defaultProducts

  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Discover our most popular and trusted electrical cables, 
            chosen by professionals for their reliability and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.slice(0, 6).map((product, index) => {
            const imageUrl = product.metadata?.featured_image?.imgix_url
              ? `${product.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`
              : 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&auto=format,compress'

            return (
              <div
                key={product.id || index}
                className="group bg-white rounded-2xl shadow-sm border border-secondary-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={product.title || ''}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-secondary-600 line-clamp-2">
                      {product.metadata?.description || 'Quality electrical solution for your needs'}
                    </p>
                  </div>

                  {/* Technical Specs Preview */}
                  {product.metadata?.technical_specs && (
                    <div className="mb-4 space-y-1">
                      {product.metadata.technical_specs.voltage && (
                        <div className="flex items-center gap-2 text-sm text-secondary-600">
                          <Package className="w-3 h-3" />
                          <span>Voltage: {product.metadata.technical_specs.voltage}</span>
                        </div>
                      )}
                      {product.metadata.technical_specs.conductor && (
                        <div className="flex items-center gap-2 text-sm text-secondary-600">
                          <Star className="w-3 h-3" />
                          <span>Conductor: {product.metadata.technical_specs.conductor}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      {product.metadata?.price && (
                        <div className="text-2xl font-bold text-primary-600">
                          ${product.metadata.price.toFixed(2)}
                        </div>
                      )}
                      <div className="text-sm text-secondary-500">
                        Per meter
                      </div>
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      className="btn-primary text-sm px-4 py-2 inline-flex items-center gap-1"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-16">
          <Link
            href="/shop"
            className="btn-outline inline-flex items-center gap-2 text-lg px-8 py-4"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}