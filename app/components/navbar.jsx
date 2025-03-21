// @flow strict
"use client";

// @flow strict
import Link from "next/link";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-transparent relative z-50">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="text-[#16f2b3] text-2xl font-light hover:text-[#16f2b3]/80 transition-colors duration-300">
            Natnael Bekele
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white hover:text-pink-600 transition-colors duration-300"
        >
          {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>

        {/* Navigation Links */}
        <ul className={`${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
        } absolute top-16 right-0 w-[200px] flex-col items-start bg-[#0d1224]/90 backdrop-blur-sm py-4 rounded-xl border border-white/10 md:relative md:top-0 md:left-0 md:translate-x-0 md:flex md:flex-row md:items-center md:space-x-6 md:ml-auto md:bg-transparent md:py-0 md:border-none shadow-lg md:shadow-none z-50 transition-all duration-300 ease-in-out md:translate-y-0 md:opacity-100 md:pointer-events-auto flex md:w-auto`}>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#about">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">ABOUT</div>
            </Link>
          </li>
          <div className="my-2 w-16 h-[1px] bg-white/10 md:hidden"></div>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#experience">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EXPERIENCE</div>
            </Link>
          </li>
          <div className="my-2 w-16 h-[1px] bg-white/10 md:hidden"></div>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#skills">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">SKILLS</div>
            </Link>
          </li>
          <div className="my-2 w-16 h-[1px] bg-white/10 md:hidden"></div>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#education">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EDUCATION</div>
            </Link>
          </li>
          <div className="my-2 w-16 h-[1px] bg-white/10 md:hidden"></div>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#projects">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">PROJECTS</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;