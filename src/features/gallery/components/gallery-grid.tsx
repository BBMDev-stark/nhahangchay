"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { GalleryImage } from "@/types";
import { Lightbox } from "@/components/shared/lightbox";
import { cn } from "@/lib/utils";

const FILTERS: { label: string; value: GalleryImage["category"] | "all" }[] = [
  { label: "Tất Cả", value: "all" },
  { label: "Không Gian", value: "khong-gian" },
  { label: "Món Ăn", value: "mon-an" },
  { label: "Sự Kiện", value: "su-kien" },
];

export function GalleryGrid({
  images,
  showFilter = true,
}: {
  images: GalleryImage[];
  showFilter?: boolean;
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

      <Lightbox
        images={filtered}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}
