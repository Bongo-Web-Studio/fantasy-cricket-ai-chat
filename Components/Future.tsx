"use client";

import React from "react";
import { Search, Globe, Mail, Layout } from "lucide-react";

// Small helper to avoid any `any` explosion in this single-file demo
type PropsWithChildren = { title: string; children: React.ReactNode };

// --- Responsive Illustrations (simplified & made flexible) ---
const SearchIllustration: React.FC = () => (
  <div className="flex flex-col h-full gap-4">
    {/* Illustration card area */}
    <div className="relative w-full rounded-xl p-4 md:p-6 bg-white/60 backdrop-blur-sm border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 md:gap-6">
      {/* Left sidebar (small indicators) */}
      <div className="shrink-0 flex items-start md:items-center w-full md:w-1/4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          <div className="hidden sm:block h-2 bg-gray-200 rounded w-20"></div>
        </div>
      </div>

      {/* Results area (responsive) */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>

        <div className="flex items-center gap-3 flex-wrap text-xs mt-3">
          <span className="px-2 py-1 bg-red-100 text-red-600 rounded">RU</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded">EU</span>
          <span className="px-2 py-1 border rounded text-gray-700">US</span>
          <span className="px-2 py-1 border rounded text-gray-700">UK</span>
        </div>
      </div>

      {/* Icon accent - positioned but responsive */}
      <Search className="hidden md:block w-5 h-5 text-blue-500 opacity-80 absolute top-6 left-6 transform -rotate-12" />
    </div>

    {/* Footer query (static, not absolutely positioned) */}
    <div className="w-full bg-white p-3 rounded-xl shadow mt-auto border border-gray-100">
      <p className="text-sm font-light text-gray-600 text-center truncate">
        How are different news outlets covering this differently?
      </p>
    </div>
  </div>
);

const OrganizationIllustration: React.FC = () => (
  <div className="flex flex-col h-full gap-4">
    <div className="w-full rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center gap-2 p-2 bg-gray-50 border-b border-gray-100 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded">
          <Layout className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">Framer</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 text-gray-500 rounded">
          <Search className="w-4 h-4" /> <span className="text-sm">Perplexity</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 text-gray-500 rounded">
          <Mail className="w-4 h-4" /> <span className="text-sm">Slack</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 text-gray-500 rounded">
          <div className="w-2 h-2 rounded-full bg-blue-500" /> <span className="text-sm">Notion</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 text-gray-500 rounded">
          <div className="w-2 h-2 rounded-full bg-green-500" /> <span className="text-sm">Linear</span>
        </div>
      </div>

      <div className="p-3">
        <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>

    <div className="w-full bg-white p-3 rounded-xl shadow border border-gray-100">
      <p className="text-sm font-light text-gray-600 text-center truncate">
        Organize my tabs by category and close the ones that are distractions
      </p>
    </div>
  </div>
);

const BuildIllustration: React.FC = () => (
  <div className="flex flex-col h-full gap-4">
    <div className="w-full rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm relative flex flex-col md:flex-row items-stretch">
      <div className="w-full md:w-1/3 p-4 flex items-center justify-center">
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-300 shadow-inner" style={{ backgroundImage: "url('https://placehold.co/100x100/A0856C/FFFFFF?text=Comet')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
      </div>

      <div className="flex-1 p-4 flex items-center">
        <div className="w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 bg-white shadow-sm truncate">
          Comets and the Cos<span className="animate-pulse">|</span>
        </div>
      </div>
    </div>

    <div className="w-full bg-white p-3 rounded-xl shadow border border-gray-100 opacity-80">
      <p className="text-sm font-light text-gray-600 text-center truncate">
        Create a 3D model of the cosmos
      </p>
    </div>
  </div>
);

const EmailIllustration: React.FC = () => (
  <div className="flex flex-col h-full gap-4">
    <div className="w-full rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center p-3 border-b border-gray-100 gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-200" />
        <div className="flex-1 h-3 bg-gray-100 rounded" />
        <div className="w-6 h-6 rounded-full bg-gray-200" />
      </div>

      <div className="p-4 space-y-3 relative">
        <div className="absolute left-3 top-6 hidden sm:block">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-corner-down-left h-4 w-4 text-gray-400"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 15h-4a4 4 0 0 1-4-4V4"></path></svg>
        </div>

        <div className="h-3 bg-gray-200 rounded w-1/2 ml-0 mt-2"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>

    <div className="w-full bg-white p-3 rounded-xl shadow border border-gray-100">
      <p className="text-sm font-light text-gray-600 text-center truncate">
        Draft a polite follow-up email to the client after the meeting
      </p>
    </div>
  </div>
);

// --- Reusable Card Component ---
const FeatureCard: React.FC<PropsWithChildren> = ({ title, children }) => {
  const cardBg = "bg-[#FAFAF2]";
  const cardBorder = "border border-[#E8E6DA]";

  return (
    <div className={`relative ${cardBg} ${cardBorder} rounded-3xl p-4 md:p-6 flex flex-col min-h-[340px] md:min-h-[420px] lg:min-h-[520px]`}> 
      <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <div className="flex-1">{children}</div>
    </div>
  );
};

// --- Main App Component ---
export default function Future(): React.ReactElement {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 font-sans ">
      {/* Header */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <h1 style={{ fontFamily: "PPEditorialNew" }} className="text-2xl sm:text-3xl md:text-4xl text-gray-900  mb-2">Make Winning Team With Skipper AI</h1>
      </div>

      {/* Responsive Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        <FeatureCard title="AI that understands">
          <SearchIllustration />
        </FeatureCard>

        <FeatureCard title="AI that organizes">
          <OrganizationIllustration />
        </FeatureCard>

        <FeatureCard title="AI that builds">
          <BuildIllustration />
        </FeatureCard>

        <FeatureCard title="AI that emails">
          <EmailIllustration />
        </FeatureCard>
      </div>

      <div className="h-12" />
    </div>
  );
}
