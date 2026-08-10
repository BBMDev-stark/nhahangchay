"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
} from "react";
import { signatureDishes } from "@/features/menu/data/signature-dishes";
import { DishDetailOverlay } from "./DishDetailOverlay";
import { DishLoadingScreen } from "./DishLoadingScreen";
import { DishPhotoCarousel } from "./DishPhotoCarousel";
import { ExploreOverlay } from "./ExploreOverlay";
import { useDishExperience } from "./useDishExperience";
import styles from "./signature-dishes.module.css";

type DishThemeStyle = CSSProperties & {
  "--dish-theme-bg": string;
  "--dish-theme-bg-soft": string;
  "--dish-theme-surface": string;
  "--dish-theme-olive": string;
  "--dish-theme-glow": string;
  "--dish-theme-accent": string;
  "--dish-theme-accent-light": string;
};

export function SignatureDishesExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const previousPhaseRef = useRef("loading");

  const {
    state,
    engineRef,
    ready,
    feedWheel,
    snapBy,
    openActive,
    switchDetail,
    closeDetail,
    handleKeyDown,
    pointerHandlers,
  } = useDishExperience({
    count: signatureDishes.length,
    rootRef,
  });

  const dish = signatureDishes[state.displayIndex] ?? signatureDishes[0];

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (event: WheelEvent) => {
      const horizontalIntent =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.15;
      const shiftedVertical = event.shiftKey && Math.abs(event.deltaY) > 0;

      // Vertical wheel remains native so the section never traps page scroll.
      // Trackpad horizontal gestures and Shift + wheel control the carousel.
      if (!horizontalIntent && !shiftedVertical) return;

      const delta = horizontalIntent ? event.deltaX : event.deltaY;
      const normalized =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? delta * 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? delta * window.innerWidth
            : delta;

      if (feedWheel(normalized)) {
        event.preventDefault();
      }
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [feedWheel]);

  useEffect(() => {
    const previous = previousPhaseRef.current;
    if (state.phase === "detail" && previous !== "detail") {
      backButtonRef.current?.focus({ preventScroll: true });
    }
    if (state.phase === "explore" && previous === "closing") {
      exploreButtonRef.current?.focus({ preventScroll: true });
    }
    previousPhaseRef.current = state.phase;
  }, [state.phase]);

  const handlePhotoReady = useCallback(() => {
    ready("photo");
  }, [ready]);

  const themeStyle: DishThemeStyle = {
    "--dish-theme-bg": dish.theme.background,
    "--dish-theme-bg-soft": dish.theme.backgroundSoft,
    "--dish-theme-surface": dish.theme.surface,
    "--dish-theme-olive": dish.theme.olive,
    "--dish-theme-glow": dish.theme.glow,
    "--dish-theme-accent": dish.theme.accent,
    "--dish-theme-accent-light": dish.theme.accentLight,
  };

  return (
    <section
      ref={rootRef}
      id="signature-dishes"
      className={styles.section}
      data-phase={state.phase}
      data-render-mode={state.renderMode}
      style={themeStyle}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-roledescription="bộ sưu tập món ăn tương tác"
      aria-label="Món chay gợi ý của Hương Sen"
    >
      <div className={styles.background} aria-hidden="true">
        <span className={styles.backgroundRaster} />
        <span className={styles.backgroundNoise} />
      </div>

      <div
        ref={stageRef}
        className={styles.stage}
        {...pointerHandlers}
      >
        <DishPhotoCarousel
          dishes={signatureDishes}
          engineRef={engineRef}
          onOpen={openActive}
          onReady={handlePhotoReady}
        />
      </div>

      <ExploreOverlay
        ref={exploreButtonRef}
        dish={dish}
        index={state.activeIndex}
        count={signatureDishes.length}
        phase={state.phase}
        onOpen={openActive}
        onPrevious={() => snapBy(-1)}
        onNext={() => snapBy(1)}
      />

      <DishDetailOverlay
        ref={backButtonRef}
        dish={dish}
        index={state.displayIndex}
        count={signatureDishes.length}
        phase={state.phase}
        onClose={closeDetail}
        onPrevious={() => switchDetail(-1)}
        onNext={() => switchDetail(1)}
      />

      {state.phase === "loading" && <DishLoadingScreen />}

      <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {state.phase === "detail"
          ? `Đang xem chi tiết ${dish.name}`
          : `Món đang chọn: ${dish.name}, ${state.activeIndex + 1} trên ${signatureDishes.length}`}
      </p>
    </section>
  );
}
