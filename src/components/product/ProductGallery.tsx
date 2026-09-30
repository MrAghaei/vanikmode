"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize, X } from "lucide-react";
import { Rail } from "@/components/ui/Rail";

export type ProductGalleryProps = {
  /** Absolute image URLs, in real thumbnail-strip order. */
  images: string[];
  /** Currently featured image — owned by the parent so variant picks can change it. */
  featured: string;
  onSelect: (image: string) => void;
  title: string;
};

/**
 * `.page-product-gallery-container`: 8px-radius featured image with a
 * hover-revealed black 32px "maximize" button, then a thumbnail Swiper 30px
 * below (80px tall slides, spaceBetween 24, 3 per view — 2 between 576 and
 * 768px — autoplay 6000ms). Clicking a thumbnail swaps the featured image;
 * the maximize button opens the full-screen slider.
 */
export function ProductGallery({ images, featured, onSelect, title }: ProductGalleryProps) {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="group relative aspect-[4/5] overflow-hidden rounded-lg">
        <Image
          src={featured}
          alt={title}
          fill
          sizes="(min-width: 1200px) 295px, (min-width: 576px) 25vw, 100vw"
          className="object-cover"
          priority
        />
        <button
          type="button"
          title="بزرگ‌نمایی"
          aria-label="بزرگ‌نمایی"
          onClick={() => setFullscreenIndex(Math.max(0, images.indexOf(featured)))}
          className="invisible absolute bottom-0 flex size-8 items-center justify-center bg-black text-white opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100"
        >
          <Maximize className="size-4" />
        </button>
      </div>

      {images.length > 0 && (
        <div className="mt-[30px]">
          <Rail count={images.length} autoplayDelay={6000} hideScrollbar className="gap-6">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => onSelect(image)}
                aria-label={`تصویر ${index + 1}`}
                className="relative mb-8 h-20 w-[calc((100%-48px)/3)] shrink-0 snap-start overflow-hidden rounded-lg transition-all duration-300 hover:opacity-70 sm:w-[calc((100%-24px)/2)] md:w-[calc((100%-48px)/3)]"
              >
                <Image src={image} alt={title} fill sizes="90px" className="object-cover" />
              </button>
            ))}
          </Rail>
        </div>
      )}

      {fullscreenIndex !== null && (
        <FullscreenGallery
          images={images}
          index={fullscreenIndex}
          onIndexChange={setFullscreenIndex}
          onClose={() => setFullscreenIndex(null)}
          title={title}
        />
      )}
    </div>
  );
}

/** `.page-product-gallery-full-screen-container`: fixed slider 10% from the top, images capped at 80vh, white nav arrows. */
function FullscreenGallery({
  images,
  index,
  onIndexChange,
  onClose,
  title,
}: {
  images: string[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  title: string;
}) {
  const count = images.length;
  const go = (step: number) => onIndexChange((index + step + count) % count);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <>
      <button
        aria-label="بستن"
        onClick={onClose}
        className="fixed inset-0 z-[110] cursor-default bg-black/40"
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="بستن"
        className="fixed inset-x-0 top-[5%] z-[121] mx-auto flex w-fit text-white"
      >
        <X className="size-6" />
      </button>
      <div className="fixed inset-x-0 top-[10%] z-[120] flex items-center justify-center">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="قبلی"
          className="absolute right-4 text-white"
        >
          <ChevronRight className="size-10" />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element -- natural-size image capped at 80vh, dimensions unknown up front */}
        <img src={images[index]} alt={title} className="mx-auto block max-h-[80vh]" />
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="بعدی"
          className="absolute left-4 text-white"
        >
          <ChevronLeft className="size-10" />
        </button>
      </div>
    </>
  );
}
