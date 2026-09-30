import { Rail } from "@/components/ui/Rail";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

// Real "محصولات مرتبط" rail — unlike homepage rails, these cards show
// category-tag chips (`showCategories`), reference/html/product-i414.html.
export function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section className="mx-auto max-w-(--breakpoint-lg) px-4 py-6">
      <h2 className="mb-6 text-base font-black">محصولات مرتبط</h2>

      <Rail count={products.length} className="gap-6 pb-4">
        {products.map((product) => (
          <div
            key={product.href}
            className="w-[66.6667%] shrink-0 snap-start sm:w-[28.5714%] md:w-[22.2222%]"
          >
            <ProductCard product={product} showCategories />
          </div>
        ))}
      </Rail>
    </section>
  );
}
