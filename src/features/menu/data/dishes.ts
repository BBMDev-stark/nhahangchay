import type { Dish } from "@/types";
import { slugify } from "@/lib/utils";

interface RawDish {
  name: string;
  description: string;
  price: number;
  calories: number;
  ingredients: string[];
  category: Dish["category"];
  tags: Dish["tags"];
  featured?: boolean;
}

const RAW_DISHES: RawDish[] = [
  // Khai vị
  { name: "Gỏi Cuốn Sen Vàng", description: "Bánh tráng cuốn sen, nấm hương, rau thơm hữu cơ, chấm tương me chay.", price: 165000, calories: 180, ingredients: ["Củ sen", "Nấm hương", "Bún gạo lứt", "Rau thơm"], category: "khai-vi", tags: ["vegan", "best-seller"] },
  { name: "Đậu Hũ Chiên Sả Ớt", description: "Đậu hũ non chiên giòn áp chảo sả ớt, sốt me thanh dịu.", price: 145000, calories: 220, ingredients: ["Đậu hũ non", "Sả", "Ớt sừng", "Sốt me"], category: "khai-vi", tags: ["vegan", "new"] },
  { name: "Chả Giò Nấm Truffle", description: "Chả giò chay nhân nấm ba loại, tinh dầu truffle đen.", price: 195000, calories: 240, ingredients: ["Nấm đông cô", "Nấm kim châm", "Truffle", "Bánh tráng"], category: "khai-vi", tags: ["chef-choice"] },
  { name: "Bánh Xèo Mini Chay", description: "Bánh xèo giòn thu nhỏ, nhân giá đỗ và nấm bào ngư.", price: 155000, calories: 210, ingredients: ["Bột gạo", "Nghệ tươi", "Giá đỗ", "Nấm bào ngư"], category: "khai-vi", tags: ["vegan"] },

  // Salad
  { name: "Salad Quinoa Bơ Xoài", description: "Quinoa hữu cơ, bơ sáp, xoài chín, hạt điều rang, sốt chanh dây.", price: 185000, calories: 320, ingredients: ["Quinoa", "Bơ sáp", "Xoài", "Hạt điều"], category: "salad", tags: ["vegan", "best-seller"], featured: true },
  { name: "Salad Rau Mầm Sen", description: "Rau mầm hữu cơ, hạt sen tươi, dầu oliu ép lạnh.", price: 165000, calories: 190, ingredients: ["Rau mầm", "Hạt sen", "Dầu oliu", "Hạt bí"], category: "salad", tags: ["vegan"] },
  { name: "Salad Đu Đủ Xanh Chay", description: "Đu đủ bào sợi, đậu phộng rang, nước mắm chay chua ngọt.", price: 145000, calories: 175, ingredients: ["Đu đủ xanh", "Đậu phộng", "Cà rốt", "Rau răm"], category: "salad", tags: ["vegan"] },

  // Soup
  { name: "Súp Bí Đỏ Nước Cốt Dừa", description: "Bí đỏ hầm nhuyễn, nước cốt dừa béo nhẹ, hạt bí rang.", price: 135000, calories: 210, ingredients: ["Bí đỏ", "Nước cốt dừa", "Gừng", "Hạt bí"], category: "soup", tags: ["vegan", "best-seller"] },
  { name: "Súp Nấm Rừng Truffle", description: "Nấm rừng hầm kem thực vật, hương truffle tinh tế.", price: 175000, calories: 240, ingredients: ["Nấm rừng", "Kem hạnh nhân", "Truffle", "Cỏ xạ hương"], category: "soup", tags: ["chef-choice"] },
  { name: "Canh Chua Chay Miền Tây", description: "Canh chua thanh mát nấu me, đậu bắp, bạc hà, đậu hũ chiên.", price: 125000, calories: 160, ingredients: ["Me", "Đậu bắp", "Bạc hà", "Đậu hũ"], category: "soup", tags: ["vegan"] },

  // Món chính
  { name: "Nấm Đông Cô Sốt Tiêu Đen", description: "Nấm đông cô áp chảo, sốt tiêu đen đậm đà, khoai tây nghiền.", price: 285000, calories: 380, ingredients: ["Nấm đông cô", "Tiêu đen", "Khoai tây", "Bơ thực vật"], category: "mon-chinh", tags: ["chef-choice", "best-seller"], featured: true },
  { name: "Đậu Hũ Kho Tộ Truyền Thống", description: "Đậu hũ kho tộ đất, nước dừa, tiêu xanh, ăn kèm cơm gạo lứt.", price: 195000, calories: 300, ingredients: ["Đậu hũ", "Nước dừa", "Tiêu xanh", "Hành tím"], category: "mon-chinh", tags: ["vegan"] },
  { name: "Bò Chay Lúc Lắc Rau Củ", description: "Nấm bào ngư xé sợi tẩm ướp kiểu bò lúc lắc, rau củ nướng.", price: 245000, calories: 340, ingredients: ["Nấm bào ngư", "Ớt chuông", "Hành tây", "Xà lách xoong"], category: "mon-chinh", tags: ["new"] },
  { name: "Cà Tím Nướng Miso", description: "Cà tím Nhật nướng phết sốt miso ngọt, mè rang.", price: 215000, calories: 260, ingredients: ["Cà tím Nhật", "Sốt miso", "Mè trắng", "Hành lá"], category: "mon-chinh", tags: ["chef-choice", "vegan"] },
  { name: "Tofu Steak Sốt Nấm", description: "Đậu hũ non áp chảo kiểu steak, sốt nấm kem thực vật.", price: 265000, calories: 350, ingredients: ["Đậu hũ non", "Nấm mỡ", "Kem thực vật", "Măng tây"], category: "mon-chinh", tags: ["best-seller"] },

  // Cơm
  { name: "Cơm Sen Hoàng Cung", description: "Cơm chiên hạt sen trong lá sen, đậu Hà Lan, cà rốt baby.", price: 195000, calories: 420, ingredients: ["Gạo sen", "Hạt sen", "Lá sen", "Đậu Hà Lan"], category: "com", tags: ["chef-choice", "best-seller"], featured: true },
  { name: "Cơm Gạo Lứt Rau Củ Nướng", description: "Cơm gạo lứt hữu cơ, rau củ theo mùa nướng thảo mộc.", price: 165000, calories: 380, ingredients: ["Gạo lứt", "Bí ngòi", "Cà rốt", "Thảo mộc"], category: "com", tags: ["vegan"] },
  { name: "Cơm Chiên Dứa Hạt Điều", description: "Cơm chiên dứa vàng, hạt điều rang, nho khô, cà ri nhẹ.", price: 175000, calories: 400, ingredients: ["Dứa", "Hạt điều", "Nho khô", "Bột cà ri"], category: "com", tags: ["new"] },

  // Mì
  { name: "Mì Udon Nấm Truffle", description: "Mì Udon Nhật Bản, nước dùng kombu, nấm truffle đen.", price: 225000, calories: 390, ingredients: ["Mì Udon", "Kombu", "Truffle", "Nấm kim châm"], category: "mi", tags: ["chef-choice"] },
  { name: "Mì Quảng Chay", description: "Mì Quảng truyền thống, đậu phộng, bánh tráng nướng, nước lèo nghệ.", price: 155000, calories: 350, ingredients: ["Mì Quảng", "Nghệ tươi", "Đậu phộng", "Nấm"], category: "mi", tags: ["vegan", "best-seller"] },
  { name: "Phở Chay Thảo Mộc", description: "Phở nước dùng thảo mộc thanh, đậu hũ, rau thơm Hà Nội.", price: 145000, calories: 320, ingredients: ["Bánh phở", "Quế hồi", "Đậu hũ", "Rau thơm"], category: "mi", tags: ["vegan"] },

  // Lẩu
  { name: "Lẩu Nấm Thảo Mộc", description: "Lẩu nước dùng nấm và thảo mộc thanh, thập cẩm nấm cao cấp.", price: 385000, calories: 450, ingredients: ["Nấm đông cô", "Nấm kim châm", "Táo đỏ", "Kỷ tử"], category: "lau", tags: ["chef-choice", "best-seller"], featured: true },
  { name: "Lẩu Chua Cay Chay", description: "Lẩu chua cay kiểu Thái, sả, riềng, nấm, đậu hũ.", price: 345000, calories: 400, ingredients: ["Sả", "Riềng", "Nấm rơm", "Cà chua"], category: "lau", tags: ["vegan"] },

  // Dessert
  { name: "Chè Sen Long Nhãn", description: "Chè hạt sen long nhãn truyền thống, đường phèn thanh nhẹ.", price: 95000, calories: 180, ingredients: ["Hạt sen", "Long nhãn", "Đường phèn"], category: "dessert", tags: ["vegan", "best-seller"] },
  { name: "Bánh Flan Trà Xanh", description: "Bánh flan mềm mịn vị trà xanh Nhật Bản, sốt caramel thuần chay.", price: 105000, calories: 220, ingredients: ["Sữa hạnh nhân", "Trà xanh Uji", "Agar", "Caramel"], category: "dessert", tags: ["new"] },
  { name: "Xôi Xoài Dừa Non", description: "Xôi nếp cẩm, xoài chín, nước cốt dừa non thơm béo.", price: 115000, calories: 260, ingredients: ["Nếp cẩm", "Xoài", "Dừa non", "Mè rang"], category: "dessert", tags: ["vegan", "chef-choice"] },
  { name: "Tiramisu Matcha Chay", description: "Tiramisu phiên bản thuần chay, lớp matcha đắng nhẹ hòa quyện kem hạnh nhân.", price: 135000, calories: 290, ingredients: ["Matcha", "Kem hạnh nhân", "Bánh ladyfinger chay", "Cacao"], category: "dessert", tags: ["chef-choice"] },

  // Beverage
  { name: "Trà Hoa Sen Nhài", description: "Trà sen ướp hoa nhài tươi, thưởng thức ấm hoặc lạnh.", price: 85000, calories: 20, ingredients: ["Trà sen", "Hoa nhài", "Mật hoa"], category: "beverage", tags: ["vegan", "best-seller"] },
  { name: "Nước Ép Detox Xanh", description: "Cần tây, táo xanh, dưa leo, chanh — thanh lọc cơ thể.", price: 95000, calories: 90, ingredients: ["Cần tây", "Táo xanh", "Dưa leo", "Chanh"], category: "beverage", tags: ["vegan", "new"] },
  { name: "Sinh Tố Bơ Matcha", description: "Bơ sáp xay cùng matcha nguyên chất, sữa yến mạch.", price: 105000, calories: 210, ingredients: ["Bơ sáp", "Matcha", "Sữa yến mạch", "Mật ong hoa"], category: "beverage", tags: ["chef-choice"] },
  { name: "Kombucha Hoa Đậu Biếc", description: "Kombucha lên men tự nhiên, hoa đậu biếc, chanh sả.", price: 115000, calories: 60, ingredients: ["Kombucha", "Hoa đậu biếc", "Chanh", "Sả"], category: "beverage", tags: ["vegan", "new"] },
];

export const dishes: Dish[] = RAW_DISHES.map((d, index) => ({
  id: `dish-${String(index + 1).padStart(3, "0")}`,
  slug: slugify(d.name),
  name: d.name,
  description: d.description,
  price: d.price,
  calories: d.calories,
  ingredients: d.ingredients,
  image: `/images/dishes/dish-${String((index % 30) + 1).padStart(2, "0")}.jpg`,
  category: d.category,
  tags: d.tags,
  featured: d.featured,
}));

export const featuredDishes = dishes.filter((d) => d.featured);

export function getDishesByCategory(category: Dish["category"]) {
  return dishes.filter((d) => d.category === category);
}

export function getDishBySlug(slug: string) {
  return dishes.find((d) => d.slug === slug);
}
