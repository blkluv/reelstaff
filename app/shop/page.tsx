import { Suspense } from 'react'
import ProductGrid from '@/components/ProductGrid'
import ProductFilters from '@/components/ProductFilters'
import { getProducts, getCategories } from '@/lib/cosmic'

export const metadata = {
  title: 'Shop - Nafees Cables',
  description: 'Browse our complete range of electrical wires, power cables, communication cables, and specialized cables.',
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ])

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-max section-padding">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Our Products
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Browse our comprehensive range of high-quality electrical wires and cables
            for all your electrical needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-96"></div>}>
              <ProductFilters categories={categories} />
            </Suspense>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-lg h-80"></div>
              ))}
            </div>}>
              <ProductGrid products={products} searchParams={params} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}