import { Service } from "@/types";

/**
 * ✅ Normalizes any Service object so it never breaks rendering.
 */
export function normalizeService(service: Partial<Service>): Service {
  const metadata = service.metadata ?? {};

  // Safely normalize `features`
  let features: unknown = metadata.features;

  if (Array.isArray(features)) {
    features = features.filter(
      (x: unknown): x is string => typeof x === "string" && x.trim() !== ""
    );
  } else if (typeof features === "string" && (features as string).trim() !== "") {
    features = (features as string).split(",").map((s: string) => s.trim());
  } else {
    features = [];
  }

  return {
    id: service.id || crypto.randomUUID(),
    slug: service.slug || "unknown-service",
    title: service.title || "Untitled Service",
    type: service.type || "rfp-services",
    created_at: service.created_at || new Date().toISOString(),
    modified_at: service.modified_at || new Date().toISOString(),
    metadata: {
      ...metadata,
      features,
      description: metadata.description || "",
      delivery_time: metadata.delivery_time || "N/A",
      price:
        typeof metadata.price === "number"
          ? metadata.price
          : Number(metadata.price) || 0,
      service_type: metadata.service_type || "standard",
      featured_image: metadata.featured_image || {},
    },
  } as Service;
}

/**
 * ✅ Normalizes an array of services (safe even if input is invalid).
 */
export function normalizeServices(services: any[]): Service[] {
  if (!Array.isArray(services)) return [];
  return services.map(normalizeService);
}
