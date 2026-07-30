import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { MenuTabs } from "@/features/menu/components/menu-tabs";
import { dishes } from "@/features/menu/data/dishes";
import { JsonLd, buildMenuSchema, buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Thực Đơn",
  description:
    "Khám phá thực đơn chay cao cấp Lotus & Earth — 30 món ăn từ khai vị đến tráng miệng, chế biến từ nguyên liệu hữu cơ theo mùa.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <JsonLd data={buildMenuSchema(dishes)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Trang chủ", url: "/" },
          { name: "Thực đơn", url: "/menu" },
        ])}
      />
      <PageHeader
        eyebrow="Thực Đơn"
        title="The Menu"
        description="Mỗi món ăn là một câu chuyện về nguyên liệu, mùa vụ và sự tinh tế trong chế biến."
        image="/images/hero/menu-header.jpg"
      />
      <section className="section-padding bg-surface">
        <Container>
          <MenuTabs />
        </Container>
      </section>
    </>
  );
}
