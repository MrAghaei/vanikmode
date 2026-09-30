# Vanik Mode — Next.js rebuild

A pixel-accurate rebuild of [vanikmode.com](https://vanikmode.com/)'s landing page and one product detail page in Next.js — built as an interview showcase piece for a role migrating that site from Django templates + jQuery to Next.js.

All text, prices, and images are the real content from the live site (see `reference/`), not placeholders.

## Why Next.js over Django templates

- **Server Components + streaming** instead of server-rendered templates with client-side jQuery bolted on — same "fast first paint" goal as the Django setup, without hand-wiring swiper/AJAX for every interactive bit.
- **`next/image`** for automatic resizing/format negotiation of the product photography, replacing hand-picked static image tags.
- **Component reuse** — one `ProductCard` and one `Price` component drive every product rail on the landing page and the related-products rail on the detail page, instead of the same markup repeated per Django template block.
- **TypeScript** end to end — product/variant/category shapes are real types, not template-context dictionaries.
- **Colocation** — routes, data, and components live in one typed codebase instead of split across Django views/templates/static files.

## Getting started

```bash
cp reference/fonts/*.ttf src/app/fonts/   # see src/app/fonts/README.md — not committed to git
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- `npm run lint` — ESLint (Next.js core-web-vitals + TypeScript rules, Prettier-compatible)
- `npm run format` / `npm run format:check` — Prettier

## Project structure

```
src/
  app/            # routes (App Router) — landing page + /products/[slug]
    fonts/        # local-only real Liana-FD font files (gitignored, see README there)
  components/
    layout/       # Header, MegaMenu, MobileNav, Footer
    landing/      # Hero, CategoryGrid, ProductSection, BlogSection
    product/      # Gallery, VariantPicker, SizeGuide, RelatedProducts
    ui/            # Button, Price, Badge, Breadcrumb — generic/reusable
  data/           # typed content extracted from the live site
  lib/            # formatting helpers (تومان price formatting, RTL utils)
  types/          # Product, Category, Variant, BlogPost, etc.
public/
  images/         # self-hosted copies of the real site's images
reference/        # raw scrape of the source site (HTML/CSS/images/fonts + content.md) — gitignored, not part of the app
```

## Status

Following the phased plan in [`tasks.md`](./tasks.md). Currently: Phase 1 (project scaffold) — landing and product pages are still placeholders.

## Font licensing

The real font (`Liana FD`) is a paid commercial font, not open-license. It's used locally for visual accuracy but is **never committed to git and never deployed to a public URL** — see `src/app/fonts/README.md` and the licensing note in `tasks.md`.
