"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBasket, User, X } from "lucide-react";
import { primaryNav } from "@/data/nav";
import { externalUrl } from "@/lib/site";
import { cn } from "@/lib/cn";
import { MegaMenu } from "./MegaMenu";
import { CartDrawer } from "./CartDrawer";
import { MobileNav } from "./MobileNav";

// Composition root for all header/mobile-nav interactivity. Below 768px the
// real `.header-nav` becomes a fixed 60px bar and `.header-menu` turns into a
// full-screen link list toggled by the hamburger (reference/css/style.css
// `@media (max-width: 768px)`); the bottom bar's category/search panels live
// in MobileNav.
export function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="md:relative md:bg-header-bg">
      <div className="fixed inset-x-0 top-0 z-50 h-[60px] bg-card-tint shadow-[0_4px_4px_0_rgb(0_0_0/0.15)] md:relative md:h-20 md:bg-header-bg md:shadow-none">
        <div className="page-container flex h-full items-center justify-between">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo/logo.png"
              alt="وانیک"
              width={256}
              height={63}
              className="hidden nav:block"
              priority
            />
            <Image
              src="/images/logo/logo-mobile.png"
              alt="وانیک"
              width={100}
              height={64}
              className="nav:hidden"
              priority
            />
          </Link>

          <button
            type="button"
            className="text-primary-dark md:hidden"
            aria-label={menuOpen ? "بستن منو" : "منو"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="mx-2 size-[30px] translate-y-0.5" strokeWidth={2.75} />
            ) : (
              <Menu className="mx-[11px] size-[34px]" strokeWidth={2.5} />
            )}
          </button>

          <div className="hidden items-center gap-[26px] md:flex">
            <form
              action={externalUrl("/products/")}
              method="get"
              className="flex h-14 w-[270px] items-center justify-between rounded-card bg-input-bg shadow-[inset_0_1px_4px_-1px_rgb(0_0_0/0.25)]"
            >
              <input
                type="text"
                name="q"
                placeholder="جستجوی محصول"
                className="h-full min-w-0 flex-1 bg-transparent ps-[18px] text-xs text-gray-2 outline-none placeholder:text-gray-2"
              />
              <button type="submit" aria-label="جستجو" className="me-2.5 text-gray-2">
                <Search className="size-[18px]" />
              </button>
            </form>

            <Link
              href={externalUrl("/accounts/login/")}
              className="flex h-14 items-center gap-2 rounded-card bg-primary px-[15px] text-on-primary"
            >
              <User className="size-[18px]" fill="currentColor" />
              ورود
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-14 items-center gap-2 rounded-card border border-primary-darker px-[15px] text-primary-darker"
            >
              <ShoppingBasket className="size-[18px]" />
              سبد خرید
              <span className="absolute -right-2.5 -bottom-2.5 flex size-[25px] items-center justify-center rounded-full bg-primary text-xs text-white">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      <nav className="hidden border-b border-coral/20 md:block">
        <ul className="page-container flex h-[50px] items-center gap-4">
          {primaryNav.map((item) => (
            <li
              key={item.href}
              className={
                "flex h-full items-center" + (item.label === "فروشگاه" ? " group relative" : "")
              }
            >
              <Link
                href={item.href}
                className={cn(
                  "block h-[29px] rounded-lg px-[7px] text-xs leading-[29px] font-bold transition-colors hover:bg-primary hover:text-card-tint",
                  item.href === pathname && "bg-primary text-card-tint",
                )}
              >
                {item.label}
              </Link>
              {item.label === "فروشگاه" && <MegaMenu />}
            </li>
          ))}
        </ul>
      </nav>

      {menuOpen && (
        <nav className="fixed inset-x-0 top-[60px] bottom-0 z-55 overflow-y-auto border-b border-coral/20 bg-header-bg md:hidden">
          <ul>
            {primaryNav.map((item) => (
              <li key={item.href} className="border-t border-primary-darker">
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block h-[60px] px-[25px] text-base leading-[60px] font-bold transition-colors hover:bg-primary hover:text-card-tint",
                    item.href === pathname && "bg-primary text-card-tint",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileNav onOpenCart={() => setCartOpen(true)} />
    </header>
  );
}
