'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { Service } from '@/types'
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  Shield, 
  Info, 
  Star, 
  CheckCircle,
  Plus,
  Minus,
  ArrowLeft,
  Share2,
  Clock,
  FileText
} from 'lucide-react'
import Link from 'next/link'

interface ServiceDetailsProps {
  service: Service
}

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0) // Add this missing state

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
          technical_specs: {},
          sku: `SVC-${service.slug}`,
          weight: 0,
          dimensions: 'N/A',
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
            : service.metadata?.category,
          // Ensure featured_image has both url and imgix_url
          featured_image: service.metadata?.featured_image ? {
            url: service.metadata.featured_image.url || service.metadata.featured_image.imgix_url || '',
            imgix_url: service.metadata.featured_image.imgix_url || service.metadata.featured_image.url || ''
          } : undefined
        }
      }
      addToCart(productLike, quantity)
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const images = service.metadata?.images || []
  const featuredImage = service.metadata?.featured_image
  const allImages = featuredImage ? [featuredImage, ...images] : images

  const mainImageUrl = allImages[selectedImage]?.imgix_url || featuredImage?.imgix_url
    ? `${allImages[selectedImage]?.imgix_url || featuredImage?.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`
    : 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format,compress'

  const price = service.metadata?.price || 0

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="py-4 bg-secondary-50">
        <div className="container-max">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-secondary-600 hover:text-primary-600">Home</Link>
            <span className="text-secondary-400">/</span>
            <Link href="/services" className="text-secondary-600 hover:text-primary-600">Services</Link>
            <span className="text-secondary-400">/</span>
            <span className="font-medium text-secondary-900">{service.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-max section-padding">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Service Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="overflow-hidden aspect-square bg-secondary-100 rounded-2xl">
              <img
                src={mainImageUrl}
                alt={service.title}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 bg-secondary-100 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary-600' : 'border-transparent hover:border-secondary-300'
                    }`}
                  >
                    <img
                      src={`${image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                      alt={`${service.title} ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Service Information */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="mb-4 text-3xl font-bold text-secondary-900">
                {service.title}
              </h1>

              {service.metadata?.description && (
                <p className="text-lg leading-relaxed text-secondary-700">
                  {service.metadata.description}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-primary-600">
                ${price.toFixed(2)}
              </div>
              <div className="text-secondary-600">service fee</div>
            </div>

            {/* Service Details */}
            <div className="space-y-3">
              {service.metadata?.delivery_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary-600" />
                  <span className="font-medium text-secondary-900">
                    Delivery Time: {service.metadata.delivery_time}
                  </span>
                </div>
              )}

              {service.metadata?.service_type && (
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-secondary-600" />
                  <span className="font-medium text-secondary-900">
                    Service Type: {service.metadata.service_type}
                  </span>
                </div>
              )}
            </div>

{/* Features */}
{Array.isArray(service.metadata?.features) && service.metadata.features.length > 0 ? (
  <div>
    <h3 className="mb-3 text-lg font-semibold text-secondary-900">Service Features</h3>
    <div className="space-y-2">
      {service.metadata.features.map((feature: string, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-600" />
          <span className="text-secondary-700">{feature}</span>
        </div>
      ))}
    </div>
  </div>
) : (
  typeof service.metadata?.features === "string" &&
  (service.metadata.features as string).trim() !== "" && (
    <div>
      <h3 className="mb-3 text-lg font-semibold text-secondary-900">Service Features</h3>
      <p className="text-secondary-700">{service.metadata.features}</p>
    </div>
  )
)}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg border-secondary-300">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-3 transition-colors hover:bg-secondary-50 disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-3 font-medium min-w-[80px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 transition-colors hover:bg-secondary-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-sm text-secondary-600">
                  Total: <span className="font-semibold">${(price * quantity).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex items-center justify-center flex-1 gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Book Service
                    </>
                  )}
                </button>
                
                <button className="px-4 btn-outline">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Service Benefits */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary-50">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-medium text-secondary-900">Quality Assured</div>
                  <div className="text-sm text-secondary-600">Professional service</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary-50">
                <Truck className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-medium text-secondary-900">Fast Delivery</div>
                  <div className="text-sm text-secondary-600">On-time completion</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary-50">
                <CheckCircle className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-medium text-secondary-900">Satisfaction</div>
                  <div className="text-sm text-secondary-600">Money-back guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Process */}
        {service.metadata?.process && (
          <div className="mt-16">
            <h2 className="flex items-center gap-2 mb-8 text-2xl font-semibold text-secondary-900">
              <Info className="w-6 h-6 text-primary-600" />
              Service Process
            </h2>
            
            <div className="p-8 bg-secondary-50 rounded-2xl">
              <div className="prose prose-lg max-w-none">
                <p className="leading-relaxed text-secondary-700">
                  {service.metadata.process}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Back to Services */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 btn-outline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </div>
      </div>
    </div>
  )
}