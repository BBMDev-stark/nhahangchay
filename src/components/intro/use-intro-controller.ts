"use client";

import { useContext } from "react";
import { IntroContext } from "./intro-provider";
import type { IntroContextValue } from "./types";

/**
 * Hook tiêu chuẩn để mọi component trong src/components/intro (và SiteShell)
 * đọc state / gọi action của intro. Không truyền props xuyên tầng.
 */
export function useIntroController(): IntroContextValue {
  const ctx = useContext(IntroContext);
  if (!ctx) {
    throw new Error("useIntroController phải được gọi bên trong <IntroProvider>.");
  }
  return ctx;
}
