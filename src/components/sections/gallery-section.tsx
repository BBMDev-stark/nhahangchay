import { SectionTitle } from "@/components/shared/section-title";
import { Container } from "@/components/shared/container";
import { GalleryGrid } from "@/features/gallery/components/gallery-grid";
import { galleryImages } from "@/features/gallery/data/gallery";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function GallerySection() {
  return (
    <section className="section-padding bg-bg-primary">
      <Container>
        <SectionTitle
          eyebrow="Không Gian"
          title="Luxury Gallery"
          description="Một hành trình thị giác qua từng góc nhỏ của Lotus & Earth."
          className="mb-14"
        />
        <GalleryGrid images={galleryImages.slice(0, 9)} showFilter={false} />
        <div className="mt-12 text-center">
          <Link href="/gallery">
            <Button variant="outline">Xem Toàn Bộ Thư Viện Ảnh</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
