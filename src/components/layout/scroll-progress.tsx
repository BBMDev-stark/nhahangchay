"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed top-0 left-0 z-90 h-[2px] w-full bg-transparent">
      <motion.div
        className="h-full origin-left bg-gold"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
