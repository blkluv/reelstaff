'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { CartItem as CartItemType } from '@/types'
import { Minus, Plus, X, Package } from 'lucide-react'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id)
      return
    }

    setIsUpdating(true)
    try {
      updateQuantity(item.id, newQuantity)
    } finally {
      setIsUpdating(false)
    }
  }

  const imageUrl = item.product.metadata?.featured_image?.imgix_url
    ? `${item.product.metadata.featured_image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`
    : 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&auto=format,compress'

  return (
    <div className="bg-white rounded-lg shadow-sm border border-secondary-100 p-6">
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <div className="w-20 h-20 bg-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={imageUrl}
            alt={item.product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-grow min-w-0">
          <h3 className="font-semibold text-secondary-900 mb-1 truncate">
            {item.product.title}
          </h3>
          
          {item.product.metadata?.sku && (
            <p className="text-sm text-secondary-500 mb-2">
              SKU: {item.product.metadata.sku}
            </p>
          )}

          <div className="flex items-center gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center border border-secondary-200 rounded-lg">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={isUpdating || item.quantity <= 1}
                className="p-2 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <span className="px-4 py-2 min-w-[60px] text-center font-medium">
                {item.quantity}
              </span>
              
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isUpdating}
                className="p-2 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Stock Status */}
            {item.product.metadata?.stock_quantity !== undefined && (
              <div className="flex items-center gap-1 text-sm">
                <Package className="w-4 h-4 text-secondary-400" />
                <span className="text-secondary-600">
                  {item.product.metadata.stock_quantity > 0 
                    ? `${item.product.metadata.stock_quantity} in stock`
                    : 'Out of stock'
                  }
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Price & Remove */}
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => removeFromCart(item.id)}
            className="p-2 text-secondary-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Remove from cart"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="text-right">
            <div className="font-semibold text-secondary-900">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <div className="text-sm text-secondary-500">
              ${item.price.toFixed(2)} each
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}