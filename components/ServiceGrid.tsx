'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { Service, ProductFilter, Product } from '@/types'
import { Clock, FileText, Star, Filter, Eye } from 'lucide-react'

interface ServiceGridProps {
  services: Service[] | undefined
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function ServiceGrid({ services, searchParams }: ServiceGridProps) {
  const { addToCart } = useCart()
  const [sortBy, setSortBy] = useState('newest')

  // Helper function to convert Service to Product for cart compatibility
  const convertServiceToProduct = (service: Service): Product => {
    return {
      ...service,
      type: 'products' as const,
      metadata: {
        ...service.metadata,
        stock_quantity: 1,
        usage_type: 'commercial' as const,
        // Ensure all required Product fields are present
        technical_specs: {},
        sku: `SVC-${service.slug}`,
        weight: 0,
        dimensions: 'N/A',
        // Handle category conversion
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
  }

  // Ensure services is always an array
  const safeServices = Array.isArray(services) ? services : []

  // Build filter object from search params
  const filters: ProductFilter = {
    category: typeof searchParams.category === 'string' ? searchParams.category : undefined,
    minPrice: typeof searchParams.minPrice === 'string' ? parseFloat(searchParams.minPrice) : undefined,
    maxPrice: typeof searchParams.maxPrice === 'string' ? parseFloat(searchParams.maxPrice) : undefined,
    deliveryTime: typeof searchParams.deliveryTime === 'string' ? searchParams.deliveryTime : undefined,
    serviceType: typeof searchParams.serviceType === 'string' ? searchParams.serviceType : undefined,
    search: typeof searchParams.search === 'string' ? searchParams.search : undefined,
  }

  // Filter and sort services - with safe array handling
  const filteredServices = useMemo(() => {
    // Double safety check
    if (!Array.isArray(safeServices) || safeServices.length === 0) {
      return []
    }

    let filtered = safeServices.filter((service) => {
      // Category filter - handle both string and Category object
      if (filters.category) {
        const serviceCategory = service.metadata?.category;
        if (typeof serviceCategory === 'string') {
          if (serviceCategory !== filters.category) return false;
        } else if (serviceCategory?.slug) {
          if (serviceCategory.slug !== filters.category) return false;
        } else {
          return false;
        }
      }

      // Price range filter
      const price = service.metadata?.price || 0
      if (filters.minPrice && price < filters.minPrice) return false
      if (filters.maxPrice && price > filters.maxPrice) return false

      // Delivery time filter
      if (filters.deliveryTime && service.metadata?.delivery_time !== filters.deliveryTime) {
        return false
      }

      // Service type filter
      if (filters.serviceType && service.metadata?.service_type !== filters.serviceType) {
        return false
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const categoryTitle = typeof service.metadata?.category === 'string' 
          ? service.metadata.category 
          : service.metadata?.category?.title || '';
        
        const searchableContent = [
          service.title,
          service.metadata?.description || '',
          categoryTitle,
          service.metadata?.service_type || '',
        ].join(' ').toLowerCase()
        
        if (!searchableContent.includes(searchTerm)) {
          return false
        }
      }

      return true
    })

    // Sort services
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.metadata?.price || 0) - (b.metadata?.price || 0))
        break
      case 'price-high':
        filtered.sort((a, b) => (b.metadata?.price || 0) - (a.metadata?.price || 0))
        break
      case 'name':
        filtered.sort((a, b) => a.title?.localeCompare(b.title || '') || 0)
        break
      case 'delivery-fast':
        // Use delivery_days if available, otherwise fallback
        filtered.sort((a, b) => {
          const aDays = a.metadata?.delivery_days || (a.metadata?.delivery_time ? 999 : 1000);
          const bDays = b.metadata?.delivery_days || (b.metadata?.delivery_time ? 999 : 1000);
          return aDays - bDays;
        })
        break
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
        break
    }

    return filtered
  }, [safeServices, filters, sortBy])

  // Show loading state while services is undefined
  if (!Array.isArray(services)) {
    return (
      <div className="py-12 text-center">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg animate-pulse h-80">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Show empty state if no services
  if (safeServices.length === 0) {
    return (
      <div className="py-12 text-center">
        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="mb-2 text-xl font-semibold text-gray-900">No services found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredServices.length} of {safeServices.length} services
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-field max-w-48"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name A-Z</option>
          <option value="delivery-fast">Fastest Delivery</option>
        </select>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredServices.map((service) => (
          <div key={service.id} className="transition-all duration-200 group card hover:shadow-lg">
            {/* Service Image */}
            <div className="relative mb-4 overflow-hidden rounded-lg">
              <img
                src={
                  service.metadata?.featured_image?.imgix_url
                    ? `${service.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`
                    : '/default-service-image.jpg'
                }
                alt={service.title}
                className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Delivery Time Badge */}
              <div className="absolute top-2 left-2">
                <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded">
                  <Clock className="w-3 h-3" />
                  {service.metadata?.delivery_time || 'Custom'}
                </span>
              </div>

              {/* Service Type Badge */}
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded">
                  {service.metadata?.service_type || 'Service'}
                </span>
              </div>

              {/* Featured Badge */}
              {service.metadata?.featured && (
                <div className="absolute top-10 right-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
              )}

              {/* Quick Actions */}
              <div className="absolute inset-0 flex items-center justify-center space-x-2 transition-opacity duration-200 opacity-0 bg-black/60 group-hover:opacity-100">
                <Link
                  href={`/services/${service.slug}`}
                  className="p-2 text-gray-900 transition-colors duration-200 bg-white rounded-full hover:bg-gray-100"
                  title="View Details"
                >
                  <Eye className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => addToCart(convertServiceToProduct(service))}
                  className="p-2 text-white transition-colors duration-200 bg-blue-600 rounded-full hover:bg-blue-700"
                  title="Add to Cart"
                >
                  <FileText className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Service Info */}
            <div className="space-y-3">
              <div>
                {service.metadata?.category && (
                  <span className="text-xs font-medium tracking-wider text-blue-600 uppercase">
                    {typeof service.metadata.category === 'string' 
                      ? service.metadata.category 
                      : service.metadata.category.title}
                  </span>
                )}
                <h3 className="mt-1 text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
                  {service.title}
                </h3>
                {service.metadata?.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {service.metadata.description}
                  </p>
                )}
              </div>

              {/* Service Features Preview */}
              {service.metadata?.features && (
                <div className="flex flex-wrap gap-1">
                  {service.metadata.features.slice(0, 3).map((feature: string, index: number) => (
                    <span key={index} className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded">
                      {feature}
                    </span>
                  ))}
                  {service.metadata.features.length > 3 && (
                    <span className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded">
                      +{service.metadata.features.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Price and Actions */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-xl font-bold text-blue-600">
                  ${(service.metadata?.price || 0).toFixed(2)}
                </div>
                <button
                  onClick={() => addToCart(convertServiceToProduct(service))}
                  className="px-4 py-2 text-sm btn-primary"
                >
                  Book Service
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && safeServices.length > 0 && (
        <div className="py-12 text-center">
          <Filter className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="mb-2 text-xl font-semibold text-gray-900">No services match your filters</h3>
          <p className="text-gray-600">Try adjusting your search criteria to see more results.</p>
        </div>
      )}
    </div>
  )
}