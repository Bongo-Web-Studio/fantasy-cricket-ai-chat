"use client";

import ViratKohliCard from "./ViratKohliCard";
import RohitSharmaCard from "./RohitSharmaCard";

type Player = {
  id?: string;
  name: string;
  age?: number;
  formats?: string[];
  runs2025?: { IPL?: number; ODI?: number };
  battingAverage?: { IPL?: number; ODI?: number };
  strikeRate?: { IPL?: number; ODI?: number };
  recentScores?: (number | string)[];
  highestScore?: { IPL?: string; ODI?: string };
  fantasyProjection?: number[]; // array of projections to draw small bars
  achievements?: string[];
  imageUrl?: string;
  recommendation?: string;
};
const VIRAT: Player = {
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
  imageUrl: "/images/virat.jpg",
  recommendation:
    "Recommended for your fantasy cricket team due to consistent form and high fantasy output. His experience and recent performances suggest he will contribute high fantasy points, especially if the batting conditions are favorable and he bats in the top order.",
};

const ROHIT: Player = {
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
  imageUrl: "/images/rohit.jpg",
  recommendation:
    "Bolt option for captains who need explosive upside. Rohit’s strike rate and boundary capability give high ceiling fantasy returns in short formats if conditions favor power-hitting.",
};

function PlayerCardLarge({ player }: { player: Player }) {
  const recent = (player.recentScores ?? []).map((s) =>
    typeof s === "number" ? s : parseInt(String(s).replace("*", "")) || 0
  );
  return (
    <div className="w-full bg-white  overflow-hidden">
      <div className="">
        {/* Right data column */}
        <div className=" p-5">
          <div className=" gap-4">
            <div className="col-span-7">
              <h4  style={{
              fontFamily:
                "PPEditorialNew, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
            }}   className="text-xl mb-3 text-black">Key Stats</h4>

              <div className="text-sm text-gray-700 space-y-3">
                {/* Recent scores line */}
                <div className="flex items-center justify-between">
                  <div className="text-[13px] font-medium">Recent Scores</div>
                  <div className="text-sm text-gray-600">
                    {(player.recentScores ?? []).join(", ")}
                  </div>
                </div>

                {/* Dream11 PPG chips */}
                <div className="flex items-center gap-2">
                  <div className="text-[13px] font-medium">Dream11 PPG</div>
                  <div className="flex gap-2 ml-2">
                    <div className="px-2 py-1 rounded text-xs bg-gray-100">
                      T20: ~46
                    </div>
                    <div className="px-2 py-1 rounded text-xs bg-gray-100">
                      ODI: ~69
                    </div>
                  </div>
                </div>

                {/* Horizontal percent-style stat rows (T20 vs ODI) */}
                <div className="space-y-2">
                  {/* Strike Rate row */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <div className="font-medium">Strike Rate</div>
                      <div className="text-xs text-gray-500">
                        Higher = faster scoring
                      </div>
                    </div>

                    <div className="gap-3 items-center">
                      <div className="col-span-5 text-sm">T20</div>
                      <div className="col-span-5">
                        {/* percent bar */}
                        {(() => {
                          const t20 = Math.round(player.strikeRate?.IPL ?? 0);
                          const maxSR = 180; // cap for percent
                          const pct = Math.min(
                            100,
                            Math.round((t20 / maxSR) * 100)
                          );
                          return (
                            <div className="h-3  bg-gray-200 overflow-hidden">
                              <div
                                className="h-3 bg-green-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          );
                        })()}
                      </div>
                      <div className=" text-sm text-right font-semibold">
                        {Math.round(player.strikeRate?.IPL ?? 0)}
                      </div>

                      <div className="col-span-5 text-sm">ODI</div>
                      <div className="col-span-5">
                        {(() => {
                          const odi = Math.round(player.strikeRate?.ODI ?? 0);
                          const maxSR = 180;
                          const pct = Math.min(
                            100,
                            Math.round((odi / maxSR) * 100)
                          );
                          return (
                            <div className="h-3 bg-gray-200 overflow-hidden">
                              <div
                                className="h-3 bg-red-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          );
                        })()}
                      </div>
                      <div className="col-span-2 text-sm text-right font-semibold">
                        {Math.round(player.strikeRate?.ODI ?? 0)}
                      </div>
                    </div>
                  </div>

                  {/* Batting Average row */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <div className="font-medium">Batting Average</div>
                      <div className="text-xs text-gray-500">
                        Higher = more reliable
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-5 text-sm">T20</div>
                      <div className="col-span-5">
                        {(() => {
                          const t20 = Math.round(
                            player.battingAverage?.IPL ?? 0
                          );
                          const maxAvg = 100; // cap
                          const pct = Math.min(
                            100,
                            Math.round((t20 / maxAvg) * 100)
                          );
                          return (
                            <div className="h-3  bg-gray-200 overflow-hidden">
                              <div
                                className="h-3 bg-green-400"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          );
                        })()}
                      </div>
                      <div className="col-span-2 text-sm text-right font-semibold">
                        {Math.round(player.battingAverage?.IPL ?? 0)}
                      </div>

                      <div className="col-span-5 text-sm">ODI</div>
                      <div className="col-span-5">
                        {(() => {
                          const odi = Math.round(
                            player.battingAverage?.ODI ?? 0
                          );
                          const maxAvg = 100;
                          const pct = Math.min(
                            100,
                            Math.round((odi / maxAvg) * 100)
                          );
                          return (
                            <div className="h-3  bg-gray-200 overflow-hidden">
                              <div
                                className="h-3 bg-red-400"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          );
                        })()}
                      </div>
                      <div className="col-span-2 text-sm text-right font-semibold">
                        {Math.round(player.battingAverage?.ODI ?? 0)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Small numeric summary row */}
                <div className="mt-2 grid grid-cols-3 gap-3 text-sm">
                  <div className="bg-gray-100 p-2 rounded text-center border border-gray-200">
                    <div className="text-xs text-gray-500">Consistency</div>
                    <div className="font-semibold text-gray-800">
                      {Math.round(
                        (player.recentScores ?? []).reduce(
                          (a: any, b: any) => a + Number(b),
                          0
                        ) / ((player.recentScores ?? []).length || 1) || 0
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded text-center border border-gray-200">
                    <div className="text-xs text-gray-500">Max SR</div>
                    <div className="font-semibold text-gray-800">
                      {Math.max(
                        ...(player.recentScores ?? []).map((s) =>
                          Number(String(s).replace("*", ""))
                        )
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded text-center border border-gray-200">
                    <div className="text-xs text-gray-500">
                      Projected Avg PTS
                    </div>
                    <div className="font-semibold text-gray-800">
                      {Math.round(
                        (player.fantasyProjection ?? [0, 0]).reduce(
                          (a, b) => a + b,
                          0
                        ) / (player.fantasyProjection?.length || 1)
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 mt-3">
              <div className=" rounded-lg p-4 bg-gray-100 border border-gray-200">
                <div  style={{
              fontFamily:
                "PPEditorialNew, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
            }} className="text-xl  mb-2 text-black">
                  Strong Pick for Week 9:
                </div>
                <div className="text-sm text-gray-700">
                  {player.recommendation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlayerComparisonCards() {
  return (
    <div className="max-w-4xl w-full   bg-white border border-gray-200 rounded-2xl">
      <div className=" w-full p-2 flex flex-col justify-center items-center gap-5 ">
        <div className=" w-full  flex justify-between items-start bg-gray-100 p-1 rounded-2xl">
          <div className="w-[47%] h">
            <ViratKohliCard />
          </div>
          <div className="w-[47%]">
            <RohitSharmaCard />
          </div>
        </div>

        <div className="w-full  flex  justify-between items-start">
          <div className="w-[47%]" >
            <PlayerCardLarge player={VIRAT} />
          </div>
          <div className="w-[47%]">
            <PlayerCardLarge player={ROHIT} />
          </div>
        </div>
      </div>
    </div>
  );
}
