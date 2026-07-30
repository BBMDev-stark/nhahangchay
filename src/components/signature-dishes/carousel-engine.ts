import type { DishMotionEngine } from "./types";

export const CAROUSEL_IDLE_MS = 180;
export const CAROUSEL_SNAP_MS = 680;
export const CAROUSEL_SNAP_REDUCED_MS = 180;

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function normalizeIndex(index: number, count: number) {
  return ((index % count) + count) % count;
}

export function wrappedDistance(index: number, progress: number, count: number) {
  return (
    ((((index - progress) + count / 2) % count) + count) % count -
    count / 2
  );
}

export function nearestOccurrence(
  progress: number,
  index: number,
  count: number,
) {
  return index + Math.round((progress - index) / count) * count;
}

export function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function createDishMotionEngine(): DishMotionEngine {
  return {
    progress: 0,
    velocity: 0,
    snapFrom: 0,
    snapTarget: 0,
    snapStartedAt: 0,
    snapDuration: CAROUSEL_SNAP_MS,
    lastInputAt: 0,
    dragging: false,
    dragVelocity: 0,
    hoverAmount: 0,
    pointerTiltX: 0,
    pointerTiltY: 0,
    modeMix: 0,
    switchMix: 0,
    switchDirection: 0,
    detailIndex: null,
    pendingDetailIndex: null,
    reducedMotion: false,
    interacting: false,
  };
}

