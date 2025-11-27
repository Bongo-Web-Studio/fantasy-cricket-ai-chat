"use client";

import React, { useState } from "react";
import SuggestionPanel from "./SuggestionPanel";
import SinglePlayerResponsePerplexityStyle from "./SinglePlayerResponse";


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
    // notify parent (App) so it can hide the hero or do other things
    onSelect?.(text);
    // open the inline panel
    setSelected(text);
  };

    const fakeData = { player: { name: "Virat Kohli", role: "Batsman", team: "India" }, stats: { average: 57.1, matches: 200 }, projection: { baseline: 65, range: "50-80", confidence: 8 }, matchContext: { opponent: "SA", venue: "Mumbai", date: "2025-11-29", avgVsOpponent: 65.39 } };

  return (
    <div aria-label="Suggestions container" className="w-full">
      {/* List */}
      {!selected && (
        <div className="flex flex-col justify-center items-center gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSelect(s)}
              className="w-full text-left px-4 py-3 rounded-2xl bg-white text-[#091717] "
              aria-label={`Suggestion: ${s}`}
            >
              <div className="text-lg ">{s}</div>
              
            </button>
          ))}
        </div>
      )}

      {/* Inline panel that opens when a suggestion is picked */}
      {selected && (
        <div className="mt-4 absolute top-0 left-0  w-full flex justify-center items-center">
        

               <SinglePlayerResponsePerplexityStyle  
            onClose={() => setSelected(null)} playerData={fakeData} />
        </div>
      )}
    </div>
  );
}
