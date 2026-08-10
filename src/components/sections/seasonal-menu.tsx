import { Container } from "@/components/shared/container";
import { MenuCard } from "@/features/menu/components/menu-card";
import { dishes } from "@/features/menu/data/dishes";
import Link from "next/link";
import styles from "./seasonal-menu.module.css";

const SEASONAL_IMAGES: Record<string, string> = {
  "banh-xeo-nam-moi": "/images/seasonal/banh-xeo-nam-moi.png",
  "sa-ke-lan-bot-chien": "/images/seasonal/sa-ke-lan-bot-chien.png",
  "bong-bi-xao-nam-moi": "/images/seasonal/bong-bi-xao-nam-moi.png",
};

export function SeasonalMenu() {
  const seasonal = dishes
    .filter((d) => d.tags.includes("new"))
    .slice(0, 3)
    .map((dish) => ({
      ...dish,
      image: SEASONAL_IMAGES[dish.slug] ?? dish.image,
    }));

  return (
    <section className={styles.section} aria-labelledby="seasonal-title">
      <div className={styles.background} aria-hidden="true" />
      <Container className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}><span />Thực Đơn Theo Mùa</p>
            <h2 id="seasonal-title" className={styles.title}>Hương vị theo mùa</h2>
            <p className={styles.subtitle}>Seasonal Selection</p>
            <p className={styles.intro}>Những lựa chọn được Hương Sen tuyển chọn theo nguồn nguyên liệu tươi ngon của từng thời điểm.</p>
          </div>
          <Link href="/menu" className={styles.menuLink}>
            <span>Xem Toàn Bộ Thực Đơn</span><b aria-hidden="true">⟶</b>
          </Link>
        </div>
        <div className={styles.grid}>
          {seasonal.map((dish, index) => (
            <MenuCard key={dish.id} dish={dish} variant="seasonal" emphasized={index === 1} />
          ))}
        </div>
        <div className={styles.bottomOrnament} aria-hidden="true"><span>✦</span></div>
      </Container>
    </section>
  );
}
