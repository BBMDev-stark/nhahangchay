"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { dishes } from "@/features/menu/data/dishes";
import { MenuCard } from "@/features/menu/components/menu-card";
import { DISH_CATEGORY_LABELS } from "@/constants/design";
import type { DishCategory } from "@/types";
import { cn } from "@/lib/utils";

const MENU_IMAGES: Record<string, string> = {
  "banh-hoi-cha-gio": "/images/menu-real/banh-hoi-cha-gio.png",
  "banh-xeo-nam-moi": "/images/menu-real/banh-xeo-nam-moi.png",
  "bi-cuon": "/images/menu-real/bi-cuon.png",
  "bo-bia": "/images/menu-real/bo-bia.png",
  "bong-bi-xao-nam-moi": "/images/menu-real/bong-bi-xao-nam-moi.png",
  "ca-ri-nam-dau-hu": "/images/menu-real/ca-ri-nam-dau-hu.png",
  "canh-ga-chien-mam": "/images/menu-real/canh-ga-chien-mam.png",
  "com-ga-roti": "/images/menu-real/com-ga-roti.png",
  "goi-hoang-cung": "/images/menu-real/goi-hoang-cung.png",
  "kho-qua-don-dau-kho": "/images/menu-real/kho-qua-don-dau-kho.png",
  "lau-nam-thai": "/images/menu-real/lau-nam-thai.png",
  "mien-xao-thap-cam": "/images/menu-real/mien-xao-thap-cam.png",
  "mi-xao-gion": "/images/menu-real/mi-xao-gion.png",
  "mi-xao-thap-cam": "/images/menu-real/mi-xao-thap-cam.png",
  "mi-y-sot-ca": "/images/menu-real/mi-y-sot-ca.png",
  "nam-moi-kho-tieu-xanh": "/images/menu-real/nam-moi-kho-tieu-xanh.png",
  "rau-xao-thap-cam": "/images/menu-real/rau-xao-thap-cam.png",
  "sa-ke-lan-bot-chien": "/images/menu-real/sa-ke-lan-bot-chien.png",
};

// The menu page is intentionally sourced only from the approved real-photo
// dataset. This keeps legacy collage crops out of /menu without mutating the
// shared dish catalogue used by the rest of the site.
const MENU_DISHES = dishes
  .filter((dish) => MENU_IMAGES[dish.slug])
  .map((dish) => ({
    ...dish,
    image: MENU_IMAGES[dish.slug],
  }));

const CATEGORIES = (Object.keys(DISH_CATEGORY_LABELS) as DishCategory[]).filter(
  (category) => MENU_DISHES.some((dish) => dish.category === category),
);

export function MenuTabs() {
  const [active, setActive] = useState<DishCategory>("khai-vi");

  const filtered = useMemo(
    () => MENU_DISHES.filter((d) => d.category === active),
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
