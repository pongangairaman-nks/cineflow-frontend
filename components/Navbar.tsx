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
    <div className="flex">
      <motion.nav
        initial={{ opacity: 0, paddingBottom: "16px", paddingTop: "16px" }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 w-full z-50 px-8 py-16 transition-all ${
          isScrolled ? "bg-black" : "bg-transparent"
        } flex justify-between items-center`}
      >
        {/* CINEFLOW LOGO */}
        <Link href="/">
          <h1 className="text-3xl font-bold text-[var(--foreground)] cursor-pointer">
            CINEFLOW
          </h1>
        </Link>
        {/* Navigation Links */}
        <Link href={"/movies"} className="hover:text-gray-300 transition">
          Movies
        </Link>
        <Link href={"/tv-shows"} className="hover:text-gray-300 transition">
          TV Shows
        </Link>
        <Link
          href={"/new-and-popular"}
          className="hover:text-gray-300 transition"
        >
          New & Popular
        </Link>
      </motion.nav>
    </div>
  );
}
