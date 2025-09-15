import HeroSection from '@/components/HeroSection'
import ProductCategories from '@/components/ProductCategories'
import FeaturedProducts from '@/components/FeaturedProducts'
import QualityCertifications from '@/components/QualityCertifications'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import { getCategories, getFeaturedProducts, getCertifications } from '@/lib/cosmic'

export default async function HomePage() {
  const [categories, featuredProducts, certifications] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getCertifications()
  ])

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProductCategories categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <QualityCertifications certifications={certifications} />
      <AboutSection />
      <ContactSection />
    </div>
  )
}