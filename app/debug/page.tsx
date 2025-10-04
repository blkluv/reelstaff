// app/debug/page.tsx
import { debugCosmicData, getAllObjectTypes, getServices } from '@/lib/cosmic'

export default async function DebugPage() {
  await debugCosmicData()
  
  // Additional checks
  const services = await getServices()
  const allTypes = await getAllObjectTypes()

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Cosmic Debug Info</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Services Found:</h2>
          <pre>{JSON.stringify(services, null, 2)}</pre>
        </div>
        <div>
          <h2 className="text-lg font-semibold">All Object Types:</h2>
          <pre>{JSON.stringify(allTypes, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}