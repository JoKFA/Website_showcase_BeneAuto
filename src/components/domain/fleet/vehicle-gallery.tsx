"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface VehicleGalleryProps {
  images: string[];
  alt: string;
  focus?: string;
}

export function VehicleGallery({ images, alt, focus }: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryImages = images.filter(Boolean);
  const activeImage = galleryImages[activeIndex] ?? galleryImages[0];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-lg">
        {activeImage ? (
          <Image
            src={activeImage}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
            priority={activeIndex === 0}
            style={{ objectPosition: focus ?? "50% 50%" }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-500">
            Image coming soon
          </div>
        )}
      </div>

      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {galleryImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-xl border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500/40",
                index === activeIndex
                  ? "border-secondary-500 ring-2 ring-secondary-500/30"
                  : "border-neutral-200"
              )}
              aria-label={`View image ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <Image
                src={image}
                alt={`${alt} ${index + 1}`}
                fill
                sizes="(max-width: 640px) 25vw, 120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
