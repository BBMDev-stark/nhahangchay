"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";
import type { Dish } from "@/types";
import { Leaf, Sprout } from "lucide-react";
import styles from "@/components/sections/seasonal-menu.module.css";

export function MenuCard({ dish, variant = "default", emphasized = false }: { dish: Dish; variant?: "default" | "seasonal"; emphasized?: boolean }) {
  if (variant === "seasonal") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        className={`${styles.card} ${emphasized ? styles.cardEmphasized : ""}`}
      >
        <div className={styles.imageFrame}>
          <Image src={dish.image} alt={dish.name} fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 33vw, 480px" className={styles.foodImage} />
          <div className={styles.tags}>
            {dish.tags.slice(0, 2).map((tag) => <Badge key={tag} tag={tag} />)}
          </div>
          <span className={`${styles.medallion} ${emphasized ? styles.medallionGold : ""}`} aria-hidden="true">✦</span>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardHeading}>
            <h3>{dish.name}</h3>
            <span>{formatVND(dish.price)}</span>
          </div>
          <div className={styles.divider}><span>◇</span></div>
          <p className={styles.description}>{dish.description}</p>
          <div className={styles.meta}>
            <span><Leaf size={16} strokeWidth={1.4} />{dish.calories} kcal</span>
            <i aria-hidden="true" />
            <span><Sprout size={16} strokeWidth={1.4} />{dish.ingredients.slice(0, 3).join(", ")}</span>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface-raised transition-colors duration-500 hover:border-gold/45"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="bg-[#f3eee4] object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        {dish.tags.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {dish.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} tag={tag} className="backdrop-blur-md" />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-xl text-text">{dish.name}</h3>
          <span className="whitespace-nowrap font-heading text-lg text-gold">
            {formatVND(dish.price)}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-text/60">{dish.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3 text-xs text-text/40">
          <span>{dish.calories} kcal</span>
          <span className="truncate">{dish.ingredients.slice(0, 2).join(", ")}</span>
        </div>
      </div>
    </motion.article>
  );
}
