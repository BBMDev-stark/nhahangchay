import { Star } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { Container } from "@/components/shared/container";
import { Carousel } from "@/components/shared/carousel";
import { testimonials } from "@/features/testimonials/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-surface">
      <Container>
        <SectionTitle
          eyebrow="Đánh Giá Khách Hàng"
          title="Trải Nghiệm Từ Thực Khách"
          className="mb-14"
        />
        <Carousel slideClassName="flex-[0_0_88%] sm:flex-[0_0_48%] lg:flex-[0_0_32%]">
          {testimonials.slice(0, 12).map((t) => (
            <div
              key={t.id}
              className="flex h-full flex-col rounded-lg border border-border bg-surface-raised p-8"
            >
              <div className="mb-4 flex gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-text/70">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-6">
                <p className="font-heading text-lg text-text">{t.name}</p>
                <p className="text-xs uppercase tracking-wider text-text/40">{t.role}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
