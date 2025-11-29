// Suggestions.tsx
"use client";

import React, { useState } from "react";
import SuggestionPanel from "./SuggestionPanel";
import SinglePlayerResponsePerplexityStyle from "./SinglePlayerResponse";
// adjust the import path if Player is defined in another file:
import type { Player } from "./ViratCard";

type Props = {
  onSelect?: (text: string) => void;
};

const SUGGESTIONS = [
  "Should I pick Virat Kohli for week 9?",
  "Virat Kohli vs Rohit Sharma for week 9",
];

export default function Suggestions({ onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (text: string) => {
    onSelect?.(text);
    setSelected(text);
  };

  // create a Player-shaped object
  const fakePlayer: Player = {
    id: "virat-kohli",
    name: "Virat Kohli",                 // required by Player
    age: 37,
    formats: ["T20", "ODI"],
    recentScores: ["74*", "54", "62*", "51", "43"],
    dream11PPG: { T20: 46, ODI: 69 },
    strikeRate: "130+ (T20), ~90 (ODI)",
    battingAverage: "~30-40 (T20), ~50-60 (ODI)",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnBYbJ8p44d0ic3l6GvwXk0-tmu1qoji2PtwyTXzgxrY6G1bCjlZxsKMrMaqWOckL_0iSXmdh3JIthU6-faWk92tU86sJFZ31aK9ZAJlo&s=10",
    // Player.matchContext in your earlier type was a string — serialize the context to keep types correct
    matchContext: "Opp: SA • Venue: Mumbai • Date: 2025-11-29 • avgVsOpponent: 65.39",
  };

  // If you still want to show stats/projection, keep them separate:
  const extra = {
    stats: { average: 57.1, matches: 200 },
    projection: { baseline: 65, range: "50-80", confidence: 8 },
    matchContextObj: { opponent: "SA", venue: "Mumbai", date: "2025-11-29", avgVsOpponent: 65.39 },
  };

  return (
    <div aria-label="Suggestions container" className="w-full">
      {!selected && (
        <div className="flex flex-col justify-center items-center gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSelect(s)}
              className="w-full text-left px-4 py-3 rounded-2xl bg-white text-[#091717]"
              aria-label={`Suggestion: ${s}`}
            >
              <div className="text-lg ">{s}</div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="mt-4 absolute top-0 left-0 w-full flex justify-center items-center">
          <SinglePlayerResponsePerplexityStyle playerData={fakePlayer} />
        </div>
      )}
    </div>
  );
}
