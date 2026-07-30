import { SectionTitle } from "@/components/shared/section-title";
import { Container } from "@/components/shared/container";
import { MenuCard } from "@/features/menu/components/menu-card";
import { dishes } from "@/features/menu/data/dishes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SeasonalMenu() {
  const seasonal = dishes.filter((d) => d.tags.includes("new")).slice(0, 3);

  return (
    <section className="section-padding bg-bg-primary">
      <Container>
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            align="left"
            eyebrow="Thực Đơn Theo Mùa"
            title="Seasonal Selection"
            description="Cập nhật liên tục theo mùa vụ nguyên liệu, mang đến trải nghiệm luôn mới mẻ."
          />
          <Link href="/menu">
            <Button variant="ghost" className="text-gold">
              Xem Toàn Bộ Thực Đơn →
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {seasonal.map((dish) => (
            <MenuCard key={dish.id} dish={dish} />
          ))}
        </div>
      </Container>
    </section>
  );
}
