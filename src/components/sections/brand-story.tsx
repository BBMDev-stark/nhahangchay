"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/shared/container";
import { InteractiveBrandBook } from "./interactive-brand-book";
import styles from "./brand-story.module.css";

function LotusEmblem({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 64 52"
      fill="none"
    >
      <path
        d="M32 46C21 38 17 27 23 13c8 6 11 15 9 27M32 46c11-8 15-19 9-33-8 6-11 15-9 27M31 46C17 45 8 37 7 24c9 1 17 7 23 17M33 46c14-1 23-9 24-22-9 1-17 7-23 17M31 46C18 51 8 48 2 38c9-3 18-1 28 6M33 46c13 5 23 2 29-8-9-3-18-1-28 6M32 31C25 23 26 12 32 3c6 9 7 20 0 28Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OrnamentalRule({ compact = false }: { compact?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={compact ? styles.ruleCompact : styles.rule}
    >
      <i />
      <LotusEmblem />
      <i />
    </span>
  );
}

export function BrandStory() {
  const [isBookOpen, setIsBookOpen] = useState(false);

  return (
    <section
      id="story"
      className={styles.section}
      data-book-open={isBookOpen ? "true" : "false"}
    >
      <Image
        src="/images/brand-story-huong-sen/story-background.webp"
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className={styles.background}
      />
      <div className={styles.backgroundVeil} aria-hidden="true" />
      <div className={styles.texture} aria-hidden="true" />

      <Container className={styles.layout}>
        <div className={styles.bookColumn}>
          <InteractiveBrandBook onReadingChange={setIsBookOpen} />
        </div>

        <div className={styles.copy}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>Câu chuyện thương hiệu</span>
            <span className={styles.eyebrowLine} />
          </div>

          <OrnamentalRule compact />

          <h2 className={styles.heading}>
            <span>Hương Sen –</span>
            <span>Thanh Vị Từ Tâm</span>
          </h2>

          <p className={styles.tagline}>
            Tinh tế trong hương vị,
            <br />
            an nhiên trong từng trải nghiệm
          </p>

          <OrnamentalRule />

          <p className={styles.description}>
            Hương Sen ra đời với mong muốn mang đến những bữa chay thanh lịch,
            gần gũi và trọn vẹn. Từ nguồn nguyên liệu được tuyển chọn kỹ lưỡng
            đến cách chế biến chỉn chu, mỗi món ăn là sự hòa quyện giữa dinh
            dưỡng, thẩm mỹ và sự an yên trong tâm hồn.
          </p>

          <Link href="/about" className={styles.cta}>
            <LotusEmblem className={styles.ctaLotus} />
            <span>Tìm hiểu thêm</span>
            <span aria-hidden="true" className={styles.ctaArrow}>
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
