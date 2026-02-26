"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextSwitchProps {
  texts: string[];
}

const AnimatedTextSwitch = ({ texts }: AnimatedTextSwitchProps) => {
  const [indexOffset, setIndexOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexOffset((prev) => (prev + 1) % texts.length);
    }, 2500); // Change speed here
    return () => clearInterval(interval);
  }, [texts.length]);

  // This creates the rotated version of your array
  // e.g., if offset is 1: [text[1], text[2], text[0]]
  const displayItems = texts.map((_, i) => {
    const targetIndex = (i + indexOffset) % texts.length;
    return texts[targetIndex];
  });

  return (
    <div className="flex flex-col gap-6.5 items-start justify-start font-bold text-[52px]">
      {displayItems.map((text, position) => (
        <div
          key={position}
          className="h-14 overflow-hidden flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={text} // Keying by text ensures the animation triggers on change
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className=""
            >
              {text}
            </motion.p>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default AnimatedTextSwitch;
