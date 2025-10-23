import { createBucketClient } from "@cosmicjs/sdk";
import { Service, Category } from "@/types";
// --- GLOBAL NORMALIZER: ensures every service is clean before render ---
function normalizeServiceMetadata(service: Service): Service {
  if (!service.metadata) service.metadata = {} as any;

  const m = service.metadata as any;

  // normalize features
  if (!Array.isArray(m.features)) {
    if (typeof m.features === "string" && m.features.trim() !== "") {
      m.features = m.features.split(",").map((s: string) => s.trim());
    } else {
      m.features = [];
    }
  }

  // normalize optional arrays
  if (!Array.isArray(m.images)) m.images = [];
  if (!Array.isArray(m.gallery)) m.gallery = [];

  // fallback for other expected fields
  if (typeof m.description !== "string") m.description = "";
  if (typeof m.delivery_time !== "string") m.delivery_time = "";
  if (typeof m.price !== "number") m.price = 0;

  return service;
}

// -------------------- COSMIC INIT --------------------
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// -------------------- HELPER --------------------
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === "object" && error !== null && "status" in error;
}

// -------------------- DEMO DATA --------------------
function getDemoServiceBySlug(slug: string): Service {
  const demoServices: Record<string, Service> = {
    "rfp-response-writing-service": {
      id: "demo-rfp-writing",
      title: "RFP Response Writing Service",
      slug: "rfp-response-writing-service",
      type: "rfp-services",
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      metadata: {
        description:
          "Professional RFP response writing to help you win government contracts.",
        price: 3500,
        delivery_time: "7-10 business days",
        category: "Writing Services",
        featured_image: {
          imgix_url:
            "https://imgix.cosmicjs.com/e9a89940-a06f-11f0-8c2f-71055d67fae4-wizard-of-hahz-rfp-ai-services.png",
        },
        features: [
          "Professional quality writing",
          "Industry-specific expertise",
          "Timely delivery guarantee",
          "Unlimited revisions",
          "Expert consultation included",
        ],
        process: "1) Consultation, 2) Drafting, 3) Review, 4) Delivery.",
      },
    },
    "rfp-consultation": {
      id: "demo-consultation",
      title: "RFP Consultation Service",
      slug: "rfp-consultation",
      type: "rfp-services",
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      metadata: {
        description: "Expert consultation to boost your RFP success rate.",
        price: 499,
        delivery_time: "3-5 business days",
        category: "Consultation",
        featured_image: {
          imgix_url:
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&auto=format",
        },
        features: [
          "Strategic bid analysis",
          "Competitive assessment",
          "Pricing strategy development",
          "Risk mitigation planning",
        ],
        process: "1) Analysis, 2) Review, 3) Strategy, 4) Roadmap.",
      },
    },
    "proposal-development": {
      id: "demo-proposal",
      title: "Proposal Development Service",
      slug: "proposal-development",
      type: "rfp-services",
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      metadata: {
        description: "Complete proposal development from idea to submission.",
        price: 1499,
        delivery_time: "10-14 business days",
        category: "Development",
        featured_image: {
          imgix_url:
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&auto=format",
        },
        features: [
          "End-to-end proposal development",
          "Custom graphics and design",
          "Compliance checking",
          "Submission management",
        ],
        process:
          "1) Gather requirements, 2) Write content, 3) Design, 4) QA, 5) Submit.",
      },
    },
  };

  return (
    demoServices[slug] || demoServices["rfp-response-writing-service"]
  ) as Service;
}

// -------------------- UTILITIES --------------------
export function getServiceImageUrl(service: Service): string {
  const fallback =
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format";

  const img = service.metadata?.featured_image;
  if (!img) return fallback;

  const url = img.imgix_url || img.url;
  if (!url) return fallback;

  return url.includes("imgix.net")
    ? `${url}?w=600&h=400&fit=crop&auto=format,compress`
    : url;
}

// -------------------- GET ALL SERVICES --------------------
export async function getServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({ type: "rfp-services" })
      .props([
        "id",
        "title",
        "slug",
        "metadata.description",
        "metadata.price",
        "metadata.delivery_time",
        "metadata.category",
        "metadata.featured_image",
        "metadata.features",
        "metadata.service_type",
        "metadata.featured",
        "created_at",
      ])
      .depth(1);

    const services = response.objects || [];

    // ✅ Normalize metadata.features to always be an array
    services.forEach((service: Service) => {
      if (service.metadata) {
        const f = service.metadata.features;

        if (Array.isArray(f)) {
          return;
        }

        if (typeof f === "string") {
          const str = f as string;
          if (str.trim() !== "") {
            service.metadata.features = str.split(",").map((s) => s.trim());
          } else {
            service.metadata.features = [];
          }
        } else {
          service.metadata.features = [];
        }
      }
    });

    // ✅ Sort newest first
    return services.sort((a: Service, b: Service) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    console.error("Error fetching RFP services:", error);
    return [];
  }
}

// -------------------- GET SINGLE SERVICE --------------------
export async function getServiceBySlug(slug: string): Promise<Service> {
  if (!slug || typeof slug !== "string") {
    console.error("❌ Invalid slug provided to getServiceBySlug:", slug);
    return getDemoServiceBySlug("unknown-service");
  }

  try {
    const response = await cosmic.objects
      .findOne({ type: "rfp-services", slug })
      .props([
        "id",
        "title",
        "slug",
        "metadata.description",
        "metadata.price",
        "metadata.delivery_time",
        "metadata.category",
        "metadata.featured_image",
        "metadata.features",
        "metadata.process",
      ])
      .depth(1);

    if (response.object) {
      console.log("✅ Found service in Cosmic:", response.object.title);

      if (response.object.metadata) {
        const m = response.object.metadata as any;

        // Normalize "features"
        if (!Array.isArray(m.features)) {
          if (typeof m.features === "string" && m.features.trim() !== "") {
            m.features = [m.features];
          } else {
            m.features = [];
          }
        }

        if (!Array.isArray(m.images)) m.images = [];
        if (!Array.isArray(m.gallery)) m.gallery = [];
      }

      return response.object as Service;
    }
  } catch (error) {
    if (hasStatus(error) && error.status === 404)
      console.log("⚠️ Cosmic 404 - Service not found:", slug);
    else console.error("Error fetching RFP service:", error);
  }

  console.log("🔄 Using demo data for:", slug);
  return getDemoServiceBySlug(slug);
}

// -------------------- FEATURED --------------------
export async function getFeaturedServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: "rfp-services",
        "metadata.featured": true,
      })
      .props([
        "id",
        "title",
        "slug",
        "metadata.description",
        "metadata.price",
        "metadata.delivery_time",
        "metadata.category",
        "metadata.featured_image",
        "metadata.features",
        "metadata.excerpt",
        "metadata.service_type",
        "metadata.featured",
        "created_at",
      ])
      .depth(1);

    const featured = response.objects || [];
    featured.forEach((s: Service) => {
      const m = s.metadata as any;
      if (!Array.isArray(m.features)) m.features = [];
    });
    return featured;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    console.error("Error fetching featured RFP services:", error);
    return [];
  }
}

// -------------------- CATEGORIES --------------------
export async function getCategories(): Promise<Category[]> {
  try {
    const services = await getServices();
    const categoryMap = new Map();

    services.forEach((service: Service) => {
      const cat = service.metadata?.category;
      if (cat) {
        const title = typeof cat === "string" ? cat : cat.title || "";
        const slug =
          typeof cat === "string"
            ? cat.toLowerCase().replace(/\s+/g, "-")
            : cat.slug || title.toLowerCase().replace(/\s+/g, "-");

        if (title && slug && !categoryMap.has(slug)) {
          categoryMap.set(slug, {
            id: slug,
            title,
            slug,
            type: "categories",
            metadata: {},
            created_at: new Date().toISOString(),
            modified_at: new Date().toISOString(),
          });
        }
      }
    });

    return Array.from(categoryMap.values());
  } catch (error) {
    console.error("Error extracting categories:", error);
    return [];
  }
}

// -------------------- ALIASES & DEBUG --------------------
export const getProducts = getServices;
export const getActiveServices = getServices;

export async function getCertifications(): Promise<any[]> {
  return [];
}

// ✅ Debug helpers (used by app/debug/page.tsx)
export async function debugCosmicData() {
  console.log("🧩 debugCosmicData(): placeholder for local debug mode");
  return [];
}

export async function getAllObjectTypes() {
  console.log("🧩 getAllObjectTypes(): placeholder for local debug mode");
  return [];
}
