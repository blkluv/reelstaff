'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { Service } from '@/types'
import { 
  ShoppingCart, 
  Truck, 
  Shield, 
  Info, 
  CheckCircle,
  Plus,
  Minus,
  ArrowLeft,
  Share2,
  Clock,
  FileText,
  Star
} from 'lucide-react'
import Link from 'next/link'

interface ServiceDetailsProps {
  service: Service
}

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  console.log('🔍 ServiceDetails rendering with:', {
    title: service.title,
    slug: service.slug,
    hasMetadata: !!service.metadata,
    price: service.metadata?.price,
    deliveryTime: service.metadata?.delivery_time
  })

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      // Convert service to product for cart compatibility
      const productLike = {
        ...service,
        type: 'products' as const,
        metadata: {
          ...service.metadata,
          stock_quantity: 1,
          usage_type: 'commercial' as const,
          // Ensure all required fields
          technical_specs: service.metadata?.technical_specs || {},
          sku: service.metadata?.sku || `SVC-${service.slug}`,
          weight: service.metadata?.weight || 0,
          dimensions: service.metadata?.dimensions || 'N/A',
          // Handle category conversion safely
          category: typeof service.metadata?.category === 'string' 
            ? { 
                id: service.metadata.category.toLowerCase().replace(/\s+/g, '-'),
                title: service.metadata.category,
                slug: service.metadata.category.toLowerCase().replace(/\s+/g, '-'),
                type: 'categories' as const,
                metadata: {},
                created_at: new Date().toISOString(),
                modified_at: new Date().toISOString()
              }
            : service.metadata?.category
        }
      }
      addToCart(productLike, quantity)
      
      // Show success feedback
      console.log('✅ Service added to cart:', service.title)
    } catch (error) {
      console.error('❌ Error adding to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  // Safe image handling
  const getImageUrl = () => {
    const featuredImage = service.metadata?.featured_image
    if (featuredImage?.imgix_url) {
      return `${featuredImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`
    }
    return 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format,compress'
  }

  const price = service.metadata?.price || 0
  const deliveryTime = service.metadata?.delivery_time || 'Custom timeline'
  const serviceType = service.metadata?.service_type || 'Professional Service'
  const features = service.metadata?.features || []
  const process = service.metadata?.process

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="py-4 border-b bg-secondary-50 border-secondary-200">
        <div className="container-max">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="transition-colors text-secondary-600 hover:text-primary-600">
              Home
            </Link>
            <span className="text-secondary-400">/</span>
            <Link href="/services" className="transition-colors text-secondary-600 hover:text-primary-600">
              Services
            </Link>
            <span className="text-secondary-400">/</span>
            <span className="font-medium truncate text-secondary-900">{service.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-max section-padding">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Service Image */}
          <div className="space-y-6">
            <div className="overflow-hidden bg-secondary-100 rounded-2xl aspect-[4/3]">
              <img
                src={getImageUrl()}
                alt={service.title}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
            </div>
            
            {/* Featured Badge */}
            {service.metadata?.featured && (
              <div className="flex items-center justify-center gap-2 p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                <Star className="w-5 h-5 text-yellow-600 fill-current" />
                <span className="font-semibold text-yellow-800">Featured Service</span>
              </div>
            )}
          </div>

          {/* Service Information */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="mb-4 text-3xl font-bold text-secondary-900 lg:text-4xl">
                {service.title}
              </h1>

              {service.metadata?.description && (
                <p className="text-lg leading-relaxed text-secondary-700">
                  {service.metadata.description}
                </p>
              )}
            </div>

            {/* Pricing */}
            <div className="p-6 bg-primary-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-primary-600">
                  ${price.toFixed(2)}
                </div>
                <div className="text-secondary-600">one-time service fee</div>
              </div>
            </div>

            {/* Service Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary-50">
                <Clock className="w-5 h-5 text-secondary-600" />
                <div>
                  <div className="font-semibold text-secondary-900">Delivery Time</div>
                  <div className="text-secondary-600">{deliveryTime}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary-50">
                <FileText className="w-5 h-5 text-secondary-600" />
                <div>
                  <div className="font-semibold text-secondary-900">Service Type</div>
                  <div className="text-secondary-600">{serviceType}</div>
                </div>
              </div>
            </div>

            {/* Features */}
<<<<<<< HEAD
            {features.length > 0 && (
              <div className="p-6 bg-secondary-50 rounded-xl">
                <h3 className="mb-4 text-xl font-semibold text-secondary-900">Service Features</h3>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-600" />
                      <span className="text-secondary-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
=======
{Array.isArray(service.metadata?.features) && service.metadata.features.length > 0 && (
  <div>
    <h3 className="mb-3 text-lg font-semibold text-secondary-900">Service Features</h3>
    <div className="space-y-2">
      {service.metadata.features.map((feature, index) => (
        <div key={index} className="flex items-center gap-2">
          <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-600" />
          <span className="text-secondary-700">{feature}</span>
        </div>
      ))}
    </div>
  </div>
)}
>>>>>>> 9ca1b1b7b2d229c3e337b80ec765ce95de80324c

            {/* Quantity and Actions */}
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary-50">
                <span className="font-semibold text-secondary-900">Quantity</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white border rounded-lg border-secondary-300">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="p-3 transition-colors hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-3 font-medium min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 transition-colors hover:bg-secondary-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-lg font-semibold text-secondary-900">
                    Total: ${(price * quantity).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex items-center justify-center flex-1 gap-3 py-4 text-lg btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      Adding to Cart...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Book This Service
                    </>
                  )}
                </button>
                
                <button className="px-6 border-2 btn-outline">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Service Guarantees */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3 p-4 border border-green-200 rounded-lg bg-green-50">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-semibold text-green-900">Quality Assured</div>
                  <div className="text-sm text-green-700">Professional service</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 border border-blue-200 rounded-lg bg-blue-50">
                <Truck className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-semibold text-blue-900">Fast Delivery</div>
                  <div className="text-sm text-blue-700">On-time completion</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 border border-purple-200 rounded-lg bg-purple-50">
                <CheckCircle className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-semibold text-purple-900">Satisfaction</div>
                  <div className="text-sm text-purple-700">Money-back guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Process */}
        {process && (
          <div className="mt-16">
            <h2 className="flex items-center gap-3 mb-8 text-2xl font-semibold text-secondary-900">
              <Info className="w-6 h-6 text-primary-600" />
              Our Service Process
            </h2>
            
            <div className="p-8 border bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border-primary-200">
              <div className="leading-relaxed prose prose-lg max-w-none text-secondary-700">
                {typeof process === 'string' ? (
                  <p>{process}</p>
                ) : Array.isArray(process) ? (
                  <ol className="space-y-4">
                    {process.map((step, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <span className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 font-semibold text-white rounded-full bg-primary-600">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>{String(process)}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Back to Services */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 px-8 py-3 btn-outline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Services
          </Link>
        </div>
      </div>
    </div>
  )
}