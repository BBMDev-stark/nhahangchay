import { siteConfig } from "@/config/site.config";
import type { IntroConfig } from "@/components/intro/types";

/**
 * Nguồn cấu hình duy nhất cho intro hiện tại:
 * Fork loading → editorial gate → Hương Sen → fog reveal → website.
 *
 * Các cấu hình 2.5D, cửa, panel phụ và layered renderer cũ đã được loại bỏ.
 */
export const introConfig: IntroConfig = {
  enabled: true,

  brandName: siteConfig.name,
  enterLabel: "Bước Vào Hương Sen",
  skipLabel: "Bỏ Qua Giới Thiệu",
  exploreHintLabel: "Di chuyển đến món ăn để gọi ánh sáng",

  assets: {
    scene: "/images/intro/living-lotus-hero-v4.webp",
    sceneMobile: "/images/intro/living-lotus-hero-mobile-v4.webp",
    fork: "/images/intro/fork-real-transparent-v1.png",
  },

  preloader: {
    minimumDurationMs: 1200,
    assetTimeoutMs: 4000,
  },

  reveal: {
    sceneMs: 650,
    reducedMotionMs: 160,
  },

  transition: {
    coveredHoldMs: 650,
    exitMs: 650,
    exitReducedMotionMs: 180,
  },

  debug: {
    queryParam: "introDebug",
  },
};
