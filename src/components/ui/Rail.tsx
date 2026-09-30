"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type RailProps = {
  /** Number of direct children rendered inside the scroll track. */
  count: number;
  /**
   * Matches the real site's per-slider Swiper `autoplay.delay` (ms) —
   * reference/js/script.js. Omit for sliders that don't autoplay there
   * (the homepage categories grid).
   */
  autoplayDelay?: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * Dependency-free stand-in for the real site's Swiper rails: a native
 * horizontal scroll-snap track (drag/touch/trackpad scroll for free, no JS
 * needed for that part) plus a small effect that advances to the next child
 * on an interval, pausing on hover — mirrors Swiper's
 * `autoplay: { delay, pauseOnMouseEnter: true }` used on every real rail
 * except the category grid.
 *
 * Scrolls the track directly via `scrollBy` rather than `Element.scrollIntoView`
 * — the latter also scrolls ancestor scroll containers (i.e. the page) to
 * satisfy its `block` alignment whenever the rail isn't fully within the
 * viewport, which causes the whole page to jump.
 */
export function Rail({ count, autoplayDelay, className, children }: RailProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!autoplayDelay || count <= 1 || paused) return;
    const id = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % count;
      const track = trackRef.current;
      const el = track?.children[indexRef.current] as HTMLElement | undefined;
      if (!track || !el) return;
      const delta = el.getBoundingClientRect().left - track.getBoundingClientRect().left;
      track.scrollBy({ left: delta, behavior: "smooth" });
    }, autoplayDelay);
    return () => clearInterval(id);
  }, [autoplayDelay, count, paused]);

  return (
    <div
      ref={trackRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        "flex snap-x snap-mandatory overflow-x-auto scroll-smooth",
        "[scrollbar-width:thin] [scrollbar-color:var(--color-primary)_transparent]",
        "[&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:bg-transparent",
        className,
      )}
    >
      {children}
    </div>
  );
}
