"use client";

import React, { useState } from "react";
import { Card, Progress, Button } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Player = { name?: string; role?: string; team?: string };
type Stats = { average?: number | string; matches?: number };
type Projection = { baseline?: string | number; range?: string; confidence?: number };
type MatchContext = { opponent?: string; venue?: string; date?: string; avgVsOpponent?: number };

type PlayerData = {
  player?: Player;
  stats?: Stats;
  form?: any[];
  projection?: Projection;
  matchContext?: MatchContext;
};

const demoTrend = [
  { match: "M1", points: 120 },
  { match: "M2", points: 1 },
  { match: "M3", points: 0 },
  { match: "M4", points: 0 },
  { match: "M5", points: 110 },
];

export default function SinglePlayerResponsePerplexityStyle({ playerData }: { playerData?: PlayerData }) {
  const [mainTab, setMainTab] = useState<"Answer" | "Links" | "Images">("Answer");
  const [sectionTab, setSectionTab] = useState<"Overview" | "Stats" | "Form">("Overview");

  if (!playerData) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-slate-900 rounded-xl p-4 text-slate-300 shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-slate-800 text-sm">How should I pick my fantasy XI?</span>
              <div className="text-xs text-slate-400">• 1 answer</div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-md bg-slate-700 text-sm">Save</button>
              <button className="px-3 py-1 rounded-md bg-slate-700 text-sm">Share</button>
            </div>
          </div>
          <div className="bg-slate-800 rounded-md p-6">Loading player data…</div>
        </div>
      </div>
    );
  }

  const {
    player = { name: "Unknown", role: "-", team: "-" },
    stats = { average: "—", matches: 0 },
    form = [],
    projection = { baseline: "—", range: "-", confidence: 0 },
    matchContext = { opponent: "TBD", venue: "TBD", date: "TBD", avgVsOpponent: "—" },
  } = playerData;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Top: Perplexity-like header with tabs */}
      <div className="bg-slate-900 rounded-xl p-4 text-slate-200 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="text-xl font-semibold">How should I use {player.name} in my fantasy XI?</div>
            <div className="text-sm text-slate-400">• concise, cited, follow-up enabled</div>
          </div>

          <div className="flex items-center gap-2">
            <nav className="flex bg-slate-800 rounded-md p-1">
              {(["Answer", "Links", "Images"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setMainTab(t)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition ${mainTab === t ? "bg-white text-slate-900" : "text-slate-300"}`}
                >
                  {t}
                </button>
              ))}
            </nav>
            <div className="hidden md:flex items-center gap-2">
              <button className="px-3 py-1 text-sm rounded-md bg-slate-800">Regenerate</button>
              <button className="px-3 py-1 text-sm rounded-md bg-slate-800">Save</button>
            </div>
          </div>
        </div>

        {/* Main content area split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Answer / Links / Images panel */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-md p-6 min-h-[220px]">
              {mainTab === "Answer" && (
                <div className="space-y-4 text-slate-200">
                  <p className="text-sm text-slate-400">Short, actionable summary</p>
                  <h2 className="text-lg font-semibold">Quick recommendation</h2>
                  <p>
                    <strong>Pick {player.name}</strong> — strong recent form and a favorable matchup against {matchContext.opponent} at {matchContext.venue}. Consider him in your XI as a top-order anchor with high ceiling.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                    <div className="p-3 bg-slate-700 rounded">
                      <div className="text-xs text-slate-400">Role</div>
                      <div className="font-medium">{player.role}</div>
                    </div>
                    <div className="p-3 bg-slate-700 rounded">
                      <div className="text-xs text-slate-400">Team</div>
                      <div className="font-medium">{player.team}</div>
                    </div>
                    <div className="p-3 bg-slate-700 rounded">
                      <div className="text-xs text-slate-400">Venue</div>
                      <div className="font-medium">{matchContext.venue}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium">Why this recommendation?</div>
                      <div className="text-xs text-slate-400">(3 factors)</div>
                    </div>
                    <ol className="mt-2 list-decimal list-inside text-slate-300">
                      <li>High career average and recent form.</li>
                      <li>Favorable batting position and match-up vs {matchContext.opponent}.</li>
                      <li>Pitch and venue historically support top-order scoring.</li>
                    </ol>
                  </div>
                </div>
              )}

              {mainTab === "Links" && (
                <div className="text-slate-200">
                  <h3 className="font-semibold mb-2">Sources & links</h3>
                  <ul className="list-disc list-inside text-slate-300">
                    <li><a className="underline" href="#">Stats profile</a></li>
                    <li><a className="underline" href="#">Recent match report</a></li>
                    <li><a className="underline" href="#">Venue history</a></li>
                  </ul>
                </div>
              )}

              {mainTab === "Images" && (
                <div className="text-slate-200">
                  <h3 className="font-semibold mb-2">Images</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-28 bg-slate-700 rounded" />
                    <div className="h-28 bg-slate-700 rounded" />
                    <div className="h-28 bg-slate-700 rounded" />
                    <div className="h-28 bg-slate-700 rounded" />
                  </div>
                </div>
              )}
            </div>

            {/* Section tabs (Key Stats / Upcoming / Form) */}
            <div className="mt-4 flex gap-2">
              {(["Overview", "Stats", "Form"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSectionTab(s)}
                  className={`px-3 py-1 rounded-md text-sm ${sectionTab === s ? "bg-white text-slate-900" : "bg-slate-800 text-slate-300"}`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-4 bg-slate-800 rounded-md p-4 text-slate-200">
              {sectionTab === "Overview" && (
                <div>
                  <h4 className="font-semibold">Overview</h4>
                  <p className="text-sm text-slate-300 mt-2">{player.name} is a top-order batter with an excellent ODI average. Use him as a consistent scorer and captaincy option in favourable matchups.</p>
                </div>
              )}

              {sectionTab === "Stats" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-slate-700 rounded">
                    <div className="text-xs text-slate-400">Key Stats (ODI Avg)</div>
                    <div className="text-2xl font-bold">{stats.average}</div>
                    <div className="text-xs text-slate-400">Matches: {stats.matches}</div>
                  </div>

                  <div className="p-3 bg-slate-700 rounded">
                    <div className="text-xs text-slate-400">Avg vs {matchContext.opponent}</div>
                    <div className="text-2xl font-bold">{matchContext.avgVsOpponent}</div>
                    <div className="text-xs text-slate-400">(ODI)</div>
                  </div>

                  <div className="p-3 bg-slate-700 rounded">
                    <div className="text-xs text-slate-400">Projection</div>
                    <div className="text-2xl font-bold">{projection.baseline}</div>
                    <div className="text-xs text-slate-400">{projection.range} • Confidence {projection.confidence}/10</div>
                  </div>
                </div>
              )}

              {sectionTab === "Form" && (
                <div>
                  <h4 className="font-semibold">Form Trend (Last 5 ODIs)</h4>
                  <div className="h-40 mt-3 bg-slate-900 rounded p-2">
                    <ResponsiveContainer width="100%" height={120}>
                      <LineChart data={demoTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                        <XAxis dataKey="match" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip formatter={(v: any) => [`${v} pts`]} />
                        <Line type="monotone" dataKey="points" stroke="#60a5fa" strokeWidth={3} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: compact cards like Perplexity side panel */}
          <aside className="space-y-4">
            <Card className="bg-white rounded-lg shadow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-200 rounded-full" />
                <div>
                  <div className="text-sm text-slate-500">Player</div>
                  <div className="font-semibold">{player.name}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs text-slate-400">Matches</div>
                <div className="font-bold text-lg">{stats.matches}</div>
                <div className="text-xs text-slate-400 mt-2">Career Average</div>
                <div className="font-bold text-xl">{stats.average}</div>
              </div>
            </Card>

            <Card className="bg-white rounded-lg shadow">
              <div className="text-xs text-slate-400">Projection</div>
              <div className="font-bold text-3xl">{projection.baseline}</div>
              <div className="text-xs text-slate-400 mt-2">{projection.range}</div>
              <div className="mt-3">
                <Progress percent={(projection.confidence ?? 0) * 10} showInfo={false} />
                <div className="text-xs text-slate-500 mt-1">Confidence: {projection.confidence}/10</div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button type="primary">Add</Button>
                <Button>Compare</Button>
              </div>
            </Card>

            <Card className="bg-white rounded-lg shadow">
              <div className="text-xs text-slate-400">Upcoming</div>
              <div className="font-semibold">{matchContext.opponent} • {matchContext.date}</div>
              <div className="text-xs text-slate-400 mt-2">{matchContext.venue}</div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
