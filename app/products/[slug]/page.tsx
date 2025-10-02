// app/services/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ServiceDetails from '@/components/ServiceDetails'
import { getServiceBySlug, getServices } from '@/lib/cosmic'
import { Service } from '@/types' // Import Service, not Product

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found - RFP.AUCTION',
    }
  }

  const title = `${service.title} - RFP.AUCTION`
  const description = service.metadata?.description || `Professional ${service.title} service from RFP.AUCTION`
  const image = service.metadata?.featured_image?.imgix_url 
    ? `${service.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format`
    : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&auto=format'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: service.title }],
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
  const services = await getServices()
  
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <ServiceDetails service={service} />
    </div>
  )
}