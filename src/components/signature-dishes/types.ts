import type { MutableRefObject } from "react";

export type DishExperiencePhase =
  | "loading"
  | "explore"
  | "dragging"
  | "snapping"
  | "opening"
  | "detail"
  | "switching-detail"
  | "closing";

export type DishComposition =
  | "centered"
  | "radial"
  | "asymmetric"
  | "layered"
  | "rolled";

export type DishProfile =
  | "quinoa"
  | "mushroom"
  | "lotus-rice"
  | "hotpot"
  | "rolls"
  | "pumpkin-soup"
  | "tofu";

export type DishTheme = {
  background: string;
  backgroundSoft: string;
  surface: string;
  olive: string;
  glow: string;
  accent: string;
  accentLight: string;
};

export type ProceduralDishConfig = {
  id: string;
  seed: number;
  plateColor: string;
  plateRimColor: string;
  ingredientPalette: string[];
  garnishPalette: string[];
  sauceColor: string;
  composition: DishComposition;
  density: number;
  height: number;
  profile: DishProfile;
};

export type SignatureIngredient = {
  name: string;
  note: string;
  tone: string;
};

export type SignatureDish = {
  id: string;
  slug: string;
  name: string;
  imageSrc: string;
  titleLines: [string, string?];
  tagline: string;
  description: string;
  price: number;
  calories: number;
  primaryIngredients: string;
  badges: string[];
  ingredients: SignatureIngredient[];
  theme: DishTheme;
  procedural: ProceduralDishConfig;
};

export type DishMotionEngine = {
  progress: number;
  velocity: number;
  snapFrom: number;
  snapTarget: number;
  snapStartedAt: number;
  snapDuration: number;
  lastInputAt: number;
  dragging: boolean;
  dragVelocity: number;
  hoverAmount: number;
  pointerTiltX: number;
  pointerTiltY: number;
  modeMix: number;
  switchMix: number;
  switchDirection: -1 | 0 | 1;
  detailIndex: number | null;
  pendingDetailIndex: number | null;
  reducedMotion: boolean;
  interacting: boolean;
};

export type DishEngineRef = MutableRefObject<DishMotionEngine>;

export type DishExperienceState = {
  phase: DishExperiencePhase;
  renderMode: "pending" | "photo";
  activeIndex: number;
  displayIndex: number;
};
