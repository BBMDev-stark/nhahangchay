"use client";

import { useEffect, useRef, useState } from "react";

interface IntroAssetLoadState {
  progress: number;
  loadError: boolean;
}

const INITIAL_STATE: IntroAssetLoadState = {
  progress: 0,
  loadError: false,
};

function preloadImage(
  src: string,
  timeoutMs: number,
  signal: AbortSignal
): Promise<boolean> {
  return new Promise((resolve) => {
    const image = new Image();
    let settled = false;

    const finish = (loaded: boolean) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      signal.removeEventListener("abort", onAbort);
      image.onload = null;
      image.onerror = null;
      resolve(loaded);
    };

    const onAbort = () => finish(false);
    const timeout = window.setTimeout(() => finish(false), timeoutMs);

    image.onload = () => finish(true);
    image.onerror = () => finish(false);
    signal.addEventListener("abort", onAbort, { once: true });

    if (signal.aborted) {
      finish(false);
      return;
    }

    image.src = src;
  });
}

/**
 * Chỉ preload đúng hai asset thực sự xuất hiện trong intro hiện tại.
 * Scene và fork được theo dõi độc lập để không còn phụ thuộc vào layered renderer cũ.
 */
export function useIntroAssets(
  active: boolean,
  sceneSrc: string,
  forkSrc: string,
  timeoutMs: number
): IntroAssetLoadState {
  const [state, setState] = useState<IntroAssetLoadState>(INITIAL_STATE);
  const runIdRef = useRef(0);

  useEffect(() => {
    if (!active) {
      runIdRef.current += 1;
      return;
    }

    const runId = ++runIdRef.current;
    const abortController = new AbortController();
    const sources = [sceneSrc, forkSrc];
    let settledCount = 0;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- bắt đầu một lượt preload mới
    setState(INITIAL_STATE);

    const requests = sources.map(async (src) => {
      const loaded = await preloadImage(
        src,
        timeoutMs,
        abortController.signal
      );
      settledCount += 1;

      if (runIdRef.current === runId && !abortController.signal.aborted) {
        setState((previous) => ({
          ...previous,
          progress: Math.round((settledCount / sources.length) * 100),
        }));
      }

      return loaded;
    });

    void Promise.all(requests).then((results) => {
      if (runIdRef.current !== runId || abortController.signal.aborted) return;
      setState({
        progress: 100,
        loadError: results.some((loaded) => !loaded),
      });
    });

    return () => abortController.abort();
  }, [active, forkSrc, sceneSrc, timeoutMs]);

  return state;
}
