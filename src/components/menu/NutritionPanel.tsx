"use client";

import { motion, type Variants } from "framer-motion";
import { Flame, Sprout, Droplet, Wheat } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NutritionPanelProps = {
  nutrition: { calories: number; protein: number; fat: number; carbs: number };
  tags: { icon: LucideIcon; label: string }[];
  variants: Variants;
  itemVariants: Variants;
};

const NUTRITION_META: {
  key: keyof NutritionPanelProps["nutrition"];
  label: string;
  unit: string;
  icon: LucideIcon;
}[] = [
  { key: "calories", label: "Calories", unit: "kcal", icon: Flame },
  { key: "protein", label: "Protein", unit: "g", icon: Sprout },
  { key: "fat", label: "Fat", unit: "g", icon: Droplet },
  { key: "carbs", label: "Carb", unit: "g", icon: Wheat },
];

export function NutritionPanel({
  nutrition,
  tags,
  variants,
  itemVariants,
}: NutritionPanelProps) {
  return (
    <motion.div
      variants={variants}
      className="mt-8 w-full max-w-[880px] rounded-[32px] border border-white/10 bg-white/[0.06] px-6 py-6 backdrop-blur-2xl sm:px-10 sm:py-7"
    >
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-[auto_1px_auto] sm:items-center sm:justify-between">
        {/* LEFT — Nutrition facts */}
        <motion.div
          variants={variants}
          className="grid grid-cols-4 gap-6 sm:gap-10"
        >
          {NUTRITION_META.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.key} variants={itemVariants} className="text-center sm:text-left">
                <Icon size={16} strokeWidth={1.5} className="mx-auto mb-2 text-gold sm:mx-0" />
                <p className="text-[9px] font-semibold tracking-[0.18em] text-white/45 uppercase">
                  {item.label}
                </p>
                <p className="mt-1 font-heading text-2xl text-white">
                  {nutrition[item.key]}
                  <span className="ml-1 text-xs font-sans text-white/45">
                    {item.unit}
                  </span>
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* divider */}
        <div className="hidden h-14 w-px bg-white/10 sm:block" />

        {/* RIGHT — feature tag icons */}
        <motion.div variants={variants} className="flex flex-wrap items-start gap-6 sm:gap-7">
          {tags.map((tag) => {
            const Icon = tag.icon;
            return (
              <motion.div
                key={tag.label}
                variants={itemVariants}
                className="group flex flex-col items-center gap-2"
              >
                <span className="flex size-11 items-center justify-center rounded-full border border-gold/30 text-gold transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_0_18px_rgba(200,167,91,0.45)]">
                  <Icon size={17} strokeWidth={1.5} />
                </span>
                <span className="text-[8px] font-semibold tracking-[0.14em] text-white/50 uppercase">
                  {tag.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}