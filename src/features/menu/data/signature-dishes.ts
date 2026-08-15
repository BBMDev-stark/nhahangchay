import type {
  DishTheme,
  SignatureDish,
  SignatureIngredient,
} from "@/components/signature-dishes/types";

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
    name: "Cơm Cung Đình Gói Lá Sen",
    imageSrc: "/images/signature-dishes/com-cung-dinh-cutout.png",
    titleLines: ["Cơm Cung Đình", "Gói Lá Sen"],
    tagline: "Thanh nhã · Hương sen · Tròn vị",
    badges: ["Đặc trưng", "Best seller"],
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
    name: "Vịt Hoàng Kim + Bánh Bao",
    imageSrc: "/images/signature-dishes/vit-hoang-kim-banh-bao-cutout.png",
    titleLines: ["Vịt Hoàng Kim", "+ Bánh Bao"],
    tagline: "Đậm đà · Óng vị · Dùng nóng",
    badges: ["Đặc trưng", "Best seller"],
    theme: THEMES.forest,
    ingredientNotes: [
      "Đậm vị, mềm mọng",
      "Mềm xốp, thơm nhẹ",
      "Chua thanh, tươi mát",
      "Giòn mát tự nhiên",
      "Sánh bóng, tròn vị",
    ],
    ingredientPalette: ["#805139", "#b07b48", "#7a9a4f", "#d0a55d"],
  },
  {
    name: "Bánh Xèo Nấm Thập Cẩm",
    imageSrc: "/images/signature-dishes/banh-xeo-nam-thap-cam-cutout.png",
    titleLines: ["Bánh Xèo Nấm", "Thập Cẩm"],
    tagline: "Vàng giòn · Rau rừng · Thanh vị",
    badges: ["Đặc trưng", "Best seller"],
    theme: THEMES.harvest,
    ingredientNotes: [
      "Vỏ mỏng, vàng giòn",
      "Ngọt thơm tự nhiên",
      "Tươi xanh, thanh mát",
      "Giòn nhẹ, mọng nước",
      "Chua ngọt hài hòa",
    ],
    ingredientPalette: ["#d9a234", "#8a6747", "#6f9345", "#d0b56d"],
  },
  {
    name: "Nấm Bào Ngư Đút Lò",
    imageSrc: "/images/signature-dishes/nam-bao-ngu-dut-lo-cutout.png",
    titleLines: ["Nấm Bào Ngư", "Đút Lò"],
    tagline: "Thơm lò · Béo nhẹ · Mềm ngọt",
    badges: ["Đặc trưng", "Chef's choice"],
    theme: THEMES.ember,
    ingredientNotes: [
      "Thịt nấm dày, ngọt",
      "Béo thơm, vàng mặt",
      "Mịn nhẹ, cân vị",
      "Thơm dịu sau nướng",
      "Tươi xanh, làm sáng vị",
    ],
    ingredientPalette: ["#8b6142", "#e0b55d", "#c9a474", "#6f874b"],
  },
  {
    name: "Gỏi Hoàng Cung",
    imageSrc: "/images/signature-dishes/goi-hoang-cung-cutout.png",
    titleLines: ["Gỏi", "Hoàng Cung"],
    tagline: "Tươi giòn · Thanh nhẹ · Sắc vị",
    badges: ["Món chay", "Đặc trưng"],
    theme: THEMES.spring,
    ingredientNotes: [
      "Tươi giòn, giàu xơ",
      "Mềm thơm, vị đất",
      "Bùi béo, rang thơm",
      "Giòn ngọt, cân sắc",
      "Chua ngọt vừa vị",
    ],
    ingredientPalette: ["#8fa35e", "#9b7650", "#d6a153", "#b35348"],
  },
  {
    name: "Mẹt Bánh Quê",
    imageSrc: "/images/signature-dishes/met-banh-que-cutout.png",
    titleLines: ["Mẹt", "Bánh Quê"],
    tagline: "Đủ vị · Gần gũi · Sẻ chia",
    badges: ["Đặc trưng", "Chef's choice"],
    theme: THEMES.moss,
    ingredientNotes: [
      "Mềm dẻo, nhiều sắc",
      "Thơm lá, đậm hương quê",
      "Mềm mịn, đậm đà",
      "Bùi thơm, giòn nhẹ",
      "Thanh vị, cân bằng",
    ],
    ingredientPalette: ["#d4bb74", "#718447", "#b07c48", "#e1d2ad"],
  },
  {
    name: "Chè Sen Long Nhãn",
    imageSrc: "/images/signature-dishes/che-sen-long-nhan-cutout.png",
    titleLines: ["Chè Sen", "Long Nhãn"],
    tagline: "Thanh mát · Dịu ngọt · An nhiên",
    badges: ["Món chay", "Thanh vị"],
    theme: THEMES.jade,
    ingredientNotes: [
      "Bùi mềm, thơm nhẹ",
      "Ngọt dịu, mọng mềm",
      "Trong thanh, mát lành",
      "Hương sen tinh tế",
      "Điểm hương tự nhiên",
    ],
    ingredientPalette: ["#e1d5aa", "#c9a66a", "#f0dfb5", "#ad5872"],
  },
];

// Signature Dishes is a curated presentation with its own high-resolution
// photography. Keep this metadata independent from the larger restaurant menu
// so replacing menu categories cannot break the homepage experience again.
const SIGNATURE_SOURCES = {
  "Cơm Cung Đình Gói Lá Sen": { id: "signature-com-cung-dinh", slug: "com-cung-dinh-goi-la-sen", description: "Cơm chiên rau củ và hạt sen, trình bày trong lá sen với hương thơm thanh nhã.", price: 150000, calories: 420, ingredients: ["Gạo thơm", "Hạt sen", "Lá sen", "Đậu Hà Lan", "Nấm"] },
  "Vịt Hoàng Kim + Bánh Bao": { id: "signature-vit-hoang-kim", slug: "vit-hoang-kim-banh-bao", description: "Vịt chay sốt hoàng kim đậm vị, dùng nóng cùng bánh bao mềm và rau tươi.", price: 120000, calories: 390, ingredients: ["Vịt chay", "Bánh bao", "Dưa leo", "Cà chua", "Sốt hoàng kim"] },
  "Bánh Xèo Nấm Thập Cẩm": { id: "signature-banh-xeo-nam", slug: "banh-xeo-nam-thap-cam", description: "Bánh xèo vàng giòn với nhân nấm thập cẩm, ăn kèm rau rừng và nước chấm chay.", price: 140000, calories: 360, ingredients: ["Bột gạo", "Nấm thập cẩm", "Rau rừng", "Giá đỗ", "Nước chấm chay"] },
  "Nấm Bào Ngư Đút Lò": { id: "signature-nam-bao-ngu", slug: "nam-bao-ngu-dut-lo", description: "Nấm bào ngư nướng trong chén nhỏ, phủ lớp phô mai vàng thơm.", price: 120000, calories: 310, ingredients: ["Nấm bào ngư", "Phô mai", "Sốt kem", "Gia vị thảo mộc", "Ngò tây"] },
  "Gỏi Hoàng Cung": { id: "signature-goi-hoang-cung", slug: "goi-hoang-cung", description: "Rau củ, nấm và đậu phộng rang phối trộn cùng sốt chua ngọt đặc trưng.", price: 100000, calories: 230, ingredients: ["Rau củ", "Nấm", "Đậu phộng", "Ớt chuông", "Sốt gỏi chay"] },
  "Mẹt Bánh Quê": { id: "signature-met-banh-que", slug: "met-banh-que", description: "Mẹt bánh dân gian nhiều sắc vị, kết hợp bánh lá, bánh ít và các món chén nhỏ.", price: 130000, calories: 460, ingredients: ["Bánh ít", "Bánh lá", "Bánh bèo", "Đậu phộng", "Rau thơm"] },
  "Chè Sen Long Nhãn": { id: "signature-che-sen", slug: "che-sen-long-nhan", description: "Hạt sen bùi mềm nấu cùng long nhãn trong nước chè thanh ngọt, dùng mát.", price: 25000, calories: 180, ingredients: ["Hạt sen", "Long nhãn", "Đường phèn", "Hoa sen", "Lá dứa"] },
} as const;

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
  const source = SIGNATURE_SOURCES[curated.name as keyof typeof SIGNATURE_SOURCES];

  if (!source) {
    throw new Error(`Missing source dish: ${curated.name}`);
  }

  return {
    id: source.id,
    slug: source.slug,
    name: curated.name,
    imageSrc: curated.imageSrc,
    titleLines: curated.titleLines,
    tagline: curated.tagline,
    description: source.description,
    price: source.price,
    calories: source.calories,
    primaryIngredients: source.ingredients.slice(0, 2).join(", "),
    badges: curated.badges,
    ingredients: buildIngredientList(
      [...source.ingredients],
      curated.ingredientNotes,
      curated.ingredientPalette,
    ),
    theme: curated.theme,
  };
});
