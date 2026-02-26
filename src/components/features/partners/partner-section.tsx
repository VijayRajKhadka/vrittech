import Image from "next/image";
import React from "react";

interface PartnerSectionProps {
  partnerImages: string[];
}

const PartnerSection = ({ partnerImages }: PartnerSectionProps) => {
  return (
    <section className="md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-bold text-[22px] text-[#171717] text-center mb-12">
          Our Partners
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-16 place-items-center">
          {partnerImages.map((image, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image
                width={143}
                height={75}
                src={image}
                alt={`Partner ${index + 1}`}
                className="
                  grayscale 
                  opacity-70
                  hover:opacity-100 
                  hover:grayscale-0 
                  transition-all 
                  duration-300
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
