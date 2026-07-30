import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { ReservationForm } from "@/components/forms/reservation-form";
import { siteConfig } from "@/config/site.config";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Đặt Bàn",
  description: `Đặt bàn trực tuyến tại ${siteConfig.name} — nhà hàng chay cao cấp. Xác nhận nhanh chóng, phục vụ tận tâm.`,
  alternates: { canonical: "/reservation" },
};

export default function ReservationPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Trang chủ", url: "/" },
          { name: "Đặt bàn", url: "/reservation" },
        ])}
      />
      <PageHeader
        eyebrow="Đặt Bàn"
        title="Reserve Your Table"
        description="Giữ chỗ trước để đảm bảo trải nghiệm trọn vẹn nhất tại Lotus & Earth."
        image="/images/hero/reservation.jpg"
      />
      <section className="section-padding bg-surface">
        <Container className="mx-auto max-w-3xl">
          <ReservationForm />
        </Container>
      </section>
    </>
  );
}
