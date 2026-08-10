import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { ReservationForm } from "@/components/forms/reservation-form";
import { siteConfig } from "@/config/site.config";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Đặt Bàn",
  description: `Gửi yêu cầu đặt bàn tại ${siteConfig.name}. Nhà hàng sẽ liên hệ lại để xác nhận.`,
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
        title="Hẹn một bữa chay an lành"
        description="Gửi thông tin của bạn, Hương Sen sẽ liên hệ để xác nhận chỗ ngồi phù hợp."
        image="/brand/huong-sen-facade.png"
      />
      <section className="section-padding bg-surface">
        <Container className="mx-auto max-w-3xl">
          <ReservationForm />
        </Container>
      </section>
    </>
  );
}
