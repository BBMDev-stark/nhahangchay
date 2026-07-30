import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { SectionTitle } from "@/components/shared/section-title";
import { ImageReveal } from "@/components/shared/image-reveal";
import { chefs } from "@/features/team/data/chefs";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Giới Thiệu",
  description:
    "Câu chuyện, triết lý và đội ngũ đứng sau nhà hàng chay cao cấp Lotus & Earth.",
  alternates: { canonical: "/about" },
};

const CORE_VALUES = [
  { title: "Hữu Cơ", desc: "Nguyên liệu 100% hữu cơ, minh bạch nguồn gốc." },
  { title: "Tinh Tế", desc: "Từng chi tiết được chăm chút như một tác phẩm nghệ thuật." },
  { title: "Bền Vững", desc: "Cam kết giảm thiểu tác động môi trường trong vận hành." },
  { title: "Chân Thực", desc: "Tôn trọng hương vị nguyên bản của thực vật." },
];

const TIMELINE = [
  { year: "2021", event: "Lotus & Earth khởi nguồn từ một căn bếp nhỏ tại TP.HCM." },
  { year: "2022", event: "Mở nhà hàng đầu tiên, định hình phong cách fine dining chay." },
  { year: "2023", event: "Vinh dự nhận giải thưởng Nhà Hàng Chay Xuất Sắc." },
  { year: "2024", event: "Mở rộng không gian, ra mắt phòng riêng Chef's Table." },
  { year: "2026", event: "Tiếp tục hành trình lan tỏa triết lý ẩm thực bền vững." },
];

const AWARDS = [
  "Giải Thưởng Nhà Hàng Chay Xuất Sắc 2023",
  "Top 10 Fine Dining Restaurant Việt Nam 2024",
  "Chứng Nhận Green Restaurant 2024",
  "Đề Cử Michelin Guide Selected 2025",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Trang chủ", url: "/" },
          { name: "Giới thiệu", url: "/about" },
        ])}
      />
      <PageHeader
        eyebrow="Về Chúng Tôi"
        title="Câu Chuyện Lotus & Earth"
        description="Hành trình từ tình yêu ẩm thực thực vật đến một thương hiệu fine dining."
        image="/images/hero/about-story.jpg"
      />

      <section className="section-padding bg-surface">
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionTitle
              align="left"
              eyebrow="Câu Chuyện"
              title="Bắt Đầu Từ Một Niềm Tin Giản Dị"
              description="Chúng tôi tin rằng ẩm thực thực vật xứng đáng có một vị trí ngang hàng với những nhà hàng fine dining danh tiếng nhất. Từ căn bếp nhỏ với vài công thức gia truyền, Lotus & Earth đã phát triển thành một không gian nơi nghệ thuật ẩm thực và triết lý sống hòa quyện."
            />
          </div>
          <ImageReveal
            src="/images/hero/about-vision.jpg"
            alt="Câu chuyện thương hiệu"
            className="h-[420px] w-full rounded-lg lg:h-[480px]"
            sizes="(max-width: 1023px) calc(100vw - 40px), 50vw"
          />
        </Container>
      </section>

      <section className="section-padding bg-bg-primary">
        <Container className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface-raised p-10">
            <h3 className="font-heading text-2xl text-gold">Tầm Nhìn</h3>
            <p className="mt-4 text-sm leading-relaxed text-text/60">
              Trở thành thương hiệu fine dining chay tiêu biểu của Việt Nam,
              được công nhận trên bản đồ ẩm thực quốc tế, tiên phong định
              nghĩa lại sự sang trọng qua lăng kính bền vững.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface-raised p-10">
            <h3 className="font-heading text-2xl text-gold">Sứ Mệnh</h3>
            <p className="mt-4 text-sm leading-relaxed text-text/60">
              Mang đến trải nghiệm ẩm thực thực vật tinh tế, tôn vinh nguyên
              liệu hữu cơ địa phương và lan tỏa lối sống cân bằng, chánh niệm
              đến từng thực khách.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-surface">
        <Container>
          <SectionTitle eyebrow="Giá Trị Cốt Lõi" title="Core Values" className="mb-14" />
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {CORE_VALUES.map((v) => (
              <div key={v.title} className="text-center">
                <h4 className="font-heading text-xl text-text">{v.title}</h4>
                <p className="mt-2 text-sm text-text/60">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-bg-dark text-white">
        <Container>
          <SectionTitle eyebrow="Hành Trình" title="Timeline" light className="mb-14" />
          <div className="mx-auto max-w-2xl">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="flex gap-6 border-l border-gold/30 pb-10 pl-6 last:pb-0">
                <div className="relative -ml-[31px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-semibold text-bg-dark">
                  {i + 1}
                </div>
                <div>
                  <p className="font-heading text-lg text-gold">{t.year}</p>
                  <p className="mt-1 text-sm text-white/60">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-surface">
        <Container>
          <SectionTitle
            eyebrow="Đội Ngũ"
            title="Những Người Đứng Sau Hương Vị"
            className="mb-14"
          />
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {chefs.map((chef) => (
              <div key={chef.id} className="text-center">
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src={chef.avatar}
                    alt={chef.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <h4 className="mt-4 font-heading text-lg text-text">{chef.name}</h4>
                <p className="text-xs uppercase tracking-wider text-gold">{chef.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-bg-primary">
        <Container>
          <SectionTitle eyebrow="Ghi Nhận" title="Giải Thưởng" className="mb-14" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {AWARDS.map((award) => (
              <div
                key={award}
                className="flex items-center gap-4 rounded-lg border border-border bg-surface-raised p-6"
              >
                <span className="font-heading text-2xl text-gold">★</span>
                <p className="text-sm text-text/70">{award}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
