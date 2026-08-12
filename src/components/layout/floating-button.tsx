"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";

export function FloatingButton() {
  function handleReservationClick(event: MouseEvent<HTMLAnchorElement>) {
    if (window.location.pathname !== "/") return;

    const reservationSection = document.getElementById("reservation");
    if (!reservationSection) return;

    event.preventDefault();
    window.history.replaceState(null, "", "#reservation");
    reservationSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href="/#reservation"
        onClick={handleReservationClick}
        className="text-button flex items-center gap-2 rounded-full border border-green-primary/40 bg-green-primary px-5 py-3.5 text-white shadow-lg shadow-green-primary/20 transition hover:-translate-y-0.5 hover:bg-[#1f5133]"
      >
        <CalendarCheck size={16} />
        <span className="hidden sm:inline">Đặt Bàn</span>
      </Link>
    </motion.div>
  );
}
