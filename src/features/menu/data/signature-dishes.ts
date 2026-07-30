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
  profile: SignatureDish["procedural"]["profile"];
  composition: SignatureDish["procedural"]["composition"];
  seed: number;
  plateColor: string;
  plateRimColor: string;
  ingredientPalette: string[];
  garnishPalette: string[];
  sauceColor: string;
  density: number;
  height: number;
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
    profile: "quinoa",
    composition: "radial",
    seed: 1701,
    plateColor: "#27382d",
    plateRimColor: "#b98a43",
    ingredientPalette: ["#d8c795", "#89a44f", "#e5a32f", "#b6cc62"],
    garnishPalette: ["#254e2f", "#5e893e", "#c76755"],
    sauceColor: "#d9872b",
    density: 1,
    height: 0.9,
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
    profile: "mushroom",
    composition: "asymmetric",
    seed: 2805,
    plateColor: "#252c26",
    plateRimColor: "#a77a3a",
    ingredientPalette: ["#71513b", "#9a7353", "#c19b72", "#34271f"],
    garnishPalette: ["#405a31", "#79924d", "#b69661"],
    sauceColor: "#251912",
    density: 0.88,
    height: 1.06,
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
    profile: "lotus-rice",
    composition: "centered",
    seed: 3912,
    plateColor: "#30352b",
    plateRimColor: "#c2974f",
    ingredientPalette: ["#d9cfab", "#d4c382", "#6e9b4b", "#dc8f3f"],
    garnishPalette: ["#47693d", "#7a9a59", "#c88387"],
    sauceColor: "#8c693b",
    density: 1.08,
    height: 1.12,
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
    profile: "hotpot",
    composition: "radial",
    seed: 4418,
    plateColor: "#29231d",
    plateRimColor: "#be8747",
    ingredientPalette: ["#7b5136", "#c8b79d", "#9e6d45", "#d19b57"],
    garnishPalette: ["#39543a", "#6c8650", "#a83f2f"],
    sauceColor: "#8a4d24",
    density: 0.94,
    height: 1.18,
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
    profile: "rolls",
    composition: "rolled",
    seed: 5110,
    plateColor: "#26342a",
    plateRimColor: "#b58f48",
    ingredientPalette: ["#e7dfc2", "#8fa35e", "#d6a153", "#bdc98a"],
    garnishPalette: ["#31623b", "#6c994d", "#d9b94c"],
    sauceColor: "#6f351f",
    density: 0.82,
    height: 0.78,
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
    profile: "pumpkin-soup",
    composition: "centered",
    seed: 6237,
    plateColor: "#35291d",
    plateRimColor: "#c39145",
    ingredientPalette: ["#d87924", "#f0b44f", "#e6d5a2", "#9f6f2d"],
    garnishPalette: ["#385b31", "#6d8742", "#d2bb7a"],
    sauceColor: "#dd7624",
    density: 0.72,
    height: 0.62,
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
    profile: "tofu",
    composition: "layered",
    seed: 7042,
    plateColor: "#293329",
    plateRimColor: "#ad823f",
    ingredientPalette: ["#d8c99f", "#866249", "#a88964", "#5b7948"],
    garnishPalette: ["#345b38", "#7a9856", "#d1b265"],
    sauceColor: "#4a2f21",
    density: 0.84,
    height: 1,
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
    procedural: {
      id: source.id,
      seed: curated.seed,
      plateColor: curated.plateColor,
      plateRimColor: curated.plateRimColor,
      ingredientPalette: curated.ingredientPalette,
      garnishPalette: curated.garnishPalette,
      sauceColor: curated.sauceColor,
      composition: curated.composition,
      density: curated.density,
      height: curated.height,
      profile: curated.profile,
    },
  };
});
