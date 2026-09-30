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
>
> - the font files must **not** be committed to git (add `public/fonts/*.ttf` / wherever they land to `.gitignore` in Phase 1, not just `reference/`),
> - the project must **not** be deployed to a public URL (Vercel preview, GitHub Pages, etc.) with the real font bundled — Phase 7's "optional deploy a preview" task is affected by this: either skip the public deploy, or swap to a free lookalike (e.g. Vazirmatn) _only for that public build_ if a shareable link turns out to be wanted later.

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

Treat these as a _starting_ palette to verify visually against the live site per-component (Phase 2 & 6), not as final truth — inline styles / component-specific CSS may override the variables.

**Layout:** mobile breakpoint switch at `940px` (logo swaps to a mobile variant there — check nav/menu behavior around this width too).

**Site structure — see `reference/content.md` §2–10 for the exact, verified version of all of this** (nav labels including the mobile-menu label variants, all 6 mega-menu columns with every sub-item and category id, the real 6-slide hero carousel, all 10 category cards, all 8 Latest Products, all 20 Special Sales, all 8 Topwear, all 8 Bottoms, all 3 blog posts, and the full verbatim footer).

**Product detail page (code i414) — see `reference/content.md` §11 for the exact, verified version.** Highlights: single rich-text description blob (don't split into separate specs/FAQ/care components — the live site doesn't), variant data confirmed straight from the page's embedded JSON (colors سبز/مشکی/نسکافه‌ای/آبی‌نفتی/کرم with real stock counts 3/1/5/2/0), plain `<select>` dropdowns for color/pattern/size (not swatch buttons), plus 4 popups (stock-info, help, size-guide with 2 real measurement tables, notify-available) and 6 real related products (which _do_ show category-tag chips, unlike the homepage rails).

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
- [x] Verified before committing: `npm run lint` clean, `npm run build` succeeds (`/` static, `/products/[slug]` dynamic), dev server returns HTTP 200 on both routes via `curl` from within the sandbox. Visual confirmation via browser wasn't possible — the Claude-in-Chrome extension controls the _user's_ real browser, which can't reach this sandbox's `localhost:3000`; the user should run `npm run dev` locally to see it rendered.
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
- [x] Verified by temporarily rendering all four primitives with real content (real prices, real breadcrumb chain) on the still-placeholder homepage, then: `npm run build` (custom utilities like `bg-primary`, `rounded-card`, `bg-ribbon`, `text-price` confirmed present in the compiled CSS, resolving to the right `--color-*`/`--radius-*` vars), `npm run lint` clean, dev server HTML fetched via `curl` and grepped for the expected classes. **Could not get a real browser screenshot** — same sandbox limitation as Phase 1 (Claude-in-Chrome drives the user's real browser, which can't reach this sandbox's `localhost`). The homepage placeholder currently _is_ this primitives preview; Phase 4 replaces it with the real landing page.

## Phase 3 — Shared layout: Header, Mega Menu, Footer ✅ DONE

- [x] `Header`: logo (desktop `logo.png` / mobile `logo-mobile.png`, toggled via the custom `nav:` (941px) breakpoint rather than a real `<picture>` — same visual result), search form that really submits to the live site's real search (`https://vanikmode.com/products/?q=...`, matching the site's own JSON-LD `SearchAction` target), login link (external, real `/accounts/login/`), cart button + count badge opening a `CartDrawer`.
- [x] `MegaMenu`: all 5 columns with their real sub-item lists and hrefs, shown on hover via pure-CSS `group-hover` (matching the real site's hover-triggered desktop behavior, no JS needed) — data in `src/data/nav.ts`, typed in `src/types/nav.ts`.
- [x] `CartDrawer` (not originally planned as separate, but needed): the real drawer's content is AJAX/JS-rendered and wasn't in the Phase 0 static-HTML scrape — **live-clicked the real cart icon in Phase 3** to read it, since an empty cart is trivially reproducible. Got the exact empty-state copy ("سبد خرید خالی است.") and computed styles (dark-red `#82110C` panel, 440px wide, white 8px-radius action buttons) — see `reference/content.md` §14. Built as a real client-state slide-in panel.
- [x] `MobileNav`: fixed bottom bar (Home/Categories/Cart/Search/Login) + one unified slide-in drawer (primary nav links + the category accordion with mobile's real shorter labels + the trailing "فروش ویژه" link). **Deliberate simplification, recorded here rather than silently done**: the real site actually has _two_ separate mobile drawers — a hamburger-triggered nav-links drawer and a bottom-bar-triggered category accordion — which this merges into one. This was a scope call, not a faithfulness gap: the exact real mobile interaction pattern couldn't be verified (`resize_window` doesn't actually change the rendered viewport in this sandbox's Claude-in-Chrome session — see the Phase 0/2 caveat), so rather than guess at unverifiable interaction details, the two were merged into one clearly-correct pattern using 100% real content (labels/hrefs/grouping).
- [x] `Footer`: About blurb, quick links, address/hours, phone numbers (real `tel:` links), ENAMAD + Torob trust badges (hotlinked live from their real third-party URLs via `next/image` + the `remotePatterns` added in Phase 1), copyright + design-credit line — all verbatim, DOM order matching the real site exactly.
- [x] **Cross-cutting decision, applies to Phase 4/5 too**: this app only rebuilds the homepage and one product-detail route. Every other real link (other categories, other products, blog posts, cart, login, static pages) points to the equivalent **real absolute URL on vanikmode.com** (`src/lib/site.ts`'s `externalUrl()`) instead of 404ing inside this app — keeps the header/footer/mega-menu fully, honestly navigable without fabricating pages that don't exist here.
- [x] Fixed a latent bug from Phase 0: `reference/js/*.js` (downloaded this phase to check for cart-empty-state copy) was getting picked up by ESLint since nothing excluded `reference/` from lint scope. Added it to `eslint.config.mjs`'s ignores, matching `.gitignore`/`.prettierignore`.
- [x] Sanity-checked every nav label and footer string against `reference/content.md` (itself checked against raw HTML) before writing the data files — no mismatches found.
- [x] Verified: `npm run lint` + `npm run build` clean (including the trickier Tailwind v4 syntax used here — `max-w-(--breakpoint-lg)` arbitrary property referencing a theme token, and the logical-property utilities `rounded-s-card`/`border-s-0` on custom tokens — confirmed compiling to the correct CSS in the build output). Dev server HTML fetched via `curl` for both routes and grepped for real content strings (nav labels, footer text, copyright, badge alt text) — all present on both `/` and `/products/[slug]`, confirming the shared layout actually wraps both routes via `layout.tsx`. No visual screenshot possible (same sandbox/localhost limitation as Phases 1–2).

## Phase 4 — Landing page sections ✅ DONE

Build each as its own component fed by typed data in `data/`, in this order:

- [x] Hero carousel — one swiper with the real 6 slides (Team Vanik/about-us, autumn collection, 3 product promos J377/J375/J303, free-shipping — the last slide has an empty href, replicate that).
- [x] Category grid (10 cards, real icons/images + labels + hrefs).
- [x] `ProductCard` (shared component reused by every product rail) — image, name w/ code, price, sale badge when applicable, link. Needs a variant toggle for the category-tag chips (`product-box-cats`) since homepage rails hide them but the related-products rail on the product page shows them.
- [x] "Latest Products" rail using the real 8 products in `reference/content.md` §5.
- [x] "Special Sales" rail (real 20 items, §6) with strikethrough/sale pricing + "OFF" ribbon badge.
- [x] Topwear rail (8 products, §7) and Bottoms rail (**8**, not 9 — §8).
- [x] Blog section (3 real posts: title, category tag, author, Jalali date, link, thumbnail).
- [x] Assemble `app/page.tsx` from the above in the real page order; do a full-page visual pass against the live site.

**Data extraction correction vs. Phase 0**: `reference/content.md`'s product tables truncate some image UUIDs with "..." and the exact hero/topwear/bottoms hrefs. Rather than retype/guess those, re-parsed `reference/html/landing.html` directly with a small script (title/price/href/image regex over each rail's `product-box` markup) so every href and filename in `src/data/products.ts` is byte-exact from the source HTML, not hand-transcribed.

**Real per-rail behavior captured from `reference/js/script.js`** (not in `content.md` — pulled fresh this phase): each Swiper's real `slidesPerView` breakpoints, `spaceBetween`, and `autoplay.delay` (Latest Products 5000ms, Special Sales/Topwear/Bottoms 6000ms, header slider 8000ms, blog 7000ms, category grid has **no** autoplay). Implemented as flex/scroll-snap tracks with matching Tailwind width breakpoints (e.g. `66.6667%/28.5714%/22.2222%` for the 1.5/3.5/4.5-slide rails) instead of adding a Swiper/Embla dependency — a `Rail` client component (`src/components/ui/Rail.tsx`) auto-advances via `scrollIntoView` on an interval, pausing on hover, giving native drag/touch/trackpad scrolling for free. `HeroCarousel` is a separate component since it also needs visible prev/next arrows + dot pagination (not present on the other rails, which only have a draggable `.swiper-scrollbar`).

**Real detail found only in `reference/html/landing.html`'s inline `<style>` override, not `content.md`**: the Special Sales rail gives every `.product-box` a 3px solid ribbon-red border and overrides its `.read-more` button to a red background (`section.section-onsale-products` scoped rules) — `ProductRail`'s `onsale`/`seeMoreVariant="danger"` props replicate this; every other rail is unaffected.

**Internal-link decision**: of the 44 rail products, only code i414 (Special Sales item 20) is a page this app actually builds (Phase 5) — its `href` points at `/products/i414` instead of the live site, unlike the other 43 which use `externalUrl()` per the Phase 3 cross-cutting rule.

**Confirmed absent, not silently invented**: the real blog cards (`.news-box`) don't render an excerpt or a per-card "read more" link in the static markup — only a category-tag label on the thumbnail, title, author, and Jalali date. `BlogSection` matches that exactly rather than inventing filler copy.

**Not yet verified**: no real browser screenshot comparison — same sandbox limitation as Phases 1–3 (Claude-in-Chrome drives the user's real browser, which can't reach this sandbox's `localhost`). Lint, build, and a dev-server HTML fetch (grepped for real copy strings, image URLs, the onsale red-border/badge classes, and the internal i414 link) all pass, but the actual pixel comparison against vanikmode.com is deferred to Phase 6 — the user should run `npm run dev` locally and compare side-by-side.

## Phase 5 — Product detail page ✅ DONE (pending Phase 6 visual pass)

- [x] Route: `app/products/[slug]/page.tsx` — only `slug === "i414"` renders; every other slug calls `notFound()` (real 404 page, verified via curl) rather than fabricating other products, matching the Phase 3 cross-cutting rule. `generateMetadata` sets a real `<title>`.
- [x] Breadcrumb using the real category chain: محصولات › ست زنانه › بالاپوش › شومیز شلوار — hrefs pulled from the raw HTML's `<ol class="breadcrumb">`, not retyped from `content.md`'s summary.
- [x] `ProductGallery`: all 8 real product images, thumbnail strip + main viewer (client component, click-to-swap).
- [x] Title + `Price` (1,698,000 → 1,398,000 تومان, single price for the whole product).
- [x] `ProductActions`: plain `<select>` dropdowns for رنگ/طرح/سایز (not swatches), real variant data سبز(3)/مشکی(1)/نسکافه‌ای(5)/آبی‌نفتی(2)/کرم(0), qty stepper clamped to the selected variant's stock, "افزودن به سبد خرید" (disabled + "ناموجود" when stock is 0), "افزودن به علاقه‌مندی" wishlist toggle, "موجود شد اطلاع بده" notify button (shown only when out of stock) — all client-side demo state, no real cart.
- [x] `ProductDescription`: the full CKEditor blob transcribed **verbatim from the raw HTML** (`reference/html/product-i414.html`), not from `content.md`'s summary — `content.md` §11 only described each section's topic, not its actual paragraph text, so the raw scrape was re-read directly to stay inside the hard rule against inventing copy. One rich-text block, not split into separate components, per the live page.
- [x] 4 popups, built on a shared `ui/Modal.tsx` (centered dialog, Escape-to-close) distinct from the header's slide-in `CartDrawer`: stock-info table (color-coded rows, real DOM order — which differs from the `<select>`'s own order; both replicated as-is), help (`راهنما`, all 7 tips verbatim), size-guide (`جدول سایزبندی`, 2 intro notes + real shirt/pants measurement tables), notify-available (single real out-of-stock variant, real `variant_id` 8243).
- [x] Related products grid — the real 6 items, `href`/`image`/`cats` re-parsed byte-exact from the raw HTML's `product-box` markup (same approach as Phase 4's rail data), using `ProductCard`'s `showCategories` variant.
- [ ] Full visual pass against the live product page — deferred to Phase 6 (same sandbox/localhost limitation as Phases 1–4: this session's Claude-in-Chrome can't reach the dev server, so only `npm run lint`, `npm run build`, and content checks against the user's own already-running `npm run dev` on port 3001 were done here).

**Flagged rather than silently resolved, three spots where the live site's real markup didn't give a clean 1:1 answer:**

- The stock-info popup (`data-trigger="stock-info"`) has real content in the static HTML but **no visible trigger anywhere** in that HTML or `reference/js/script.js` — it looks orphaned/dead on the live site itself (unlike the other 3 popups, which all have a real `data-target`/`onclick` button). Rather than invent a trigger with no real-site backing, added a small link that reuses the popup's own real title text ("موجودی محصول") next to the رنگ select — the most contextually sensible spot, but a judgment call, not a verified one.
- The real page renders the product title as **two separate `<h1>`s** (a mobile-only one above the gallery, a desktop one beside it — pure CSS show/hide, not two different strings). Merged into one semantic `<h1>` inside `ProductActions`, same simplification precedent as Phase 3's mobile-nav-drawer merge, to avoid a duplicate-H1 a11y/SEO issue this app doesn't need to replicate.
- The real gallery's thumbnail strip literally repeats the featured image as its own last thumbnail (9 DOM nodes referencing 8 unique files). Replicated the *effect* (all 8 photos reachable, same default featured image) without the literal duplicate node — `ProductGallery` defaults its selected index to the last thumbnail instead.
- Minor invented-but-low-risk touch: the wishlist heart fills in (`fill-price-old`) when toggled. The real site's `toggle_favorite()` function name confirms a toggle exists, but no CSS for its active state was ever captured live — this is a reasonable placeholder affordance, worth a real visual check in Phase 6.

**Data-integrity note**: all of Phase 5's data (`src/data/product-detail.ts`) was pulled directly from `reference/html/product-i414.html`, not `reference/content.md` §11 — `content.md` describes the description section's structure/topics but doesn't reproduce its paragraph bodies, popup copy, or the stock/select DOM ordering verbatim. Re-scraping the raw HTML avoided the hard rule's "don't invent copy" trap that `content.md` alone would have walked into.

## Phase 6 — Responsive & pixel-perfect QA

- [ ] Compare landing + product pages side-by-side against vanikmode.com at desktop, ~940px, and mobile widths; correct spacing/font-size/color drift.
  - [x] **Mobile (≤768px) done.** vanikmode.com doesn't load from this machine (both the IDE browser and headless Chrome time out), so the reference was the user's two 360px phone screenshots (homepage + open hamburger menu) plus the `@media (max-width: 768px / 576px)` rules in `reference/css/style.css`. Our render was pixel-diffed against the screenshots with a headless-Chrome script; header, menu, hero, category grid, and bottom bar now land within 1px vertically. (The screenshots are a 360px viewport with the right 2px cropped, which is why the raw x-offsets differ by 2px.)
    - Mobile layout switches at **768px** (the real CSS breakpoint), not 941px; 941px now only swaps the logo, like the real `<picture>`. So 769–940px shows the desktop layout with the mobile logo, matching the live site.
    - Header: fixed 60px `#FFECEC` bar with a shadow, body `padding-top: 60px`, logo at its natural 100×64 size, and a hamburger/X toggle in `#972f29`.
    - The Phase 3 simplification is **undone**, now that the real behavior is known. The hamburger opens a full-screen list of the 6 primary links: 60px rows, `#82110C` dividers, active row `#FF8C55`. The bottom bar's "دسته‌بندی" separately opens `#mobile-category-list` (rose `#ffbab6` accordion), and "جستجو" docks a search field above the bar, as on the live site.
    - Bottom bar: `#FF6F61`, 56px, real icon set (house/bars/basket/search/user) with the 25px `#FF8C55` cart badge.
    - New `page-container` utility replicates `.container` (25px side margins up to 1200px, then a centered 1200px column). The old `px-4` gave 16px margins, and `mx-auto` inside the flex-column `<main>` made the rail sections size to their content, forcing a 1200px-wide layout on phones.
    - Hero: 67px top padding (the always-empty `.story-bar` is 25px + `.section-slider`'s 42px). Prev/next arrows restored (24px `rgba(255,255,255,.7)` circles, 25px in from the edges). Dots use Swiper's real colors: inactive 20% black, active **white**, so the active dot is invisible on white exactly like the live site (visible as a gap in the user's screenshot).
    - Rails use Swiper's real slide formula `(width − (n−1)·gap) / n` plus the real slider padding (10px latest/blog, 5px category-sample, `4px 2px 20px` categories). The old percentage widths ignored the gap. At ≤576px the product and blog rails go edge-to-edge with the header row inset 25px (`.section-latest-products.container { margin: 0 }` etc.).
    - Product-card price follows `.product-box-price`: stacked and left-aligned below 768px (10px text, 14px below 576px).
    - Footer bottom row keeps the real per-item `margin-bottom: 16px` (including the empty third div), so the fixed bottom bar never covers the copyright line.
    - **Not replicated:** the chat bubble in the screenshots is the third-party **Goftino** live-chat widget (injected by a script in `landing.html`; the site's own `.floating-menu` is commented out). `FloatingButtons` keeps a visual placeholder at the same position (32px from the bottom-right, above every overlay) rather than embedding the real support chat.
  - [ ] Desktop and ~940px pass still open, same blocker: the live site isn't reachable from here, so it needs user-provided desktop screenshots.
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
