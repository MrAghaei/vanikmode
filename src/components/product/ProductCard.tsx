import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { cn } from "@/lib/cn";
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
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-card bg-card-bg shadow-card",
        onsale && "border-[3px] border-ribbon",
        className,
      )}
    >
      {product.originalPrice !== undefined && <Badge />}
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={`/images/product/${product.image}`}
          alt={product.title}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col px-[13px] py-[9px]">
        <h6 className="mb-1 text-sm font-semibold">{product.title}</h6>
        {showCategories && product.cats && product.cats.length > 0 && (
          <p className="text-xs text-gray-3">{product.cats.join(" / ")}</p>
        )}
        <div className="mt-[18px]">
          <Price amount={product.price} originalAmount={product.originalPrice} />
        </div>
      </div>
    </Link>
  );
}
