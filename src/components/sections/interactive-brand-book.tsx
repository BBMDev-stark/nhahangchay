"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { BookOpen, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import styles from "./interactive-brand-book.module.css";
import { menuPages, type MenuPageData } from "./menu-book-data";

type BookState = "front" | "reading" | "back";
type BookOrientation = "portrait" | "landscape";

type PageFlipEvent = {
  data: number | string | boolean | object;
};

type PageFlipInstance = {
  loadFromHTML: (pages: HTMLElement[]) => void;
  flipNext: (corner?: "top" | "bottom") => void;
  flipPrev: (corner?: "top" | "bottom") => void;
  flip: (page: number, corner?: "top" | "bottom") => void;
  turnToPage: (page: number) => void;
  getCurrentPageIndex: () => number;
  getOrientation: () => BookOrientation;
  getState: () => string;
  getUI: () => {
    destroy: () => void;
  };
  clear: () => void;
  on: (eventName: string, callback: (event: PageFlipEvent) => void) => void;
  off: (eventName: string) => void;
};

const stateFromPage = (page: number, lastPage: number): BookState => {
  if (page === 0) return "front";
  if (page === lastPage) return "back";
  return "reading";
};

function MenuRows({ items }: { items: MenuPageData["items"] }) {
  const descriptionFor = (name: string) => {
    if (/súp|canh|lẩu|phở|bún|mì|miến|hủ tiếu|cháo/i.test(name)) return "Nước dùng thanh ngọt, rau thơm và nguyên liệu chay chọn lọc.";
    if (/cuốn|bánh hỏi|bò bía/i.test(name)) return "Cuốn tươi trong ngày, hài hòa giữa rau xanh và phần nhân đậm vị.";
    if (/nước|soda|cà phê|sữa|trà|yaourt|cam|dừa|đá me/i.test(name)) return "Thức uống thanh mát, cân bằng vị và phục vụ theo yêu cầu.";
    if (/cơm|xôi/i.test(name)) return "Hạt cơm dẻo thơm, phối cùng rau củ và gia vị vừa vặn.";
    if (/gỏi|rau|bó xôi|bông|mướp|cà tím|măng/i.test(name)) return "Rau củ tươi, chế biến nhẹ nhàng để giữ trọn độ giòn và vị ngọt.";
    if (/pizza|mì ý|phô mai|đút lò/i.test(name)) return "Phong vị Âu thanh lịch, hoàn thiện với kết cấu và hương thơm cân bằng.";
    return "Món chay được chăm chút từ nguyên liệu đến cách nêm nếm và trình bày.";
  };

  return (
    <div className={styles.menuRows}>
      {items.map((entry) => (
        <div className={styles.menuRow} key={`${entry.name}-${entry.price}`}>
          <span className={styles.itemName}>{entry.name}</span>
          <span className={styles.leader} aria-hidden="true" />
          <span className={styles.itemPrice}>{entry.price}</span>
          <small>{descriptionFor(entry.name)}</small>
        </div>
      ))}
    </div>
  );
}

function MenuPage({ page, index }: { page: MenuPageData; index: number }) {
  return (
    <article className={`${styles.menuPage} ${page.dense || page.secondItems ? styles.menuPageDense : ""}`}>
      <header className={styles.menuHero}>
        <div className={styles.menuPhotoArch}>
          <Image
            src={page.image}
            alt={`Món ăn trong nhóm ${page.title}`}
            fill
            sizes="(max-width: 767px) 42vw, 210px"
            className={styles.menuHeroImage}
          />
        </div>
        <div className={styles.menuHeroCopy}>
          <span>Nhà hàng chay Hương Sen</span>
          <h3>{page.title}</h3>
          <em>{page.english}</em>
        </div>
      </header>
      <div className={styles.menuBody}>
        <MenuRows items={page.items} />
        {page.secondItems && page.secondTitle ? (
          <section className={styles.secondMenuSection}>
            <h4><span />{page.secondTitle}<span /></h4>
            <MenuRows items={page.secondItems} />
          </section>
        ) : null}
      </div>
      <footer className={styles.menuFooter}>
        <span>778/2 Nguyễn Kiệm · TP. Hồ Chí Minh</span>
        <b>{String(index + 1).padStart(2, "0")}</b>
      </footer>
    </article>
  );
}

function CoverPage({
  side,
  src,
  alt,
}: {
  side: "front" | "back";
  src: string;
  alt: string;
}) {
  return (
    <div
      className={`${styles.flipPage} ${styles.coverPage}`}
      data-cover-side={side}
      data-density="hard"
      data-book-page
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 767px) 82vw, 38vw"
        className={styles.coverArtwork}
      />
      <span className={styles.coverGrain} />
      <span className={styles.coverSheen} />
      <span className={styles.coverEdge} data-side={side} />
    </div>
  );
}

export function InteractiveBrandBook({
  onReadingChange,
}: {
  onReadingChange?: (isReading: boolean) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const pageFlipRef = useRef<PageFlipInstance | null>(null);
  const busyReleaseRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [isIlluminated, setIsIlluminated] = useState(false);
  const [bookState, setBookState] = useState<BookState>("front");
  const [orientation, setOrientation] =
    useState<BookOrientation>("landscape");

  const lastPage = menuPages.length + 1;
  const activeMenuPage = Math.max(0, Math.min(menuPages.length - 1, currentPage - 1));
  const isFront = currentPage === 0;
  const isBack = currentPage === lastPage;

  const releaseBusy = useCallback(() => {
    if (busyReleaseRef.current) {
      clearTimeout(busyReleaseRef.current);
      busyReleaseRef.current = null;
    }
    setIsBusy(false);
  }, []);

  const beginFlip = useCallback(() => {
    if (busyReleaseRef.current) clearTimeout(busyReleaseRef.current);
    setIsBusy(true);
    // page-flip can occasionally omit its final `read` event after a touch.
    // Never leave the navigation locked when that happens.
    busyReleaseRef.current = setTimeout(() => {
      busyReleaseRef.current = null;
      setIsBusy(false);
    }, 1400);
  }, []);

  useEffect(() => {
    onReadingChange?.(bookState === "reading");
  }, [bookState, onReadingChange]);

  useEffect(() => {
    let cancelled = false;
    let instance: PageFlipInstance | null = null;

    const setup = async () => {
      if (!mountRef.current) return;

      const pageFlipModule = (await import("page-flip")) as unknown as {
        PageFlip: new (
          element: HTMLElement,
          settings: Record<string, string | number | boolean>,
        ) => PageFlipInstance;
      };

      if (cancelled || !mountRef.current) return;

      const pageElements = Array.from(
        mountRef.current.querySelectorAll<HTMLElement>("[data-book-page]"),
      );
      const isMobileBook = window.matchMedia("(max-width: 767px)").matches;

      instance = new pageFlipModule.PageFlip(mountRef.current, {
        width: 425,
        height: 600,
        size: "stretch",
        minWidth: 300,
        maxWidth: 440,
        minHeight: 424,
        maxHeight: 622,
        showCover: true,
        drawShadow: true,
        maxShadowOpacity: 0.42,
        flippingTime: 900,
        usePortrait: true,
        autoSize: true,
        mobileScrollSupport: true,
        swipeDistance: 24,
        clickEventForward: true,
        // On mobile, page changes are intentionally controlled by the two
        // visible arrow buttons so an accidental swipe cannot turn a page.
        useMouseEvents: true,
        showPageCorners: !isMobileBook,
        disableFlipByClick: true,
      });

      instance.on("init", (event) => {
        const payload = event.data as {
          page?: number;
          mode?: BookOrientation;
        };
        const page = payload.page ?? 0;
        setCurrentPage(page);
        setBookState(stateFromPage(page, lastPage));
        setOrientation(payload.mode ?? instance?.getOrientation() ?? "landscape");
        setIsReady(true);
      });

      instance.on("flip", (event) => {
        const page = Number(event.data);
        const safePage = Number.isFinite(page) ? page : 0;
        setCurrentPage(safePage);
        setBookState(stateFromPage(safePage, lastPage));
        releaseBusy();

        if (glowRef.current) {
          gsap.fromTo(
            glowRef.current,
            { opacity: 0.72, scaleX: 0.78 },
            {
              opacity: 0.32,
              scaleX: 1,
              duration: 0.85,
              ease: "power2.out",
            },
          );
        }
      });

      instance.on("changeState", (event) => {
        const state = String(event.data);
        if (state === "read") {
          releaseBusy();
        } else {
          setIsBusy(true);
        }

        if (state === "flipping" && rootRef.current) {
          gsap.fromTo(
            rootRef.current,
            { scale: 1 },
            {
              scale: 1.008,
              duration: 0.36,
              yoyo: true,
              repeat: 1,
              ease: "sine.inOut",
            },
          );
        }
      });

      instance.on("changeOrientation", (event) => {
        const nextOrientation = String(event.data);
        setOrientation(
          nextOrientation === "portrait" ? "portrait" : "landscape",
        );
      });

      instance.loadFromHTML(pageElements);
      pageFlipRef.current = instance;
    };

    setup();

    return () => {
      cancelled = true;
      if (instance) {
        instance.off("init");
        instance.off("flip");
        instance.off("changeState");
        instance.off("changeOrientation");
        try {
          instance.clear();
          instance.getUI().destroy();
        } catch {
          // React removes the host node immediately during route teardown.
        }
      }
      pageFlipRef.current = null;
      if (busyReleaseRef.current) {
        clearTimeout(busyReleaseRef.current);
        busyReleaseRef.current = null;
      }
    };
  }, [lastPage, releaseBusy]);

  const flipNext = useCallback(() => {
    if (!isReady || isBack) return;
    const instance = pageFlipRef.current;
    if (!instance) return;
    if (isBusy) return;
    if (isFront) {
      setBookState("reading");
    } else if (currentPage >= lastPage - 2) {
      setBookState("back");
    }
    beginFlip();
    instance.flipNext("bottom");
  }, [beginFlip, currentPage, isBack, isBusy, isFront, isReady, lastPage]);

  const flipPrev = useCallback(() => {
    if (!isReady || isFront) return;
    const instance = pageFlipRef.current;
    if (!instance) return;
    if (isBusy) return;
    if (orientation === "portrait") {
      instance.turnToPage(Math.max(0, currentPage - 1));
      return;
    }
    if (isBack) {
      setBookState("reading");
    } else if (currentPage <= 1) {
      setBookState("front");
    }
    beginFlip();
    instance.flipPrev("bottom");
  }, [beginFlip, currentPage, isBack, isBusy, isFront, isReady, orientation]);

  const updateIllumination = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (orientation === "portrait" || bookState === "reading") {
        setIsIlluminated(true);
        return;
      }

      const bounds = event.currentTarget.getBoundingClientRect();
      const pointerX = event.clientX - bounds.left;
      const isOnVisibleCover =
        bookState === "front"
          ? pointerX >= bounds.width / 2
          : pointerX <= bounds.width / 2;

      setIsIlluminated(isOnVisibleCover);
    },
    [bookState, orientation],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") flipNext();
      if (event.key === "ArrowLeft") flipPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flipNext, flipPrev]);

  return (
    <div
      ref={rootRef}
      className={styles.experience}
      data-book-state={bookState}
      data-book-orientation={orientation}
      data-book-lit={isIlluminated ? "true" : "false"}
      data-book-page={currentPage}
      data-book-ready={isReady ? "true" : "false"}
      data-book-busy={isBusy ? "true" : "false"}
    >
      <div className={styles.stage}>
        <span ref={glowRef} className={styles.stageGlow} />
        <span className={styles.spotlight} aria-hidden="true">
          <i className={styles.spotlightCore} />
          <i className={styles.spotlightSoft} />
          <i className={styles.spotlightDust} />
        </span>

        <div className={styles.bookSizer}>
          <div
            ref={mountRef}
            className={styles.bookMount}
            role={isFront ? "button" : "group"}
            tabIndex={isFront ? 0 : -1}
            aria-label="Mở thực đơn Hương Sen"
            onPointerEnter={updateIllumination}
            onPointerMove={updateIllumination}
            onPointerLeave={() => setIsIlluminated(false)}
            onClick={() => {
              if (isFront && !isBusy) flipNext();
            }}
            onKeyDown={(event) => {
              if (
                isFront &&
                !isBusy &&
                (event.key === "Enter" || event.key === " ")
              ) {
                event.preventDefault();
                flipNext();
              }
            }}
            onFocusCapture={() => setIsIlluminated(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsIlluminated(false);
              }
            }}
          >
          <CoverPage
            side="front"
            src="/images/brand-story-huong-sen/book-front-clean-v2.webp"
            alt="Bìa sách Hương Sen"
          />

          {menuPages.map((page, index) => (
            <div
              key={page.title + page.english}
              className={`${styles.flipPage} ${styles.paperPage}`}
              data-density="soft"
              data-book-page
            >
              <MenuPage page={page} index={index} />
            </div>
          ))}

          <CoverPage
            side="back"
            src="/images/brand-story-huong-sen/book-back-clean-v2.webp"
            alt="Bìa kết thúc sách Hương Sen"
          />
          </div>
        </div>

        <nav className={styles.mobilePageNavigation} aria-label="Chuyển trang thực đơn">
          <button
            type="button"
            onClick={flipPrev}
            disabled={!isReady || isBusy || isFront}
            aria-label="Xem trang thực đơn trước"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <span aria-live="polite">
            {isFront ? "Bìa" : isBack ? "Cuối" : `${activeMenuPage + 1} / ${menuPages.length}`}
          </span>
          <button
            type="button"
            onClick={flipNext}
            disabled={!isReady || isBusy || isBack}
            aria-label="Xem trang thực đơn tiếp theo"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </nav>

      </div>

      <button
        type="button"
        className={styles.instruction}
        onClick={isBack ? flipPrev : flipNext}
        disabled={!isReady || isBusy}
      >
        {isFront ? (
          <>
            <BookOpen />
            Mở sách để khám phá thực đơn
          </>
        ) : isBack ? (
          <>
            <RotateCcw />
            Xem lại trang cuối
          </>
        ) : (
          <>
            {activeMenuPage + 1} / {menuPages.length}
            <span>·</span>
            Kéo góc trang, chạm mép sách hoặc dùng phím mũi tên
          </>
        )}
      </button>
    </div>
  );
}
