'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import CheckoutForm from '@/components/CheckoutForm'
import OrderSummary from '@/components/OrderSummary'
import { CheckoutFormData } from '@/types'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isClientMounted, setIsClientMounted] = useState(false)

  // Ensure component is mounted on client before checking cart
  useEffect(() => {
    setIsClientMounted(true)
  }, [])

  // Handle empty cart redirect after client mount
  useEffect(() => {
    if (isClientMounted && items.length === 0) {
      router.push('/cart')
    }
  }, [isClientMounted, items.length, router])

  // Show loading during SSR and before client mount
  if (!isClientMounted) {
    return (
      <div className="min-h-screen bg-secondary-50 section-padding">
        <div className="container-max">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-secondary-600">Loading checkout...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show loading if cart is empty and we're about to redirect
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-secondary-50 section-padding">
        <div className="container-max">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-secondary-600">Redirecting to cart...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleCheckout = async (formData: CheckoutFormData) => {
    setIsLoading(true)
    
    try {
      const orderData = {
        customer_name: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        address: formData.address,
        items: items,
        subtotal: total,
        total: total, // Add tax/shipping calculation here
        payment_method: formData.paymentMethod,
        payment_status: 'pending',
        status: 'pending',
        notes: formData.notes
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const order = await response.json()
      
      // Handle payment processing
      if (formData.paymentMethod === 'card') {
        // Redirect to payment processing
        router.push(`/payment/${order.id}`)
      } else {
        // For other payment methods, show confirmation
        clearCart()
        router.push(`/order-confirmation/${order.id}`)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('There was an error processing your order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-secondary-50 section-padding">
      <div className="container-max">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <CheckoutForm onSubmit={handleCheckout} isLoading={isLoading} />
          </div>

          {/* Order Summary */}
          <div>
            <OrderSummary items={items} total={total} />
          </div>
        </div>
      </div>
    </div>
  )
}