import type { GalleryImage } from "@/types";

const SPACE_TITLES = [
  "Sảnh chính", "Khu vực VIP", "Bàn ngoài trời", "Quầy bar trà",
  "Phòng riêng thiền tịnh", "Khu vườn nhật", "Ánh sáng hoàng hôn",
  "Góc đọc sách", "Lối vào chính", "Khu bếp mở",
  "Bàn đôi ban công", "Không gian sự kiện", "Chi tiết nội thất gỗ",
  "Đèn lồng sân vườn", "Bàn dài gia đình", "Góc thiền trà",
  "Cầu thang gỗ nguyên khối", "Sân trong lát đá", "Khu vực chờ",
  "Toàn cảnh nhà hàng về đêm",
];

export const galleryImages: GalleryImage[] = SPACE_TITLES.map((title, i) => ({
  id: `gallery-${String(i + 1).padStart(3, "0")}`,
  src: `/images/gallery/space-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: title,
  category: "khong-gian" as const,
  width: 1200,
  height: i % 3 === 0 ? 1500 : 900, // masonry variation
}));
