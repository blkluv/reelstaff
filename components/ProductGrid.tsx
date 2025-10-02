'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext' // You'll need to update this context too
import { Product, ProductFilter } from '@/types' // Update these types
import { Clock, FileText, Zap, Star, Filter, Eye } from 'lucide-react'

interface ServiceGridProps {
  services: Product[] // Should be Service[] type
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function ServiceGrid({ services, searchParams }: ServiceGridProps) {
  const { addToCart } = useCart() // This will need to be updated for services
  const [sortBy, setSortBy] = useState('newest')

  // Build filter object from search params - UPDATED FOR SERVICES
  const filters: ProductFilter = {
    category: typeof searchParams.category === 'string' ? searchParams.category : undefined,
    minPrice: typeof searchParams.minPrice === 'string' ? parseFloat(searchParams.minPrice) : undefined,
    maxPrice: typeof searchParams.maxPrice === 'string' ? parseFloat(searchParams.maxPrice) : undefined,
    deliveryTime: typeof searchParams.deliveryTime === 'string' ? searchParams.deliveryTime : undefined,
    serviceType: typeof searchParams.serviceType === 'string' ? searchParams.serviceType : undefined,
    search: typeof searchParams.search === 'string' ? searchParams.search : undefined,
  }

  // Filter and sort services - UPDATED FOR SERVICES
  const filteredServices = useMemo(() => {
    let filtered = services.filter((service) => {
      // Category filter
      if (filters.category && service.metadata?.category?.slug !== filters.category) {
        return false
      }

      // Price range filter
      const price = service.metadata?.price || 0
      if (filters.minPrice && price < filters.minPrice) return false
      if (filters.maxPrice && price > filters.maxPrice) return false

      // Delivery time filter - NEW
      if (filters.deliveryTime && service.metadata?.delivery_time !== filters.deliveryTime) {
        return false
      }

      // Service type filter - NEW
      if (filters.serviceType && service.metadata?.service_type !== filters.serviceType) {
        return false
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const searchableContent = [
          service.title,
          service.metadata?.description || '',
          service.metadata?.category?.title || '',
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
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'delivery-fast': // NEW SORT OPTION
        // Sort by delivery time (you'll need a delivery time numeric value)
        filtered.sort((a, b) => (a.metadata?.delivery_days || 999) - (b.metadata?.delivery_days || 999))
        break
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
    }

    return filtered
  }, [services, filters, sortBy])

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredServices.length} of {services.length} services
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
          <option value="delivery-fast">Fastest Delivery</option> {/* NEW */}
        </select>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="group card hover:shadow-lg transition-all duration-200">
            {/* Service Image */}
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={
                  service.metadata?.featured_image?.imgix_url
                    ? `${service.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`
                    : '/default-service-image.jpg' // Add a default service image
                }
                alt={service.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Delivery Time Badge - REPLACES STOCK STATUS */}
              <div className="absolute top-2 left-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {service.metadata?.delivery_time || 'Custom'}
                </span>
              </div>

              {/* Service Type Badge - NEW */}
              <div className="absolute top-2 right-2">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
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
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                <Link
                  href={`/services/${service.slug}`}
                  className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  title="View Details"
                >
                  <Eye className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => addToCart(service)} // This needs to be updated for services
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
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
                  <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                    {service.metadata.category.title}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-gray-900 mt-1 group-hover:text-blue-600 transition-colors duration-200">
                  {service.title}
                </h3>
                {service.metadata?.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {service.metadata.description}
                  </p>
                )}
              </div>

              {/* Service Features Preview - REPLACES TECHNICAL SPECS */}
              {service.metadata?.features && (
                <div className="flex flex-wrap gap-1">
                  {service.metadata.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                  {service.metadata.features.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
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
                  onClick={() => addToCart(service)} // This needs to be updated for services
                  className="btn-primary text-sm px-4 py-2"
                >
                  Book Service
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && services.length > 0 && (
        <div className="text-center py-12">
          <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No services match your filters</h3>
          <p className="text-gray-600">Try adjusting your search criteria to see more results.</p>
        </div>
      )}
    </div>
  )
}
