"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { DISH_ORDER, getDishDetail } from "@/lib/dish-menu-data";
import { DishOverlay } from "./DishOverlay";
import { IngredientCallout } from "./IngredientCallout";
import { DishFeatureList } from "./DishFeatureList";
import { NutritionPanel } from "./NutritionPanel";

const easeLuxury = [0.22, 1, 0.36, 1] as const;

type DishDetailModalProps = {
  /** id của món đang mở — phải khớp với layoutId đang dùng ở Hero để animate liền mạch */
  dishId: string;
  isOpen: boolean;
  onClose: () => void;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeLuxury },
  },
};

const listContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeLuxury } },
};

const calloutVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeLuxury } },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeLuxury } },
};

export function DishDetailModal({ dishId, isOpen, onClose }: DishDetailModalProps) {
  const [activeId, setActiveId] = useState(dishId);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Đồng bộ món đang xem trong modal với món vừa được click ở Hero mỗi lần mở lại
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- đồng bộ activeId với prop dishId mỗi khi modal mở lại với món khác
    if (isOpen) setActiveId(dishId);
  }, [isOpen, dishId]);

  // Khoá scroll nền + khôi phục khi đóng
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const prevOverflow = style.overflow;
    const prevPosition = style.position;
    const prevTop = style.top;
    const prevWidth = style.width;

    style.overflow = "hidden";
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.width = "100%";

    return () => {
      style.overflow = prevOverflow;
      style.position = prevPosition;
      style.top = prevTop;
      style.width = prevWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Focus trap: chỉ chạy khi isOpen đổi, KHÔNG phụ thuộc onClose.
  // (Nếu onClose là arrow function tạo mới mỗi lần cha re-render, effect cũ sẽ
  // liên tục bị huỷ + chạy lại, và cleanup gọi previouslyFocused.current?.focus?.()
  // sẽ giật focus khỏi nút X đúng lúc người dùng bấm.)
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    return () => {
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen]);

  // Luôn giữ bản onClose mới nhất trong ref để effect ESC không phải add/remove
  // listener mỗi khi onClose đổi tham chiếu.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // ESC để đóng modal
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Modal phải render qua portal thẳng vào <body> — tránh bị kẹt trong
  // <section overflow-hidden> của Hero và tránh xung đột z-index với các
  // layer fixed khác ở gốc trang (LoadingScreen dùng z-200 > z-[100] của modal
  // trước đây, khiến layer đó có thể chặn click dù modal đang mở đúng logic).
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- document/portal target chỉ tồn tại phía client, cần cờ mount-safe kinh điển cho createPortal
    setIsMounted(true);
  }, []);

  const dish = getDishDetail(activeId);
  const currentIndex = DISH_ORDER.indexOf(activeId as (typeof DISH_ORDER)[number]);
  // layoutId chỉ dùng chung với Hero khi đang xem đúng món vừa mở modal —
  // các món khác duyệt tiếp bằng mũi tên sẽ tự crossfade, tránh tranh chấp layout với Hero.
  const sharesHeroLayout = activeId === dishId;

  function goTo(offset: number) {
    const nextIndex =
      (currentIndex + offset + DISH_ORDER.length) % DISH_ORDER.length;
    setActiveId(DISH_ORDER[nextIndex]);
  }

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Chi tiết món ${dish.titleLines.join(" ")}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[300] flex items-center justify-center"
        >
          <DishOverlay onClose={onClose} />

          {/* nội dung modal — pointer-events-none ở khung ngoài để không có gì
              "che" mất các nút bấm; từng phần tử tương tác bên trong tự bật lại
              pointer-events-auto cho chính nó. */}
          <motion.div
            key={activeId}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="pointer-events-none relative z-10 flex h-full w-full max-w-[1600px] flex-col items-center overflow-y-auto px-6 py-24 sm:px-10 lg:overflow-visible lg:px-16 lg:py-20"
          >
            <div className="pointer-events-auto grid w-full flex-1 grid-cols-1 items-center gap-14 lg:grid-cols-[30%_38%_30%] lg:gap-10">
              {/* LEFT — thông tin món ăn */}
              <motion.div variants={fadeUpVariants} className="order-2 lg:order-1">
                <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-gold/80 uppercase">
                  <span className="inline-block h-px w-6 bg-gold/60" />
                  {dish.category}
                </p>

                <h2 className="mt-5 font-heading text-[42px] leading-[1.05] text-gold sm:text-[54px] lg:text-[58px]">
                  {dish.titleLines[0]}
                  <br />
                  {dish.titleLines[1]}
                </h2>

                <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">
                  {dish.description}
                </p>

                <DishFeatureList
                  items={dish.checklist}
                  variants={listContainerVariants}
                  itemVariants={listItemVariants}
                />
              </motion.div>

              {/* CENTER — đĩa lớn + callout nguyên liệu */}
              <motion.div
                variants={fadeUpVariants}
                className="relative order-1 mx-auto aspect-square w-full max-w-[300px] sm:max-w-[380px] lg:order-2 lg:max-w-[440px]"
              >
                {/* vòng tròn vàng mảnh, trang trí */}
                <svg
                  viewBox="0 0 520 520"
                  className="pointer-events-none absolute inset-0 h-full w-full text-gold/25"
                  aria-hidden="true"
                >
                  <circle cx="260" cy="260" r="248" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle
                    cx="260"
                    cy="260"
                    r="190"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="2 8"
                  />
                </svg>

                {/* particle sáng nhẹ, luxury, không lạm dụng */}
                <motion.span
                  className="pointer-events-none absolute top-[8%] right-[14%] size-1.5 rounded-full bg-gold/70"
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.span
                  className="pointer-events-none absolute bottom-[14%] left-[10%] size-1 rounded-full bg-gold/60"
                  animate={{ opacity: [0.15, 0.6, 0.15] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                />

                {/* đĩa lớn — layoutId khớp với Hero khi là món vừa mở */}
                <motion.div
                  layoutId={sharesHeroLayout ? activeId : undefined}
                  layout
                  initial={!sharesHeroLayout ? { opacity: 0, scale: 0.9 } : undefined}
                  animate={!sharesHeroLayout ? { opacity: 1, scale: 1 } : undefined}
                  transition={{
                    layout: { type: "spring", stiffness: 140, damping: 20, mass: 1 },
                    opacity: { duration: 0.5, ease: easeLuxury },
                    scale: { duration: 0.5, ease: easeLuxury },
                  }}
                  className="absolute top-1/2 left-1/2 aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 overflow-visible drop-shadow-[0_45px_60px_rgba(0,0,0,0.5)]"
                >
                  <Image
                    src={dish.src}
                    alt={dish.alt}
                    fill
                    sizes="(min-width: 1024px) 440px, (min-width: 640px) 380px, 300px"
                    className="object-contain"
                  />
                </motion.div>

                {/* callout nguyên liệu quanh đĩa — desktop only */}
                {dish.ingredients.map((ingredient) => (
                  <IngredientCallout
                    key={ingredient.title}
                    data={ingredient}
                    variants={calloutVariants}
                  />
                ))}
              </motion.div>

              {/* RIGHT — ingredient cards */}
              <motion.div
                variants={listContainerVariants}
                className="order-3 flex max-w-sm flex-col gap-7 lg:mx-0 lg:ml-auto"
              >
                {dish.rightCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={card.title}
                      variants={cardItemVariants}
                      className="flex items-start gap-4"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                        <Icon size={16} strokeWidth={1.5} />
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold tracking-[0.15em] text-white/90 uppercase">
                          {card.title}
                        </p>
                        <p className="mt-1 text-[12px] leading-relaxed text-white/50">
                          {card.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* BOTTOM — floating nutrition panel */}
            <div className="pointer-events-auto">
              <NutritionPanel
                nutrition={dish.nutrition}
                tags={dish.tags}
                variants={fadeUpVariants}
                itemVariants={cardItemVariants}
              />
            </div>
          </motion.div>

          {/* nút đóng — render SAU CÙNG trong DOM + z cao nhất, luôn nhận click */}
          <motion.button
            ref={closeButtonRef}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            aria-label="Đóng"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: easeLuxury, delay: 0.2 }}
            className="group pointer-events-auto absolute top-6 right-6 z-[301] flex size-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:border-white/60 hover:bg-white/20 sm:top-9 sm:right-9"
          >
            <X
              size={18}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:scale-90 group-hover:rotate-90"
            />
          </motion.button>

          {/* mũi tên điều hướng món trước/sau */}
          <motion.button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goTo(-1);
            }}
            aria-label="Món trước"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeLuxury, delay: 0.25 }}
            className="pointer-events-auto absolute top-1/2 left-4 z-[301] hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:border-white/50 hover:bg-white/20 sm:flex lg:left-8"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </motion.button>
          <motion.button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goTo(1);
            }}
            aria-label="Món tiếp theo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeLuxury, delay: 0.25 }}
            className="pointer-events-auto absolute top-1/2 right-4 z-[301] hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:border-white/50 hover:bg-white/20 sm:flex lg:right-8"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
