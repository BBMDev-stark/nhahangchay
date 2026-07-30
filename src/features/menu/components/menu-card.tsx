"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";
import type { Dish } from "@/types";

export function MenuCard({ dish }: { dish: Dish }) {
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
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
