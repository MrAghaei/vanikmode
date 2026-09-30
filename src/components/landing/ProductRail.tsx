import { Rail } from "@/components/ui/Rail";
import { ReadMoreLink } from "@/components/ui/ReadMoreLink";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

export type ProductRailProps = {
  title: string;
  /** Latest Products uses an `<h2>`; the other three rails use `<h3>` (verified DOM). */
  headingLevel?: "h2" | "h3";
  seeMoreHref: string;
  seeMoreLabel: string;
  seeMoreVariant?: "primary" | "danger";
  products: Product[];
  /** Real per-rail Swiper autoplay delay (ms) — reference/js/script.js. */
  autoplayDelay: number;
  onsale?: boolean;
};

// Shared shell for the four homepage product rails (Latest / Special Sales /
// Topwear / Bottoms) — real markup is `.section-header-row` + a Swiper of
// `.product-box` cards, slidesPerView 1.5 / 3.5 / 4.5, spaceBetween 24.
export function ProductRail({
  title,
  headingLevel = "h3",
  seeMoreHref,
  seeMoreLabel,
  seeMoreVariant = "primary",
  products,
  autoplayDelay,
  onsale = false,
}: ProductRailProps) {
  const Heading = headingLevel;

  return (
    <section className="mx-auto max-w-(--breakpoint-lg) px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <Heading className="text-base font-black">{title}</Heading>
        <ReadMoreLink href={seeMoreHref} label={seeMoreLabel} variant={seeMoreVariant} />
      </div>

      <Rail count={products.length} autoplayDelay={autoplayDelay} className="gap-6 pb-4">
        {products.map((product) => (
          <div
            key={product.href}
            className="w-[66.6667%] shrink-0 snap-start sm:w-[28.5714%] md:w-[22.2222%]"
          >
            <ProductCard product={product} onsale={onsale} />
          </div>
        ))}
      </Rail>
    </section>
  );
}
