"use client";

import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type DishFeatureListProps = {
  items: { icon: LucideIcon; label: string }[];
  variants: Variants;
  itemVariants: Variants;
};

export function DishFeatureList({ items, variants, itemVariants }: DishFeatureListProps) {
  return (
    <motion.ul variants={variants} className="mt-8 flex flex-col gap-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <motion.li
            key={item.label}
            variants={itemVariants}
            className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.12em] text-gold/90 uppercase"
          >
            <Icon size={14} strokeWidth={1.75} />
            {item.label}
          </motion.li>
        );
      })}
    </motion.ul>
  );
}