'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { Product } from '@/types'
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  Shield, 
  Info, 
  Star, 
  CheckCircle,
  Plus,
  Minus,
  ArrowLeft,
  Share2
} from 'lucide-react'
import Link from 'next/link'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      addToCart(product, quantity)
      // Show success feedback (you could add a toast notification here)
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const images = product.metadata?.images || []
  const featuredImage = product.metadata?.featured_image
  const allImages = featuredImage ? [featuredImage, ...images] : images

  const mainImageUrl = allImages[selectedImage]?.imgix_url || featuredImage?.imgix_url
    ? `${allImages[selectedImage]?.imgix_url || featuredImage?.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`
    : 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format,compress'

  const price = product.metadata?.price || 0
  const stock = product.metadata?.stock_quantity
  const isInStock = stock === undefined || stock > 0

  const specs = product.metadata?.technical_specs || {}

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-secondary-50 py-4">
        <div className="container-max">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-secondary-600 hover:text-primary-600">Home</Link>
            <span className="text-secondary-400">/</span>
            <Link href="/shop" className="text-secondary-600 hover:text-primary-600">Shop</Link>
            <span className="text-secondary-400">/</span>
            <span className="text-secondary-900 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-secondary-100 rounded-2xl overflow-hidden">
              <img
                src={mainImageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 bg-secondary-100 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary-600' : 'border-transparent hover:border-secondary-300'
                    }`}
                  >
                    <img
                      src={`${image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-4">
                {product.title}
              </h1>
              
              {product.metadata?.sku && (
                <p className="text-secondary-600 mb-2">
                  SKU: <span className="font-mono">{product.metadata.sku}</span>
                </p>
              )}

              {product.metadata?.description && (
                <p className="text-lg text-secondary-700 leading-relaxed">
                  {product.metadata.description}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-primary-600">
                ${price.toFixed(2)}
              </div>
              <div className="text-secondary-600">per meter</div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-secondary-600" />
              <span className={`font-medium ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
                {isInStock 
                  ? stock !== undefined 
                    ? `${stock} in stock`
                    : 'In stock'
                  : 'Out of stock'
                }
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-secondary-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-secondary-50 disabled:opacity-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-3 font-medium min-w-[80px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!isInStock || (stock !== undefined && quantity >= stock)}
                    className="p-3 hover:bg-secondary-50 disabled:opacity-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-sm text-secondary-600">
                  Total: <span className="font-semibold">${(price * quantity).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!isInStock || isAddingToCart}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAddingToCart ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
                
                <button className="btn-outline px-4">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-secondary-50 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-medium text-secondary-900">Quality Assured</div>
                  <div className="text-sm text-secondary-600">ISO certified</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-secondary-50 rounded-lg">
                <Truck className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-medium text-secondary-900">Fast Shipping</div>
                  <div className="text-sm text-secondary-600">2-3 business days</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-secondary-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-medium text-secondary-900">Warranty</div>
                  <div className="text-sm text-secondary-600">2 year coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        {Object.keys(specs).length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-secondary-900 mb-8 flex items-center gap-2">
              <Info className="w-6 h-6 text-primary-600" />
              Technical Specifications
            </h2>
            
            <div className="bg-secondary-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="bg-white p-4 rounded-lg">
                    <div className="font-medium text-secondary-900 capitalize mb-1">
                      {key.replace(/_/g, ' ')}
                    </div>
                    <div className="text-secondary-700">
                      {value as string}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Back to Shop */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="btn-outline inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  )
}