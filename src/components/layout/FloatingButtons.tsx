"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Fixed corner buttons: `.nav-to-top` (bottom-left) and a support button
 * (bottom-right). Must be rendered at the top of the footer — the sentinel
 * marks the point past which the page counts as "scrolled to the bottom".
 * Below 768px the to-top button clears the 56px mobile nav bar (real
 * `bottom: 64px`); the support button overlaps it, as on the live site.
 */
export function FloatingButtons() {
  const sentinelRef = useRef<HTMLSpanElement>(null);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => {
      setAtBottom(entry.boundingClientRect.top < window.innerHeight);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <span ref={sentinelRef} aria-hidden className="block h-0" />

      <button
        type="button"
        aria-label="بازگشت به بالا"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-16 left-8 z-25 flex size-16 items-center justify-center rounded-full border border-primary transition-opacity duration-300 md:bottom-3",
          atBottom ? "opacity-100" : "pointer-events-none invisible opacity-0",
        )}
      >
        <svg aria-hidden viewBox="0 0 36 34" className="h-[30px] w-8">
          <path
            fill="currentColor"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="8"
            d="M18 4 L32 30 L4 30 Z"
            className="text-coral-light"
          />
        </svg>
      </button>

      {/* Placeholder: no support channel wired up yet. */}
      <button
        type="button"
        aria-label="پشتیبانی"
        className="fixed right-8 bottom-8 z-80 flex size-[60px] items-center justify-center rounded-full bg-coral text-white ring-4 ring-coral/20 md:bottom-3"
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-8"
        >
          <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
          <rect x="2.5" y="13" width="3" height="6" rx="1.5" />
          <rect x="18.5" y="13" width="3" height="6" rx="1.5" />
          <path d="M20 19v.5a2.5 2.5 0 0 1-2.5 2.5H15" />
          <rect x="12" y="21" width="3" height="2" rx="1" />
          <path d="M9 8h6a1.5 1.5 0 0 1 1.5 1.5v3.5a1.5 1.5 0 0 1-1.5 1.5h-3l-2.5 2v-2H9A1.5 1.5 0 0 1 7.5 13V9.5A1.5 1.5 0 0 1 9 8Z" />
          <path d="M10 11.25h.01M12 11.25h.01M14 11.25h.01" strokeWidth="2" />
        </svg>
      </button>
    </>
  );
}
