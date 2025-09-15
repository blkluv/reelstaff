'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@/types'
import { Filter, X, Search, DollarSign, Package, Tag } from 'lucide-react'

interface ProductFiltersProps {
  categories: Category[]
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    usageType: searchParams.get('usageType') || '',
    inStock: searchParams.get('inStock') === 'true'
  })

  const usageTypes = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' }
  ]

  useEffect(() => {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        if (key === 'inStock' && value === true) {
          params.set(key, 'true')
        } else if (key !== 'inStock') {
          params.set(key, value.toString())
        }
      }
    })

    const queryString = params.toString()
    const newUrl = queryString ? `/shop?${queryString}` : '/shop'
    
    router.push(newUrl, { scroll: false })
  }, [filters, router])

  const updateFilter = (key: string, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      usageType: '',
      inStock: false
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== false
  )

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn-outline w-full flex items-center justify-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters {hasActiveFilters && '(Active)'}
        </button>
      </div>

      {/* Filters Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white rounded-xl shadow-sm border border-secondary-100 p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-secondary-900 flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary-600" />
            Filters
          </h3>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-secondary-600 hover:text-primary-600 flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-8">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-3 flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search Products
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              placeholder="Search by name, SKU, or description..."
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Price Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => updateFilter('minPrice', e.target.value)}
                placeholder="Min $"
                min="0"
                className="px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm"
              />
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => updateFilter('maxPrice', e.target.value)}
                placeholder="Max $"
                min="0"
                className="px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Usage Type */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-3">
              Usage Type
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="usageType"
                  value=""
                  checked={filters.usageType === ''}
                  onChange={(e) => updateFilter('usageType', e.target.value)}
                  className="mr-3 text-primary-600"
                />
                <span className="text-sm">All Types</span>
              </label>
              {usageTypes.map((type) => (
                <label key={type.value} className="flex items-center">
                  <input
                    type="radio"
                    name="usageType"
                    value={type.value}
                    checked={filters.usageType === type.value}
                    onChange={(e) => updateFilter('usageType', e.target.value)}
                    className="mr-3 text-primary-600"
                  />
                  <span className="text-sm">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* In Stock Only */}
          <div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => updateFilter('inStock', e.target.checked)}
                className="text-primary-600 rounded focus:ring-primary-500"
              />
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-secondary-600" />
                <span className="text-sm font-medium text-secondary-700">In Stock Only</span>
              </div>
            </label>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-secondary-200">
              <h4 className="text-sm font-medium text-secondary-700 mb-2">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {filters.search && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                    Search: "{filters.search}"
                    <button
                      onClick={() => updateFilter('search', '')}
                      className="hover:text-primary-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.category && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                    Category: {categories.find(c => c.slug === filters.category)?.title}
                    <button
                      onClick={() => updateFilter('category', '')}
                      className="hover:text-primary-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {(filters.minPrice || filters.maxPrice) && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                    Price: ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
                    <button
                      onClick={() => {
                        updateFilter('minPrice', '')
                        updateFilter('maxPrice', '')
                      }}
                      className="hover:text-primary-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.usageType && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                    {usageTypes.find(t => t.value === filters.usageType)?.label}
                    <button
                      onClick={() => updateFilter('usageType', '')}
                      className="hover:text-primary-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.inStock && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                    In Stock Only
                    <button
                      onClick={() => updateFilter('inStock', false)}
                      className="hover:text-primary-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Close button for mobile */}
        <div className="lg:hidden mt-6 pt-4 border-t border-secondary-200">
          <button
            onClick={() => setIsOpen(false)}
            className="btn-primary w-full"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  )
}