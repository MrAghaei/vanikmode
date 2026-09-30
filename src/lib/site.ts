export const SITE_ORIGIN = "https://vanikmode.com";

/**
 * This app rebuilds the homepage and every product-detail page. Every other
 * real link on the site (category pages, blog posts, cart, login, static
 * pages) points back to the live site instead of 404ing, so the
 * header/footer stay fully navigable.
 *
 * In local development, links stay on the same origin so you can click
 * through the rebuild without being sent to vanikmode.com.
 */
export function externalUrl(path: string): string {
  const relative = path.startsWith("/") ? path : `/${path}`;
  if (process.env.NODE_ENV === "development") {
    return relative;
  }
  return `${SITE_ORIGIN}${relative}`;
}

/** Live product-detail paths look like `/products/{id}/{slug}/`. */
const PRODUCT_PATH = /^\/products\/\d+\/[^/]+\/?$/;

export function isProductPath(path: string): boolean {
  return PRODUCT_PATH.test(path);
}

/**
 * Product cards always link inside this app — `app/products/[id]/[slug]`
 * renders any live product, using the same path as vanikmode.com.
 */
export function productHref(path: string): string {
  if (path.startsWith("http")) {
    return new URL(path).pathname;
  }
  return path.startsWith("/") ? path : `/${path}`;
}

/** Site-relative asset path (`/media/...`) → absolute vanikmode.com URL. */
export function absoluteSiteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

/** See `Product.image`: local filename or absolute live URL. */
export function productImageSrc(image: string): string {
  return /^https?:\/\//.test(image) ? image : `/images/product/${image}`;
}
