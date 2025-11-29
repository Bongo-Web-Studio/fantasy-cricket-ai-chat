import React, { useEffect, useMemo, useRef, useState } from "react";

// Types
export interface Player {
  id: string;
  name: string;
  age: number;
  formats?: string[];
  runs2025?: { IPL?: number; ODI?: number };
  battingAverage?: { IPL?: number; ODI?: number };
  strikeRate?: { IPL?: number; ODI?: number };
  recentScores?: Array<number | string>;
  highestScore?: { IPL?: string; ODI?: string };
  fantasyProjection?: number[];
  achievements?: string[];
  imageUrl?: string;
  recommendation?: string;
  dream11PPG?: Record<string, number>;
}

// Small placeholder for FormOverlay used in the original file
const FormOverlay: React.FC<{ scores: string[] }> = ({ scores }) => (
  <div className="absolute left-4 bottom-4 bg-white/75 backdrop-blur-sm rounded px-3 py-1 text-xs shadow">
    {scores.join(" • ")}
  </div>
);

// Default player data (fully populated to allow safe merging)
const DEFAULT_VIRAT: Player = {
  id: "virat",
  name: "Virat Kohli",
  age: 37,
  formats: ["T20", "ODI"],
  runs2025: { IPL: 657, ODI: 349 },
  battingAverage: { IPL: 54.75, ODI: 43.62 },
  strikeRate: { IPL: 144.71, ODI: 83.29 },
  recentScores: [74, 54, 62, 51, 43],
  highestScore: { IPL: "73*", ODI: "100*" },
  fantasyProjection: [43, 73],
  achievements: ["51 international centuries", "Very consistent with not-outs"],
  imageUrl: "/virat.png",
  recommendation:
    "Recommended for your fantasy cricket team due to consistent form and high fantasy output. His experience and recent performances suggest he will contribute high fantasy points, especially if the batting conditions are favorable and he bats in the top order.",
};

function parseScoreToNumber(s: number | string | undefined): number {
  if (typeof s === "number") return s;
  if (!s) return 0;
  const cleaned = String(s).replace(/\*/g, "");
  const parsed = parseInt(cleaned, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

type Props = {
  player?: Partial<Player>; // accept partial and merge with defaults
  className?: string;
};

export default function ViratKohliCard({ player, className = "" }: Props) {
  // Merge incoming player (partial) with defaults to guarantee fields
  const p: Player = useMemo(() => ({ ...DEFAULT_VIRAT, ...(player ?? {}) }), [player]);

  // Create guaranteed string locals for JSX to avoid `string | undefined`
  const safeIdBase = `player-${String(p.id ?? DEFAULT_VIRAT.id)}`;
  const safeTitleId = `${safeIdBase}-title`;
  const safeName = String(p.name ?? DEFAULT_VIRAT.name);
  const safeImageSrc = String(p.imageUrl ?? DEFAULT_VIRAT.imageUrl);

  // Refs for DOM transforms
  const cardRef = useRef<HTMLElement | null>(null);
  const avatarRef = useRef<HTMLImageElement | null>(null);
  const headerRef = useRef<HTMLImageElement | null>(null); // <-- will be attached to the big image
  const rafRef = useRef<number | null>(null);

  // Hover state (keeps behavior similar to original)
  const [isHover, setIsHover] = useState(false);

  // Derived numeric arrays and stats memoized for safety/perf
  const recentNums = useMemo(() => (p.recentScores ?? []).map((s) => parseScoreToNumber(s)), [p.recentScores]);

  const avgConsistency = useMemo(() => {
    if (!recentNums.length) return 0;
    const sum = recentNums.reduce((a, b) => a + b, 0);
    return Math.round(sum / recentNums.length);
  }, [recentNums]);

  const maxRecent = useMemo(() => (recentNums.length ? Math.max(...recentNums) : 0), [recentNums]);

  const projectedAvgPts = useMemo(() => {
    const arr = p.fantasyProjection ?? [];
    if (!arr.length) return 0;
    const sum = arr.reduce((a, b) => a + b, 0);
    return Math.round(sum / arr.length);
  }, [p.fantasyProjection]);

  const strikeIPL = Math.round(p.strikeRate?.IPL ?? 0);
  const strikeODI = Math.round(p.strikeRate?.ODI ?? 0);
  const maxSR = 180;
  const strikePct = (val: number) => Math.min(100, Math.round((val / maxSR) * 100));

  // Pure UI derived strings (always produce a string)
  const recentScoresText: string = useMemo(
    () => (p.recentScores && p.recentScores.length ? p.recentScores.join(" • ") : "—"),
    [p.recentScores]
  );

  const formatsText: string = useMemo(() => (p.formats && p.formats.length ? p.formats.join(" • ") : "—"), [p.formats]);

  const dream11Text: string = useMemo(() => {
    if (!p.dream11PPG || Object.keys(p.dream11PPG).length === 0) return "—";
    return Object.entries(p.dream11PPG)
      .map(([fmt, val]) => `${fmt}: ${val}`)
      .join(" • ");
  }, [p.dream11PPG]);

  // Animation/interaction constants
  const MAX_ROT = 12;
  const POPOUT_Z = 36;
  const TRANSITION_MS = 450;

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;

    const rotateY = ((x - halfWidth) / halfWidth) * MAX_ROT;
    const rotateX = (-(y - halfHeight) / halfHeight) * MAX_ROT;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`;

      if (avatarRef.current) {
        avatarRef.current.style.transform = `translateZ(${POPOUT_Z}px) scale(1.03)`;
      }
      if (headerRef.current) {
        headerRef.current.style.transform = `translateZ(${POPOUT_Z / 1.8}px)`;
      }
    });
  }

  function handleMouseEnter() {
    setIsHover(true);
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 120ms cubic-bezier(.2,1,.2,1)";
      cardRef.current.style.willChange = "transform";
      (cardRef.current as HTMLElement).style.transformStyle = "preserve-3d";
    }

    if (avatarRef.current) {
      avatarRef.current.style.transition = "transform 350ms cubic-bezier(.22,1,.36,1)";
      avatarRef.current.style.transformStyle = "preserve-3d";
      avatarRef.current.style.backfaceVisibility = "hidden";
    }

    if (headerRef.current) {
      headerRef.current.style.transition = "transform 350ms cubic-bezier(.22,1,.36,1)";
      headerRef.current.style.transformStyle = "preserve-3d";
      headerRef.current.style.backfaceVisibility = "hidden";
    }
  }

  function resetTransforms() {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (cardRef.current) {
      cardRef.current.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(.2,.9,.3,1)`;
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
    }
    if (avatarRef.current) {
      avatarRef.current.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(.2,.9,.3,1)`;
      avatarRef.current.style.transform = `translateZ(0) scale(1)`;
    }
    if (headerRef.current) {
      headerRef.current.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(.2,.9,.3,1)`;
      headerRef.current.style.transform = `translateZ(0)`;
    }

    setIsHover(false);
  }

  function handleMouseLeave() {
    resetTransforms();
  }

  return (
    <article
      ref={cardRef as React.RefObject<HTMLElement>}
      aria-labelledby={safeTitleId}
      id={safeIdBase}
      className={`bg-white border border-gray-200 rounded-2xl p-3 flex flex-col gap-3 h-full transform-gpu cursor-grab ${String(
        className ?? ""
      )}`}
      role="region"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => {
        if (cardRef.current) cardRef.current.style.transition = `transform ${TRANSITION_MS}ms`;
        if (cardRef.current) cardRef.current.style.transform = `perspective(1000px) scale(1.02)`;
      }}
      onTouchEnd={() => resetTransforms()}
    >
      <header className="flex gap-3 items-start bg-gray-100 border  border-gray-200 rounded-xl p-2 relative">
        <figure className="flex-none w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
          <img
            ref={avatarRef}
            src={safeImageSrc}
            alt={`${safeName} — player photo`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const el = e.currentTarget as any ;
              if (el.src !== DEFAULT_VIRAT.imageUrl) el.src = DEFAULT_VIRAT.imageUrl;
            }}
            style={{ transform: "translateZ(0)", willChange: "transform" }}
          />
        </figure>

        <div className="flex-1 min-w-0">
          <h1
            id={safeTitleId}
            className="text-lg font-semibold truncate text-black"
            style={{
              fontFamily: "PPEditorialNew, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
            }}
          >
            {safeName}
          </h1>

          <div className="mt-2 text-sm text-gray-600 space-y-1">
            <div>
              <span className="font-medium text-gray-700">Age:</span>{" "}
              <span>{String(p.age ?? DEFAULT_VIRAT.age)}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Formats:</span>{" "}
              <span>{formatsText}</span>
            </div>
          </div>
        </div>

        <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full" />
      </header>

      <div className="relative rounded-2xl border border-gray-200 overflow-hidden flex-1">
        <img
          ref={headerRef}
          src={safeImageSrc}
          alt={`${safeName} action`}
          className="w-full h-full object-cover"
          style={{ minHeight: 160, transform: "translateZ(0)", willChange: "transform" }}
        />

        <div className="absolute top-1 left-3 text-white rounded-lg max-w-[85%]">
          <h2 className="text-[17px] font-semibold">Form Trend (Last 5 Matches)</h2>
          <p className="text-[19px] mt-2 ml-7">{recentScoresText}</p>
        </div>
      </div>
    </article>
  );
}
