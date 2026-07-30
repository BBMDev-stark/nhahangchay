"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  /** Main label shown bottom-left on hover, e.g. "Không Gian Chính". Enables the frame-hover treatment. */
  frameLabel?: string;
  /** Small kicker above the label, e.g. "XEM THÊM". */
  frameEyebrow?: string;
  /** If provided, the whole card becomes a link. */
  href?: string;
}

export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  sizes = "100vw",
  fill = true,
  width,
  height,
  frameLabel,
  frameEyebrow = "Xem Thêm",
  href,
}: ImageRevealProps) {
  const hasFrame = Boolean(frameLabel);

  const content = (
    <div
      className={cn(
        "reveal-mask group relative",
        hasFrame && "cursor-pointer",
        className
      )}
    >
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full"
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn(
              "object-cover",
              hasFrame &&
                "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
              imgClassName
            )}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className={cn(
              "object-cover",
              hasFrame &&
                "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
              imgClassName
            )}
          />
        )}

        {hasFrame && (
          <>
            {/* darken gradient for label legibility */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* inset frame line — settles inward on hover, à la Makhno Studio */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-5 scale-[1.04] border border-white/0 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:border-white/70 group-hover:opacity-100 sm:inset-6"
            />

            {/* label */}
            <div className="pointer-events-none absolute bottom-9 left-9 translate-y-3 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-10 sm:left-10">
              <span className="block text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase">
                {frameEyebrow}
              </span>
              <span className="mt-1 block font-heading text-lg text-white sm:text-xl">
                {frameLabel}
              </span>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}