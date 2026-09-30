export type Product = {
  title: string;
  price: number;
  /** Present only for on-sale items; shown struck through next to `price`. */
  originalPrice?: number;
  href: string;
  /**
   * Either a filename within public/images/product/ (homepage rails, whose
   * images were downloaded in Phase 0) or an absolute URL on vanikmode.com
   * (rails parsed live from a product page). Resolve with `productImageSrc()`.
   */
  image: string;
  /**
   * Category-tag chips (e.g. related products on the product page). Homepage
   * rails don't render these — real site's `.product-box-cats` is an empty
   * `<ul>` there, only populated on the product page's rails.
   */
  cats?: string[];
};

export type BreadcrumbLink = {
  label: string;
  href: string;
};

/** One entry of the live page's embedded `variants.variants` JSON. */
export type ProductVariant = {
  id: number;
  color: string;
  pattern: string;
  size: string;
  price: number;
  stock: number;
  /** Absolute image URL shown as the featured image when this variant is picked. */
  image?: string;
};

/** Everything the product page renders, parsed from the live vanikmode.com page. */
export type ProductDetailData = {
  id: string;
  /** `/products/{id}/{slug}/` — same path shape as the live site. */
  path: string;
  title: string;
  price: number;
  originalPrice?: number;
  /** Absolute URL of `.product-main-image-container img`. */
  featuredImage: string;
  /** Absolute URLs, in the real thumbnail-strip DOM order (featured image repeated last). */
  gallery: string[];
  /** `ol.breadcrumb` — "محصولات" followed by every category. */
  breadcrumb: BreadcrumbLink[];
  /** First `ul.tags-list` (دسته‌بندی). */
  categories: BreadcrumbLink[];
  /** Second `ul.tags-list` (برچسب‌ها) — often empty on the live site. */
  tags: BreadcrumbLink[];
  /** `<option>` values of each variant `<select>`, in real DOM order. */
  options: { color: string[]; pattern: string[]; size: string[] };
  variants: ProductVariant[];
  /** Out-of-stock variants listed in the notify-available popup. */
  notifyItems: { id: string; label: string }[];
  /** CKEditor HTML blobs, sanitized, with site-relative URLs rewritten. */
  descriptionHtml: string;
  sizeGuideHtml: string;
  helpHtml: string;
  relatedProducts: Product[];
  latestProducts: Product[];
};
