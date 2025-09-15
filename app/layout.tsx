import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nafees Cables - Powering Connections, Building Trust',
  description: 'Leading manufacturer of electrical wires and cables. Quality products for residential, commercial, and industrial applications.',
  keywords: 'electrical wires, power cables, communication cables, specialized cables, nafees cables',
  authors: [{ name: 'Nafees Cables' }],
  openGraph: {
    title: 'Nafees Cables - Powering Connections, Building Trust',
    description: 'Leading manufacturer of electrical wires and cables. Quality products for residential, commercial, and industrial applications.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nafeescables.com',
    siteName: 'Nafees Cables',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=630&fit=crop&auto=format',
        width: 1200,
        height: 630,
        alt: 'Nafees Cables',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nafees Cables - Powering Connections, Building Trust',
    description: 'Leading manufacturer of electrical wires and cables. Quality products for residential, commercial, and industrial applications.',
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=630&fit=crop&auto=format'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <CosmicBadge bucketSlug={bucketSlug} />
        </CartProvider>
      </body>
    </html>
  )
}