"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";

// Responsive, single-file React + Tailwind component
// - Recharts for visualization
// - Default export: PlayerComparisonResponse
// - Uses Tailwind responsive utilities to adapt layout and sizes across devices

export default function PlayerComparisonResponse() {
  // Mock data for "Week 9" — replace with API/props in production
  const playerA = {
    id: "vk",
    name: "Virat Kohli",
    team: "India",
    role: "Top-order Batter",
    avatar: "https://documents.bcci.tv/resizedimageskirti/164_compress.png",
    stats: {
      matches: 9,
      runs: 512,
      avg: 85.33,
      sr: 137.6,
      fptsAvg: 92.4,
    },
    recentRuns: [78, 120, 4, 44, 98, 80],
    fantasyTrend: [88, 95, 76, 102, 110, 92],
  };

  const playerB = {
    id: "rs",
    name: "Rohit Sharma",
    team: "India",
    role: "Opening Batter",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWhTyJbSXaDECwjuOOxfdTlCK7Ysr2D1-OmA&s",
    stats: {
      matches: 9,
      runs: 478,
      avg: 68.29,
      sr: 132.1,
      fptsAvg: 84.1,
    },
    recentRuns: [32, 110, 56, 2, 78, 200],
    fantasyTrend: [72, 88, 64, 92, 106, 84],
  };

  const headToHead = [
    { match: "M1", Virat: 78, Rohit: 32 },
    { match: "M2", Virat: 120, Rohit: 110 },
    { match: "M3", Virat: 4, Rohit: 56 },
    { match: "M4", Virat: 44, Rohit: 2 },
    { match: "M5", Virat: 98, Rohit: 78 },
  ];

  const recentForm = playerA.recentRuns.map((r, i) => ({
    match: `#${i + 1}`,
    Virat: r,
    Rohit: playerB.recentRuns[i] ?? 0,
  }));

  const fantasyData = playerA.fantasyTrend.map((v, i) => ({
    week: `W${i + 1}`,
    Virat: v,
    Rohit: playerB.fantasyTrend[i] ?? 0,
  }));

  function median(arr :any) {
    const s = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(s.length / 2);
    return s.length % 2 !== 0 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
  }

  const scoreA = playerA.stats.fptsAvg * 0.7 + median(playerA.recentRuns) * 0.3;
  const scoreB = playerB.stats.fptsAvg * 0.7 + median(playerB.recentRuns) * 0.3;
  const winner = scoreA === scoreB ? null : scoreA > scoreB ? playerA : playerB;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            Virat Kohli vs Rohit Sharma
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Week 9 — quick fantasy comparison</p>
        </div>

        {/* Small winner summary on the right for wider screens; becomes top stacked on mobile */}
        <div className="w-full sm:w-auto">
          <div className="flex items-center gap-3 bg-white rounded-2xl px-3 py-2 shadow-sm">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
              <img
                src={winner?.avatar}
                alt={winner?.name || "No winner"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div>
              <div className="text-xs text-gray-500">Predicted winner</div>
              <div className="text-sm sm:text-base font-medium text-gray-900">
                {winner ? winner.name : "No clear winner"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[playerA, playerB].map((p) => (
          <article
            key={p.id}
            className="flex gap-4 items-center p-4 sm:p-5 bg-white rounded-2xl shadow-sm"
            role="group"
            aria-label={`${p.name} summary`}
          >
            <div className="shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-lg md:text-xl font-semibold text-gray-900 truncate">{p.name}</div>
                  <div className="text-xs sm:text-sm text-gray-500 truncate">{p.role} • {p.team}</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs text-gray-500">FPTS avg</div>
                  <div className="text-lg font-bold text-gray-900">{p.stats.fptsAvg}</div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-gray-700">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Matches</span>
                  <span className="font-medium">{p.stats.matches}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Runs</span>
                  <span className="font-medium">{p.stats.runs}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Avg</span>
                  <span className="font-medium">{p.stats.avg}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">SR</span>
                  <span className="font-medium">{p.stats.sr}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Main analytics: head-to-head + winner explanation */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Head-to-head (last 5 matches)</h3>
          <div className="w-full h-48 sm:h-56 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={headToHead} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="match" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Virat" stackId="a" />
                <Bar dataKey="Rohit" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <aside className="w-full lg:w-64 bg-gray-50 p-4 rounded-2xl flex flex-col justify-between shadow-sm">
          <div>
            <h4 className="text-xs text-gray-500">Why this pick?</h4>
            <div className="mt-3 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
                <img src={winner?.avatar} alt={winner?.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{winner ? winner.name : "No clear winner"}</div>
                <div className="text-xs text-gray-500">Score: {Math.round(winner ? (winner.id === playerA.id ? scoreA : scoreB) : Math.max(scoreA, scoreB))}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-600">
            Winner is chosen by a mix of fantasy points average and recent form (median runs). Replace this logic with your model for production.
          </div>
        </aside>
      </div>

      {/* Recent form & fantasy trend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="bg-white p-4 rounded-2xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Recent form (last 6 matches)</h3>
          <div className="w-full h-56 sm:h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={recentForm} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="match" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Virat" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Rohit" stroke="#82ca9d" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white p-4 rounded-2xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Fantasy points trend (last 6 weeks)</h3>
          <div className="w-full h-56 sm:h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fantasyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Virat" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Rohit" stroke="#82ca9d" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

    </div>
  );
}
