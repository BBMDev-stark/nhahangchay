"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import {
  CAROUSEL_IDLE_MS,
  CAROUSEL_SNAP_MS,
  CAROUSEL_SNAP_REDUCED_MS,
  clamp,
  createDishMotionEngine,
  easeOutCubic,
  nearestOccurrence,
  normalizeIndex,
} from "./carousel-engine";
import type {
  DishExperiencePhase,
  DishExperienceState,
} from "./types";

type ExperienceAction =
  | { type: "READY"; mode: "photo" }
  | { type: "ACTIVE"; index: number }
  | { type: "DRAG_START" }
  | { type: "SNAP_START" }
  | { type: "SNAP_DONE"; index: number }
  | { type: "OPEN"; index: number }
  | { type: "OPEN_DONE" }
  | { type: "SWITCH_START" }
  | { type: "DISPLAY"; index: number }
  | { type: "SWITCH_DONE"; index: number }
  | { type: "CLOSE" }
  | { type: "CLOSE_DONE"; index: number };

function reducer(
  state: DishExperienceState,
  action: ExperienceAction,
): DishExperienceState {
  switch (action.type) {
    case "READY":
      if (state.phase !== "loading") {
        return { ...state, renderMode: action.mode };
      }
      return { ...state, renderMode: action.mode, phase: "explore" };
    case "ACTIVE":
      return state.phase === "detail" || state.phase === "switching-detail"
        ? state
        : { ...state, activeIndex: action.index, displayIndex: action.index };
    case "DRAG_START":
      return state.phase === "opening" ||
        state.phase === "detail" ||
        state.phase === "switching-detail" ||
        state.phase === "closing"
        ? state
        : { ...state, phase: "dragging" };
    case "SNAP_START":
      return state.phase === "opening" ||
        state.phase === "detail" ||
        state.phase === "switching-detail" ||
        state.phase === "closing"
        ? state
        : { ...state, phase: "snapping" };
    case "SNAP_DONE":
      return {
        ...state,
        phase: "explore",
        activeIndex: action.index,
        displayIndex: action.index,
      };
    case "OPEN":
      return {
        ...state,
        phase: "opening",
        activeIndex: action.index,
        displayIndex: action.index,
      };
    case "OPEN_DONE":
      return { ...state, phase: "detail" };
    case "SWITCH_START":
      return { ...state, phase: "switching-detail" };
    case "DISPLAY":
      return { ...state, displayIndex: action.index };
    case "SWITCH_DONE":
      return {
        ...state,
        phase: "detail",
        activeIndex: action.index,
        displayIndex: action.index,
      };
    case "CLOSE":
      return { ...state, phase: "closing" };
    case "CLOSE_DONE":
      return {
        ...state,
        phase: "explore",
        activeIndex: action.index,
        displayIndex: action.index,
      };
    default:
      return state;
  }
}

type UseDishExperienceOptions = {
  count: number;
  rootRef: RefObject<HTMLElement | null>;
};

type PointerSession = {
  id: number;
  startX: number;
  startY: number;
  lastX: number;
  lastTime: number;
  moved: boolean;
  horizontal: boolean;
};

function elements(root: HTMLElement, selector: string) {
  return gsap.utils.toArray<HTMLElement>(selector, root);
}

export function useDishExperience({
  count,
  rootRef,
}: UseDishExperienceOptions) {
  const [state, dispatch] = useReducer(reducer, {
    phase: "loading",
    renderMode: "pending",
    activeIndex: 0,
    displayIndex: 0,
  });

  const engineRef = useRef(createDishMotionEngine());
  const phaseRef = useRef<DishExperiencePhase>("loading");
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pointerSessionRef = useRef<PointerSession | null>(null);
  const suppressClickRef = useRef(false);
  const activeIndexRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    phaseRef.current = state.phase;
  }, [state.phase]);

  useEffect(() => {
    activeIndexRef.current = state.activeIndex;
  }, [state.activeIndex]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      engineRef.current.reducedMotion = media.matches;
      engineRef.current.snapDuration = media.matches
        ? CAROUSEL_SNAP_REDUCED_MS
        : CAROUSEL_SNAP_MS;
    };

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      gsap.set(elements(root, "[data-dish-detail-reveal]"), {
        autoAlpha: 0,
        y: 18,
      });
      gsap.set(elements(root, "[data-dish-ingredient]"), {
        autoAlpha: 0,
        x: 14,
      });
    }, root);

    return () => context.revert();
  }, [rootRef]);

  const writeMotionVariables = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    root.style.setProperty("--dish-mode-mix", engineRef.current.modeMix.toFixed(4));
    root.style.setProperty(
      "--dish-switch-mix",
      engineRef.current.switchMix.toFixed(4),
    );
  }, [rootRef]);

  const startSnap = useCallback(
    (target?: number) => {
      const engine = engineRef.current;
      if (
        phaseRef.current === "loading" ||
        phaseRef.current === "opening" ||
        phaseRef.current === "detail" ||
        phaseRef.current === "switching-detail" ||
        phaseRef.current === "closing"
      ) {
        return;
      }

      engine.dragging = false;
      engine.interacting = false;
      engine.velocity = 0;
      engine.snapFrom = engine.progress;
      engine.snapTarget = target ?? Math.round(engine.progress);
      engine.snapStartedAt = performance.now();
      engine.snapDuration = engine.reducedMotion
        ? CAROUSEL_SNAP_REDUCED_MS
        : CAROUSEL_SNAP_MS;
      dispatch({ type: "SNAP_START" });
    },
    [],
  );

  useEffect(() => {
    const tick = (now: number) => {
      const engine = engineRef.current;
      const phase = phaseRef.current;

      if (phase === "dragging" && !engine.dragging) {
        if (Math.abs(engine.velocity) > 0.00008) {
          engine.progress += engine.velocity;
          engine.dragVelocity = engine.velocity;
          engine.velocity *= engine.reducedMotion ? 0.52 : 0.91;
        }

        if (now - engine.lastInputAt >= CAROUSEL_IDLE_MS) {
          startSnap();
        }
      } else if (phase === "snapping") {
        const elapsed = now - engine.snapStartedAt;
        const t = clamp(elapsed / engine.snapDuration, 0, 1);
        engine.progress =
          engine.snapFrom +
          (engine.snapTarget - engine.snapFrom) * easeOutCubic(t);
        engine.dragVelocity *= 0.88;

        if (t >= 1) {
          engine.progress = engine.snapTarget;
          const index = normalizeIndex(Math.round(engine.progress), count);
          dispatch({ type: "SNAP_DONE", index });
        }
      }

      if (
        phase === "explore" ||
        phase === "dragging" ||
        phase === "snapping"
      ) {
        const nextIndex = normalizeIndex(Math.round(engine.progress), count);
        if (nextIndex !== activeIndexRef.current) {
          activeIndexRef.current = nextIndex;
          dispatch({ type: "ACTIVE", index: nextIndex });
        }
      }

      if (Math.abs(engine.progress) > count * 100) {
        const loops = Math.trunc(engine.progress / count);
        const offset = loops * count;
        engine.progress -= offset;
        engine.snapFrom -= offset;
        engine.snapTarget -= offset;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [count, startSnap]);

  useEffect(
    () => () => {
      timelineRef.current?.kill();
      gsap.killTweensOf(engineRef.current);
    },
    [],
  );

  const ready = useCallback((mode: "photo") => {
    dispatch({ type: "READY", mode });
  }, []);

  const feedWheel = useCallback((delta: number) => {
    const phase = phaseRef.current;
    if (
      phase !== "explore" &&
      phase !== "dragging" &&
      phase !== "snapping"
    ) {
      return false;
    }

    const engine = engineRef.current;
    engine.interacting = true;
    engine.dragging = false;
    engine.lastInputAt = performance.now();
    engine.velocity = clamp(
      engine.velocity + clamp(delta, -120, 120) * 0.0007,
      -0.19,
      0.19,
    );
    dispatch({ type: "DRAG_START" });
    return true;
  }, []);

  const snapBy = useCallback(
    (delta: -1 | 1) => {
      const phase = phaseRef.current;
      if (phase === "detail") {
        return;
      }
      if (
        phase !== "explore" &&
        phase !== "dragging" &&
        phase !== "snapping"
      ) {
        return;
      }

      const engine = engineRef.current;
      const current = Math.round(
        phase === "snapping" ? engine.snapTarget : engine.progress,
      );
      startSnap(current + delta);
    },
    [startSnap],
  );

  const openActive = useCallback(() => {
    if (suppressClickRef.current || phaseRef.current !== "explore") return;

    const root = rootRef.current;
    if (!root) return;

    const engine = engineRef.current;
    const index = normalizeIndex(Math.round(engine.progress), count);
    engine.progress = nearestOccurrence(engine.progress, index, count);
    engine.velocity = 0;
    engine.detailIndex = index;
    engine.pendingDetailIndex = null;
    engine.switchMix = 0;
    dispatch({ type: "OPEN", index });

    timelineRef.current?.kill();
    const explore = elements(root, "[data-dish-explore-reveal]");
    const detail = elements(root, "[data-dish-detail-reveal]");
    const ingredients = elements(root, "[data-dish-ingredient]");
    const duration = engine.reducedMotion ? 0.32 : 1.28;

    gsap.set(detail, { autoAlpha: 0, y: engine.reducedMotion ? 8 : 20 });
    gsap.set(ingredients, {
      autoAlpha: 0,
      x: engine.reducedMotion ? 6 : 18,
    });

    timelineRef.current = gsap
      .timeline({
        defaults: { ease: "power3.inOut", overwrite: "auto" },
        onComplete: () => dispatch({ type: "OPEN_DONE" }),
      })
      .to(
        explore,
        {
          autoAlpha: 0,
          y: engine.reducedMotion ? -5 : -22,
          duration: duration * 0.28,
          stagger: duration * 0.018,
        },
        0,
      )
      .to(
        engine,
        {
          modeMix: 1,
          duration: duration * 0.78,
          ease: "power3.inOut",
          onUpdate: writeMotionVariables,
        },
        duration * 0.08,
      )
      .to(
        detail,
        {
          autoAlpha: 1,
          y: 0,
          duration: duration * 0.34,
          stagger: duration * 0.035,
          ease: "power3.out",
        },
        duration * 0.43,
      )
      .to(
        ingredients,
        {
          autoAlpha: 1,
          x: 0,
          duration: duration * 0.28,
          stagger: duration * 0.04,
          ease: "power3.out",
        },
        duration * 0.58,
      );
  }, [count, rootRef, writeMotionVariables]);

  const switchDetail = useCallback(
    (direction: -1 | 1) => {
      if (phaseRef.current !== "detail") return;
      const root = rootRef.current;
      if (!root) return;

      const engine = engineRef.current;
      const from = engine.detailIndex ?? activeIndexRef.current;
      const next = normalizeIndex(from + direction, count);
      engine.pendingDetailIndex = next;
      engine.switchDirection = direction;
      engine.switchMix = 0;
      dispatch({ type: "SWITCH_START" });

      const copy = elements(root, "[data-dish-copy]");
      const ingredients = elements(root, "[data-dish-ingredient]");
      const duration = engine.reducedMotion ? 0.42 : 0.92;
      timelineRef.current?.kill();

      timelineRef.current = gsap
        .timeline({
          defaults: { ease: "power3.inOut", overwrite: "auto" },
          onComplete: () => {
            engine.detailIndex = next;
            engine.pendingDetailIndex = null;
            engine.switchMix = 0;
            engine.switchDirection = 0;
            engine.progress = nearestOccurrence(engine.progress, next, count);
            writeMotionVariables();
            dispatch({ type: "SWITCH_DONE", index: next });
          },
        })
        .to(
          [...copy, ...ingredients],
          {
            autoAlpha: 0,
            y: direction > 0 ? -12 : 12,
            duration: duration * 0.27,
            stagger: duration * 0.012,
          },
          0,
        )
        .to(
          engine,
          {
            switchMix: 1,
            duration: duration * 0.78,
            onUpdate: writeMotionVariables,
          },
          duration * 0.06,
        )
        .call(
          () => {
            dispatch({ type: "DISPLAY", index: next });
            gsap.set(copy, { y: direction > 0 ? 16 : -16 });
            gsap.set(ingredients, { x: direction > 0 ? 16 : -16, y: 0 });
          },
          undefined,
          duration * 0.39,
        )
        .to(
          copy,
          {
            autoAlpha: 1,
            y: 0,
            duration: duration * 0.3,
            stagger: duration * 0.025,
            ease: "power3.out",
          },
          duration * 0.5,
        )
        .to(
          ingredients,
          {
            autoAlpha: 1,
            x: 0,
            duration: duration * 0.26,
            stagger: duration * 0.028,
            ease: "power3.out",
          },
          duration * 0.59,
        );
    },
    [count, rootRef, writeMotionVariables],
  );

  const closeDetail = useCallback(() => {
    const phase = phaseRef.current;
    if (phase !== "detail" && phase !== "opening") return;
    const root = rootRef.current;
    if (!root) return;

    const engine = engineRef.current;
    const index = engine.detailIndex ?? activeIndexRef.current;
    engine.progress = nearestOccurrence(engine.progress, index, count);
    dispatch({ type: "CLOSE" });

    const explore = elements(root, "[data-dish-explore-reveal]");
    const detail = elements(root, "[data-dish-detail-reveal]");
    const ingredients = elements(root, "[data-dish-ingredient]");
    const duration = engine.reducedMotion ? 0.3 : 1.08;
    timelineRef.current?.kill();

    timelineRef.current = gsap
      .timeline({
        defaults: { ease: "power3.inOut", overwrite: "auto" },
        onComplete: () => {
          engine.detailIndex = null;
          engine.pendingDetailIndex = null;
          engine.modeMix = 0;
          writeMotionVariables();
          gsap.set(detail, { autoAlpha: 0, y: 18 });
          dispatch({ type: "CLOSE_DONE", index });
        },
      })
      .to(
        ingredients,
        {
          autoAlpha: 0,
          x: 12,
          duration: duration * 0.2,
          stagger: duration * 0.018,
        },
        0,
      )
      .to(
        detail,
        {
          autoAlpha: 0,
          y: 16,
          duration: duration * 0.27,
          stagger: duration * 0.018,
        },
        duration * 0.06,
      )
      .to(
        engine,
        {
          modeMix: 0,
          duration: duration * 0.74,
          onUpdate: writeMotionVariables,
        },
        duration * 0.16,
      )
      .to(
        explore,
        {
          autoAlpha: 1,
          y: 0,
          duration: duration * 0.3,
          stagger: duration * 0.025,
          ease: "power3.out",
        },
        duration * 0.61,
      );
  }, [count, rootRef, writeMotionVariables]);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLElement>) => {
      if (event.key === "Escape") {
        if (
          phaseRef.current === "detail" ||
          phaseRef.current === "opening"
        ) {
          event.preventDefault();
          closeDetail();
        }
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        if (phaseRef.current === "detail") {
          switchDetail(direction);
        } else {
          snapBy(direction);
        }
        return;
      }

      if (
        (event.key === "Enter" || event.key === " ") &&
        phaseRef.current === "explore"
      ) {
        event.preventDefault();
        openActive();
      }
    },
    [closeDetail, openActive, snapBy, switchDetail],
  );

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (
        event.button !== 0 ||
        (phaseRef.current !== "explore" &&
          phaseRef.current !== "snapping" &&
          phaseRef.current !== "dragging")
      ) {
        return;
      }

      pointerSessionRef.current = {
        id: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        lastX: event.clientX,
        lastTime: performance.now(),
        moved: false,
        horizontal: false,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
      engineRef.current.lastInputAt = performance.now();
      engineRef.current.velocity = 0;
    },
    [],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const normalizedX = clamp(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -1,
        1,
      );
      const normalizedY = clamp(
        ((event.clientY - rect.top) / rect.height) * 2 - 1,
        -1,
        1,
      );
      engineRef.current.pointerTiltX = normalizedX;
      engineRef.current.pointerTiltY = normalizedY;

      const session = pointerSessionRef.current;
      if (!session || session.id !== event.pointerId) return;

      const totalX = event.clientX - session.startX;
      const totalY = event.clientY - session.startY;
      if (!session.horizontal) {
        if (Math.abs(totalX) < 6 && Math.abs(totalY) < 6) return;
        if (Math.abs(totalY) > Math.abs(totalX) * 1.2) {
          pointerSessionRef.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          return;
        }
        session.horizontal = true;
        session.moved = true;
        engineRef.current.dragging = true;
        engineRef.current.interacting = true;
        dispatch({ type: "DRAG_START" });
      }

      event.preventDefault();
      const now = performance.now();
      const dx = event.clientX - session.lastX;
      const dt = Math.max(8, now - session.lastTime);
      const pixelsPerDish = clamp(rect.width * 0.18, 150, 290);
      const deltaProgress = -dx / pixelsPerDish;
      const engine = engineRef.current;
      engine.progress += deltaProgress;
      engine.velocity = clamp(deltaProgress * (16 / dt), -0.2, 0.2);
      engine.dragVelocity = engine.velocity;
      engine.lastInputAt = now;
      session.lastX = event.clientX;
      session.lastTime = now;
    },
    [],
  );

  const finishPointer = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const session = pointerSessionRef.current;
      if (!session || session.id !== event.pointerId) return;

      pointerSessionRef.current = null;
      engineRef.current.dragging = false;
      engineRef.current.lastInputAt = performance.now();
      suppressClickRef.current = session.moved;
      if (session.moved) {
        startSnap();
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 0);
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [startSnap],
  );

  const handlePointerLeave = useCallback(() => {
    engineRef.current.pointerTiltX = 0;
    engineRef.current.pointerTiltY = 0;
    engineRef.current.hoverAmount = 0;
  }, []);

  const handlePointerEnter = useCallback(() => {
    engineRef.current.hoverAmount = 1;
  }, []);

  return {
    state,
    engineRef,
    ready,
    feedWheel,
    snapBy,
    openActive,
    switchDetail,
    closeDetail,
    handleKeyDown,
    pointerHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: finishPointer,
      onPointerCancel: finishPointer,
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
    },
  };
}
