"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site.config";

export function LoadingScreen() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  // Trang chủ dùng Restaurant Intro làm trải nghiệm mở đầu — bỏ qua màn loading
  // chung để không bị chồng hai lớp loading lên nhau.
  const skip = pathname === "/";

  useEffect(() => {
    if (skip) return;

    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem("le-loaded") === "true";
    } catch {
      alreadyShown = false;
    }
    if (alreadyShown) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time session gate, runs only on first mount
    setVisible(true);
    const body = document.body;
    const previousOverflow = body.style.overflow;
    let restored = false;

    const restoreScroll = () => {
      if (restored) return;
      restored = true;
      body.style.overflow = previousOverflow;
    };

    body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setVisible(false);
      restoreScroll();
      try {
        sessionStorage.setItem("le-loaded", "true");
      } catch {
        // Storage có thể bị chặn; loading vẫn phải kết thúc bình thường.
      }
    }, 1800);

    return () => {
      clearTimeout(timer);
      restoreScroll();
    };
  }, [skip]);

  if (skip) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-[#070605]"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-h2 font-heading text-[#f3ede2]"
          >
            {siteConfig.shortName.toUpperCase()}
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mt-6 h-px w-24 origin-left bg-[#c7a66a]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
