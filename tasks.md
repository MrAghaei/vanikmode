# Vanik Mode — Next.js Rebuild — Task Plan

Goal: rebuild **vanikmode.com**'s **landing page** and **one product detail page** in Next.js, pixel-perfect, using only real text/images/prices scraped from the live site. This is an interview showcase piece demonstrating a Django-templates → Next.js migration done with modern best practices.

## Hard rule (applies to every phase)

> **If an agent cannot access, load, or clearly determine an image, font file, color, spacing value, breakpoint behavior, copy string, or any other design/content detail needed to match the real site — STOP and ask the user for the missing asset/clarification.** Never invent placeholder text, stock photos, lorem ipsum, guessed colors, or "close enough" copy. Every pixel and every word should trace back to something actually observed on vanikmode.com. It's fine to re-fetch the live site or a cached copy in `reference/` to verify before asking.

---

## Reference data — fully harvested in Phase 0, see `reference/content.md`

Source site: `https://vanikmode.com/` — Django-rendered, Persian (`lang="fa"`), **RTL**. Backend serves `/media/photos/...` (uploads) and `/static/templates/...` (theme assets).

**`reference/content.md` is now the source of truth**, not this section. It has verbatim, script-verified copy for every nav item, banner, category, product rail, blog post, footer string, and the full product-detail page (specs table, description, FAQ, size guide, related products) — all parsed directly out of saved raw HTML (`reference/html/`), not summarized by a model. Two things this original scan got wrong that `content.md` corrects: the hero is **one 6-slide carousel**, not "3 banners + a shipping strip"; the Bottoms rail has **8** products, not 9. Assets already on disk: `reference/images/{banner,category,product,blog,logo}/` and `reference/fonts/*.ttf`.

**Sample product detail page used as the reference for Phase 5:**
`https://vanikmode.com/products/1450/شومیز-شلوار-آستین-پاگون-کد-i414/` — "ست شومیز و شلوار پاگون‌دار شانتون کد i414"

**Typography:** custom font family `site-font` (display name "Liana FD"), self-hosted as `.ttf`, weights 100–900 map to Light/Regular/Bold/Black cuts. Icon font `site-awesome` (Font Awesome solid subset, `.ttf`). Files are downloaded into `reference/fonts/`.

> ⚠️ **Licensing decision — RESOLVED.** The downloaded Liana-FD `.ttf` files are digitally signed with embedded metadata `Copyright (c) 2024 by www.fontiran.com All rights reserved` — a paid commercial Persian font, not open-license. **Decision: use the real font, local-only.** The `.ttf` files stay in `reference/fonts/` and get copied into `public/fonts/` (or wherever `next/font/local` needs them) for local development and running the interview demo from `localhost`, but:
> - the font files must **not** be committed to git (add `public/fonts/*.ttf` / wherever they land to `.gitignore` in Phase 1, not just `reference/`),
> - the project must **not** be deployed to a public URL (Vercel preview, GitHub Pages, etc.) with the real font bundled — Phase 7's "optional deploy a preview" task is affected by this: either skip the public deploy, or swap to a free lookalike (e.g. Vazirmatn) *only for that public build* if a shareable link turns out to be wanted later.

**Color tokens observed (CSS custom properties from `style.css`):**
- `--Foundation-Primary-Normal: #FF78C4` (also seen defined once as `#FF6F61`) — **resolved via live browser**: the actual rendered CTA/login button uses `#FF8C55` (`--Foundation-Pantone-Normal`), not either of these. Use `#FF8C55` as the real primary action color — see `reference/content.md` §13.
- `--Foundation-Primary-Dark: #972f29`, `--Foundation-Primary-Darker: #82110C`
- `--Foundation-Primary-Light: #FFF2F9`, hover `#FFEBF6`, active `#FFD5ED`
- `--Foundation-Secondary-Normal: #ff958b`, Dark `#fda8a0`, Darker `#ffbab6`, Light `#FCF7FF`
- `--Foundation-Third-Normal: #ffae8b`
- `--Foundation-Forth-Normal: #FFECEC`, Light `#FFFDFD`, Darker `#595353`
- `--Foundation-Pantone-Normal: #FF8C55`, Secondary `#82110C`
- `--body-bg: #fff`, `--header-bg: #F5F5F5`, `--footer-bg-main/secondary: #F0F0F0`
- Grays: `--Gray-2: #4F4F4F`, `--Gray-3: #828282`, `--Gray-5: #E0E0E0`
- Utility: `--Green-1: #219653`, `--Green-3: #6FCF97`, `--Red: #EB5757`, `--red-light: #F00`
- Ad-hoc hex also in use: `#FF2929`, `#E9EBF8`, `#4A4A4A`, `#19182b`, `#0047B3`

Treat these as a *starting* palette to verify visually against the live site per-component (Phase 2 & 6), not as final truth — inline styles / component-specific CSS may override the variables.

**Layout:** mobile breakpoint switch at `940px` (logo swaps to a mobile variant there — check nav/menu behavior around this width too).

**Site structure — see `reference/content.md` §2–10 for the exact, verified version of all of this** (nav labels including the mobile-menu label variants, all 6 mega-menu columns with every sub-item and category id, the real 6-slide hero carousel, all 10 category cards, all 8 Latest Products, all 20 Special Sales, all 8 Topwear, all 8 Bottoms, all 3 blog posts, and the full verbatim footer).

**Product detail page (code i414) — see `reference/content.md` §11 for the exact, verified version.** Highlights: single rich-text description blob (don't split into separate specs/FAQ/care components — the live site doesn't), variant data confirmed straight from the page's embedded JSON (colors سبز/مشکی/نسکافه‌ای/آبی‌نفتی/کرم with real stock counts 3/1/5/2/0), plain `<select>` dropdowns for color/pattern/size (not swatch buttons), plus 4 popups (stock-info, help, size-guide with 2 real measurement tables, notify-available) and 6 real related products (which *do* show category-tag chips, unlike the homepage rails).

---

## Phase 0 — Asset & content harvesting ✅ DONE

Before writing components, collect ground-truth assets so later phases don't block mid-build.

- [x] Re-fetch homepage + the chosen product detail page HTML; raw copies saved in `reference/html/landing.html` and `reference/html/product-i414.html`.
- [x] Download every image actually used by these two pages (6 banners, 10 category cards, 64 unique product photos across all rails + gallery + related, 3 blog thumbnails, logo/logo-mobile/logo.svg, both favicons) into `reference/images/{banner,category,product,blog,logo}/`.
- [x] Download the font files (`Liana-FD-Light/Regular/Bold/Black.ttf`, Font Awesome solid subset) into `reference/fonts/` — **licensing decision made: real font, local-only, never committed/deployed publicly. See note above.**
- [x] Extract exact copy strings (Persian) for every heading, label, button, and paragraph — done via script-parsing the raw HTML (not model summarization) into `reference/content.md`. This caught and fixed two errors from the original AI-summarized scan (hero slide count, Bottoms rail count).
- [x] Record exact computed spacing/sizing — **done for desktop via live browser (Claude in Chrome)**, see `reference/content.md` §13: real `getComputedStyle` values for the CTA color, container, RTL setup, product-box, prices, fonts, plus real screenshots of the mega-menu, footer, and hero slides that visually confirm §2–10. **Still open**: `resize_window` didn't actually change the rendered viewport in this session (stuck at ~1707px regardless of the requested size), so the 768/576/940px mobile/tablet behavior remains CSS-source-only, not verified against a real rendered mobile view — re-attempt in Phase 6 with real devtools device emulation or user-provided phone screenshots before finalizing mobile styles.
- [x] Flagged rather than silently resolved: the Liana-FD font's commercial license (§ above), and two label/category-id inconsistencies on the live site itself (mobile menu uses shorter labels than the desktop mega-menu in a few spots; "هودی/سویشرت" and "دورس" both point at the same category id) — noted in `reference/content.md` §2 to replicate faithfully rather than "fix."

## Phase 1 — Initialize the Next.js project (best practices & folder structure)

- [ ] `create-next-app` with TypeScript, App Router, ESLint, `src/` directory.
- [ ] Choose and install the styling approach — Tailwind CSS (recommended, maps cleanly onto the scanned design-token list) configured with a `tailwind.config.ts` theme extension for the color tokens, font families, and breakpoints found above.
- [ ] Folder structure (App Router):
  ```
  src/
    app/
      layout.tsx            # <html lang="fa" dir="rtl">, global fonts/providers
      page.tsx               # landing page
      products/[slug]/page.tsx
      globals.css
    components/
      layout/                # Header, MegaMenu, MobileNav, Footer
      landing/                # Hero, CategoryGrid, ProductSection, SaleSection, BlogSection
      product/                # Gallery, VariantPicker, QtyStepper, SpecsTable, SizeGuide, RelatedProducts
      ui/                     # Button, Badge, Price, Breadcrumb — generic/reusable
    data/                     # typed content extracted from the live site (products.ts, categories.ts, blog.ts)
    lib/                      # formatting helpers (Persian/Jalali dates, تومان price formatting, RTL utils)
    types/                    # Product, Category, BlogPost, Variant, etc.
  public/
    fonts/                    # self-hosted Liana-FD ttf files
    images/                   # downloaded assets from Phase 0
  ```
- [ ] Set up `next/font/local` for the Liana font family (all weights) and wire it into Tailwind's `fontFamily`. Copy the `.ttf` files from `reference/fonts/` into `public/fonts/` (or `src/app/fonts/`), then immediately add that font path to `.gitignore` — **per the licensing decision, the real font files must never be committed or deployed publicly.**
- [ ] Configure `next.config.js` image domains/patterns if any images will be hotlinked instead of self-hosted (prefer self-hosting via `public/images` + `next/image` for pixel/perf control).
- [ ] Prettier + ESLint config consistent with Next.js recommended rules; add `lint`/`format` scripts.
- [ ] `tsconfig.json` path aliases (`@/components`, `@/data`, `@/lib`, etc.).
- [ ] Git init + meaningful `.gitignore` (include `reference/` raw scrape dir **and** the copied `.ttf` font path under `public/`/`src/app/fonts/` — real commercial font, local-only per the licensing decision), initial commit.
- [ ] README stub: project purpose, how to run, and a short note framing this as a Django→Next.js migration exercise (useful talking point for the interview).

## Phase 2 — Design tokens & global styles

- [ ] Encode the verified color palette, spacing scale, and typography scale (weights 100–900, sizes used for h1/h2/body/price/etc.) into Tailwind theme / CSS variables.
- [ ] Set `dir="rtl"` — **live-verified: the real site puts `dir="rtl"` on `<body>`, not `<html>`** (`<html>` computes as `ltr`). Match that (`<html lang="fa">` + `dir="rtl"` on the body/root layout wrapper) rather than defaulting to `dir="rtl"` on `<html>`. Verify Tailwind's logical properties (or the RTL plugin) behave correctly for margins/paddings/icons either way.
- [ ] Build base primitives in `components/ui`: `Button`, `Price` (تومان formatter + strikethrough-original-price variant), `Badge` (sale %), `Breadcrumb`.
- [ ] Verify against the live site at the confirmed breakpoint(s) (940px mobile switch, plus standard sm/md/lg/xl) before moving on.

## Phase 3 — Shared layout: Header, Mega Menu, Footer

- [ ] `Header`: logo (desktop/mobile variants via `next/image` + `<picture>`-equivalent), login link, cart icon+count (static/demo state is fine since there's no real backend).
- [ ] `MegaMenu`: all 6 top-level categories with their real sub-item lists (Sets/Topwear/Bottoms/Cold Season/Accessories + Special Sales/Blog/About/Contact/Size Guide).
- [ ] `MobileNav`: hamburger/drawer behavior matching the site's mobile pattern below 940px.
- [ ] `Footer`: About blurb, quick links, address/hours, phone numbers, ENAMAD + Torob trust badges (real badge images/links), copyright line.
- [ ] Sanity-check every nav label and footer string against Phase 0 copy extraction — fix any mismatch before Phase 4.

## Phase 4 — Landing page sections

Build each as its own component fed by typed data in `data/`, in this order:

- [ ] Hero carousel — one swiper with the real 6 slides (Team Vanik/about-us, autumn collection, 3 product promos J377/J375/J303, free-shipping — the last slide has an empty href, replicate that).
- [ ] Category grid (10 cards, real icons/images + labels + hrefs).
- [ ] `ProductCard` (shared component reused by every product rail) — image, name w/ code, price, sale badge when applicable, link. Needs a variant toggle for the category-tag chips (`product-box-cats`) since homepage rails hide them but the related-products rail on the product page shows them.
- [ ] "Latest Products" rail using the real 8 products in `reference/content.md` §5.
- [ ] "Special Sales" rail (real 20 items, §6) with strikethrough/sale pricing + "OFF" ribbon badge.
- [ ] Topwear rail (8 products, §7) and Bottoms rail (**8**, not 9 — §8).
- [ ] Blog section (3 real posts: title, category tag, author, Jalali date, link, thumbnail).
- [ ] Assemble `app/page.tsx` from the above in the real page order; do a full-page visual pass against the live site.

## Phase 5 — Product detail page

- [ ] Route: `app/products/[slug]/page.tsx` (or matching whatever URL shape you choose — note it doesn't need to match Django's numeric-id-in-path scheme exactly, but should feel equivalent).
- [ ] Breadcrumb using the real category chain: محصولات › ست زنانه › بالاپوش › شومیز شلوار.
- [ ] `Gallery`: all 8 real product images (file names in `reference/content.md` §11), thumbnail strip + main viewer.
- [ ] Title + `Price` (1,698,000 → 1,398,000 تومان, single price for the whole product — not per-variant).
- [ ] `VariantPicker`: **the live site uses plain `<select>` dropdowns for رنگ/طرح/سایز, not swatch buttons** — match that, don't upgrade to swatches unless asked. Real data: سبز(3)/مشکی(1)/نسکافه‌ای(5)/آبی‌نفتی(2)/کرم(0, sold out) — from the page's own embedded variant JSON. Plus a "جدول سایزبندی" button opening the size-guide popup.
- [ ] Qty stepper + "افزودن به سبد خرید" primary CTA + "افزودن به علاقه‌مندی" wishlist toggle + "موجود شد اطلاع بده" notify button (client-side/demo state, no real cart needed).
- [ ] Description: **one rich-text block** reproducing the real CKEditor content verbatim (specs table → intro → fabric-info → sizing-info → who-it's-for → care+2-item wash list → styling-suggestion → highlighted "سوالات متداول" + 3 FAQ Q&As → highlighted "نکات قبل از خرید و شرایط مرجوعی" + 4-item return-policy list → 2 centered closing lines). Don't split this into separate Specs/FAQ/SizeGuide components — the live page doesn't.
- [ ] 4 popups: stock-info table (color-coded rows), help (`راهنما`, 7 tips), size-guide (`جدول سایزبندی`, 2 intro notes + shirt measurements table + pants measurements table — real values in §11), notify-available (low priority, no real backend).
- [ ] Related products grid — the real 6 items in §11, reusing `ProductCard` **with its category-tag-chip variant turned on** (this rail shows tags, homepage rails don't).
- [ ] Full visual pass against the live product page.

## Phase 6 — Responsive & pixel-perfect QA

- [ ] Compare landing + product pages side-by-side against vanikmode.com at desktop, ~940px, and mobile widths; correct spacing/font-size/color drift.
- [ ] Verify RTL correctness everywhere (icon mirroring, chevrons, margin direction, text alignment).
- [ ] Run Lighthouse (performance/accessibility/SEO) and fix anything cheap to fix (image sizing via `next/image`, alt text, semantic headings, color contrast).
- [ ] Cross-browser sanity check (Chrome + Safari/Firefox at minimum) if available.
- [ ] Re-confirm every piece of text/price/image against the live site one final time — if anything drifted from Phase 0 data, fix the data file, not just the pixels.

## Phase 7 — Interview polish

- [ ] Finish README: architecture decisions, folder-structure rationale, and an explicit "why Next.js over Django templates" section (SSR/SSG, `next/image` optimization, component reuse, TypeScript safety, DX) — this is likely to come up in the interview.
- [ ] Optional: deploy a preview (e.g. Vercel) to have a live link ready to share — **the font-licensing decision means the real Liana-FD font can't go in a public deploy.** If a shareable link is wanted, either swap to a free lookalike font for that build only, or skip the public deploy and demo from `localhost` instead.
- [ ] Prepare a short 60–90s walkthrough script: what was built, key technical decisions, what you'd do next for the full migration (auth, real cart, CMS-driven content, search, etc.).

---

**Status:** plan only — no implementation started yet. Confirm phase order/scope, then we start with Phase 0/1.
