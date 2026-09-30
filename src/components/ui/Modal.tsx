"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * The live site's `.popup-container` (reference/css/style.css): a fixed,
 * centered 40%-wide × 380px white card (90% wide at ≤768px), 20px padding,
 * 12px radius, close "×" pinned 10px from the top-left, 16px/900 title and
 * a 12px scrollable body. Used by the product page's help, size-guide and
 * notify-available popups.
 */
export function Modal({ open, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <button
        aria-label="بستن"
        onClick={onClose}
        className="fixed inset-0 z-[110] cursor-default bg-black/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "fixed inset-0 z-[120] m-auto flex h-[380px] w-[90%] flex-col rounded-card bg-white p-5 shadow-card md:w-2/5",
          className,
        )}
      >
        <button
          onClick={onClose}
          aria-label="بستن"
          className="absolute top-2.5 left-2.5 flex size-6 items-center justify-center"
        >
          <X className="size-4" />
        </button>
        <div className="mb-4 text-base font-black">{title}</div>
        <div className="overflow-y-auto text-xs">{children}</div>
      </div>
    </>
  );
}
