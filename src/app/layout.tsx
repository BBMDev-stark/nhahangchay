import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import "@/components/fog-transition/fog-transition.css";
import { siteConfig } from "@/config/site.config";
import {
  buildRestaurantSchema,
  buildOrganizationSchema,
  JsonLd,
} from "@/lib/seo";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";
import { FloatingButton } from "@/components/layout/floating-button";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full">
      <body className="flex min-h-full flex-col antialiased">
        <JsonLd data={buildRestaurantSchema()} />
        <JsonLd data={buildOrganizationSchema()} />
        <LoadingScreen />
        <SiteShell
          navbar={<Navbar />}
          footer={<Footer />}
          scrollProgress={<ScrollProgress />}
          backToTop={<BackToTop />}
          floatingButton={<FloatingButton />}
        >
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
