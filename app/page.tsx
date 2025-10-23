import HeroSection from '@/components/HeroSection'
import ServiceCategories from '@/components/ServiceCategories'
import FeaturedServices from '@/components/FeaturedServices'
import ServiceStandards from '@/components/ServiceStandards'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import { getCategories, getServices } from '@/lib/cosmic'

export default async function HomePage() {
  const [categoriesResult, servicesResult] = await Promise.allSettled([
    getCategories(),
    getServices(),
  ]);

  const categories =
    categoriesResult.status === "fulfilled" ? categoriesResult.value : [];
  
  const servicesRaw =
    servicesResult.status === "fulfilled" ? servicesResult.value : [];

  // 🛠️ FIX: Safe service normalization without the missing import
  const services = Array.isArray(servicesRaw) 
    ? servicesRaw.map(service => ({
        ...service,
        metadata: {
          ...service.metadata,
          // Ensure features is always an array
          features: Array.isArray(service.metadata?.features) 
            ? service.metadata.features 
            : []
        }
      }))
    : [];

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServiceCategories categories={categories} />
      <FeaturedServices services={services} />
      <ServiceStandards verifications={[]} />
      <AboutSection />
      <ContactSection />
    </div>
  );
}