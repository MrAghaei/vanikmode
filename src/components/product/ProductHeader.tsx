"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGallery } from "@/components/product/ProductGallery";
import {
  ProductActions,
  findVariant,
  initialSelection,
  type VariantSelection,
} from "@/components/product/ProductActions";
import type { ProductDetailData } from "@/types/product";

/**
 * `.page-product-header`: gallery column (25%) on the right, content column
 * (75%, 22px gap) with the desktop title, breadcrumb and action card.
 * Stacks below 576px, where the title/breadcrumb are hidden in favour of the
 * mobile title row above.
 *
 * Selection state lives here because picking a variant also swaps the
 * featured gallery image — the live page does this on load too (its script
 * fires a change event on DOMContentLoaded), so the initial featured image
 * is the default variant's photo, computed up front to avoid a flash.
 */
export function ProductHeader({ product }: { product: ProductDetailData }) {
  const [selection, setSelection] = useState(() => initialSelection(product));
  const [featured, setFeatured] = useState(
    () => findVariant(product, selection)?.image ?? product.featuredImage,
  );

  function handleSelectionChange(next: VariantSelection) {
    setSelection(next);
    const image = findVariant(product, next)?.image;
    if (image) setFeatured(image);
  }

  return (
    <div className="flex max-sm:flex-col">
      <div className="w-full sm:w-1/4">
        <ProductGallery
          images={product.gallery}
          featured={featured}
          onSelect={setFeatured}
          title={product.title}
        />
      </div>

      <div className="w-full sm:mr-[22px] sm:w-3/4">
        <div className="flex w-full items-center justify-between gap-[15px] max-sm:hidden">
          <h1 className="text-xl font-black">{product.title}</h1>
        </div>
        <Breadcrumb items={product.breadcrumb} className="max-sm:hidden" />
        <ProductActions
          product={product}
          selection={selection}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  );
}
