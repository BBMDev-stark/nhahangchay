"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import { introConfig } from "@/config/intro.config";
import {
  FogTransitionOverlay,
  type FogTransitionHandle,
} from "@/components/fog-transition/FogTransitionOverlay";
import { useIntroController } from "./use-intro-controller";
import { ForkPreloader } from "./preloader/ForkPreloader";

const EASE = [0.22, 1, 0.36, 1] as const;

function useDocumentBody() {
  const [body, setBody] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- document.body is client-only
    setBody(document.body);
  }, []);

  return body;
}

function HeroInterface({ hovered }: { hovered: boolean }) {
  const { phase, breakpoint, reducedMotion, skipIntro } = useIntroController();
  const visible = phase === "idle";

  return (
    <>
      <motion.header
        className="lotus-hero-header"
        aria-hidden={!visible}
        inert={!visible}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
        transition={{ duration: reducedMotion ? 0.1 : 0.7, ease: EASE }}
      >
        <div>
          <span className="lotus-hero-header__index">I.</span>
          <span>HƯƠNG SEN</span>
        </div>
        <button type="button" onClick={skipIntro}>
          {introConfig.skipLabel}
        </button>
      </motion.header>

      <motion.div
        className="lotus-hero-title"
        aria-hidden={!visible}
        inert={!visible}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
        transition={{
          duration: reducedMotion ? 0.1 : 0.8,
          delay: visible && !reducedMotion ? 0.16 : 0,
          ease: EASE,
        }}
      >
        <span>NHÀ HÀNG CHAY</span>
        <h1>HƯƠNG SEN</h1>
        <p>Thanh vị nuôi thân. An lành nuôi tâm.</p>
      </motion.div>

      <motion.aside
        className="lotus-hero-note lotus-hero-note--left"
        aria-hidden={!visible || breakpoint === "mobile"}
        animate={{ opacity: visible && breakpoint !== "mobile" ? 1 : 0 }}
      >
        <span>MÓN 01</span>
        <i />
        <p>Hạt sen<br />Rau củ thanh lành</p>
      </motion.aside>

      <motion.aside
        className="lotus-hero-note lotus-hero-note--right"
        aria-hidden={!visible || breakpoint === "mobile"}
        animate={{ opacity: visible && breakpoint !== "mobile" ? 1 : 0 }}
      >
        <span>TỪ TÂM 01</span>
        <i />
        <p>Thanh vị nuôi thân.<br />An lành nuôi tâm.</p>
      </motion.aside>

      <motion.div
        className="lotus-hero-instruction"
        aria-hidden={!visible}
        data-hovered={hovered}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
        transition={{ duration: reducedMotion ? 0.1 : 0.6, delay: visible ? 0.35 : 0 }}
      >
        <span className="lotus-hero-instruction__line" />
        <span>
          {breakpoint === "mobile"
            ? introConfig.enterLabel
            : introConfig.exploreHintLabel}
        </span>
      </motion.div>
    </>
  );
}

function ArchivalInterface() {
  const { phase, assetLoadError, beginRitual, skipIntro, reducedMotion } =
    useIntroController();
  const visible = phase === "darkness" || phase === "revealing";
  const gateVisible = phase === "darkness";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="lotus-archive-ui"
          data-phase={phase}
          initial={false}
          animate={{ opacity: phase === "revealing" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.12 : 0.62, ease: EASE }}
        >
          <div className="lotus-archive-ui__header">
            <span>HƯƠNG SEN — THANH VỊ TỪ TÂM</span>
            <button type="button" onClick={skipIntro}>
              {introConfig.skipLabel}
            </button>
          </div>
          <div className="lotus-archive-ui__measure lotus-archive-ui__measure--left">
            <span>FIG. 01</span><i /><span>DINING FORK</span>
          </div>
          <div className="lotus-archive-ui__measure lotus-archive-ui__measure--right">
            <span>ASH / ENAMEL</span><i /><span>FRONTAL PLATE</span>
          </div>
          <AnimatePresence>
            {gateVisible && !assetLoadError && (
              <motion.section
                className="lotus-archive-gate"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0.12 : 0.7, ease: EASE }}
                aria-labelledby="lotus-archive-gate-title"
              >
                <span>NHÀ HÀNG CHAY HƯƠNG SEN</span>
                <h2 id="lotus-archive-gate-title">Thanh vị từ tâm.</h2>
                <p>
                  Tại Hương Sen, mỗi món chay được chăm chút từ nguyên liệu lành,
                  hương vị Việt và sự tận tâm — để mỗi bữa ăn trở thành một
                  khoảng an yên.
                </p>
                <button type="button" onClick={beginRitual}>
                  <span>Bước vào Hương Sen</span>
                </button>
              </motion.section>
            )}
          </AnimatePresence>
          {assetLoadError && (
            <button
              className="lotus-archive-ui__fallback"
              type="button"
              onClick={skipIntro}
            >
              Không thể tải trải nghiệm — vào website
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DebugBadge() {
  const { debugEnabled, phase, breakpoint, assetProgress, reducedMotion } =
    useIntroController();
  if (!debugEnabled) return null;

  return (
    <div className="lotus-debug" aria-hidden="true">
      phase: {phase}<br />
      viewport: {breakpoint}<br />
      assets: {assetProgress}%<br />
      reduced: {String(reducedMotion)}
    </div>
  );
}

export function RestaurantIntro() {
  const {
    shouldMountIntro,
    phase,
    breakpoint,
    sceneSrc,
    forkSrc,
    assetProgress,
    assetLoadError,
    reducedMotion,
    completePreloader,
    activateEntry,
    completeIntro,
    setExitCompletionManaged,
  } = useIntroController();
  const body = useDocumentBody();
  const dialogRef = useRef<HTMLDivElement>(null);
  const fogTransitionRef = useRef<FogTransitionHandle>(null);
  const [hovered, setHovered] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 55, damping: 22, mass: 0.7 });
  const smoothY = useSpring(pointerY, { stiffness: 55, damping: 22, mass: 0.7 });
  const translateX = useTransform(smoothX, [-1, 1], [-7, 7]);
  const translateY = useTransform(smoothY, [-1, 1], [-4, 4]);
  const rotateY = useTransform(smoothX, [-1, 1], [-0.65, 0.65]);
  const rotateX = useTransform(smoothY, [-1, 1], [0.45, -0.45]);

  useMotionValueEvent(smoothX, "change", (latest) => {
    dialogRef.current?.style.setProperty(
      "--fog-pointer-x",
      `${Math.max(0, Math.min(100, (latest + 1) * 50))}%`
    );
  });

  useMotionValueEvent(smoothY, "change", (latest) => {
    dialogRef.current?.style.setProperty(
      "--fog-pointer-y",
      `${Math.max(0, Math.min(100, (latest + 1) * 50))}%`
    );
  });

  useEffect(() => {
    if (!shouldMountIntro || !body) return;
    const frame = window.requestAnimationFrame(() => dialogRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [body, shouldMountIntro]);

  if (!shouldMountIntro || !body) return null;

  const isRevealing = phase === "revealing";
  const isInteractive = phase === "idle";
  const isActivating = phase === "activating";
  const isEntering = phase === "entering";
  const heroVisible = isRevealing || isInteractive || isActivating;

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reducedMotion || breakpoint === "mobile" || !isInteractive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width;
    const normalizedY = (event.clientY - rect.top) / rect.height;
    pointerX.set(normalizedX * 2 - 1);
    pointerY.set(normalizedY * 2 - 1);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  function executeExistingDishClick() {
    setHovered(false);
    activateEntry();
  }

  function activateDish() {
    const fogTransition = fogTransitionRef.current;
    if (!fogTransition) {
      setExitCompletionManaged(false);
      executeExistingDishClick();
      return;
    }
    setExitCompletionManaged(true);
    fogTransition.play(executeExistingDishClick);
  }

  return createPortal(
    <motion.div
      ref={dialogRef}
      className="intro-shell intro-shell--lotus"
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-label={`Giới thiệu ${introConfig.brandName}`}
      tabIndex={-1}
      animate={{ opacity: phase === "completed" ? 0 : 1 }}
      transition={{ duration: reducedMotion ? 0.12 : 0.42, ease: EASE }}
      style={{ pointerEvents: phase === "completed" ? "none" : "auto" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="lotus-stage">
          <motion.div
            className="lotus-stage__camera"
            style={
              reducedMotion || breakpoint === "mobile"
                ? undefined
                : { x: translateX, y: translateY, rotateX, rotateY }
            }
            animate={{
              opacity: isEntering ? 0 : 1,
              scale: isActivating && !reducedMotion ? 1.1 : 1.025,
              filter: isActivating
                ? "blur(2px) brightness(0.84)"
                : "blur(0px) brightness(1)",
            }}
            transition={{ duration: reducedMotion ? 0.12 : 1.25, ease: EASE }}
          >
            <motion.div
              className="lotus-stage__plate lotus-stage__plate--dark"
              initial={false}
              animate={{ opacity: heroVisible ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0.12 : 0.95, ease: EASE }}
            >
              <Image
                src={sceneSrc}
                alt="Cơm sen thanh vị của Nhà hàng chay Hương Sen"
                fill
                priority
                sizes="100vw"
                unoptimized
              />
            </motion.div>

            <motion.div
              className="lotus-stage__plate lotus-stage__plate--spotlit"
              initial={false}
              animate={{ opacity: isInteractive && hovered ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0.12 : 0.48, ease: EASE }}
              aria-hidden="true"
            >
              <Image src={sceneSrc} alt="" fill priority sizes="100vw" unoptimized />
            </motion.div>
          </motion.div>

          <motion.div
            className="lotus-stage__atmosphere"
            data-lit={isInteractive && hovered}
            animate={{ opacity: heroVisible ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.8, ease: EASE }}
            aria-hidden="true"
          >
            <span className="lotus-stage__mist lotus-stage__mist--back" />
            <span className="lotus-stage__mist lotus-stage__mist--left" />
            <span className="lotus-stage__mist lotus-stage__mist--right" />
            <span className="lotus-stage__mist lotus-stage__mist--front" />
          </motion.div>

          <motion.div
            className="lotus-stage__cursor-light"
            animate={{ opacity: isInteractive ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.42, ease: EASE }}
            aria-hidden="true"
          />

          <motion.div
            className="lotus-stage__vignette"
            animate={{ opacity: heroVisible ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.8 }}
            aria-hidden="true"
          />

          <motion.div
            className="lotus-stage__spotlight"
            animate={{ opacity: isInteractive && hovered ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.48, ease: EASE }}
            aria-hidden="true"
          >
            <span className="lotus-stage__beam" />
            <span className="lotus-stage__beam-core" />
            <span className="lotus-stage__light-dust" />
            <span className="lotus-stage__light-pool" />
            <span className="lotus-stage__orbit lotus-stage__orbit--one" />
            <span className="lotus-stage__orbit lotus-stage__orbit--two" />
            <span className="lotus-stage__orbit lotus-stage__orbit--three" />
          </motion.div>

          <div className="lotus-stage__grain" aria-hidden="true" />

          <button
            type="button"
            className="lotus-keeper-target"
            disabled={!isInteractive}
            aria-label="Khám phá món chay và bước vào website Hương Sen"
            data-hovered={hovered}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            onClick={activateDish}
          >
          </button>

          <HeroInterface hovered={hovered} />

        {phase === "loading" && (
          <ForkPreloader
            assetProgress={assetProgress}
            assetLoadError={assetLoadError}
            forkRealSrc={forkSrc}
            headline={["TỪ TÂM", "THÀNH VỊ", "HƯƠNG SEN"]}
            minimumDuration={introConfig.preloader.minimumDurationMs}
            reducedMotion={reducedMotion}
            onComplete={completePreloader}
          />
        )}

        <ArchivalInterface />

        <FogTransitionOverlay
          ref={fogTransitionRef}
          destinationReady={phase === "entering"}
          reducedMotion={reducedMotion}
          revealX="50%"
          revealY="52%"
          onRevealComplete={completeIntro}
        />
      </div>

      <DebugBadge />
    </motion.div>,
    body
  );
}
