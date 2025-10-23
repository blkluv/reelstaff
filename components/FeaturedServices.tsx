import Link from "next/link";
import { Service } from "@/types";
import { ArrowRight, Clock, Zap, FileText, TrendingUp } from "lucide-react";

interface FeaturedServicesProps {
  services?: Service[];
}

/* ---------------------------------------------
   Safe utility — never throws even on bad data
---------------------------------------------- */
function safeArray(value: any): string[] {
  if (Array.isArray(value)) {
    return value.filter(
      (x: unknown): x is string => typeof x === "string" && x.trim() !== ""
    );
  }
  if (typeof value === "string" && value.trim() !== "") {
    return value.split(",").map((s: string) => s.trim());
  }
  return [];
}

/* ---------------------------------------------
   Default fallback data for local dev / preview
---------------------------------------------- */
const defaultServices: Service[] = [
  {
    id: "1",
    slug: "rfp-response-writing-service",
    title: "RFP Response Writing Service",
    type: "rfp-services",
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
    metadata: {
      description:
        "End-to-end RFP response creation. We draft compliant, persuasive proposals that win contracts.",
      price: 3500,
      delivery_time: "7 Days",
      service_type: "emergency",
      features: [
        "Guaranteed 24-hour delivery",
        "Expert RFP writing",
        "Priority support",
        "Unlimited revisions",
      ],
      featured_image: {
        url: "https://imgix.cosmicjs.com/e9a89940-a06f-11f0-8c2f-71055d67fae4-wizard-of-hahz-rfp-ai-services.png",
        imgix_url:
          "https://imgix.cosmicjs.com/e9a89940-a06f-11f0-8c2f-71055d67fae4-wizard-of-hahz-rfp-ai-services.png",
      },
      featured: true,
    },
  },
  {
    id: "2",
    slug: "government-rfp-template-pack",
    title: "Government RFP Template Service",
    type: "rfp-services",
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
    metadata: {
      description:
        "Our Government RFP Template Pack gives you everything you need to create airtight government proposals that actually get approved.",
      price: 200,
      delivery_time: "24 Hours",
      service_type: "template",
      features: [
        "Federal RFP Master Template",
        "State & Local Government Templates",
        "Compliance Checklists",
        "Ready to use",
      ],
      featured_image: {
        url: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9",
        imgix_url: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9",
      },
      featured: true,
    },
  },
  {
    id: "3",
    slug: "rapid-rfp-proposal-review",
    title: "Rapid RFP Proposal Review",
    type: "rfp-services",
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
    metadata: {
      description:
        "Fast compliance and quality review of your draft proposal. We check alignment with RFP requirements and provide actionable edits.",
      price: 600,
      delivery_time: "24 Hours",
      service_type: "consulting",
      features: [
        "Comprehensive Compliance Review",
        "Strategic Enhancement",
        "Actionable Feedback",
        "Rapid Service Execution",
      ],
      featured_image: {
        url: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
        imgix_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      },
      featured: true,
    },
  },
];

export default function FeaturedServices({ services = [] }: FeaturedServicesProps) {
  const displayServices = Array.isArray(services) && services.length > 0
    ? services
    : defaultServices;

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container-max">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Featured RFP Services
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Our most popular RFP solutions trusted by businesses to save time,
            reduce costs, and win more contracts with blockchain-verified quality.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayServices.map((service, index) => {
            const imageUrl =
              service.metadata?.featured_image?.imgix_url ||
              service.metadata?.featured_image?.url ||
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format,compress";

            // ✅ Safe guard: convert features to an array
            const features = safeArray(service.metadata?.features);

            return (
              <div
                key={service.id || index}
                className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-lg group rounded-2xl hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={service.title || ""}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute flex flex-col gap-2 top-4 right-4">
                    <div className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
                      {service.metadata?.service_type?.toUpperCase() || "SERVICE"}
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-full">
                      <Clock className="w-3 h-3" />
                      {service.metadata?.delivery_time || "Custom"}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                      {service.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600 line-clamp-2">
                      {service.metadata?.description ||
                        "Professional RFP service solution"}
                    </p>
                  </div>

                  {/* ✅ SAFE FEATURES */}
                  {features.length > 0 ? (
                    <div className="mb-4 space-y-2">
                      {features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <Zap className="flex-shrink-0 w-3 h-3 text-blue-500" />
                          <span className="line-clamp-1">{feature}</span>
                        </div>
                      ))}
                      {features.length > 3 && (
                        <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                          <TrendingUp className="w-3 h-3" />
                          <span>+{features.length - 3} more features</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mb-4 text-sm italic text-gray-400">
                      No listed features
                    </div>
                  )}

                  {/* Blockchain Badge */}
                  <div className="flex items-center gap-2 px-3 py-2 mb-4 text-sm text-green-600 rounded-lg bg-green-50">
                    <FileText className="w-4 h-4" />
                    <span>Blockchain-Verified Quality</span>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      {typeof service.metadata?.price === "number" && (
                        <div className="text-2xl font-bold text-blue-600">
                          ${service.metadata.price.toFixed(0)}
                        </div>
                      )}
                      <div className="text-sm text-gray-500">
                        One-time payment • No hidden fees
                      </div>
                    </div>

                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Book Service
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-blue-600 transition-colors bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
          >
            Explore All RFP Services
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            Join 500+ businesses using RFP.AUCTION to streamline procurement.
          </p>
        </div>
      </div>
    </section>
  );
}
