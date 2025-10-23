// app/services/[slug]/page.tsx
import { Metadata } from "next";
import ServiceDetails from "@/components/ServiceDetails";
import { getServiceBySlug, getServices } from "@/lib/cosmic";
import { Service } from "@/types";

/* -------------------------------------------
   💪 Universal Fix: guarantees safe features
-------------------------------------------- */
function safeNormalize(service: Service): Service {
  if (!service) return {} as Service;
  const m = (service.metadata ||= {} as any);

  let f: unknown = m.features;

  if (Array.isArray(f)) {
    // ✅ Filter only clean strings
    f = f.filter((x): x is string => typeof x === "string" && x.trim() !== "");
  } else if (typeof f === "string" && (f as string).trim() !== "") {
    // ✅ Safe cast to string so TS never errors on .trim() or .split()
    f = (f as string).split(",").map((s: string) => s.trim());
  } else {
    f = [];
  }

  return {
    ...service,
    metadata: {
      ...m,
      features: f as string[],
      description: typeof m.description === "string" ? m.description : "",
      price:
        typeof m.price === "number"
          ? m.price
          : Number(m.price) || 0,
      delivery_time:
        typeof m.delivery_time === "string" ? m.delivery_time : "N/A",
      service_type:
        typeof m.service_type === "string" ? m.service_type : "standard",
    },
  };
}

/* -------------------------------------------
   ✅ Metadata
-------------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const rawService = await getServiceBySlug(slug);
  const service = safeNormalize(rawService);

  const title = `${service.title} - RFP.AUCTION`;
  const description =
    service.metadata?.description ||
    `Professional ${service.title} service from RFP.AUCTION`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

/* -------------------------------------------
   ✅ Static Params
-------------------------------------------- */
export async function generateStaticParams() {
  try {
    const services = await getServices();

    if (!services || services.length === 0) {
      console.log("📋 Using demo slugs for static generation");
      return [
        { slug: "rfp-response-writing-service" },
        { slug: "rfp-consultation" },
        { slug: "proposal-development" },
      ];
    }

    return services.map((s) => ({ slug: s.slug }));
  } catch (error) {
    console.error("❌ Error generating static paths:", error);
    return [
      { slug: "rfp-response-writing-service" },
      { slug: "rfp-consultation" },
      { slug: "proposal-development" },
    ];
  }
}

/* -------------------------------------------
   ✅ Page Component
-------------------------------------------- */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("🎯 Loading service page for slug:", slug);

  const rawService = await getServiceBySlug(slug);
  const service = safeNormalize(rawService);

  console.log("✅ Service loaded:", service.title);

  return <ServiceDetails service={service} />;
}
