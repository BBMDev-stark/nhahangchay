"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { dishes } from "@/features/menu/data/dishes";
import { MenuCard } from "@/features/menu/components/menu-card";
import { DISH_CATEGORY_LABELS } from "@/constants/design";
import type { DishCategory } from "@/types";
import { cn } from "@/lib/utils";

const MENU_DISH_SLUGS = [
  "banh-hoi-cha-gio",
  "banh-khot",
  "banh-pho-cuon",
  "banh-xeo-nam-moi",
  "bi-cuon",
  "bo-bia",
  "bo-cuon-pho-mai",
  "bong-bi-xao-nam-moi",
  "ca-ri-nam-dau-hu",
  "canh-chua-bac-ha",
  "canh-ga-chien-mam",
  "canh-kho-qua-nhoi-dau",
  "cha-gio",
  "che-dau-van",
  "che-ngu-qua",
  "com-ga-roti",
  "com-ngu-sac",
  "com-nieu",
  "com-vit-hoang-kim",
  "goi-chuoi-xanh",
  "goi-cu-hu-dua",
  "goi-hoang-cung",
  "goi-huong-sen",
  "goi-mit-non-tron",
  "goi-rau-cau-nam-tuyet",
  "kho-qua-don-dau-kho",
  "lau-mam",
  "lau-nam-thai",
  "met-banh-que",
  "mi-xao-gion",
  "mi-xao-thap-cam",
  "mi-y-chua-cay",
  "mi-y-sot-ca",
  "mien-xao-thap-cam",
  "nam-moi-kho-tieu-xanh",
  "nem-vuong",
  "pasta-dut-lo",
  "pizza-pho-mai",
  "pizza-rau-cu",
  "rau-xao-thap-cam",
  "sa-ke-lan-bot-chien",
  "salad-rau-cu",
  "sup-hat-sen",
  "sup-toc-tien",
  "yaourt-hat-dac",
] as const;

const MENU_DISH_SET = new Set<string>(MENU_DISH_SLUGS);

// Only show dishes that have an approved image in the supplied 45-item menu
// dataset. The shared catalogue remains available to the rest of the site.
const MENU_DISHES = dishes
  .filter((dish) => MENU_DISH_SET.has(dish.slug))
  .map((dish) => ({
    ...dish,
    image: `/images/menu-dishes/${dish.slug}.webp`,
  }));

const CATEGORIES = (Object.keys(DISH_CATEGORY_LABELS) as DishCategory[]).filter(
  (category) => MENU_DISHES.some((dish) => dish.category === category),
);

type MenuFilter = "all" | DishCategory;
const FILTERS: MenuFilter[] = ["all", ...CATEGORIES];
const ITEMS_PER_PAGE = 6;

export function MenuTabs() {
  const [active, setActive] = useState<MenuFilter>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      active === "all"
        ? MENU_DISHES
        : MENU_DISHES.filter((dish) => dish.category === active),
    [active]
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const selectFilter = (filter: MenuFilter) => {
    setActive(filter);
    setPage(1);
  };

  return (
    <div>
      <div className="mb-14 flex flex-wrap justify-center gap-3">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => selectFilter(filter)}
            className={cn(
              "text-button rounded-full border px-5 py-2.5 transition-colors",
              active === filter
                ? "border-gold bg-gold text-bg-dark"
                : "border-border text-text/60 hover:border-gold hover:text-gold"
            )}
          >
            {filter === "all" ? "Tất Cả" : DISH_CATEGORY_LABELS[filter]}
          </button>
        ))}
      </div>

      <motion.div
        key={`${active}-${page}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {paginated.map((dish) => (
          <MenuCard key={dish.id} dish={dish} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-text/50">
            Chưa có món ăn trong danh mục này.
          </p>
        )}
      </motion.div>

      {totalPages > 1 && (
        <nav
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
          aria-label="Phân trang thực đơn"
        >
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="rounded-full border border-border px-4 py-2 text-sm text-text/65 transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-35"
          >
            Trước
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                aria-label={`Trang ${pageNumber}`}
                aria-current={page === pageNumber ? "page" : undefined}
                onClick={() => setPage(pageNumber)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border text-sm transition-colors",
                  page === pageNumber
                    ? "border-gold bg-gold text-bg-dark"
                    : "border-border text-text/60 hover:border-gold hover:text-gold",
                )}
              >
                {pageNumber}
              </button>
            ),
          )}

          <button
            type="button"
            disabled={page === totalPages}
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            className="rounded-full border border-border px-4 py-2 text-sm text-text/65 transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-35"
          >
            Sau
          </button>
        </nav>
      )}
    </div>
  );
}
