"use client";

import { motion } from "framer-motion";
import styles from "./dining-experience.module.css";

const EXPERIENCES = [
  {
    number: "01",
    title: "Chef’s Table",
    description: "Trải nghiệm omakase độc quyền cùng đầu bếp trưởng.",
  },
  {
    number: "02",
    title: "Private Room",
    description: "Không gian riêng tư thiền tịnh cho dịp đặc biệt.",
  },
  {
    number: "03",
    title: "Garden Terrace",
    description: "Bàn ngoài trời giữa khu vườn Nhật xanh mát.",
  },
] as const;

function LotusMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 72 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M36 45C28.5 37 25.5 27 28 14c6.8 5 9.6 15 8 31Z" />
      <path d="M36 45c7.5-8 10.5-18 8-31-6.8 5-9.6 15-8 31Z" />
      <path d="M35.8 44C25.5 43 17 36.5 12.5 26c10.5.2 18 6.2 23.3 18Z" />
      <path d="M36.2 44C46.5 43 55 36.5 59.5 26c-10.5.2-18 6.2-23.3 18Z" />
      <path d="M36 45C22 48.5 10 44.5 3.5 36c12-3.4 22.5-.6 32.5 9Z" />
      <path d="M36 45c14 3.5 26 0 32.5-9-12-3.4-22.5-.6-32.5 9Z" />
      <path d="M36 45V6.5c-6.5 5.8-9.3 14.2-7.2 23.2M36 6.5c6.5 5.8 9.3 14.2 7.2 23.2" />
    </svg>
  );
}

function OrnamentalRule({ compact = false }: { compact?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={compact ? styles.ruleCompact : styles.rule}
    >
      <span />
      <i />
      <span />
    </span>
  );
}

export function DiningExperience() {
  return (
    <section
      id="dining-experience"
      className={styles.section}
      aria-labelledby="dining-experience-title"
    >
      <div aria-hidden="true" className={styles.background} />
      <div aria-hidden="true" className={styles.texture} />

      <div className={styles.content}>
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <LotusMark className={styles.headerLotus} />

          <div className={styles.eyebrow}>
            <span />
            <i />
            <p>Trải Nghiệm Dùng Bữa</p>
            <i />
            <span />
          </div>

          <p className={styles.subtitle}>Mỗi Bữa Ăn Là Một Nghi Thức</p>

          <h2 id="dining-experience-title" className={styles.title}>
            Dining Experience
          </h2>

          <OrnamentalRule />

          <p className={styles.brand}>Lotus &amp; Earth</p>
        </motion.header>

        <div className={styles.experiences}>
          {EXPERIENCES.map((experience, index) => (
            <motion.article
              key={experience.number}
              className={styles.experience}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.72,
                delay: 0.12 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className={styles.number}>{experience.number}</p>
              <OrnamentalRule compact />
              <h3>{experience.title}</h3>
              <span aria-hidden="true" className={styles.shortLine} />
              <p className={styles.description}>{experience.description}</p>
              <LotusMark className={styles.cardLotus} />
            </motion.article>
          ))}
        </div>

        <span aria-hidden="true" className={styles.bottomLine} />
      </div>
    </section>
  );
}
