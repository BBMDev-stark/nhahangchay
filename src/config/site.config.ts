/** Thông tin thương hiệu trung tâm của Nhà hàng chay Hương Sen. */
export const siteConfig = {
  name: "NHÀ HÀNG CHAY HƯƠNG SEN",
  shortName: "Hương Sen",
  tagline: "Thanh vị từ tâm",
  description:
    "Nhà hàng chay Hương Sen tại 778/2 Nguyễn Kiệm, Phường Đức Nhuận, TP. Hồ Chí Minh — món chay Việt đa dạng trong không gian ấm cúng và thanh tịnh.",
  url: "http://localhost:3000",
  logoImage: "/brand/huong-sen-logo-transparent-v3.png",
  ogImage: "/og.png",
  locale: "vi_VN",
  keywords: [
    "nhà hàng chay Hương Sen",
    "nhà hàng chay Nguyễn Kiệm",
    "quán chay Phú Nhuận",
    "món chay Việt",
    "cơm chay Hương Sen",
  ],
  contact: {
    phone: "0909 277 888",
    phoneHref: "+84909277888",
    email: "comchayhuongsen@gmail.com",
    address: {
      street: "778/2 Đường Nguyễn Kiệm",
      district: "Phường Đức Nhuận",
      city: "TP. Hồ Chí Minh",
      country: "Việt Nam",
      postalCode: "700000",
    },
    mapEmbedUrl:
      "https://www.google.com/maps?q=Nh%C3%A0%20h%C3%A0ng%20chay%20H%C6%B0%C6%A1ng%20Sen%2C%20778%2F2%20Nguy%E1%BB%85n%20Ki%E1%BB%87m%2C%20Ph%C3%BA%20Nhu%E1%BA%ADn%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh&output=embed",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Nh%C3%A0%20h%C3%A0ng%20chay%20H%C6%B0%C6%A1ng%20Sen%2C%20778%2F2%20Nguy%E1%BB%85n%20Ki%E1%BB%87m%2C%20Ph%C3%BA%20Nhu%E1%BA%ADn%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Nh%C3%A0%20h%C3%A0ng%20chay%20H%C6%B0%C6%A1ng%20Sen%2C%20778%2F2%20Nguy%E1%BB%85n%20Ki%E1%BB%87m%2C%20Ph%C3%BA%20Nhu%E1%BA%ADn%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh",
  },
  openingHours: [
    { days: "Mỗi ngày", hours: "08:00 - 14:00" },
    { days: "Buổi chiều", hours: "16:00 - 21:00" },
  ],
  social: {
    facebook: "https://www.facebook.com/comchayhuongsen143hvh",
  },
} as const;

export type SiteConfig = typeof siteConfig;
