"use client";

import React, { CSSProperties, useEffect, useRef, useState } from "react";
import Sidebar from "./Components/Sidebar";
import SearchComponent from "./Components/SearchComponent";
import Suggestions from "./Components/Suggestions";
import SinglePlayerResponseClean from "./Components/SinglePlayerResponse";
import PlayerComparisonResponse from "./Components/PlayerComparisonResponse";

const BG_DARK = "bg-[#0A0A0A]";
const TEXT_DEFAULT = "text-gray-100";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

type ParsedQuery = {
  player?: string;
  week?: number;
} | null;

type ComparisonQuery = {
  playerA: string;
  playerB: string;
  week?: number;
} | null;

export default function App(): React.ReactElement {
  const [showHero, setShowHero] = useState<boolean>(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [parsedQuery, setParsedQuery] = useState<ParsedQuery>(null);
  const [comparisonQuery, setComparisonQuery] = useState<ComparisonQuery>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const bgStyle: CSSProperties = {
    backgroundImage: "url('/bgbg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  // existing simple single-player parser (kept for other uses)
  const parsePlayerWeek = (text: string): ParsedQuery => {
    if (!text) return null;

    const patterns = [
      /should\s+i\s+pick\s+([A-Za-z.'\-\s]+?)\s+for\s+week\s+(\d+)/i,
      /pick\s+([A-Za-z.'\-\s]+?)\s+for\s+week\s+(\d+)/i,
      /([A-Za-z.'\-\s]+?)\s+for\s+week\s+(\d+)/i,
      /week\s+(\d+)\s+.*\b([A-Za-z.'\-\s]+)\b/i,
    ];

    for (const p of patterns) {
      const m = text.match(p);
      if (m) {
        const group1 = m[1];
        const group2 = m[2];
        let player = "";
        let week: number | undefined;

        if (group1 && /^\d+$/.test(group1.trim())) {
          week = parseInt(group1.trim(), 10);
          player = group2 ?? "";
        } else if (group2 && /^\d+$/.test(group2.trim())) {
          week = parseInt(group2.trim(), 10);
          player = group1 ?? "";
        } else {
          const num = text.match(/\b(\d+)\b/);
          if (num) week = parseInt(num[1], 10);
          player = (group1 || group2 || "").trim();
        }

        player = player.replace(/\s+/g, " ").trim();
        if (!player) return null;
        return { player, week };
      }
    }

    return null;
  };

  // NEW: parse comparison queries like "Virat Kohli vs Rohit Sharma for week 9"
  const parseComparison = (text: string): ComparisonQuery => {
    if (!text) return null;
    // matches "A vs B for week N" (makes vs optional dot and week optional)
    const p = /([A-Za-z.'\-\s]+?)\s+vs\.?\s+([A-Za-z.'\-\s]+?)(?:\s+for\s+week\s+(\d+))?$/i;
    const m = text.match(p);
    if (!m) return null;
    const playerA = (m[1] || "").trim().replace(/\s+/g, " ");
    const playerB = (m[2] || "").trim().replace(/\s+/g, " ");
    const week = m[3] ? parseInt(m[3], 10) : undefined;
    if (!playerA || !playerB) return null;
    return { playerA, playerB, week };
  };

  // handle incoming user messages from SearchComponent
  const handleSend = (value: string) => {
    const id = String(Date.now());
    const userMsg: ChatMessage = { id, role: "user", text: value };
    setMessages((prev) => [...prev, userMsg]);

    // Try comparison parse first
    const comp = parseComparison(value);
    if (comp) {
      // set comparison state so UI can render ONLY the comparison component
      setComparisonQuery(comp);
      // clear single-player parsed query (we're in comparison mode)
      setParsedQuery(null);

      // optional assistant ack
      setTimeout(() => {
        const assistantMsg: ChatMessage = {
          id: `${id}-r`,
          role: "assistant",
          text: `Comparing ${comp.playerA} vs ${comp.playerB}${comp.week ? ` for week ${comp.week}` : ""}...`,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }, 200);

      setShowHero(false);
      return;
    }

    // If not a comparison, set comparisonQuery to null (ensures UI fallback)
    setComparisonQuery(null);

    // Try single-player parse as fallback
    const parsed = parsePlayerWeek(value);
    setParsedQuery(parsed);

    if (!parsed) {
      // per your instruction: show a server-down style assistant message when not a comparison
      setTimeout(() => {
        const assistantMsg: ChatMessage = {
          id: `${id}-r`,
          role: "assistant",
          // adjusted wording for clarity — change text to exactly what you prefer if needed
          text: "Sorry — we can't process that right now (server down).",
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }, 200);
    } else {
      setTimeout(() => {
        const assistantMsg: ChatMessage = {
          id: `${id}-r`,
          role: "assistant",
          text: `Looking up ${parsed.player}${parsed.week ? ` for week ${parsed.week}` : ""}...`,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }, 200);
    }

    setShowHero(false);
  };

  // auto-scroll to bottom when messages change
  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // find last user message (used to decide whether to show prompt)
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");

  return (
    <div
      style={bgStyle}
      className={`${BG_DARK} ${TEXT_DEFAULT} min-h-screen w-full font-sans h-screen`}
    >
      <div className="relative h-full">
        {/* Desktop sidebar: fixed on the left and visible on md+ */}
        <aside className="hidden md:flex md:flex-col md:w-72 lg:w-80 md:fixed md:inset-y-0 md:overflow-y-auto">
          <div className="h-full px-2 py-6">
            <Sidebar />
          </div>
        </aside>

        {/* Mobile top nav with hamburger */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-30 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <button
              aria-label="Open menu"
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-md focus:outline-none"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="text-center flex-1">
              <span className="text-base font-semibold">Skipper AI</span>
            </div>

            <div style={{ width: 40 }} />
          </div>
        </div>

        {/* Mobile sidebar drawer */}
        {mobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-64 max-w-full bg-[#070707] p-4 overflow-y-auto">
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="mb-4 px-2 py-1 rounded-md text-sm"
              >
                Close
              </button>
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main chat panel. On desktop we add left margin to accommodate the fixed sidebar. */}
        <main className="flex-1  lg:ml-30 h-full flex flex-col">
          {/* top spacer to avoid overlap with mobile top nav */}
          <div className="h-14 md:h-0" />

          <div className="flex-1 flex items-stretch justify-center overflow-hidden">
            <div className="w-full max-w-5xl flex flex-col h-full">
              {/* Chat header (sticky) */}
              <div className="sticky top-0 z-10 bg-transparent px-4 py-4 md:py-6 border-b border-white/6 flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-xl md:text-2xl">Skipper AI</h1>
                </div>
              </div>

              {/* Messages / suggestions area */}
              <div
                ref={messagesRef}
                className="flex-1 overflow-auto px-4 py-6 space-y-6"
              >
                {/* If comparisonQuery exists, render ONLY the comparison component */}
                {comparisonQuery ? (
                  <div className="w-full flex justify-center items-start">
                    {/* Pass props into PlayerComparisonResponse — update that component to accept these props if needed */}
                    <div className="max-w-[85%]">
                      <PlayerComparisonResponse
                        // @ts-ignore - adapt props in PlayerComparisonResponse as needed
                        playerA={comparisonQuery.playerA}
                        // @ts-ignore
                        playerB={comparisonQuery.playerB}
                        // @ts-ignore
                        week={comparisonQuery.week}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Dynamic messages */}
                    <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={`max-w-[85%] p-3 rounded-2xl ${
                            m.role === "user"
                              ? "self-end bg-white text-black"
                              : "self-start bg-white text-black"
                          }`}
                        >
                          {m.text}
                        </div>
                      ))}
                    </div>

                    {/* Conditional rendering for single-player queries (kept) */}
                    {parsedQuery && parsedQuery.player && parsedQuery.week ? (
                      <div className="max-w-[85%] p-0 self-start">
                        <SinglePlayerResponseClean />
                      </div>
                    ) : lastUserMessage ? (
                      <div className="max-w-[85%] p-3 rounded-2xl self-start bg-white text-black">
                        We can provide that data — please ask with a player and
                        week, for example:
                        <div className="mt-2 italic">
                          "Should I pick Virat Kohli for week 9?"
                        </div>
                      </div>
                    ) : null}

                    {/* preserve legacy comparison component usage if you want it shown elsewhere */}
                    {/* <PlayerComparisonResponse/> */}

                    {/* extra bottom padding so the last message isn't hidden by the fixed input */}
                    <div className="h-28 md:h-32" />
                  </>
                )}
              </div>

              {/* Fixed input / search area: sticky to bottom of the chat panel */}
              <div className="sticky bottom-0 z-20   px-4 py-4">
                <div className="w-full max-w-3xl mx-auto">
                  {/* Pass handleSend to SearchComponent so whatever user types appears on screen */}
                  <SearchComponent onSubmit={handleSend} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
