// SinglePlayerResponseClean.tsx
"use client";

import React from "react";
import ViratCard from "./ViratCard";

type Player = {
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
  onSelect?: (player?: Player, selected?: boolean) => void;
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
    "Match Context - Week 9: Playing in batting-friendly venues with a balanced bowling attack. Flat pitches and shorter boundaries favor his style.",
};

const SinglePlayerResponseClean: React.FC<Props> = ({ playerData, onSelect }) => {
  // Build a safe player object (falls back to VIRAT_KOHLI)
  const player: Player = {
    id: playerData?.id ?? VIRAT_KOHLI.id,
    name: playerData?.name ?? VIRAT_KOHLI.name,
    age: playerData?.age ?? VIRAT_KOHLI.age,
    formats: playerData?.formats ?? VIRAT_KOHLI.formats,
    recentScores: playerData?.recentScores ?? VIRAT_KOHLI.recentScores,
    dream11PPG: playerData?.dream11PPG ?? VIRAT_KOHLI.dream11PPG,
    strikeRate: playerData?.strikeRate ?? VIRAT_KOHLI.strikeRate,
    battingAverage: playerData?.battingAverage ?? VIRAT_KOHLI.battingAverage,
    imageUrl: playerData?.imageUrl ?? VIRAT_KOHLI.imageUrl,
    matchContext: playerData?.matchContext ?? VIRAT_KOHLI.matchContext,
  };

  // Safely get values/entries from dream11PPG (guarantee non-undefined object)
  const safeDream = player.dream11PPG ?? ({} as Record<string, number>);
  const dreamValues = Object.values(safeDream);
  const dreamEntries = Object.entries(safeDream);

  const projectionText = (() => {
    if (dreamValues.length === 0) return "80 - 100 Points Expected";
    const avg = dreamValues.reduce((s, v) => s + v, 0) / dreamValues.length;
    const low = Math.max(0, Math.round(avg - 15));
    const high = Math.round(avg + 15);
    return `${low} - ${high} Points Expected`;
  })();

  const handleSelect = (selected = true) => {
    onSelect?.(player, selected);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-md overflow-hidden border border-gray-200 font-sans text-gray-800">
      <div className="w-full h-full flex">
        <div className="w-[37%] p-2 overflow-hidden border border-gray-200 bg-gray-100">
          {/* show the same player in the card */}
          <ViratCard playerData={player} />
        </div>

        <div className="w-[63%] p-2 h-full border-t border-b border-r border-gray-200">
          <div className="w-full flex h-[50%]">
            <div className="w-[50%] bg-white border border-gray-200">
              {/* Key Stats */}
              <section className="p-2">
                <h2 style={{ fontFamily: "PPEditorialNew" }} className="text-xl mb-3 text-[#091717]">
                  Key Stats
                </h2>
                <ul className="space-y-3 text-sm">
                  <li>
                    <span className="font-medium">Recent Scores:</span>{" "}
                    {player.recentScores && player.recentScores.length
                      ? player.recentScores.map((s) => String(s)).join(", ")
                      : "—"}
                  </li>

                  <li>
                    <span className="font-medium">Dream11 PPG:</span>{" "}
                    {dreamEntries.length
                      ? dreamEntries.map(([fmt, v]) => `${fmt}: ~${Math.round(v)}`).join(", ")
                      : "—"}
                  </li>

                  <li>
                    <span className="font-medium">Strike Rate:</span> {player.strikeRate ?? "—"}
                  </li>

                  <li>
                    <span className="font-medium">Batting Average:</span> {player.battingAverage ?? "—"}
                  </li>
                </ul>
              </section>
            </div>

            <div className="w-[50%] bg-white border-t border-b border-r border-gray-200">
              {/* Fantasy Points Projection */}
              <section className="p-2 border-b border-gray-200 flex flex-col">
                <h2 style={{ fontFamily: "PPEditorialNew" }} className="text-xl mb-3 text-center text-[#091717]">
                  Fantasy Points Projection
                </h2>
                <div className="bg-gray-100 border border-gray-200 p-4 text-center font-bold text-xl h-[4cm] relative">
                  <div className="absolute bottom-0 left-[20%] bg-[#2795A2]/30 w-[1cm] h-[1.2cm] border-t border-l border-r border-[#2795A2]">
                    <h1 className="text-[#2795A2]">43</h1>
                  </div>

                  <div className="absolute bottom-0 right-[30%] bg-[#2795A2]/30 w-[1cm] h-[2.7cm] border-t border-l border-r border-[#2795A2]">
                    <h1 className="text-[#2795A2]">73</h1>
                  </div>

                </div>
              </section>
            </div>
          </div>

          {/* Match Context */}
          <section className="p-2 border-b border-gray-200 flex h-[5.5cm] bg-gray-100 w-full justify-end items-end">
            <div className="w-full h-full">
              <section className="p-2 bg-white text-start rounded-lg border border-gray-200">
                <h1 style={{ fontFamily: "PPEditorialNew" }} className="text-xl text-[#091717]">
                  Strong Pick for Week 9:
                </h1>
                <p className="text-lg text-gray-600 max-w-[11.5cm] ml-3">
                  Recommended for your fantasy cricket team due to consistent form and high fantasy output. His experience and recent performances
                  suggest he will contribute high fantasy points, especially if the batting conditions are favorable and he bats in the top order.
                </p>

            
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SinglePlayerResponseClean;
