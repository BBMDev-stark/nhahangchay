"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import type { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import type {
  DishComposition,
  DishProfile,
  ProceduralDishConfig,
} from "./types";

export type ProceduralDishFactoryProps = ThreeElements["group"] & {
  config: ProceduralDishConfig;
  quality?: "low" | "high";
};

type Vec3 = [number, number, number];

type IngredientInstance = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
  color: string;
};

type DishVisualData = {
  grains: IngredientInstance[];
  cubes: IngredientInstance[];
  orbs: IngredientInstance[];
  leaves: IngredientInstance[];
  caps: IngredientInstance[];
  stems: IngredientInstance[];
  rolls: IngredientInstance[];
  rollEnds: IngredientInstance[];
  slices: IngredientInstance[];
  discs: IngredientInstance[];
  seeds: IngredientInstance[];
  petals: IngredientInstance[];
  dots: IngredientInstance[];
};

type InstanceFieldProps = {
  items: IngredientInstance[];
  geometry: THREE.BufferGeometry;
  roughness?: number;
  metalness?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  transparent?: boolean;
  opacity?: number;
};

type RandomSource = () => number;

function seededRandom(seed: number): RandomSource {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let output = value;
    output = Math.imul(output ^ (output >>> 15), output | 1);
    output ^= output + Math.imul(output ^ (output >>> 7), output | 61);
    return ((output ^ (output >>> 14)) >>> 0) / 4294967296;
  };
}

function range(random: RandomSource, min: number, max: number) {
  return min + (max - min) * random();
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function culinaryColor(input: string, saturationLimit = 0.62) {
  const color = new THREE.Color(input);
  const hsl = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl);
  color.setHSL(
    hsl.h,
    Math.min(saturationLimit, hsl.s * 0.92),
    clamp(hsl.l, 0.09, 0.72),
  );
  return `#${color.getHexString()}`;
}

function colorAt(colors: string[], index: number) {
  return colors[index % Math.max(1, colors.length)] ?? "#77715b";
}

function pointInComposition(
  random: RandomSource,
  composition: DishComposition,
  radius: number,
  index: number,
  total: number,
) {
  let angle = random() * Math.PI * 2;
  let distance = Math.sqrt(random()) * radius;

  if (composition === "radial") {
    angle = (index / Math.max(1, total)) * Math.PI * 2 + range(random, -0.16, 0.16);
    distance = radius * range(random, 0.28, 0.92);
  } else if (composition === "centered") {
    distance *= 0.78;
  } else if (composition === "asymmetric") {
    angle *= 0.84;
  } else if (composition === "layered") {
    distance *= index % 3 === 0 ? 0.48 : 0.9;
  }

  const x = Math.cos(angle) * distance + (composition === "asymmetric" ? -0.18 : 0);
  const z = Math.sin(angle) * distance;
  return { x, z, distance, angle };
}

function createLeafGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.56);
  shape.bezierCurveTo(0.44, -0.24, 0.48, 0.24, 0, 0.62);
  shape.bezierCurveTo(-0.48, 0.24, -0.44, -0.24, 0, -0.56);
  const geometry = new THREE.ShapeGeometry(shape, 5);
  geometry.computeVertexNormals();
  return geometry;
}

const LEAF_GEOMETRY = createLeafGeometry();

const INGREDIENT_GEOMETRIES = {
  high: {
    sphere: new THREE.SphereGeometry(1, 18, 12),
    grain: new THREE.SphereGeometry(1, 12, 8),
    cube: new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
    cylinder: new THREE.CylinderGeometry(1, 1, 1, 18, 2),
    capsule: new THREE.CapsuleGeometry(0.5, 1, 5, 10),
  },
  low: {
    sphere: new THREE.SphereGeometry(1, 10, 7),
    grain: new THREE.SphereGeometry(1, 8, 5),
    cube: new THREE.BoxGeometry(1, 1, 1),
    cylinder: new THREE.CylinderGeometry(1, 1, 1, 10, 1),
    capsule: new THREE.CapsuleGeometry(0.5, 1, 3, 6),
  },
};

function InstanceField({
  items,
  geometry,
  roughness = 0.64,
  metalness = 0,
  clearcoat = 0,
  clearcoatRoughness = 0.4,
  transparent = false,
  opacity = 1,
}: InstanceFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const transform = new THREE.Object3D();
    const color = new THREE.Color();
    mesh.count = items.length;

    items.forEach((item, index) => {
      transform.position.set(...item.position);
      transform.rotation.set(...item.rotation);
      transform.scale.set(...item.scale);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
      mesh.setColorAt(index, color.set(item.color));
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, items.length]}
      castShadow={false}
      receiveShadow={false}
    >
      <meshPhysicalMaterial
        color="#ffffff"
        vertexColors
        roughness={roughness}
        metalness={metalness}
        clearcoat={clearcoat}
        clearcoatRoughness={clearcoatRoughness}
        transparent={transparent}
        opacity={opacity}
        emissive="#2b2415"
        emissiveIntensity={0.12}
      />
    </instancedMesh>
  );
}

function emptyVisualData(): DishVisualData {
  return {
    grains: [],
    cubes: [],
    orbs: [],
    leaves: [],
    caps: [],
    stems: [],
    rolls: [],
    rollEnds: [],
    slices: [],
    discs: [],
    seeds: [],
    petals: [],
    dots: [],
  };
}

function scatter(
  random: RandomSource,
  count: number,
  composition: DishComposition,
  radius: number,
  y: [number, number],
  scale: [Vec3, Vec3],
  colors: string[],
) {
  return Array.from({ length: count }, (_, index): IngredientInstance => {
    const point = pointInComposition(
      random,
      composition,
      radius,
      index,
      count,
    );
    return {
      position: [point.x, range(random, y[0], y[1]), point.z],
      rotation: [
        range(random, -0.24, 0.24),
        range(random, 0, Math.PI * 2),
        range(random, -0.24, 0.24),
      ],
      scale: [
        range(random, scale[0][0], scale[1][0]),
        range(random, scale[0][1], scale[1][1]),
        range(random, scale[0][2], scale[1][2]),
      ],
      color: colorAt(colors, Math.floor(random() * colors.length)),
    };
  });
}

function buildVisualData(
  config: ProceduralDishConfig,
  quality: "low" | "high",
) {
  const random = seededRandom(config.seed);
  const data = emptyVisualData();
  const density = clamp(config.density, 0.55, 1.7);
  const countScale = (quality === "high" ? 1 : 0.52) * density;
  const count = (value: number) => Math.max(1, Math.round(value * countScale));
  const height = clamp(config.height, 0.58, 1.6);
  const ingredients = (
    config.ingredientPalette.length
      ? config.ingredientPalette
      : ["#7c6e43", "#4f5b2a", "#d0b363"]
  ).map((color) => culinaryColor(color));
  const garnish = (
    config.garnishPalette.length
      ? config.garnishPalette
      : ["#536333", "#81753a"]
  ).map((color) => culinaryColor(color, 0.68));
  const pale = ["#d8ceb0", "#bba878", "#e2d7b7"].map((color) =>
    culinaryColor(color),
  );

  if (config.profile === "quinoa") {
    data.grains = scatter(
      random,
      count(118),
      config.composition,
      0.78,
      [0.16, 0.28 * height],
      [[0.034, 0.018, 0.05], [0.058, 0.032, 0.085]],
      pale,
    );
    data.cubes = scatter(
      random,
      count(18),
      "layered",
      0.72,
      [0.29, 0.46 * height],
      [[0.105, 0.075, 0.105], [0.155, 0.12, 0.155]],
      [ingredients[1] ?? "#c89531", ingredients[2] ?? "#d5ac45"],
    );
    data.leaves = scatter(
      random,
      count(18),
      "radial",
      0.82,
      [0.25, 0.42 * height],
      [[0.16, 0.16, 0.16], [0.28, 0.28, 0.28]],
      garnish,
    );
    data.slices = Array.from({ length: count(7) }, (_, index) => {
      const angle = -0.92 + index * 0.22;
      return {
        position: [
          Math.cos(angle) * 0.43 + 0.08,
          0.4 + index * 0.012,
          Math.sin(angle) * 0.43,
        ],
        rotation: [0.16, -angle + Math.PI / 2, -0.13],
        scale: [0.13, 0.065, 0.36],
        color: culinaryColor(garnish[index % garnish.length] ?? "#65773d"),
      };
    });
    data.discs = scatter(
      random,
      count(5),
      "radial",
      0.68,
      [0.36, 0.5],
      [[0.095, 0.025, 0.095], [0.14, 0.032, 0.14]],
      ["#9e3e39", "#d8c5a9"],
    );
    data.orbs = scatter(
      random,
      count(16),
      "layered",
      0.66,
      [0.28, 0.48],
      [[0.035, 0.035, 0.035], [0.062, 0.062, 0.062]],
      garnish,
    );
  }

  if (config.profile === "mushroom") {
    const mushroomCount = count(19);
    const positions = Array.from({ length: mushroomCount }, (_, index) =>
      pointInComposition(
        random,
        config.composition,
        0.8,
        index,
        mushroomCount,
      ),
    );
    data.stems = positions.map((point, index) => ({
      position: [point.x, 0.26 + point.distance * 0.09, point.z],
      rotation: [
        range(random, -0.16, 0.16),
        range(random, 0, Math.PI * 2),
        range(random, -0.16, 0.16),
      ],
      scale: [0.055, range(random, 0.14, 0.25) * height, 0.055],
      color: colorAt(pale, index),
    }));
    data.caps = positions.map((point, index) => ({
      position: [point.x, 0.43 + point.distance * 0.08, point.z],
      rotation: [range(random, -0.18, 0.18), random() * Math.PI, 0],
      scale: [
        range(random, 0.11, 0.2),
        range(random, 0.045, 0.085),
        range(random, 0.11, 0.2),
      ],
      color: colorAt(ingredients, index),
    }));
    data.dots = scatter(
      random,
      count(45),
      "centered",
      0.88,
      [0.18, 0.43],
      [[0.014, 0.014, 0.014], [0.027, 0.027, 0.027]],
      ["#15130e", "#594630"],
    );
    data.leaves = scatter(
      random,
      count(10),
      "asymmetric",
      0.78,
      [0.28, 0.46],
      [[0.13, 0.13, 0.13], [0.23, 0.23, 0.23]],
      garnish,
    );
  }

  if (config.profile === "lotus-rice") {
    data.grains = scatter(
      random,
      count(142),
      config.composition,
      0.84,
      [0.17, 0.34 * height],
      [[0.026, 0.018, 0.075], [0.044, 0.029, 0.11]],
      pale,
    );
    data.orbs = scatter(
      random,
      count(29),
      "layered",
      0.72,
      [0.28, 0.48 * height],
      [[0.052, 0.052, 0.052], [0.087, 0.087, 0.087]],
      [ingredients[0] ?? "#9d8751", pale[1]],
    );
    data.cubes = scatter(
      random,
      count(20),
      "radial",
      0.73,
      [0.26, 0.43],
      [[0.065, 0.05, 0.065], [0.11, 0.09, 0.11]],
      ingredients.slice(1).concat(garnish),
    );
    data.petals = Array.from({ length: count(8) }, (_, index) => {
      const angle = (index / count(8)) * Math.PI * 2;
      return {
        position: [
          Math.cos(angle) * 0.17,
          0.54 + Math.sin(angle * 2) * 0.012,
          Math.sin(angle) * 0.17,
        ],
        rotation: [-Math.PI / 2 + 0.34, angle, 0],
        scale: [0.17, 0.23, 0.17],
        color: colorAt(
          config.garnishPalette.length
            ? config.garnishPalette.map((value) => culinaryColor(value, 0.7))
            : ["#9f5965", "#d0a7a4"],
          index,
        ),
      };
    });
    data.seeds = scatter(
      random,
      count(18),
      "centered",
      0.62,
      [0.34, 0.52],
      [[0.025, 0.02, 0.045], [0.045, 0.03, 0.075]],
      ["#88713b", "#c1a562"],
    );
  }

  if (config.profile === "hotpot") {
    const mushroomCount = count(13);
    const positions = Array.from({ length: mushroomCount }, (_, index) =>
      pointInComposition(random, "radial", 0.76, index, mushroomCount),
    );
    data.stems = positions.map((point, index) => ({
      position: [point.x, 0.28, point.z],
      rotation: [0, random() * Math.PI, 0],
      scale: [0.04, range(random, 0.09, 0.17), 0.04],
      color: colorAt(pale, index),
    }));
    data.caps = positions.map((point, index) => ({
      position: [point.x, 0.39, point.z],
      rotation: [range(random, -0.22, 0.22), random() * Math.PI, 0],
      scale: [
        range(random, 0.09, 0.16),
        range(random, 0.035, 0.07),
        range(random, 0.09, 0.16),
      ],
      color: colorAt(ingredients, index),
    }));
    data.cubes = scatter(
      random,
      count(16),
      "layered",
      0.66,
      [0.27, 0.46],
      [[0.08, 0.065, 0.08], [0.14, 0.115, 0.14]],
      [pale[0], ingredients[2] ?? "#a88e4d"],
    );
    data.leaves = scatter(
      random,
      count(20),
      "radial",
      0.86,
      [0.28, 0.47],
      [[0.13, 0.13, 0.13], [0.25, 0.25, 0.25]],
      garnish,
    );
    data.orbs = scatter(
      random,
      count(16),
      "centered",
      0.73,
      [0.24, 0.38],
      [[0.025, 0.025, 0.025], [0.055, 0.055, 0.055]],
      ingredients,
    );
  }

  if (config.profile === "rolls") {
    const rollCount = Math.max(4, count(6));
    data.rolls = Array.from({ length: rollCount }, (_, index) => {
      const row = index % 2;
      const column = Math.floor(index / 2);
      const z = (column - (rollCount - 1) / 4) * 0.29;
      return {
        position: [
          (row - 0.5) * 0.19 + range(random, -0.04, 0.04),
          0.27 + column * 0.035,
          z,
        ],
        rotation: [
          range(random, -0.08, 0.08),
          range(random, -0.16, 0.16),
          Math.PI / 2 + range(random, -0.09, 0.09),
        ],
        scale: [0.105, range(random, 0.42, 0.53), 0.105],
        color: colorAt(ingredients, index),
      };
    });
    data.rollEnds = data.rolls.flatMap((roll, index) => [
      {
        ...roll,
        position: [
          roll.position[0] - roll.scale[1] * 0.51,
          roll.position[1],
          roll.position[2],
        ] as Vec3,
        scale: [0.089, 0.018, 0.089] as Vec3,
        color: colorAt(pale, index),
      },
      {
        ...roll,
        position: [
          roll.position[0] + roll.scale[1] * 0.51,
          roll.position[1],
          roll.position[2],
        ] as Vec3,
        scale: [0.089, 0.018, 0.089] as Vec3,
        color: colorAt(pale, index + 1),
      },
    ]);
    data.leaves = scatter(
      random,
      count(16),
      "asymmetric",
      0.84,
      [0.2, 0.35],
      [[0.15, 0.15, 0.15], [0.27, 0.27, 0.27]],
      garnish,
    );
    data.dots = scatter(
      random,
      count(25),
      "asymmetric",
      0.76,
      [0.2, 0.42],
      [[0.014, 0.014, 0.014], [0.034, 0.034, 0.034]],
      [ingredients[2] ?? "#84652e", "#3b2418"],
    );
  }

  if (config.profile === "pumpkin-soup") {
    data.seeds = scatter(
      random,
      count(24),
      "radial",
      0.6,
      [0.255, 0.28],
      [[0.025, 0.018, 0.06], [0.04, 0.025, 0.085]],
      ["#7a5b2e", "#ae8d51", "#d3b778"],
    );
    data.dots = scatter(
      random,
      count(11),
      "centered",
      0.55,
      [0.265, 0.3],
      [[0.025, 0.015, 0.025], [0.052, 0.024, 0.052]],
      [pale[0], "#e5d9b9"],
    );
    data.leaves = scatter(
      random,
      count(7),
      "asymmetric",
      0.67,
      [0.27, 0.35],
      [[0.1, 0.1, 0.1], [0.17, 0.17, 0.17]],
      garnish,
    );
  }

  if (config.profile === "tofu") {
    data.cubes = scatter(
      random,
      count(21),
      config.composition,
      0.72,
      [0.24, 0.58 * height],
      [[0.1, 0.08, 0.1], [0.18, 0.14, 0.18]],
      ingredients.concat(["#bd9c5b", "#d2b477"]),
    );
    data.dots = scatter(
      random,
      count(58),
      "centered",
      0.86,
      [0.18, 0.58],
      [[0.012, 0.012, 0.012], [0.028, 0.028, 0.028]],
      ["#17130d", "#6a4227"],
    );
    data.leaves = scatter(
      random,
      count(14),
      "radial",
      0.84,
      [0.23, 0.48],
      [[0.12, 0.12, 0.12], [0.23, 0.23, 0.23]],
      garnish,
    );
    data.seeds = scatter(
      random,
      count(38),
      "centered",
      0.74,
      [0.27, 0.57],
      [[0.012, 0.008, 0.025], [0.024, 0.014, 0.04]],
      ["#d1bb80", "#8a6f3f"],
    );
  }

  data.leaves = data.leaves.map((item) => ({
    ...item,
    rotation: [
      -Math.PI / 2 + item.rotation[0],
      item.rotation[1],
      item.rotation[2],
    ],
  }));

  return data;
}

function SauceSurface({
  profile,
  sauceColor,
  quality,
}: {
  profile: DishProfile;
  sauceColor: string;
  quality: "low" | "high";
}) {
  const segments = quality === "high" ? 80 : 36;
  const sauce = culinaryColor(sauceColor, 0.58);

  if (profile === "hotpot") {
    return (
      <group>
        <mesh position-y={0.15} castShadow receiveShadow>
          <cylinderGeometry args={[1.08, 1.14, 0.18, segments]} />
          <meshPhysicalMaterial
            color="#151812"
            roughness={0.34}
            metalness={0.18}
            clearcoat={0.46}
          />
        </mesh>
        <mesh position-y={0.248} receiveShadow>
          <cylinderGeometry args={[0.98, 1.01, 0.018, segments]} />
          <meshPhysicalMaterial
            color={sauce}
            roughness={0.25}
            clearcoat={0.72}
            clearcoatRoughness={0.17}
          />
        </mesh>
        <mesh rotation-x={Math.PI / 2} position-y={0.255}>
          <torusGeometry args={[1.055, 0.032, 10, segments]} />
          <meshStandardMaterial
            color="#8f6c2e"
            roughness={0.38}
            metalness={0.65}
          />
        </mesh>
      </group>
    );
  }

  if (profile === "pumpkin-soup") {
    return (
      <group>
        <mesh position-y={0.14} castShadow receiveShadow>
          <cylinderGeometry args={[1.06, 1.12, 0.17, segments]} />
          <meshPhysicalMaterial
            color="#20261f"
            roughness={0.3}
            clearcoat={0.55}
            clearcoatRoughness={0.25}
          />
        </mesh>
        <mesh position-y={0.238}>
          <cylinderGeometry args={[0.98, 1, 0.016, segments]} />
          <meshPhysicalMaterial
            color={sauce}
            roughness={0.2}
            clearcoat={0.78}
            clearcoatRoughness={0.14}
          />
        </mesh>
        <mesh
          rotation-x={Math.PI / 2}
          position={[0.06, 0.257, -0.02]}
          scale={[0.65, 0.48, 1]}
        >
          <torusGeometry args={[0.42, 0.014, 8, segments]} />
          <meshStandardMaterial
            color="#dfd1ae"
            roughness={0.36}
          />
        </mesh>
      </group>
    );
  }

  if (profile === "mushroom" || profile === "tofu") {
    return (
      <mesh
        position-y={0.135}
        scale={profile === "tofu" ? [1.04, 1, 0.87] : [0.9, 1, 1.05]}
        receiveShadow
      >
        <cylinderGeometry args={[0.9, 0.94, 0.038, segments]} />
        <meshPhysicalMaterial
          color={sauce}
          roughness={0.27}
          clearcoat={0.62}
          clearcoatRoughness={0.2}
        />
      </mesh>
    );
  }

  if (profile === "rolls") {
    return (
      <group position={[0.82, 0.18, 0.53]} scale={0.34}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.58, 0.24, segments]} />
          <meshPhysicalMaterial
            color="#182018"
            roughness={0.35}
            clearcoat={0.48}
          />
        </mesh>
        <mesh position-y={0.13}>
          <cylinderGeometry args={[0.45, 0.46, 0.025, segments]} />
          <meshPhysicalMaterial
            color={sauce}
            roughness={0.25}
            clearcoat={0.72}
          />
        </mesh>
      </group>
    );
  }

  return null;
}

/**
 * Deterministic procedural food renderer for the seven Signature Dish
 * profiles. It renders food only; compose it with DishPlate and
 * DishPedestal so the same food Object3D can travel between views.
 */
export function ProceduralDishFactory({
  config,
  quality = "high",
  ...groupProps
}: ProceduralDishFactoryProps) {
  const data = useMemo(
    () => buildVisualData(config, quality),
    [config, quality],
  );
  const geometry = INGREDIENT_GEOMETRIES[quality];

  return (
    <group {...groupProps} dispose={null}>
      <SauceSurface
        profile={config.profile}
        sauceColor={config.sauceColor}
        quality={quality}
      />

      <InstanceField
        items={data.grains}
        geometry={geometry.grain}
        roughness={0.72}
      />
      <InstanceField
        items={data.cubes}
        geometry={geometry.cube}
        roughness={0.58}
        clearcoat={0.08}
      />
      <InstanceField
        items={data.orbs}
        geometry={geometry.sphere}
        roughness={0.54}
        clearcoat={0.12}
      />
      <InstanceField
        items={data.leaves}
        geometry={LEAF_GEOMETRY}
        roughness={0.73}
      />
      <InstanceField
        items={data.caps}
        geometry={geometry.sphere}
        roughness={0.66}
        clearcoat={0.1}
      />
      <InstanceField
        items={data.stems}
        geometry={geometry.cylinder}
        roughness={0.78}
      />
      <InstanceField
        items={data.rolls}
        geometry={geometry.cylinder}
        roughness={0.62}
        clearcoat={0.06}
      />
      <InstanceField
        items={data.rollEnds}
        geometry={geometry.cylinder}
        roughness={0.72}
      />
      <InstanceField
        items={data.slices}
        geometry={geometry.sphere}
        roughness={0.5}
        clearcoat={0.18}
      />
      <InstanceField
        items={data.discs}
        geometry={geometry.cylinder}
        roughness={0.48}
        clearcoat={0.16}
      />
      <InstanceField
        items={data.seeds}
        geometry={geometry.capsule}
        roughness={0.68}
      />
      <InstanceField
        items={data.petals}
        geometry={LEAF_GEOMETRY}
        roughness={0.57}
        clearcoat={0.1}
      />
      <InstanceField
        items={data.dots}
        geometry={geometry.sphere}
        roughness={0.47}
        clearcoat={0.14}
      />
    </group>
  );
}

export default ProceduralDishFactory;
