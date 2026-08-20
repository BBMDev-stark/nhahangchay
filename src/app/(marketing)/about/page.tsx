import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Giới Thiệu",
  description:
    "Câu chuyện, triết lý và đội ngũ đứng sau nhà hàng chay cao cấp Hương Sen.",
  alternates: { canonical: "/about" },
};

const CORE_VALUES = [
  {
    title: "Rau Tươi Sạch",
    desc: "Nguyên liệu rau tươi sạch được tuyển chọn mỗi ngày.",
  },
  { title: "Tinh Tế", desc: "Từng chi tiết được chăm chút như một tác phẩm nghệ thuật." },
  { title: "Bền Vững", desc: "Cam kết giảm thiểu tác động môi trường trong vận hành." },
  { title: "Chân Thực", desc: "Tôn trọng hương vị nguyên bản của thực vật." },
];

const TIMELINE = [
  {
    year: "2005",
    title: "Khởi Nguồn Từ Một Quán Nhỏ",
    event:
      "Hương Sen ra đời từ một quán chay nhỏ trên đường Hồ Văn Huê, mang theo mong muốn phục vụ những món chay tươi lành và lan tỏa giá trị thiện lành đến cộng đồng.",
  },
  {
    year: "Những Năm Đầu",
    title: "Người Giữ Lửa Hương Sen",
    event:
      "Từ niềm yêu thích ẩm thực chay, Nguyễn Dương Bích Hương tự học, kiên trì thử nghiệm và đảm nhận vai trò bếp trưởng, từng bước xây dựng thực đơn hơn 200 món chay cho nhà hàng.",
  },
  {
    year: "2010",
    title: "Tiên Phong Buffet Ngày Chay",
    event:
      "Hương Sen phát triển thành mô hình nhà hàng phục vụ món gọi và buffet vào ngày chay mùng 1, ngày 15 âm lịch, trở thành một trong những địa chỉ tiên phong được thực khách yêu mến.",
  },
  {
    year: "2011–2024",
    title: "Bền Bỉ Đồng Hành Cùng Thực Khách",
    event:
      "Hương Sen không ngừng học hỏi, sáng tạo món chay tươi ngon, thanh đạm và đủ đầy dinh dưỡng; lấy sự an tâm, hài lòng của thực khách làm động lực phát triển.",
  },
  {
    year: "Cuối 2025",
    title: "Ngôi Nhà Mới Tại Nguyễn Kiệm",
    event:
      "Nhà hàng chuyển về 778/2 Nguyễn Kiệm, Phường Đức Nhuận, TP. Hồ Chí Minh, mở ra không gian mới để tiếp tục gìn giữ và lan tỏa tinh hoa ẩm thực chay Việt.",
  },
  {
    year: "Hôm Nay",
    title: "Tiếp Nối Hơn Hai Thập Kỷ",
    event:
      "Hương Sen tiếp tục đồng hành cùng lối sống xanh, sạch và an lành, chăm chút từng món ăn bằng sự chân thành và lòng trân trọng dành cho cộng đồng.",
  },
];

function LotusMark({ className = "h-12 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 50" aria-hidden="true" className={`${className} fill-none stroke-current stroke-[1.6]`}>
      <path d="M36 45C24 40 17 30 18 18c8 2 15 7 18 14 3-7 10-12 18-14 1 12-6 22-18 27Z" />
      <path d="M36 44C29 34 29 21 36 8c7 13 7 26 0 36Z" />
      <path d="M35 45C21 46 10 40 4 29c9-2 18 0 25 6M37 45c14 1 25-5 31-16-9-2-18 0-25 6" />
    </svg>
  );
}

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
        title="Câu Chuyện Hương Sen"
        description="Hành trình từ tình yêu ẩm thực thực vật đến một thương hiệu fine dining."
        image="/images/spaces/huong-sen-space-10.png"
      />

      <section className="relative isolate overflow-hidden bg-[#fbf7ef]">
        <Image
          src="/images/about-huong-sen/story-background.png"
          alt=""
          fill
          loading="eager"
          aria-hidden="true"
          className="pointer-events-none -z-10 object-fill max-md:object-cover"
          sizes="100vw"
        />

        <Container className="relative grid min-h-[760px] grid-cols-1 items-center gap-10 pb-36 pt-16 md:pb-44 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14 lg:pb-40 lg:pt-20 xl:gap-20">
          <div className="mx-auto w-full max-w-[620px] lg:mx-0">
            <div className="mb-8 flex flex-col items-center gap-4 text-[#bb9351]">
              <svg
                viewBox="0 0 72 50"
                aria-hidden="true"
                className="h-11 w-16 fill-none stroke-current stroke-[1.6]"
              >
                <path d="M36 45C24 40 17 30 18 18c8 2 15 7 18 14 3-7 10-12 18-14 1 12-6 22-18 27Z" />
                <path d="M36 44C29 34 29 21 36 8c7 13 7 26 0 36Z" />
                <path d="M35 45C21 46 10 40 4 29c9-2 18 0 25 6M37 45c14 1 25-5 31-16-9-2-18 0-25 6" />
              </svg>
              <div className="flex w-full max-w-[310px] items-center gap-5">
                <span className="h-px flex-1 bg-[#c8a565]" />
                <span className="text-sm font-semibold uppercase tracking-[0.24em]">
                  Câu chuyện
                </span>
                <span className="h-px flex-1 bg-[#c8a565]" />
              </div>
            </div>

            <h2 className="font-heading text-[clamp(2.75rem,4.25vw,4.75rem)] leading-[1.04] tracking-[-0.035em] text-[#173e2e]">
              Bắt Đầu Từ
              <br />
              Một Niềm Tin Giản Dị
            </h2>

            <div className="my-7 flex max-w-[330px] items-center gap-4 text-[#c39a55]">
              <span className="h-px flex-1 bg-[#d2b477]" />
              <svg
                viewBox="0 0 50 30"
                aria-hidden="true"
                className="h-8 w-12 fill-none stroke-current stroke-[1.5]"
              >
                <path d="M25 27c-8-4-12-10-11-18 5 1 9 4 11 9 2-5 6-8 11-9 1 8-3 14-11 18Z" />
                <path d="M25 26c-5-7-5-15 0-23 5 8 5 16 0 23Z" />
                <path d="M24 27c-9 1-16-3-20-10 6-1 12 1 16 5m6 5c9 1 16-3 20-10-6-1-12 1-16 5" />
              </svg>
              <span className="h-px flex-1 bg-[#d2b477]" />
            </div>

            <p className="max-w-[590px] text-base leading-[1.75] text-[#4f554f] md:text-[17px]">
              Chúng tôi tin rằng ẩm thực chay không chỉ là lựa chọn lành mạnh,
              mà còn là sự khởi đầu của những điều an yên. Tại HƯƠNG SEN, mỗi
              món ăn được chế biến từ nguyên liệu thuần lành, kết hợp với sự
              tinh tế và lòng trân trọng thiên nhiên, để mang đến một không
              gian thanh tịnh, nơi bạn tìm thấy sự cân bằng và nuôi dưỡng thân
              – tâm – trí.
            </p>

            <div className="mt-7 flex max-w-[330px] items-center gap-4 text-[#c39a55]">
              <span className="h-px flex-1 bg-[#d2b477]" />
              <svg
                viewBox="0 0 50 30"
                aria-hidden="true"
                className="h-8 w-12 fill-none stroke-current stroke-[1.5]"
              >
                <path d="M25 27c-8-4-12-10-11-18 5 1 9 4 11 9 2-5 6-8 11-9 1 8-3 14-11 18Z" />
                <path d="M25 26c-5-7-5-15 0-23 5 8 5 16 0 23Z" />
                <path d="M24 27c-9 1-16-3-20-10 6-1 12 1 16 5m6 5c9 1 16-3 20-10-6-1-12 1-16 5" />
              </svg>
              <span className="h-px flex-1 bg-[#d2b477]" />
            </div>
          </div>

          <div className="relative mx-auto aspect-[1476/1066] w-full max-w-[760px] overflow-hidden rounded-[22px] shadow-[0_22px_42px_rgba(31,54,40,0.14)] lg:mx-0">
            <Image
              src="/images/about-huong-sen/vision-card.png"
              alt="Tầm nhìn Hương Sen"
              width={1476}
              height={1066}
              className="h-full w-full scale-[1.018] object-cover"
              sizes="(max-width: 1023px) calc(100vw - 40px), 54vw"
            />
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-[#f7f2e8]">
        <Image
          src="/images/about-huong-sen/vision-values-background.png"
          alt=""
          fill
          aria-hidden="true"
          className="pointer-events-none -z-10 object-cover object-center"
          sizes="100vw"
        />

        <Container className="grid min-h-[570px] grid-cols-1 items-stretch gap-7 py-12 lg:grid-cols-[1.22fr_0.94fr_0.94fr] lg:gap-6 xl:gap-8">
          <div className="flex min-h-[390px] flex-col items-center justify-center px-5 text-center lg:min-h-0 lg:items-end lg:pr-10 lg:text-right xl:pr-14">
            <div className="max-w-[360px]">
              <div className="flex justify-center text-[#c19b54] lg:justify-end">
                <LotusMark className="h-16 w-20" />
              </div>
              <h2 className="mt-2 font-heading text-[clamp(3rem,4vw,5rem)] italic leading-none tracking-[-0.035em] text-[#194b36]">
                Hương Sen
              </h2>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#b58e49]">
                Nhà hàng chay
              </p>
              <div className="my-7 flex items-center gap-4 text-[#c5a15b]">
                <span className="h-px flex-1 bg-current/65" />
                <LotusMark className="h-6 w-8" />
                <span className="h-px flex-1 bg-current/65" />
              </div>
              <p className="text-[15px] leading-7 text-[#4f554f]">
                Không gian ẩm thực chay tinh tế, nơi mỗi món ăn là sự kết hợp hài hòa giữa nguyên liệu thuần lành và tâm huyết của người đầu bếp.
              </p>
            </div>
          </div>

          {[
            {
              title: "Tầm Nhìn",
              body: "Trở thành thương hiệu fine dining chay tiêu biểu của Việt Nam, được công nhận trên bản đồ ẩm thực quốc tế, tiên phong định nghĩa lại sự sang trọng qua lăng kính bền vững.",
              icon: "lotus",
            },
            {
              title: "Sứ Mệnh",
              body: "Mang đến trải nghiệm ẩm thực thực vật tinh tế, tôn vinh nguyên liệu hữu cơ địa phương và lan tỏa lối sống cân bằng, chánh niệm đến từng thực khách.",
              icon: "leaf",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="relative flex min-h-[430px] flex-col items-center overflow-hidden rounded-[26px] border border-[#9eb396]/65 bg-white/75 px-8 py-9 text-center shadow-[0_16px_42px_rgba(62,82,63,0.08)] backdrop-blur-[2px]"
            >
              <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full border border-[#315b42]/15 bg-[radial-gradient(circle_at_35%_30%,#3f794b,#153f2d_72%)] text-[#d1ad61] shadow-[0_9px_20px_rgba(20,66,45,0.18)]">
                {item.icon === "lotus" ? (
                  <LotusMark className="h-12 w-14" />
                ) : (
                  <svg viewBox="0 0 56 56" aria-hidden="true" className="h-12 w-12 fill-none stroke-current stroke-[1.8]">
                    <path d="M14 42C14 25 24 13 44 8c0 20-10 32-30 34Z" />
                    <path d="M14 42c8-10 16-18 27-26M18 35c-5-6-8-12-8-19 8 2 14 7 17 13" />
                  </svg>
                )}
              </div>
              <h3 className="mt-5 font-heading text-[2rem] leading-none text-[#173f2e]">{item.title}</h3>
              <div className="my-5 flex w-[120px] items-center gap-3 text-[#c09a52]">
                <span className="h-px flex-1 bg-current" />
                <LotusMark className="h-5 w-6" />
                <span className="h-px flex-1 bg-current" />
              </div>
              <p className="max-w-[300px] text-[15px] leading-7 text-[#4e534f]">{item.body}</p>
              <LotusMark className="absolute -bottom-10 h-40 w-48 text-[#cbb474]/20" />
            </article>
          ))}
        </Container>

        <div className="border-t border-white/80 bg-white/35 backdrop-blur-[1px]">
          <Container className="py-11 md:py-14">
            <div className="mb-10 flex flex-col items-center text-center text-[#b9934e]">
              <div className="flex w-full max-w-[590px] items-center gap-5">
                <span className="h-px flex-1 bg-current/55" />
                <LotusMark className="h-10 w-14" />
                <span className="h-px flex-1 bg-current/55" />
              </div>
              <h2 className="mt-3 font-heading text-[clamp(2rem,3vw,3rem)] uppercase tracking-[0.12em] text-[#174531]">
                Giá trị cốt lõi
              </h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.23em] text-[#8f7650]">Core Values</p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {CORE_VALUES.map((value, index) => (
                <article
                  key={value.title}
                  className="flex flex-col items-center px-7 text-center lg:border-r lg:border-[#b8ae98]/35 lg:last:border-r-0"
                >
                  <div className="relative h-24 w-24 shrink-0">
                    <Image
                      src={`/images/about-huong-sen/core-values/core-value-${index + 1}.png`}
                      alt=""
                      fill
                      aria-hidden="true"
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                  <h3 className="mt-3 font-heading text-2xl text-[#174531]">{value.title}</h3>
                  <span className="my-3 h-px w-8 bg-[#c49b50]" />
                  <p className="max-w-[255px] text-sm leading-6 text-[#555a56]">{value.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#062a20] py-16 text-white sm:py-20 lg:min-h-[790px] lg:py-7">
        <Image
          src="/images/about-huong-sen/timeline-background.png"
          alt=""
          fill
          aria-hidden="true"
          className="pointer-events-none -z-20 object-cover object-center"
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_44%,rgba(34,112,77,0.13),transparent_44%)]"
        />

        <Container className="relative">
          <header className="mx-auto flex max-w-[680px] flex-col items-center text-center">
            <LotusMark className="h-9 w-12 text-[#c99c47] drop-shadow-[0_0_9px_rgba(208,161,74,0.34)]" />
            <div className="mt-1 flex w-full max-w-[390px] items-center gap-5 text-[#d1a24b]">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-current" />
              <p className="text-sm font-semibold uppercase tracking-[0.34em] sm:text-base">
                Hành Trình
              </p>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-current" />
            </div>
            <h2 className="mt-3 font-heading text-[clamp(3.2rem,5vw,4.5rem)] leading-none tracking-[-0.025em] text-[#f7efde]">
              Timeline
            </h2>
            <div className="mt-3 flex w-full max-w-[330px] items-center gap-4 text-[#c99c47]">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-current" />
              <LotusMark className="h-5 w-7 drop-shadow-[0_0_8px_rgba(211,165,79,0.7)]" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-current" />
            </div>
            <p className="mt-4 max-w-[610px] text-sm leading-6 text-[#f5f0e7]/72 sm:text-[15px]">
              Từ một quán chay nhỏ năm 2005 đến ngôi nhà mới hôm nay — mỗi chặng đường đều được vun bồi bằng tình yêu món chay và sự đồng hành của thực khách.
            </p>
          </header>

          <div className="relative mx-auto mt-7 max-w-[780px] pl-[58px] sm:mt-8 sm:pl-[76px]">
            <span
              aria-hidden="true"
              className="absolute bottom-5 left-[27px] top-5 w-px bg-gradient-to-b from-[#d9ae58]/20 via-[#e1b65c] to-[#d9ae58]/20 shadow-[0_0_8px_rgba(220,172,77,0.55)] sm:left-[37px]"
            />

            {TIMELINE.map((t, i) => (
              <article key={t.year} className="relative mb-4 last:mb-0">
                <div className="absolute -left-[58px] top-1/2 flex h-[54px] w-[54px] -translate-y-1/2 items-center justify-center rounded-full border border-[#d3a34b] bg-[#0b382a]/90 font-heading text-2xl text-[#d8aa52] shadow-[0_0_0_5px_rgba(210,163,75,0.05),0_0_18px_rgba(217,170,80,0.4)] sm:-left-[66px]">
                  {i + 1}
                </div>

                <div className="relative min-h-[118px] rounded-[14px] border border-[#9f7935]/45 bg-[#0a382b]/55 px-5 py-5 shadow-[inset_0_1px_0_rgba(238,205,133,0.05),0_12px_32px_rgba(0,14,10,0.12)] backdrop-blur-[2px] sm:px-7">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 pr-10">
                    <p className="font-heading text-[1.75rem] leading-none text-[#d2a24a]">{t.year}</p>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ead6aa] sm:text-[13px]">
                      {t.title}
                    </h3>
                  </div>
                  <p className="mt-2 pr-8 text-sm leading-6 text-[#f5f0e7]/88 sm:pr-10 sm:text-[15px]">{t.event}</p>
                  <LotusMark className="absolute right-5 top-1/2 h-8 w-10 -translate-y-1/2 text-[#b88e3f] opacity-80" />
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-[#fbf8f1] py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-70 [background-image:radial-gradient(circle_at_20%_8%,rgba(203,165,94,0.08),transparent_26%),radial-gradient(circle_at_85%_74%,rgba(37,83,58,0.06),transparent_30%)]"
        />

        <Container>
          <header className="mx-auto mb-10 flex max-w-4xl flex-col items-center text-center sm:mb-12">
            <div className="flex w-full max-w-[330px] items-center gap-5 text-[#bd9551]">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-current" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm">Đội ngũ</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-current" />
            </div>
            <h2 className="mt-5 font-heading text-[clamp(2.65rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.035em] text-[#123f2d]">
              Người Đứng Sau Hương Vị
            </h2>
            <div className="mt-5 flex w-full max-w-[260px] items-center gap-4 text-[#bd9551]">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-current" />
              <LotusMark className="h-6 w-9" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-current" />
            </div>
          </header>

          <article className="relative mx-auto grid max-w-[1390px] overflow-hidden rounded-[34px] border border-[#d9c69f] bg-[#fffdf8]/95 shadow-[0_24px_70px_rgba(58,47,25,0.12)] lg:min-h-[610px] lg:grid-cols-[47%_53%]">
            <div className="relative min-h-[520px] overflow-hidden rounded-b-[150px] bg-[#183d2e] sm:min-h-[610px] lg:min-h-full lg:rounded-bl-[32px] lg:rounded-br-[190px] lg:rounded-tr-[190px]">
              <Image
                src="/images/about-huong-sen/chef-nguyen-duong-bich-huong.png"
                alt="Đầu bếp Nguyễn Dương Bích Hương"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 47vw"
                className="object-cover object-[center_38%]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,35,25,0.08),transparent_45%,rgba(22,57,42,0.05))]"
              />
              <div aria-hidden="true" className="absolute inset-0 ring-1 ring-inset ring-[#d7b66b]/55" />
            </div>

            <div className="relative flex flex-col justify-center px-7 py-12 sm:px-12 lg:px-16 lg:py-14 xl:px-20">
              <LotusMark className="h-12 w-16 text-[#bd9551]" />

              <h3 className="mt-5 max-w-[620px] text-balance font-heading text-[clamp(2.55rem,3.75vw,4.35rem)] leading-[1.02] tracking-[-0.03em] text-[#123f2d]">
                <span className="block">Nguyễn Dương</span>
                <span className="block">Bích Hương</span>
              </h3>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#bd9551] sm:text-base">
                Đầu bếp Hương Sen
              </p>

              <div className="my-7 flex w-full max-w-[150px] items-center gap-3 text-[#bd9551]">
                <span className="h-px flex-1 bg-current" />
                <span className="h-1.5 w-1.5 rotate-45 border border-current" />
                <span className="h-px flex-1 bg-gradient-to-r from-current to-transparent" />
              </div>

              <p className="max-w-[610px] text-[15px] leading-7 text-[#4e554f] sm:text-base sm:leading-8">
                Bằng sự chỉn chu trong từng món chay, đầu bếp Nguyễn Dương Bích Hương mang đến Hương Sen tinh thần nấu ăn thanh nhã, tôn trọng nguyên liệu và giữ trọn hương vị tự nhiên.
              </p>

              <blockquote className="mt-7 max-w-[630px] font-heading text-xl italic leading-8 text-[#1e513b] sm:text-[1.45rem] sm:leading-9">
                <span className="mr-2 font-heading text-4xl not-italic leading-none text-[#c6a260]">“</span>
                Mỗi món ăn được chăm chút từ sự chân thành, cân bằng và lòng trân trọng dành cho thực khách.
                <span className="ml-2 font-heading text-4xl not-italic leading-none text-[#c6a260]">”</span>
              </blockquote>

              <div className="mt-8 grid grid-cols-1 border-t border-[#d9cfb9] pt-7 sm:grid-cols-3 sm:divide-x sm:divide-[#ddd3bf]">
                {[
                  ["Thanh vị", "hài hòa"],
                  ["Ẩm thực chay", "tinh tế"],
                  ["Nguyên liệu", "chọn lọc"],
                ].map(([title, subtitle]) => (
                  <div key={title} className="flex items-center gap-3 py-2 sm:px-5 sm:first:pl-0">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c9a867] text-[#b48b41]">
                      <LotusMark className="h-5 w-7" />
                    </span>
                    <span>
                      <strong className="block font-heading text-lg font-medium text-[#174530]">{title}</strong>
                      <span className="text-xs text-[#6d756f]">{subtitle}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <LotusMark className="pointer-events-none absolute bottom-9 right-8 h-48 w-60 text-[#c8ac72] opacity-[0.09]" />
          </article>
        </Container>
      </section>

    </>
  );
}
