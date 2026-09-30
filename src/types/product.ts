export type Product = {
  title: string;
  price: number;
  /** Present only for on-sale items; shown struck through next to `price`. */
  originalPrice?: number;
  href: string;
  /** Filename within public/images/product/. */
  image: string;
  /**
   * Category-tag chips (e.g. related products on the product page). Homepage
   * rails don't render these — real site's `.product-box-cats` is an empty
   * `<ul>` there, only populated on the related-products rail.
   */
  cats?: string[];
};
