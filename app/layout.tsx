import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RFP.AUCTION - Blockchain-Powered RFP Platform',
  description: 'Transform your procurement process with blockchain-verified RFP services, smart contract payments, and transparent auction solutions.',
  keywords: 'RFP, auction, blockchain, procurement, smart contracts, vendor management, bidding',
  authors: [{ name: 'RFP.AUCTION' }],
  openGraph: {
    title: 'RFP.AUCTION - Blockchain-Powered RFP Platform',
    description: 'Transform your procurement process with blockchain-verified RFP services, smart contract payments, and transparent auction solutions.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rfp.auction',
    siteName: 'RFP.AUCTION',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=630&fit=crop&auto=format',
        width: 1200,
        height: 630,
        alt: 'RFP.AUCTION Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RFP.AUCTION - Blockchain-Powered RFP Platform',
    description: 'Transform your procurement process with blockchain-verified RFP services, smart contract payments, and transparent auction solutions.',
    images: ['https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=630&fit=crop&auto=format'],
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Remove or comment out the console capture script to fix hydration errors */}
        {/* <script src="/dashboard-console-capture.js" /> */}
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
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