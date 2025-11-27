// MessageBubbleLeft.tsx (make sure file is .tsx)
import React from "react";

type Props = { text: string };

export default function MessageBubbleLeft() {
  const bubbleColorClass = "bg-[#E9E9EB]";
  const tailColorClass = "fill-[#E9E9EB]";

  return (
    <div className="flex w-full flex-col items-start">
      <div className="relative max-w-[80%]">
        <div
          className={`
            ${bubbleColorClass}
            px-3 py-2
            rounded-[18px] rounded-bl-none
            text-xl leading-snug text-gray-800
              border-t-2 border-l-2 border-b-2  border-gray-300
          `}
        >
          Account No. XXXXXX7063 Credit with amount Rs. <span className="text-[#1487FF] underline"> 20000.00</span>
        </div>

        <div className="absolute bottom-0 -left-1.5 w-5 h-5 z-0 overflow-hidden ">
          <svg
            viewBox="0 0 20 20"
            className={`w-full h-full ${tailColorClass}`}
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M 20 20 L 0 20 C 0 20 5.06 19.92 9.5 15 C 13.94 10.08 14 0 14 0 L 20 0 L 20 20 Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
