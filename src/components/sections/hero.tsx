"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Leaf,
  Play,
  Sprout,
  HeartHandshake,
  ChefHat,
} from "lucide-react";
import { DishDetailModal } from "@/components/menu/DishDetailModal";
import { useIntroController } from "@/components/intro/use-intro-controller";

const easeLuxury = [0.22, 1, 0.36, 1] as const;

type Dish = {
  id: string;
  src: string;
  alt: string;
  name: string;
};

// Vị trí & kích thước của 4 "ô" quanh đĩa chính — GIỮ NGUYÊN, không đổi
const cornerSlots = [
  {
    position: "left-[0%] top-[4%]",
    size: "w-[64px] sm:w-[92px] md:w-[120px] lg:w-[150px]",
    delay: 0,
  },
  {
    position: "right-[2%] top-[10%]",
    size: "w-[70px] sm:w-[100px] md:w-[130px] lg:w-[160px]",
    delay: 0.6,
  },
  {
    position: "left-[4%] bottom-[2%]",
    size: "w-[68px] sm:w-[96px] md:w-[124px] lg:w-[150px]",
    delay: 1.2,
  },
  {
    position: "right-[0%] bottom-[8%]",
    size: "w-[64px] sm:w-[90px] md:w-[116px] lg:w-[140px]",
    delay: 1.8,
  },
] as const;

// Món ăn ban đầu ở giữa
const INITIAL_CENTER: Dish = {
  id: "center",
  src: "/images/custom/12.svg",
  alt: "Món chay đặc trưng của Lotus & Earth",
  name: "Món Đặc Trưng",
};

// Món ăn ban đầu ở 4 góc (map 1-1 theo index với cornerSlots)
const INITIAL_CORNERS: Dish[] = [
  {
    id: "dish-soup",
    src: "/images/custom/4.svg",
    alt: "Súp rau củ hữu cơ",
    name: "Súp Rau Củ Hữu Cơ",
  },
  {
    id: "dish-side",
    src: "/images/custom/7.svg",
    alt: "Món phụ theo mùa",
    name: "Món Phụ Theo Mùa",
  },
  {
    id: "dish-roll",
    src: "/images/custom/5.svg",
    alt: "Cuốn chay tươi",
    name: "Cuốn Chay Tươi",
  },
  {
    id: "dish-salad",
    src: "/images/custom/321.svg",
    alt: "Salad hoa quả hữu cơ",
    name: "Salad Hoa Quả Hữu Cơ",
  },
];

const features = [
  {
    icon: Leaf,
    title: "100% Thuần Chay",
    description: "Trọn vẹn hương vị, hoàn toàn từ thực vật.",
  },
  {
    icon: Sprout,
    title: "Nguyên Liệu Bền Vững",
    description: "Đồng hành cùng nông trại hữu cơ địa phương.",
  },
  {
    icon: HeartHandshake,
    title: "Trải Nghiệm Tĩnh Tâm",
    description: "Không gian để chậm lại và kết nối.",
  },
  {
    icon: ChefHat,
    title: "Nghệ Thuật Ẩm Thực",
    description: "Từng món ăn được chăm chút tinh tế.",
  },
];

// Transition dùng chung cho hiệu ứng hoán đổi — mượt, chậm rãi, sang trọng
const swapTransition = {
  layout: { duration: 0.95, ease: easeLuxury },
  opacity: { duration: 0.5, ease: easeLuxury },
  scale: { duration: 0.95, ease: easeLuxury },
  rotate: { duration: 0.95, ease: easeLuxury },
};

export function Hero() {
  const { phase: introPhase } = useIntroController();
  const [isWindowLit, setIsWindowLit] = useState(false);
  const [isWindowNear, setIsWindowNear] = useState(false);
  const [isWindowCueVisible, setIsWindowCueVisible] = useState(false);
  const [centerDish, setCenterDish] = useState<Dish>(INITIAL_CENTER);
  const [corners, setCorners] = useState<Dish[]>(INITIAL_CORNERS);
  const [isSwapping, setIsSwapping] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const swapTimerRef = useRef<number | null>(null);
  // Modal chi tiết món ăn — mở khi click vào đĩa lớn ở giữa
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);

  useEffect(() => {
    if (introPhase !== "completed") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const revealCue = window.setTimeout(() => {
      setIsWindowCueVisible(true);
    }, 2200);
    const hideCue = window.setTimeout(() => {
      setIsWindowCueVisible(false);
    }, 4400);

    return () => {
      window.clearTimeout(revealCue);
      window.clearTimeout(hideCue);
    };
  }, [introPhase]);

  useEffect(() => {
    return () => {
      if (swapTimerRef.current !== null) {
        window.clearTimeout(swapTimerRef.current);
      }
    };
  }, []);

  function handleHeroPointerMove(event: ReactPointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;
    const proximityWidth = Math.min(bounds.width * 0.26, 390);
    const isNearWindow =
      pointerX <= proximityWidth && pointerY >= 90 && pointerY <= bounds.height;

    setIsWindowNear(isNearWindow);
    if (isNearWindow) setIsWindowCueVisible(false);
  }

  function handleSwap(index: number) {
    if (isSwapping) return;
    const clicked = corners[index];
    if (!clicked) return;

    setIsSwapping(true);
    setActiveIndex(index);

    setCenterDish(clicked);
    setCorners((prev) => {
      const next = [...prev];
      next[index] = centerDish;
      return next;
    });

    // Khớp với thời lượng animation layout để mở khoá tương tác đúng lúc
    swapTimerRef.current = window.setTimeout(() => {
      setIsSwapping(false);
      setActiveIndex(null);
      swapTimerRef.current = null;
    }, 950);
  }

  return (
    <>
      <section
        data-window-lit={isWindowLit ? "true" : "false"}
        data-window-near={isWindowNear ? "true" : "false"}
        data-window-cue={isWindowCueVisible ? "true" : "false"}
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={() => setIsWindowNear(false)}
        className="hero-background-stage relative overflow-hidden bg-bg-dark pt-[90px]"
      >
        {/* background nền cho toàn bộ section */}
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/custom/hero-european-background-final.png')",
          }}
        />

        <div
          className="hero-window-hotspot"
          aria-hidden="true"
          onPointerEnter={() => setIsWindowLit(true)}
          onPointerLeave={() => setIsWindowLit(false)}
          onMouseEnter={() => setIsWindowLit(true)}
          onMouseLeave={() => setIsWindowLit(false)}
        />
        <div className="hero-door-light" aria-hidden="true">
          <span className="hero-door-light__beam" />
          <span className="hero-door-light__frame-shadows" />
          <span className="hero-door-light__dust" />
          <span className="hero-door-light__floor-glow" />
        </div>
        <div className="hero-window-hint" aria-hidden="true">
          <span>Đánh thức ánh sáng</span>
        </div>

        {/* ambient corner leaves */}
        <Leaf
          size={26}
          strokeWidth={1}
          className="animate-float-leaf pointer-events-none absolute top-[18%] left-[6%] hidden text-green-secondary/30 md:block"
        />
        <Leaf
          size={20}
          strokeWidth={1}
          className="animate-float-leaf pointer-events-none absolute right-[4%] bottom-[10%] hidden text-green-secondary/25 md:block"
          style={{ animationDelay: "1.5s" }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-16 px-6 py-16 md:px-10 lg:grid-cols-[42%_58%] lg:gap-8 lg:px-16 lg:py-0 lg:min-h-[860px]">
          {/* LEFT COLUMN */}
          <div className="relative z-10 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeLuxury }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="flex size-8 items-center justify-center rounded-full border border-gold/50 text-green-primary">
                <Leaf size={14} strokeWidth={1.5} />
              </span>
              <span className="text-eyebrow">Nuôi Dưỡng Tự Nhiên</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.4, delay: 0.85, ease: easeLuxury }}
              className="text-hero-script -mt-2 text-gold sm:-mt-3 md:-mt-5 lg:-mt-7"
            >
              Trọn Vị Sống.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95, ease: easeLuxury }}
              className="mt-8 max-w-md text-[18px] leading-relaxed text-text/70"
            >
              Lấy cảm hứng từ thiên nhiên, chế biến bằng đam mê. Trải nghiệm ẩm
              thực chay tôn vinh mọi giác quan và nuôi dưỡng tâm hồn bạn.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.15, ease: easeLuxury }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <Link
                href="/menu"
                className="group flex h-[60px] items-center gap-3 rounded-full bg-gold px-8 text-xs font-semibold tracking-[0.15em] text-bg-dark uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_36px_rgba(199,166,106,0.22)]"
              >
                Khám Phá Thực Đơn
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="#story"
                className="group flex items-center gap-3 text-xs font-semibold tracking-[0.15em] text-text uppercase"
              >
                <span className="flex size-11 items-center justify-center rounded-full border border-text/30 transition-colors duration-300 group-hover:border-gold group-hover:text-gold">
                  <Play size={13} fill="currentColor" />
                </span>
                Xem Câu Chuyện
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mt-16 flex items-center gap-2 text-[11px] tracking-[0.25em] text-text/40 uppercase"
            >
              <Leaf size={13} />
              Cuộn Để Khám Phá
            </motion.div>
          </div>

          {/* RIGHT COLUMN — plate composition */}
          <LayoutGroup>
            <div className="relative order-1 mx-auto aspect-square w-full max-w-[420px] sm:max-w-[500px] lg:order-2 lg:max-w-[640px]">
              {/* thin gold orbit rings */}
              <svg
                viewBox="0 0 640 640"
                className="pointer-events-none absolute inset-0 h-full w-full text-gold/40"
                aria-hidden="true"
              >
                <circle
                  cx="320"
                  cy="320"
                  r="300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <circle
                  cx="320"
                  cy="320"
                  r="220"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="2 8"
                />
                <circle cx="320" cy="20" r="4" fill="currentColor" />
                <circle cx="620" cy="320" r="3" fill="currentColor" />
                <circle cx="60" cy="440" r="3" fill="currentColor" />
              </svg>

              {/* main plate — click để mở modal chi tiết món ăn (fullscreen, layoutId khớp bên dưới) */}
              <div
                role="button"
                tabIndex={0}
                aria-label={`Xem chi tiết ${centerDish.name}`}
                onClick={() => setIsDishModalOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setIsDishModalOpen(true);
                  }
                }}
                className="absolute top-1/2 left-1/2 aspect-square w-[78vw] max-w-[360px] -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-full bg-white shadow-[0_40px_80px_rgba(0,0,0,0.18),0_10px_20px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-out hover:scale-[1.015] md:max-w-[420px] lg:max-w-[560px]">
                {/* vòng sáng vàng loé lên trong lúc hoán đổi */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 rounded-full"
                  animate={{
                    boxShadow: isSwapping
                      ? "inset 0 0 0 3px rgba(200,167,91,0.9)"
                      : "inset 0 0 0 0px rgba(200,167,91,0)",
                  }}
                  transition={{ duration: 0.5, ease: easeLuxury }}
                />

                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={centerDish.id}
                    layoutId={centerDish.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.05, rotate: 4 }}
                    transition={swapTransition}
                    className="absolute inset-0"
                  >
                    <Image
                      src={centerDish.src}
                      alt={centerDish.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 560px, (min-width: 768px) 420px, 360px"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* floating supporting dishes — click để hoán đổi với đĩa chính */}
              {corners.map((dish, index) => {
                const slot = cornerSlots[index];
                const isActive = activeIndex === index;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSwap(index)}
                    disabled={isSwapping}
                    aria-label={`Xem ${dish.name}`}
                    className={`animate-float-dish group absolute ${slot.position} ${slot.size} aspect-square cursor-pointer appearance-none overflow-hidden rounded-full border-4 border-white bg-transparent p-0 shadow-[0_16px_32px_rgba(0,0,0,0.15)] disabled:cursor-wait`}
                    style={{ animationDelay: `${slot.delay}s` }}
                  >
                    {/* vòng sáng vàng loé lên khi chính ô này vừa được chọn */}
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-10 rounded-full"
                      animate={{
                        boxShadow: isActive
                          ? "inset 0 0 0 3px rgba(200,167,91,0.9)"
                          : "inset 0 0 0 0px rgba(200,167,91,0)",
                      }}
                      transition={{ duration: 0.5, ease: easeLuxury }}
                    />

                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={dish.id}
                        layoutId={dish.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 1.1, rotate: -4 }}
                        transition={swapTransition}
                        className="absolute inset-0"
                      >
                        {/* ảnh món ăn — luôn nét, zoom nhẹ khi hover, KHÔNG blur */}
                        <Image
                          src={dish.src}
                          alt={dish.alt}
                          fill
                          sizes="160px"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* lớp phủ đen làm tối nền, món ăn vẫn hiện rõ bên dưới */}
                    <div className="absolute inset-0 bg-bg-dark/0 transition-colors duration-500 ease-out group-hover:bg-bg-dark/40" />

                    {/* khung viền sáng "vẽ" dần vào bên trong, giống hiệu ứng Makhno */}
                    <div className="pointer-events-none absolute inset-[9%] scale-90 rounded-full border border-white/0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:border-white/80 group-hover:opacity-100" />

                    {/* icon mũi tên góc trên phải */}
                    <div className="pointer-events-none absolute top-[16%] right-[16%] flex size-5 -translate-y-1 translate-x-1 items-center justify-center rounded-full border border-white/0 text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:border-white/80 group-hover:opacity-100 sm:size-6">
                      <ArrowUpRight size={11} strokeWidth={1.5} />
                    </div>

                    {/* nhãn chữ trượt lên từ dưới */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-[14%] flex translate-y-2 flex-col items-center px-2 text-center opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="text-[6px] font-semibold tracking-[0.2em] text-white/75 uppercase sm:text-[7px]">
                        Xem Ngay
                      </span>
                      <span className="mt-0.5 text-[8px] leading-tight font-semibold text-white sm:text-[9px]">
                        {dish.name}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* plant-based badge */}
              <div className="absolute top-1/2 right-[-2%] flex size-[110px] -translate-y-1/2 flex-col items-center justify-center rounded-full border border-gold/40 bg-bg-dark text-center text-white shadow-[0_20px_40px_rgba(0,0,0,0.25)] sm:size-[130px] lg:size-[150px]">
                <Leaf size={16} className="mb-1 text-gold" strokeWidth={1.5} />
                <span className="font-heading text-xl sm:text-2xl">100%</span>
                <span className="mt-1 text-[8px] leading-tight tracking-[0.15em] uppercase sm:text-[9px]">
                  Thuần Chay
                </span>
                <span className="text-[8px] leading-tight tracking-[0.15em] uppercase sm:text-[9px]">
                  Trọn Vẹn
                </span>
              </div>

              {/* small floating leaves within composition */}
              <Leaf
                size={16}
                strokeWidth={1.5}
                className="animate-float-leaf absolute top-[2%] left-[36%] text-green-secondary/60"
              />
              <Leaf
                size={14}
                strokeWidth={1.5}
                className="animate-float-leaf absolute bottom-[6%] left-[40%] text-green-secondary/50"
                style={{ animationDelay: "2s" }}
              />
            </div>

            {/* Fullscreen modal chi tiết món ăn — cùng LayoutGroup để layoutId
                khớp với đĩa chính phía trên, tạo hiệu ứng "bay" liền mạch */}
            <DishDetailModal
              dishId={centerDish.id}
              isOpen={isDishModalOpen}
              onClose={() => setIsDishModalOpen(false)}
            />
          </LayoutGroup>
        </div>
      </section>

      {/* FEATURE BAR */}
      <section className="relative overflow-hidden bg-bg-dark">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/custom/8.svg')",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-bg-dark/45" />

        <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-2 divide-y divide-white/10 py-12 max-[480px]:grid-cols-1 sm:divide-y-0 sm:divide-x md:grid-cols-4 lg:min-h-[220px]">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center gap-4 px-4 py-8 text-center sm:py-0"
              >
                <span className="flex size-14 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <feature.icon size={22} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-[0.15em] text-white uppercase">
                    {feature.title}
                  </p>
                  <p className="mt-2 text-sm text-white/60">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
