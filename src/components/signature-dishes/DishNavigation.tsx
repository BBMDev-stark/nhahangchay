"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./signature-dishes.module.css";

type DishNavigationProps = {
  onPrevious: () => void;
  onNext: () => void;
  disabled?: boolean;
  compact?: boolean;
  tabIndex?: number;
};

export function DishNavigation({
  onPrevious,
  onNext,
  disabled = false,
  compact = false,
  tabIndex,
}: DishNavigationProps) {
  return (
    <div
      className={`${styles.navigation} ${compact ? styles.navigationCompact : ""}`}
      aria-label="Điều hướng món ăn"
    >
      <button
        type="button"
        className={styles.navButton}
        onClick={onPrevious}
        disabled={disabled}
        tabIndex={tabIndex}
        aria-label="Xem món trước"
      >
        <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.25} />
      </button>
      <span className={styles.navRule} aria-hidden="true" />
      <button
        type="button"
        className={styles.navButton}
        onClick={onNext}
        disabled={disabled}
        tabIndex={tabIndex}
        aria-label="Xem món tiếp theo"
      >
        <ArrowRight aria-hidden="true" size={18} strokeWidth={1.25} />
      </button>
    </div>
  );
}

