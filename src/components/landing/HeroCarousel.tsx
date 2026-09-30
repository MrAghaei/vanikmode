"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/hero";
import { cn } from "@/lib/cn";
import { scrollTrackToChild } from "@/lib/horizontal-scroll";
import { useSwipeToSlide } from "@/lib/use-drag-scroll";

const AUTOPLAY_DELAY = 8000;

const slideClass =
  "relative aspect-[1280/870] w-full min-w-full shrink-0 grow-0 basis-full snap-start";

const arrowClass =
  "absolute top-[calc(50%+22px)] flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-gray-2";

export function HeroCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;

  const goTo = useCallback(
    (i: number) => {
      const clamped = ((i % count) + count) % count;
      indexRef.current = clamped;
      setIndex(clamped);
      const track = trackRef.current;
      if (track) scrollTrackToChild(track, clamped);
    },
    [count],
  );

  const handleSwipe = useCallback(
    (direction: "next" | "prev" | null, startIndex: number) => {
      const step = direction === "next" ? 1 : direction === "prev" ? -1 : 0;
      goTo(startIndex + step);
    },
    [goTo],
  );

  useSwipeToSlide(trackRef, handleSwipe);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      goTo(indexRef.current + 1);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [paused, goTo]);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.clientWidth || 1;
    const nearest = Math.round(Math.abs(track.scrollLeft) / width);
    const clamped = Math.min(Math.max(nearest, 0), count - 1);
    indexRef.current = clamped;
    setIndex(clamped);
  };

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex cursor-grab snap-x snap-mandatory overflow-x-auto scroll-smooth select-none rounded-[18px] active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {heroSlides.map((slide, i) => {
            const image = (
              <Image
                src={`/images/banner/${slide.image}`}
                alt={slide.alt}
                fill
                draggable={false}
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="rounded-[18px] object-cover"
                priority={i === 0}
              />
            );

            if (slide.href) {
              return (
                <Link key={slide.image} href={slide.href} className={slideClass} draggable={false}>
                  {image}
                </Link>
              );
            }

            return (
              <div key={slide.image} className={slideClass}>
                {image}
              </div>
            );
          })}
        </div>

        {/* Swiper RTL: "next" sits on the left, 25px in from each edge. */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => goTo(index - 1)}
          className={cn(arrowClass, "right-[25px]")}
        >
          <ChevronRight className="size-3" strokeWidth={3} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => goTo(index + 1)}
          className={cn(arrowClass, "left-[25px]")}
        >
          <ChevronLeft className="size-3" strokeWidth={3} />
        </button>
      </div>

      {/* Swiper's default bullets with `--swiper-pagination-color: #fff`: the active one is white. */}
      <div className="mt-2.5 flex justify-center gap-2 md:mt-4">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            aria-label={`اسلاید ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => goTo(i)}
            className={cn(
              "size-2 rounded-full transition-colors",
              i === index ? "bg-white" : "bg-black/20",
            )}
          />
        ))}
      </div>
    </div>
  );
}
