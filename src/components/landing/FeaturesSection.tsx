import Image from "next/image";

export function FeaturesSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-20">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-purple-100 opacity-20 mix-blend-multiply blur-3xl filter"></div>
        <div className="absolute right-0 top-1/2 h-96 w-96 rounded-full bg-pink-100 opacity-20 mix-blend-multiply blur-3xl filter"></div>
      </div>

      <div className="mx-auto max-w-7xl space-y-24">
        {/* Feature 1: Prod-Query Search */}
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-balance text-4xl font-bold text-gray-900">
              Prod-Query search
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Get instant access to Prod-Query registry data across 500+ TLD
              extensions. Our API provides you with comprehensive domain
              information including registrant details, technical contacts,
              nameservers, creation dates, and registration history.
            </p>
            <a
              href="#"
              className="inline-block font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              Learn More →
            </a>
          </div>
          <div className="relative h-100 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50">
            <Image
              src="/images/landing/feature-1.jpg"
              alt="Prod-Query search feature"
              width={500}
              height={400}
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>
        </div>

        {/* Feature 2: XML/JSON Data */}
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative order-2 h-100 overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 md:order-1">
            <Image
              src="/images/landing/feature-2.jpg"
              alt="XML/JSON data formats"
              width={500}
              height={400}
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>
          <div className="order-1 space-y-6 md:order-2">
            <h2 className="text-balance text-4xl font-bold text-gray-900">
              Choose & find out Prod-Query XML/JSON data
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Flexible data delivery in your preferred format. Our Prod-Query
              API supports both XML and JSON responses, making it easy to
              integrate into your application. Parse structured data with
              consistent schemas across all TLDs and registry extensions.
            </p>
            <a
              href="#"
              className="inline-block font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              Learn More →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
