"use client";

import React, { useMemo, useRef, useState } from "react";
import { Card, Progress } from "antd";
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
type MatchContext = { opponent?: string; venue?: string; date?: string; avgVsOpponent?: number | string };

type PlayerData = {
  player?: Player;
  stats?: Stats;
  form?: any[];
  projection?: Projection;
  matchContext?: MatchContext;
  status?: "green" | "yellow" | "red";
};

const DEMO_TREND = [
  { match: "M1", points: 72 },
  { match: "M2", points: 4 },
  { match: "M3", points: 0 },
  { match: "M4", points: 18 },
  { match: "M5", points: 110 },
];

const DUMMY_PLAYER_DATA: PlayerData = {
  player: { name: "Virat Kohli", role: "Top-order Batsman", team: "India" },
  stats: { average: 58.3, matches: 254 },
  form: DEMO_TREND,
  projection: { baseline: 75, range: "40-110", confidence: 7 },
  matchContext: { opponent: "Australia", venue: "Wankhede Stadium, Mumbai", date: "2025-12-05", avgVsOpponent: 54 },
  status: "green",
};

function useUniqueValueGuard() {
  const seen = new Set<string>();
  return (value?: string | number | null | undefined) => {
    if (!value && value !== 0) return true;
    const key = String(value).trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  };
}

function StatusDot({
  status = "yellow",
  selected = false,
  onToggle,
}: {
  status?: "green" | "yellow" | "red";
  selected?: boolean;
  onToggle?: () => void;
}) {
  const colorClass = status === "green" ? "bg-green-500" : status === "red" ? "bg-red-500" : "bg-yellow-400";

  return (
    <button
      aria-pressed={selected}
      aria-label={selected ? "Selected" : `Status: ${status}`}
      title={selected ? "Selected" : `Status: ${status}`}
      onClick={(e) => {
        e.stopPropagation();
        onToggle && onToggle();
      }}
      className={`absolute top-3 right-3 w-9 h-9 md:w-8 md:h-8 rounded-full ring-2 ring-white shadow-md flex items-center justify-center ${colorClass}`}
    >
      {selected && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export default function SinglePlayerResponseClean({
  playerData,
  onSelect,
}: {
  playerData?: PlayerData;
  onSelect?: (player?: Player, selected?: boolean) => void;
}) {
  const data = playerData ?? DUMMY_PLAYER_DATA;

  const {
    player = { name: "Unknown", role: "-", team: "-" },
    stats = { average: "—", matches: 0 },
    form = [],
    projection = { baseline: "—", range: "-", confidence: 0 },
    matchContext = { opponent: "TBD", venue: "TBD", date: "TBD", avgVsOpponent: "—" },
    status = "yellow",
  } = data;

  // Keep a single guard instance for the lifetime of this component instance
  const uniqueGuardRef = useRef(useUniqueValueGuard());
  const shouldRender = (v?: string | number | null | undefined) => uniqueGuardRef.current(v);

  const [sectionTab, setSectionTab] = useState<"Overview" | "Stats" | "Form">("Overview");
  const [selected, setSelected] = useState(false);

  const toggleSelected = () => {
    const next = !selected;
    setSelected(next);
    onSelect && onSelect(player, next);
  };

  const summary = `${player.name} — ${player.role} for ${player.team}`;

  // Ensure projection confidence stays between 0-10
  const safeConfidence = Math.max(0, Math.min(10, Number(projection.confidence ?? 0)));

  // memoize form data
  const chartData = useMemo(() => (form && form.length ? form : DEMO_TREND), [form]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 text-slate-900">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-semibold truncate">{player.name}</h1>
          <p className="text-sm text-slate-600 truncate">{player.role} • {player.team}</p>

          {shouldRender(summary) && (
            <p className="mt-2 text-sm text-slate-700 max-w-xl">
              Quick view: {summary} — recommended when in good form and favourable match-ups.
            </p>
          )}
        </div>

        <div className="rounded-md bg-white p-1 flex gap-1">
          {(["Overview","Stats","Form"] as const).map(s=> (
            <button
              key={s}
              onClick={() => setSectionTab(s)}
              className={`px-3 py-1 text-sm rounded ${sectionTab===s?"bg-[#22B8CF] text-white":"text-slate-800"}`}
            >{s}</button>
          ))}
        </div>
      </header>


      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Player Card */}
        <Card className="p-4 bg-white text-slate-900 border border-slate-200">
          <div className="flex flex-col gap-4">
            <div className="relative w-full overflow-hidden rounded-xl bg-slate-50">
              {/* Responsive aspect: square on small, wider on md+ */}
              <div className="w-full aspect-square sm:aspect-[4/3] md:aspect-[3/2] lg:aspect-square">
                <img
                  className="w-full h-full rounded-xl object-cover"
                  src="https://documents.bcci.tv/resizedimageskirti/164_compress.png"
                  alt={player.name}
                  loading="lazy"
                />
                <StatusDot status={status} selected={selected} onToggle={toggleSelected} />
              </div>
            </div>

            <div className="flex-1">
              <div className="text-xs text-slate-500">Player</div>
              <div className="text-2xl font-semibold truncate">{player.name}</div>
              <div className="text-sm mt-1 text-slate-600 truncate">{player.role}</div>
              <div className="text-sm font-semibold truncate">{player.team}</div>
            </div>
          </div>
        </Card>


        {/* Middle Content */}
        <section className="lg:col-span-2 space-y-4 order-3 lg:order-2">

          {/* Recommendation */}
          <article className="bg-white border border-slate-200 rounded-md p-6">
            <h2 className="text-lg font-semibold">Recommendation</h2>
            <p className="text-sm mt-1">Highly recommended pick for the match vs {matchContext.opponent} at {matchContext.venue}.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {shouldRender(player.role) && (
                <div className="p-3 rounded border border-slate-200 bg-slate-50">
                  <div className="text-xs text-slate-500">Role</div>
                  <div className="font-medium truncate">{player.role}</div>
                </div>
              )}

              {shouldRender(player.team) && (
                <div className="p-3 rounded border border-slate-200 bg-slate-50">
                  <div className="text-xs text-slate-500">Team</div>
                  <div className="font-medium truncate">{player.team}</div>
                </div>
              )}

              {shouldRender(matchContext.venue) && (
                <div className="p-3 rounded border border-slate-200 bg-slate-50">
                  <div className="text-xs text-slate-500">Venue</div>
                  <div className="font-medium truncate">{matchContext.venue}</div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-medium">Why</h3>
              <ul className="mt-2 list-disc list-inside text-sm text-slate-700">
                <li>Strong batting average and recent form.</li>
                <li>Favourable match-up vs {matchContext.opponent}.</li>
                <li>Venue historically suits top-order players.</li>
              </ul>
            </div>
          </article>

          {/* Overview / Stats / Form Panel */}
          <article className="bg-white border border-slate-200 rounded-md p-6">
            {sectionTab === "Overview" && (
              <div>
                <h3 className="font-semibold">Overview</h3>
                <p className="text-sm mt-2">{player.name} is a consistent top-order batter with strong reliability.</p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded border border-slate-200 bg-slate-50">
                    <div className="text-xs text-slate-500">Career Avg</div>
                    <div className="text-2xl font-bold">{stats.average}</div>
                    <div className="text-xs text-slate-500">Matches: {stats.matches}</div>
                  </div>

                  <div className="p-3 rounded border border-slate-200 bg-slate-50">
                    <div className="text-xs text-slate-500">Avg vs {matchContext.opponent}</div>
                    <div className="text-2xl font-bold">{matchContext.avgVsOpponent}</div>
                  </div>

                  <div className="p-3 rounded border border-slate-200 bg-slate-50">
                    <div className="text-xs text-slate-500">Projection</div>
                    <div className="text-2xl font-bold">{projection.baseline}</div>
                    <div className="text-xs text-slate-500">{projection.range}</div>
                  </div>
                </div>
              </div>
            )}

            {sectionTab === "Stats" && (
              <div>
                <h3 className="font-semibold">Key Stats</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <Card className="bg-white border border-slate-200 p-3">
                    <div className="text-xs text-slate-500">Career Avg</div>
                    <div className="text-2xl font-bold">{stats.average}</div>
                  </Card>

                  <Card className="bg-white border border-slate-200 p-3">
                    <div className="text-xs text-slate-500">Avg vs {matchContext.opponent}</div>
                    <div className="text-2xl font-bold">{matchContext.avgVsOpponent}</div>
                  </Card>
                </div>
              </div>
            )}

            {sectionTab === "Form" && (
              <div>
                <h3 className="font-semibold">Form Trend</h3>

                <div className="mt-3 rounded p-2 border border-slate-200 bg-slate-50">
                  {/* Responsive heights: smaller on small screens, larger on tablets */}
                  <div className="w-full h-40 sm:h-56 md:h-64 lg:h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
                        <XAxis dataKey="match" stroke="#333" />
                        <YAxis stroke="#333" />
                        <Tooltip formatter={(v: any) => [`${v} pts`]} />
                        <Line type="monotone" dataKey="points" stroke="#0f172a" strokeWidth={3} dot />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </article>
        </section>

        {/* Right Sidebar */}
        <aside className="space-y-4 order-2 lg:order-3">

          <Card className="p-4 bg-white border border-slate-200">
            <div className="text-xs text-slate-500">Projection</div>
            <div className="font-bold text-2xl truncate">{projection.baseline}</div>
            <div className="text-xs text-slate-500 mt-1 truncate">{projection.range}</div>
            <div className="mt-3">
              <Progress percent={safeConfidence * 10} showInfo={false} strokeWidth={12} />
              <div className="text-xs text-slate-700 mt-1">Confidence: {safeConfidence}/10</div>
            </div>
          </Card>

          <Card className="p-4 bg-white border border-slate-200">
            <div className="text-xs text-slate-500">Upcoming</div>
            <div className="font-semibold mt-1 truncate">{matchContext.opponent} • {matchContext.date}</div>
            <div className="text-xs text-slate-500 mt-2 truncate">{matchContext.venue}</div>
          </Card>

        </aside>

      </main>
    </div>
  );
}
