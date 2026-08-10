import { Hero } from "@/components/sections/hero";
import { BrandStory } from "@/components/sections/brand-story";
import { SignatureDishes } from "@/components/sections/signature-dishes";
import { SeasonalMenu } from "@/components/sections/seasonal-menu";
import { ChefRecommendation } from "@/components/sections/chef-recommendation";
import { OrganicIngredients } from "@/components/sections/organic-ingredients";
import { DiningExperience } from "@/components/sections/dining-experience";
import { GallerySection } from "@/components/sections/gallery-section";
import { ReservationSection } from "@/components/sections/reservation-section";
import { InstagramGallery } from "@/components/sections/instagram-gallery";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLd, buildFaqSchema } from "@/lib/seo";
import { faqItems } from "@/features/faq/data/faq";

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildFaqSchema(faqItems)} />
      <Hero />
      <BrandStory />
      <SignatureDishes />
      <SeasonalMenu />
      <ChefRecommendation />
      <OrganicIngredients />
      <DiningExperience />
      <GallerySection />
      <ReservationSection />
      <InstagramGallery />
      <FaqSection />
    </>
  );
}
