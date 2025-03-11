"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  const featuredMovie = {
    title: "Furiosa: Mad Max Saga",
    image:
      "https://cineflow-videofiles.s3.ap-south-1.amazonaws.com/images/featured-movie.jpg",
    description: "The prequel to the 2015 film Mad Max: Fury Road"
  };

  return (
    <section className="relative h-screen bg-black text-white flex flex-col justify-end p-12">
      {/* Background image from s3 */}
      <div className="inset-0 -z-10 opacity-50">
        <Image
          src={featuredMovie.image}
          alt={featuredMovie.title}
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to from-black 2-transaparent"></div>
        {/* Featuring movie title and description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <h2 className="text-6xl font-bold">{featuredMovie.title}</h2>
          <p className="mt-2">{featuredMovie.description}</p>
        </motion.div>
      </div>
      {/* Buttons (Play and More info) */}
      <div className="mt-4 flex space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-[var(--foreground)] px-6 py-3 rounded font-semibold"
        >
          ▶ Watch Now
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-gray-700 px-6 py-3 rounded font-semibold"
        >
          ℹ More Info
        </motion.button>
      </div>
    </section>
  );
}
