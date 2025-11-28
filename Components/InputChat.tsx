"use client";

import React, { useState, ChangeEvent, CSSProperties } from "react";
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

export default function InputChat() {
  const [text, setText] = useState<string>("");

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px";
    setText(target.value);
  };

  const bgStyle: CSSProperties = {
    backgroundImage: "url('/bgbg.png')", // file placed in public/bgbg.png
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="p-3 rounded-4xl border border-gray-50">
      <div className="p-3 rounded-4xl border border-gray-100">
        <div className="p-3 rounded-4xl border border-gray-200">
          <div className="p-3 rounded-4xl border border-gray-300">
            <div className="p-3  border border-gray-300  rounded-4xl overflow-hidden">
              <div
                className="min-h-[70vh] bg-[#191919] text-zinc-200 flex flex-col items-center justify-center p-3 font-sans selection:bg-[#22b8cf] selection:text-white rounded-[30px] overflow-hidden"
                style={bgStyle}
              >
                {/* Logo */}
                <h1 className="text-5xl md:text-6xl mb-10 font-serif tracking-tight text-[#e8e8e8]">
                  Skipper AI
                </h1>

                {/* Main Input Container */}
                <div className="w-full max-w-[800px] bg-white  rounded-4xl  transition-all duration-200 border border-gray-300 ">
                  {/* Text Area */}
                  <textarea
                    value={text}
                    onChange={handleInput}
                    placeholder="Ask anything. Type @ for mentions."
                    className="w-full bg-transparent text-lg text-[#091717] placeholder:text-zinc-500 p-6 min-h-[60px] max-h-[200px] resize-none focus:outline-none"
                    rows={1}
                    style={
                      { height: "auto", minHeight: "60px" } as CSSProperties
                    }
                  />

                  {/* Toolbar */}
                  <div className="flex items-center justify-between p-4">
                    {/* Left Controls */}
                    <div className="flex items-center gap-2">
                  
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 sm:gap-2 mr-2">
                        <button className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors rounded-full hover:bg-zinc-800">
                          <Globe size={18} />
                        </button>
                        <button className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors rounded-full hover:bg-zinc-800">
                          <Cpu size={18} />
                        </button>
                        <button className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors rounded-full hover:bg-zinc-800">
                          <Paperclip size={18} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="p-2.5 bg-[#0F1916] text-white rounded-full hover:bg-[#0F1916]/80 hover:text-zinc-200 transition-colors border border-zinc-800">
                          <Mic size={18} />
                        </button>

                        <button
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
                </div>

                          
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type SuggestionChipProps = {
  icon: React.ReactNode;
  label: string;
};

function SuggestionChip({ icon, label }: SuggestionChipProps) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-white  text-[#091717]  rounded-4xl text-sm font-medium transition-all duration-200">
      {icon}
      <span>{label}</span>
    </button>
  );
}
