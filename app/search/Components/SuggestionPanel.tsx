"use client";

import React from "react";

type Props = {
  suggestion: string;
  onClose?: () => void;
};

export default function SuggestionPanel({ suggestion, onClose }: Props) {
  // quick matcher to decide which UI to show
  const isPickQuestion = suggestion.includes("Should I pick");
  const isCompare = suggestion.includes("vs");

  return (
    <div
      role="dialog"
      aria-modal="true"
      className=" absolute top-0 left-0   w-full h-full flex justify-center items-center "
    >

        <div className="w-[70%] h-[50%] bg-white">
   <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">
            {suggestion}
          </h3>
          <p className="text-sm text-black mt-1">
            Quick analysis and recommended action for your fantasy team.
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onClose}
            aria-label="Close suggestion panel"
            className="px-3 py-1 rounded-md text-sm bg-white text-black"
          >
            Close
          </button>
        </div>
      </div>

      <div className="mt-4">
        {isPickQuestion && (
          <div className="grid gap-3 md:grid-cols-3">
            <div className="col-span-2">
              <h4 className="text-sm font-medium">Short recommendation</h4>
              <p className="text-sm text-gray-200 mt-2">
                Based on recent form, pitching conditions and matchup, Virat Kohli is <strong>likely</strong> to be a strong pick for week 9 — especially in batting-friendly venues. Consider whether you need a captain or a solid top-order batter; Kohli has higher ceiling as captain but check matchup and injury news before finalising.
              </p>

              <ul className="mt-3 text-sm text-gray-300 space-y-1">
                <li>• Recent 5 matches: 48.2 avg (sample placeholder)</li>
                <li>• Venue: neutral (check match-specific pitch)</li>
                <li>• Risk: lower than most all-rounders</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-white/3">
              <div className="text-xs text-gray-300">Actions</div>
              <div className="mt-3 flex flex-col gap-2">
                <button className="w-full px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-sm">
                  Add Virat Kohli to team
                </button>
                <button className="w-full px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-sm">
                  Compare with alternatives
                </button>
                <button className="w-full px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-sm">
                  Fetch latest injury/news
                </button>
              </div>
            </div>
          </div>
        )}

        {isCompare && (
          <div className="grid gap-3 md:grid-cols-2 mt-2">
            <div className="p-3 rounded-lg bg-white/3">
              <h5 className="text-sm font-medium">Virat Kohli</h5>
              <p className="text-xs text-gray-300 mt-1">Role: Top-order batter</p>
              <ul className="mt-2 text-sm text-gray-200 space-y-1">
                <li>• Last 5 matches: 48 avg</li>
                <li>• Strike rate: 132 (placeholder)</li>
                <li>• Home/away split: consistent</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-white/3">
              <h5 className="text-sm font-medium">Rohit Sharma</h5>
              <p className="text-xs text-gray-300 mt-1">Role: Opener</p>
              <ul className="mt-2 text-sm text-gray-200 space-y-1">
                <li>• Last 5 matches: 34 avg</li>
                <li>• Strike rate: 128 (placeholder)</li>
                <li>• Ceiling: high on flat pitches</li>
              </ul>
            </div>

            <div className="col-span-full mt-3 p-3 rounded-lg bg-white/5">
              <h6 className="text-sm font-medium">Quick verdict</h6>
              <p className="text-sm text-gray-200 mt-1">
                If the pitch looks flat and you need quick points early, Rohit may be preferable for high-risk-high-reward. For stable, consistent points and captaincy consideration, Virat is the safer choice. Use your team composition — if you already have aggressive openers, prefer Kohli.
              </p>

              <div className="mt-3 flex gap-2">
                <button className="px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-sm">
                  Pick Virat Kohli
                </button>
                <button className="px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-sm">
                  Pick Rohit Sharma
                </button>
                <button className="px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-sm">
                  More detailed comparison
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Fallback when unknown */}
        {!isPickQuestion && !isCompare && (
          <div className="text-sm text-gray-300">
            No specialized UI for this suggestion yet.
          </div>
        )}
      </div>
        </div>
   
    </div>
  );
}
