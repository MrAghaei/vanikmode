import { HeroCarousel } from "@/components/landing/HeroCarousel";
import { CategoryGrid } from "@/components/landing/CategoryGrid";
import { ProductRail } from "@/components/landing/ProductRail";
import { BlogSection } from "@/components/landing/BlogSection";
import { latestProducts, saleProducts, topwearProducts, bottomsProducts } from "@/data/products";
import { externalUrl } from "@/lib/site";

// Real page order (reference/html/landing.html): hero slider, category
// grid, Latest Products, Special Sales, Topwear, Bottoms, Blog.
export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-(--breakpoint-lg) px-4 pt-11 pb-9">
        <HeroCarousel />
      </div>

      <CategoryGrid />

      <ProductRail
        title="آخرین محصولات"
        headingLevel="h2"
        seeMoreHref={externalUrl("/products/")}
        seeMoreLabel="همه محصولات"
        products={latestProducts}
        autoplayDelay={5000}
      />

      <ProductRail
        title="فروش ویژه"
        seeMoreHref={externalUrl("/products/onsale/")}
        seeMoreLabel="همه محصولات"
        seeMoreVariant="danger"
        products={saleProducts}
        autoplayDelay={6000}
        onsale
      />

      <ProductRail
        title="بالاپوش"
        seeMoreHref={externalUrl("/products/category/3/topwear/")}
        seeMoreLabel="همه محصولات"
        products={topwearProducts}
        autoplayDelay={6000}
      />

      <ProductRail
        title="شلوار / دامن"
        seeMoreHref={externalUrl("/products/category/4/women-bottoms/")}
        seeMoreLabel="همه محصولات"
        products={bottomsProducts}
        autoplayDelay={6000}
      />

      <BlogSection />
    </>
  );
}
