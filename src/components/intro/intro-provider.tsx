"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { introConfig } from "@/config/intro.config";
import { BREAKPOINTS } from "@/constants/design";
import { useIntroAssets } from "./use-intro-assets";
import type {
  IntroBreakpoint,
  IntroContextValue,
  IntroPhase,
} from "./types";

export const IntroContext = createContext<IntroContextValue | null>(null);

const INTRO_SESSION_KEY = "lotus-earth-intro-seen";

export function IntroProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHomeRoute = pathname === "/";

  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
  const isTablet = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
  const prefersStaticScene = useMediaQuery("(hover: none), (pointer: coarse)");
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const breakpoint: IntroBreakpoint =
    prefersStaticScene || !isLandscape || !isTablet
      ? "mobile"
      : isDesktop
        ? "desktop"
        : "tablet";

  // Dùng cùng một nguồn cho preload và render để không còn lệch asset trên
  // thiết bị touch nằm ngang.
  const sceneSrc =
    breakpoint === "mobile" && !isLandscape
      ? introConfig.assets.sceneMobile
      : introConfig.assets.scene;
  const forkSrc = introConfig.assets.fork;

  // Khởi tạo đúng trạng thái ngay từ SSR/hydration trên trang chủ. Nếu bắt đầu
  // bằng `false`, website đích có thể lộ ra một frame trước khi effect bật intro.
  const [shouldMountIntro, setShouldMountIntro] = useState(
    () => introConfig.enabled && isHomeRoute
  );
  const [debugEnabled, setDebugEnabled] = useState(false);
  const [phase, setPhase] = useState<IntroPhase>("loading");
  const [exitCompletionManaged, setExitCompletionManaged] = useState(false);

  useEffect(() => {
    if (!introConfig.enabled || !isHomeRoute) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- route-derived intro gate
      setShouldMountIntro(false);
      setPhase("completed");
      return;
    }

    let debugFromQuery = false;
    try {
      const params = new URLSearchParams(window.location.search);
      debugFromQuery =
        process.env.NODE_ENV === "development" &&
        params.get(introConfig.debug.queryParam) === "1";
    } catch {
      debugFromQuery = false;
    }

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(INTRO_SESSION_KEY) === "true";
    } catch {
      alreadySeen = false;
    }

    // Giữ nghi thức thương hiệu ở lượt đầu, nhưng không bắt khách quay lại
    // trả lại toàn bộ chi phí animation và tải asset trong cùng một phiên.
    if (alreadySeen && !debugFromQuery) {
      setShouldMountIntro(false);
      setDebugEnabled(false);
      setPhase("completed");
      setExitCompletionManaged(false);
      return;
    }

    setShouldMountIntro(true);
    setDebugEnabled(debugFromQuery);
    setPhase("loading");
    setExitCompletionManaged(false);
  }, [isHomeRoute]);

  const { progress: assetProgress, loadError: assetLoadError } =
    useIntroAssets(
      shouldMountIntro,
      sceneSrc,
      forkSrc,
      introConfig.preloader.assetTimeoutMs
    );

  const isIntroVisible =
    isHomeRoute && shouldMountIntro && phase !== "completed";

  useEffect(() => {
    if (!isHomeRoute || phase !== "completed" || debugEnabled) return;
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, "true");
    } catch {
      // Storage có thể bị chặn; intro vẫn phải kết thúc bình thường.
    }
  }, [debugEnabled, isHomeRoute, phase]);

  useEffect(() => {
    if (!isIntroVisible) return;

    const body = document.body;
    const root = document.documentElement;
    const previousOverflow = body.style.overflow;
    const previousPosition = body.style.position;
    const previousInset = body.style.inset;
    const previousWidth = body.style.width;
    const previousRootOverflow = root.style.overflow;
    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.inset = "0";
    body.style.width = "100%";
    root.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousOverflow;
      body.style.position = previousPosition;
      body.style.inset = previousInset;
      body.style.width = previousWidth;
      root.style.overflow = previousRootOverflow;
      window.history.scrollRestoration = previousScrollRestoration;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };
  }, [isIntroVisible]);

  useEffect(() => {
    if (phase !== "revealing") return;
    const duration = reducedMotion
      ? introConfig.reveal.reducedMotionMs
      : introConfig.reveal.sceneMs;
    const timer = window.setTimeout(() => setPhase("idle"), duration);
    return () => window.clearTimeout(timer);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (phase !== "activating") return;
    const duration = reducedMotion
      ? introConfig.transition.exitReducedMotionMs
      : introConfig.transition.coveredHoldMs;
    const timer = window.setTimeout(() => setPhase("entering"), duration);
    return () => window.clearTimeout(timer);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (phase !== "entering" || exitCompletionManaged) return;
    const duration = reducedMotion
      ? introConfig.transition.exitReducedMotionMs
      : introConfig.transition.exitMs;
    const timer = window.setTimeout(() => setPhase("completed"), duration);
    return () => window.clearTimeout(timer);
  }, [exitCompletionManaged, phase, reducedMotion]);

  const completePreloader = useCallback(() => {
    setPhase((current) => (current === "loading" ? "darkness" : current));
  }, []);

  const beginRitual = useCallback(() => {
    setPhase((current) => (current === "darkness" ? "revealing" : current));
  }, []);

  const activateEntry = useCallback(() => {
    setPhase((current) => (current === "idle" ? "activating" : current));
  }, []);

  const skipIntro = useCallback(() => {
    setExitCompletionManaged(false);
    setPhase((current) =>
      current === "completed" || current === "entering"
        ? current
        : "entering"
    );
  }, []);

  const completeIntro = useCallback(() => {
    setExitCompletionManaged(false);
    setPhase("completed");
  }, []);

  const value = useMemo<IntroContextValue>(
    () => ({
      phase,
      isIntroVisible,
      assetProgress,
      assetLoadError,
      reducedMotion,
      breakpoint,
      sceneSrc,
      forkSrc,
      shouldMountIntro,
      debugEnabled,
      completePreloader,
      beginRitual,
      activateEntry,
      skipIntro,
      completeIntro,
      setExitCompletionManaged,
    }),
    [
      phase,
      isIntroVisible,
      assetProgress,
      assetLoadError,
      reducedMotion,
      breakpoint,
      sceneSrc,
      forkSrc,
      shouldMountIntro,
      debugEnabled,
      completePreloader,
      beginRitual,
      activateEntry,
      skipIntro,
      completeIntro,
    ]
  );

  return (
    <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
  );
}
