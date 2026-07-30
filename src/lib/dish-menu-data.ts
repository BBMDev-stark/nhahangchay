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
    src: "/images/custom/12.svg",
    alt: "Món chay đặc trưng của Lotus & Earth",
    category: "Món Cuốn Tự Nhiên",
    titleLines: ["Cuốn", "Thiên Nhiên."],
    description:
      "Sự hòa quyện tinh tế giữa nguyên liệu thuần chay tươi ngon, cuộn trong bánh tráng mỏng, chấm cùng nước sốt lên men đặc trưng.",
    checklist: [
      { icon: Leaf, label: "100% Thuần Chay" },
      { icon: ShieldCheck, label: "Không Chất Bảo Quản" },
      { icon: Hand, label: "Handmade" },
      { icon: Sparkles, label: "Organic" },
    ],
    ingredients: [
      {
        icon: Leaf,
        title: "Rau Thơm Tươi",
        description: "Rau thơm hữu cơ thu hoạch mỗi sáng tại Đà Lạt.",
        position: "top-left",
      },
      {
        icon: Layers,
        title: "Bánh Tráng Mỏng",
        description: "Bánh tráng thủ công siêu mỏng, dai mềm tự nhiên.",
        position: "top-right",
      },
      {
        icon: Soup,
        title: "Nước Chấm Lên Men",
        description: "Nước chấm lên men tự nhiên, vị thanh nhẹ hài hòa.",
        position: "bottom-left",
      },
      {
        icon: Box,
        title: "Đậu Hủ Hữu Cơ",
        description: "Đậu hủ hữu cơ áp chảo vàng thơm, giàu đạm thực vật.",
        position: "bottom-right",
      },
    ],
    rightCards: [
      {
        icon: Sprout,
        title: "Nguồn Gốc Rõ Ràng",
        description: "Nguyên liệu từ nông trại hữu cơ đối tác lâu năm.",
      },
      {
        icon: Salad,
        title: "Tươi Mỗi Ngày",
        description: "Sơ chế trong ngày, không cấp đông, không tồn kho.",
      },
      {
        icon: Sparkles,
        title: "Tinh Giản Gia Vị",
        description: "Tôn trọng vị nguyên bản, hạn chế gia vị nhân tạo.",
      },
    ],
    nutrition: { calories: 320, protein: 24, fat: 12, carbs: 36 },
    tags: [
      { icon: Leaf, label: "Plant Based" },
      { icon: Wheat, label: "Gluten Free" },
      { icon: Hand, label: "Handmade" },
      { icon: Sparkles, label: "Organic" },
    ],
  },

  "dish-soup": {
    id: "dish-soup",
    src: "/images/custom/4.svg",
    alt: "Súp rau củ hữu cơ",
    category: "Món Khai Vị Ấm",
    titleLines: ["Súp Rau Củ", "Hữu Cơ."],
    description:
      "Rau củ theo mùa được ninh chậm cùng nước dùng rong biển thanh ngọt, giữ trọn dưỡng chất và hương vị tự nhiên.",
    checklist: [
      { icon: Leaf, label: "100% Thuần Chay" },
      { icon: ShieldCheck, label: "Không Chất Bảo Quản" },
      { icon: Sprout, label: "Theo Mùa" },
      { icon: Sparkles, label: "Organic" },
    ],
    ingredients: [
      {
        icon: Sprout,
        title: "Rau Củ Theo Mùa",
        description: "Tuyển chọn từ nông trại hữu cơ mỗi tuần.",
        position: "top-left",
      },
      {
        icon: Droplet,
        title: "Nước Dùng Rong Biển",
        description: "Ninh chậm 6 giờ, thanh ngọt tự nhiên.",
        position: "top-right",
      },
      {
        icon: Leaf,
        title: "Thảo Mộc Tươi",
        description: "Ngò, hành lá thêm hương thơm dịu nhẹ.",
        position: "bottom-left",
      },
      {
        icon: Box,
        title: "Đậu Hủ Non",
        description: "Mềm mịn, tăng độ đạm thực vật cho món súp.",
        position: "bottom-right",
      },
    ],
    rightCards: [
      {
        icon: Sprout,
        title: "Nông Trại Địa Phương",
        description: "Rau củ thu hoạch trong vòng 24 giờ.",
      },
      {
        icon: Droplet,
        title: "Ninh Chậm Truyền Thống",
        description: "Giữ trọn vị ngọt tự nhiên, không bột nêm.",
      },
      {
        icon: Sparkles,
        title: "Ấm Áp, Nhẹ Nhàng",
        description: "Phù hợp khai vị hoặc dùng vào ngày se lạnh.",
      },
    ],
    nutrition: { calories: 180, protein: 9, fat: 5, carbs: 22 },
    tags: [
      { icon: Leaf, label: "Plant Based" },
      { icon: Wheat, label: "Gluten Free" },
      { icon: Sparkles, label: "Organic" },
    ],
  },

  "dish-side": {
    id: "dish-side",
    src: "/images/custom/7.svg",
    alt: "Món phụ theo mùa",
    category: "Món Phụ Theo Mùa",
    titleLines: ["Món Phụ", "Theo Mùa."],
    description:
      "Tuyển chọn nguyên liệu tươi ngon nhất trong mùa, chế biến tối giản để tôn vinh hương vị nguyên bản của từng loại rau củ.",
    checklist: [
      { icon: Leaf, label: "100% Thuần Chay" },
      { icon: Sprout, label: "Theo Mùa" },
      { icon: Hand, label: "Handmade" },
      { icon: Sparkles, label: "Organic" },
    ],
    ingredients: [
      {
        icon: Sprout,
        title: "Rau Mầm Hữu Cơ",
        description: "Ươm mầm tại chỗ, thu hái ngay khi phục vụ.",
        position: "top-left",
      },
      {
        icon: Droplet,
        title: "Sốt Mè Rang",
        description: "Mè rang tay, ép lạnh giữ hương thơm béo nhẹ.",
        position: "top-right",
      },
      {
        icon: Leaf,
        title: "Rau Củ Theo Mùa",
        description: "Đổi mới thực đơn theo từng mùa trong năm.",
        position: "bottom-left",
      },
      {
        icon: Sparkles,
        title: "Hạt Dinh Dưỡng",
        description: "Hạt điều, hạnh nhân tăng kết cấu giòn nhẹ.",
        position: "bottom-right",
      },
    ],
    rightCards: [
      {
        icon: Sprout,
        title: "Đổi Mới Theo Mùa",
        description: "Thực đơn thay đổi để luôn tươi ngon nhất.",
      },
      {
        icon: Salad,
        title: "Kết Cấu Đa Dạng",
        description: "Giòn, mềm, tươi mát hài hòa trong một món.",
      },
      {
        icon: Sparkles,
        title: "Trang Trí Tinh Tế",
        description: "Trình bày như một tác phẩm ẩm thực nhỏ.",
      },
    ],
    nutrition: { calories: 210, protein: 7, fat: 11, carbs: 18 },
    tags: [
      { icon: Leaf, label: "Plant Based" },
      { icon: Wheat, label: "Gluten Free" },
      { icon: Sparkles, label: "Organic" },
    ],
  },

  "dish-roll": {
    id: "dish-roll",
    src: "/images/custom/5.svg",
    alt: "Cuốn chay tươi",
    category: "Món Cuốn Tươi Mát",
    titleLines: ["Cuốn Chay", "Tươi Mát."],
    description:
      "Rau củ giòn tươi cuộn cùng bún gạo lứt, chấm cùng nước tương gừng nhẹ nhàng, mang đến cảm giác thanh mát tức thì.",
    checklist: [
      { icon: Leaf, label: "100% Thuần Chay" },
      { icon: Wheat, label: "Gạo Lứt" },
      { icon: Hand, label: "Handmade" },
      { icon: Sparkles, label: "Organic" },
    ],
    ingredients: [
      {
        icon: Leaf,
        title: "Rau Sống Tươi",
        description: "Xà lách, húng, diếp cá tuyển chọn mỗi ngày.",
        position: "top-left",
      },
      {
        icon: Layers,
        title: "Bánh Tráng Gạo Lứt",
        description: "Giàu chất xơ, dai nhẹ, tốt cho tiêu hóa.",
        position: "top-right",
      },
      {
        icon: Droplet,
        title: "Nước Tương Gừng",
        description: "Gừng tươi giã tay, dậy mùi thơm ấm áp.",
        position: "bottom-left",
      },
      {
        icon: Box,
        title: "Đậu Hủ Chiên Giòn",
        description: "Giòn ngoài, mềm trong, thêm kết cấu thú vị.",
        position: "bottom-right",
      },
    ],
    rightCards: [
      {
        icon: Salad,
        title: "Thanh Mát Tức Thì",
        description: "Lựa chọn lý tưởng cho ngày hè hoặc bữa nhẹ.",
      },
      {
        icon: Sprout,
        title: "Giàu Chất Xơ",
        description: "Hỗ trợ tiêu hóa, nhẹ bụng sau bữa ăn.",
      },
      {
        icon: Sparkles,
        title: "Cuộn Tay Tại Chỗ",
        description: "Đảm bảo độ tươi giòn khi đến bàn.",
      },
    ],
    nutrition: { calories: 260, protein: 15, fat: 9, carbs: 30 },
    tags: [
      { icon: Leaf, label: "Plant Based" },
      { icon: Wheat, label: "Gluten Free" },
      { icon: Hand, label: "Handmade" },
    ],
  },

  "dish-salad": {
    id: "dish-salad",
    src: "/images/custom/321.svg",
    alt: "Salad hoa quả hữu cơ",
    category: "Salad Hoa Quả Hữu Cơ",
    titleLines: ["Salad Hoa Quả", "Hữu Cơ."],
    description:
      "Trái cây và rau lá hữu cơ theo mùa, điểm xuyết hoa ăn được, tạo nên món salad vừa đẹp mắt vừa trong lành cho cơ thể.",
    checklist: [
      { icon: Leaf, label: "100% Thuần Chay" },
      { icon: ShieldCheck, label: "Không Chất Bảo Quản" },
      { icon: Sprout, label: "Theo Mùa" },
      { icon: Sparkles, label: "Organic" },
    ],
    ingredients: [
      {
        icon: Sprout,
        title: "Trái Cây Theo Mùa",
        description: "Ngọt tự nhiên, không chất bảo quản.",
        position: "top-left",
      },
      {
        icon: Leaf,
        title: "Hoa Ăn Được",
        description: "Hoa hữu cơ tô điểm hương vị và thị giác.",
        position: "top-right",
      },
      {
        icon: Droplet,
        title: "Sốt Chanh Dây",
        description: "Chua nhẹ, cân bằng vị ngọt của trái cây.",
        position: "bottom-left",
      },
      {
        icon: Sparkles,
        title: "Hạt Diêm Mạch",
        description: "Bổ sung đạm thực vật và kết cấu giòn nhẹ.",
        position: "bottom-right",
      },
    ],
    rightCards: [
      {
        icon: Salad,
        title: "Tươi Trong Ngày",
        description: "Sơ chế và trình bày ngay trước khi phục vụ.",
      },
      {
        icon: Sprout,
        title: "Ít Calo, Nhiều Vị",
        description: "Lựa chọn nhẹ nhàng cho bữa trưa thanh đạm.",
      },
      {
        icon: Sparkles,
        title: "Đẹp Như Tranh Vẽ",
        description: "Sắc màu tự nhiên từ hoa và trái cây tươi.",
      },
    ],
    nutrition: { calories: 190, protein: 6, fat: 8, carbs: 26 },
    tags: [
      { icon: Leaf, label: "Plant Based" },
      { icon: Wheat, label: "Gluten Free" },
      { icon: Sparkles, label: "Organic" },
    ],
  },
};

export function getDishDetail(id: string): DishDetail {
  return dishDetails[id] ?? dishDetails.center;
}
