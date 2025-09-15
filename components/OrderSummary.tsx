import { CartItem } from '@/types'
import { Package, CreditCard, Truck, Shield } from 'lucide-react'

interface OrderSummaryProps {
  items: CartItem[]
  total: number
}

export default function OrderSummary({ items, total }: OrderSummaryProps) {
  const tax = total * 0.08 // 8% tax rate
  const shipping = total > 100 ? 0 : 15 // Free shipping over $100
  const finalTotal = total + tax + shipping

  return (
    <div className="bg-white rounded-lg shadow-sm border border-secondary-100 p-6 sticky top-4">
      <h2 className="text-xl font-semibold text-secondary-900 mb-6 flex items-center gap-2">
        <Package className="w-5 h-5 text-primary-600" />
        Order Summary
      </h2>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => {
          const imageUrl = item.product.metadata?.featured_image?.imgix_url
            ? `${item.product.metadata.featured_image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`
            : 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=80&fit=crop&auto=format,compress'

          return (
            <div key={item.id} className="flex items-center gap-3 py-3 border-b border-secondary-100 last:border-0">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={imageUrl}
                  alt={item.product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-grow min-w-0">
                <h4 className="font-medium text-secondary-900 text-sm truncate">
                  {item.product.title}
                </h4>
                <p className="text-xs text-secondary-600">
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              
              <div className="text-sm font-medium text-secondary-900">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>

      {/* Order Totals */}
      <div className="space-y-3 border-t border-secondary-100 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-secondary-600">Subtotal</span>
          <span className="font-medium">${total.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-secondary-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-secondary-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        {total > 100 && (
          <div className="flex items-center gap-1 text-sm text-green-600">
            <Truck className="w-4 h-4" />
            <span>Free shipping applied!</span>
          </div>
        )}
        
        <div className="border-t border-secondary-200 pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-secondary-700">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Secure checkout protected by SSL encryption</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-4 text-center">
        <p className="text-xs text-secondary-500 mb-2">We accept</p>
        <div className="flex justify-center items-center gap-2">
          <CreditCard className="w-5 h-5 text-secondary-400" />
          <span className="text-xs text-secondary-500">
            Credit Cards, PayPal, Bank Transfer
          </span>
        </div>
      </div>
    </div>
  )
}