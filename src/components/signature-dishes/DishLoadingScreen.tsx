"use client";

import { Flower2 } from "lucide-react";
import styles from "./signature-dishes.module.css";

export function DishLoadingScreen() {
  return (
    <div className={styles.loadingScreen} role="status" aria-live="polite">
      <Flower2 aria-hidden="true" />
      <p>Đang chuẩn bị bàn tiệc</p>
      <span aria-hidden="true">
        <i />
      </span>
    </div>
  );
}

