"use client";

import React, { useEffect, useRef } from "react";
import { Instagram, Facebook, Dribbble, Sparkle } from "lucide-react";
import Link from "next/link";

/**
 * Footer.tsx
 *
 * Type-safe, responsive footer component with marquee and CTA buttons.
 * - Tailwind CSS utility classes
 * - Accessible: keyboard-focusable interactive elements, prefers-reduced-motion support
 * - Type-safe props with sensible defaults
 * - Decorative marquee marked aria-hidden
 *
 * Usage:
 * import Footer from './Footer';
 * <Footer />
 */

type LinkItem = {
  name: string;
  href?: string;
  primary?: boolean;
};

type FooterProps = {
  marqueeText?: string;
  marqueeRepeat?: number; // how many times the text is duplicated in one pass (higher = longer loop)
  links?: LinkItem[];
  brand?: {
    name: string;
    year?: number;
  };
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
}: FooterProps): React.ReactElement {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  // Respect prefers-reduced-motion: if user prefers reduced motion, pause the marquee
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const el = marqueeRef.current;
    if (mq.matches && el) {
      el.style.animationPlayState = "paused";
    }
    const listener = () => {
      if (el) el.style.animationPlayState = mq.matches ? "paused" : "running";
    };
    mq.addEventListener?.("change", listener);
    return () => mq.removeEventListener?.("change", listener);
  }, []);

  // Build repeated marquee items for seamless loop
  const group = Array.from({ length: marqueeRepeat }, () => marqueeText);

  const SocialIcons = [Instagram, Facebook, Dribbble] as const;

  return (
    <footer className="relative w-full bg-white text-white overflow-hidden font-sans">
      {/* Scrolling Marquee (decorative) */}
      <div className="w-full h-[20vh] bg-[#DFEFF1] text-[#111812] py-3 overflow-hidden border border-[#2795A2]">
        <div
          ref={marqueeRef}
          aria-hidden
          className="flex whitespace-nowrap will-change-transform animate-footer-marquee"
          // duplicate content visually to create seamless loop
        >
          {[...group, ...group].map((text, i) => (
            <div key={i} className="flex items-center mx-3 mt-2">
              <span
                style={{
                  fontFamily: "PPEditorialNew",
                }}
                className="text-3xl md:text-4xl lg:text-8xl font-medium tracking-tight leading-none  text-[#2795A2]/40 mt-4 "
              >
                {text}
              </span>
              <Sparkle
                className="w-16 h-16 ml-6 mt-3 text-[#2795A2]"
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="w-full h-full relative  flex justify-start items-start p-10">
        <div className="w-[50%]">
          <div className="flex flex-col justify-between h-full space-y-8">
            <div>
              <div className="flex items-center  mb-3 ">
                <span className="text-2xl  tracking-tight">
                  <div className="flex items-center space-x-2">
                    <img className="w-7 h-7" src="/log.png" alt="" />
                    <span className="text-xl  text-[#091717] font-serif">
                      Skipper AI
                    </span>
                  </div>
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "PPEditorialNew",
                }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-lg text-[#091717]"
              >
                Ask the AI, Build the
                <br />
                <span className="text-[#2795A2] font-bold"> Winning Team</span>
                <br />
              </h2>

              <div className="flex gap-3 mt-8">
                {SocialIcons.map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={`Follow us on ${Icon.name}`}
                    className="w-10 h-10 rounded-full bg-[#222722] flex items-center justify-center hover:bg-[#4ade80] hover:text-[#091717] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#86efac]"
                  >
                    <Icon size={18} aria-hidden />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 text-xs text-gray-500">
              <a
                href="#"
                className=""
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className=""
              >
                Terms And Conditions
              </a>
              <p className="mt-2 text-[12px] text-gray-500">
                Copyright {brand.year}  Skipper AI Technologies Inc.
              </p>
            </div>
          </div>
        </div>
        <div className="w-[50%] h-full flex flex-col  justify-center items-center">
          <div className="h-[50%] w-full">
            <div>
              <div className="flex flex-wrap gap-3">
                {links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href ?? "#"}
                    className={` text-center py-2 px-6 rounded-full text-lg ${
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
          </div>

          <div className="h-[50%] w-full">
            <div className=" flex justify-start  items-center select-none pointer-events-none ">
              <h1 className="text-[14vw] sm:text-[10vw] md:text-[8vw] lg:text-[10rem] text-[#96CBD2]  tracking-tighter font-serif ">
                Skipper AI
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles (kept scoped) */}
      <style>{`
        @keyframes footer-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-footer-marquee {
          animation: footer-marquee 28s linear infinite;
        }

        /* Make sure large text doesn't clip on very small screens */
        @media (max-width: 420px) {
          h1 { font-size: 9.5rem; }
        }
      `}</style>
    </footer>
  );
}
