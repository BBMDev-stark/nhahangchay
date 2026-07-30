"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { clamp, wrappedDistance } from "./carousel-engine";
import type { DishEngineRef, SignatureDish } from "./types";
import styles from "./signature-dishes.module.css";

type DishPhotoCarouselProps = {
  dishes: SignatureDish[];
  engineRef: DishEngineRef;
  onOpen: () => void;
  onReady: () => void;
};

export function DishPhotoCarousel({
  dishes,
  engineRef,
  onOpen,
  onReady,
}: DishPhotoCarouselProps) {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const readyRef = useRef(false);
  const visibleRef = useRef(true);

  const markReady = useCallback(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    onReady();
  }, [onReady]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "160px 0px" },
    );

    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;

    const render = () => {
      if (!visibleRef.current || document.visibilityState === "hidden") {
        raf = requestAnimationFrame(render);
        return;
      }

      const engine = engineRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mobile = width < 768;
      const tablet = width < 1180;
      const gap = mobile
        ? Math.min(width * 0.72, 290)
        : tablet
          ? Math.min(width * 0.29, 330)
          : Math.min(width * 0.255, 410);
      const detailX = mobile ? 0 : width * (tablet ? 0.11 : 0.15);
      const detailY = mobile ? -height * 0.16 : 24;

      dishes.forEach((_, index) => {
        const element = itemRefs.current[index];
        if (!element) return;

        const distance = wrappedDistance(index, engine.progress, dishes.length);
        const absolute = Math.abs(distance);
        const active = absolute < 0.5;
        const activeValue = active && engine.modeMix < 0.1 ? "true" : "false";
        if (element.dataset.active !== activeValue) {
          element.dataset.active = activeValue;
        }
        const exploreScale =
          (mobile ? 0.84 : 1) * (1 - Math.min(absolute * 0.17, 0.49));
        const exploreX = distance * gap;
        const exploreY = absolute * (mobile ? 20 : 33) + Math.sin(distance) * 8;
        const exploreOpacity = clamp(1 - absolute * 0.21, 0.1, 1);
        const side =
          distance === 0 ? (index % 2 === 0 ? 1 : -1) : Math.sign(distance);
        const mode = engine.modeMix;

        let x = exploreX + side * mode * width * 0.57;
        let y = exploreY;
        let scale = exploreScale * (1 - mode * 0.5);
        let opacity = exploreOpacity * (1 - mode);
        let rotate = distance * (mobile ? -2.6 : -3.8);

        if (engine.detailIndex === index) {
          x = exploreX + (detailX - exploreX) * mode;
          y = exploreY + (detailY - exploreY) * mode;
          scale =
            exploreScale +
            ((mobile ? 1.02 : tablet ? 1.18 : 1.36) - exploreScale) * mode;
          opacity = exploreOpacity + (1 - exploreOpacity) * mode;
          rotate *= 1 - mode;

          if (engine.pendingDetailIndex !== null) {
            x += engine.switchDirection * width * 0.56 * engine.switchMix;
            opacity *= 1 - engine.switchMix;
          }
        } else if (
          engine.pendingDetailIndex === index &&
          engine.modeMix > 0.9
        ) {
          x =
            detailX -
            engine.switchDirection * width * 0.56 * (1 - engine.switchMix);
          y = detailY;
          scale =
            (mobile ? 1.02 : tablet ? 1.18 : 1.36) *
            (0.82 + engine.switchMix * 0.18);
          opacity = engine.switchMix;
          rotate = engine.switchDirection * (1 - engine.switchMix) * 6;
        }

        if (active && mode < 0.1) {
          y -= engine.hoverAmount * 8;
          scale *= 1 + engine.hoverAmount * 0.018;
          rotate += engine.pointerTiltX * 0.9;
        }

        const brightness = 1 - Math.min(absolute * 0.17, 0.5);
        const saturation = 1 - Math.min(absolute * 0.14, 0.38);
        element.style.transform =
          `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) ` +
          `scale(${scale}) rotate(${rotate}deg)`;
        element.style.opacity = String(opacity);
        element.style.filter =
          `brightness(${brightness}) saturate(${saturation})`;
        element.style.zIndex = String(100 - Math.round(absolute * 10));
        element.style.pointerEvents =
          active && mode < 0.1 ? "auto" : "none";
      });

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [dishes, engineRef]);

  return (
    <div ref={sceneRef} className={styles.photoScene} aria-hidden="true">
      {dishes.map((dish, index) => (
        <div
          key={dish.id}
          ref={(element) => {
            itemRefs.current[index] = element;
          }}
          className={styles.photoDish}
          onClick={onOpen}
        >
          <span className={styles.photoHalo} />
          <span className={styles.photoPedestal} />
          <Image
            className={styles.photoImage}
            src={dish.imageSrc}
            alt=""
            width={1536}
            height={1024}
            draggable={false}
            priority={index === 0}
            sizes="(max-width: 767px) 82vw, (max-width: 1180px) 43vw, 34vw"
            unoptimized
            onLoad={index === 0 ? markReady : undefined}
            onError={index === 0 ? markReady : undefined}
          />
        </div>
      ))}
    </div>
  );
}
