import { cn } from "@/lib/utils";
import type { DishTag } from "@/types";
import { DISH_TAG_LABELS } from "@/constants/design";

const TAG_STYLES: Record<DishTag, string> = {
  "best-seller": "bg-burgundy/90 text-white border border-gold/30",
  new: "bg-green-primary/15 text-green-primary border border-green-primary/30",
  "chef-choice": "bg-bg-dark/85 text-gold border border-gold/30",
  vegan: "bg-green-secondary/20 text-green-primary border border-green-secondary/40",
};

export function Badge({ tag, className }: { tag: DishTag; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
        TAG_STYLES[tag],
        className
      )}
    >
      {DISH_TAG_LABELS[tag]}
    </span>
  );
}
