import HeroSection from '@/components/HeroSection'
import ServiceCategories from '@/components/ServiceCategories'
import FeaturedServices from '@/components/FeaturedServices'
import ServiceStandards from '@/components/ServiceStandards'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import { getCategories, getServices } from '@/lib/cosmic' // Remove getCertifications

export default async function HomePage() {
  const [categories, services] = await Promise.allSettled([
    getCategories(),
    getServices(), // Changed from getActiveServices
  ])

  const categoriesData = categories.status === 'fulfilled' ? categories.value : []
  const servicesData = services.status === 'fulfilled' ? services.value : []

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