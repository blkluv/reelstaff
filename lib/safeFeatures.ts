import { Service } from "@/types";

/**
 * Always returns a string[] for service metadata.features
 */
export function safeFeatures(service: Partial<Service>): string[] {
  const metadata = service.metadata ?? {};
  let features: unknown = metadata.features;

  if (Array.isArray(features)) {
    return features.filter(
      (x: unknown): x is string => typeof x === "string" && x.trim() !== ""
    );
  } else if (typeof features === "string" && (features as string).trim() !== "") {
    return (features as string).split(",").map((s: string) => s.trim());
  }

  return [];
}
