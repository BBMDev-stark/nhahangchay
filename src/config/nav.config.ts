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
];

export const footerNav = {
  explore: [
    { label: "Giới Thiệu", href: "/about" },
    { label: "Thực Đơn", href: "/menu" },
    { label: "Không Gian", href: "/gallery" },
  ],
  guest: [
    { label: "Đặt Bàn", href: "/#reservation" },
    { label: "Câu Hỏi Thường Gặp", href: "/#faq" },
  ],
};
