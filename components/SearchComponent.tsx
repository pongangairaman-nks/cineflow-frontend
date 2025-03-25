"use client"; // Ensures this component runs only on the client

export default function SearchInput() {
  return (
    <input
      type="text"
      placeholder="What are you looking for?"
      className="bg-transparent text-white placeholder-gray-400 outline-none border-none w-full"
    />
  );
}
