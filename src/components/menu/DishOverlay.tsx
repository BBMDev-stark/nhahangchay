"use client";

import { motion } from "framer-motion";

type DishOverlayProps = {
  onClose: () => void;
};

const easeLuxury = [0.22, 1, 0.36, 1] as const;

/**
 * Lớp nền phía sau modal: làm mờ + tối website đằng sau bằng backdrop-filter,
 * không cần can thiệp vào layout gốc của trang. Click vào đây sẽ đóng modal.
 */
export function DishOverlay({ onClose }: DishOverlayProps) {
  return (
    <motion.button
      type="button"
      aria-label="Đóng chi tiết món ăn"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easeLuxury }}
      className="absolute inset-0 h-full w-full cursor-default bg-bg-dark/55 backdrop-blur-2xl backdrop-brightness-[0.55]"
    />
  );
}