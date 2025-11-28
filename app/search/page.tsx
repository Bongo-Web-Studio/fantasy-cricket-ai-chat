"use client";

import React, { CSSProperties, useEffect, useRef, useState } from "react";
import Sidebar from "./Components/Sidebar";
import SearchComponent from "./Components/SearchComponent";
import Suggestions from "./Components/Suggestions";

const BG_DARK = "bg-[#0A0A0A]";
const TEXT_DEFAULT = "text-gray-100";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export default function App(): React.ReactElement {
  const [showHero, setShowHero] = useState<boolean>(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const bgStyle: CSSProperties = {
    backgroundImage: "url('/bgbg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  // handle incoming user messages from SearchComponent
  const handleSend = (value: string) => {
    const id = String(Date.now());
    const userMsg: ChatMessage = { id, role: "user", text: value };
    setMessages((prev) => [...prev, userMsg]);

    // optional: simulate assistant response
    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `${id}-r`,
        role: "assistant",
        text: `Received your message: "${value}" — how can I help further?`,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 700);

    // hide hero after first message
    setShowHero(false);
  };

  // auto-scroll to bottom when messages change
  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

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
              {/* simple hamburger icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileSidebarOpen(false)} />
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
        <main className="flex-1  lg:ml-40 h-full flex flex-col">
          {/* top spacer to avoid overlap with mobile top nav */}
          <div className="h-14 md:h-0" />

          <div className="flex-1 flex items-stretch justify-center overflow-hidden">
            <div className="w-full max-w-3xl flex flex-col h-full">

              {/* Chat header (sticky) */}
              <div className="sticky top-0 z-10 bg-transparent px-4 py-4 md:py-6 border-b border-white/6 flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-xl md:text-2xl">Skipper AI</h1>
              
                </div>

             
              </div>

              {/* Messages / suggestions area */}
              <div ref={messagesRef} className="flex-1 overflow-auto px-4 py-6 space-y-6">
                {/* Optional hero / welcome card */}
              

                {/* Suggestions component as quick actions */}
                {/* <div className="mx-auto w-full max-w-3xl">
                  <Suggestions onSelect={handleSend} />
                </div> */}

                {/* Dynamic messages */}
                <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`max-w-[85%] p-3 rounded-2xl ${
                        m.role === "user" ? "self-end bg-white text-black" : "self-start bg-white text-black"
                      }`}
                    >
                      {m.text}
                    </div>
                  ))}
                </div>

                {/* extra bottom padding so the last message isn't hidden by the fixed input */}
                <div className="h-28 md:h-32" />
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
