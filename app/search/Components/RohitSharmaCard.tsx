import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Types
 */
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

type Props = {
  player?: Player;
  className?: string;
};

/**
 * Small FormOverlay (kept as placeholder)
 */
const FormOverlay: React.FC<{ scores: string[] }> = ({ scores }) => (
  <div className="absolute left-4 bottom-4 bg-white/75 backdrop-blur-sm rounded px-3 py-1 text-xs shadow">
    {scores.join(" • ")}
  </div>
);

/**
 * Default player
 */
const DEFAULT_ROHIT: Player = {
  id: "rohit",
  name: "Rohit Sharma",
  age: 36,
  formats: ["T20", "ODI"],
  runs2025: { IPL: 418, ODI: 504 },
  battingAverage: { IPL: 29.85, ODI: 50.4 },
  strikeRate: { IPL: 149.28, ODI: 97.86 },
  recentScores: [81, 49, 35, 42, 60],
  highestScore: { IPL: "81", ODI: "121*" },
  fantasyProjection: [38, 65],
  achievements: ["32 international centuries", "IPL record-holder"],
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWhTyJbSXaDECwjuOOxfdTlCK7Ysr2D1-OmA&s",
  recommendation:
    "Bolt option for captains who need explosive upside. Rohit’s strike rate and boundary capability give high ceiling fantasy returns in short formats if conditions favor power-hitting.",
};

function parseScoreToNumber(s: number | string | undefined): number {
  if (typeof s === "number") return s;
  if (!s) return 0;
  const cleaned = String(s).replace(/\*/g, "");
  const parsed = parseInt(cleaned, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function RohitSharmaCard({ player = DEFAULT_ROHIT, className = "" }: Props) {
  // Refs: use HTMLElement for the article element (HTMLArticleElement doesn't exist)
  const cardRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const headerRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Hover state (optional)
  const [isHover, setIsHover] = useState(false);

  // Constants for interaction
  const MAX_ROT = 12; // degrees
  const POPOUT_Z = 36; // px
  const TRANSITION_MS = 450;

  // Derived text values
  const recentScoresText = useMemo(
    () => (player.recentScores && player.recentScores.length ? player.recentScores.join(" • ") : "—"),
    [player.recentScores]
  );

  const formatsText = useMemo(
    () => (player.formats && player.formats.length ? player.formats.join(" • ") : "—"),
    [player.formats]
  );

  const dream11Text = useMemo(() => {
    if (!player.dream11PPG || Object.keys(player.dream11PPG).length === 0) return "—";
    return Object.entries(player.dream11PPG)
      .map(([fmt, val]) => `${fmt}: ${val}`)
      .join(" • ");
  }, [player.dream11PPG]);

  const imageSrc = player.imageUrl ?? "/virat.png";

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  // Mouse move -> compute rotation
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
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(
        2
      )}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`;

      if (imgRef.current) {
        imgRef.current.style.transform = `translateZ(${POPOUT_Z}px) scale(1.03)`;
      }
      if (headerRef.current) {
        headerRef.current.style.transform = `translateZ(${(POPOUT_Z / 1.8).toFixed(2)}px)`;
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

    if (imgRef.current) {
      imgRef.current.style.transition = "transform 350ms cubic-bezier(.22,1,.36,1)";
      imgRef.current.style.transformStyle = "preserve-3d";
      imgRef.current.style.backfaceVisibility = "hidden";
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
    if (imgRef.current) {
      imgRef.current.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(.2,.9,.3,1)`;
      imgRef.current.style.transform = `translateZ(0) scale(1)`;
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

  const overlayScores = player.recentScores?.map((s) => String(s)) ?? [];

  return (
    <article
      ref={cardRef}
      aria-labelledby={`player-${player.id ?? "unknown"}-name`}
      className={`bg-white border border-gray-200 rounded-2xl p-3 flex flex-col gap-3 h-[13.9cm] transform-gpu cursor-grab ${className}`}
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
      <header className="flex gap-3 items-start bg-gray-100 border border-gray-200 rounded-xl p-2 relative">
        <figure className="flex-none w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
          <img
            ref={imgRef}
            src={imageSrc}
            alt={player.name ? `${player.name} — player photo` : "player photo"}
            className="w-full h-full object-cover"
            onError={(e) => {
              // fallback to default avatar in case the provided URL fails
              (e.currentTarget as HTMLImageElement).src = "/virat.png";
            }}
            style={{ transform: "translateZ(0)", willChange: "transform" }}
          />
        </figure>

        <div className="flex-1 min-w-0">
          <h1
            id={`player-${player.id ?? "unknown"}-name`}
            className="text-lg font-semibold truncate text-black"
            style={{
              fontFamily:
                "PPEditorialNew, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
            }}
          >
            {player.name}
          </h1>

          <div className="mt-2 text-sm text-gray-600 space-y-1">
            <div>
              <span className="font-medium text-gray-700">Age:</span>{" "}
              <span>{player.age ?? "—"}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Formats:</span>{" "}
              <span>{formatsText}</span>
            </div>
          </div>
        </div>

        <div
          aria-hidden={!isHover}
          className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"
          title="player available"
        />
      </header>

      <div className="relative rounded-2xl border border-gray-200 overflow-hidden flex-1">
        <img
          ref={headerRef}
          src={imageSrc}
          alt={`${player.name} action`}
          className="w-full h-full object-cover"
          style={{ minHeight: 160, transform: "translateZ(0)", willChange: "transform" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/virat.png";
          }}
        />

        <div className="absolute top-1 left-3 text-white rounded-lg max-w-[85%]">
          <h2 className="text-[17px] font-semibold">Form Trend (Last 5 Matches)</h2>
          <p className="text-[19px] mt-2 ml-7">{recentScoresText}</p>
        </div>


      </div>
    </article>
  );
}
