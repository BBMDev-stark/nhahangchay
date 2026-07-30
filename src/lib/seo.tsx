import { siteConfig } from "@/config/site.config";
import type { Dish, FaqItem } from "@/types";

/**
 * Restaurant + LocalBusiness combined schema (dùng ở layout gốc, xuất hiện toàn site).
 */
export function buildRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.name,
    description: siteConfig.description,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    servesCuisine: ["Vegetarian", "Vegan", "Fine Dining"],
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.district,
      addressRegion: siteConfig.contact.address.city,
      addressCountry: siteConfig.contact.address.country,
      postalCode: siteConfig.contact.address.postalCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.coordinates.lat,
      longitude: siteConfig.contact.coordinates.lng,
    },
    openingHoursSpecification: siteConfig.openingHours.map((oh) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: oh.days,
      opens: oh.hours.split(" - ")[0],
      closes: oh.hours.split(" - ")[1],
    })),
    sameAs: Object.values(siteConfig.social),
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    sameAs: Object.values(siteConfig.social),
  };
}

export function buildMenuSchema(dishes: Dish[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `Thực đơn ${siteConfig.name}`,
    hasMenuSection: Array.from(new Set(dishes.map((d) => d.category))).map(
      (category) => ({
        "@type": "MenuSection",
        name: category,
        hasMenuItem: dishes
          .filter((d) => d.category === category)
          .map((d) => ({
            "@type": "MenuItem",
            name: d.name,
            description: d.description,
            offers: {
              "@type": "Offer",
              price: d.price,
              priceCurrency: "VND",
            },
          })),
      })
    ),
  };
}

export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

/** Component tiện dụng để inject JSON-LD vào <head> của bất kỳ page nào */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
