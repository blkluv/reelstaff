'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@/types'
import { Filter, X, Search, DollarSign, Clock, Zap, FileText } from 'lucide-react'

interface ServiceFiltersProps {
  categories: Category[]
}

export default function ServiceFilters({ categories }: ServiceFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    deliveryTime: searchParams.get('deliveryTime') || '',
    serviceType: searchParams.get('serviceType') || ''
  })

  const deliveryTimes = [
    { value: '24h', label: '24-Hour Delivery' },
    { value: '3d', label: '3-Day Delivery' },
    { value: '1w', label: '1-Week Delivery' },
    { value: '2w', label: '2-Week Delivery' }
  ]

  const serviceTypes = [
    { value: 'template', label: 'Templates' },
    { value: 'writing', label: 'Writing Services' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'review', label: 'Review & Audit' },
    { value: 'emergency', label: 'Emergency Services' }
  ]

  useEffect(() => {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value.toString())
      }
    })

    const queryString = params.toString()
    const newUrl = queryString ? `/services?${queryString}` : '/services'
    
    router.push(newUrl, { scroll: false })
  }, [filters, router])

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      deliveryTime: '',
      serviceType: ''
    })
  }

const hasActiveFilters = Object.values(filters).some(value => 
  value && value !== '' && value !== 'false'
)

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="mb-6 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-full gap-2 btn-outline"
        >
          <Filter className="w-4 h-4" />
          Filters {hasActiveFilters && '(Active)'}
        </button>
      </div>

      {/* Filters Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white rounded-xl shadow-sm border border-gray-200 p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Filter className="w-5 h-5 text-blue-600" />
            Filter Services
          </h3>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
            >
              <X className="w-3 h-3" />
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-8">
          {/* Search */}
          <div>
            <label className="flex items-center block gap-2 mb-3 text-sm font-medium text-gray-700">
              <Search className="w-4 h-4" />
              Search Services
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              placeholder="Search RFP services, templates, consulting..."
              className="w-full px-4 py-2 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="flex items-center block gap-2 mb-3 text-sm font-medium text-gray-700">
              <FileText className="w-4 h-4" />
              Service Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="w-full px-4 py-2 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <label className="flex items-center block gap-2 mb-3 text-sm font-medium text-gray-700">
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
                className="px-3 py-2 text-sm transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => updateFilter('maxPrice', e.target.value)}
                placeholder="Max $"
                min="0"
                className="px-3 py-2 text-sm transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Delivery Time */}
          <div>
            <label className="flex items-center block gap-2 mb-3 text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4" />
              Delivery Time
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="deliveryTime"
                  value=""
                  checked={filters.deliveryTime === ''}
                  onChange={(e) => updateFilter('deliveryTime', e.target.value)}
                  className="mr-3 text-blue-600"
                />
                <span className="text-sm">Any Delivery Time</span>
              </label>
              {deliveryTimes.map((time) => (
                <label key={time.value} className="flex items-center">
                  <input
                    type="radio"
                    name="deliveryTime"
                    value={time.value}
                    checked={filters.deliveryTime === time.value}
                    onChange={(e) => updateFilter('deliveryTime', e.target.value)}
                    className="mr-3 text-blue-600"
                  />
                  <span className="text-sm">{time.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Service Type */}
          <div>
            <label className="flex items-center block gap-2 mb-3 text-sm font-medium text-gray-700">
              <Zap className="w-4 h-4" />
              Service Type
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="serviceType"
                  value=""
                  checked={filters.serviceType === ''}
                  onChange={(e) => updateFilter('serviceType', e.target.value)}
                  className="mr-3 text-blue-600"
                />
                <span className="text-sm">All Service Types</span>
              </label>
              {serviceTypes.map((type) => (
                <label key={type.value} className="flex items-center">
                  <input
                    type="radio"
                    name="serviceType"
                    value={type.value}
                    checked={filters.serviceType === type.value}
                    onChange={(e) => updateFilter('serviceType', e.target.value)}
                    className="mr-3 text-blue-600"
                  />
                  <span className="text-sm">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-gray-200">
              <h4 className="mb-2 text-sm font-medium text-gray-700">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {filters.search && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                    Search: "{filters.search}"
                    <button
                      onClick={() => updateFilter('search', '')}
                      className="hover:text-blue-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.category && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                    Category: {categories.find(c => c.slug === filters.category)?.title}
                    <button
                      onClick={() => updateFilter('category', '')}
                      className="hover:text-blue-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {(filters.minPrice || filters.maxPrice) && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                    Price: ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
                    <button
                      onClick={() => {
                        updateFilter('minPrice', '')
                        updateFilter('maxPrice', '')
                      }}
                      className="hover:text-blue-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.deliveryTime && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                    {deliveryTimes.find(t => t.value === filters.deliveryTime)?.label}
                    <button
                      onClick={() => updateFilter('deliveryTime', '')}
                      className="hover:text-blue-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.serviceType && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                    {serviceTypes.find(t => t.value === filters.serviceType)?.label}
                    <button
                      onClick={() => updateFilter('serviceType', '')}
                      className="hover:text-blue-600"
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
        <div className="pt-4 mt-6 border-t border-gray-200 lg:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full btn-primary"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  )
}
