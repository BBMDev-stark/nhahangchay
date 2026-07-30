"use client";

import { useCallback } from "react";
import { Canvas, type RootState } from "@react-three/fiber";
import { DishScene } from "./DishScene";
import type { DishEngineRef, SignatureDish } from "./types";

type SignatureDishesCanvasProps = {
  dishes: SignatureDish[];
  displayIndex: number;
  engineRef: DishEngineRef;
  onReady: () => void;
  onContextLost: () => void;
};

export default function SignatureDishesCanvas({
  dishes,
  displayIndex,
  engineRef,
  onReady,
  onContextLost,
}: SignatureDishesCanvasProps) {
  const handleCreated = useCallback(
    (state: RootState) => {
      const canvas = state.gl.domElement;
      state.gl.toneMappingExposure = 1.28;
      const handleLoss = (event: Event) => {
        event.preventDefault();
        onContextLost();
      };
      canvas.addEventListener("webglcontextlost", handleLoss, { once: true });
    },
    [onContextLost],
  );

  return (
    <Canvas
      camera={{ fov: 31, near: 0.1, far: 80, position: [0, 6.25, 14.3] }}
      dpr={[1, 1.65]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      shadows="basic"
      frameloop="always"
      performance={{ min: 0.55 }}
      onCreated={handleCreated}
    >
      <DishScene
        dishes={dishes}
        displayIndex={displayIndex}
        engineRef={engineRef}
        onReady={onReady}
      />
    </Canvas>
  );
}
