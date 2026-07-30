"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { dishes } from "@/features/menu/data/dishes";
import { MenuCard } from "@/features/menu/components/menu-card";
import { DISH_CATEGORY_LABELS } from "@/constants/design";
import type { DishCategory } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES = Object.keys(DISH_CATEGORY_LABELS) as DishCategory[];

export function MenuTabs() {
  const [active, setActive] = useState<DishCategory>("khai-vi");

  const filtered = useMemo(
    () => dishes.filter((d) => d.category === active),
    [active]
  );

  return (
    <div>
      <div className="mb-14 flex flex-wrap justify-center gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "text-button rounded-full border px-5 py-2.5 transition-colors",
              active === cat
                ? "border-gold bg-gold text-bg-dark"
                : "border-border text-text/60 hover:border-gold hover:text-gold"
            )}
          >
            {DISH_CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((dish) => (
          <MenuCard key={dish.id} dish={dish} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-text/50">
            Chưa có món ăn trong danh mục này.
          </p>
        )}
      </motion.div>
    </div>
  );
}
