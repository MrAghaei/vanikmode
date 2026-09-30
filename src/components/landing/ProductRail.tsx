import { Rail } from "@/components/ui/Rail";
import { ReadMoreLink } from "@/components/ui/ReadMoreLink";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";

export type ProductRailProps = {
  title: string;
  /**
   * `latest` is `.section-latest-products` (h2, 10px slider padding);
   * `sample` is `.section-category-sample` (h3, 5px slider padding) — used
   * by Special Sales, Topwear and Bottoms.
   */
  variant?: "latest" | "sample";
  seeMoreHref: string;
  seeMoreLabel: string;
  seeMoreVariant?: "primary" | "danger";
  products: Product[];
  /** Real per-rail Swiper autoplay delay (ms) — reference/js/script.js. */
  autoplayDelay: number;
  onsale?: boolean;
};

// Both real sliders: slidesPerView 1.5 / 3.5 / 4.5 at 320 / 576 / 769px,
// spaceBetween 24, sized with Swiper's (track − (n − 1) × gap) / n. At
// ≤576px the section drops its container margin so the track runs
// edge-to-edge while the header row stays 25px in.
export function ProductRail({
  title,
  variant = "sample",
  seeMoreHref,
  seeMoreLabel,
  seeMoreVariant = "primary",
  products,
  autoplayDelay,
  onsale = false,
}: ProductRailProps) {
  const latest = variant === "latest";

  return (
    <section
      className={cn(
        "page-container py-6 max-sm:px-0",
        latest ? "max-sm:pt-[14px] max-sm:pb-9" : "max-sm:py-8",
      )}
    >
      <div
        className={cn(
          "mb-6 flex items-center justify-between",
          latest ? "max-sm:px-[25px]" : "max-md:mb-4 max-md:px-[25px]",
        )}
      >
        <SectionTitle as={latest ? "h2" : "h3"}>{title}</SectionTitle>
        <ReadMoreLink href={seeMoreHref} label={seeMoreLabel} variant={seeMoreVariant} />
      </div>

      <Rail
        count={products.length}
        autoplayDelay={autoplayDelay}
        className={cn(
          "gap-6",
          latest ? "scroll-px-2.5 px-2.5 pt-2.5" : "scroll-px-[5px] px-[5px] pt-[5px]",
        )}
        scrollbarClassName={latest ? "mt-[26px] mb-1" : "mt-[21px] mb-1"}
      >
        {products.map((product) => (
          <div
            key={product.href}
            className="w-[calc((100%-12px)/1.5)] shrink-0 snap-start sm:w-[calc((100%-60px)/3.5)] md:w-[calc((100%-84px)/4.5)]"
          >
            <ProductCard
              product={product}
              onsale={onsale}
              sizes="(min-width: 1200px) 244px, (min-width: 769px) 20vw, (min-width: 576px) 28vw, 66vw"
            />
          </div>
        ))}
      </Rail>
    </section>
  );
}
