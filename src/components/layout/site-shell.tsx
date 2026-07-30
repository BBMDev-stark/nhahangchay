"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LenisProvider } from "@/hooks/use-lenis";
import { IntroProvider } from "@/components/intro/intro-provider";
import { useIntroController } from "@/components/intro/use-intro-controller";
import { RestaurantIntro } from "@/components/intro/restaurant-intro";
import { cn } from "@/lib/utils";

interface SiteShellProps {
  children: ReactNode;
  navbar: ReactNode;
  footer: ReactNode;
  scrollProgress: ReactNode;
  backToTop: ReactNode;
  floatingButton: ReactNode;
}

/**
 * SiteShell — điểm tích hợp Restaurant Intro vào layout hiện tại.
 *
 * layout.tsx (Server Component) chỉ gọi <SiteShell>{children}</SiteShell> —
 * mọi state client (intro phase, Lenis, ẩn/hiện chrome) sống ở đây, không
 * đụng tới layout.tsx nên SEO/metadata/JsonLd không bị ảnh hưởng.
 */
export function SiteShell(props: SiteShellProps) {
  return (
    <IntroProvider>
      <SiteShellInner {...props} />
    </IntroProvider>
  );
}

function SiteShellInner({
  children,
  navbar,
  footer,
  scrollProgress,
  backToTop,
  floatingButton,
}: SiteShellProps) {
  const { shouldMountIntro, isIntroVisible, phase } = useIntroController();
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const wasIntroVisibleRef = useRef(isIntroVisible);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration handoff
    setHydrated(true);
  }, []);

  // Sau khi intro hoàn tất, đưa focus vào nội dung chính cho người dùng
  // dùng bàn phím / screen reader — không dùng router.push, không reload.
  useEffect(() => {
    if (wasIntroVisibleRef.current && !isIntroVisible && phase === "completed") {
      contentRef.current?.focus();
    }
    wasIntroVisibleRef.current = isIntroVisible;
  }, [isIntroVisible, phase]);

  // introActive: intro CÓ chạy ở lượt mount này (chỉ true sau khi effect trong
  // IntroProvider xác nhận — lần render đầu tiên luôn khớp với SSR để tránh
  // hydration mismatch, xem ghi chú trong intro-provider.tsx).
  const introActive = shouldMountIntro;
  const revealed = !introActive || phase === "entering" || phase === "completed";
  const showDestinationChrome = !isIntroVisible || phase === "entering";
  const transitionActive = introActive && phase !== "completed";
  const preflightActive = !hydrated && pathname === "/";

  return (
    <>
      {preflightActive && (
        <div
          className="intro-preflight"
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "#ece8e0",
          }}
        >
          <div className="intro-preflight__frame">
            <div className="intro-preflight__fork" />
            <div className="intro-preflight__headline">
              <b>TỪ ĐẤT</b>
              <b>TỪ SEN</b>
              <b>TỪ MÙA</b>
            </div>
            <i className="intro-preflight__rule intro-preflight__rule--one" />
            <i className="intro-preflight__rule intro-preflight__rule--two" />
            <i className="intro-preflight__rule intro-preflight__rule--three" />
            <em>LOADING</em>
          </div>
          <span>LOTUS &amp; EARTH</span>
          <strong>00</strong>
        </div>
      )}
      {isIntroVisible && <RestaurantIntro />}
      <LenisProvider enabled={!isIntroVisible}>
        <div
          ref={contentRef}
          tabIndex={-1}
          inert={isIntroVisible}
          style={preflightActive ? { visibility: "hidden" } : undefined}
          className={cn(
            "site-theme-european flex min-h-screen flex-col outline-none",
            transitionActive && "site-reveal",
            transitionActive && (revealed ? "site-reveal--in" : "site-reveal--out")
          )}
        >
          {showDestinationChrome && scrollProgress}
          {showDestinationChrome && navbar}
          <main className="flex-1">{children}</main>
          {showDestinationChrome && footer}
          {showDestinationChrome && backToTop}
          {showDestinationChrome && floatingButton}
        </div>
      </LenisProvider>
    </>
  );
}
