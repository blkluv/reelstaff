import HeroSection from '@/components/HeroSection'
import ServiceCategories from '@/components/ServiceCategories'
import FeaturedServices from '@/components/FeaturedServices'
import ServiceStandards from '@/components/ServiceStandards'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import { getCategories, getActiveServices, getCertifications } from '@/lib/cosmic'

export default async function HomePage() {
  const [categories, activeServices, certifications] = await Promise.allSettled([
    getCategories(),
    getActiveServices(),
    getCertifications()
  ])

  const categoriesData = categories.status === 'fulfilled' ? categories.value : []
  const activeServicesData = activeServices.status === 'fulfilled' ? activeServices.value : []
  const certificationsData = certifications.status === 'fulfilled' ? certifications.value : []

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServiceCategories categories={categoriesData} />
      <FeaturedServices services={activeServicesData} />
      <ServiceStandards certifications={certificationsData} />
      <AboutSection />
      <ContactSection />
    </div>
  )
}
