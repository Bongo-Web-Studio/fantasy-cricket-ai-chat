import React from "react";
import { FiArrowDown, FiArrowRight, FiDownload } from "react-icons/fi";
import MessageBubbleLeft from "./MessageBubbleLeft";

export default function HeroSection() {
  const avatars = [
    {
      src: "https://pbs.twimg.com/profile_images/1933222335932477441/2UeTXJXZ_400x400.jpg",
      name: "Sagar",
    },
    { src: "https://randomuser.me/api/portraits/men/32.jpg", name: "Rahul" },
    { src: "https://randomuser.me/api/portraits/women/44.jpg", name: "Priya" },
    { src: "https://randomuser.me/api/portraits/men/65.jpg", name: "Amit" },
    { src: "https://randomuser.me/api/portraits/women/68.jpg", name: "Neha" },
  ];

  const visible = 4; // how many avatars to show before a "+N" pill

  return (
    <section className="relative w-full bg-white text-[#091717] font-sans flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center ">
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start md:items-start text-left mt-10 ">
          {/* Trusted by row */}
          <div className="flex items-center gap-4 mb-6 ml-2">
            <div className="flex items-center bg-white border border-gray-200 rounded-full px-1 py-1 pr-3">
              <div className="flex -space-x-3 items-center ">
                {avatars.slice(0, visible).map((a, i) => (
                  <img
                    key={i}
                    src={a.src}
                    alt={`Avatar of ${a.name}`}
                    title={a.name}
                    className="w-7 h-7 rounded-full ring-2 ring-white border border-gray-100 object-cover"
                  />
                ))}
              </div>

              <span className="ml-1  text-gray-700 font-light hidden sm:inline">
                Trusted By Thousands
              </span>
              {/* small-screen text variant */}
              <span className="ml-1 text-sm tex-[#2795A2] font-light sm:hidden">
                Trusted
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily:
                'PPEditorialNew',
            }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-light max-w-3xl"
          >
            Ask the AI, Build the <br className="hidden sm:block" />
            <span className="font-semibold text-[#2795A2]"> Winning Team</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-2 text-base sm:text-lg md:text-2xl text-gray-700 font-light max-w-2xl ml-3">
            Your Data-Driven Edge in Fantasy Cricket. <br /> Powered by
            Intelligence.
          </p>
          <div className="p-1 border border-gray-100 rounded-full mt-8 ml-[-10] ">
            <div className="p-1 border border-gray-300 rounded-full">
              <div className="p-1 border border-gray-300 rounded-full">
                <div className="p-1 border border-gray-400 rounded-full">
                  {/* CTA */}
                  <div className="flex items-center gap-4 w-full">
                    <a
                      href="#"
                      className="gap-4 inline-flex items-center px-2 py-2 pr-7 rounded-full bg-[#0F1916] text-white text-lg transform transition-transform hover:scale-[1.03] active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-300"
                      aria-label="Get Early Access"
                    >
                      <span className="px-3 py-3 rounded-full bg-white text-black">
                        <FiArrowRight
                          className="w-5 h-5 hover:rotate-90"
                          aria-hidden
                        />
                      </span>
                      <span> Get Early Access</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image / Illustration */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative mt-[2cm] overflow-hidden">
          <div className="relative w-full h-64 sm:h-80 md:h-[520px]  overflow-hidden">
            {/* Main Image */}
            <img
              src="/mainbg.png"
              alt="Hero illustration"
              className="absolute inset-0 w-full h-full object-contain z-50 mt-5"
            />

            {/* LEFT EDGE WHITE BLUR */}
            <div className="absolute -left-5 top-2.5 h-full w-24 bg-white blur-[5px] z-20 pointer-events-none" />

            <div className="absolute left-0 -top-2 h-[1cm] w-full bg-white  blur-[5px]  z-20 pointer-events-none" />

            {/* RIGHT EDGE WHITE BLUR */}
            <div className="absolute right-[-30px] top-2.5 h-full w-24 bg-white blur-[10px] z-20 pointer-events-none" />
          </div>

          {/* Behind background image */}
          <div className="absolute top-0 left-0 h-full w-full z-0">
            <img
              className="w-full h-full object-cover rounded-4xl"
              src="/bgbg.png"
              alt=""
            />
          </div>
        </div>

        <div className="absolute top-[20%]  right-[-1%] z-60  max-w-[9cm]  p-2 ">
          <h1 className="text-left ">
            <MessageBubbleLeft />
          </h1>
        </div>
      </div>
    </section>
  );
}
