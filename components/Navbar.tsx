"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  //Detect scrolling and changing navbar background
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 50);
    });
  }

  return (
    // <motion.nav
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   transition={{ duration: 0.8 }}
    //   classNameName="navbar"
    //   // classNameName={`fixed top-0 w-full z-50 px-8 py-4 transition-all ${
    //   //   isScrolled ? "bg-black" : "bg-transparent"
    //   // } flex justify-between items-center`}
    // >
    //   {/* CINEFLOW LOGO */}
    //   <Link href="/">
    //     <h1 classNameName="text-3xl font-bold text-[var(--foreground)] cursor-pointer">
    //       CINEFLOW
    //     </h1>
    //   </Link>
    //   {/* Navigation Links */}
    //   <Link href={"/movies"} classNameName="hover:text-gray-300 transition">
    //     Movies
    //   </Link>
    //   <Link href={"/tv-shows"} classNameName="hover:text-gray-300 transition">
    //     TV Shows
    //   </Link>
    //   <Link
    //     href={"/new-and-popular"}
    //     classNameName="hover:text-gray-300 transition"
    //   >
    //     New & Popular
    //   </Link>
    // </motion.nav>

    <motion.header
      className="navbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="logo">
        <Link href="/dashboard" className="logo-text">
          Cineflow
        </Link>
      </div>
      <nav className="nav-menu">
        <ul>
          {/* <li>
            <Link href="#" className="links">
              Home
            </Link>
          </li> */}
          <li>
            <Link href="/movies" className="links">
              Movies
            </Link>
          </li>
          <li>
            <Link href="/tv-shows" className="links">
              Tv Shows
            </Link>
          </li>
          <li>
            <Link href="/profile" className="links">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
