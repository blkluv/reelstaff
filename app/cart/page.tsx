'use client'

import { useCart } from '@/contexts/CartContext'
import CartItem from '@/components/CartItem'
import Link from 'next/link'
import { ShoppingCart, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const { items, total, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-secondary-50 section-padding">
        <div className="container-max">
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-secondary-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-secondary-900 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-lg text-secondary-600 mb-8">
              Add some products to your cart to get started.
            </p>
            <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50 section-padding">
      <div className="container-max">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-secondary-600">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Shipping</span>
                  <span className="text-sm text-secondary-500">Calculated at checkout</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link 
                href="/checkout" 
                className="btn-primary w-full mt-6 text-center block"
              >
                Proceed to Checkout
              </Link>
              
              <Link 
                href="/shop" 
                className="btn-outline w-full mt-3 text-center block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}