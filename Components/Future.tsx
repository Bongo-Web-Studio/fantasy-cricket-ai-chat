"use client";

import React from "react";
import { Search, Globe, Mail, Layout } from "lucide-react";

// Small helper to avoid any `any` explosion in this single-file demo
type PropsWithChildren = { title: string; children: React.ReactNode };

// --- Responsive Illustrations (simplified & made flexible) ---
const SearchIllustration: React.FC = () => (
  <div className="flex flex-col h-full gap-4">

   <img className="w-full h-full object-cover rounded-4xl overflow-hidden"  src="/i1.png" alt="" />
  </div>
);

const OrganizationIllustration: React.FC = () => (
  <div className="flex flex-col h-full gap-4">
 
   <img className="w-full h-full object-cover rounded-4xl overflow-hidden" src="/i2.png" alt="" />
  </div>
);

const BuildIllustration: React.FC = () => (
  <div className="flex flex-col h-full gap-4">
   
   <img className="w-full h-full object-cover object-right rounded-4xl overflow-hidden" src="/i3.png" alt="" />
  </div>
);

const EmailIllustration: React.FC = () => (
  <div className="flex flex-col h-full gap-4">
     <img className="w-full h-full object-cover rounded-4xl overflow-hidden" src="/i4.png" alt="" />
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
        <FeatureCard title="AI That Understand's You ">
          <SearchIllustration />
        </FeatureCard>

        <FeatureCard title="AI That Give All Data About Player">
          <OrganizationIllustration />
        </FeatureCard>

        <FeatureCard title="AI That Builds Real Time Graphs">
          <BuildIllustration />
        </FeatureCard>

        <FeatureCard title="AI That Compare Two Player's">
          <EmailIllustration />
        </FeatureCard>
      </div>

      <div className="h-12" />
    </div>
  );
}
