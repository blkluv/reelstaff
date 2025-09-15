'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { Product, ProductFilter } from '@/types'
import { ShoppingCart, Eye, Star, Filter } from 'lucide-react'

interface ProductGridProps {
  products: Product[]
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function ProductGrid({ products, searchParams }: ProductGridProps) {
  const { addToCart } = useCart()
  const [sortBy, setSortBy] = useState('newest')

  // Build filter object from search params
  const filters: ProductFilter = {
    category: typeof searchParams.category === 'string' ? searchParams.category : undefined,
    minPrice: typeof searchParams.minPrice === 'string' ? parseFloat(searchParams.minPrice) : undefined,
    maxPrice: typeof searchParams.maxPrice === 'string' ? parseFloat(searchParams.maxPrice) : undefined,
    usageType: typeof searchParams.usageType === 'string' ? searchParams.usageType : undefined,
    inStock: searchParams.inStock === 'true',
    search: typeof searchParams.search === 'string' ? searchParams.search : undefined,
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Category filter
      if (filters.category && product.metadata?.category?.slug !== filters.category) {
        return false
      }

      // Price range filter
      const price = product.metadata?.price || 0
      if (filters.minPrice && price < filters.minPrice) return false
      if (filters.maxPrice && price > filters.maxPrice) return false

      // Usage type filter
      if (filters.usageType && product.metadata?.usage_type !== filters.usageType) {
        return false
      }

      // Stock filter
      if (filters.inStock && (product.metadata?.stock_quantity || 0) <= 0) {
        return false
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const searchableContent = [
          product.title,
          product.metadata?.description || '',
          product.metadata?.category?.title || '',
        ].join(' ').toLowerCase()
        
        if (!searchableContent.includes(searchTerm)) {
          return false
        }
      }

      return true
    })

    // Sort products
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
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
    }

    return filtered
  }, [products, filters, sortBy])

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <Filter className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-secondary-900 mb-2">No products found</h3>
        <p className="text-secondary-600">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex justify-between items-center">
        <p className="text-secondary-600">
          Showing {filteredProducts.length} of {products.length} products
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
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group card hover:shadow-lg transition-all duration-200">
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={
                  product.metadata?.featured_image?.imgix_url
                    ? `${product.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`
                    : 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&auto=format'
                }
                alt={product.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Stock Status */}
              <div className="absolute top-2 left-2">
                {(product.metadata?.stock_quantity || 0) > 0 ? (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Featured Badge */}
              {product.metadata?.featured && (
                <div className="absolute top-2 right-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
              )}

              {/* Quick Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                <Link
                  href={`/products/${product.slug}`}
                  className="bg-white text-secondary-900 p-2 rounded-full hover:bg-secondary-100 transition-colors duration-200"
                  title="View Details"
                >
                  <Eye className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  disabled={(product.metadata?.stock_quantity || 0) <= 0}
                  className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Add to Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              <div>
                {product.metadata?.category && (
                  <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">
                    {product.metadata.category.title}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-secondary-900 mt-1 group-hover:text-primary-600 transition-colors duration-200">
                  {product.title}
                </h3>
                {product.metadata?.description && (
                  <p className="text-sm text-secondary-600 line-clamp-2">
                    {product.metadata.description}
                  </p>
                )}
              </div>

              {/* Technical Specs Preview */}
              {product.metadata?.technical_specs && (
                <div className="flex flex-wrap gap-1">
                  {product.metadata.technical_specs.voltage && (
                    <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
                      {product.metadata.technical_specs.voltage}
                    </span>
                  )}
                  {product.metadata.technical_specs.size && (
                    <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
                      {product.metadata.technical_specs.size}
                    </span>
                  )}
                </div>
              )}

              {/* Price and Actions */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-xl font-bold text-primary-600">
                  ${(product.metadata?.price || 0).toFixed(2)}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  disabled={(product.metadata?.stock_quantity || 0) <= 0}
                  className="btn-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && products.length > 0 && (
        <div className="text-center py-12">
          <Filter className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-secondary-900 mb-2">No products match your filters</h3>
          <p className="text-secondary-600">Try adjusting your search criteria to see more results.</p>
        </div>
      )}
    </div>
  )
}