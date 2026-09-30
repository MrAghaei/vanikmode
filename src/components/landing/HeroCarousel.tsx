"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/hero";
import { cn } from "@/lib/cn";

// Real site: header-slider Swiper autoplay delay 8000ms, pauseOnMouseEnter
// (reference/js/script.js). Nav arrows + pagination dots verified in
// reference/content.md §13 (screenshot) and the raw markup's
// swiper-button-next/prev + swiper-pagination elements.
const AUTOPLAY_DELAY = 8000;

export function HeroCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;

  // Scrolls the track directly via `scrollBy` rather than
  // `Element.scrollIntoView` — the latter also scrolls ancestor scroll
  // containers (i.e. the page) to satisfy its `block` alignment whenever the
  // hero isn't fully within the viewport, which causes the whole page to jump.
  const scrollToChild = (i: number) => {
    const track = trackRef.current;
    const el = track?.children[i] as HTMLElement | undefined;
    if (!track || !el) return;
    const delta = el.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollBy({ left: delta, behavior: "smooth" });
  };

  const goTo = (i: number) => {
    scrollToChild(i);
    setIndex(i);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % count;
        scrollToChild(next);
        return next;
      });
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [paused, count]);

  // Keeps `index`/dots in sync when the visitor drags or swipes manually.
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.clientWidth || 1;
    const nearest = Math.round(Math.abs(track.scrollLeft) / width);
    setIndex(Math.min(Math.max(nearest, 0), count - 1));
  };

  return (
    <div
      className="group relative overflow-hidden rounded-[18px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {heroSlides.map((slide, i) => (
          <Link
            key={slide.image}
            href={slide.href}
            className="relative aspect-[1280/870] w-full shrink-0 snap-start"
          >
            <Image
              src={`/images/banner/${slide.image}`}
              alt={slide.alt}
              fill
              sizes="(min-width: 1200px) 1200px, 100vw"
              className="object-cover"
              priority={i === 0}
            />
          </Link>
        ))}
      </div>

      <button
        type="button"
        aria-label="اسلاید قبلی"
        onClick={() => goTo((index - 1 + count) % count)}
        className="absolute inset-y-0 start-3 my-auto flex size-6 items-center justify-center rounded-full bg-white/80 text-gray-2 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <ChevronRight className="size-3" />
      </button>
      <button
        type="button"
        aria-label="اسلاید بعدی"
        onClick={() => goTo((index + 1) % count)}
        className="absolute inset-y-0 end-3 my-auto flex size-6 items-center justify-center rounded-full bg-white/80 text-gray-2 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <ChevronLeft className="size-3" />
      </button>

      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            aria-label={`اسلاید ${i + 1}`}
            onClick={() => goTo(i)}
            className={cn(
              "size-2 rounded-full transition-colors",
              i === index ? "bg-primary" : "bg-white/70",
            )}
          />
        ))}
      </div>
    </div>
  );
}
