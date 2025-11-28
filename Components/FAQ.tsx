"use client";

import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

/**
 * FAQ.tsx
 *
 * Responsive, type-safe FAQ accordion built with React + Tailwind CSS.
 * - Click or press Enter/Space to toggle an item
 * - ArrowUp/ArrowDown/Home/End key support for keyboard navigation
 * - Uses aria attributes for accessibility
 * - Smooth height animation using runtime measured height
 * - Does not change visual UI/UX — only improves responsiveness & accessibility
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
    answer: "For Now it's Free",
  },
  { question: "How does onboarding works?", answer: "just chat " },
  { question: "Why wouldn't I just hire Dream 11", answer: "Money issuse" },
  {
    question: "What does unlimited chat",
    answer: "Unlimited means you can  ue free",
  },
  { question: "How much Money can I get in a month?", answer: "May be 1cr" },
  {
    question: "Is there a limit to how many requests I can have?",
    answer: "Yes ",
  },
];

export default function FAQ({
  defaultOpenIndex = 1,
  items = defaultItems,
}: FAQProps): React.ReactElement {
  // ensure type-safety for active index
  const [activeIndex, setActiveIndex] = useState<number | null>(
    defaultOpenIndex ?? null
  );

  // Refs for measuring panel height for smooth animation
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Keep refs in sync when items length changes
  useEffect(() => {
    panelRefs.current = panelRefs.current.slice(0, items.length);
  }, [items.length]);

  // If defaultOpenIndex is out of range, normalize it
  useEffect(() => {
    if (defaultOpenIndex == null) return;
    if (defaultOpenIndex < 0 || defaultOpenIndex >= items.length) {
      setActiveIndex(null);
    } else {
      setActiveIndex(defaultOpenIndex);
    }
    // only run on mount or when defaultOpenIndex/items length change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultOpenIndex, items.length]);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const key = e.key;

    // Toggle on Enter or Space for accessibility
    if (key === "Enter" || key === " " || key === "Spacebar") {
      e.preventDefault();
      handleToggle(index);
      return;
    }

    // Navigation between headers
    if (key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % items.length;
      const nextButton = document.getElementById(
        `faq-button-${next}`
      ) as HTMLButtonElement | null;
      nextButton?.focus();
      return;
    }

    if (key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + items.length) % items.length;
      const prevButton = document.getElementById(
        `faq-button-${prev}`
      ) as HTMLButtonElement | null;
      prevButton?.focus();
      return;
    }

    if (key === "Home") {
      e.preventDefault();
      const first = document.getElementById(
        `faq-button-0`
      ) as HTMLButtonElement | null;
      first?.focus();
      return;
    }

    if (key === "End") {
      e.preventDefault();
      const last = document.getElementById(
        `faq-button-${items.length - 1}`
      ) as HTMLButtonElement | null;
      last?.focus();
      return;
    }
  };

  return (
    <section className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8 mt-6">
          <h2
            style={{ fontFamily: "PPEditorialNew" }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-[#101828] tracking-tight mb-2"
          >
            Questions?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic text-gray-600">
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
                className={`relative group w-full px-6 py-5 transition-all duration-200 ease-in-out bg-[#FAFAF2]  rounded-2xl sm:rounded-4xl border border-[#E8E6DA]`}
              >
                {/* Use a native button for better semantics but keep visual layout identical */}
                <button
                  id={buttonId}
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onClick={() => handleToggle(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-full flex items-start sm:items-center justify-between space-x-4 cursor-pointer outline-none text-left "
                >
                  <div className="flex-1 pr-3 mt-1 sm:mt-0">
                    <h3
                      className={`text-base sm:text-lg lg:text-xl font-medium leading-tight text-[#101828]`}
                    >
                      {item.question}
                    </h3>
                  </div>

                  <div className="shrink-0 ml-2 mt-1 sm:mt-0">
                    <Plus
                      className={`w-5 h-5 transition-transform duration-200 transform ${
                        isActive ? "rotate-45" : "rotate-0"
                      } text-[#101828]`}
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                </button>

                {/* Collapsible panel - measure scrollHeight for smooth animation */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  ref={(el) => {
                    panelRefs.current[index] = el;
                  }}
                  className="mt-4 overflow-hidden transition-all duration-300 ease-in-out text-gray-700"
                  style={{
                    maxHeight: isActive
                      ? `${panelRefs.current[index]?.scrollHeight ?? 0}px`
                      : "0px",
                    opacity: isActive ? 1 : 0,
                  }}
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
