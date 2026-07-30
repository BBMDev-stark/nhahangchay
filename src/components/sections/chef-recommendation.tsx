import Image from "next/image";
import { chefs } from "@/features/team/data/chefs";
import { dishes } from "@/features/menu/data/dishes";
import { chefRecommendation } from "@/features/menu/data/chef-recommendation";
import { formatVND } from "@/lib/utils";
import styles from "./chef-recommendation.module.css";

function LotusOrnament({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 64 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M32 39C25 33 21 25 22 15c7 3 11 9 10 24Z" />
      <path d="M32 39c7-6 11-14 10-24-7 3-11 9-10 24Z" />
      <path d="M31.8 38C23 37 15 31 11 22c9 0 16 5 20.8 16Z" />
      <path d="M32.2 38C41 37 49 31 53 22c-9 0-16 5-20.8 16Z" />
      <path d="M32 39C20 42 10 39 4 32c10-3 19-1 28 7Z" />
      <path d="M32 39c12 3 22 0 28-7-10-3-19-1-28 7Z" />
      <path d="M32 39V6c-6 5-8 12-6 20M32 6c6 5 8 12 6 20" />
    </svg>
  );
}

export function ChefRecommendation() {
  const chef = chefs.find((item) => item.id === chefRecommendation.chefId);
  const recommended = dishes.find(
    (item) => item.id === chefRecommendation.dishId,
  );

  if (!chef || !recommended) {
    return null;
  }

  const dishNumber = String(
    Number(recommended.id.replace(/\D/g, "")),
  ).padStart(2, "0");

  return (
    <section
      id="chef-recommendation"
      className={styles.section}
      aria-labelledby="chef-recommendation-title"
    >
      <div
        aria-hidden="true"
        className={styles.backdrop}
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(4, 5, 4, 0.05), rgba(4, 5, 4, 0.2)), url("${chefRecommendation.backgroundImage}")`,
        }}
      />
      <div aria-hidden="true" className={styles.ambientGlow} />

      <div className={styles.shell}>
        <div className={styles.copy}>
          <div className={styles.eyebrow}>
            <LotusOrnament className={styles.eyebrowLotus} />
            <span>{chefRecommendation.eyebrow}</span>
            <span className={styles.eyebrowRule} />
          </div>

          <h2 id="chef-recommendation-title" className={styles.title}>
            {recommended.name}
          </h2>

          <p className={styles.description}>{recommended.description}</p>

          <div className={styles.chef}>
            <div className={styles.chefPortrait}>
              <Image
                src={chefRecommendation.chefImage}
                alt={`Chân dung ${chef.name}`}
                fill
                sizes="88px"
                className={styles.chefPortraitImage}
              />
            </div>
            <div className={styles.chefIdentity}>
              <p className={styles.chefName}>{chef.name}</p>
              <p className={styles.chefRole}>{chef.role}</p>
            </div>
          </div>

          <div className={styles.priceRow}>
            <p className={styles.price}>{formatVND(recommended.price)}</p>
            <span aria-hidden="true" className={styles.priceRule} />
          </div>
        </div>

        <figure className={styles.imageFrame}>
          <div className={styles.imageViewport}>
            <Image
              src={chefRecommendation.dishImage}
              alt={recommended.name}
              fill
              priority={false}
              sizes="(max-width: 900px) 92vw, 57vw"
              className={styles.dishImage}
            />
            <div aria-hidden="true" className={styles.imageShade} />
            <figcaption className={styles.dishLabel}>
              <LotusOrnament className={styles.dishLotus} />
              <span className={styles.dishCode}>DISH {dishNumber}</span>
              <span className={styles.dishRule} />
              <span className={styles.brand}>LOTUS &amp; EARTH</span>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
