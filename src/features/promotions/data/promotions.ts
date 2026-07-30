import type { Promotion } from "@/types";
import { slugify } from "@/lib/utils";

const RAW: Omit<Promotion, "id" | "slug" | "image">[] = [
  { title: "Buffet Chay Cuối Tuần", description: "Thưởng thức hơn 30 món chay cao cấp không giới hạn mỗi cuối tuần.", validUntil: "2026-12-31", type: "buffet", discount: "Giá cố định 590.000đ/người" },
  { title: "Combo Đôi Lãng Mạn", description: "Set menu 5 món dành cho 2 người, kèm 1 chai rượu vang hữu cơ.", validUntil: "2026-09-30", type: "combo", discount: "Tiết kiệm 15%" },
  { title: "Voucher Sinh Nhật Vàng", description: "Tặng voucher giảm 20% cho khách hàng đặt bàn dịp sinh nhật.", validUntil: "2026-12-31", type: "voucher", discount: "Giảm 20%" },
  { title: "Combo Trưa Doanh Nhân", description: "Set trưa nhanh gọn 3 món, phục vụ trong 45 phút.", validUntil: "2026-08-31", type: "combo", discount: "Chỉ từ 250.000đ" },
  { title: "Buffet Chay Chay Tịnh Tâm", description: "Buffet đặc biệt các ngày rằm, mùng một hàng tháng.", validUntil: "2026-12-31", type: "buffet", discount: "Giá cố định 490.000đ/người" },
  { title: "Voucher Khách Hàng Thân Thiết", description: "Tích điểm mỗi lần dùng bữa, đổi voucher giảm giá đến 30%.", validUntil: "2026-12-31", type: "voucher", discount: "Giảm đến 30%" },
];

export const promotions: Promotion[] = RAW.map((p, i) => ({
  ...p,
  id: `promo-${String(i + 1).padStart(3, "0")}`,
  slug: slugify(p.title),
  image: `/images/promotions/promo-${String(i + 1).padStart(2, "0")}.jpg`,
}));
