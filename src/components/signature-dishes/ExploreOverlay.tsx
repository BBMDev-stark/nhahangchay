"use client";

import {
  MoveHorizontal,
  Sparkles,
} from "lucide-react";
import {
  forwardRef,
  type ForwardedRef,
} from "react";
import { DishNavigation } from "./DishNavigation";
import type { DishExperiencePhase, SignatureDish } from "./types";
import styles from "./signature-dishes.module.css";

type ExploreOverlayProps = {
  dish: SignatureDish;
  index: number;
  count: number;
  phase: DishExperiencePhase;
  onOpen: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

function ExploreOverlayComponent(
  {
    dish,
    index,
    count,
    phase,
    onOpen,
    onPrevious,
    onNext,
  }: ExploreOverlayProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const interactive =
    phase === "explore" || phase === "dragging" || phase === "snapping";
  const canOpen = phase === "explore";

  return (
    <div
      className={styles.exploreOverlay}
      aria-hidden={!interactive}
      data-dish-explore
    >
      <header className={styles.exploreHeader} data-dish-explore-reveal>
        <svg
          className={styles.lotusMark}
          viewBox="0 0 48 42"
          fill="none"
          aria-hidden="true"
        >
          <path d="M24 37C14.5 31.8 10.2 22.7 11.3 13.3c7.7 3.5 12.6 11.8 12.7 23.7Z" />
          <path d="M24 37c9.5-5.2 13.8-14.3 12.7-23.7C29 16.8 24.1 25.1 24 37Z" />
          <path d="M24 36.5C17.8 28.4 18.2 17.2 24 6c5.8 11.2 6.2 22.4 0 30.5Z" />
          <path d="M21.7 36.4C12.3 34.8 5.9 28.8 3.5 20.2c7.8.2 15.2 5.7 18.2 16.2Z" />
          <path d="M26.3 36.4c9.4-1.6 15.8-7.6 18.2-16.2-7.8.2-15.2 5.7-18.2 16.2Z" />
          <path d="M10.2 36.7c8.9 2.2 18.7 2.2 27.6 0" />
        </svg>
        <div className={styles.eyebrow}>
          <span aria-hidden="true" />
          <p>Món đặc trưng</p>
          <span aria-hidden="true" />
        </div>
        <h2>Signature Dishes</h2>
        <p className={styles.subtitle}>
          Những món ăn tinh túy nhất, kết tinh từ triết lý ẩm thực
          và tay nghề của đội ngũ đầu bếp.
        </p>
      </header>

      <div className={styles.exploreSideNavigation} data-dish-explore-reveal>
        <button
          type="button"
          className={styles.edgeButton}
          onClick={onPrevious}
          disabled={!interactive}
          tabIndex={interactive ? 0 : -1}
          aria-label="Xem món trước"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className={styles.edgeButton}
          onClick={onNext}
          disabled={!interactive}
          tabIndex={interactive ? 0 : -1}
          aria-label="Xem món tiếp theo"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className={styles.activeDishInfo} data-dish-explore-reveal>
        <div className={styles.namePrice}>
          <h3>{dish.name}</h3>
          <span>{dish.price.toLocaleString("vi-VN")} đ</span>
        </div>
        <div className={styles.badges} aria-label="Đặc điểm món ăn">
          {dish.badges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
        <button
          ref={ref}
          type="button"
          className={styles.exploreDishButton}
          onClick={onOpen}
          disabled={!canOpen}
          tabIndex={canOpen ? 0 : -1}
          aria-label={`Khám phá chi tiết ${dish.name}`}
        >
          <Sparkles aria-hidden="true" size={13} />
          Chạm để khám phá
        </button>
        <div className={styles.progress} aria-hidden="true">
          <span
            style={{ width: `${((index + 1) / count) * 100}%` }}
          />
        </div>
        <p className={styles.index}>
          <strong>{String(index + 1).padStart(2, "0")}</strong>
          <span>/</span>
          {String(count).padStart(2, "0")}
        </p>
      </div>

      <div className={styles.exploreInstruction} data-dish-explore-reveal>
        <MoveHorizontal aria-hidden="true" size={17} strokeWidth={1.3} />
        <span>Kéo ngang để khám phá · Cuộn dọc để tiếp tục</span>
      </div>

      <div className={styles.mobileNavigation} data-dish-explore-reveal>
        <DishNavigation
          onPrevious={onPrevious}
          onNext={onNext}
          disabled={!interactive}
          compact
          tabIndex={interactive ? 0 : -1}
        />
      </div>
    </div>
  );
}

export const ExploreOverlay = forwardRef(ExploreOverlayComponent);
