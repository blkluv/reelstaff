// app/services/[slug]/page.tsx - INDIVIDUAL SERVICE PAGE
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ServiceDetails from '@/components/ServiceDetails'
import { getServiceBySlug, getServices } from '@/lib/cosmic'

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  const title = `${service.title} - RFP.AUCTION`
  const description = service.metadata?.description || `Professional ${service.title} service from RFP.AUCTION`

  return {
    title,
    description,
  }
}

export async function generateStaticParams() {
  try {
    const services = await getServices()
    return services.map((service) => ({
      slug: service.slug,
    }))
  } catch (error) {
    return []
  }
}

export default async function ServiceDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  
  if (!service) {
    notFound()
  }

  return <ServiceDetails service={service} />
}