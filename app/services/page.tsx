// app/services/page.tsx - SERVICES LIST PAGE (SHOWS ALL SERVICES)
import { Suspense } from 'react'
import ServiceGrid from '@/components/ServiceGrid'
import ProductFilters from '@/components/ServiceFilters'
import { getServices, getCategories } from '@/lib/cosmic'

export const metadata = {
  title: 'Services - RFP.AUCTION',
  description: 'Browse our complete range of professional RFP services and auction solutions.',
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  
  console.log('🔄 Loading SERVICES LIST page...')
  
  // Get ALL services for the grid
  const [services, categories] = await Promise.allSettled([
    getServices(), // This gets ALL services
    getCategories()
  ])

  const servicesData = services.status === 'fulfilled' ? services.value : []
  const categoriesData = categories.status === 'fulfilled' ? categories.value : []

  console.log('✅ Services list loaded with', servicesData.length, 'services')

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-max section-padding">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-secondary-900">
            Our Services
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-secondary-600">
            Browse our comprehensive range of professional RFP services and auction solutions 
            tailored to meet your procurement needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div className="bg-white rounded-lg animate-pulse h-96"></div>}>
              <ProductFilters categories={categoriesData} />
            </Suspense>
          </div>

          {/* Services Grid */}
          <div className="lg:col-span-3">
            <Suspense fallback={
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg animate-pulse h-80"></div>
                ))}
              </div>
            }>
              <ServiceGrid services={servicesData} searchParams={params} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}