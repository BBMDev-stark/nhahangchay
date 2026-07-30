"use client";

import { Leaf } from "lucide-react";
import type { SignatureIngredient } from "./types";
import styles from "./signature-dishes.module.css";

type IngredientListProps = {
  ingredients: SignatureIngredient[];
};

export function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <ol className={styles.ingredientList} aria-label="Nguyên liệu nổi bật">
      {ingredients.map((ingredient, index) => (
        <li
          key={`${ingredient.name}-${index}`}
          className={styles.ingredient}
          data-dish-ingredient
        >
          <span
            className={styles.ingredientIcon}
            style={{ "--ingredient-tone": ingredient.tone } as React.CSSProperties}
            aria-hidden="true"
          >
            <Leaf size={15} strokeWidth={1.35} />
          </span>
          <span>
            <strong>{ingredient.name}</strong>
            <small>{ingredient.note}</small>
          </span>
        </li>
      ))}
    </ol>
  );
}

