// ViratCard.tsx
import React, { useMemo, useRef, useState } from "react";

export type Player = {
  id?: string;
  name: string;
  age?: number;
  formats?: string[];
  recentScores?: (number | string)[];
  dream11PPG?: Record<string, number>;
  strikeRate?: string;
  battingAverage?: string;
  imageUrl?: string;
  matchContext?: string;
};

type Props = {
  playerData?: Player;
  className?: string;
};

const VIRAT_KOHLI: Player = {
  id: "virat-kohli",
  name: "Virat Kohli",
  age: 37,
  formats: ["T20", "ODI"],
  recentScores: ["74*", "54", "62*", "51", "43"],
  dream11PPG: { T20: 46, ODI: 69 },
  strikeRate: "130+ (T20), ~90 (ODI)",
  battingAverage: "~30-40 (T20), ~50-60 (ODI)",
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnBYbJ8p44d0ic3l6GvwXk0-tmu1qoji2PtwyTXzgxrY6G1bCjlZxsKMrMaqWOckL_0iSXmdh3JIthU6-faWk92tU86sJFZ31aK9ZAJlo&s=10",
  matchContext:
    "Week 9: batting-friendly venues, flat pitches and shorter boundaries that favour his style.",
};

export default function ViratCard({ playerData, className = "" }: Props) {
  const player = playerData ?? VIRAT_KOHLI;

  const recentScoresText = useMemo(
    () =>
      player.recentScores && player.recentScores.length
        ? player.recentScores.join(" • ")
        : "—",
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

  // Note: use HTMLElement for generic article if your TS config lacks DOM lib
  const cardRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const headerRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isHover, setIsHover] = useState(false);

  const MAX_ROT = 12;
  const POPOUT_Z = 36;
  const TRANSITION_MS = 450;

  function handleMouseMove(e: React.MouseEvent) {
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
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
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

  return (
    <article
      ref={cardRef as unknown as React.RefObject<HTMLElement>}
      aria-labelledby={`player-${player.id ?? "unknown"}-name`}
      className={`bg-white border border-gray-200 rounded-2xl p-3 flex flex-col gap-3 h-full transform-gpu cursor-grab ${className}`}
      role="region"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => {
        if (cardRef.current) (cardRef.current as HTMLElement).style.transition = `transform ${TRANSITION_MS}ms`;
        if (cardRef.current) (cardRef.current as HTMLElement).style.transform = `perspective(1000px) scale(1.02)`;
      }}
      onTouchEnd={() => resetTransforms()}
    >
      <header className="flex gap-3 items-start bg-gray-100 border  border-gray-200 rounded-xl p-2 relative">
        <figure className="flex-none w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
          <img
            ref={imgRef}
            src={imageSrc}
            alt={player.name ? `${player.name} — player photo` : "player photo"}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/virat.png";
            }}
            style={{ transform: "translateZ(0)", willChange: "transform" }}
          />
        </figure>

        <div className="flex-1 min-w-0">
          <h1
            id={`player-${player.id ?? "unknown"}-name`}
            className="text-lg font-semibold truncate"
            style={{ fontFamily: "PPEditorialNew, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto" }}
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

        <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"></div>
      </header>

      <div className="relative rounded-2xl border border-gray-200 overflow-hidden flex-1">
        <img
          ref={headerRef}
          src="/virat.png"
          alt={`${player.name} action`}
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
