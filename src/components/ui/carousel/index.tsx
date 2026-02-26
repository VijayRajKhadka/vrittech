"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface DraggableGalleryProps {
  images: string[];
}

export function DraggableGallery({ images }: DraggableGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!api) return;

    const onScroll = () => {
      if (!progressBarRef.current) return;
      const progress = api.scrollProgress();
      // 75 calculation assumes the thumb width is 25% (100 - 25 = 75)
      const movePercentage = Math.max(0, Math.min(1, progress)) * 75;
      // We multiply by 4 because the thumb is 1/4 of the width
      progressBarRef.current.style.transform = `translate3d(${
        movePercentage * 4
      }%, 0, 0)`;
    };

    api.on("scroll", onScroll);
    api.on("reInit", onScroll);

    return () => {
      api.off("scroll", onScroll);
      api.off("reInit", onScroll);
    };
  }, [api]);

  return (
    <div className="w-full space-y-8 py-4">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full cursor-grab active:cursor-grabbing"
      >
        <CarouselContent className="-ml-5">
          {images.map((url, index) => (
            <CarouselItem
              key={index}
              /* basis-[80%] shows the current image + 20% of the next one.
                 On large screens, we can keep the 1218px width or use basis-[85%]
              */
              className="pl-5 basis-[80%] md:basis-[75%] lg:basis-[80%]"
            >
              <div className="relative overflow-hidden rounded-[32px] border bg-muted shadow-sm aspect-1218/569.25">
                <Image
                  fill
                  src={url}
                  alt={`Gallery image ${index + 1}`}
                  sizes="(max-width: 1218px) 100vw, 1218px"
                  priority={index < 2}
                  className="object-cover select-none pointer-events-none transition-transform duration-500 hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Progress Track */}
      <div className="px-1">
        <div className="relative h-1.75 w-full bg-[#ECECEC] rounded-[50px] overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute h-full bg-[#CECECF] rounded-full"
            style={{
              width: "25%",
              left: 0,
              willChange: "transform",
            }}
          />
        </div>
      </div>
    </div>
  );
}
