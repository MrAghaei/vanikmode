import { Rail } from "@/components/ui/Rail";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

export type ProductPageRailProps = {
  title: string;
  products: Product[];
};

/**
 * `.section-related-products` / `.section-other-products` on the live
 * product page. Both use the `.latest-products-slider` Swiper (5000ms
 * autoplay, spaceBetween 24, slidesPerView 1.5 / 3.5 / 4.5 at 320 / 576 /
 * 769px) with 10px padding and no visible scrollbar. Slide widths use
 * Swiper's own formula, (track − (n − 1) × gap) / n, so a desktop card
 * lands at the measured 244px. Cards show their category chips here,
 * unlike the homepage rails.
 */
export function ProductPageRail({ title, products }: ProductPageRailProps) {
  return (
    <section>
      <div className="mx-[25px] mb-6 flex justify-between sm:mx-0">
        <SectionTitle className="my-2">{title}</SectionTitle>
      </div>

      <Rail
        count={products.length}
        autoplayDelay={5000}
        hideScrollbar
        className="scroll-px-2.5 gap-6 p-2.5"
      >
        {products.map((product) => (
          <div
            key={product.href}
            className="mb-8 w-[calc((100%-12px)/1.5)] shrink-0 snap-start sm:w-[calc((100%-60px)/3.5)] md:w-[calc((100%-84px)/4.5)]"
          >
            <ProductCard
              product={product}
              showCategories
              sizes="(min-width: 769px) 244px, (min-width: 576px) 28vw, 66vw"
            />
          </div>
        ))}
      </Rail>
    </section>
  );
}
