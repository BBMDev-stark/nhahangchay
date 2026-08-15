import type { LucideIcon } from "lucide-react";
import {
  Leaf,
  Sprout,
  Wheat,
  Hand,
  Sparkles,
  Droplet,
  Layers,
  Box,
  Soup,
  Salad,
  ShieldCheck,
} from "lucide-react";

export type CalloutPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type IngredientCalloutData = {
  icon: LucideIcon;
  title: string;
  description: string;
  position: CalloutPosition;
};

export type DishDetail = {
  id: string;
  src: string;
  alt: string;
  category: string;
  titleLines: [string, string];
  description: string;
  checklist: { icon: LucideIcon; label: string }[];
  ingredients: IngredientCalloutData[];
  rightCards: { icon: LucideIcon; title: string; description: string }[];
  nutrition: { calories: number; protein: number; fat: number; carbs: number };
  tags: { icon: LucideIcon; label: string }[];
};

// Thứ tự duyệt qua các món trong modal (mũi tên trái/phải)
export const DISH_ORDER = [
  "center",
  "dish-soup",
  "dish-side",
  "dish-roll",
  "dish-salad",
] as const;

export const dishDetails: Record<string, DishDetail> = {
  center: {
    id: "center",
    src: "/images/huong-sen/hero/com-tay-cam-trimmed.png",
    alt: "Cơm thố chay Hương Sen",
    category: "Món Cơm Đậm Vị",
    titleLines: ["Cơm Thố", "Hương Sen."],
    description:
      "Cơm được nấu trong thố cùng rau củ, nấm và gia vị chay, phủ lớp chà bông thực vật thơm giòn và dùng nóng tại bàn.",
    checklist: [
      { icon: Leaf, label: "Món Chay" },
      { icon: ShieldCheck, label: "Không Chất Bảo Quản" },
      { icon: Hand, label: "Nấu Trong Thố" },
      { icon: Sparkles, label: "Dùng Nóng" },
    ],
    ingredients: [
      {
        icon: Leaf,
        title: "Rau Củ Hạt Lựu",
        description: "Đậu, cà rốt và rau củ tạo sắc màu tự nhiên.",
        position: "top-left",
      },
      {
        icon: Layers,
        title: "Thố Đất Giữ Nhiệt",
        description: "Giúp hạt cơm nóng lâu và dậy mùi thơm.",
        position: "top-right",
      },
      {
        icon: Soup,
        title: "Chà Bông Thực Vật",
        description: "Tạo lớp vị đậm và kết cấu giòn nhẹ.",
        position: "bottom-left",
      },
      {
        icon: Box,
        title: "Nấm Tươi",
        description: "Nấm kết hợp cùng cơm và gia vị chay vừa miệng.",
        position: "bottom-right",
      },
    ],
    rightCards: [
      {
        icon: Sprout,
        title: "Món Chính No Lòng",
        description: "Phần cơm đầy đặn, phù hợp cho bữa trưa hoặc tối.",
      },
      {
        icon: Salad,
        title: "Dùng Nóng Tại Bàn",
        description: "Thố giữ nhiệt giúp món ăn thơm ngon lâu hơn.",
      },
      {
        icon: Sparkles,
        title: "Hương Vị Hài Hòa",
        description: "Kết hợp vị bùi của cơm, nấm và rau củ.",
      },
    ],
    nutrition: { calories: 320, protein: 24, fat: 12, carbs: 36 },
    tags: [
      { icon: Leaf, label: "Món Chay" },
      { icon: Wheat, label: "Gluten Free" },
      { icon: Hand, label: "Handmade" },
      { icon: Sparkles, label: "Organic" },
    ],
  },

  "dish-soup": {
    id: "dish-soup",
    src: "/images/huong-sen/hero/goi-hoang-cung-topdown-v2.png",
    alt: "Gỏi Hoàng Cung tại nhà hàng chay Hương Sen",
    category: "Gỏi & Salad",
    titleLines: ["Gỏi", "Hoàng Cung."],
    description:
      "Rau củ, nấm và đậu phộng rang được phối trộn cùng sốt chua ngọt, tạo nên món gỏi tươi giòn và hài hòa.",
    checklist: [
      { icon: Leaf, label: "Món Chay" },
      { icon: Sprout, label: "Rau Củ & Nấm" },
      { icon: Hand, label: "Trộn Khi Gọi Món" },
      { icon: Sparkles, label: "Chua Ngọt Hài Hòa" },
    ],
    ingredients: [
      {
        icon: Sprout,
        title: "Rau Củ Tươi",
        description: "Nhiều loại rau củ tạo độ giòn và màu sắc tự nhiên.",
        position: "top-left",
      },
      {
        icon: Leaf,
        title: "Nấm",
        description: "Nấm góp thêm vị ngọt và kết cấu mềm mọng.",
        position: "top-right",
      },
      {
        icon: Box,
        title: "Đậu Phộng Rang",
        description: "Rắc trên mặt để tăng vị bùi và độ giòn.",
        position: "bottom-left",
      },
      {
        icon: Droplet,
        title: "Sốt Gỏi",
        description: "Vị chua ngọt vừa phải giúp các nguyên liệu hòa quyện.",
        position: "bottom-right",
      },
    ],
    rightCards: [
      {
        icon: Sprout,
        title: "Tươi Giòn Nhiều Lớp",
        description: "Rau củ, nấm và đậu phộng tạo nhiều tầng kết cấu.",
      },
      {
        icon: Salad,
        title: "Phù Hợp Khai Vị",
        description: "Vị chua ngọt nhẹ giúp mở đầu bữa ăn cân bằng.",
      },
      {
        icon: Sparkles,
        title: "Trình Bày Chỉn Chu",
        description: "Món ăn được hoàn thiện và phục vụ ngay sau khi trộn.",
      },
    ],
    nutrition: { calories: 230, protein: 8, fat: 10, carbs: 28 },
    tags: [
      { icon: Leaf, label: "Món Chay" },
      { icon: Sprout, label: "Rau Củ" },
      { icon: Hand, label: "Trộn Tươi" },
    ],
  },

  "dish-side": {
    id: "dish-side",
    src: "/images/huong-sen/hero/pizza-chay-trimmed.png",
    alt: "Pizza nấm chay",
    category: "Món Chay Phong Vị Âu",
    titleLines: ["Pizza", "Nấm Chay."],
    description:
      "Đế bánh nướng vàng với nấm, rau củ, ô-liu và lớp phô mai béo nhẹ — phù hợp để cùng chia sẻ tại bàn.",
    checklist: [
      { icon: Leaf, label: "Món Chay" },
      { icon: Sprout, label: "Nấm & Rau Củ" },
      { icon: Hand, label: "Nướng Khi Gọi Món" },
      { icon: Sparkles, label: "Dùng Để Chia Sẻ" },
    ],
    ingredients: [
      {
        icon: Sprout,
        title: "Đế Bánh Nướng",
        description: "Nướng vàng để giữ độ giòn bên ngoài, mềm bên trong.",
        position: "top-left",
      },
      {
        icon: Droplet,
        title: "Nấm & Rau Củ",
        description: "Tạo vị ngọt, độ mọng và màu sắc cho mặt bánh.",
        position: "top-right",
      },
      {
        icon: Leaf,
        title: "Ô-Liu Đen",
        description: "Điểm thêm vị mặn dịu đặc trưng của pizza.",
        position: "bottom-left",
      },
      {
        icon: Sparkles,
        title: "Phô Mai",
        description: "Lớp phủ béo nhẹ, nướng đến khi vàng thơm.",
        position: "bottom-right",
      },
    ],
    rightCards: [
      {
        icon: Sprout,
        title: "Phù Hợp Chia Sẻ",
        description: "Một lựa chọn thân tình cho gia đình và nhóm bạn.",
      },
      {
        icon: Salad,
        title: "Nướng Khi Gọi Món",
        description: "Phục vụ nóng để giữ hương thơm và độ giòn.",
      },
      {
        icon: Sparkles,
        title: "Phong Vị Á — Âu",
        description: "Quen thuộc nhưng vẫn mang tinh thần món chay Hương Sen.",
      },
    ],
    nutrition: { calories: 210, protein: 7, fat: 11, carbs: 18 },
    tags: [
      { icon: Leaf, label: "Món Chay" },
      { icon: Wheat, label: "Gluten Free" },
      { icon: Sparkles, label: "Organic" },
    ],
  },

  "dish-roll": {
    id: "dish-roll",
    src: "/images/huong-sen/hero/nam-pho-mai-trimmed.png",
    alt: "Nấm đút lò phô mai",
    category: "Món Nướng Thơm Béo",
    titleLines: ["Nấm Đút Lò", "Phô Mai."],
    description:
      "Nấm được chia trong từng chén nhỏ, phủ lớp phô mai rồi đút lò đến khi vàng thơm, mềm mọng bên trong.",
    checklist: [
      { icon: Leaf, label: "Món Chay" },
      { icon: Wheat, label: "Có Phô Mai" },
      { icon: Hand, label: "Đút Lò Tại Bếp" },
      { icon: Sparkles, label: "Chia Phần Tiện Dùng" },
    ],
    ingredients: [
      {
        icon: Leaf,
        title: "Nấm Tươi",
        description: "Nấm mềm mọng được chia đều trong từng chén nhỏ.",
        position: "top-left",
      },
      {
        icon: Layers,
        title: "Phô Mai",
        description: "Phủ vừa đủ để tạo vị béo và màu vàng hấp dẫn.",
        position: "top-right",
      },
      {
        icon: Droplet,
        title: "Chén Sứ Nhỏ",
        description: "Chia phần gọn gàng, thuận tiện khi dùng chung.",
        position: "bottom-left",
      },
      {
        icon: Box,
        title: "Nướng Vàng Mặt",
        description: "Hoàn thiện trong lò đến khi mặt món vàng thơm.",
        position: "bottom-right",
      },
    ],
    rightCards: [
      {
        icon: Salad,
        title: "Thơm Béo Vừa Đủ",
        description: "Vị nấm rõ ràng, cân bằng cùng lớp phủ béo nhẹ.",
      },
      {
        icon: Sprout,
        title: "Phục Vụ Theo Khay",
        description: "Bảy phần nhỏ phù hợp để cả bàn cùng thưởng thức.",
      },
      {
        icon: Sparkles,
        title: "Dùng Ngay Khi Nóng",
        description: "Ngon nhất khi lớp mặt vừa ra khỏi lò.",
      },
    ],
    nutrition: { calories: 260, protein: 15, fat: 9, carbs: 30 },
    tags: [
      { icon: Leaf, label: "Món Chay" },
      { icon: Wheat, label: "Gluten Free" },
      { icon: Hand, label: "Handmade" },
    ],
  },

  "dish-salad": {
    id: "dish-salad",
    src: "/images/huong-sen/hero/che-trai-cay-trimmed.png",
    alt: "Chè trái cây cốt dừa",
    category: "Món Tráng Miệng",
    titleLines: ["Chè Trái Cây", "Cốt Dừa."],
    description:
      "Trái cây mềm ngọt, thạch và hạt nhỏ kết hợp cùng lớp cốt dừa béo dịu, tạo nên món tráng miệng mát lành sau bữa chay.",
    checklist: [
      { icon: Leaf, label: "Món Chay" },
      { icon: ShieldCheck, label: "Không Chất Bảo Quản" },
      { icon: Sprout, label: "Trái Cây" },
      { icon: Sparkles, label: "Cốt Dừa" },
    ],
    ingredients: [
      {
        icon: Sprout,
        title: "Trái Cây Mềm",
        description: "Mang vị ngọt dịu và màu vàng ấm cho món chè.",
        position: "top-left",
      },
      {
        icon: Leaf,
        title: "Cốt Dừa",
        description: "Lớp cốt dừa trắng béo dịu cân bằng vị ngọt.",
        position: "top-right",
      },
      {
        icon: Droplet,
        title: "Hạt Nhỏ & Thạch",
        description: "Tạo thêm nhiều lớp kết cấu trong từng muỗng.",
        position: "bottom-left",
      },
      {
        icon: Sparkles,
        title: "Lá Dứa",
        description: "Điểm hương thơm nhẹ và sắc xanh tự nhiên.",
        position: "bottom-right",
      },
    ],
    rightCards: [
      {
        icon: Salad,
        title: "Món Tráng Miệng Mát",
        description: "Kết thúc bữa chay bằng vị ngọt nhẹ nhàng.",
      },
      {
        icon: Sprout,
        title: "Béo Dịu Cốt Dừa",
        description: "Vị béo vừa phải, không lấn át trái cây.",
      },
      {
        icon: Sparkles,
        title: "Trình Bày Thanh Nhã",
        description: "Phục vụ trong tô sứ trắng với điểm nhấn lá xanh.",
      },
    ],
    nutrition: { calories: 190, protein: 6, fat: 8, carbs: 26 },
    tags: [
      { icon: Leaf, label: "Món Chay" },
      { icon: Wheat, label: "Gluten Free" },
      { icon: Sparkles, label: "Organic" },
    ],
  },
};

export function getDishDetail(id: string): DishDetail {
  return dishDetails[id] ?? dishDetails.center;
}
