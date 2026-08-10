import type { Dish } from "@/types";
import { slugify } from "@/lib/utils";

interface RawDish {
  name: string;
  price: number;
  category: Dish["category"];
  image: string;
  tags?: Dish["tags"];
  ingredients?: string[];
  calories?: number;
  description?: string;
  featured?: boolean;
}

const CATEGORY_COPY: Record<Dish["category"], string> = {
  "khai-vi": "Món mở đầu thanh vị, được chế biến chỉn chu theo phong cách chay Hương Sen.",
  salad: "Rau củ và nguyên liệu thực vật được phối trộn hài hòa, tươi nhẹ và tròn vị.",
  soup: "Nước dùng chay thanh ngọt, nấu chậm để giữ hương vị tự nhiên của nguyên liệu.",
  "mon-chinh": "Món chay đậm vị, phù hợp dùng riêng hoặc sẻ chia trong bữa ăn.",
  com: "Món cơm chay ấm bụng, kết hợp rau củ, nấm và gia vị thuần thực vật.",
  mi: "Món mì chay hài hòa giữa sợi mì, rau củ và nước sốt đặc trưng.",
  lau: "Lẩu chay dùng nóng, quy tụ nấm và rau theo mùa trong phần nước dùng thanh vị.",
  dessert: "Món ngọt nhẹ nhàng, khép lại bữa ăn bằng hương vị thanh mát.",
  beverage: "Thức uống chay thanh mát, cân bằng trọn vẹn trải nghiệm ẩm thực.",
};

function item(
  name: string,
  price: number,
  category: Dish["category"],
  image: string,
  options: Pick<RawDish, "tags" | "ingredients" | "calories" | "description" | "featured"> = {},
): RawDish {
  return {
    name,
    price,
    category,
    image: `/generated/menu-collage/${image}.webp`,
    tags: options.tags ?? ["vegan"],
    ingredients: options.ingredients ?? ["Nguyên liệu thực vật", "Rau củ theo mùa"],
    calories: options.calories ?? 260,
    description: options.description ?? CATEGORY_COPY[category],
    featured: options.featured,
  };
}

const RAW_DISHES: RawDish[] = [
  // Khai vị và món cuốn
  item("Bánh Ít Trần", 65_000, "khai-vi", "banh-it-tran"),
  item("Gỏi Cuốn", 24_000, "khai-vi", "goi-cuon"),
  item("Bánh Hỏi Lá Lốt", 100_000, "khai-vi", "banh-hoi-la-lot"),
  item("Bánh Hỏi Nem Nướng", 100_000, "khai-vi", "banh-hoi-nem-nuong"),
  item("Chả Giò", 65_000, "khai-vi", "cha-gio", { tags: ["vegan", "best-seller"] }),
  item("Nem Vuông", 90_000, "khai-vi", "nem-vuong"),
  item("Mẹt Bánh Quê", 130_000, "khai-vi", "met-banh-que"),
  item("Bánh Khọt", 90_000, "khai-vi", "banh-khot"),
  item("Bánh Phở Cuốn", 80_000, "khai-vi", "banh-pho-cuon"),
  item("Bò Cuộn Phô Mai", 80_000, "khai-vi", "bo-cuon-pho-mai"),
  item("Bánh Hỏi Chả Giò", 100_000, "khai-vi", "banh-hoi-cha-gio"),
  item("Bò Bía", 24_000, "khai-vi", "bo-bia"),
  item("Bì Cuốn", 24_000, "khai-vi", "bi-cuon"),
  item("Sa Kê Lăn Bột Chiên", 60_000, "khai-vi", "sa-ke-lan-bot-chien", {
    tags: ["vegan", "new"],
    ingredients: ["Sa kê", "Bột chiên chay", "Rau thơm"],
    calories: 260,
    description: "Sa kê bùi mềm phủ lớp bột mỏng, chiên vàng giòn và dùng nóng cùng sốt chay dịu vị.",
  }),

  // Gỏi và salad
  item("Gỏi Hoàng Cung", 100_000, "salad", "goi-hoang-cung"),
  item("Gỏi Hương Sen", 100_000, "salad", "goi-huong-sen", { tags: ["vegan", "best-seller"], featured: true }),
  item("Salad Rau Củ", 100_000, "salad", "salad-rau-cu"),
  item("Gỏi Rau Câu Nấm Tuyết", 100_000, "salad", "goi-rau-cau-nam-tuyet"),
  item("Gỏi Củ Hũ Dừa", 100_000, "salad", "goi-cu-hu-dua"),
  item("Gỏi Mít Non Trộn", 100_000, "salad", "goi-mit-non-tron"),
  item("Gỏi Chuối Xanh", 100_000, "salad", "goi-chuoi-xanh"),

  // Súp và canh
  item("Súp Hạt Sen", 35_000, "soup", "sup-hat-sen"),
  item("Canh Chua Bạc Hà", 60_000, "soup", "canh-chua-bac-ha"),
  item("Canh Khổ Qua Nhồi Đậu", 60_000, "soup", "canh-kho-qua-nhoi-dau"),
  item("Súp Tóc Tiên", 35_000, "soup", "sup-toc-tien"),

  // Món chính
  item("Nấm Bào Ngư Đút Lò", 120_000, "mon-chinh", "nam-bao-ngu-dut-lo"),
  item("Vịt Hoàng Kim + Bánh Bao", 120_000, "mon-chinh", "vit-hoang-kim-banh-bao"),
  item("Vịt Hoàng Kim + Xôi", 120_000, "mon-chinh", "vit-hoang-kim-xoi"),
  item("Đậu Nấu Tiêu Xanh + Bánh Mì", 80_000, "mon-chinh", "dau-nau-tieu-xanh-banh-mi"),
  item("Bông Cải Xào Nấm", 55_000, "mon-chinh", "bong-cai-xao-nam"),
  item("Bánh Xèo Nấm Mối", 160_000, "mon-chinh", "banh-xeo-nam-moi", {
    tags: ["vegan", "new"],
    ingredients: ["Nấm mối", "Bột gạo", "Rau rừng"],
    calories: 310,
    description: "Bánh xèo vàng giòn, nhân nấm mối thanh ngọt, dùng cùng rau rừng và nước chấm chay.",
    featured: true,
  }),
  item("Bông Bí Xào Nấm Mối", 80_000, "mon-chinh", "bong-bi-xao-nam-moi", {
    tags: ["vegan", "new"],
    ingredients: ["Bông bí", "Nấm mối", "Rau thơm"],
    calories: 190,
    description: "Bông bí non xào nhanh cùng nấm mối, giữ độ xanh giòn và vị ngọt tự nhiên của nguyên liệu mùa vụ.",
  }),
  item("Pasta Đút Lò", 120_000, "mon-chinh", "pasta-dut-lo"),
  item("Cà Ri Nấm Đậu Hũ", 80_000, "mon-chinh", "ca-ri-nam-dau-hu"),
  item("Cánh Gà Chiên Mắm", 68_000, "mon-chinh", "canh-ga-chien-mam"),
  item("Rau Xào Thập Cẩm", 55_000, "mon-chinh", "rau-xao-thap-cam"),
  item("Khổ Qua Dồn Đậu Kho", 60_000, "mon-chinh", "kho-qua-don-dau-kho"),
  item("Nấm Mối Kho Tiêu Xanh", 80_000, "mon-chinh", "nam-moi-kho-tieu-xanh", { tags: ["vegan", "chef-choice"] }),

  // Cơm
  item("Cơm Cung Đình Gói Lá Sen", 150_000, "com", "com-cung-dinh-goi-la-sen", { tags: ["vegan", "best-seller"], featured: true }),
  item("Cơm Chiên Trái Thơm", 120_000, "com", "com-chien-trai-thom"),
  item("Cơm Niêu", 65_000, "com", "com-nieu"),
  item("Cơm Vịt Hoàng Kim", 120_000, "com", "com-vit-hoang-kim"),
  item("Cơm Ngũ Sắc", 65_000, "com", "com-ngu-sac"),
  item("Cơm Gà Rôti", 65_000, "com", "com-ga-roti"),

  // Mì và món Ý
  item("Mì Ý Chua Cay", 80_000, "mi", "mi-y-chua-cay"),
  item("Mì Xào Giòn", 85_000, "mi", "mi-xao-gion", { tags: ["vegan", "best-seller"] }),
  item("Mì Ý Sốt Cà", 80_000, "mi", "mi-y-sot-ca"),
  item("Mì Xào Thập Cẩm", 85_000, "mi", "mi-xao-thap-cam"),
  item("Miến Xào Thập Cẩm", 95_000, "mi", "mien-xao-thap-cam"),

  // Lẩu
  item("Lẩu Nấm Mối", 360_000, "lau", "lau-nam-moi", { tags: ["vegan", "chef-choice"], featured: true }),
  item("Lẩu Mắm", 380_000, "lau", "lau-mam"),
  item("Lẩu Nấm Thái", 380_000, "lau", "lau-nam-thai"),

  // Tráng miệng
  item("Chè Hạt Sen Long Nhãn", 25_000, "dessert", "che-hat-sen-long-nhan", { tags: ["vegan", "best-seller"] }),
  item("Chè Ngũ Quả", 30_000, "dessert", "che-ngu-qua"),
  item("Yaourt Hạt Đác", 35_000, "dessert", "yaourt-hat-dac"),
  item("Chè Đậu Ván", 25_000, "dessert", "che-dau-van"),

  // Pizza được giữ trong nhóm món chính để tránh một tab chỉ có hai món.
  item("Pizza Phô Mai", 180_000, "mon-chinh", "pizza-pho-mai"),
  item("Pizza Rau Củ", 220_000, "mon-chinh", "pizza-rau-cu"),
];

export const dishes: Dish[] = RAW_DISHES.map((dish, index) => ({
  id: `dish-${String(index + 1).padStart(3, "0")}`,
  slug: slugify(dish.name),
  name: dish.name,
  description: dish.description ?? CATEGORY_COPY[dish.category],
  price: dish.price,
  calories: dish.calories ?? 260,
  ingredients: dish.ingredients ?? ["Nguyên liệu thực vật", "Rau củ theo mùa"],
  image: dish.image,
  category: dish.category,
  tags: dish.tags ?? ["vegan"],
  featured: dish.featured,
}));

export const featuredDishes = dishes.filter((dish) => dish.featured);

export function getDishesByCategory(category: Dish["category"]) {
  return dishes.filter((dish) => dish.category === category);
}

export function getDishBySlug(slug: string) {
  return dishes.find((dish) => dish.slug === slug);
}
