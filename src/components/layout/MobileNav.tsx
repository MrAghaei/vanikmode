"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Home, LayoutGrid, LogIn, Search, ShoppingBasket, X } from "lucide-react";
import { primaryNav, mobileMenu, mobileOnSaleLink } from "@/data/nav";
import { externalUrl } from "@/lib/site";
import { cn } from "@/lib/cn";

export type MobileNavProps = {
  menuOpen: boolean;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
  onOpenCart: () => void;
};

/**
 * Fixed bottom nav bar (`#mobile-navigation` on the real site) + one unified
 * slide-in drawer for nav links + category accordion. The real site splits
 * this into two separate drawers (a hamburger nav-links drawer, and a
 * bottom-bar category accordion) — merged here into one; see the note in
 * Header.tsx and tasks.md Phase 3.
 */
export function MobileNav({ menuOpen, onOpenMenu, onCloseMenu, onOpenCart }: MobileNavProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center justify-around border-t border-gray-5 bg-white nav:hidden">
        <Link href="/" className="flex flex-col items-center gap-1 text-xs">
          <Home className="size-5" />
          خانه
        </Link>
        <button onClick={onOpenMenu} className="flex flex-col items-center gap-1 text-xs">
          <LayoutGrid className="size-5" />
          دسته‌بندی
        </button>
        <button onClick={onOpenCart} className="flex flex-col items-center gap-1 text-xs">
          <ShoppingBasket className="size-5" />
          سبد خرید
        </button>
        <button
          onClick={() => setSearchOpen(true)}
          className="flex flex-col items-center gap-1 text-xs"
        >
          <Search className="size-5" />
          جستجو
        </button>
        <Link
          href={externalUrl("/accounts/login/")}
          className="flex flex-col items-center gap-1 text-xs"
        >
          <LogIn className="size-5" />
          ورود
        </Link>
      </nav>

      {searchOpen && (
        <div className="fixed inset-x-0 top-0 z-40 bg-white p-4 shadow-card nav:hidden">
          <form action={externalUrl("/products/")} method="get" className="flex gap-2">
            <input
              type="text"
              name="q"
              placeholder="جستجوی محصول"
              autoFocus
              className="flex-1 rounded-card border border-gray-5 px-4 py-3 text-sm"
            />
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="بستن">
              <X className="size-5" />
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <button
          aria-label="بستن"
          onClick={onCloseMenu}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-80 max-w-full overflow-y-auto bg-white p-4 transition-transform",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <button onClick={onCloseMenu} aria-label="بستن">
            <X className="size-5" />
          </button>
          <span className="font-bold">منو</span>
        </div>

        <ul className="mb-4 flex flex-col gap-3 border-b border-gray-5 pb-4 text-sm">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={onCloseMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex flex-col gap-2">
          {mobileMenu.map((group) => (
            <li key={group.title} className="border-b border-gray-5 pb-2">
              <button
                className="flex w-full items-center justify-between py-2 text-sm font-bold"
                onClick={() => setOpenGroup(openGroup === group.title ? null : group.title)}
              >
                {group.title}
                <ChevronDown
                  className={cn(
                    "size-4 transition-transform",
                    openGroup === group.title && "rotate-180",
                  )}
                />
              </button>
              {openGroup === group.title && (
                <ul className="flex flex-col gap-2 py-2 text-sm text-gray-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={onCloseMenu}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="pb-2">
            <Link
              href={mobileOnSaleLink.href}
              onClick={onCloseMenu}
              className="block py-2 text-sm font-bold text-primary-darker"
            >
              {mobileOnSaleLink.label}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
