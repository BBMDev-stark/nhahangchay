"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

export type FogTransitionHandle = {
  play: (existingClickAction: () => void) => void;
};

type FogState = "idle" | "entering" | "covered" | "revealing" | "complete";

type FogTransitionOverlayProps = {
  destinationReady: boolean;
  reducedMotion?: boolean;
  revealX?: string;
  revealY?: string;
  onRevealComplete?: () => void;
};

export const FogTransitionOverlay = forwardRef<
  FogTransitionHandle,
  FogTransitionOverlayProps
>(function FogTransitionOverlay(
  {
    destinationReady,
    reducedMotion = false,
    revealX = "50%",
    revealY = "52%",
    onRevealComplete,
  },
  ref
) {
  const [fogState, setFogState] = useState<FogState>("idle");
  const [runId, setRunId] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const clickActionRef = useRef<(() => void) | null>(null);
  const runningRef = useRef(false);
  const coveredRef = useRef(false);
  const revealStartedRef = useRef(false);

  useImperativeHandle(
    ref,
    () => ({
      play(existingClickAction) {
        if (runningRef.current) return;
        runningRef.current = true;
        coveredRef.current = false;
        revealStartedRef.current = false;
        clickActionRef.current = existingClickAction;
        setFogState("entering");
        setRunId((value) => value + 1);
      },
    }),
    []
  );

  useLayoutEffect(() => {
    if (runId === 0) return;
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      const back = root.querySelector<HTMLElement>("[data-fog-back]");
      const left = root.querySelector<HTMLElement>("[data-fog-left]");
      const right = root.querySelector<HTMLElement>("[data-fog-right]");
      const front = root.querySelector<HTMLElement>("[data-fog-front]");
      const haze = root.querySelector<HTMLElement>("[data-fog-haze]");
      const texture = root.querySelector<HTMLElement>(".click-fog__texture");

      const runExistingClick = () => {
        if (coveredRef.current) return;
        coveredRef.current = true;
        clickActionRef.current?.();
      };

      const markCovered = () => {
        runExistingClick();
        timelineRef.current = null;
        setFogState("covered");
      };

      gsap.set(root, {
        autoAlpha: 1,
        "--fog-reveal-width": "0.1vw",
        "--fog-reveal-height": "0.1vh",
        "--fog-reveal-x": revealX,
        "--fog-reveal-y": revealY,
      });

      if (reducedMotion) {
        const reducedTimeline = gsap.timeline({
          defaults: { overwrite: "auto" },
        });
        timelineRef.current = reducedTimeline;
        reducedTimeline
          .addLabel("clickConfirm")
          .to(haze, { opacity: 1, duration: 0.24, ease: "power1.out" })
          .addLabel("fogCovered")
          .call(markCovered);
        return;
      }

      gsap.set(back, { opacity: 0, scale: 1.04 });
      gsap.set(left, { x: "-38vw", scale: 1.02, opacity: 0 });
      gsap.set(right, { x: "39vw", scale: 1, opacity: 0 });
      gsap.set(front, { x: "-5vw", y: "17vh", scale: 1.08, opacity: 0 });
      gsap.set(haze, { opacity: 0 });

      const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });
      timelineRef.current = timeline;

      timeline
        .addLabel("clickConfirm", 0)
        .to({}, { duration: 0.22 })
        .addLabel("fogEnter", 0.22)
        .to(
          back,
          { opacity: 0.9, scale: 1.12, duration: 0.78, ease: "power1.inOut" },
          "fogEnter"
        )
        .to(
          left,
          {
            x: "7vw",
            scale: 1.18,
            opacity: 0.94,
            duration: 0.72,
            ease: "power2.inOut",
          },
          "fogEnter"
        )
        .to(
          right,
          {
            x: "-5vw",
            scale: 1.16,
            opacity: 0.9,
            duration: 0.7,
            ease: "power2.inOut",
          },
          "fogEnter+=0.05"
        )
        .to(
          front,
          {
            x: "2vw",
            y: "-2vh",
            scale: 1.24,
            opacity: 1,
            duration: 0.62,
            ease: "power2.inOut",
          },
          "fogEnter+=0.08"
        )
        .to(
          haze,
          { opacity: 1, duration: 0.5, ease: "power2.in" },
          "fogEnter+=0.24"
        )
        .addLabel("fogCovered", 1)
        .call(markCovered, [], "fogCovered");

      gsap.set([root, back, left, right, front, haze, texture], {
        willChange: "opacity, transform",
      });
    }, root);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      context.revert();
    };
  }, [runId, reducedMotion, revealX, revealY]);

  useEffect(() => {
    if (fogState !== "covered") return;

    const delay = reducedMotion ? 0 : destinationReady ? 850 : 1800;
    const revealTimer = window.setTimeout(() => {
      if (revealStartedRef.current) return;

      const root = rootRef.current;
      if (!root) {
        runningRef.current = false;
        clickActionRef.current = null;
        setFogState("complete");
        onRevealComplete?.();
        return;
      }

      revealStartedRef.current = true;
      setFogState("revealing");

      const back = root.querySelector<HTMLElement>("[data-fog-back]");
      const left = root.querySelector<HTMLElement>("[data-fog-left]");
      const right = root.querySelector<HTMLElement>("[data-fog-right]");
      const front = root.querySelector<HTMLElement>("[data-fog-front]");
      const haze = root.querySelector<HTMLElement>("[data-fog-haze]");
      const texture = root.querySelector<HTMLElement>(".click-fog__texture");

      const finish = () => {
        timelineRef.current = null;
        clickActionRef.current = null;
        runningRef.current = false;
        setFogState("complete");
        onRevealComplete?.();
      };

      const revealTimeline = gsap.timeline({
        defaults: { overwrite: "auto" },
      });
      timelineRef.current = revealTimeline;

      if (reducedMotion) {
        revealTimeline
          .to(
            [back, left, right, front, haze, texture],
            { opacity: 0, duration: 0.2, ease: "power2.out" }
          )
          .set(root, { autoAlpha: 0, pointerEvents: "none" })
          .call(finish);
        return;
      }

      revealTimeline
        .addLabel("fogReveal", 0)
        .to(
          root,
          {
            "--fog-reveal-width": "52vw",
            "--fog-reveal-height": "34vh",
            duration: 0.78,
            ease: "power2.out",
          },
          "fogReveal"
        )
        .to(
          front,
          {
            x: "-4vw",
            y: "-18vh",
            scale: 1.36,
            opacity: 0,
            duration: 0.96,
            ease: "power1.inOut",
          },
          "fogReveal"
        )
        .to(
          left,
          {
            x: "-27vw",
            y: "-8vh",
            scale: 1.28,
            opacity: 0,
            duration: 1.42,
            ease: "power1.inOut",
          },
          "fogReveal+=0.16"
        )
        .to(
          right,
          {
            x: "29vw",
            y: "8vh",
            scale: 1.26,
            opacity: 0,
            duration: 1.48,
            ease: "power1.inOut",
          },
          "fogReveal+=0.22"
        )
        .to(
          root,
          {
            "--fog-reveal-width": "215vw",
            "--fog-reveal-height": "190vh",
            duration: 1.28,
            ease: "power2.inOut",
          },
          "fogReveal+=0.56"
        )
        .addLabel("hazeClear", 1.1)
        .to(
          [back, haze, texture],
          { opacity: 0, duration: 0.92, ease: "power3.out" },
          "hazeClear"
        )
        .addLabel("cleanup", 2.22)
        .set(root, { autoAlpha: 0, pointerEvents: "none" }, "cleanup")
        .addLabel("complete", 2.24)
        .call(finish, [], "complete");
    }, delay);

    return () => window.clearTimeout(revealTimer);
  }, [destinationReady, fogState, onRevealComplete, reducedMotion]);

  if (fogState === "idle" || fogState === "complete") return null;

  return (
    <div
      ref={rootRef}
      className="click-fog"
      data-state={fogState}
      aria-hidden="true"
    >
      <div className="click-fog__back" data-fog-back />
      <div className="click-fog__mid click-fog__mid--left" data-fog-left />
      <div className="click-fog__mid click-fog__mid--right" data-fog-right />
      <div className="click-fog__front" data-fog-front />
      <div className="click-fog__haze" data-fog-haze />
      <div className="click-fog__texture" />
    </div>
  );
});
