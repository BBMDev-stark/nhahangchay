"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { ThreeElements } from "@react-three/fiber";

export type DishPedestalProps = ThreeElements["group"] & {
  accent?: string;
  intensity?: number;
  quality?: "low" | "high";
  radius?: number;
  height?: number;
};

const UNIT_RADIUS = 1.86;
const UNIT_HEIGHT = 0.46;

function createStoneGeometry(radialSegments: number) {
  const geometry = new THREE.CylinderGeometry(
    1.78,
    UNIT_RADIUS,
    UNIT_HEIGHT,
    radialSegments,
    7,
    false,
  );
  const positions = geometry.getAttribute("position");
  const colors: number[] = [];
  const base = new THREE.Color("#090c09");
  const olive = new THREE.Color("#22271b");
  const mineral = new THREE.Color("#353025");

  for (let index = 0; index < positions.count; index += 1) {
    const x = positions.getX(index);
    const y = positions.getY(index);
    const z = positions.getZ(index);
    const angle = Math.atan2(z, x);
    const vein =
      Math.sin(angle * 5.2 + y * 19 + Math.sin(angle * 2.3) * 1.9) * 0.5 +
      0.5;
    const hairline =
      Math.pow(
        Math.max(
          0,
          Math.sin(angle * 10.7 - y * 27 + Math.cos(angle * 3.1)),
        ),
        18,
      ) * 0.16;
    const shade = base
      .clone()
      .lerp(olive, 0.08 + vein * 0.2)
      .lerp(mineral, hairline);
    colors.push(shade.r, shade.g, shade.b);
  }

  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  return geometry;
}

const STONE_GEOMETRIES = {
  high: createStoneGeometry(112),
  low: createStoneGeometry(48),
};

const TOP_GEOMETRIES = {
  high: new THREE.CylinderGeometry(1.78, 1.8, 0.07, 112, 2),
  low: new THREE.CylinderGeometry(1.78, 1.8, 0.07, 48, 1),
};

const PEDESTAL_RIMS = {
  high: new THREE.TorusGeometry(1.805, 0.018, 12, 112),
  low: new THREE.TorusGeometry(1.805, 0.018, 8, 48),
};

/**
 * Black stone display plinth with procedural vertex-colour marbling.
 * The top surface sits at local y = 0, making it easy to place a DishPlate
 * around y = 0.12.
 */
export function DishPedestal({
  accent = "#b78a38",
  intensity = 0.75,
  quality = "high",
  radius = UNIT_RADIUS,
  height = UNIT_HEIGHT,
  scale,
  ...groupProps
}: DishPedestalProps) {
  const radialScale = radius / UNIT_RADIUS;
  const verticalScale = height / UNIT_HEIGHT;
  const groupScale = useMemo(() => {
    const ownScale: [number, number, number] = [
      radialScale,
      verticalScale,
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
  }, [radialScale, scale, verticalScale]);

  const safeIntensity = Math.max(0, Math.min(2, intensity));

  return (
    <group {...groupProps} scale={groupScale} dispose={null}>
      <mesh
        geometry={STONE_GEOMETRIES[quality]}
        position-y={-UNIT_HEIGHT / 2}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#171a14"
          vertexColors
          roughness={0.58}
          metalness={0.08}
          clearcoat={0.22}
          clearcoatRoughness={0.53}
          envMapIntensity={0.48}
        />
      </mesh>

      <mesh
        geometry={TOP_GEOMETRIES[quality]}
        position-y={-0.012}
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#0b0e0b"
          roughness={0.43}
          metalness={0.09}
          clearcoat={0.34}
          clearcoatRoughness={0.46}
        />
      </mesh>

      <mesh
        geometry={PEDESTAL_RIMS[quality]}
        rotation-x={Math.PI / 2}
        position-y={0.022}
      >
        <meshStandardMaterial
          color={accent}
          roughness={0.34}
          metalness={0.78}
          emissive={accent}
          emissiveIntensity={safeIntensity * 0.045}
        />
      </mesh>

      <mesh
        geometry={PEDESTAL_RIMS[quality]}
        rotation-x={Math.PI / 2}
        position-y={-UNIT_HEIGHT + 0.055}
        scale={0.985}
      >
        <meshStandardMaterial
          color={accent}
          roughness={0.4}
          metalness={0.68}
          transparent
          opacity={0.58}
          emissive={accent}
          emissiveIntensity={safeIntensity * 0.025}
        />
      </mesh>

      {safeIntensity > 0.04 ? (
        <pointLight
          color={accent}
          position={[0, 0.22, 0.58]}
          intensity={safeIntensity * 0.54}
          distance={3.6}
          decay={2}
        />
      ) : null}
    </group>
  );
}

export default DishPedestal;
