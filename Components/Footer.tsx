"use client";

import React, { useEffect, useRef } from "react";
import { Instagram, Facebook, Dribbble, Sparkle } from "lucide-react";
import Link from "next/link";

type LinkItem = { name: string; href?: string; primary?: boolean };
type FooterProps = {
  marqueeText?: string;
  marqueeRepeat?: number;
  links?: LinkItem[];
  brand?: { name: string; year?: number };
};

const defaultLinks: LinkItem[] = [
  { name: "Services" },
  { name: "How it works" },
  { name: "Our Work" },
  { name: "Benefits" },
  { name: "Pricing" },
  { name: "Our People" },
  { name: "Career" },
  { name: "Get Early Access", primary: true },
];

export default function Footer({
  marqueeText = "Get Early Access",
  marqueeRepeat = 14,
  links = defaultLinks,
  brand = { name: "Rendify", year: new Date().getFullYear() },
}: FooterProps) {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const el = marqueeRef.current;
    if (mq.matches && el) el.style.animationPlayState = "paused";

    const listener = () => {
      if (el) el.style.animationPlayState = mq.matches ? "paused" : "running";
    };
    mq.addEventListener?.("change", listener);
    return () => mq.removeEventListener?.("change", listener);
  }, []);

  const group = Array.from({ length: marqueeRepeat }, () => marqueeText);
  const SocialIcons = [Instagram, Facebook, Dribbble] as const;

  return (
    <footer className="relative w-full bg-white overflow-hidden font-sans">
      {/* MARQUEE */}
      <div className="w-full h-[18vh] sm:h-[20vh] bg-[#DFEFF1] text-[#111812] py-3 overflow-hidden border border-[#2795A2]">
        <div
          ref={marqueeRef}
          aria-hidden
          className="flex whitespace-nowrap will-change-transform animate-footer-marquee"
        >
          {[...group, ...group].map((text, i) => (
            <div key={i} className="flex items-center mx-3 mt-2">
              <span
                style={{ fontFamily: "PPEditorialNew" }}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-[#2795A2]/40 mt-4"
              >
                {text}
              </span>
              <Sparkle className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ml-4 sm:ml-6 mt-3 text-[#2795A2]" aria-hidden />
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full relative grid grid-cols-1 md:grid-cols-2 gap-10 p-6 sm:p-10">
        {/* LEFT */}
        <div className="flex flex-col justify-between space-y-10 md:space-y-16">
          <div>
            <div className="flex items-center mb-3">
              <div className="flex items-center space-x-2">
                <img className="w-7 h-7" src="/log.png" alt="logo" />
                <span className="text-xl text-[#091717] font-serif">Skipper AI</span>
              </div>
            </div>

            <h2
              style={{ fontFamily: "PPEditorialNew" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-lg text-[#091717] leading-tight"
            >
              Ask the AI, Build the
              <br />
              <span className="text-[#2795A2] font-bold">Winning Team</span>
            </h2>

            <div className="flex gap-3 mt-8">
              {SocialIcons.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={`Follow us on ${Icon.name}`}
                  className="w-10 h-10 rounded-full bg-[#0F1916] flex items-center justify-center text-white transition"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs text-gray-500">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms And Conditions</a>
            <p className="mt-2 text-[12px]">Copyright {brand.year} Skipper AI Technologies Inc.</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-between items-start">
          <div className="w-full">
            <div className="flex flex-wrap gap-3">
              {links.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href ?? "#"}
                  className={`text-center py-2 px-6 rounded-full text-sm sm:text-base lg:text-lg ${
                    link.primary
                      ? "bg-[#2795A2] border border-[#2795A2] text-white"
                      : "bg-[#FAFAF2] text-[#101828] border border-[#E0DED1]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full select-none pointer-events-none mt-10 md:mt-0">
            <h1 className="text-[18vw] sm:text-[12vw] md:text-[10vw] lg:text-[9rem] text-[#96CBD2] tracking-tighter font-serif leading-none">
              Skipper AI
            </h1>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes footer-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-footer-marquee {
          animation: footer-marquee 28s linear infinite;
        }
      `}</style>
    </footer>
  );
}