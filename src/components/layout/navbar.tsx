"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingBag, ArrowRight } from "lucide-react";
import { mainNav } from "@/config/nav.config";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset menu state when route changes
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-80 w-full border-b border-green-primary/10 transition-all duration-500",
        scrolled || mobileOpen
          ? "bg-bg-primary/95 backdrop-blur-xl shadow-[0_1px_0_0_var(--color-border)]"
          : "bg-[#fbf8f1]/92 backdrop-blur-md"
      )}
    >
      <Container className="max-w-[1500px] px-5 md:px-8 lg:px-10">
        <nav className="grid h-[96px] grid-cols-[auto_1fr_auto] items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex min-w-[150px] items-center" aria-label="Hương Sen — Trang chủ">
            <Image
              src={siteConfig.logoImage}
              alt="Nhà hàng chay Hương Sen"
              width={150}
              height={82}
              priority
              className="h-[74px] w-[132px] object-contain drop-shadow-[0_3px_7px_rgba(23,61,41,0.08)]"
            />
          </Link>

          {/* Center nav */}
          <ul className="hidden items-center justify-center gap-8 xl:flex xl:gap-10">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative whitespace-nowrap text-[15px] font-medium tracking-[0.005em] transition-colors hover:text-green-primary",
                    pathname === item.href ? "text-green-primary" : "text-text/80"
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute -bottom-3 left-1/2 h-px w-7 -translate-x-1/2 bg-green-primary" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right icons + CTA */}
          <div className="hidden items-center justify-end gap-3 xl:flex">
            <button
              aria-label="Tìm kiếm"
                className="flex size-11 items-center justify-center rounded-full border border-green-primary/15 bg-white/35 text-text/70 transition-all hover:border-gold hover:bg-white/70 hover:text-gold"
            >
              <Search size={17} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Giỏ hàng"
                className="relative flex size-11 items-center justify-center rounded-full border border-green-primary/15 bg-white/35 text-text/70 transition-all hover:border-gold hover:bg-white/70 hover:text-gold"
            >
              <ShoppingBag size={17} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-burgundy text-[10px] font-semibold text-white">
                2
              </span>
            </button>
            <Link
              href="/reservation"
              className="ml-1 flex h-[46px] items-center gap-3 whitespace-nowrap rounded-full border border-green-primary/40 bg-green-primary px-7 text-xs font-semibold tracking-[0.11em] text-white uppercase backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#214f35] hover:shadow-[0_14px_32px_rgba(50,117,74,0.18)]"
            >
              Đặt Bàn Ngay
              <ArrowRight size={14} />
            </Link>
          </div>

          <button
            className="justify-self-end text-text xl:hidden"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border xl:hidden"
          >
            <Container className="flex flex-col gap-5 py-8">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-h3 font-heading text-text"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/reservation"
                className="mt-2 flex items-center justify-center gap-2 rounded-full border border-green-primary/40 bg-green-primary px-6 py-4 text-xs font-semibold tracking-wider text-white uppercase"
              >
                Đặt Bàn Ngay
                <ArrowRight size={14} />
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
