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

## Phase 1 — Initialize the Next.js project (best practices & folder structure) ✅ DONE

- [x] `create-next-app@latest` (Next.js 16.3.7) with TypeScript, App Router, ESLint, `src/` directory, Turbopack. Scaffolded into a scratch dir and merged in (create-next-app refuses a non-empty target dir; `reference/`, `tasks.md`, `.git` were already there).
- [x] Styling: Tailwind **v4** (not v3) — installed by `create-next-app --tailwind` itself. **Correction to the original plan**: Tailwind v4 is CSS-first — there is no `tailwind.config.ts`. Theme tokens go in `@theme` blocks inside `src/app/globals.css` instead. The full color/typography/breakpoint token set from `reference/content.md` §12–13 is deferred to Phase 2 as planned; Phase 1 only wired the font variable through `@theme inline`.
- [x] Folder structure created (App Router), matching the original plan with one path correction (fonts live under `src/app/fonts/`, not `public/fonts/` — colocating with the layout that loads them, per `next/font/local` convention):
  ```
  src/
    app/
      layout.tsx                    # <html lang="fa">, <body dir="rtl">, Liana font — done
      page.tsx                      # landing placeholder — real build is Phase 4
      products/[slug]/page.tsx      # product placeholder — real build is Phase 5
      globals.css
      fonts/                        # Liana-FD .ttf files — gitignored, see fonts/README.md
    components/{layout,landing,product,ui}/   # empty (.gitkeep), populated Phase 3–5
    data/, lib/, types/                        # empty (.gitkeep), populated Phase 4–5
  public/
    images/{banner,category,product,blog,logo}/   # all real downloaded assets, self-hosted
  ```
- [x] `next/font/local` wired for all 4 Liana weights (100–900 mapped across Light/Regular/Bold/Black) with `fallback: ['Tahoma','Arial','sans-serif']`, exposed as `--font-liana` → `--font-sans` in `@theme inline`.
- [x] `next.config.ts`: added `images.remotePatterns` for `trustseal.enamad.ir` and `api.torob.com` (the two live-hotlinked trust badges from `reference/content.md` §10) — everything else is self-hosted from `public/images/`, no other remote patterns needed.
- [x] Prettier (`.prettierrc.json`, `.prettierignore`) + `eslint-config-prettier` wired into `eslint.config.mjs`; `format`/`format:check` scripts added alongside the existing `lint` script.
- [x] `tsconfig.json` path alias — `create-next-app` already sets up `@/*` → `./src/*`, which covers `@/components/...`, `@/data/...`, `@/lib/...`, `@/types/...` without needing separate per-folder aliases.
- [x] `.gitignore` extended with `/reference/` and `/src/app/fonts/*.ttf` (verified via `git status`/`git add -A` before committing — neither is staged).
- [x] README rewritten: project purpose, real "why Next.js over Django" talking points, run instructions (including the `cp reference/fonts/*.ttf src/app/fonts/` step needed since fonts aren't committed), folder structure, font-licensing note.
- [x] Verified before committing: `npm run lint` clean, `npm run build` succeeds (`/` static, `/products/[slug]` dynamic), dev server returns HTTP 200 on both routes via `curl` from within the sandbox. Visual confirmation via browser wasn't possible — the Claude-in-Chrome extension controls the *user's* real browser, which can't reach this sandbox's `localhost:3000`; the user should run `npm run dev` locally to see it rendered.
- [x] Removed `create-next-app`'s default boilerplate (Vercel/Next logos on the homepage, unused SVGs in `public/`) and its `prefers-color-scheme: dark` block in `globals.css` — the real site is light-only, no dark mode.
- [x] `git init` was already done before this session started (repo exists with `origin` → `git@github.com:MrAghaei/vanikmode.git`, no prior commits) — made the initial commit (`d747a7e`) locally. **Not pushed to origin** — that needs a separate explicit go-ahead.
- Note: `create-next-app` also generates `AGENTS.md`/`CLAUDE.md` pointing at `node_modules/next/dist/docs/` (Next.js's own "this version has breaking changes vs. your training data" notice, auto-managed by `next dev`) — left in place and worth actually reading before Phase 3+ route/data-fetching work, since this is Next 16 with some newer conventions (e.g. `params`/`searchParams` as Promises, the global `PageProps<'/route'>` / `LayoutProps<'/route'>` typed helpers used in `layout.tsx` and the product route already).

## Phase 2 — Design tokens & global styles ✅ DONE

- [x] Encoded the verified color palette + card geometry + breakpoints into Tailwind v4's `@theme` block in `src/app/globals.css` (no `tailwind.config.ts` — see Phase 1's note on Tailwind v4 being CSS-first). Colors are namespaced (`--color-primary`, `--color-price`, `--color-ribbon`, etc.) rather than overriding Tailwind's built-in palette, with inline comments marking which values are live-verified vs. source-CSS-only. Breakpoints set to the real values: `sm:576px`, `md:768px`, `lg:1200px`, plus a one-off `nav:941px` for the header logo swap.
- [x] `dir="rtl"` — already done in Phase 1's `layout.tsx` (`<body dir="rtl">`, not `<html>`), matching the live-verified fact.
- [x] Built `components/ui/{Button,Price,Badge,Breadcrumb}.tsx`. Two things corrected from the original plan while building against real markup/CSS:
  - `Badge` is not a generic "sale %" badge — the real site's percentage badge is HTML-commented-out/unused; the only badge that actually renders is a diagonal "OFF" ribbon (`.product-box-out-of-stock.off-ribbon` in source CSS: red `#FF2929`, 200px wide, rotated -45deg, `top:24px; left:-64px`). Built it as that exact ribbon, not a generic percentage badge.
  - **Icon strategy decided**: the site uses a self-hosted Font Awesome icon font for every icon (chevrons, cart, search, user, heart, etc.) — asked the user, decision was `lucide-react` (modern tree-shakeable icon components) over re-hosting the FA webfont or hand-drawn SVGs. `Breadcrumb`'s separator uses `lucide-react`'s `ChevronLeft`. This applies to all icon usage in Phase 3+.
  - `Price` mirrors the real markup exactly: amount always wrapped in `<span dir="ltr">` with `toLocaleString('en-US')` comma grouping + trailing "تومان", main price always green/`--color-price`, original price (when present) always red+line-through/`--color-price-old` — verified live, not a "green=cheap" convention, just the site's literal color choice.
- [x] Verified by temporarily rendering all four primitives with real content (real prices, real breadcrumb chain) on the still-placeholder homepage, then: `npm run build` (custom utilities like `bg-primary`, `rounded-card`, `bg-ribbon`, `text-price` confirmed present in the compiled CSS, resolving to the right `--color-*`/`--radius-*` vars), `npm run lint` clean, dev server HTML fetched via `curl` and grepped for the expected classes. **Could not get a real browser screenshot** — same sandbox limitation as Phase 1 (Claude-in-Chrome drives the user's real browser, which can't reach this sandbox's `localhost`). The homepage placeholder currently *is* this primitives preview; Phase 4 replaces it with the real landing page.

## Phase 3 — Shared layout: Header, Mega Menu, Footer

- [ ] `Header`: logo (desktop/mobile variants via `next/image` + `<picture>`-equivalent), login link, cart icon+count (static/demo state is fine since there's no real backend).
- [ ] `MegaMenu`: all 5 mega-menu columns with their real sub-item lists (Sets/Topwear/Bottoms/Cold Season/Accessories), plus the plain nav links (Home/Shop/Blog/About/Contact/Size Guide) and the mobile accordion's slightly different sub-labels (see `reference/content.md` §2).
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
