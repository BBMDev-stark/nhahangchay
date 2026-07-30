export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const mainNav: NavItem[] = [
  { label: "Trang Chủ", href: "/" },
  { label: "Giới Thiệu", href: "/about" },
  { label: "Thực Đơn", href: "/menu" },
  { label: "Không Gian", href: "/gallery" },
  { label: "Ưu Đãi", href: "/promotions" },
  { label: "Blog", href: "/blog" },
  { label: "Liên Hệ", href: "/contact" },
];

export const footerNav = {
  explore: [
    { label: "Giới Thiệu", href: "/about" },
    { label: "Thực Đơn", href: "/menu" },
    { label: "Không Gian", href: "/gallery" },
    { label: "Blog", href: "/blog" },
  ],
  guest: [
    { label: "Đặt Bàn", href: "/reservation" },
    { label: "Ưu Đãi", href: "/promotions" },
    { label: "Liên Hệ", href: "/contact" },
    { label: "Câu Hỏi Thường Gặp", href: "/#faq" },
  ],
};
