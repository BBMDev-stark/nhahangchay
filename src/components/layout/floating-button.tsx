"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";

export function FloatingButton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href="/reservation"
        className="text-button flex items-center gap-2 rounded-full border border-gold/50 bg-gold px-5 py-3.5 text-bg-dark shadow-lg shadow-black/30 transition hover:bg-white"
      >
        <CalendarCheck size={16} />
        <span className="hidden sm:inline">Đặt Bàn</span>
      </Link>
    </motion.div>
  );
}
