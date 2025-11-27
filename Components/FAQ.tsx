"use client";

import React, { KeyboardEvent, useState } from "react";
import { Plus } from "lucide-react";

/**
 * FAQ.tsx
 *
 * Type-safe, responsive, and accessible FAQ accordion built with React + Tailwind CSS.
 * - Click or press Enter/Space to toggle an item
 * - Uses aria attributes for accessibility
 * - Responsive typography and spacing for all screen sizes
 * - Type-safe with explicit types for items and state
 *
 * Usage: drop this file into your components folder and import: `import FAQ from "./FAQ";`
 * Make sure Tailwind CSS and `lucide-react` are installed in your project.
 */

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  /** index to open by default (0-based). Pass `null` to have none open. Defaults to 1 to match screenshot. */
  defaultOpenIndex?: number | null;
  items?: FAQItem[];
};

const defaultItems: FAQItem[] = [
  {
    question: "How do I know which plan to pick?",
    answer:
      "We recommend starting with a plan that matches your monthly output needs. If you're unsure, choose the middle tier — you can always upgrade. Our onboarding team can also advise based on your use-case.",
  },
  {
    question: "How does onboarding works?",
    answer:
      "Once you sign up, we'll schedule an onboarding call to understand your brand guidelines, preferred file formats, and turnaround expectations. After that, submit requests via our platform and we'll allocate artists.",
  },
  {
    question: "Why wouldn't I just hire a full-time 3D artist?",
    answer:
      "Hiring full-time has overheads — salary, benefits, and downtime. With Rendify you get a vetted team of artists, flexible capacity, and predictable costs.",
  },
  {
    question: 'What does "unlimited 3D modeling/rendering" really mean?',
    answer:
      "Unlimited means you can submit as many requests as you like. Throughput depends on complexity and queue; we prioritize requests per your subscription SLA.",
  },
  {
    question: "How many 3D assets can I get in a month?",
    answer:
      "Output depends on complexity. Simple models/renderings are faster; complex scenes take longer. Check the plan details for typical monthly throughput estimates.",
  },
  {
    question: "Is there a limit to how many requests I can have?",
    answer:
      "No hard limit on requests — but we manage throughput to ensure quality. For very large volume needs we offer custom enterprise plans.",
  },
  

];

export default function FAQ({
  defaultOpenIndex = 1,
  items = defaultItems,
}: FAQProps): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    defaultOpenIndex ?? null
  );

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    // Toggle on Enter or Space for accessibility
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle(index);
    }
  };

  return (
    <section className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10 mt-6">
          <h2
            style={{
              fontFamily: "PPEditorialNew",
            }}
            className="text-3xl sm:text-4xl md:text-7xl  text-[#101828] tracking-tight mb-2"
          >
            Questions?
          </h2>
          <p className="text-xl sm:text-2xl md:text-5xl font-serif italic text-gray-600">
            We've got answers
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={index}
                className={`relative group w-full px-6 py-5 transition-all duration-200 ease-in-out bg-[#FAFAF2] border rounded-4xl 
                  ${isActive ? "border-[#E8E6DA]  z-10" : "border-[#E8E6DA]"}`}
              >
                <div
                  id={buttonId}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onClick={() => handleToggle(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="flex items-start sm:items-center justify-between space-x-4 cursor-pointer outline-none"
                >
                  <div className="flex-1 pr-3 mt-4">
                    <h3
                      className={`text-base sm:text-lg lg:text-xl font-medium leading-tight ${
                        isActive ? "text-[#101828]" : "text-[#101828]"
                      }`}
                    >
                      {item.question}
                    </h3>
                  </div>

                  <div className="flex-shrink-0 ml-2 mt-4 ">
                    <Plus
                      className={`w-5 h-5 transition-transform duration-200 transform ${
                        isActive ? "rotate-45" : "rotate-0"
                      } ${isActive ? "text-[#101828]" : "text-[#101828]"}`}
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                </div>

                {/* Collapsible panel */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out text-gray-700 ${
                    isActive
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
