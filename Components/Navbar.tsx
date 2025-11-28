"use client"

import React, { useState } from "react";

/**
 * ResponsiveNavbar.jsx
 *
 * Responsive, accessible Navbar built with React + Tailwind CSS.
 * - Shows horizontal navigation on md+ screens
 * - Collapses to a hamburger + slide-down menu on small screens
 * - Accessible button with aria attributes
 * - Lightweight and easy to drop into any project
 *
 * Usage: place this file in your components folder and import where needed.
 */

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="w-full z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* left: logo */}
          <div className="flex items-center space-x-3">
            <a href="#" className="flex items-center gap-2">
              <img src="/log.png" alt="Skipper AI logo" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
              <span className="text-lg sm:text-xl font-serif text-[#343533]">Skipper AI</span>
            </a>
          </div>

          {/* center / desktop nav */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 "
              >
                {link.name}
              </a>
            ))}
          </nav>

        
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white shadow-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#signup"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-3 py-2 rounded-md font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
