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
        src="/images/brand-book/story-stage-v2.png"
        alt=""
        fill
        sizes="100vw"
        className={styles.background}
      />
      <div className={styles.backgroundVeil} aria-hidden="true" />
      <div className={styles.texture} aria-hidden="true" />

      <Container className={styles.layout}>
        <div className={styles.bookColumn}>
          <span className={styles.pedestalLabel} aria-hidden="true">
            LOTUS &amp; EARTH
          </span>
          <InteractiveBrandBook onReadingChange={setIsBookOpen} />
        </div>

        <div className={styles.copy}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine}>
              <i />
            </span>
            <span>Câu chuyện thương hiệu</span>
            <span className={styles.eyebrowLine}>
              <i />
            </span>
          </div>

          <OrnamentalRule compact />

          <h2 className={styles.heading}>
            <span>Ẩm Thực Là</span>
            <span>Một Hành Trình</span>
            <em>Trở Về Với Thiên Nhiên</em>
          </h2>

          <OrnamentalRule />

          <p className={styles.description}>
            Lotus &amp; Earth ra đời từ niềm tin rằng ẩm thực chay có thể vừa
            tinh tế, vừa sang trọng. Chúng tôi chọn lọc từng nguyên liệu hữu cơ
            theo mùa, kết hợp kỹ thuật fine dining hiện đại và tinh thần thiền
            tịnh phương Đông để mang đến trải nghiệm trọn vẹn cho mọi giác quan.
          </p>

          <Link href="/about" className={styles.cta}>
            <span>Tìm Hiểu Thêm</span>
            <span aria-hidden="true" className={styles.ctaArrow}>
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
