"use client";

import { useMemo, type ReactNode } from "react";
import * as THREE from "three";
import type { ThreeElements } from "@react-three/fiber";

export type DishPlateProps = Omit<ThreeElements["group"], "children"> & {
  color?: string;
  rimColor?: string;
  quality?: "low" | "high";
  radius?: number;
  depth?: number;
  children?: ReactNode;
};

const UNIT_RADIUS = 1.55;

function createPlateGeometry(segments: number) {
  const profile = [
    new THREE.Vector2(0, -0.105),
    new THREE.Vector2(0.66, -0.115),
    new THREE.Vector2(1.22, -0.095),
    new THREE.Vector2(1.45, -0.04),
    new THREE.Vector2(1.55, 0.025),
    new THREE.Vector2(1.525, 0.085),
    new THREE.Vector2(1.43, 0.135),
    new THREE.Vector2(1.19, 0.108),
    new THREE.Vector2(0.66, 0.062),
    new THREE.Vector2(0, 0.045),
  ];

  const geometry = new THREE.LatheGeometry(profile, segments);
  geometry.computeVertexNormals();
  return geometry;
}

const PLATE_GEOMETRIES = {
  high: createPlateGeometry(112),
  low: createPlateGeometry(48),
};

const OUTER_RIM_GEOMETRIES = {
  high: new THREE.TorusGeometry(1.49, 0.018, 12, 112),
  low: new THREE.TorusGeometry(1.49, 0.018, 8, 48),
};

const INNER_RIM_GEOMETRIES = {
  high: new THREE.TorusGeometry(1.19, 0.009, 10, 112),
  low: new THREE.TorusGeometry(1.19, 0.009, 7, 48),
};

/**
 * A reusable glazed ceramic plate. Its local origin is the plate centre, with
 * the food surface at y ~= 0.08. The default diameter is 3.1 scene units.
 */
export function DishPlate({
  color = "#18231d",
  rimColor = "#b78a38",
  quality = "high",
  radius = UNIT_RADIUS,
  depth = 1,
  children,
  scale,
  ...groupProps
}: DishPlateProps) {
  const radialScale = radius / UNIT_RADIUS;
  const groupScale = useMemo(() => {
    const ownScale: [number, number, number] = [
      radialScale,
      Math.max(0.35, depth),
      radialScale,
    ];

    if (typeof scale === "number") {
      return ownScale.map((value) => value * scale) as [
        number,
        number,
        number,
      ];
    }

    if (Array.isArray(scale)) {
      return ownScale.map((value, index) => value * (scale[index] ?? 1)) as [
        number,
        number,
        number,
      ];
    }

    if (scale instanceof THREE.Vector3) {
      return [
        ownScale[0] * scale.x,
        ownScale[1] * scale.y,
        ownScale[2] * scale.z,
      ] as [number, number, number];
    }

    return ownScale;
  }, [depth, radialScale, scale]);

  const glaze = useMemo(() => {
    const base = new THREE.Color(color);
    return {
      base: `#${base.getHexString()}`,
      sheen: `#${base.clone().lerp(new THREE.Color("#e7ddc3"), 0.16).getHexString()}`,
      underside: `#${base.clone().multiplyScalar(0.43).getHexString()}`,
    };
  }, [color]);

  return (
    <group {...groupProps} scale={groupScale} dispose={null}>
      <mesh
        geometry={PLATE_GEOMETRIES[quality]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={glaze.base}
          roughness={0.27}
          metalness={0.03}
          clearcoat={0.74}
          clearcoatRoughness={0.2}
          sheen={0.2}
          sheenColor={glaze.sheen}
          envMapIntensity={0.72}
        />
      </mesh>

      <mesh
        geometry={OUTER_RIM_GEOMETRIES[quality]}
        rotation-x={Math.PI / 2}
        position-y={0.108}
        castShadow
      >
        <meshStandardMaterial
          color={rimColor}
          roughness={0.3}
          metalness={0.74}
          envMapIntensity={1.05}
        />
      </mesh>

      <mesh
        geometry={INNER_RIM_GEOMETRIES[quality]}
        rotation-x={Math.PI / 2}
        position-y={0.103}
      >
        <meshStandardMaterial
          color={rimColor}
          roughness={0.39}
          metalness={0.62}
          transparent
          opacity={0.72}
        />
      </mesh>

      <mesh
        position-y={-0.108}
        receiveShadow
      >
        <cylinderGeometry args={[0.73, 0.8, 0.035, quality === "high" ? 72 : 36]} />
        <meshStandardMaterial
          color={glaze.underside}
          roughness={0.56}
          metalness={0.02}
        />
      </mesh>

      {children}
    </group>
  );
}

export default DishPlate;
