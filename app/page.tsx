import HeroSection from '@/components/HeroSection'
import ServiceCategories from '@/components/ServiceCategories'
import FeaturedServices from '@/components/FeaturedServices'
import ServiceStandards from '@/components/ServiceStandards'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import { getCategories, getServices } from '@/lib/cosmic'

/* ---------------------------------------------
   Utility to deeply sanitize all fetched services
---------------------------------------------- */
function safeNormalizeServices(services: any[]): any[] {
  if (!Array.isArray(services)) return []

  return services.map((s) => {
    const metadata = s.metadata ?? {}

    // Ensure features is always an array
    let features = metadata.features
    if (Array.isArray(features)) {
      features = features.filter(
        (x: unknown): x is string => typeof x === 'string' && x.trim() !== ''
      )
    } else if (typeof features === 'string' && features.trim() !== '') {
      features = features.split(',').map((f: string) => f.trim())
    } else {
      features = []
    }

    return {
      ...s,
      metadata: {
        ...metadata,
        features,
        description: typeof metadata.description === 'string' ? metadata.description : '',
        delivery_time: typeof metadata.delivery_time === 'string' ? metadata.delivery_time : '',
        price:
          typeof metadata.price === 'number'
            ? metadata.price
            : Number(metadata.price) || 0,
      },
    }
  })
}

/* ---------------------------------------------
   Page Component
---------------------------------------------- */
export default async function HomePage() {
  const [categories, services] = await Promise.allSettled([
    getCategories(),
    getServices(),
  ])

  const categoriesData =
    categories.status === 'fulfilled' ? categories.value : []

  const rawServices = services.status === 'fulfilled' ? services.value : []
  const servicesData = safeNormalizeServices(rawServices)

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServiceCategories categories={categoriesData} />
      <FeaturedServices services={servicesData} />
      <ServiceStandards verifications={[]} />
      <AboutSection />
      <ContactSection />
    </div>
  )
}
