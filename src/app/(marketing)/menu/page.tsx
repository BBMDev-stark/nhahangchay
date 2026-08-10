import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { MenuTabs } from "@/features/menu/components/menu-tabs";
import { dishes } from "@/features/menu/data/dishes";
import { JsonLd, buildMenuSchema, buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Thực Đơn",
  description:
    "Khám phá thực đơn chay đa dạng của Hương Sen với món cuốn, gỏi, súp, cơm, mì và nhiều món chay Việt được yêu thích.",
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
        title="Thực đơn Hương Sen"
        description="Nhiều lựa chọn chay thanh lành, đậm đà và dễ sẻ chia cho một bữa ăn trọn vẹn."
        image="/brand/huong-sen-facade.png"
      />
      <section className="section-padding bg-surface">
        <Container>
          <p className="mx-auto mb-10 max-w-2xl rounded-full border border-gold/25 bg-bg-primary px-5 py-3 text-center text-xs leading-5 text-text/55">
            Giá trên website mang tính tham khảo và có thể thay đổi. Vui lòng gọi 0909 277 888 để xác nhận thực đơn hiện tại.
          </p>
          <MenuTabs />
        </Container>
      </section>
    </>
  );
}
