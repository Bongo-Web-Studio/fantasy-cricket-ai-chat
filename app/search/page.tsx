"use client";

import React, { CSSProperties, useState } from "react";
import Sidebar from "./Components/Sidebar";
import SearchComponent from "./Components/SearchComponent";
import Suggestions from "./Components/Suggestions";


const BG_DARK = "bg-[#0A0A0A]";
const TEXT_DEFAULT = "text-gray-100";

export default function App(): React.ReactElement {
  const [showHero, setShowHero] = useState<boolean>(true);

  const bgStyle: CSSProperties = {
    backgroundImage: "url('/bgbg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const handleSuggestionClick = (text: string) => {
    console.log("Selected suggestion:", text);
    setShowHero(false);
  };

  return (
    <div
      style={bgStyle}
      className={`${BG_DARK} ${TEXT_DEFAULT} min-h-screen w-full font-sans relative`}
    >
      <Sidebar />

      <div className="min-h-screen flex flex-col items-center">
        {showHero && (
          <header className="w-full pt-20 md:pt-28 flex justify-center px-6">
            <h1
              className="font-serif text-center leading-tight text-white/95 mt-10
                       text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[8rem] tracking-tight"
              aria-label="Skipper AI"
            >
              Skipper AI
            </h1>
          </header>
        )}

        <div className=" ml-[13cm]  mt-[3cm]">
          <Suggestions onSelect={handleSuggestionClick} />
        </div>

        <main className="w-full flex-1 flex items-start justify-center   absolute  bottom-5 left-0 right-0">
          <div className="w-full max-w-4xl">
            <SearchComponent />
          </div>
        </main>
      </div>
    </div>
  );
}
