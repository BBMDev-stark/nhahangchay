"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  Points,
  SpotLight,
} from "three";
import { DishCarousel } from "./DishCarousel";
import type { DishEngineRef, SignatureDish } from "./types";

type DishSceneProps = {
  dishes: SignatureDish[];
  displayIndex: number;
  engineRef: DishEngineRef;
  onReady: () => void;
};

function seededDust(count: number) {
  let seed = 923521;
  const next = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (next() - 0.5) * 22;
    positions[index * 3 + 1] = (next() - 0.2) * 10;
    positions[index * 3 + 2] = -2 - next() * 9;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  return geometry;
}

export function DishScene({
  dishes,
  displayIndex,
  engineRef,
  onReady,
}: DishSceneProps) {
  const { camera, size } = useThree();
  const cameraRef = useRef(camera);
  const spotRef = useRef<SpotLight>(null);
  const dustRef = useRef<Points>(null);
  const readyRef = useRef(false);
  const ringRefs = useRef<(Mesh | null)[]>([]);
  const dustGeometry = useMemo(
    () => seededDust(size.width < 768 ? 58 : 110),
    [size.width],
  );
  const accent = useMemo(() => new Color(), []);

  useFrame((state, delta) => {
    const engine = engineRef.current;
    const mobile = size.width < 768;
    const modeMix = engine.modeMix;
    const dish = dishes[displayIndex] ?? dishes[0];

    const cameraX = mobile ? 0 : modeMix * 0.42;
    const cameraY = (mobile ? 6.7 : 6.25) - modeMix * (mobile ? 0.15 : 0.35);
    const cameraZ = (mobile ? 15.2 : 14.3) - modeMix * (mobile ? 0.1 : 0.65);
    const sceneCamera = cameraRef.current;
    sceneCamera.position.x = MathUtils.damp(
      sceneCamera.position.x,
      cameraX,
      4.5,
      delta,
    );
    sceneCamera.position.y = MathUtils.damp(
      sceneCamera.position.y,
      cameraY,
      4.5,
      delta,
    );
    sceneCamera.position.z = MathUtils.damp(
      sceneCamera.position.z,
      cameraZ,
      4.5,
      delta,
    );
    sceneCamera.lookAt(
      mobile ? 0 : modeMix * 0.2,
      mobile ? 0.15 : -0.28,
      0,
    );

    accent.set(dish.theme.accentLight);
    if (spotRef.current) {
      spotRef.current.color.lerp(accent, Math.min(1, delta * 3.2));
      spotRef.current.intensity = MathUtils.damp(
        spotRef.current.intensity,
        920 + modeMix * 120 + engine.hoverAmount * (1 - modeMix) * 85,
        4,
        delta,
      );
      spotRef.current.position.x = MathUtils.damp(
        spotRef.current.position.x,
        mobile ? -1.2 : -2.6 + modeMix * 2.2,
        4,
        delta,
      );
    }

    ringRefs.current.forEach((ring, index) => {
      if (!ring) return;
      const material = ring.material as MeshBasicMaterial;
      material.opacity = MathUtils.damp(
        material.opacity,
        (0.09 - index * 0.018) * (1 - modeMix * 0.58),
        4,
        delta,
      );
      ring.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.18 + index) * 0.006);
    });

    if (dustRef.current && !engine.reducedMotion) {
      dustRef.current.rotation.y += delta * 0.012;
      dustRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.18) * 0.06;
    }

    if (!readyRef.current) {
      readyRef.current = true;
      onReady();
    }
  });

  return (
    <>
      <hemisphereLight args={["#fff1cf", "#17231a", 2.65]} />
      <ambientLight color="#b6a27d" intensity={1.55} />
      <spotLight
        ref={spotRef}
        position={[-2.6, 8, 8]}
        angle={0.55}
        penumbra={0.78}
        decay={1.6}
        distance={34}
        intensity={920}
        castShadow={size.width >= 768}
        shadow-mapSize-width={size.width >= 1200 ? 1024 : 512}
        shadow-mapSize-height={size.width >= 1200 ? 1024 : 512}
      />
      <directionalLight
        color="#d6a65a"
        intensity={4.6}
        position={[7, 3, -1]}
      />

      <group position={[0, 0.3, -6]}>
        {[7.1, 8.7, 10.4].map((radius, index) => (
          <mesh
            key={radius}
            ref={(mesh) => {
              ringRefs.current[index] = mesh;
            }}
            rotation={[0, 0, index % 2 === 0 ? -0.04 : 0.035]}
          >
            <ringGeometry args={[radius, radius + 0.014, 160]} />
            <meshBasicMaterial
              color="#b88a3f"
              transparent
              opacity={0.09 - index * 0.018}
              depthWrite={false}
              blending={AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      <points ref={dustRef} geometry={dustGeometry}>
        <pointsMaterial
          color="#d9b66e"
          size={0.025}
          transparent
          opacity={0.32}
          depthWrite={false}
          sizeAttenuation
          blending={AdditiveBlending}
        />
      </points>

      <DishCarousel dishes={dishes} engineRef={engineRef} />
    </>
  );
}
