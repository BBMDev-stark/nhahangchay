"use client";

import { createRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { clamp, wrappedDistance } from "./carousel-engine";
import { DishObject, type DishObjectHandle } from "./DishObject";
import type { DishEngineRef, SignatureDish } from "./types";

type DishCarouselProps = {
  dishes: SignatureDish[];
  engineRef: DishEngineRef;
};

const DETAIL_POSITION = new Vector3();
const TARGET_POSITION = new Vector3();
const EXPLORE_POSITION = new Vector3();
const OFF_POSITION = new Vector3();

export function DishCarousel({ dishes, engineRef }: DishCarouselProps) {
  const { size, viewport } = useThree();
  const refs = useMemo(
    () => dishes.map(() => createRef<DishObjectHandle>()),
    [dishes],
  );
  const baseOpacity = useMemo(() => new WeakMap<object, number>(), []);
  const baseEmissive = useMemo(() => new WeakMap<object, number>(), []);

  useFrame((_, delta) => {
    const engine = engineRef.current;
    const mobile = size.width < 768;
    const tablet = !mobile && size.width < 1180;
    const gap = mobile ? 3.35 : tablet ? 4 : 4.65;
    const depth = mobile ? 1.2 : 1.55;
    const modeMix = engine.modeMix;
    const detailIndex = engine.detailIndex;
    const pendingIndex = engine.pendingDetailIndex;
    const switchMix = engine.switchMix;
    const direction = engine.switchDirection || 1;
    const detailX = mobile ? 0 : tablet ? viewport.width * 0.08 : viewport.width * 0.145;
    const detailY = mobile ? viewport.height * 0.16 : tablet ? 0.1 : -0.42;
    const detailZ = mobile ? 0.35 : 0.95;
    const detailScale = mobile ? 1.08 : tablet ? 1.28 : 1.48;

    dishes.forEach((_, index) => {
      const handle = refs[index].current;
      const group = handle?.group;
      if (!group) return;

      const distance = wrappedDistance(index, engine.progress, dishes.length);
      const absoluteDistance = Math.abs(distance);
      const active = absoluteDistance < 0.5;
      const falloff = Math.min(absoluteDistance * 0.145, 0.46);
      const exploreScale =
        (mobile ? 0.92 : tablet ? 1.08 : 1.22) * (1 - falloff);
      const exploreOpacity = clamp(1 - absoluteDistance * 0.2, 0.12, 1);

      EXPLORE_POSITION.set(
        distance * gap,
        Math.sin(distance * 0.8) * 0.2 - 0.28,
        -absoluteDistance * depth,
      );

      const hoverMix =
        active && modeMix < 0.1 ? engine.hoverAmount : 0;
      EXPLORE_POSITION.y += hoverMix * 0.12;

      const side = distance === 0 ? (index % 2 === 0 ? 1 : -1) : Math.sign(distance);
      OFF_POSITION.set(
        side * (viewport.width * 0.7 + absoluteDistance * 1.5),
        EXPLORE_POSITION.y - 0.25,
        -4.5 - absoluteDistance,
      );
      DETAIL_POSITION.set(detailX, detailY, detailZ);

      let targetScale = exploreScale;
      let targetOpacity = exploreOpacity;
      let targetRotX = 0;
      let targetRotY = distance * 0.15;
      let targetRotZ =
        distance * 0.045 + engine.dragVelocity * 0.8;

      TARGET_POSITION.copy(EXPLORE_POSITION);

      if (detailIndex === index) {
        TARGET_POSITION.lerpVectors(EXPLORE_POSITION, DETAIL_POSITION, modeMix);
        targetScale = MathUtils.lerp(
          exploreScale,
          detailScale,
          modeMix,
        );
        targetOpacity = MathUtils.lerp(exploreOpacity, 1, modeMix);
        targetRotX = MathUtils.lerp(0, mobile ? -0.04 : -0.08, modeMix);
        targetRotY = MathUtils.lerp(
          distance * 0.15,
          mobile ? -0.05 : -0.14,
          modeMix,
        );
        targetRotZ = MathUtils.lerp(
          distance * 0.045,
          mobile ? 0.015 : 0.055,
          modeMix,
        );

        if (pendingIndex !== null && switchMix > 0) {
          TARGET_POSITION.x += direction * viewport.width * 0.58 * switchMix;
          TARGET_POSITION.z -= 1.5 * switchMix;
          targetScale *= 1 - switchMix * 0.24;
          targetOpacity = 1 - switchMix;
          targetRotY -= direction * switchMix * 0.44;
        }
      } else if (pendingIndex === index && modeMix > 0.9) {
        TARGET_POSITION.copy(DETAIL_POSITION);
        TARGET_POSITION.x -= direction * viewport.width * 0.58 * (1 - switchMix);
        TARGET_POSITION.z -= 1.5 * (1 - switchMix);
        targetScale = detailScale * (0.76 + switchMix * 0.24);
        targetOpacity = switchMix;
        targetRotX = mobile ? -0.04 : -0.08;
        targetRotY = (mobile ? -0.05 : -0.14) + direction * (1 - switchMix) * 0.44;
        targetRotZ = mobile ? 0.015 : 0.055;
      } else {
        TARGET_POSITION.lerpVectors(EXPLORE_POSITION, OFF_POSITION, modeMix);
        targetScale = MathUtils.lerp(exploreScale, exploreScale * 0.46, modeMix);
        targetOpacity = MathUtils.lerp(exploreOpacity, 0, modeMix);
        targetRotY += side * modeMix * 0.32;
      }

      if (active && modeMix < 0.1) {
        targetScale *= 1 + hoverMix * 0.022;
        targetRotX += engine.pointerTiltY * hoverMix * 0.035;
        targetRotY += engine.pointerTiltX * hoverMix * 0.04;
      }

      const smoothing = engine.reducedMotion ? 18 : 7.5;
      group.position.x = MathUtils.damp(
        group.position.x,
        TARGET_POSITION.x,
        smoothing,
        delta,
      );
      group.position.y = MathUtils.damp(
        group.position.y,
        TARGET_POSITION.y,
        smoothing,
        delta,
      );
      group.position.z = MathUtils.damp(
        group.position.z,
        TARGET_POSITION.z,
        smoothing,
        delta,
      );
      const uniformScale = MathUtils.damp(
        group.scale.x,
        targetScale,
        smoothing,
        delta,
      );
      group.scale.setScalar(uniformScale);
      group.rotation.x = MathUtils.damp(
        group.rotation.x,
        targetRotX,
        smoothing,
        delta,
      );
      group.rotation.y = MathUtils.damp(
        group.rotation.y,
        targetRotY,
        smoothing,
        delta,
      );
      group.rotation.z = MathUtils.damp(
        group.rotation.z,
        targetRotZ,
        smoothing,
        delta,
      );
      group.visible = targetOpacity > 0.008 || group.scale.x > 0.08;

      handle.materials.forEach((material) => {
        if (!baseOpacity.has(material)) {
          baseOpacity.set(material, material.opacity);
          baseEmissive.set(material, material.emissiveIntensity ?? 0);
        }
        const originalOpacity = baseOpacity.get(material) ?? 1;
        const currentOpacity = material.opacity;
        material.opacity = MathUtils.damp(
          currentOpacity,
          originalOpacity * targetOpacity,
          9,
          delta,
        );
        material.emissiveIntensity = MathUtils.damp(
          material.emissiveIntensity,
          (baseEmissive.get(material) ?? 0) +
            (active ? 0.06 : 0) +
            hoverMix * 0.08,
          8,
          delta,
        );
      });
    });
  });

  return (
    <group>
      {dishes.map((dish, index) => (
        <DishObject
          key={dish.id}
          ref={refs[index]}
          dish={dish}
          quality={size.width < 768 ? "low" : "high"}
        />
      ))}
    </group>
  );
}
