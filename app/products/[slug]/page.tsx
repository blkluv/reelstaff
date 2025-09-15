// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ProductDetails from '@/components/ProductDetails'
import { getProductBySlug, getProducts } from '@/lib/cosmic'
import { Product } from '@/types'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug) as Product | null

  if (!product) {
    return {
      title: 'Product Not Found - Nafees Cables',
    }
  }

  const title = `${product.title} - Nafees Cables`
  const description = product.metadata?.description || `High-quality ${product.title} from Nafees Cables`
  const image = product.metadata?.featured_image?.imgix_url 
    ? `${product.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format`
    : 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=630&fit=crop&auto=format'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: product.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export async function generateStaticParams() {
  const products = await getProducts()
  
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug) as Product | null

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <ProductDetails product={product} />
    </div>
  )
}