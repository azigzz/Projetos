import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownRight, Mail, Sparkles } from "lucide-react";
import { PillButton } from "./PillButton";

const FRAME_COUNT = 121;
const SCROLL_HEIGHT = "320vh";
const SMOOTHING = 0.045;
const MOMENTUM_MULTIPLIER = 1.35;
const MAX_VIRTUAL_LEAD = 0.095;

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

const copyByProgress = [
  "Cada projeto começa como uma ideia.",
  "A ideia vira uma página.",
  "Cada página guarda um projeto.",
  "E cada projeto pode virar um site real.",
];

function getScrollProgress(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  const scrollableDistance = Math.max(rect.height - window.innerHeight, 1);

  return clamp01(-rect.top / scrollableDistance);
}

function drawCoverImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  alpha = 1,
) {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const canvasRatio = canvasWidth / canvasHeight;
  const imageRatio = image.naturalWidth / image.naturalHeight;

  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > canvasRatio) {
    sourceWidth = image.naturalHeight * canvasRatio;
    sourceX = (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = image.naturalWidth / canvasRatio;
    sourceY = (image.naturalHeight - sourceHeight) / 2;
  }

  context.save();
  context.globalAlpha = alpha;
  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    canvasWidth,
    canvasHeight,
  );
  context.restore();
}

export function BookIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedFramesRef = useRef<Set<number>>(new Set());
  const lastDrawnPositionRef = useRef(-1);
  const [progress, setProgress] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  const activeCopy = useMemo(() => {
    if (progress < 0.24) return copyByProgress[0];
    if (progress < 0.48) return copyByProgress[1];
    if (progress < 0.74) return copyByProgress[2];
    return copyByProgress[3];
  }, [progress]);

  const introCopyOpacity = 1 - clamp01((progress - 0.76) / 0.12);
  const portfolioOpacity = clamp01((progress - 0.9) / 0.08);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;

    if (!canvas || !section) {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    let animationFrame = 0;
    let physicalProgress = getScrollProgress(section);
    let targetProgress = physicalProgress;
    let smoothedProgress = targetProgress;
    let isNearViewport = false;
    let isDisposed = false;
    let lastReportedProgress = -1;

    const getDrawableFrame = (frameIndex: number) => {
      const exactImage = imagesRef.current[frameIndex];

      if (exactImage?.complete && exactImage.naturalWidth) {
        return frameIndex;
      }

      for (let offset = 1; offset <= 10; offset += 1) {
        const previousIndex = frameIndex - offset;
        const nextIndex = frameIndex + offset;
        const previousImage = imagesRef.current[previousIndex];
        const nextImage = imagesRef.current[nextIndex];

        if (previousImage?.complete && previousImage.naturalWidth) {
          return previousIndex;
        }

        if (nextImage?.complete && nextImage.naturalWidth) {
          return nextIndex;
        }
      }

      return lastDrawnPositionRef.current >= 0 ? Math.round(lastDrawnPositionRef.current) : 0;
    };

    const drawFrame = (framePosition: number) => {
      if (Math.abs(framePosition - lastDrawnPositionRef.current) < 0.015) {
        return;
      }

      const lowerTarget = Math.floor(framePosition);
      const upperTarget = Math.ceil(framePosition);
      const lowerIndex = getDrawableFrame(lowerTarget);
      const upperIndex = getDrawableFrame(upperTarget);
      const lowerImage = imagesRef.current[lowerIndex];
      const upperImage = imagesRef.current[upperIndex];
      const blend = clamp01(framePosition - lowerTarget);

      if (!lowerImage?.complete || !lowerImage.naturalWidth) {
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      drawCoverImage(context, lowerImage, canvas);

      if (
        upperIndex !== lowerIndex &&
        upperImage?.complete &&
        upperImage.naturalWidth &&
        blend > 0.01
      ) {
        drawCoverImage(context, upperImage, canvas, blend);
      }

      lastDrawnPositionRef.current = framePosition;
    };

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const nextWidth = Math.max(1, Math.round(width * pixelRatio));
      const nextHeight = Math.max(1, Math.round(height * pixelRatio));

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
        lastDrawnPositionRef.current = -1;
      }
    };

    const updateTargetProgress = (
      useMomentum: boolean,
      measuredProgress = getScrollProgress(section),
    ) => {
      const nextPhysicalProgress = measuredProgress;
      const scrollDelta = nextPhysicalProgress - physicalProgress;

      physicalProgress = nextPhysicalProgress;

      if (useMomentum && Math.abs(scrollDelta) > 0.0001) {
        const proposedTarget = targetProgress + scrollDelta * MOMENTUM_MULTIPLIER;

        if (scrollDelta > 0) {
          targetProgress = clamp01(
            Math.min(nextPhysicalProgress + MAX_VIRTUAL_LEAD, Math.max(nextPhysicalProgress, proposedTarget)),
          );
        } else {
          targetProgress = clamp01(
            Math.max(nextPhysicalProgress - MAX_VIRTUAL_LEAD, Math.min(nextPhysicalProgress, proposedTarget)),
          );
        }

        return;
      }

      targetProgress = nextPhysicalProgress;
    };

    const updateOverlay = (nextProgress: number) => {
      if (!overlayRef.current) {
        return;
      }

      const opacity = clamp01((nextProgress - 0.85) / 0.15);
      overlayRef.current.style.opacity = opacity.toFixed(3);
    };

    const tick = () => {
      if (isDisposed || !isNearViewport) {
        animationFrame = 0;
        return;
      }

      const measuredProgress = getScrollProgress(section);

      if (Math.abs(measuredProgress - physicalProgress) > 0.0001) {
        updateTargetProgress(true, measuredProgress);
      }

      smoothedProgress += (targetProgress - smoothedProgress) * SMOOTHING;
      smoothedProgress = clamp01(smoothedProgress);

      const framePosition = smoothedProgress * (FRAME_COUNT - 1);

      drawFrame(framePosition);
      updateOverlay(smoothedProgress);

      if (Math.abs(smoothedProgress - lastReportedProgress) > 0.008) {
        setProgress(smoothedProgress);
        lastReportedProgress = smoothedProgress;
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    const stop = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const handleScroll = () => {
      updateTargetProgress(true);

      if (isNearViewport) {
        start();
      }
    };

    const handleResize = () => {
      resizeCanvas();
      updateTargetProgress(false);

      if (isNearViewport) {
        start();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry.isIntersecting;

        if (isNearViewport) {
          handleResize();
          start();
        } else {
          stop();
        }
      },
      {
        root: null,
        rootMargin: "80% 0px 80% 0px",
        threshold: 0,
      },
    );

    resizeCanvas();
    observer.observe(section);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    const framePaths = Array.from(
      { length: FRAME_COUNT },
      (_, index) => `/book-frames/frame_${String(index + 1).padStart(4, "0")}.jpg`,
    );

    imagesRef.current = framePaths.map((src, index) => {
      const image = new Image();

      image.decoding = "async";
      image.src = src;
      image.onload = () => {
        loadedFramesRef.current.add(index);

        if (index === 0) {
          setFirstFrameReady(true);
          drawFrame(0);
        }
      };

      return image;
    });

    handleResize();

    return () => {
      isDisposed = true;
      stop();
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cover text-cream"
      style={{ height: SCROLL_HEIGHT }}
      aria-label="Introducao com livro"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-cover">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />

        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            firstFrameReady ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundImage: "url('/images/book-poster.svg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/15" aria-hidden="true" />
        <div ref={overlayRef} className="absolute inset-0 bg-page opacity-0" aria-hidden="true" />

        <div
          className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-between px-6 py-16 text-center"
          style={{ opacity: introCopyOpacity }}
          aria-hidden={portfolioOpacity > 0.5}
        >
          <div />

          <p className="max-w-2xl font-serif text-3xl leading-tight text-cream drop-shadow-2xl sm:text-5xl">
            {activeCopy}
          </p>

          <div className="rounded-full border border-cream/45 bg-black/20 px-4 py-2 text-xs font-semibold uppercase text-cream/90">
            Role para abrir
          </div>
        </div>

        <div
          id="portfolio"
          className="paper-texture absolute inset-0 z-20 flex items-center bg-page px-5 py-16 text-ink sm:px-8"
          style={{
            opacity: portfolioOpacity,
            pointerEvents: portfolioOpacity > 0.95 ? "auto" : "none",
          }}
          aria-hidden={portfolioOpacity < 0.5}
        >
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 border border-ink bg-cream px-4 py-2 text-sm font-semibold shadow-soft">
                <Sparkles aria-hidden="true" size={17} />
                Portfólio de projetos
              </div>
              <h1 className="font-serif text-5xl leading-[1.02] text-ink sm:text-7xl lg:text-8xl">
                Meus sites, sistemas e ideias.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/78 sm:text-xl">
                Projetos simples de entender, bonitos de ver e fáceis de usar.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PillButton href="https://sstudyflow.netlify.app/" icon={<ArrowDownRight size={18} />}>
                Ver StudyFlow
              </PillButton>
              <PillButton href="#contato" variant="outline" icon={<Mail size={18} />}>
                Entrar em contato
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
