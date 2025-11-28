"use client"

import React, { FC, ReactElement, cloneElement, useState } from "react";

/* --- Colors kept from your original file so UI stays visually identical --- */
const LIGHT_BG_COLOR = "#f0f9f3";
const DARK_FOOTER_COLOR = "#183424";

/* Placeholder images — replace with real assets */
const FOUNDER_IMAGE_URL = "/founder.jpg";
const PLACEHOLDER_TEAM_IMG = "/team/placeholder.jpg";

/* ---------- Types ---------- */
interface TeamMember {
  role: string;
  name: string;
  title: string;
  image?: string;
  description?: string;
}

const TEAM_KEYS = ["CEO", "COO", "COM", "CTO", "Phoenix Capital", "Team"] as const;
type TeamKey = (typeof TEAM_KEYS)[number];

interface LogoItem {
  name: TeamKey;
  element?: ReactElement;
  style?: string;
  isDark?: boolean;
}

/* ---------- Team data (dummy) ---------- */
const teamData: Record<TeamKey, TeamMember> = {
  CEO: {
    role: "CEO",
    name: "Piyush 100x",
    title: "Co-Founder and CEO, Skipper AI",
    image: "/team/ceo.jpg",
    description:
      "Rendify is, hands-down, one of the best services we’ve signed up for in years. Their team makes collaboration effortless — asking clear, focused questions, taking feedback in stride, and delivering results that genuinely wow.",
  },
  COO: {
    role: "COO",
    name: "Anita Shah",
    title: "Chief Operating Officer",
    image: "/team/coo.jpg",
    description:
      "Anita manages day-to-day operations, streamlines processes, and ensures the team ships high-quality work on time. She's known for clear communication and pragmatic decision-making.",
  },
  COM: {
    role: "COM",
    name: "R. Campos",
    title: "Communications Lead",
    image: "/team/com.jpg",
    description:
      "Leads external communications, community outreach, and brand voice. Skilled at turning complex product ideas into compelling stories.",
  },
  CTO: {
    role: "CTO",
    name: "S. Verma",
    title: "Chief Technology Officer",
    image: "/team/cto.jpg",
    description:
      "Heads engineering and product architecture, building scalable and secure systems while mentoring the engineering team.",
  },
  "Phoenix Capital": {
    role: "Phoenix Capital",
    name: "Phoenix Capital",
    title: "Lead Design Partner",
    image: "/team/phoenix.jpg",
    description: "A design partner who provided early-stage brand guidance and product direction.",
  },
  Team: {
    role: "Team",
    name: "Design & Growth Team",
    title: "Team",
    image: "/team/team.jpg",
    description: "Cross-functional team working on design, product growth, and customer success.",
  },
};

/* ---------- Logos array: preserves original special 'CEO' block and text look ---------- */
const logos: LogoItem[] = [
  {
    name: "CEO",
    element: (
      <div className="flex items-center justify-center h-full bg-inherit text-white">
        <span className="text-xl font-serif italic tracking-tight">CEO</span>
      </div>
    ),
    isDark: true,
  },
  { name: "COM", style: "text-[#101828] text-xl font-serif italic tracking-widest lg:text-lg" },
  { name: "CTO", style: "text-[#101828] text-xl font-serif italic tracking-wide lg:text-lg" },
  {
    name: "Phoenix Capital",
    element: (
      <div className="text-[#101828] text-xl font-serif italic leading-none hidden sm:block">
        <span className="block">Lead Design</span>
      </div>
    ),
  },
  { name: "Team", style: "text-[#101828] text-xl font-serif italic font-light lg:text-2xl" },
];

/* ---------- Component ---------- */
const FounderSection: FC = () => {
  // default selection shown in testimonial area
  const [selected, setSelected] = useState<TeamKey>("CEO"); // show CEO initially

  const openRole = (roleName: TeamKey) => {
    if (teamData[roleName]) setSelected(roleName);
    else setSelected("Team");
  };

  const current = teamData[selected] || {};

  return (
    <div className="flex items-center justify-center font-sans py-6">
      <div className="w-full max-w-[87%] rounded-4xl overflow-hidden">
        {/* Main Testimonial Card */}
        <div
          className="bg-[#2795A2]/15 p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 rounded-t-4xl border-t border-l border-r border-[#2795A2]/60"
        >
          {/* Left: Image Section - updates with selection (responsive) */}
          <div className="flex-shrink-0 w-full sm:w-40 md:w-48 lg:w-60 aspect-square rounded-4xl overflow-hidden shadow-md transition-all duration-300 ease-in-out">
            <img
              // show selected person's image, fallback to founder or placeholder
              src={(current.image as string) || FOUNDER_IMAGE_URL || PLACEHOLDER_TEAM_IMG}
              alt={current.name || "Founder"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Testimonial Content - updates with selection */}
          <div className="flex-1 transition-all duration-300 ease-in-out">
            <h2
              style={{ fontFamily: "PPEditorialNew" }}
              className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-3 mb-1"
            >
              {current.name || "Piyush 100x"}
            </h2>
            <h3 className="text-sm sm:text-lg font-medium text-gray-600 mb-4 pb-2">
              {current.title || "Co-Founder and CEO, Skipper AI"}
            </h3>

            <p className="text-base sm:text-lg leading-relaxed text-gray-700">
              {current.description ? (
                <>{current.description}</>
              ) : (
                <>
                  Rendify is, hands-down, one of the <span className="text-[#2795A2]">best services we’ve signed up for in years</span>. Their team makes collaboration effortless - asking clear, focused questions, taking feedback in stride, and delivering results that genuinely wow.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Company Logo Footer Section - responsive grid */}
        <div
          className="bg-[#2795A2] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-x divide-white h-20"
          style={{ backgroundColor: "rgba(39,149,162,0.25)" }}
        >
          {logos.map((logo) => {
            const isActive = selected === logo.name;
            return (
              <button
                key={logo.name}
                onClick={() => openRole(logo.name)}
                className={`flex items-center justify-center p-2 transition duration-300 hover:bg-[#2795A2]/70 ${
                  isActive ? "" : ""
                }`}
                style={logo.name === "CEO" ? { backgroundColor: "#2795A2" } : {}}
                aria-pressed={isActive}
                aria-label={`Show ${logo.name} details`}
              >
           
                  <span className={`${logo.style} ${isActive ? "underline decoration-[#2795A2]" : ""}`}>
                    {logo.name}
                  </span>
              
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FounderSection;
