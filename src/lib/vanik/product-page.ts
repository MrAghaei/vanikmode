import { cache } from "react";
import { parse, type HTMLElement } from "node-html-parser";
import {
  SITE_ORIGIN,
  absoluteSiteUrl,
  externalUrl,
  isProductPath,
  productHref,
} from "@/lib/site";
import type { BreadcrumbLink, Product, ProductDetailData, ProductVariant } from "@/types/product";

/**
 * Backend-for-frontend adapter: the live Django site has no JSON API, so the
 * product page is read from its server-rendered HTML and mapped onto typed
 * data. Every string, price, image and stock count on the rebuilt page comes
 * from here — nothing is hand-transcribed, so every product on vanikmode.com
 * renders, not only the ones scraped during Phase 0.
 */

/** Live content changes rarely (stock counts do); 10 minutes keeps it fresh without hammering the origin. */
const REVALIDATE_SECONDS = 600;

export const getProductPage = cache(
  async (id: string, slug: string): Promise<ProductDetailData | null> => {
    if (!/^\d+$/.test(id)) return null;

    const url = `${SITE_ORIGIN}/products/${id}/${encodeURIComponent(safeDecode(slug))}/`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });

    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`vanikmode.com responded ${res.status} for ${url}`);
    }

    const html = await res.text();
    const data = parseProductPage(html, new URL(res.url || url).pathname);
    return data;
  },
);

export function parseProductPage(html: string, path: string): ProductDetailData | null {
  // Comments are dropped so the live page's commented-out reviews section never leaks in.
  const root = parse(html, { comment: false });
  const header = root.querySelector(".page-product-header");
  if (!header) return null;

  const title = text(header.querySelector(".page-product-header-content .page-title"));
  const card = header.querySelector(".page-product-action-container");
  const tagLists = card?.querySelectorAll("ul.tags-list") ?? [];

  const priceBox = card?.querySelector(".page-product-price-container");
  const originalPrice = toNumber(text(priceBox?.querySelector(".product-price-old")));

  return {
    id: path.split("/")[2] ?? "",
    path,
    title,
    price: toNumber(text(priceBox?.querySelector(".product-price-main"))) ?? 0,
    originalPrice,
    featuredImage: absoluteSiteUrl(
      header.querySelector(".product-main-image-container img")?.getAttribute("src") ?? "",
    ),
    gallery: header
      .querySelectorAll(".page-product-gallery .product-page-gallery-image img")
      .map((img) => absoluteSiteUrl(img.getAttribute("src") ?? ""))
      .filter(Boolean),
    breadcrumb: links(header.querySelectorAll("ol.breadcrumb a")),
    categories: links(tagLists[0]?.querySelectorAll("a") ?? []),
    tags: links(tagLists[1]?.querySelectorAll("a") ?? []),
    options: {
      color: optionValues(card, "#product-variant-color"),
      pattern: optionValues(card, "#product-variant-pattern"),
      size: optionValues(card, "#product-variant-size"),
    },
    variants: parseVariants(html),
    notifyItems: root.querySelectorAll(".notify-item").map((item) => ({
      id: item.querySelector("input")?.getAttribute("value") ?? "",
      label: text(item.querySelector("label")),
    })),
    descriptionHtml: richHtml(root.querySelector(".product-page-description > .card")),
    sizeGuideHtml: richHtml(root.querySelector("#size-guide-popup")),
    helpHtml: richHtml(root.querySelector('[data-trigger="help-product"] .popup-content')),
    relatedProducts: productBoxes(root.querySelectorAll(".section-related-products .product-box")),
    latestProducts: productBoxes(root.querySelectorAll(".section-other-products .product-box")),
  };
}

type RawVariants = {
  variants?: Record<
    string,
    { id: number; price: number; stock_quantity: number; image?: string | null }
  >;
  variant_matrix?: { color: string; pattern: string; size: string }[];
};

/** The page's inline `let variants = {...}` script — same source the live page's own JS reads. */
function parseVariants(html: string): ProductVariant[] {
  const match = html.match(/let variants = (\{.*\});?\s*$/m);
  if (!match) return [];

  let raw: RawVariants;
  try {
    raw = JSON.parse(match[1]);
  } catch {
    return [];
  }

  return (raw.variant_matrix ?? []).flatMap(({ color, pattern, size }) => {
    // Same key format as the live `getSelectedCombination()`: color-size-pattern.
    const entry = raw.variants?.[`${color}-${size}-${pattern}`];
    if (!entry) return [];
    return [
      {
        id: entry.id,
        color,
        pattern,
        size,
        price: entry.price,
        stock: entry.stock_quantity,
        image: entry.image ? absoluteSiteUrl(entry.image) : undefined,
      },
    ];
  });
}

function productBoxes(boxes: HTMLElement[]): Product[] {
  return boxes.map((box) => {
    const originalPrice = toNumber(text(box.querySelector(".product-price-old")));
    return {
      title: text(box.querySelector(".product-box-title")),
      price: toNumber(text(box.querySelector(".product-price-main"))) ?? 0,
      originalPrice,
      href: productHref(box.getAttribute("href") ?? "/"),
      image: absoluteSiteUrl(box.querySelector(".product-box-image")?.getAttribute("src") ?? ""),
      cats: box.querySelectorAll(".product-box-cats li").map(text),
    };
  });
}

const BLOCKED_TAGS = "script, style, iframe, object, embed, form, input, button, link, meta";

/**
 * CKEditor HTML from the live admin. Rendered as-is (it's the real copy and
 * inline styling), minus anything executable, with site-relative links and
 * images pointed at the right place.
 */
function richHtml(el: HTMLElement | null): string {
  if (!el) return "";
  const clone = parse(el.innerHTML);

  clone.querySelectorAll(BLOCKED_TAGS).forEach((node) => node.remove());

  for (const node of clone.querySelectorAll("*")) {
    for (const name of Object.keys(node.attributes)) {
      if (name.toLowerCase().startsWith("on")) node.removeAttribute(name);
    }

    const href = node.getAttribute("href");
    if (href !== undefined) {
      if (/^\s*javascript:/i.test(href)) node.removeAttribute("href");
      else if (href.startsWith("/")) node.setAttribute("href", siteLink(href));
    }

    const src = node.getAttribute("src");
    if (src?.startsWith("/")) node.setAttribute("src", absoluteSiteUrl(src));
  }

  return clone.toString().trim();
}

/** Product pages stay inside this app; every other site link goes to the live site. */
function siteLink(path: string): string {
  return isProductPath(path) ? productHref(path) : externalUrl(path);
}

function links(anchors: HTMLElement[]): BreadcrumbLink[] {
  return anchors.map((a) => ({
    label: text(a),
    href: siteLink(a.getAttribute("href") ?? "/"),
  }));
}

function optionValues(scope: HTMLElement | null | undefined, selector: string): string[] {
  return (
    scope
      ?.querySelectorAll(`${selector} option`)
      .map((option) => option.getAttribute("value") ?? text(option)) ?? []
  );
}

function text(el: HTMLElement | null | undefined): string {
  return el ? el.textContent.replace(/\s+/g, " ").trim() : "";
}

function toNumber(value: string): number | undefined {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : undefined;
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
