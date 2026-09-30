export const SITE_ORIGIN = "https://vanikmode.com";

/**
 * Only the homepage and the one rebuilt product-detail route are real pages
 * in this app. Every other real link on the site (other products, category
 * pages, blog posts, cart, login, static pages) points back to the live
 * site instead of 404ing, so the header/footer stay fully navigable.
 */
export function externalUrl(path: string): string {
  return `${SITE_ORIGIN}${path}`;
}
