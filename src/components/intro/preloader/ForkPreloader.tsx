"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import styles from "./fork-preloader.module.css";

type ForkPreloaderProps = {
  assetProgress: number;
  assetLoadError?: boolean;
  forkRealSrc: string;
  headline?: string[];
  minimumDuration?: number;
  onComplete: () => void;
  reducedMotion?: boolean;
};

type ProgressProxy = { value: number };

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function ForkPreloader({
  assetProgress,
  assetLoadError = false,
  forkRealSrc,
  headline = ["TỪ ĐẤT", "TỪ SEN", "TỪ MÙA"],
  minimumDuration = 3600,
  onComplete,
  reducedMotion = false,
}: ForkPreloaderProps) {
  const rootRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);
  const realRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const scannerBandRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const safetyRef = useRef<gsap.core.Tween | null>(null);
  const progressRef = useRef<ProgressProxy>({ value: 0 });
  const assetsReadyRef = useRef(assetProgress >= 100 || assetLoadError);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let completed = false;
    const finish = () => {
      if (completed) return;
      completed = true;
      onComplete();
    };

    const context = gsap.context(() => {
      const progress = progressRef.current;
      progress.value = 0;
      const frameEdges = root.querySelectorAll(`.${styles.frameEdge}`);
      const guideLines = root.querySelectorAll(`.${styles.guideLine}`);
      const headlineLines = root.querySelectorAll(`.${styles.headlineLine} > span`);
      const technical = root.querySelectorAll(`.${styles.technical}`);
      const logo = root.querySelector(`.${styles.logo}`);
      const loadingLabel = root.querySelector(`.${styles.loadingLabel}`);

      const render = () => {
        const value = Math.min(100, Math.max(0, progress.value));
        const scan = clamp01((value - 35) / 59);
        const annotation = clamp01((value - 58) / 25);

        if (counterRef.current) {
          counterRef.current.textContent = Math.round(value)
            .toString()
            .padStart(2, "0");
        }
        graphicRef.current?.style.setProperty(
          "clip-path",
          `inset(${scan * 100}% 0 0 0)`
        );
        realRef.current?.style.setProperty(
          "clip-path",
          `inset(0 0 ${(1 - scan) * 100}% 0)`
        );
        headlineRef.current?.style.setProperty(
          "clip-path",
          `inset(${scan * 100}% 0 0 0)`
        );
        if (scannerRef.current) {
          scannerRef.current.style.top = `${scan * 100}%`;
          scannerRef.current.style.opacity =
            value >= 35 && value < 96 ? "1" : "0";
        }
        if (scannerBandRef.current) {
          scannerBandRef.current.style.top = `${scan * 100}%`;
          scannerBandRef.current.style.opacity =
            value >= 35 && value < 96 ? "1" : "0";
        }
        technical.forEach((element) => {
          (element as HTMLElement).style.opacity = String(annotation);
        });
        root.style.setProperty("--loader-progress", String(value / 100));
      };

      gsap.set(frameEdges, { scaleX: 0, scaleY: 0, transformOrigin: "left top" });
      gsap.set(guideLines, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(headlineLines, { yPercent: 0 });
      gsap.set(technical, { opacity: 0 });
      gsap.set([logo, loadingLabel], { opacity: 0, y: 6 });
      gsap.set(graphicRef.current, { opacity: 0 });
      render();

      if (reducedMotion) {
        progress.value = 100;
        render();
        gsap.set([frameEdges, guideLines, headlineLines, technical], {
          clearProps: "all",
        });
        gsap.set(graphicRef.current, { opacity: 0 });
        gsap.set(realRef.current, { clipPath: "inset(0 0 0% 0)" });
        const quickExit = gsap.delayedCall(0.7, finish);
        safetyRef.current = quickExit;
        timelineRef.current = null;
        return;
      }

      const durationScale = Math.max(0.88, minimumDuration / 3600);
      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
      });
      timelineRef.current = timeline;

      timeline
        .addLabel("init")
        .to(logo, { opacity: 1, y: 0, duration: 0.36 * durationScale })
        .to(
          frameEdges,
          {
            scaleX: 1,
            scaleY: 1,
            stagger: 0.07,
            duration: 0.38 * durationScale,
          },
          0.08 * durationScale
        )
        .to(
          guideLines,
          { scaleX: 1, stagger: 0.055, duration: 0.3 * durationScale },
          0.16 * durationScale
        )
        .to(
          [loadingLabel, graphicRef.current],
          { opacity: 1, y: 0, duration: 0.32 * durationScale },
          0.18 * durationScale
        )
        .addLabel("typography")
        .to({}, { duration: 0.34 * durationScale })
        .addLabel("scan")
        .to(progress, {
          value: 88,
          duration: 2.3 * durationScale,
          ease: "none",
          onUpdate: render,
        })
        .addPause("assetGate", () => {
          if (assetsReadyRef.current) {
            gsap.delayedCall(0, () => timeline.play());
          }
        })
        .addLabel("materialized")
        .to(progress, {
          value: 100,
          duration: 0.48 * durationScale,
          ease: "power1.inOut",
          onUpdate: render,
        })
        .to(
          scannerRef.current,
          { opacity: 0, duration: 0.18, ease: "power1.out" },
          "<0.3"
        )
        .addLabel("hold")
        .to({}, { duration: 0.58 * durationScale })
        .addLabel("exit")
        .call(finish);

      safetyRef.current = gsap.delayedCall(8, () => {
        assetsReadyRef.current = true;
        if (timeline.paused() && progress.value >= 87.5) timeline.play();
      });

      timeline.play(0);
    }, root);

    return () => {
      safetyRef.current?.kill();
      safetyRef.current = null;
      timelineRef.current?.kill();
      timelineRef.current = null;
      context.revert();
    };
  }, [minimumDuration, onComplete, reducedMotion]);

  useLayoutEffect(() => {
    if (assetProgress < 100 && !assetLoadError) return;
    assetsReadyRef.current = true;
    const timeline = timelineRef.current;
    if (timeline?.paused() && progressRef.current.value >= 87.5) {
      timeline.play();
    }
  }, [assetLoadError, assetProgress]);

  const maskStyle = {
    "--fork-mask": `url("${forkRealSrc}")`,
  } as CSSProperties;

  return (
    <section
      ref={rootRef}
      className={styles.root}
      aria-label="Đang tải trải nghiệm Lotus & Earth"
      aria-live="polite"
    >
      <div className={styles.logo}>LOTUS &amp; EARTH</div>

      <div className={styles.composition}>
        <div className={`${styles.technical} ${styles.figure}`}>
          <span>FIG. 04</span>
          <i className={styles.guideLine} />
          <p>BOTANICAL DINING INSTRUMENT<br />MATERIAL STUDY / 01</p>
        </div>

        <div className={styles.stage} style={maskStyle}>
          <span className={`${styles.frameEdge} ${styles.frameTop}`} />
          <span className={`${styles.frameEdge} ${styles.frameRight}`} />
          <span className={`${styles.frameEdge} ${styles.frameBottom}`} />
          <span className={`${styles.frameEdge} ${styles.frameLeft}`} />

          <div ref={graphicRef} className={styles.graphicFork} aria-hidden="true" />
          <div ref={realRef} className={styles.realFork}>
            <Image
              src={forkRealSrc}
              alt="Nĩa cán gỗ Lotus & Earth"
              fill
              priority
              sizes="(max-width: 767px) 72vw, 280px"
              unoptimized
            />
          </div>

          <div ref={headlineRef} className={styles.headline} aria-hidden="true">
            {headline.map((line) => (
              <div className={styles.headlineLine} key={line}>
                <span>{line}</span>
              </div>
            ))}
          </div>

          <span className={`${styles.guideLine} ${styles.ruleOne}`} />
          <span className={`${styles.guideLine} ${styles.ruleTwo}`} />
          <span className={`${styles.guideLine} ${styles.ruleThree}`} />

          <div ref={scannerBandRef} className={styles.scannerBand} />
          <div ref={scannerRef} className={styles.scanner} />

          <span className={styles.loadingLabel}>LOADING</span>
        </div>

        <div className={`${styles.technical} ${styles.annotation}`}>
          A REGENERATIVE FOOD SYSTEM CONNECTS SOIL, SEASON AND CRAFT.
        </div>
        <span className={`${styles.guideLine} ${styles.outerGuide}`} />
        <span ref={counterRef} className={styles.counter}>00</span>
      </div>
    </section>
  );
}
