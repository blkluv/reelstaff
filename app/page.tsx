import HeroSection from '@/components/HeroSection'
import ProductCategories from '@/components/ProductCategories'
import FeaturedProducts from '@/components/FeaturedProducts'
import QualityCertifications from '@/components/QualityCertifications'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import { getCategories, getFeaturedProducts, getCertifications } from '@/lib/cosmic'

export default async function HomePage() {
  // Fetch data with proper error handling to prevent build failures
  const [categories, featuredProducts, certifications] = await Promise.allSettled([
    getCategories(),
    getFeaturedProducts(),
    getCertifications()
  ])

  // Extract successful results, fallback to empty arrays for failed requests
  const categoriesData = categories.status === 'fulfilled' ? categories.value : []
  const featuredProductsData = featuredProducts.status === 'fulfilled' ? featuredProducts.value : []
  const certificationsData = certifications.status === 'fulfilled' ? certifications.value : []

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProductCategories categories={categoriesData} />
      <FeaturedProducts products={featuredProductsData} />
      <QualityCertifications certifications={certificationsData} />
      <AboutSection />
      <ContactSection />
    </div>
  )
}