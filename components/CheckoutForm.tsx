'use client'

import { useState } from 'react'
import { CheckoutFormData } from '@/types'
import { CreditCard, Truck, Phone, Mail, Building2, MapPin } from 'lucide-react'

interface CheckoutFormProps {
  onSubmit: (formData: CheckoutFormData) => Promise<void>
  isLoading: boolean
}

export default function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: '',
    email: '',
    phone: '',
    company: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States'
    },
    paymentMethod: 'card',
    notes: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.address.street.trim()) {
      newErrors.street = 'Street address is required'
    }

    if (!formData.address.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!formData.address.state.trim()) {
      newErrors.state = 'State is required'
    }

    if (!formData.address.zip.trim()) {
      newErrors.zip = 'ZIP code is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Checkout error:', error)
    }
  }

  const updateFormData = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1]
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }

    // Clear error when user starts typing
    if (errors[field] || errors[field.split('.')[1]]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
        [field.split('.')[1]]: ''
      }))
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-secondary-100 p-6">
      <h2 className="text-xl font-semibold text-secondary-900 mb-6">
        Checkout Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-secondary-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary-600" />
            Customer Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-secondary-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="customerName"
                value={formData.customerName}
                onChange={(e) => updateFormData('customerName', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.customerName ? 'border-red-500' : 'border-secondary-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.customerName && (
                <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-secondary-700 mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Company name (optional)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2 flex items-center gap-1">
                <Mail className="w-4 h-4" />
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-secondary-300'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2 flex items-center gap-1">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-secondary-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary-600" />
            Shipping Address
          </h3>

          <div>
            <label htmlFor="street" className="block text-sm font-medium text-secondary-700 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              id="street"
              value={formData.address.street}
              onChange={(e) => updateFormData('address.street', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.street ? 'border-red-500' : 'border-secondary-300'
              }`}
              placeholder="123 Main Street"
            />
            {errors.street && (
              <p className="mt-1 text-sm text-red-600">{errors.street}</p>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="city" className="block text-sm font-medium text-secondary-700 mb-2">
                City *
              </label>
              <input
                type="text"
                id="city"
                value={formData.address.city}
                onChange={(e) => updateFormData('address.city', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.city ? 'border-red-500' : 'border-secondary-300'
                }`}
                placeholder="City"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-secondary-700 mb-2">
                State *
              </label>
              <input
                type="text"
                id="state"
                value={formData.address.state}
                onChange={(e) => updateFormData('address.state', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.state ? 'border-red-500' : 'border-secondary-300'
                }`}
                placeholder="CA"
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state}</p>
              )}
            </div>

            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-secondary-700 mb-2">
                ZIP Code *
              </label>
              <input
                type="text"
                id="zip"
                value={formData.address.zip}
                onChange={(e) => updateFormData('address.zip', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.zip ? 'border-red-500' : 'border-secondary-300'
                }`}
                placeholder="12345"
              />
              {errors.zip && (
                <p className="mt-1 text-sm text-red-600">{errors.zip}</p>
              )}
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-secondary-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary-600" />
            Payment Method
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-secondary-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={(e) => updateFormData('paymentMethod', e.target.value)}
                className="mr-3 text-primary-600"
              />
              <div>
                <div className="font-medium">Credit Card</div>
                <div className="text-sm text-secondary-600">Secure online payment</div>
              </div>
            </label>

            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-secondary-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === 'paypal'}
                onChange={(e) => updateFormData('paymentMethod', e.target.value)}
                className="mr-3 text-primary-600"
              />
              <div>
                <div className="font-medium">PayPal</div>
                <div className="text-sm text-secondary-600">Pay with PayPal</div>
              </div>
            </label>

            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-secondary-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="bank_transfer"
                checked={formData.paymentMethod === 'bank_transfer'}
                onChange={(e) => updateFormData('paymentMethod', e.target.value)}
                className="mr-3 text-primary-600"
              />
              <div>
                <div className="font-medium">Bank Transfer</div>
                <div className="text-sm text-secondary-600">Pay via bank transfer</div>
              </div>
            </label>
          </div>
        </div>

        {/* Order Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-secondary-700 mb-2">
            Order Notes (Optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            value={formData.notes}
            onChange={(e) => updateFormData('notes', e.target.value)}
            className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="Any special instructions for your order..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing Order...
            </>
          ) : (
            <>
              <Truck className="w-5 h-5" />
              Place Order
            </>
          )}
        </button>
      </form>
    </div>
  )
}