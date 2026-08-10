import { Container } from "@/components/shared/container";
import { GalleryGrid } from "@/features/gallery/components/gallery-grid";
import { galleryImages } from "@/features/gallery/data/gallery";
import styles from "./gallery-section.module.css";

function LotusMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 64" fill="none" aria-hidden="true">
      <path d="M48 52C39 45 34 35 36 23c7 4 11 10 12 17 1-7 5-13 12-17 2 12-3 22-12 29Z" />
      <path d="M47 52C32 50 22 42 18 30c10 0 19 5 25 14M49 52c15-2 25-10 29-22-10 0-19 5-25 14" />
      <path d="M48 40C40 31 40 20 48 9c8 11 8 22 0 31ZM17 49c20 7 42 7 62 0" />
    </svg>
  );
}

export function GallerySection() {
  return (
    <section id="gallery" className={styles.section} aria-labelledby="gallery-title">
      <Container className={styles.container}>
        <header className={styles.header}>
          <div className={styles.ornament}>
            <span />
            <LotusMark className={styles.headerLotus} />
            <span />
          </div>
          <p className={styles.eyebrow}>Không Gian</p>
          <h2 id="gallery-title" className={styles.title}>Luxury Gallery</h2>
          <p className={styles.description}>
            Màu sắc thương hiệu, không gian và những khoảnh khắc thanh lịch tại Hương Sen.
          </p>
          <div className={styles.smallDivider}><span /><LotusMark /><span /></div>
        </header>

        <GalleryGrid images={galleryImages} showFilter={false} variant="luxury" />
      </Container>
    </section>
  );
}
