'use client';


import React from 'react';
import { Triangle, Hexagon, Move, Layers, Box } from 'lucide-react';

export default function TrustedBrands() {
  return (
    <div className="w-full py-16 overflow-hidden">
      <div className=" mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Side: Static Text */}
        <div className="md:w-[50%] h-full shrink-0 relative z-10 pr-4 pl-[3cm]">
          <h2  style={{
              fontFamily:
                'PPEditorialNew',
            }}  className="text-3xl md:text-5xl  leading-tight text-[#091717] tracking-tight max-w-lg">
            Trusted by fast-moving
        
            <span className=""> Venture Capital Firms</span>
          </h2>
        </div>

        {/* Right Side: Marquee Slider */}
        <div className="md:w-[50%] h-full  w-full relative overflow-hidden mask-gradient">
          {/* Gradient Masks for smooth fade effect */}
          <div className="absolute top-0 left-0 w-24 h-full bg-linear-to-r from-white to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-24 h-full bg-linear-to-l` from-white to-transparent z-10"></div>

          {/* Scrolling Track */}
          <div className="flex gap-16 animate-infinite-scroll w-max items-center">
            {/* We duplicate the logos to ensure seamless looping */}
            {[...logos, ...logos, ...logos].map((brand, index) => (
              <div 
                key={index} 
                className=" transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0"
              >
                {brand.component}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind Custom Animations & Styles */}
      <style jsx global>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); } /* Move 1/3 because we tripled the items */
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div>
  );
}

// --- Logo Recreations to match the image ---

const LogoIndustville = () => (
  <span className="font-sans text-xl tracking-[0.2em] font-light text-[#091717]">
    INDUSTVILLE
  </span>
);

const LogoiStrap = () => (
  <div className="flex items-baseline gap-0.5  text-[#091717]">
    <span className="font-serif font-bold text-2xl">i</span>
    <span className="font-sans font-black text-2xl tracking-tighter">STRAP</span>
  </div>
);

const LogoMcRae = () => (
  <div className="font-light text-2xl  text-[#091717] tracking-wide flex items-center gap-1">
    <span>M</span>
    <span className="underline decoration-1 underline-offset-4" style={{ textDecorationStyle: 'dotted' }}>c</span>
    <span>RAE</span>
  </div>
);

const LogoOuter = () => (
  <div className="flex items-center gap-2  text-[#091717]">
    <div className="relative w-8 h-8 border-2  text-[#091717] rotate-45 flex items-center justify-center">
      <div className="absolute w-full h-0.5  text-[#091717] -rotate-45"></div>
      <div className="absolute h-full w-0.5  text-[#091717] -rotate-45"></div>
    </div>
    <span className="font-sans text-2xl font-light lowercase tracking-wide">outer</span>
    <span className="text-[10px] self-start -mt-1">®</span>
  </div>
);

const LogoPhelan = () => (
  <div className="flex items-center gap-3  text-[#091717]">
    <Hexagon className="w-8 h-8 fill-[#091717] stroke-none" />
    <div className="flex flex-col leading-none">
      <span className="font-bold text-sm tracking-widest uppercase">Phelan Shilo</span>
      <span className="text-[10px] tracking-widest uppercase  text-[#091717]">Partners</span>
    </div>
  </div>
);

const LogoAspekt = () => (
  <div className="flex flex-col items-end  text-[#091717] leading-none">
    <div className="flex items-center gap-2">
      <Triangle className="w-6 h-6 stroke-2" />
      <span className="font-sans text-xl tracking-widest font-normal">ASPEKT.</span>
    </div>
    <span className="text-[8px] tracking-widest uppercase  text-[#091717]">Architecture & Design</span>
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