"use client";
import { motion } from "framer-motion";

export default function AnimatedCineFlowLogo() {
  return (
    <motion.h1
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="text-8xl font-bold bg-clip-text text-transparent"
      style={{
        fontFamily: "'Anton', sans-serif",
        fontSize: "24px",
        backgroundImage: "linear-gradient(to right, #e50914, #b20710)",
        WebkitBackgroundClip: "text",
        textTransform: "uppercase",
        letterSpacing: "2px"
      }}
    >
      CineFlow
    </motion.h1>
  );
}
