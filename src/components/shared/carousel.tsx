"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Carousel({
  children,
  slideClassName = "flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%]",
}: {
  children: ReactNode[];
  slideClassName?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync initial carousel button state from embla instance
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {children.map((child, i) => (
            <div className={slideClassName} key={i}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-3">
        <button
          aria-label="Trước"
          disabled={!canPrev}
          onClick={() => emblaApi?.scrollPrev()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text transition disabled:opacity-30 hover:border-gold hover:text-gold"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          aria-label="Sau"
          disabled={!canNext}
          onClick={() => emblaApi?.scrollNext()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text transition disabled:opacity-30 hover:border-gold hover:text-gold"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
