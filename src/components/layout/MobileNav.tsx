"use client";

import { useState } from "react";
import Link from "next/link";
import { House, Menu, Search, ShoppingBasket, User } from "lucide-react";
import { mobileMenu, mobileOnSaleLink } from "@/data/nav";
import { externalUrl } from "@/lib/site";

export type MobileNavProps = {
  onOpenCart: () => void;
};

const itemClass = "relative flex flex-col items-center px-2.5 pt-1.5";
const labelClass = "mt-1 text-sm font-normal";

/**
 * Real `#mobile-navigation` bottom bar (≤768px) plus the two panels its
 * buttons toggle: `#mobile-category-list` (category accordion) and
 * `#mobile-menu-search-container` (search field docked above the bar).
 * Both are plain display toggles on the live site (reference/js/script.js).
 */
export function MobileNav({ onOpenCart }: MobileNavProps) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <>
      {categoriesOpen && (
        <div className="fixed inset-x-0 top-[60px] bottom-0 z-30 bg-accent-rose-darker md:hidden">
          <ul className="page-container max-h-[70vh] overflow-y-auto">
            {mobileMenu.map((group) => (
              <li key={group.title} className="border-b border-accent-rose">
                <button
                  type="button"
                  aria-expanded={openGroup === group.title}
                  onClick={() => setOpenGroup(openGroup === group.title ? null : group.title)}
                  className="block w-full py-2.5 text-start font-bold"
                >
                  {group.title}
                </button>
                {openGroup === group.title && (
                  <ul className="ps-[15px]">
                    {group.items.map((item) => (
                      <li key={item.href} className="border-b border-accent-rose">
                        <Link href={item.href} className="block py-3">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="border-b border-accent-rose py-2.5 font-bold">
              <Link href={mobileOnSaleLink.href} className="block py-3">
                {mobileOnSaleLink.label}
              </Link>
            </li>
          </ul>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-x-0 bottom-[55px] z-30 bg-card-tint p-5 ps-[85px] md:hidden">
          <form
            action={externalUrl("/products/")}
            method="get"
            className="flex h-14 w-full items-center justify-between rounded-card bg-input-bg shadow-[inset_0_1px_4px_-1px_rgb(0_0_0/0.25)]"
          >
            <input
              type="text"
              name="q"
              placeholder="جستجوی محصول"
              autoFocus
              className="h-full min-w-0 flex-1 bg-transparent ps-[18px] text-xs text-gray-2 outline-none placeholder:text-gray-2"
            />
            <button type="submit" aria-label="جستجو" className="me-2.5 text-gray-2">
              <Search className="size-[18px]" />
            </button>
          </form>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-35 h-14 bg-coral text-white shadow-[0_-2px_4px_0_rgb(0_0_0/0.2)] md:hidden">
        <ul className="flex h-full items-center justify-around">
          <li>
            <Link href="/" className={itemClass}>
              <House className="size-[18px]" fill="currentColor" />
              <span className={labelClass}>خانه</span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              aria-expanded={categoriesOpen}
              onClick={() => setCategoriesOpen((open) => !open)}
              className={itemClass}
            >
              <Menu className="size-[18px]" strokeWidth={3} />
              <span className={labelClass}>دسته‌بندی</span>
            </button>
          </li>
          <li>
            <button type="button" onClick={onOpenCart} className={itemClass}>
              <ShoppingBasket className="size-[18px]" strokeWidth={2.5} />
              <span className={labelClass}>سبد خرید</span>
              <span className="absolute top-0 right-0 size-[25px] rounded-full bg-primary text-center leading-[25px] text-white">
                0
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
              className={itemClass}
            >
              <Search className="size-[18px]" strokeWidth={3} />
              <span className={labelClass}>جستجو</span>
            </button>
          </li>
          <li>
            <Link href={externalUrl("/accounts/login/")} className={itemClass}>
              <User className="size-[18px]" fill="currentColor" />
              <span className={labelClass}>ورود</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
