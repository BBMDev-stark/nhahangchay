import { SectionTitle } from "@/components/shared/section-title";
import { Container } from "@/components/shared/container";
import { ReservationForm } from "@/components/forms/reservation-form";
import { ImageReveal } from "@/components/shared/image-reveal";

export function ReservationSection() {
  return (
    <section id="reservation" className="section-padding bg-bg-primary">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <ImageReveal
          src="/images/hero/reservation.jpg"
          alt="Đặt bàn tại Lotus & Earth"
          className="hidden h-[560px] w-full rounded-lg lg:block"
          sizes="50vw"
        />
        <div>
          <SectionTitle
            align="left"
            eyebrow="Đặt Bàn"
            title="Giữ Chỗ Cho Trải Nghiệm Của Bạn"
            description="Điền thông tin bên dưới, đội ngũ của chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất."
            className="mb-10"
          />
          <ReservationForm />
        </div>
      </Container>
    </section>
  );
}
