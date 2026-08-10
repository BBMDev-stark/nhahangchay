"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { GalleryImage } from "@/types";
import { Lightbox } from "@/components/shared/lightbox";
import { cn } from "@/lib/utils";
import styles from "@/components/sections/gallery-section.module.css";

const FILTERS: { label: string; value: GalleryImage["category"] | "all" }[] = [
  { label: "Tất Cả", value: "all" },
  { label: "Không Gian", value: "khong-gian" },
  { label: "Món Ăn", value: "mon-an" },
  { label: "Sự Kiện", value: "su-kien" },
];

export function GalleryGrid({
  images,
  showFilter = true,
  variant = "default",
}: {
  images: GalleryImage[];
  showFilter?: boolean;
  variant?: "default" | "luxury";
}) {
  const [filter, setFilter] = useState<GalleryImage["category"] | "all">("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? images : images.filter((img) => img.category === filter)),
    [images, filter]
  );

  return (
    <div>
      {showFilter && (
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "text-button rounded-full border px-5 py-2 transition-colors",
                filter === f.value
                  ? "border-gold bg-gold text-bg-dark"
                  : "border-border text-text/60 hover:border-gold hover:text-gold"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {variant === "luxury" ? (
        <LuxuryGallery images={filtered} onOpen={setActiveIndex} />
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((img, i) => (
            <motion.button
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActiveIndex(i)}
              className="group relative mb-4 block w-full overflow-hidden rounded-lg break-inside-avoid"
              style={{ aspectRatio: `${img.width} / ${img.height}` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                loading={showFilter && i === 0 ? "eager" : "lazy"}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-sm text-white">{img.alt}</span>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      <Lightbox
        images={filtered}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}

function LotusGlyph() {
  return (
    <svg viewBox="0 0 48 34" fill="none" aria-hidden="true">
      <path d="M24 29c-7-5-10-12-8-21 5 3 8 7 8 12 1-5 4-9 9-12 1 9-2 16-9 21Z" />
      <path d="M23 29C13 28 7 23 5 15c8 0 14 4 18 11M25 29c10-1 16-6 18-14-8 0-14 4-18 11" />
    </svg>
  );
}

function LuxuryGallery({ images, onOpen }: { images: GalleryImage[]; onOpen: (index: number) => void }) {
  const primary = images.slice(0, 3);
  const secondary = images.slice(3);

  return (
    <div className={styles.galleryWrap}>
      <div className={styles.primaryGrid}>
        {primary.map((image, index) => (
          <LuxuryCard key={image.id} image={image} index={index} prominent={index === 1} onOpen={onOpen} />
        ))}
      </div>

      <div className={styles.exploreRow}>
        <span aria-hidden="true" />
        <LotusGlyph />
        <Link href="/gallery" className={styles.exploreButton}>
          Khám phá không gian <ArrowRight size={17} strokeWidth={1.5} />
        </Link>
        <LotusGlyph />
        <span aria-hidden="true" />
      </div>

      {secondary.length > 0 && (
        <div className={styles.secondaryGrid}>
          {secondary.map((image, index) => (
            <LuxuryCard key={image.id} image={image} index={index + primary.length} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  );
}

function LuxuryCard({ image, index, prominent = false, onOpen }: {
  image: GalleryImage;
  index: number;
  prominent?: boolean;
  onOpen: (index: number) => void;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpen(index)}
      className={cn(styles.luxuryCard, prominent && styles.prominentCard)}
      aria-label={`Mở ảnh: ${image.alt}`}
    >
      <span className={styles.imageFrame}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading={index === 0 ? "eager" : "lazy"}
          sizes="(max-width: 767px) 92vw, (max-width: 1199px) 46vw, 31vw"
          className={styles.cardImage}
        />
        <span className={styles.imageShade} />
      </span>

      <span className={styles.cornerBadge}><LotusGlyph /></span>

      <span className={styles.captionPlate}>
        <span className={styles.captionLotus} aria-hidden="true">⌁</span>
        <span className={styles.captionCopy}>
          <strong>Không gian {String(index + 1).padStart(2, "0")}</strong>
          <small>{image.alt}</small>
        </span>
      </span>
    </motion.button>
  );
}
