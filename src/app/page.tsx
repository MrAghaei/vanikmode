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
      {/* pt: the live site's always-empty `.story-bar` (25px) + `.section-slider` (42px). */}
      <div className="page-container pt-[67px] pb-[59px]">
        <HeroCarousel />
      </div>

      <CategoryGrid />

      <ProductRail
        title="آخرین محصولات"
        variant="latest"
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
