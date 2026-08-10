import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { GalleryGrid } from "@/features/gallery/components/gallery-grid";
import { galleryImages } from "@/features/gallery/data/gallery";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Không Gian",
  description: "Hình ảnh nhận diện, mặt tiền và những món chay gợi ý của Nhà hàng chay Hương Sen.",
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
        title="Khoảnh khắc Hương Sen"
        description="Màu xanh an lành, sắc hồng cánh sen và những món chay được chăm chút."
        image="/brand/huong-sen-facade.png"
      />
      <section className="section-padding bg-bg-primary">
        <Container>
          <GalleryGrid images={galleryImages} />
        </Container>
      </section>
    </>
  );
}
