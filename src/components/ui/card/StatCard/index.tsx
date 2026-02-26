"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface StatCardProps {
  number: string;
  title1: string;
  title2: string;
  description: string;
  isExpanded: boolean;
  onToggle: () => void;
  imageSrc?: string;
  onViewCourse?: () => void;
  direction?: number;
}

export const StatCard = ({
  number,
  title1,
  title2,
  description,
  isExpanded,
  onToggle,
  imageSrc,
  onViewCourse,
  direction = 1,
}: StatCardProps) => {
  const xOffset = direction * 300;

  return (
    <div
      onClick={onToggle}
      className={cn(
        "relative h-[480px] p-10 rounded-[40px] cursor-pointer overflow-hidden flex flex-col transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "bg-[#C33241]",
        isExpanded ? "flex-[3] min-w-[500px]" : "flex-1 min-w-[180px]"
      )}
    >
      <div
        className={cn(
          "absolute -bottom-[28%] -left-[30%] w-[150%] aspect-square bg-[#F9EBEC] rounded-full transition-all duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-left pointer-events-none",
          isExpanded ? "scale-0 opacity-100" : "scale-200 opacity-100"
        )}
      />

      <div className="relative z-20 flex justify-end h-10">
        <AnimatePresence>
          {isExpanded && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                onViewCourse?.();
              }}
              className="text-[#F9EBEC] flex items-center gap-2  px-5 py-1.5 rounded-full text-sm font-medium"
            >
              View all Courses <ArrowRight size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 flex items-center justify-center relative z-10">
        <AnimatePresence mode="popLayout">
          {isExpanded && imageSrc && (
            <motion.img
              key={imageSrc}
              // Entry: Glides from the side
              initial={{ opacity: 0, x: xOffset, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              // Exit: Continues gliding in the same direction
              exit={{ opacity: 0, x: -xOffset, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20, // Prevents bouncy vibrations
                mass: 1,
                restDelta: 0.001,
              }}
              src={imageSrc}
              alt={title1}
              className="max-h-[260px] w-auto object-contain drop-shadow-2xl"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Text/Stats */}
      <div
        className={cn(
          "flex items-end relative z-10 transition-colors duration-700",
          isExpanded ? "text-[#F9EBEC]" : "text-[#C33241]"
        )}
      >
        <div className="flex items-start shrink-0">
          <span className="text-[120px] font-black leading-[0.7] tracking-tighter">
            {number}
          </span>
          <span className="text-5xl font-bold mt-1 ml-2">+</span>
        </div>

        <div
          className={cn(
            "transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-left",
            isExpanded
              ? "rotate-0 translate-x-6 -translate-y-1"
              : "-rotate-90 -translate-x-[50px] -translate-y-[110px]"
          )}
        >
          <div
            className={cn(
              "text-3xl font-bold uppercase whitespace-nowrap tracking-tighter leading-none flex",
              isExpanded ? "flex-row gap-2" : "flex-col"
            )}
          >
            <p>{title1}</p>
            <p>{title2}</p>
          </div>

          <div
            className={cn(
              "transition-all duration-700",
              isExpanded ? "max-h-24 mt-3 opacity-100" : " overflow-hidden"
            )}
          >
            <p className="text-sm max-w-[240px] leading-tight font-medium opacity-80">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
