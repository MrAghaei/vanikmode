import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductPageRail } from "@/components/product/ProductPageRail";
import type { ProductDetailData } from "@/types/product";

/**
 * `main.page-main.container` of the live product page: 1200px container,
 * 46px vertical padding, then header (gallery + action card), description,
 * "محصولات مرتبط" and "آخرین محصولات" rails. Measured with getComputedStyle
 * on the live j322 page at a 1690px viewport.
 */
export function ProductDetail({ product }: { product: ProductDetailData }) {
  return (
    <div className="mx-2.5 py-[46px] sm:mx-auto sm:w-full sm:max-w-[1200px]">
      {/* `.mobile-page-title-row` — the live page shows this h1 only below 576px. */}
      <div className="mb-3 sm:hidden">
        <h1 className="my-[0.5em] text-xl font-black">{product.title}</h1>
      </div>

      <ProductHeader product={product} />

      {product.descriptionHtml && (
        <section className="mt-11">
          <SectionTitle className="mt-2 mb-4">توضیحات</SectionTitle>
          <div
            className="rich-text rich-text-description mb-[46px] rounded-card bg-white px-9 py-7 shadow-card"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </section>
      )}

      {product.relatedProducts.length > 0 && (
        <ProductPageRail title="محصولات مرتبط" products={product.relatedProducts} />
      )}
      {product.latestProducts.length > 0 && (
        <ProductPageRail title="آخرین محصولات" products={product.latestProducts} />
      )}
    </div>
  );
}
