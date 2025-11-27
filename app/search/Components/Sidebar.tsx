import React, { useEffect, useRef, useState } from "react";
import {
  ChevronsLeft,
  Plus,
  Search,
  Archive,
  Grid,
  Star,
  Settings,
  Zap,
  User,
  Sparkles,
  MessageCircle,
  Circle,
} from "lucide-react";

/*
  Sidebar.react.tsx
  - Behavior: compact vertical icon bar by default (like image 1)
  - On mouse enter / keyboard focus -> expand to full sidebar with sections
  - On leave / focus out -> collapse back to compact
  - Includes dummy data for GPTs + Chats and a scrollable center area
  - Tailwind-based styling (requires Tailwind configured in project)

  Drop this single file into your components folder and import where needed.
*/

const CN = (...args: Array<string | false | null | undefined>) =>
  args.filter(Boolean).join(" ");

const BG = "bg-[#0a0a0b]"; // very dark
const PANEL = "bg-zinc-900";
const MUTED = "text-zinc-400";
const ACCENT = "text-cyan-400";

type Chat = { id: string; title: string; snippet: string; time?: string };

const DUMMY_GPTS = [
  { id: "g1", name: "Explore" },
  { id: "g2", name: "Dream 11 Fantasy Cricket" },
];

const DUMMY_CHATS: Chat[] = Array.from({ length: 18 }).map((_, i) => ({
  id: `c-${i}`,
  title: [
    "Responsive sidebar compon...",
    "React component update",
    "React FAQ component",
    "Debit card question clarificat...",
    "Responsive hero component",
  ][i % 5],
  snippet: "This is a short snippet of the conversation to make the list feel real.",
  time: `${(i % 12) + 1}:${i % 2 ? "00" : "30"} ${i % 2 ? "PM" : "AM"}`,
}));

export default function Sidebar(): React.ReactElement {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // keyboard focus handlers
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onFocusIn = () => setExpanded(true);
    const onFocusOut = (e: FocusEvent) => {
      if (!el.contains(e.relatedTarget as Node | null)) {
        setExpanded(false);
      }
    };

    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut as EventListener);

    return () => {
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut as EventListener);
    };
  }, []);

  return (
    <div>
      {/* Desktop/Tablet vertical */}
      <aside
        ref={containerRef}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={CN(
          "hidden md:flex fixed left-0 top-0 h-screen z-50 flex-col transition-all duration-200  rounded-r-4xl overflow-hidden",
          BG,
          expanded ? "w-72" : "w-16"
        )}
        aria-label="Main sidebar"
      >
        {/* top area */}
        <div className="flex flex-col h-full bg-white">
          <div className={CN("flex items-center px-3 py-3", expanded ? "justify-between" : "justify-center")}> 
            <div className="flex items-center gap-1">
              <div className={CN("p-2 rounded-full ml-1", ACCENT)}>
                {/* logo */}
<div className="flex items-center ">
        <img className="w-5 h-5" src="/log.png" alt="" />
         
        </div>
              </div>
              {expanded && <h3 className=" text-[#091717] text-sm  font-serif">Skipper AI</h3>}
            </div>
            {expanded && (
              <button
                className="flex items-center gap-2 bg-[#2795A2] px-3 py-2 rounded-4xl  text-sm text-white"
                aria-label="New chat"
              >
                <Plus className="w-4 h-4" />
                New chat
              </button>
            )}
          </div>

          {/* search */}
          {expanded ? (
            <div className="px-3 pb-2">
              <div className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-4xl border border-gray-300">
                <Search className="w-4 h-4 text-gray-600" />
                <input
                  className="bg-transparent outline-none text-sm text-zinc-200 placeholder:text-zinc-500 w-full"
                  placeholder="Search chats"
                />
              </div>
            </div>
          ) : (
            <div className="flex-0 flex items-center justify-center mt-2">
              <button
                className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-zinc-800"
                aria-label="New chat compact"
              >
                <Plus className="w-5 h-5 text-[#091717]" />
              </button>
            </div>
          )}

          {/* main scrollable area */}
          <div className="flex-1 overflow-y-auto py-4 px-1">
            {expanded ? (
              <div className="px-3">
                {/* top menu items - like Library / Projects */}
                <nav className="flex flex-col space-y-2">
                  <a className="flex items-center gap-3 px-2 py-2 rounded-full text-sm text-gray-500 hover:bg-gray-200 hover:text-[#091717]">
                    <Archive className="w-5 h-5" />
                    Library
                  </a>
                  <a className="flex items-center gap-3 px-2 py-2 rounded-full text-sm text-gray-500 hover:bg-gray-200 hover:text-[#091717]">
                    <Grid className="w-5 h-5 " />
                    Projects
                  </a>
                </nav>

                {/* GPTs section */}
                <div className="mt-6">
                  <div className="text-xs uppercase tracking-wide text-gray-700 mb-2">Skipper Model</div>
                  <div className="flex flex-col space-y-2">
                    {DUMMY_GPTS.map((g) => (
                      <a key={g.id} className="flex items-center gap-3 px-2 py-2 rounded-full text-sm text-gray-500 hover:bg-gray-200 hover:text-[#091717]">
                        <Circle className="w-5 h-5 text-amber-400" />
                        {g.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Chats list */}
                <div className="mt-6">
                  <div className="text-xs uppercase tracking-wide text-gray-700 mb-2">Your chats</div>
                  <ul className="flex flex-col gap-1">
                    {DUMMY_CHATS.map((c) => (
                      <li key={c.id} className="flex items-start gap-3 px-2 py-2 rounded-2xl text-gray-500  hover:bg-gray-200 hover:text-[#091717]">
                        <div className="w-8 h-8 rounded-full bg-[#2795A2] flex items-center justify-center text-xs text-white ">{c.id.split("-")[1]}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="text-sm  truncate">{c.title}</div>
                            <div className="text-[11px]  ml-2">{c.time}</div>
                          </div>
                          <div className="text-[12px]  truncate">{c.snippet}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="h-6" />
              </div>
            ) : (
              // compact icon stack for collapsed state (vertical icons only)
              <div className="flex flex-col items-center space-y-3 mt-3">
                <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-zinc-800">
                  <Search className="w-5 h-5 text-[#091717]" />
                </button>
                <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-zinc-800">
                  <Zap className="w-5 h-5 text-[#091717]" />
                </button>
                <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-zinc-800">
                  <MessageCircle className="w-5 h-5 text-[#091717]" />
                </button>
                <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-zinc-800">
                  <Star className="w-5 h-5 text-[#091717]" />
                </button>
                <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-zinc-800">
                  <Settings className="w-5 h-5 text-[#091717]" />
                </button>
              </div>
            )}
          </div>

          {/* bottom area - profile + upgrade */}
          <div className="px-3 py-3 border-t border-zinc-800">
            {expanded ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#2795A2] flex items-center justify-center text-white">PI</div>
                  <div className="flex flex-col leading-tight">
                    <div className="text-sm text-black">Piyush 100x</div>
                    <div className="text-xs text-zinc-500">Free</div>
                  </div>
                </div>
                <button className="px-3 py-1 rounded-md bg-amber-400 text-xs text-black">Upgrade</button>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-[#2795A2] flex items-center justify-center text-white ">PI</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile bottom bar */}
      <nav className={CN("md:hidden fixed bottom-0 left-0 right-0 h-16 flex items-center justify-around px-4", BG)}>
        <button className="flex flex-col items-center text-zinc-300 text-[10px]"><Search className="w-5 h-5" />Home</button>
        <button className="flex flex-col items-center text-zinc-300 text-[10px]"><Grid className="w-5 h-5" />Dash</button>
        <button className="flex flex-col items-center text-zinc-300 text-[10px]"><Plus className="w-6 h-6" />New</button>
        <button className="flex flex-col items-center text-zinc-300 text-[10px]"><Star className="w-5 h-5" />Alerts</button>
        <button className="flex flex-col items-center text-zinc-300 text-[10px]"><User className="w-5 h-5" />Me</button>
      </nav>
    </div>
  );
}
