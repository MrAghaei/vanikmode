"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  isRtl,
  nearestChildIndex,
  scrollTrackToChild,
  setNormalizedScrollLeft,
} from "@/lib/horizontal-scroll";

/** Movement below this is treated as a click, not a drag. */
const DRAG_THRESHOLD_PX = 5;
/** A drag this long always moves at least one item in the drag direction. */
const ADVANCE_THRESHOLD_PX = 40;
/** Fallback for browsers without `scrollend` (and for zero-distance scrolls, which never fire it). */
const SETTLE_TIMEOUT_MS = 700;

type MouseDragHandlers = {
  onStart: () => void;
  /** `dx` is the physical horizontal pointer delta since pointerdown. */
  onMove: (dx: number) => void;
  onEnd: (dx: number, moved: boolean) => void;
};

/**
 * Mouse-only drag tracking for a scroll track. Touch and pen keep native
 * scrolling. Swallows the click that follows a real drag so links inside
 * the track don't navigate, and blocks native link/image drag-and-drop,
 * which would otherwise cancel the pointer stream mid-drag.
 */
function attachMouseDrag(el: HTMLElement, handlers: MouseDragHandlers) {
  let pointerId: number | null = null;
  let startX = 0;
  let lastDx = 0;
  let moved = false;
  let suppressClick = false;

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerId !== pointerId) return;
    lastDx = e.clientX - startX;
    if (!moved && Math.abs(lastDx) < DRAG_THRESHOLD_PX) return;
    moved = true;
    e.preventDefault();
    handlers.onMove(lastDx);
  };

  const removeWindowListeners = () => {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerEnd);
    window.removeEventListener("pointercancel", onPointerEnd);
  };

  function onPointerEnd(e: PointerEvent) {
    if (e.pointerId !== pointerId) return;
    pointerId = null;
    removeWindowListeners();
    el.style.cursor = "";
    if (e.type === "pointerup") lastDx = e.clientX - startX;
    suppressClick = moved;
    // The click (if any) is dispatched right after pointerup; don't let a
    // stale flag eat a later keyboard-activated click.
    if (moved) setTimeout(() => (suppressClick = false), 0);
    handlers.onEnd(lastDx, moved);
  }

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    if ((e.target as Element).closest("[data-scroll-thumb]")) return;
    pointerId = e.pointerId;
    startX = e.clientX;
    lastDx = 0;
    moved = false;
    suppressClick = false;
    el.style.cursor = "grabbing";
    handlers.onStart();
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerEnd);
    window.addEventListener("pointercancel", onPointerEnd);
  };

  const onClick = (e: MouseEvent) => {
    if (!suppressClick) return;
    suppressClick = false;
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragStart = (e: DragEvent) => e.preventDefault();

  el.addEventListener("pointerdown", onPointerDown);
  el.addEventListener("click", onClick, true);
  el.addEventListener("dragstart", onDragStart);

  return () => {
    removeWindowListeners();
    el.style.cursor = "";
    el.removeEventListener("pointerdown", onPointerDown);
    el.removeEventListener("click", onClick, true);
    el.removeEventListener("dragstart", onDragStart);
  };
}

/**
 * Snap and smooth scrolling must be off while the pointer drives
 * `scrollLeft` directly, and stay off until the release animation finishes,
 * otherwise mandatory snapping yanks the track back mid-drag.
 */
function createSnapController(el: HTMLElement) {
  let generation = 0;

  const suspend = () => {
    generation++;
    el.style.scrollSnapType = "none";
    el.style.scrollBehavior = "auto";
  };

  const restoreWhenSettled = () => {
    const gen = generation;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      el.removeEventListener("scrollend", finish);
      if (gen !== generation) return;
      el.style.scrollSnapType = "";
      el.style.scrollBehavior = "";
    };
    el.addEventListener("scrollend", finish);
    const timer = setTimeout(finish, SETTLE_TIMEOUT_MS);
  };

  const reset = () => {
    generation++;
    el.style.scrollSnapType = "";
    el.style.scrollBehavior = "";
  };

  return { suspend, restoreWhenSettled, reset };
}

/** `true` when a drag of `dx` moves the track towards later items. */
function isForward(el: HTMLElement, dx: number) {
  return isRtl(el) ? dx > 0 : dx < 0;
}

/** 1:1 drag panning with snap-to-card on release (product rails, categories, blog). */
export function useDragScroll(ref: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const snap = createSnapController(el);
    let startScroll = 0;
    let startIndex = 0;

    const detach = attachMouseDrag(el, {
      onStart() {
        snap.suspend();
        startScroll = el.scrollLeft;
        startIndex = nearestChildIndex(el);
      },
      onMove(dx) {
        el.scrollLeft = startScroll - dx;
      },
      onEnd(dx, moved) {
        if (moved) {
          let target = nearestChildIndex(el);
          if (target === startIndex && Math.abs(dx) >= ADVANCE_THRESHOLD_PX) {
            target += isForward(el, dx) ? 1 : -1;
          }
          target = Math.max(0, Math.min(el.children.length - 1, target));
          scrollTrackToChild(el, target);
        }
        snap.restoreWhenSettled();
      },
    });

    return () => {
      detach();
      snap.reset();
    };
  }, [ref, enabled]);
}

/**
 * Hero banner: the slide follows the mouse, and on release a drag past the
 * threshold advances one slide (`"next" | "prev"`); a shorter drag settles
 * back (`null`). `startIndex` is the slide under the pointer at drag start.
 * The caller performs the scroll.
 */
export function useSwipeToSlide(
  ref: RefObject<HTMLElement | null>,
  onRelease: (direction: "next" | "prev" | null, startIndex: number) => void,
  enabled = true,
) {
  const onReleaseRef = useRef(onRelease);
  useEffect(() => {
    onReleaseRef.current = onRelease;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const snap = createSnapController(el);
    let startScroll = 0;
    let startIndex = 0;

    const detach = attachMouseDrag(el, {
      onStart() {
        snap.suspend();
        startScroll = el.scrollLeft;
        startIndex = nearestChildIndex(el);
      },
      onMove(dx) {
        el.scrollLeft = startScroll - dx;
      },
      onEnd(dx, moved) {
        if (moved) {
          const direction =
            Math.abs(dx) < ADVANCE_THRESHOLD_PX ? null : isForward(el, dx) ? "next" : "prev";
          onReleaseRef.current(direction, startIndex);
        }
        snap.restoreWhenSettled();
      },
    });

    return () => {
      detach();
      snap.reset();
    };
  }, [ref, enabled]);
}

export function applyThumbScroll(
  track: HTMLDivElement,
  thumbOffsetPercent: number,
  thumbWidthPercent: number,
) {
  const maxScroll = track.scrollWidth - track.clientWidth;
  const travel = 100 - thumbWidthPercent;
  const ratio = travel > 0 ? thumbOffsetPercent / travel : 0;
  setNormalizedScrollLeft(track, ratio * maxScroll);
}
