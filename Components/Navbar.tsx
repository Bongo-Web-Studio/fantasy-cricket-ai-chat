import React from "react";

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
        <img className="w-7 h-7" src="/log.png" alt="" />
          <span className="text-xl  text-[#343533] font-serif">Skipper AI</span>
        </div>

    
      </div>
    </header>
  );
}
