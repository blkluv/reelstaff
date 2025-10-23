'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { Service } from '@/types'
import {
  ShoppingCart,
  Truck,
  Shield,
  CheckCircle,
  Plus,
  Minus,
  ArrowLeft,
  Share2,
  Clock,
  FileText,
  Info,
} from 'lucide-react'
import Link from 'next/link'

interface ServiceDetailsProps {
  service: Service
}

/** ✅ Type-safe helper — fixes TS2339 forever */
function normalizeFeatures(features: unknown): string[] {
  if (Array.isArray(features)) {
    return features.filter(
      (x): x is string => typeof x === 'string' && x.trim() !== ''
    )
  }
  if (typeof features === 'string' && (features as string).trim() !== '') {
    return (features as string).split(',').map((s: string) => s.trim())
  }
  return []
}

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  // ✅ Absolute fail-proof normalization
  const m = service.metadata ?? ({} as any)
  const normalizedFeatures = normalizeFeatures(m.features)

  const safeMetadata = {
    ...m,
    features: normalizedFeatures,
    description: typeof m.description === 'string' ? m.description : '',
    price: typeof m.price === 'number' ? m.price : Number(m.price) || 0,
    delivery_time:
      typeof m.delivery_time === 'string' ? m.delivery_time : 'N/A',
    service_type:
      typeof m.service_type === 'string' ? m.service_type : 'standard',
    featured_image: m.featured_image ?? {},
  }

  const normalizedService = { ...service, metadata: safeMetadata }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      const productLike = {
        ...normalizedService,
        type: 'products' as const,
        metadata: {
          ...safeMetadata,
          stock_quantity: 1,
          usage_type: 'commercial' as const,
          technical_specs: {},
          sku: `SVC-${service.slug}`,
          weight: 0,
          dimensions: 'N/A',
          category:
            typeof safeMetadata.category === 'string'
              ? {
                  id: safeMetadata.category
                    .toLowerCase()
                    .replace(/\s+/g, '-'),
                  title: safeMetadata.category,
                  slug: safeMetadata.category
                    .toLowerCase()
                    .replace(/\s+/g, '-'),
                  type: 'categories' as const,
                  metadata: {},
                  created_at: new Date().toISOString(),
                  modified_at: new Date().toISOString(),
                }
              : safeMetadata.category,
          featured_image: safeMetadata.featured_image
            ? {
                url:
                  safeMetadata.featured_image.url ||
                  safeMetadata.featured_image.imgix_url ||
                  '',
                imgix_url:
                  safeMetadata.featured_image.imgix_url ||
                  safeMetadata.featured_image.url ||
                  '',
              }
            : undefined,
        },
      }
      addToCart(productLike, quantity)
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const images = safeMetadata.images || []
  const featuredImage = safeMetadata.featured_image
  const allImages = featuredImage ? [featuredImage, ...images] : images

  const mainImageUrl =
    allImages[selectedImage]?.imgix_url || featuredImage?.imgix_url
      ? `${allImages[selectedImage]?.imgix_url || featuredImage?.imgix_url
        }?w=800&h=600&fit=crop&auto=format,compress`
      : 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format,compress'

  const price = safeMetadata.price || 0

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="py-4 bg-secondary-50">
        <div className="container-max">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-secondary-600 hover:text-primary-600">
              Home
            </Link>
            <span className="text-secondary-400">/</span>
            <Link href="/services" className="text-secondary-600 hover:text-primary-600">
              Services
            </Link>
            <span className="text-secondary-400">/</span>
            <span className="font-medium text-secondary-900">
              {normalizedService.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="container-max section-padding">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Images */}
          <div className="space-y-4">
            <div className="overflow-hidden aspect-square bg-secondary-100 rounded-2xl">
              <img
                src={mainImageUrl}
                alt={normalizedService.title}
                className="object-cover w-full h-full"
              />
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 bg-secondary-100 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-primary-600'
                        : 'border-transparent hover:border-secondary-300'
                    }`}
                  >
                    <img
                      src={`${image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                      alt={`${normalizedService.title} ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Service Info */}
          <div className="space-y-8">
            <div>
              <h1 className="mb-4 text-3xl font-bold text-secondary-900">
                {normalizedService.title}
              </h1>
              {safeMetadata.description && (
                <p className="text-lg leading-relaxed text-secondary-700">
                  {safeMetadata.description}
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

            {/* Delivery / Type */}
            <div className="space-y-3">
              {safeMetadata.delivery_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary-600" />
                  <span className="font-medium text-secondary-900">
                    Delivery Time: {safeMetadata.delivery_time}
                  </span>
                </div>
              )}
              {safeMetadata.service_type && (
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-secondary-600" />
                  <span className="font-medium text-secondary-900">
                    Service Type: {safeMetadata.service_type}
                  </span>
                </div>
              )}
            </div>

            {/* ✅ Features — Always Safe */}
            {normalizedFeatures.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-secondary-900">
                  Service Features
                </h3>
                <div className="space-y-2">
                  {normalizedFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-600" />
                      <span className="text-secondary-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
