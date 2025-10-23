import HeroSection from '@/components/HeroSection'
import ServiceCategories from '@/components/ServiceCategories'
import FeaturedServices from '@/components/FeaturedServices'
import ServiceStandards from '@/components/ServiceStandards'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import { getCategories, getServices } from '@/lib/cosmic'
import { normalizeServices } from "@/lib/safeNormalize";

export default async function HomePage() {
  const [categoriesResult, servicesResult] = await Promise.allSettled([
    getCategories(),
    getServices(),
  ]);

  const categories =
    categoriesResult.status === "fulfilled" ? categoriesResult.value : [];
  const servicesRaw =
    servicesResult.status === "fulfilled" ? servicesResult.value : [];

  // 🚀 This guarantees metadata.features is always an array
  const services = normalizeServices(servicesRaw);

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
