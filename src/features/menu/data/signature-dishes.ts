import type {
  DishTheme,
  SignatureDish,
  SignatureIngredient,
} from "@/components/signature-dishes/types";
import { dishes } from "@/features/menu/data/dishes";

const THEMES = {
  jade: {
    background: "#020603",
    backgroundSoft: "#071008",
    surface: "#0b150d",
    olive: "#17271a",
    glow: "#667b3f",
    accent: "#b88a3f",
    accentLight: "#dfbc72",
  },
  forest: {
    background: "#030604",
    backgroundSoft: "#0a110b",
    surface: "#10160f",
    olive: "#202b1e",
    glow: "#75663a",
    accent: "#aa7a37",
    accentLight: "#d6a85d",
  },
  lotus: {
    background: "#040604",
    backgroundSoft: "#10120b",
    surface: "#17170e",
    olive: "#2a2d18",
    glow: "#827039",
    accent: "#bd9145",
    accentLight: "#e4c274",
  },
  ember: {
    background: "#060503",
    backgroundSoft: "#120d08",
    surface: "#1a120b",
    olive: "#2e2517",
    glow: "#8e5d2c",
    accent: "#bd7d38",
    accentLight: "#e5ad63",
  },
  spring: {
    background: "#020704",
    backgroundSoft: "#07120b",
    surface: "#0c170e",
    olive: "#1c321f",
    glow: "#4f793c",
    accent: "#b79343",
    accentLight: "#ddbd72",
  },
  harvest: {
    background: "#070503",
    backgroundSoft: "#151007",
    surface: "#1d1509",
    olive: "#322915",
    glow: "#a26928",
    accent: "#c18b3d",
    accentLight: "#e9b865",
  },
  moss: {
    background: "#030604",
    backgroundSoft: "#09110b",
    surface: "#101710",
    olive: "#263221",
    glow: "#6c7740",
    accent: "#b1843d",
    accentLight: "#ddaf64",
  },
} satisfies Record<string, DishTheme>;

type CuratedDish = {
  name: string;
  imageSrc: string;
  titleLines: [string, string?];
  tagline: string;
  badges: string[];
  theme: DishTheme;
  ingredientNotes: [string, string, string, string, string];
  ingredientPalette: string[];
};

const CURATED: CuratedDish[] = [
  {
    name: "Salad Quinoa Bơ Xoài",
    imageSrc: "/generated/dishes/salad-quinoa.webp",
    titleLines: ["Salad Quinoa", "Bơ Xoài"],
    tagline: "Thanh mát · Cân bằng · Tự nhiên",
    badges: ["Vegan", "Best seller"],
    theme: THEMES.jade,
    ingredientNotes: [
      "Giàu protein thực vật",
      "Béo lành mạnh",
      "Ngọt thanh tự nhiên",
      "Bùi thơm, giòn nhẹ",
      "Tươi mát, cân bằng",
    ],
    ingredientPalette: ["#d8c795", "#89a44f", "#e5a32f", "#b6cc62"],
  },
  {
    name: "Nấm Đông Cô Sốt Tiêu Đen",
    imageSrc: "/generated/dishes/nam-dong-co.webp",
    titleLines: ["Nấm Đông Cô", "Sốt Tiêu Đen"],
    tagline: "Đậm sâu · Ấm áp · Thuần thực vật",
    badges: ["Chef's choice", "Best seller"],
    theme: THEMES.forest,
    ingredientNotes: [
      "Umami sâu tự nhiên",
      "Nồng ấm vừa phải",
      "Mịn mượt, béo nhẹ",
      "Hương thơm thanh",
      "Sánh đậm, cân vị",
    ],
    ingredientPalette: ["#71513b", "#9a7353", "#c19b72", "#34271f"],
  },
  {
    name: "Cơm Sen Hoàng Cung",
    imageSrc: "/generated/dishes/com-sen.webp",
    titleLines: ["Cơm Sen", "Hoàng Cung"],
    tagline: "Thanh nhã · Hương sen · An nhiên",
    badges: ["Chef's choice", "Best seller"],
    theme: THEMES.lotus,
    ingredientNotes: [
      "Dẻo thơm, hạt tơi",
      "Bùi ngọt tự nhiên",
      "Hương thanh dịu",
      "Tươi ngọt, cân sắc",
      "Giòn mềm vừa độ",
    ],
    ingredientPalette: ["#d9cfab", "#d4c382", "#6e9b4b", "#dc8f3f"],
  },
  {
    name: "Lẩu Nấm Thảo Mộc",
    imageSrc: "/generated/dishes/lau-nam.webp",
    titleLines: ["Lẩu Nấm", "Thảo Mộc"],
    tagline: "Tinh khiết · Ấm lành · Sum vầy",
    badges: ["Chef's choice", "Best seller"],
    theme: THEMES.ember,
    ingredientNotes: [
      "Thịt dày, vị ngọt",
      "Giòn nhẹ, thanh mát",
      "Ngọt hậu tự nhiên",
      "Hương rừng dịu ấm",
      "Nước dùng trong thanh",
    ],
    ingredientPalette: ["#7b5136", "#c8b79d", "#9e6d45", "#d19b57"],
  },
  {
    name: "Gỏi Cuốn Sen Vàng",
    imageSrc: "/generated/dishes/goi-cuon.webp",
    titleLines: ["Gỏi Cuốn", "Sen Vàng"],
    tagline: "Trong trẻo · Tươi non · Dịu nhẹ",
    badges: ["Vegan", "Best seller"],
    theme: THEMES.spring,
    ingredientNotes: [
      "Giòn thanh, giàu xơ",
      "Mềm thơm, vị đất",
      "Dẻo nhẹ, thanh bụng",
      "Hương xanh tươi mới",
      "Chua ngọt hài hòa",
    ],
    ingredientPalette: ["#e7dfc2", "#8fa35e", "#d6a153", "#bdc98a"],
  },
  {
    name: "Súp Bí Đỏ Nước Cốt Dừa",
    imageSrc: "/generated/dishes/sup-bi-do.webp",
    titleLines: ["Súp Bí Đỏ", "Nước Cốt Dừa"],
    tagline: "Mượt mà · Ngọt lành · Êm dịu",
    badges: ["Vegan", "Best seller"],
    theme: THEMES.harvest,
    ingredientNotes: [
      "Ngọt bùi tự nhiên",
      "Béo thơm thanh nhẹ",
      "Ấm dịu, cân vị",
      "Bùi giòn, giàu dưỡng chất",
      "Kem mịn thuần thực vật",
    ],
    ingredientPalette: ["#d87924", "#f0b44f", "#e6d5a2", "#9f6f2d"],
  },
  {
    name: "Tofu Steak Sốt Nấm",
    imageSrc: "/generated/dishes/tofu-steak.webp",
    titleLines: ["Tofu Steak", "Sốt Nấm"],
    tagline: "Vững vị · Mộc lành · Tinh gọn",
    badges: ["Best seller", "Protein xanh"],
    theme: THEMES.moss,
    ingredientNotes: [
      "Mềm mịn, giàu đạm",
      "Thơm nâu, vị umami",
      "Kem mượt thuần chay",
      "Giòn xanh, tươi ngọt",
      "Sốt nấm cô đặc",
    ],
    ingredientPalette: ["#d8c99f", "#866249", "#a88964", "#5b7948"],
  },
];

function buildIngredientList(
  ingredients: string[],
  notes: CuratedDish["ingredientNotes"],
  palette: string[],
): SignatureIngredient[] {
  const padded = [...ingredients];
  while (padded.length < 5) {
    padded.push(
      ["Sốt đặc trưng", "Rau thơm hữu cơ", "Hạt rang"][padded.length % 3],
    );
  }

  return padded.slice(0, 5).map((name, index) => ({
    name,
    note: notes[index],
    tone: palette[index % palette.length],
  }));
}

export const signatureDishes: SignatureDish[] = CURATED.map((curated) => {
  const source = dishes.find((dish) => dish.name === curated.name);

  if (!source) {
    throw new Error(`Missing source dish: ${curated.name}`);
  }

  return {
    id: source.id,
    slug: source.slug,
    name: source.name,
    imageSrc: curated.imageSrc,
    titleLines: curated.titleLines,
    tagline: curated.tagline,
    description: source.description,
    price: source.price,
    calories: source.calories,
    primaryIngredients: source.ingredients.slice(0, 2).join(", "),
    badges: curated.badges,
    ingredients: buildIngredientList(
      source.ingredients,
      curated.ingredientNotes,
      curated.ingredientPalette,
    ),
    theme: curated.theme,
  };
});
