import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { GalleryGrid } from "@/features/gallery/components/gallery-grid";
import { galleryImages } from "@/features/gallery/data/gallery";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Không Gian",
  description: "Thư viện hình ảnh không gian sang trọng, tinh tế của nhà hàng chay Lotus & Earth.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Trang chủ", url: "/" },
          { name: "Không gian", url: "/gallery" },
        ])}
      />
      <PageHeader
        eyebrow="Không Gian"
        title="Luxury Gallery"
        description="Một hành trình thị giác qua từng góc nhỏ của Lotus & Earth."
        image="/images/hero/gallery-header.jpg"
      />
      <section className="section-padding bg-bg-primary">
        <Container>
          <GalleryGrid images={galleryImages} />
        </Container>
      </section>
    </>
  );
}
