export const COLORS = {
  bgPrimary: "#F7F6F2",
  greenPrimary: "#1F5133",
  greenSecondary: "#2E6B46",
  gold: "#B08D57",
  bgDark: "#0F1611",
  white: "#FFFFFF",
  text: "#1F1F1F",
  border: "#E8E8E8",
} as const;

export const EASE = {
  luxury: [0.22, 1, 0.36, 1] as [number, number, number, number],
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 1,
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  ultrawide: 1920,
};

export const DISH_CATEGORY_LABELS: Record<string, string> = {
  "khai-vi": "Khai Vị",
  salad: "Salad",
  soup: "Soup",
  "mon-chinh": "Món Chính",
  com: "Cơm",
  mi: "Mì",
  lau: "Lẩu",
  dessert: "Dessert",
  beverage: "Beverage",
};

export const DISH_TAG_LABELS: Record<string, string> = {
  "best-seller": "Best Seller",
  new: "New",
  "chef-choice": "Chef's Choice",
  vegan: "Vegan",
};
