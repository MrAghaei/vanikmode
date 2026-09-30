"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { scrollTrackToChild } from "@/lib/horizontal-scroll";
import { applyThumbScroll, useDragScroll } from "@/lib/use-drag-scroll";

export type RailProps = {
  /** Number of direct children rendered inside the scroll track. */
  count: number;
  /**
   * Matches the real site's per-slider Swiper `autoplay.delay` (ms) —
   * reference/js/script.js. Omit for sliders that don't autoplay there
   * (the homepage categories grid).
   */
  autoplayDelay?: number;
  /** Real site blog rail has no `.swiper-scrollbar` in the captured markup flow — hide bar. */
  hideScrollbar?: boolean;
  className?: string;
  /** Vertical spacing of the scrollbar; defaults to `mt-6`. */
  scrollbarClassName?: string;
  children: React.ReactNode;
};

function scrollThumbMetrics(track: HTMLDivElement) {
  const maxScroll = track.scrollWidth - track.clientWidth;
  const scrolled = Math.abs(track.scrollLeft);
  const thumbWidth = maxScroll <= 0 ? 100 : (track.clientWidth / track.scrollWidth) * 100;
  const travel = 100 - thumbWidth;
  const thumbOffset = maxScroll <= 0 ? 0 : (scrolled / maxScroll) * travel;
  return { thumbWidth, thumbOffset };
}

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
export function Rail({
  count,
  autoplayDelay,
  hideScrollbar = false,
  className,
  scrollbarClassName = "mt-6",
  children,
}: RailProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const [thumb, setThumb] = useState({ thumbWidth: 100, thumbOffset: 0 });
  const thumbDragRef = useRef<{ startX: number; startOffset: number } | null>(null);

  useDragScroll(trackRef, true);

  const syncThumb = useCallback(() => {
    const track = trackRef.current;
    if (!track || hideScrollbar) return;
    setThumb(scrollThumbMetrics(track));
  }, [hideScrollbar]);

  useEffect(() => {
    syncThumb();
    const track = trackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(syncThumb);
    ro.observe(track);
    return () => ro.disconnect();
  }, [syncThumb, count]);

  useEffect(() => {
    if (!autoplayDelay || count <= 1 || paused) return;
    const id = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % count;
      const track = trackRef.current;
      if (track) scrollTrackToChild(track, indexRef.current);
    }, autoplayDelay);
    return () => clearInterval(id);
  }, [autoplayDelay, count, paused]);

  const onThumbPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    const bar = scrollbarRef.current;
    if (!track || !bar) return;
    e.preventDefault();
    e.stopPropagation();
    bar.setPointerCapture(e.pointerId);
    thumbDragRef.current = { startX: e.clientX, startOffset: thumb.thumbOffset };
  };

  const onThumbPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    const bar = scrollbarRef.current;
    const drag = thumbDragRef.current;
    if (!track || !bar || !drag) return;
    const barWidth = bar.clientWidth;
    const travel = barWidth * (1 - thumb.thumbWidth / 100);
    if (travel <= 0) return;
    const deltaPercent = ((e.clientX - drag.startX) / travel) * (100 - thumb.thumbWidth);
    const nextOffset = Math.min(
      100 - thumb.thumbWidth,
      Math.max(0, drag.startOffset + deltaPercent),
    );
    applyThumbScroll(track, nextOffset, thumb.thumbWidth);
    setThumb(scrollThumbMetrics(track));
  };

  const endThumbDrag = (e: React.PointerEvent) => {
    if (!thumbDragRef.current) return;
    scrollbarRef.current?.releasePointerCapture(e.pointerId);
    thumbDragRef.current = null;
  };

  const onBarPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    const bar = scrollbarRef.current;
    if (!track || !bar || e.target !== bar) return;
    const rect = bar.getBoundingClientRect();
    const clickRatio = (e.clientX - rect.left) / rect.width;
    const nextOffset = Math.min(
      100 - thumb.thumbWidth,
      Math.max(0, clickRatio * (100 - thumb.thumbWidth)),
    );
    applyThumbScroll(track, nextOffset, thumb.thumbWidth);
    syncThumb();
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onScroll={syncThumb}
        className={cn(
          "flex cursor-grab snap-x snap-mandatory overflow-x-auto scroll-smooth select-none active:cursor-grabbing",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          !hideScrollbar && "pb-2",
          className,
        )}
      >
        {children}
      </div>

      {!hideScrollbar && (
        <div
          ref={scrollbarRef}
          role="presentation"
          onPointerDown={onBarPointerDown}
          className={cn(
            "mx-[1%] h-1 cursor-pointer overflow-hidden rounded-full bg-black/10",
            scrollbarClassName,
          )}
        >
          <div
            onPointerDown={onThumbPointerDown}
            onPointerMove={onThumbPointerMove}
            onPointerUp={endThumbDrag}
            onPointerCancel={endThumbDrag}
            data-scroll-thumb
            className="h-full cursor-grab rounded-full bg-primary active:cursor-grabbing"
            style={{
              width: `${thumb.thumbWidth}%`,
              marginInlineStart: `${thumb.thumbOffset}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
