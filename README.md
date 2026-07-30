# Lotus & Earth — Luxury Vegetarian Restaurant Website

Website nhà hàng chay cao cấp, xây dựng bằng Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4.

> **Lưu ý:** "LOTUS & EARTH" là tên thương hiệu **giả định tạm thời**. Toàn bộ thông tin
> thương hiệu (tên, địa chỉ, SĐT, mạng xã hội...) nằm tập trung tại
> `src/config/site.config.ts` — chỉ cần sửa 1 file này khi có thông tin thật.

## Công nghệ sử dụng

- **Next.js 16** (App Router, Server Components, Route Groups, Metadata API)
- **React 19**, **TypeScript** (strict, không dùng `any`)
- **Tailwind CSS 4** (design tokens qua CSS variables)
- **Framer Motion** cho animation (fade, reveal, mask, parallax)
- **Lenis** cho smooth scroll
- **React Hook Form + Zod** cho validation form
- **Embla Carousel**, **Lucide React**, **Radix UI** (Accordion)

## Bắt đầu

```bash
npm install
npm run dev       # chạy dev server tại http://localhost:3000
npm run build     # build production
npm run start     # chạy bản production đã build
npm run lint      # kiểm tra ESLint
```

> ⚠️ `next/font/google` cần kết nối internet để tải font Cormorant Garamond & Inter
> trong lúc build. Nếu build trong môi trường không có internet, xem phần "Chạy
> offline" bên dưới.

## Cấu trúc thư mục

```
src/
├── app/                    # Routing (App Router)
├── components/
│   ├── ui/                 # Primitives tái sử dụng (Button, Badge)
│   ├── layout/              # Navbar, Footer, ScrollProgress, BackToTop, FloatingButton
│   ├── sections/            # Các block lớn của trang chủ
│   ├── shared/               # SectionTitle, ImageReveal, Lightbox, Carousel, Container
│   └── forms/                # ReservationForm, ContactForm, NewsletterForm
├── features/                 # Logic + data theo domain (menu, gallery, blog, testimonials...)
├── hooks/                     # useLenis, useMediaQuery, useScrollProgress
├── lib/                        # utils.ts (cn, formatVND...), seo.tsx (JSON-LD builders)
├── config/                     # site.config.ts, nav.config.ts
├── constants/                  # design tokens dạng TS (màu, easing, breakpoints)
└── types/                      # Interface dùng chung toàn dự án
```

## Dữ liệu mẫu

Tất cả dữ liệu (30 món ăn, 15 bài blog, 25 đánh giá, 20 ảnh không gian, 10 đầu bếp,
10 nguyên liệu, 6 khuyến mãi, 8 FAQ) nằm trong `src/features/*/data/*.ts`, có type
TypeScript đầy đủ. Ảnh hiện đang là **placeholder được sinh tự động** (script tại
`scripts/gen-placeholders.py`) — thay bằng ảnh thật cùng tên file trong `public/images/`
khi lên production.

## SEO đã tích hợp

- Metadata API (title template, OG, Twitter Card) ở từng page
- JSON-LD: Restaurant, Organization, Menu, FAQ, BreadcrumbList (`src/lib/seo.tsx`)
- `sitemap.ts` và `robots.ts` tự sinh động
- Semantic HTML, alt text đầy đủ cho ảnh

## Chạy offline (nếu môi trường build không có internet)

Mở `src/app/layout.tsx`, tạm thay `next/font/google` bằng `next/font/local` với file
font tải sẵn, hoặc dùng font hệ thống tạm thời. Trong môi trường có internet bình
thường (Vercel, máy cá nhân có mạng), không cần chỉnh gì — Next.js tự tải và tối ưu
font khi build.

## Deploy

Sẵn sàng deploy lên Vercel (khuyến nghị) hoặc bất kỳ nền tảng hỗ trợ Next.js:

```bash
npm run build
npm run start
```

## Việc cần làm trước khi lên production thật

1. Thay toàn bộ ảnh placeholder trong `public/images/` bằng ảnh thật.
2. Cập nhật `src/config/site.config.ts` với thông tin thương hiệu thật.
3. Tích hợp gửi email/CRM thật trong `src/app/api/reservation/route.ts` (hiện đang
   log ra console, chưa gửi email).
4. Thay `mapEmbedUrl` bằng link Google Maps embed thật của địa chỉ nhà hàng.
5. Chạy Lighthouse để xác nhận điểm Performance/SEO/Accessibility trước khi launch.
