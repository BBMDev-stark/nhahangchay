"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

interface LenisProviderProps {
  children: ReactNode;
  /**
   * Khi false, Lenis KHÔNG được khởi tạo (không tạo instance, không chạy raf).
   * Dùng bởi SiteShell để giữ Lenis đứng yên trong lúc Restaurant Intro đang
   * mở — tránh việc website phía sau cuộn được trong khi intro khoá scroll,
   * và tránh tồn tại hai instance Lenis cùng lúc. Mặc định true để không đổi
   * hành vi ở những nơi khác đang dùng LenisProvider.
   */
  enabled?: boolean;
}

/**
 * LenisProvider — khởi tạo smooth scroll toàn site, đồng bộ với GSAP ScrollTrigger.
 * Đặt ở RootLayout, bọc toàn bộ children.
 */
export function LenisProvider({ children, enabled = true }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Native scrolling is more reliable on touch devices. In particular, it
    // avoids a smooth-wheel controller competing with full-screen carousels,
    // modals and the interactive menu book on narrow mobile viewports.
    // Desktop keeps the existing Lenis experience unchanged.
    const prefersNativeScroll = window.matchMedia(
      "(max-width: 767px), (hover: none) and (pointer: coarse)",
    ).matches;
    if (prefersNativeScroll) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    let active = true;

    function raf(time: number) {
      if (!active) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      active = false;
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return <>{children}</>;
}
