"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  /** A substring within `title` to render as an italic gold accent (editorial focal point). */
  accent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

const easeLuxury = [0.22, 1, 0.36, 1] as const;

export function SectionTitle({
  eyebrow,
  title,
  accent,
  description,
  align = "center",
  className,
  light = false,
}: SectionTitleProps) {
  const parts = accent && title.includes(accent)
    ? title.split(accent)
    : null;

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeLuxury }}
          className={cn("text-eyebrow eyebrow-rail", align === "center" && "flex-row-reverse")}
        >
          {eyebrow}
        </motion.span>
      )}

      <div className="reveal-mask max-w-3xl">
        <motion.h2
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: easeLuxury, delay: 0.08 }}
          className={cn("text-h1", light ? "text-white" : "text-text")}
        >
          {parts ? (
            <>
              {parts[0]}
              <span className="text-accent-italic">{accent}</span>
              {parts[1]}
            </>
          ) : (
            title
          )}
        </motion.h2>
      </div>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeLuxury, delay: 0.25 }}
          className={cn(
            "max-w-xl text-body-lg leading-relaxed",
            light ? "text-white/70" : "text-text/70"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}