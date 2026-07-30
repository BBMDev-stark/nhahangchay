"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingBag, Leaf, ArrowRight } from "lucide-react";
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
        "fixed top-0 left-0 z-80 w-full transition-all duration-500",
        scrolled || mobileOpen
          ? "bg-bg-dark/90 backdrop-blur-xl shadow-[0_1px_0_0_var(--color-border)]"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex h-[90px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full border border-gold/50 text-gold">
              <Leaf size={16} strokeWidth={1.5} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-heading text-lg tracking-[0.2em] text-gold">
                {siteConfig.shortName.toUpperCase()}
              </span>
              <span className="mt-1 text-[10px] tracking-[0.3em] text-text/50 uppercase">
                {siteConfig.tagline}
              </span>
            </span>
          </Link>

          {/* Center nav */}
          <ul className="hidden items-center gap-9 lg:flex">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium tracking-wide transition-colors hover:text-gold",
                    pathname === item.href ? "text-gold" : "text-text/80"
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right icons + CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              aria-label="Tìm kiếm"
              className="flex size-10 items-center justify-center rounded-full border border-border text-text/70 transition-colors hover:border-gold hover:text-gold"
            >
              <Search size={17} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Giỏ hàng"
              className="relative flex size-10 items-center justify-center rounded-full border border-border text-text/70 transition-colors hover:border-gold hover:text-gold"
            >
              <ShoppingBag size={17} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-burgundy text-[10px] font-semibold text-white">
                2
              </span>
            </button>
            <Link
              href="/reservation"
              className="ml-1 flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-6 py-3 text-xs font-semibold tracking-wider text-gold uppercase backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-bg-dark hover:shadow-[0_14px_32px_rgba(199,166,106,0.18)]"
            >
              Đặt Bàn Ngay
              <ArrowRight size={14} />
            </Link>
          </div>

          <button
            className="text-text lg:hidden"
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
            className="overflow-hidden border-t border-border lg:hidden"
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
                className="mt-2 flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-6 py-4 text-xs font-semibold tracking-wider text-gold uppercase"
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
