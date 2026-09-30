/** Scroll position as 0 … max, independent of RTL scrollLeft quirks. */
export function getNormalizedScrollLeft(el: HTMLElement): number {
  const max = el.scrollWidth - el.clientWidth;
  if (max <= 0) return 0;
  const rtl = getComputedStyle(el).direction === "rtl";
  if (!rtl) return el.scrollLeft;
  if (el.scrollLeft <= 0) return -el.scrollLeft;
  return max - el.scrollLeft;
}

export function setNormalizedScrollLeft(el: HTMLElement, pos: number) {
  const max = el.scrollWidth - el.clientWidth;
  const clamped = Math.max(0, Math.min(max, pos));
  const rtl = getComputedStyle(el).direction === "rtl";
  if (!rtl) {
    el.scrollLeft = clamped;
    return;
  }
  if (el.scrollLeft <= 0) {
    el.scrollLeft = -clamped;
  } else {
    el.scrollLeft = max - clamped;
  }
}

export function isRtl(el: HTMLElement) {
  return getComputedStyle(el).direction === "rtl";
}

/** Signed physical distance from the track's inline-start content edge to the child's (the `snap-start` edge). */
function inlineStartOffset(track: HTMLElement, child: HTMLElement, rtl: boolean) {
  const t = track.getBoundingClientRect();
  const c = child.getBoundingClientRect();
  const pad = parseFloat(getComputedStyle(track).paddingInlineStart) || 0;
  return rtl ? c.right - t.right + pad : c.left - t.left - pad;
}

/** Index of the child whose inline-start edge is closest to the track's. */
export function nearestChildIndex(track: HTMLElement): number {
  const rtl = isRtl(track);
  const children = [...track.children] as HTMLElement[];
  let nearest = 0;
  let minDist = Infinity;
  children.forEach((child, i) => {
    const dist = Math.abs(inlineStartOffset(track, child, rtl));
    if (dist < minDist) {
      minDist = dist;
      nearest = i;
    }
  });
  return nearest;
}

export function scrollTrackToChild(
  track: HTMLElement,
  index: number,
  behavior: ScrollBehavior = "smooth",
) {
  const child = track.children[index] as HTMLElement | undefined;
  if (!child) return;
  track.scrollBy({ left: inlineStartOffset(track, child, isRtl(track)), behavior });
}
