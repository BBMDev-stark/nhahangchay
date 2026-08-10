"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useCallback } from "react";
import type { GalleryImage } from "@/types";

interface LightboxProps {
  images: GalleryImage[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, activeIndex, onClose, onNavigate }: LightboxProps) {
  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length, onNavigate]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % images.length);
  }, [activeIndex, images.length, onNavigate]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    if (activeIndex !== null) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, onClose, goPrev, goNext]);

  const image = activeIndex !== null ? images[activeIndex] : null;

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
          onClick={onClose}
        >
          <button
            aria-label="Đóng"
            onClick={onClose}
            className="absolute right-6 top-6 text-white/70 transition hover:text-white"
          >
            <X size={28} />
          </button>
          <button
            aria-label="Ảnh trước"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 md:left-8 text-white/70 transition hover:text-white"
          >
            <ChevronLeft size={36} />
          </button>
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) calc(100vw - 32px), 896px"
              className="object-contain"
            />
          </motion.div>
          <button
            aria-label="Ảnh tiếp theo"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 md:right-8 text-white/70 transition hover:text-white"
          >
            <ChevronRight size={36} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
