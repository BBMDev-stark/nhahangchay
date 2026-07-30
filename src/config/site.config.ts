/**
 * Cấu hình thương hiệu trung tâm — TÊN GIẢ ĐỊNH TẠM THỜI.
 * Toàn bộ SEO, Footer, JSON-LD Schema đều đọc từ đây.
 * Khi có thông tin thật, chỉ cần sửa file này, không cần sửa rải rác trong code.
 */
export const siteConfig = {
  name: "LOTUS & EARTH",
  shortName: "Lotus & Earth",
  tagline: "Fine Vegetarian Dining",
  description:
    "Nhà hàng chay cao cấp Lotus & Earth — nơi ẩm thực thực vật gặp gỡ nghệ thuật tinh tế, tôn vinh nguyên liệu hữu cơ theo mùa trong không gian thiền tịnh, sang trọng.",
  url: "https://lotusandearth.example.com",
  ogImage: "/images/hero/og-cover.jpg",
  locale: "vi_VN",
  keywords: [
    "nhà hàng chay cao cấp",
    "fine dining vegetarian",
    "nhà hàng chay sang trọng",
    "ẩm thực chay hữu cơ",
    "vegan fine dining",
  ],
  contact: {
    phone: "+84 28 1234 5678",
    email: "reservation@lotusandearth.example.com",
    address: {
      street: "12 Đường Nguyễn Huệ",
      district: "Quận 1",
      city: "TP. Hồ Chí Minh",
      country: "Việt Nam",
      postalCode: "700000",
    },
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4!2d106.7009!3d10.7769",
    coordinates: { lat: 10.7769, lng: 106.7009 },
  },
  openingHours: [
    { days: "Thứ Hai - Thứ Sáu", hours: "11:00 - 22:00" },
    { days: "Thứ Bảy - Chủ Nhật", hours: "10:00 - 23:00" },
  ],
  social: {
    instagram: "https://instagram.com/lotusandearth",
    facebook: "https://facebook.com/lotusandearth",
    tiktok: "https://tiktok.com/@lotusandearth",
  },
} as const;

export type SiteConfig = typeof siteConfig;
