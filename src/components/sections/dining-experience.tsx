"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { SectionTitle } from "@/components/shared/section-title";

const EXPERIENCES = [
  { title: "Chef's Table", desc: "Trải nghiệm omakase độc quyền cùng đầu bếp trưởng." },
  { title: "Private Room", desc: "Không gian riêng tư thiền tịnh cho dịp đặc biệt." },
  { title: "Garden Terrace", desc: "Bàn ngoài trời giữa khu vườn Nhật xanh mát." },
];

export function DiningExperience() {
  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden bg-bg-dark">
      <motion.div
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero/dining-experience.jpg"
          alt="Trải nghiệm dùng bữa tại Lotus & Earth"
          fill
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-bg-dark/50" />
      </motion.div>

      <Container className="relative z-10 flex h-full flex-col justify-center">
        <SectionTitle
          align="left"
          eyebrow="Trải Nghiệm Dùng Bữa"
          title="Mỗi Bữa Ăn Là Một Nghi Thức"
          light
          className="mb-14 max-w-xl"
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="border-l border-gold/40 pl-6"
            >
              <h3 className="font-heading text-xl text-white">{exp.title}</h3>
              <p className="mt-2 text-sm text-white/60">{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
