"use client";

import React, { useState, ChangeEvent, CSSProperties, KeyboardEvent, FormEvent } from "react";
import {
  Search,
  Infinity,
  Globe,
  Cpu,
  Paperclip,
  Mic,
  AudioLines,
  Scale,
  Heart,
  CheckCircle2,
  GitGraph,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function InputChat() {
  const [text, setText] = useState<string>("");
  const router = useRouter();

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px";
    setText(target.value);
  };

  const handleSubmit = (value?: string) => {
    const query = (value ?? text).trim();
    if (!query) return;
    // navigate to /search with query param q
    router.push(`/search?q=${encodeURIComponent(query)}`);
    // optional: clear text (not strictly necessary if navigating away)
    // setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // If Enter pressed without Shift -> submit & prevent newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  const bgStyle: CSSProperties = {
    backgroundImage: "url('/bgbg.png')", // file placed in public/bgbg.png
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="p-1 sm:p-4 md:p-6 rounded-4xl border border-gray-50">
      <div className="p-1 sm:p-4 md:p-5 rounded-4xl border border-gray-100">
        <div className="p-1 sm:p-4 rounded-4xl border border-gray-200">
          <div className="p-1 sm:p-4 rounded-4xl border border-gray-300">
            <div className="p-1 sm:p-4 border border-gray-300 rounded-4xl overflow-hidden">
              <div
                className="min-h-[55vh] sm:min-h-[65vh] md:min-h-[70vh] bg-[#191919] text-zinc-200 flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 font-sans selection:bg-[#22b8cf] selection:text-white rounded-[30px] overflow-hidden"
                style={bgStyle}
              >
                {/* Logo */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl mb-8 sm:mb-10 font-serif tracking-tight text-[#e8e8e8] text-center">
                  Skipper AI
                </h1>

                {/* Main Input Container */}
                <div className="w-full max-w-[800px] sm:max-w-[900px] bg-white rounded-4xl transition-all duration-200 border border-gray-300">
                  {/* Wrap in a form so submit works with the button */}
                  <form onSubmit={handleFormSubmit}>
                    {/* Text Area */}
                    <textarea
                      value={text}
                      onChange={handleInput}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask anything. Type @ for mentions."
                      className="w-full bg-transparent text-base sm:text-lg md:text-lg text-[#091717] placeholder:text-zinc-500 p-4 sm:p-6 min-h-[60px] sm:min-h-20 max-h-[200px] sm:max-h-[300px] resize-none focus:outline-none"
                      rows={1}
                      style={{ height: "auto", minHeight: 60 } as CSSProperties}
                    />

                    {/* Toolbar */}
                    <div className="flex items-center justify-between p-3 sm:p-4 flex-wrap">
                      {/* Left Controls */}
                      <div className="flex items-center gap-2">
                        {/* keep for future chips - hidden on very small screens to preserve layout */}
                        <div className="hidden sm:flex items-center gap-2"></div>
                      </div>

                      {/* Right Controls */}
                      <div className="flex items-center gap-3 mt-2 sm:mt-0">
                        <div className="flex items-center gap-1 sm:gap-2 mr-2">
                          <button
                            type="button"
                            className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors rounded-full hover:bg-zinc-800"
                            title="Language / Region"
                          >
                            <Globe size={18} />
                          </button>
                          <button
                            type="button"
                            className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors rounded-full hover:bg-zinc-800"
                            title="Model"
                          >
                            <Cpu size={18} />
                          </button>
                          <button
                            type="button"
                            className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors rounded-full hover:bg-zinc-800"
                            title="Attach"
                          >
                            <Paperclip size={18} />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="p-2.5 bg-[#0F1916] text-white rounded-full hover:bg-[#0F1916]/80 hover:text-zinc-200 transition-colors border border-zinc-800 hidden sm:inline-flex"
                            title="Voice"
                            onClick={() => {
                              /* placeholder for mic action */
                            }}
                          >
                            <Mic size={18} />
                          </button>

                          <button
                            type="submit"
                            aria-label="Send"
                            className={`p-2.5 rounded-full transition-all duration-200 ${
                              text.trim().length > 0
                                ? "bg-[#22b8cf] text-white hover:bg-[#1faac0]"
                                : "bg-[#22b8cf] text-black hover:bg-[#1faac0]"
                            }`}
                          >
                            {text.trim().length > 0 ? (
                              <ArrowRight size={18} strokeWidth={2.5} />
                            ) : (
                              <AudioLines size={18} strokeWidth={2.5} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
