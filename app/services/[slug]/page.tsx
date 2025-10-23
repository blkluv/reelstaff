// app/services/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ServiceDetails from '@/components/ServiceDetails'
import { getServiceBySlug, getServices } from '@/lib/cosmic'
import { Service } from '@/types'

/* 🧩 Safe Normalizer — prevents .map crashes */
function safeNormalize(service: Service): Service {
  if (!service) return {} as Service
  const m = (service.metadata ||= {} as any)

  let f: unknown = m.features
  if (Array.isArray(f)) {
    f = f.filter((x): x is string => typeof x === 'string' && x.trim() !== '')
  } else if (typeof f === 'string' && f.trim() !== '') {
    f = f.split(',').map((s: string) => s.trim())
  } else {
    f = []
  }

  return {
    ...service,
    metadata: {
      ...m,
      features: f as string[],
      description: typeof m.description === 'string' ? m.description : '',
      price:
        typeof m.price === 'number'
          ? m.price
          : Number(m.price) || 0,
      delivery_time:
        typeof m.delivery_time === 'string'
          ? m.delivery_time
          : 'N/A',
      service_type:
        typeof m.service_type === 'string'
          ? m.service_type
          : 'standard',
    },
  }
}

/* ✅ SEO Metadata */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const raw = await getServiceBySlug(slug)
  if (!raw) return { title: 'Service Not Found - RFP.AUCTION' }

  const service = safeNormalize(raw)

  const title = `${service.title} - RFP.AUCTION`
  const description =
    service.metadata?.description ||
    `Professional ${service.title} service from RFP.AUCTION`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}

/* ✅ Static Path Generation */
export async function generateStaticParams() {
  try {
    const services = await getServices()
    if (!services || services.length === 0) {
      console.log('📋 No services found — using demo slugs')
      return [
        { slug: 'rfp-response-writing-service' },
        { slug: 'rfp-consultation' },
        { slug: 'proposal-development' },
      ]
    }

    return services.map((s) => ({ slug: s.slug }))
  } catch (err) {
    console.error('⚠️ Error fetching services:', err)
    return [
      { slug: 'rfp-response-writing-service' },
      { slug: 'rfp-consultation' },
      { slug: 'proposal-development' },
    ]
  }
}

/* ✅ Page Component */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  console.log('🎯 Rendering service detail page:', slug)

  const raw = await getServiceBySlug(slug)
  if (!raw) notFound()

  const service = safeNormalize(raw)
  console.log('✅ Normalized service:', service.title)

  return <ServiceDetails service={service} />
}
