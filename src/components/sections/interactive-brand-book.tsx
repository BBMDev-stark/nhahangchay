"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { BookOpen, RotateCcw } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import styles from "./interactive-brand-book.module.css";

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

type StorySpread = {
  chapter: string;
  number: string;
  title: string;
  lead: string;
  paragraph: string;
  quote: string;
  image: string;
  imageAlt: string;
  caption: string;
};

const spreads: StorySpread[] = [
  {
    chapter: "Khởi nguyên",
    number: "I",
    title: "Một khoảng lặng giữa lòng thành phố",
    lead:
      "Lotus & Earth bắt đầu từ một câu hỏi giản dị: liệu một bữa ăn có thể vừa thanh sạch, vừa mang vẻ đẹp của một nghi lễ?",
    paragraph:
      "Ánh sáng, vật liệu và từng khoảng trống đều dẫn thực khách trở về với cảm giác nguyên bản. Ở đó, ẩm thực chay trở thành một ngôn ngữ riêng — tinh tế, sâu sắc và đầy cảm xúc.",
    quote: "Mọi hành trình trở về đều bắt đầu bằng một khoảng lặng.",
    image: "/images/brand-book/chapter-origin.png",
    imageAlt: "Không gian châu Âu thanh lịch của Lotus & Earth",
    caption: "Không gian · Tĩnh tại · Khởi nguồn",
  },
  {
    chapter: "Từ đất và mùa",
    number: "II",
    title: "Thiên nhiên viết nên thực đơn",
    lead:
      "Mỗi mùa mang đến một sắc độ, một kết cấu và một câu chuyện khác nhau. Chúng tôi lắng nghe những thay đổi ấy trước khi bắt đầu một món ăn.",
    paragraph:
      "Từ những nông trại hữu cơ, củ sen, lá non, thảo mộc và hoa ăn được bước vào căn bếp ở thời điểm trọn vị nhất — rồi được nâng niu bằng sự tiết chế.",
    quote: "Khi nguyên liệu đã cất tiếng nói, không điều gì cần được thêm vào.",
    image: "/images/brand-book/chapter-earth.png",
    imageAlt: "Nguyên liệu theo mùa với củ sen và thảo mộc",
    caption: "Đất · Mùa · Nguyên liệu thuần khiết",
  },
  {
    chapter: "Nghệ thuật chế biến",
    number: "III",
    title: "Kỹ thuật phục vụ cảm xúc",
    lead:
      "Sau vẻ đẹp tĩnh tại là một quá trình chính xác: nhiệt độ, thời gian, cấu trúc và hương thơm được cân chỉnh như những nốt nhạc.",
    paragraph:
      "Kỹ thuật fine dining châu Âu gặp tinh thần thiền tịnh phương Đông. Mỗi chiếc đĩa là một cảnh quan thu nhỏ, nơi mọi chi tiết đều có lý do để hiện diện.",
    quote: "Tinh tế không nằm ở sự phô diễn, mà ở điều còn đọng lại.",
    image: "/images/brand-book/chapter-craft.png",
    imageAlt: "Đầu bếp hoàn thiện món chay Lotus & Earth",
    caption: "Kỹ nghệ · Cân bằng · Trọn vị sống",
  },
];

const chapterFromPage = (page: number) =>
  Math.max(0, Math.min(spreads.length - 1, Math.floor((page - 1) / 2)));

const stateFromPage = (page: number, lastPage: number): BookState => {
  if (page === 0) return "front";
  if (page === lastPage) return "back";
  return "reading";
};

function LotusMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 64 52"
      fill="none"
    >
      <path
        d="M32 46C21 38 17 27 23 13c8 6 11 15 9 27M32 46c11-8 15-19 9-33-8 6-11 15-9 27M31 46C17 45 8 37 7 24c9 1 17 7 23 17M33 46c14-1 23-9 24-22-9 1-17 7-23 17M31 46C18 51 8 48 2 38c9-3 18-1 28 6M33 46c13 5 23 2 29-8-9-3-18-1-28 6M32 31C25 23 26 12 32 3c6 9 7 20 0 28Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TextPage({ spread }: { spread: StorySpread }) {
  return (
    <article className={styles.textPage}>
      <div className={styles.pageOrnament}>
        <LotusMark />
      </div>
      <p className={styles.chapter}>
        <span>{spread.number}</span>
        {spread.chapter}
      </p>
      <h3>{spread.title}</h3>
      <div className={styles.rule}>
        <i />
      </div>
      <p className={styles.lead}>{spread.lead}</p>
      <p>{spread.paragraph}</p>
      <blockquote>{spread.quote}</blockquote>
      <span className={styles.pageNumber}>{spread.number}</span>
    </article>
  );
}

function ImagePage({ spread }: { spread: StorySpread }) {
  return (
    <figure className={styles.imagePage}>
      <div className={styles.imageMat}>
        <Image
          src={spread.image}
          alt={spread.imageAlt}
          fill
          sizes="(max-width: 767px) 86vw, (max-width: 1199px) 44vw, 30vw"
          className={styles.chapterImage}
        />
        <span className={styles.imageVeil} />
      </div>
      <figcaption>{spread.caption}</figcaption>
      <span className={styles.pageNumber}>{spread.number}</span>
    </figure>
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
  const [currentPage, setCurrentPage] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [isIlluminated, setIsIlluminated] = useState(false);
  const [bookState, setBookState] = useState<BookState>("front");
  const [orientation, setOrientation] =
    useState<BookOrientation>("landscape");

  const lastPage = spreads.length * 2 + 1;
  const activeChapter = chapterFromPage(currentPage);
  const isFront = currentPage === 0;
  const isBack = currentPage === lastPage;

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
        useMouseEvents: true,
        showPageCorners: true,
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
        setIsBusy(false);

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
        setIsBusy(state !== "read");

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
    };
  }, [lastPage]);

  const flipNext = useCallback(() => {
    if (!isReady || isBusy || isBack) return;
    if (isFront) {
      setBookState("reading");
    } else if (currentPage >= lastPage - 2) {
      setBookState("back");
    }
    setIsBusy(true);
    pageFlipRef.current?.flipNext("bottom");
  }, [currentPage, isBack, isBusy, isFront, isReady, lastPage]);

  const flipPrev = useCallback(() => {
    if (!isReady || isBusy || isFront) return;
    if (isBack) {
      setBookState("reading");
    } else if (currentPage <= 1) {
      setBookState("front");
    }
    setIsBusy(true);
    pageFlipRef.current?.flipPrev("bottom");
  }, [currentPage, isBack, isBusy, isFront, isReady]);

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
          aria-label="Sách câu chuyện Lotus & Earth"
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
            src="/images/brand-book/front-cover.png"
            alt="Bìa sách Lotus & Earth"
          />

          {spreads.flatMap((spread) => [
            <div
              key={`${spread.number}-text`}
              className={`${styles.flipPage} ${styles.paperPage}`}
              data-density="soft"
              data-book-page
            >
              <TextPage spread={spread} />
            </div>,
            <div
              key={`${spread.number}-image`}
              className={`${styles.flipPage} ${styles.paperPage}`}
              data-density="soft"
              data-book-page
            >
              <ImagePage spread={spread} />
            </div>,
          ])}

          <CoverPage
            side="back"
            src="/images/brand-book/back-cover.png"
            alt="Bìa kết thúc sách Lotus & Earth"
          />
          </div>
        </div>

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
            Mở sách để khám phá câu chuyện
          </>
        ) : isBack ? (
          <>
            <RotateCcw />
            Mở lại chương cuối
          </>
        ) : (
          <>
            {activeChapter + 1} / {spreads.length}
            <span>·</span>
            Kéo góc trang, chạm mép sách hoặc dùng phím mũi tên
          </>
        )}
      </button>
    </div>
  );
}
