"use client";

import { motion, type Variants } from "framer-motion";
import type { IngredientCalloutData } from "@/lib/dish-menu-data";

type IngredientCalloutProps = {
  data: IngredientCalloutData;
  variants: Variants;
};

const POSITION_STYLES: Record<IngredientCalloutData["position"], string> = {
  "top-left": "left-[2%] top-[6%] lg:-left-[18%] lg:top-[8%] 2xl:-left-[22%]",
  "top-right": "right-[0%] top-[22%] lg:-right-[20%] lg:top-[22%] 2xl:-right-[24%]",
  "bottom-left": "left-[4%] bottom-[18%] lg:-left-[16%] lg:bottom-[18%] 2xl:-left-[20%]",
  "bottom-right": "right-[2%] bottom-[4%] lg:-right-[18%] lg:bottom-[6%] 2xl:-right-[22%]",
};

const CONNECTOR_STYLES: Record<
  IngredientCalloutData["position"],
  { className: string; flip?: boolean }
> = {
  "top-left": { className: "-right-12 top-1/2 rotate-[22deg]" },
  "top-right": { className: "-left-12 top-1/2 rotate-[-22deg]", flip: true },
  "bottom-left": { className: "-right-12 top-1/2 rotate-[-22deg]" },
  "bottom-right": { className: "-left-12 top-1/2 rotate-[22deg]", flip: true },
};

export function IngredientCallout({ data, variants }: IngredientCalloutProps) {
  const Icon = data.icon;
  const connector = CONNECTOR_STYLES[data.position];

  return (
    <motion.div
      variants={variants}
      className={`pointer-events-none absolute z-10 hidden w-[196px] items-start gap-3 lg:flex ${POSITION_STYLES[data.position]}`}
    >
      <svg
        width="56"
        height="16"
        viewBox="0 0 56 16"
        className={`pointer-events-none absolute h-4 w-14 -translate-y-1/2 text-gold/70 ${connector.className} ${
          connector.flip ? "scale-x-[-1]" : ""
        }`}
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="8"
          x2="46"
          y2="8"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 5"
        />
        <circle cx="50" cy="8" r="2.5" fill="currentColor" />
      </svg>

      <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-bg-dark/70 text-gold backdrop-blur-sm">
        <Icon size={17} strokeWidth={1.5} />
      </span>

      <div className="min-w-0 pt-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gold">
          {data.title}
        </p>
        <p className="mt-1 text-[11px] leading-snug text-white/60">
          {data.description}
        </p>
      </div>
    </motion.div>
  );
}