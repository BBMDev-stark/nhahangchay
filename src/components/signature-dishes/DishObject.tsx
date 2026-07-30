"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ForwardedRef,
} from "react";
import type { Group, Material, Mesh, MeshStandardMaterial } from "three";
import { DishPedestal } from "./DishPedestal";
import { DishPlate } from "./DishPlate";
import { ProceduralDishFactory } from "./ProceduralDishFactory";
import type { SignatureDish } from "./types";

export type DishObjectHandle = {
  group: Group | null;
  materials: MeshStandardMaterial[];
};

type DishObjectProps = {
  dish: SignatureDish;
  quality: "low" | "high";
};

function isStandardMaterial(material: Material): material is MeshStandardMaterial {
  return "roughness" in material && "metalness" in material;
}

function DishObjectComponent(
  { dish, quality }: DishObjectProps,
  forwardedRef: ForwardedRef<DishObjectHandle>,
) {
  const groupRef = useRef<Group>(null);
  const materialsRef = useRef<MeshStandardMaterial[]>([]);
  const foodScale =
    dish.procedural.profile === "hotpot" ||
    dish.procedural.profile === "pumpkin-soup"
      ? 1.72
      : dish.procedural.profile === "rolls"
        ? 2.05
        : 2.12;

  useImperativeHandle(
    forwardedRef,
    () => ({
      get group() {
        return groupRef.current;
      },
      get materials() {
        if (!groupRef.current) return [];
        if (materialsRef.current.length === 0) {
          const discovered: MeshStandardMaterial[] = [];
          groupRef.current.traverse((object) => {
            const mesh = object as Mesh;
            if (!mesh.isMesh || !mesh.material) return;
            const list = Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material];
            list.forEach((material) => {
              if (isStandardMaterial(material)) {
                material.transparent = true;
                discovered.push(material);
              }
            });
          });
          materialsRef.current = discovered;
        }
        return materialsRef.current;
      },
    }),
    [],
  );

  return (
    <group ref={groupRef}>
      <DishPedestal
        accent={dish.theme.accent}
        intensity={0.62}
        quality={quality}
        radius={2.45}
        height={0.5}
      />
      <group position={[0, 0.12, 0]}>
        <DishPlate
          color={dish.procedural.plateColor}
          rimColor={dish.procedural.plateRimColor}
          quality={quality}
          radius={2.18}
          depth={0.22}
        />
        <ProceduralDishFactory
          config={dish.procedural}
          quality={quality}
          scale={foodScale}
        />
      </group>
    </group>
  );
}

export const DishObject = forwardRef(DishObjectComponent);
