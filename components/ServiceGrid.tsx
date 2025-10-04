'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { Service, ProductFilter, Product } from '@/types'
import { Clock, FileText, Star, Filter, Eye, Tag, CheckCircle } from 'lucide-react'

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
        technical_specs: {},
        sku: `SVC-${service.slug}`,
        weight: 0,
        dimensions: 'N/A',
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

  // Ensure services is always an array with proper validation
  const safeServices = useMemo(() => {
    if (!Array.isArray(services)) return []
    
    return services.filter(service => {
      const isValid = service && service.id && service.slug && service.title
      return isValid
    })
  }, [services])

  // Build filter object from search params
  const filters: ProductFilter = {
    category: typeof searchParams.category === 'string' ? searchParams.category : undefined,
    minPrice: typeof searchParams.minPrice === 'string' ? parseFloat(searchParams.minPrice) : undefined,
    maxPrice: typeof searchParams.maxPrice === 'string' ? parseFloat(searchParams.maxPrice) : undefined,
    deliveryTime: typeof searchParams.deliveryTime === 'string' ? searchParams.deliveryTime : undefined,
    serviceType: typeof searchParams.serviceType === 'string' ? searchParams.serviceType : undefined,
    search: typeof searchParams.search === 'string' ? searchParams.search : undefined,
    tags: typeof searchParams.tags === 'string' ? searchParams.tags.split(',') : undefined,
  }

  // Filter and sort services
  const filteredServices = useMemo(() => {
    if (!Array.isArray(safeServices) || safeServices.length === 0) {
      return []
    }

    let filtered = safeServices.filter((service) => {
      // Category filter
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

      // Tags filter
      if (filters.tags && filters.tags.length > 0) {
        const serviceTags = service.metadata?.tags || []
        const hasMatchingTag = filters.tags.some(tag => serviceTags.includes(tag))
        if (!hasMatchingTag) return false
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const categoryTitle = typeof service.metadata?.category === 'string' 
          ? service.metadata.category 
          : service.metadata?.category?.title || '';
        
        const serviceTags = service.metadata?.tags || []
        const tagsString = serviceTags.join(' ')
        
        const searchableContent = [
          service.title,
          service.metadata?.description || '',
          service.metadata?.excerpt || '',
          categoryTitle,
          service.metadata?.service_type || '',
          tagsString,
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
      case 'featured':
        filtered.sort((a, b) => (b.metadata?.featured ? 1 : 0) - (a.metadata?.featured ? 1 : 0))
        break
      case 'delivery-fast':
        filtered.sort((a, b) => {
          const getDeliveryDays = (service: Service) => {
            if (!service.metadata?.delivery_time) return 1000
            const time = service.metadata.delivery_time.toLowerCase()
            if (time.includes('1-2') || time.includes('24')) return 1
            if (time.includes('3-5')) return 3
            if (time.includes('7-10')) return 7
            if (time.includes('14')) return 14
            return 1000
          }
          return getDeliveryDays(a) - getDeliveryDays(b)
        })
        break
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
        break
    }

    return filtered
  }, [safeServices, filters, sortBy])

  // Handle service click with validation
  const handleServiceClick = (service: Service, e: React.MouseEvent) => {
    if (!service.slug) {
      e.preventDefault()
      console.error('Cannot navigate: Service missing slug', service)
      return
    }
  }

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-gray-600">
          Showing {filteredServices.length} of {safeServices.length} services
        </p>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field max-w-48"
          >
            <option value="newest">Newest First</option>
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
            <option value="delivery-fast">Fastest Delivery</option>
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredServices.map((service) => {
          const serviceLink = `/services/${service.slug}`
          const imageUrl = service.metadata?.featured_image?.imgix_url
            ? `${service.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`
            : '/default-service-image.jpg'
          
          const excerpt = service.metadata?.excerpt || service.metadata?.description?.substring(0, 120) + '...'
          const tags = service.metadata?.tags || []
          const features = service.metadata?.features || []
          const isFeatured = service.metadata?.featured

          return (
            <div key={service.id} className={`transition-all duration-200 group card hover:shadow-lg ${isFeatured ? 'ring-2 ring-yellow-400' : ''}`}>
              {/* Service Image with Link */}
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <Link href={serviceLink} onClick={(e) => handleServiceClick(service, e)}>
                  <img
                    src={imageUrl}
                    alt={service.title}
                    className="object-cover w-full h-48 transition-transform duration-300 cursor-pointer group-hover:scale-105"
                  />
                </Link>
                
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="absolute top-2 left-2">
                    <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </span>
                  </div>
                )}

                {/* Delivery Time Badge */}
                <div className="absolute top-2 right-2">
                  <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded">
                    <Clock className="w-3 h-3" />
                    {service.metadata?.delivery_time || 'Custom'}
                  </span>
                </div>

                {/* Service Type Badge */}
                {service.metadata?.service_type && (
                  <div className="absolute bottom-2 left-2">
                    <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded">
                      {service.metadata.service_type}
                    </span>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute inset-0 flex items-center justify-center space-x-2 transition-opacity duration-200 opacity-0 bg-black/60 group-hover:opacity-100">
                  <Link
                    href={serviceLink}
                    onClick={(e) => handleServiceClick(service, e)}
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
                  {/* Category */}
                  {service.metadata?.category && (
                    <span className="text-xs font-medium tracking-wider text-blue-600 uppercase">
                      {typeof service.metadata.category === 'string' 
                        ? service.metadata.category 
                        : service.metadata.category.title}
                    </span>
                  )}
                  
                  {/* Title */}
                  <Link href={serviceLink} onClick={(e) => handleServiceClick(service, e)}>
                    <h3 className="mt-1 text-lg font-semibold text-gray-900 transition-colors duration-200 cursor-pointer group-hover:text-blue-600 line-clamp-2">
                      {service.title}
                    </h3>
                  </Link>
                  
                  {/* Excerpt/Description */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {excerpt}
                  </p>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {tags.slice(0, 3).map((tag: string, index: number) => (
                      <span key={index} className="flex items-center gap-1 px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                    {tags.length > 3 && (
                      <span className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded">
                        +{tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Key Features Preview */}
                {features.length > 0 && (
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-gray-700 uppercase">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {features.slice(0, 2).map((feature: string, index: number) => (
                        <span key={index} className="flex items-center gap-1 px-2 py-1 text-xs text-green-700 rounded bg-green-50">
                          <CheckCircle className="w-3 h-3" />
                          {feature}
                        </span>
                      ))}
                      {features.length > 2 && (
                        <span className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded">
                          +{features.length - 2} more
                        </span>
                      )}
                    </div>
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
          )
        })}
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