import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { promotions } from "@/features/promotions/data/promotions";
import { formatDate } from "@/lib/utils";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ưu Đãi",
  description: "Các chương trình buffet, combo và voucher ưu đãi hiện có tại Lotus & Earth.",
  alternates: { canonical: "/promotions" },
};

const TYPE_LABELS: Record<string, string> = {
  buffet: "Buffet",
  combo: "Combo",
  voucher: "Voucher",
};

export default function PromotionsPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Trang chủ", url: "/" },
          { name: "Ưu đãi", url: "/promotions" },
        ])}
      />
      <PageHeader
        eyebrow="Ưu Đãi"
        title="Promotions"
        description="Những chương trình đặc biệt dành riêng cho thực khách của Lotus & Earth."
        image="/images/hero/promotions-header.jpg"
      />
      <section className="section-padding bg-surface">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface-raised transition-colors duration-500 hover:border-gold/45"
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                    {TYPE_LABELS[promo.type]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="font-heading text-xl text-text">{promo.title}</h3>
                  <p className="text-sm leading-relaxed text-text/60">{promo.description}</p>
                  {promo.discount && (
                    <p className="font-heading text-lg text-gold">{promo.discount}</p>
                  )}
                  <p className="text-xs text-text/40">
                    Áp dụng đến {formatDate(promo.validUntil)}
                  </p>
                  <Link href="/reservation" className="mt-auto">
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      Đặt Bàn Ngay
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
