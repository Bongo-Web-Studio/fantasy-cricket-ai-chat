import React from "react";
import { Search, Globe, Mail, Layout } from "lucide-react"; // Using Lucide for icons, common in Next.js/Tailwind stack

// --- Helper Components for Illustrations (to achieve a "pixel-perfect" visual mimicry) ---

const SearchIllustration = () => (
  <div className="p-4 flex flex-col items-center justify-center h-full">
    {/* Main Illustration Area */}
    <div className="relative w-4/5 h-4/5 bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-inner border border-gray-100/50">
      {/* Search Input Simulation */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
        <div className="w-1/3 h-2 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-3">
        {/* Result blocks */}
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>

      {/* Query Lines and Globe icon */}
      <div className="absolute top-1/4 left-1/4">
        <Search className="w-4 h-4 text-blue-500 opacity-70 absolute top-[-10px] left-[-10px] transform -rotate-12" />
      </div>
      <div className="absolute bottom-6 left-6 right-6 flex justify-around p-1 rounded-lg border border-gray-100 bg-white/60">
        <div className="text-xs text-red-500 font-medium p-1 px-2 bg-red-100 rounded">
          RU
        </div>
        <div className="text-xs text-blue-500 font-medium p-1 px-2 bg-blue-100 rounded">
          EU
        </div>
        <div className="text-xs text-gray-700 font-medium p-1 px-2 rounded border border-gray-200">
          US
        </div>
        <div className="text-xs text-gray-700 font-medium p-1 px-2 rounded border border-gray-200">
          UK
        </div>
      </div>
    </div>
    {/* Bottom Query Box */}
    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] bg-white p-3 rounded-xl shadow-lg border border-gray-100">
      <p className="text-sm font-light text-gray-600 truncate text-center">
        How are different news outlets covering this differently?
      </p>
    </div>
  </div>
);

const OrganizationIllustration = () => (
  <div className="p-4 flex flex-col h-full overflow-hidden">
    {/* Browser Frame Simulation */}
    <div className="relative w-full h-[200px] bg-white rounded-t-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Top Bar with Tabs */}
      <div className="flex items-center h-8 bg-gray-50 border-b border-gray-200">
        <div className="text-sm font-medium px-4 h-full flex items-center bg-white border-r border-gray-200 shadow-inner">
          <Layout className="w-3 h-3 mr-1 text-gray-500" /> Framer
        </div>
        <div className="text-sm font-medium px-4 h-full flex items-center text-gray-500">
          <Search className="w-3 h-3 mr-1" /> Perplexity
        </div>
        <div className="text-sm font-medium px-4 h-full flex items-center text-gray-500">
          <Mail className="w-3 h-3 mr-1" /> Slack
        </div>
        <div className="text-sm font-medium px-4 h-full flex items-center text-gray-500">
          <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div> Notion
        </div>
        <div className="text-sm font-medium px-4 h-full flex items-center text-gray-500">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div> Linear
        </div>
      </div>
      {/* Content Area - minimal line to mimic content */}
      <div className="p-4">
        <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
    {/* Bottom Query Box */}
    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] bg-white p-3 rounded-xl shadow-lg border border-gray-100">
      <p className="text-sm font-light text-gray-600 truncate text-center">
        Organize my tabs by category and close the ones that are distractions
      </p>
    </div>
  </div>
);

const BuildIllustration = () => (
  <div className="p-4 flex flex-col h-full overflow-hidden">
    {/* Canvas Simulation */}
    <div className="relative w-full h-[200px] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Image Placeholder on Left */}
      <div className="absolute left-4 top-4 w-1/3 h-[calc(100%-32px)] bg-gray-300 rounded-lg shadow-inner">
        {/* Placeholder for Comet Image */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-lg opacity-70"
          style={{
            backgroundImage:
              "url('https://placehold.co/100x100/A0856C/FFFFFF?text=Comet')",
          }}
        ></div>
      </div>
      {/* Text Input/Prompt on Right */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-1/2">
        <div className="border border-gray-300 rounded-full py-2 px-4 text-gray-700 bg-white shadow-sm">
          Comets and the Cos<span className="animate-pulse">|</span>
        </div>
        {/* Mouse Pointer Mimic */}
        <div className="absolute -bottom-6 right-4 w-4 h-4 bg-gray-600 rounded-sm transform rotate-45 pointer-events-none"></div>
      </div>
    </div>
    {/* Bottom Query Box - hidden in this image, but often present below main canvas */}
    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] bg-white p-3 rounded-xl shadow-lg border border-gray-100 opacity-0 pointer-events-none">
      <p className="text-sm font-light text-gray-600 truncate text-center">
        Create a 3D model of the cosmos
      </p>
    </div>
  </div>
);

const EmailIllustration = () => (
  <div className="p-4 flex flex-col h-full overflow-hidden">
    {/* Email Client Simulation */}
    <div className="relative w-full h-[200px] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header/Controls */}
      <div className="flex items-center p-3 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
        <div className="flex-1 h-3 bg-gray-100 rounded mr-2"></div>
        <div className="w-6 h-6 rounded-full bg-gray-200"></div>
      </div>
      {/* Email Body Area */}
      <div className="p-4 space-y-3">
        {/* Reply/Forward Arrow */}
        <div className="absolute top-1/4 left-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-corner-down-left h-4 w-4 text-gray-400"
          >
            <polyline points="9 10 4 15 9 20"></polyline>
            <path d="M20 15h-4a4 4 0 0 1-4-4V4"></path>
          </svg>
        </div>
        {/* Draft Text Lines */}
        <div className="h-3 bg-gray-200 rounded w-1/2 ml-10 mt-2"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
    {/* Bottom Query Box */}
    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] bg-white p-3 rounded-xl shadow-lg border border-gray-100">
      <p className="text-sm font-light text-gray-600 truncate text-center">
        Draft a polite follow-up email to the client after the meeting
      </p>
    </div>
  </div>
);

// --- Reusable Card Component ---

const FeatureCard = ({ title, children }: any) => {
  // Card background color looks like a warm white/cream color
  const cardBg = "bg-[#FAFAF2]";
  const cardBorder = "border border-[#E8E6DA]";
  const cardShadow = "";

  return (
    <div
      className={`relative ${cardBg} ${cardBorder} ${cardShadow} rounded-4xl p-6 h-[600px] overflow-hidden flex flex-col`}
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="flex-1 relative">{children}</div>
    </div>
  );
};

// --- Main App Component ---

export default function Future() {
  // Main background color is a very light, warm off-white (beige tint)
  const mainBg = "bg-[#F8F6F4]"; // Close to the visual in the screenshot

  return (
    <div className={` min-h-screen  px-4 sm:px-8 font-sans`}>
      {/* Header Section */}
      <div className="text-center mb-16 mt-10 max-w-4xl mx-auto">
        <h1
          style={{
            fontFamily: "PPEditorialNew",
          }}
          className="text-4xl sm:text-5xl  text-gray-900 mb-4"
        >
          Make Winning Team With Skipper AI
        </h1>
 
      </div>

      {/* 2x2 Feature Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: AI that understands */}
        <FeatureCard title="AI that understands">
          <SearchIllustration />
        </FeatureCard>

        {/* Card 2: AI that organizes */}
        <FeatureCard title="AI that organizes">
          <OrganizationIllustration />
        </FeatureCard>

        {/* Card 3: AI that builds */}
        <FeatureCard title="AI that builds">
          <BuildIllustration />
        </FeatureCard>

        {/* Card 4: AI that emails */}
        <FeatureCard title="AI that emails">
          <EmailIllustration />
        </FeatureCard>
      </div>

      {/* Ensure component takes up space to show background */}
      <div className="h-16"></div>
    </div>
  );
}
