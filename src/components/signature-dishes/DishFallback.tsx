"use client";

import {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
} from "react";
import {
  clamp,
  wrappedDistance,
} from "./carousel-engine";
import type { DishEngineRef, SignatureDish } from "./types";
import styles from "./signature-dishes.module.css";

type DishFallbackProps = {
  dishes: SignatureDish[];
  engineRef: DishEngineRef;
  onReady: () => void;
};

type FallbackStyle = CSSProperties & {
  "--fallback-accent": string;
  "--fallback-plate": string;
  "--fallback-sauce": string;
  "--fallback-one": string;
  "--fallback-two": string;
  "--fallback-three": string;
};

export function DishFallback({
  dishes,
  engineRef,
  onReady,
}: DishFallbackProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const readyRef = useRef(false);
  const stylesByDish = useMemo(
    () =>
      dishes.map(
        (dish): FallbackStyle => ({
          "--fallback-accent": dish.theme.accent,
          "--fallback-plate": dish.procedural.plateColor,
          "--fallback-sauce": dish.procedural.sauceColor,
          "--fallback-one": dish.procedural.ingredientPalette[0],
          "--fallback-two": dish.procedural.ingredientPalette[1],
          "--fallback-three": dish.procedural.garnishPalette[0],
        }),
      ),
    [dishes],
  );

  useEffect(() => {
    if (!readyRef.current) {
      readyRef.current = true;
      onReady();
    }

    let raf = 0;
    const render = () => {
      const engine = engineRef.current;
      const width = window.innerWidth;
      const mobile = width < 768;
      const gap = mobile
        ? Math.min(width * 0.68, 270)
        : Math.min(width * 0.225, 360);
      const detailX = mobile ? 0 : width * 0.13;
      const detailY = mobile ? -window.innerHeight * 0.13 : 18;

      dishes.forEach((_, index) => {
        const element = itemRefs.current[index];
        if (!element) return;
        const distance = wrappedDistance(index, engine.progress, dishes.length);
        const absolute = Math.abs(distance);
        const active = absolute < 0.5;
        const exploreScale =
          (mobile ? 0.78 : 1) * (1 - Math.min(absolute * 0.145, 0.46));
        const exploreX = distance * gap;
        const exploreY = Math.sin(distance * 0.8) * 14;
        const exploreOpacity = clamp(1 - absolute * 0.2, 0.12, 1);
        const side =
          distance === 0 ? (index % 2 === 0 ? 1 : -1) : Math.sign(distance);
        const mode = engine.modeMix;
        let x = exploreX + side * mode * width * 0.52;
        let y = exploreY;
        let scale = exploreScale * (1 - mode * 0.42);
        let opacity = exploreOpacity * (1 - mode);
        let rotate = distance * 2.6 + engine.dragVelocity * 28;

        if (engine.detailIndex === index) {
          x = exploreX + (detailX - exploreX) * mode;
          y = exploreY + (detailY - exploreY) * mode;
          scale =
            exploreScale + ((mobile ? 1.02 : 1.48) - exploreScale) * mode;
          opacity = exploreOpacity + (1 - exploreOpacity) * mode;
          rotate = rotate + ((mobile ? -1 : 4) - rotate) * mode;

          if (engine.pendingDetailIndex !== null) {
            x += engine.switchDirection * width * 0.5 * engine.switchMix;
            opacity *= 1 - engine.switchMix;
          }
        } else if (
          engine.pendingDetailIndex === index &&
          engine.modeMix > 0.9
        ) {
          x =
            detailX -
            engine.switchDirection * width * 0.5 * (1 - engine.switchMix);
          y = detailY;
          scale =
            (mobile ? 1.02 : 1.48) * (0.78 + engine.switchMix * 0.22);
          opacity = engine.switchMix;
          rotate =
            4 + engine.switchDirection * (1 - engine.switchMix) * 16;
        }

        if (active && mode < 0.1) {
          y -= engine.hoverAmount * 10;
          scale *= 1 + engine.hoverAmount * 0.02;
          rotate += engine.pointerTiltX * 2.2;
        }

        element.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale}) rotate(${rotate}deg)`;
        element.style.opacity = String(opacity);
        element.style.zIndex = String(100 - Math.round(absolute * 10));
        element.style.pointerEvents =
          active && mode < 0.1 ? "auto" : "none";
      });

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [dishes, engineRef, onReady]);

  return (
    <div className={styles.fallbackScene} aria-hidden="true">
      {dishes.map((dish, index) => (
        <div
          key={dish.id}
          ref={(element) => {
            itemRefs.current[index] = element;
          }}
          className={styles.fallbackDish}
          data-profile={dish.procedural.profile}
          style={stylesByDish[index]}
        >
          <span className={styles.fallbackGlow} />
          <span className={styles.fallbackPedestal} />
          <span className={styles.fallbackPlate}>
            <i />
            <i />
            <i />
            <i />
            <i />
            <b />
          </span>
        </div>
      ))}
    </div>
  );
}

