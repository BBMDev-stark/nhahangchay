import { siteConfig } from "@/config/site.config";
import type { IntroConfig } from "@/components/intro/types";

/**
 * Nguồn cấu hình duy nhất cho intro hiện tại:
 * Fork loading → editorial gate → Living Lotus → fog reveal → website.
 *
 * Các cấu hình 2.5D, cửa, panel phụ và layered renderer cũ đã được loại bỏ.
 */
export const introConfig: IntroConfig = {
  enabled: true,

  brandName: siteConfig.name,
  enterLabel: "Khám Phá Món Ăn",
  skipLabel: "Bỏ Qua Nghi Thức",
  exploreHintLabel: "Di chuyển lên món ăn để gọi ánh sáng",

  assets: {
    scene: "/images/intro/living-lotus-hero-v4.webp",
    sceneMobile: "/images/intro/living-lotus-hero-mobile-v4.webp",
    fork: "/images/intro/fork-real-transparent-v1.png",
  },

  preloader: {
    minimumDurationMs: 3600,
    assetTimeoutMs: 8000,
  },

  reveal: {
    sceneMs: 980,
    reducedMotionMs: 220,
  },

  transition: {
    coveredHoldMs: 1400,
    exitMs: 1250,
    exitReducedMotionMs: 260,
  },

  debug: {
    queryParam: "introDebug",
  },
};
