// app/debug/page.tsx
import { getServices, debugCosmicData, getAllObjectTypes } from '@/lib/cosmic'

export default async function DebugPage() {
  // Run debug helpers safely (they won't crash even if Cosmic env vars missing)
  await debugCosmicData?.()

  const services = await getServices()
  const allTypes = await getAllObjectTypes?.()

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">🧩 Cosmic Debug Info</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold">✅ Services Found:</h2>
          <pre className="p-4 overflow-x-auto text-sm bg-gray-100 rounded-lg">
            {JSON.stringify(services, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold">🗂 All Object Types:</h2>
          <pre className="p-4 overflow-x-auto text-sm bg-gray-100 rounded-lg">
            {JSON.stringify(allTypes, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
