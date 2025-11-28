'use client';

import React from 'react';
import { Triangle, Hexagon } from 'lucide-react';

export default function TrustedBrands() {
  return (
    <div className="w-full py-10 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10 md:gap-12">

        {/* Left Side: Static Text */}
        <div className="md:w-1/2 w-full shrink-0 relative z-10 pr-4 md:pr-8 lg:pr-12">
          <h2
            style={{ fontFamily: 'PPEditorialNew' }}
            className="text-2xl md:text-4xl lg:text-5xl leading-tight text-[#091717] tracking-tight max-w-lg"
          >
            Trusted by fast-moving
            <span className="block md:inline"> Venture Capital Firms</span>
          </h2>
        </div>

        {/* Right Side: Marquee Slider */}
        <div className="md:w-1/2 w-full relative overflow-hidden">
          {/* Gradient Overlays (left + right) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-20" aria-hidden>
            <div className="h-full w-full" style={{ background: 'linear-gradient(to right, white 0%, rgba(255,255,255,0.0) 60%)' }} />
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-20" aria-hidden>
            <div className="h-full w-full" style={{ background: 'linear-gradient(to left, white 0%, rgba(255,255,255,0.0) 60%)' }} />
          </div>

          {/* Scrolling Track */}
          <div className="relative z-10">
            <div className="flex gap-8 md:gap-12 items-center animate-infinite-scroll will-change-transform">
              {/* tripled list to ensure seamless loop */}
              {[...logos, ...logos, ...logos].map((brand, index) => (
                <div
                  key={index}
                  className="min-w-[120px] md:min-w-40 lg:min-w-[200px] flex items-center justify-center shrink-0 px-2 md:px-4"
                  title={brand.name}
                  role="img"
                >
                  <div className="flex items-center gap-3 md:gap-4 text-[#091717]">
                    {brand.component}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind Custom Animations & Styles */}
      <style jsx global>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.3333%); }
        }

        /* The animation duration will feel too slow on very small screens if left unchanged.
           We keep a single animation but allow users to reduce motion with prefers-reduced-motion. */
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }

        @media (max-width: 640px) {
          .animate-infinite-scroll {
            /* slightly faster on small screens so the marquee feels lively */
            animation-duration: 28s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-infinite-scroll {
            animation: none;
          }
        }

        /* Mask gradient to soften edges for browsers that support mask-image */
        .mask-gradient {
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }

        /* make sure icons inside logos scale nicely */
        .logo-icon { width: 28px; height: 28px; }

      `}</style>
    </div>
  );
}

// --- Logo recreations (kept visually identical but made responsive-friendly) ---

const LogoIndustville = () => (
  <span className="font-sans text-lg md:text-xl lg:text-2xl tracking-[0.12em] font-light text-[#091717]">INDUSTVILLE</span>
);

const LogoiStrap = () => (
  <div className="flex items-baseline gap-0.5 text-[#091717]">
    <span className="font-serif font-bold text-lg md:text-2xl">i</span>
    <span className="font-sans font-black text-lg md:text-2xl tracking-tighter">STRAP</span>
  </div>
);

const LogoMcRae = () => (
  <div className="font-light text-lg md:text-2xl text-[#091717] tracking-wide flex items-center gap-1">
    <span>M</span>
    <span className="underline decoration-1 underline-offset-4" style={{ textDecorationStyle: 'dotted' }}>c</span>
    <span>RAE</span>
  </div>
);

const LogoOuter = () => (
  <div className="flex items-center gap-2 text-[#091717]">
    <div className="relative w-6 h-6 md:w-8 md:h-8 border-2 text-[#091717] rotate-45 flex items-center justify-center">
      <div className="absolute w-full h-0.5 bg-current -rotate-45"></div>
      <div className="absolute h-full w-0.5 bg-current -rotate-45"></div>
    </div>
    <span className="font-sans text-lg md:text-2xl font-light lowercase tracking-wide">outer</span>
    <span className="text-[9px] self-start -mt-1">®</span>
  </div>
);

const LogoPhelan = () => (
  <div className="flex items-center gap-3 text-[#091717]">
    <Hexagon className="logo-icon md:logo-icon" />
    <div className="flex flex-col leading-none">
      <span className="font-bold text-sm md:text-sm tracking-widest uppercase">Phelan Shilo</span>
      <span className="text-[10px] tracking-widest uppercase text-[#091717]">Partners</span>
    </div>
  </div>
);

const LogoAspekt = () => (
  <div className="flex flex-col items-end text-[#091717] leading-none">
    <div className="flex items-center gap-2">
      <Triangle className="logo-icon md:logo-icon" />
      <span className="font-sans text-lg md:text-xl tracking-widest font-normal">ASPEKT.</span>
    </div>
    <span className="text-[8px] tracking-widest uppercase text-[#091717]">Architecture & Design</span>
  </div>
);

// Data array
const logos = [
  { name: 'Industville', component: <LogoIndustville /> },
  { name: 'iStrap', component: <LogoiStrap /> },
  { name: 'McRae', component: <LogoMcRae /> },
  { name: 'Outer', component: <LogoOuter /> },
  { name: 'Phelan', component: <LogoPhelan /> },
  { name: 'Aspekt', component: <LogoAspekt /> },
];
