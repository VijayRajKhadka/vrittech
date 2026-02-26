"use client";
import {
  Cloud,
  Cmc,
  DragImage1,
  DragImage2,
  Itsnp,
  StatCardImage,
  Zebec,
} from "@/public/assets/images";
import PartnerSection from "@/src/components/features/partners/partner-section";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { StatCard } from "@/src/components/ui/card/StatCard";
import { DraggableGallery } from "@/src/components/ui/carousel";
import AnimatedTextSwitch from "@/src/components/ui/text/AnimatedTextSwitch";
import React, { useState } from "react";

const FigmaDesign = () => {
  const galleryImages = [DragImage1, DragImage2];
  const partnersImages = [Cloud, Cmc, Itsnp, Zebec];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  return (
    <div className="space-y-10 md:space-y-48.25">
      <div className="flex md:flex-row flex-col-reverse md:gap-0 gap-10 items-start justify-between">
        <div className="space-y-4.5 md:space-y-14.5">
          <h1 className=" font-medium text-[36px] max-w-156.25 text-[#262626]">
            Experience our expert solutions tailored to enhance your business
            with top-tier design, development, and animation.
          </h1>
          <PrimaryButton label="Services" />
        </div>
        <AnimatedTextSwitch texts={["UI & UX", "Blockchain", "Development"]} />
      </div>
      <DraggableGallery images={galleryImages} />
      <PartnerSection partnerImages={partnersImages} />

      <div className="flex gap-5 p-10 overflow-x-auto no-scrollbar items-end">
        <StatCard
          isExpanded={expandedIndex === 0}
          onToggle={() => setExpandedIndex(0)}
          number="23"
          title1="All"
          title2="Courses"
          description="Courses you're powering through right now."
          imageSrc={StatCardImage}
        />
        <StatCard
          isExpanded={expandedIndex === 1}
          onToggle={() => setExpandedIndex(1)}
          number="05"
          title1="Upcoming"
          title2="Courses"
          description="Exciting new courses waiting to boost your skills."
          imageSrc={StatCardImage}
        />
        <StatCard
          isExpanded={expandedIndex === 2}
          onToggle={() => setExpandedIndex(2)}
          number="10"
          title1="Ongoing"
          title2="Courses"
          description="Currently happening—don't miss out!"
          imageSrc={StatCardImage}
        />
      </div>
    </div>
  );
};

export default FigmaDesign;
