"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { externalUrl } from "@/lib/site";

export type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

// Real drawer, live-clicked in Phase 3 since this content is AJAX/JS-rendered
// and never appears in the static HTML scrape — see reference/content.md §14.
export function CartDrawer({ open, onClose }: CartDrawerProps) {
  return (
    <>
      {open && (
        <button aria-label="بستن" onClick={onClose} className="fixed inset-0 z-60 bg-black/40" />
      )}
      <div
        className={
          "fixed inset-y-0 right-0 z-70 flex w-[440px] max-w-full flex-col bg-primary-darker p-6 text-white transition-transform" +
          (open ? " translate-x-0" : " translate-x-full")
        }
      >
        <div className="flex items-center justify-between">
          <button onClick={onClose} aria-label="بستن">
            <X className="size-5" />
          </button>
          <h2 className="text-xl font-black">سبد خرید</h2>
        </div>

        <div className="flex flex-1 items-center justify-center text-center">
          <p>سبد خرید خالی است.</p>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href={externalUrl("/orders/cart/")}
            className="rounded-lg bg-white py-3 text-center text-primary-darker"
          >
            مشاهده سبد خرید و تسویه
          </Link>
          <Link href="/" className="rounded-lg bg-white py-3 text-center text-primary-darker">
            خرید محصولات دیگر
          </Link>
        </div>
      </div>
    </>
  );
}
