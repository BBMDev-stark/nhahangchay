import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { galleryImages } from "@/features/gallery/data/gallery";
import { siteConfig } from "@/config/site.config";
import { InstagramIcon } from "@/components/shared/social-icons";

export function InstagramGallery() {
  const images = galleryImages.slice(0, 6);

  return (
    <section className="bg-bg-dark py-20">
      <Container>
        <div className="mb-10 flex items-center justify-center gap-3 text-white">
          <InstagramIcon width={20} height={20} className="text-gold" />
          <Link
            href={siteConfig.social.facebook}
            className="text-eyebrow text-white hover:text-gold"
          >
            @comchayhuongsen
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {images.map((img) => (
            <div key={img.id} className="group relative aspect-square overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 767px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
