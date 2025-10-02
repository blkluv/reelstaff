'use client'

import { useState, useEffect } from 'react'

export default function CosmicBadge({ bucketSlug }: { bucketSlug: string }) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Show badge after a short delay and check if previously dismissed
    const isDismissed = localStorage.getItem('cosmic-badge-dismissed')
    if (!isDismissed) {
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])
  
  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('cosmic-badge-dismissed', 'true')
  }
  
  if (!isVisible) return null
  
  return (
    <a
      href={`https://luvnft.com`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 flex items-center gap-2 text-sm font-medium text-gray-800 no-underline transition-colors duration-200 bottom-5 right-5"
      style={{
        position: 'fixed',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        padding: '12px 16px',
        width: '180px'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleDismiss()
        }}
        className="absolute z-10 flex items-center justify-center w-6 h-6 text-sm font-bold text-gray-800 transition-colors duration-200 bg-gray-100 rounded-full -top-2 -right-2 hover:bg-gray-200"
        aria-label="Dismiss badge"
      >
        ×
      </button>
      
      <img 
        src="https://app.luvnft.com/wp-content/uploads/2025/09/tokenopoly.png" 
        alt="Cosmic Logo" 
        className="w-5 h-5"
      />
      Powered by LUV NFT
    </a>
  )
}