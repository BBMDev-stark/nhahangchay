export type IntroPhase =
  | "loading"
  | "darkness"
  | "revealing"
  | "idle"
  | "activating"
  | "entering"
  | "completed";

export type IntroBreakpoint = "mobile" | "tablet" | "desktop";

export interface IntroAssetPaths {
  scene: string;
  sceneMobile: string;
  fork: string;
}

export interface IntroConfig {
  enabled: boolean;
  brandName: string;
  enterLabel: string;
  skipLabel: string;
  exploreHintLabel: string;
  assets: IntroAssetPaths;
  preloader: {
    minimumDurationMs: number;
    assetTimeoutMs: number;
  };
  reveal: {
    sceneMs: number;
    reducedMotionMs: number;
  };
  transition: {
    coveredHoldMs: number;
    exitMs: number;
    exitReducedMotionMs: number;
  };
  debug: {
    queryParam: string;
  };
}

export interface IntroContextValue {
  phase: IntroPhase;
  isIntroVisible: boolean;
  assetProgress: number;
  assetLoadError: boolean;
  reducedMotion: boolean;
  breakpoint: IntroBreakpoint;
  sceneSrc: string;
  forkSrc: string;
  shouldMountIntro: boolean;
  debugEnabled: boolean;

  completePreloader: () => void;
  beginRitual: () => void;
  activateEntry: () => void;
  skipIntro: () => void;
  completeIntro: () => void;
  setExitCompletionManaged: (managed: boolean) => void;
}
