import React from 'react';

// Using a custom color for the light background and dark footer to match the image precisely.
const LIGHT_BG_COLOR = '#f0f9f3'; // A soft, pale green
const DARK_FOOTER_COLOR = '#183424'; // A deep forest green

// Placeholder image for the founder
const FOUNDER_IMAGE_URL = "/founder.jpg";

// Logo data to recreate the look of the companies at the bottom
const logos = [
  {
    name: "CEO",
    // This logo has a unique dark background, so we'll treat it as a special block.
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
    // Replicating the small, central logo which looks like a stylized wordmark.
    name: "Phoenix Capital",
    element: (
      <div className="text-[#101828] text-xl font-serif italic leading-none hidden sm:block">
        <span className="block">Lead Design</span>

      </div>
    ),
  },
  { name: "Team", style: "text-[#101828] text-xl font-serif italic font-light lg:text-2xl" },
];


export default function FounderSection() {
  return (
    <div className="  flex items-center justify-center font-sans">
      <div className="w-full max-w-[87%]  rounded-4xl overflow-hidden">
        
        {/* Main Testimonial Card */}
        <div 
      
          className=" bg-[#2795A2]/15 p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 rounded-t-4xl border-t border-l border-r border-[#2795A2]/60"
        >
          {/* Founder Image Section */}
          <div className="flex-shrink-0 w-full md:w-[8cm] h-[8cm]  rounded-4xl overflow-hidden shadow-md">
            <img
              src={FOUNDER_IMAGE_URL}
              alt="Zachary B., Co-Founder and COO of Mysa"
              className="w-full h-full object-cover"
              // Placeholder image is guaranteed to load, no need for onerror
            />
          </div>

          {/* Testimonial Content */}
          <div className="flex-1">
            <h2  style={{
              fontFamily:
                'PPEditorialNew',
            }} className="text-3xl font-semibold text-gray-900 mt-3 mb-1">Piyush 100x</h2>
            <h3 className="text-lg font-medium text-gray-600 mb-4  pb-2">
              Co-Founder and CEO, Skipper AI
            </h3>
            
            <p className="text-lg leading-relaxed text-gray-700">
              Rendify is, hands-down, one of the <span className="text-[#2795A2] ">best service we’ve signed up for in years</span>. Their team makes collaboration effortless - asking clear, focused questions, taking feedback in stride, and delivering results that genuinely wow. The work they’ve produced has already been a game-changer for us, and we’re so impressed we’re planning to upgrade our plan just to keep the momentum going. If you’re looking for a partner that’s easy to work with and consistently exceeds expectations, Rendify is it.
            </p>
          </div>
        </div>

        {/* Company Logo Footer Section */}
        <div 
       
          className="bg-[#2795A2]/40 grid grid-cols-5 divide-x divide-white h-20 "
        >
          {logos.map((logo, index) => (
            <div 
              key={logo.name} 
              className={`flex items-center justify-center p-2 transition duration-300 hover:bg-[#2795A2]/70  text-black`}
              // Ensure the 'mysa' logo block takes up the visual space correctly
              style={logo.name === 'CEO' ? { backgroundColor: "#2795A2" } : {}}
            >
              {logo.element ? (
                // Use custom element if defined
                logo.element
              ) : (
                // Use styled text for the rest
                <span className={logo.style}>
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}