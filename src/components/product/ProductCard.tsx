import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { cn } from "@/lib/cn";
import { productImageSrc } from "@/lib/site";
import type { Product } from "@/types/product";

export type ProductCardProps = {
  product: Product;
  /** Related-products rail on the product page shows tag chips; homepage rails don't. */
  showCategories?: boolean;
  /** Special Sales rail: real site gives every card a 3px red border (source CSS, scoped `.section-onsale-products .product-box`). */
  onsale?: boolean;
  className?: string;
  sizes?: string;
};

// Mirrors `.product-box` (reference/css/style.css + reference/content.md
// §12–13): 12px-radius card, verified shadow/background, flex column so
// unequal-height siblings still align.
export function ProductCard({
  product,
  showCategories = false,
  onsale = false,
  className,
  sizes = "(min-width: 1200px) 220px, (min-width: 768px) 25vw, 45vw",
}: ProductCardProps) {
  return (
    <Link
      href={product.href}
      draggable={false}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-card bg-card-bg shadow-card",
        onsale && "border-[3px] border-ribbon",
        className,
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {(onsale || product.originalPrice !== undefined) && <Badge className="z-10" />}
        <Image
          src={productImageSrc(product.image)}
          alt={product.title}
          fill
          sizes={sizes}
          className="object-cover"
          draggable={false}
        />
      </div>
      <div className="flex flex-1 flex-col px-[13px] py-[9px]">
        {/* Live `h1–h6 { margin: 0.5em 0 }` + `.product-box-title { margin-bottom: 4px }`. */}
        <h6 className="mt-[7px] mb-1 text-sm font-semibold">{product.title}</h6>
        {showCategories && product.cats && product.cats.length > 0 && (
          // `.product-box-cats`: a non-wrapping flex row, so long labels wrap
          // inside their own column, "/"-separated like the live cards.
          <ul className="flex text-xs text-gray-3 max-md:text-[10px]">
            {product.cats.map((cat, index) => (
              <li key={cat}>
                {cat}
                {index < product.cats!.length - 1 && <span className="mx-1">/</span>}
              </li>
            ))}
          </ul>
        )}
        <Price
          className="mt-[18px]"
          amount={product.price}
          originalAmount={product.originalPrice}
        />
      </div>
    </Link>
  );
}
