"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  Flame,
  Leaf,
} from "lucide-react";
import {
  forwardRef,
  type ForwardedRef,
} from "react";
import { DishNavigation } from "./DishNavigation";
import { IngredientList } from "./IngredientList";
import type { DishExperiencePhase, SignatureDish } from "./types";
import styles from "./signature-dishes.module.css";

type DishDetailOverlayProps = {
  dish: SignatureDish;
  index: number;
  count: number;
  phase: DishExperiencePhase;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

function DishDetailOverlayComponent(
  {
    dish,
    index,
    count,
    phase,
    onClose,
    onPrevious,
    onNext,
  }: DishDetailOverlayProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const interactive = phase === "detail";

  return (
    <div
      className={styles.detailOverlay}
      aria-hidden={
        phase === "loading" ||
        phase === "explore" ||
        phase === "dragging" ||
        phase === "snapping"
      }
      data-dish-detail
    >
      <div className={styles.detailTopbar}>
        <button
          ref={ref}
          type="button"
          className={styles.backButton}
          onClick={onClose}
          disabled={!interactive}
          tabIndex={interactive ? 0 : -1}
          data-dish-detail-reveal
          data-dish-copy
        >
          <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.3} />
          Quay lại
        </button>
        <p
          className={styles.detailIndex}
          data-dish-detail-reveal
          data-dish-copy
        >
          {String(index + 1).padStart(2, "0")}
          <span>/</span>
          {String(count).padStart(2, "0")}
        </p>
        <div data-dish-detail-reveal>
          <DishNavigation
            onPrevious={onPrevious}
            onNext={onNext}
            disabled={!interactive}
            compact
            tabIndex={interactive ? 0 : -1}
          />
        </div>
      </div>

      <article className={styles.detailCopy} aria-label={`Chi tiết ${dish.name}`}>
        <div
          className={`${styles.badges} ${styles.detailBadges}`}
          data-dish-detail-reveal
          data-dish-copy
        >
          {dish.badges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>

        <div
          className={styles.titleMask}
          data-dish-detail-reveal
          data-dish-copy
        >
          <h3>
            {dish.titleLines[0]}
            {dish.titleLines[1] && <span>{dish.titleLines[1]}</span>}
          </h3>
        </div>

        <p
          className={styles.tagline}
          data-dish-detail-reveal
          data-dish-copy
        >
          {dish.tagline}
        </p>

        <div
          className={styles.detailDivider}
          data-dish-detail-reveal
          data-dish-copy
          aria-hidden="true"
        >
          <span />
          <FlowerDivider />
          <span />
        </div>

        <p
          className={styles.description}
          data-dish-detail-reveal
          data-dish-copy
        >
          {dish.description}
        </p>

        <dl className={styles.meta} data-dish-detail-reveal data-dish-copy>
          <div>
            <Flame aria-hidden="true" size={15} strokeWidth={1.4} />
            <dt>Năng lượng</dt>
            <dd>{dish.calories} kcal</dd>
          </div>
          <div>
            <Leaf aria-hidden="true" size={15} strokeWidth={1.4} />
            <dt>Thành phần chính</dt>
            <dd>{dish.primaryIngredients}</dd>
          </div>
        </dl>

        <div className={styles.detailCta} data-dish-detail-reveal data-dish-copy>
          <strong>{dish.price.toLocaleString("vi-VN")} đ</strong>
          <a
            href="#reservation"
            tabIndex={interactive ? 0 : -1}
            aria-label={`Đặt món ${dish.name}`}
          >
            Đặt món ngay
            <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.25} />
          </a>
        </div>
      </article>

      <aside className={styles.ingredientsPanel}>
        <p className={styles.ingredientsEyebrow} data-dish-detail-reveal>
          Thành phần tuyển chọn
        </p>
        <IngredientList ingredients={dish.ingredients} />
      </aside>
    </div>
  );
}

function FlowerDivider() {
  return (
    <span className={styles.flowerDivider} aria-hidden="true">
      ◇
    </span>
  );
}

export const DishDetailOverlay = forwardRef(DishDetailOverlayComponent);

