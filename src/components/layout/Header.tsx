"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingBasket, User } from "lucide-react";
import { primaryNav } from "@/data/nav";
import { externalUrl } from "@/lib/site";
import { MegaMenu } from "./MegaMenu";
import { CartDrawer } from "./CartDrawer";
import { MobileNav } from "./MobileNav";

// Composition root for all header/mobile-nav interactivity (cart drawer,
// mobile menu drawer) — see reference/content.md §2 for the real structure
// this is built from, and tasks.md Phase 3 for the deliberate mobile-drawer
// simplification (the real site has two separate mobile drawers — a
// hamburger nav-links drawer and a bottom-bar category accordion — merged
// here into one, since exact mobile behavior couldn't be verified live).
export function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative bg-header-bg">
      <div className="mx-auto flex h-20 max-w-(--breakpoint-lg) items-center justify-between px-4">
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
            width={48}
            height={48}
            className="nav:hidden"
            priority
          />
        </Link>

        <button className="nav:hidden" aria-label="منو" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="size-6" />
        </button>

        <div className="hidden flex-1 items-center justify-end gap-4 nav:flex">
          <form action={externalUrl("/products/")} method="get" className="flex flex-1 max-w-sm">
            <input
              type="text"
              name="q"
              placeholder="جستجوی محصول"
              className="w-full rounded-s-card border border-gray-5 bg-white px-4 py-3 text-sm"
            />
            <button
              type="submit"
              aria-label="جستجو"
              className="rounded-e-card border border-gray-5 border-s-0 bg-white px-4"
            >
              <Search className="size-4" />
            </button>
          </form>

          <Link
            href={externalUrl("/accounts/login/")}
            className="flex h-14 items-center gap-2 rounded-card bg-primary px-4 text-on-primary"
          >
            <User className="size-4" />
            ورود
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="flex h-14 items-center gap-2 rounded-card border border-primary-darker px-4 text-primary-darker"
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-on-primary">
              0
            </span>
            <ShoppingBasket className="size-4" />
            سبد خرید
          </button>
        </div>
      </div>

      <nav className="hidden border-t border-gray-5 nav:block">
        <ul className="mx-auto flex h-12 max-w-(--breakpoint-lg) items-center gap-6 px-4 text-sm">
          {primaryNav.map((item) => (
            <li key={item.href} className={item.label === "فروشگاه" ? "group relative h-full" : ""}>
              <Link
                href={item.href}
                className={
                  "flex h-12 items-center" +
                  (item.label === "خانه" ? " font-bold text-primary" : "")
                }
              >
                {item.label}
              </Link>
              {item.label === "فروشگاه" && <MegaMenu />}
            </li>
          ))}
        </ul>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileNav
        menuOpen={mobileMenuOpen}
        onOpenMenu={() => setMobileMenuOpen(true)}
        onCloseMenu={() => setMobileMenuOpen(false)}
        onOpenCart={() => setCartOpen(true)}
      />
    </header>
  );
}
