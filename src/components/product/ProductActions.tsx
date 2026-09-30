"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Info, Minus, Plus, TableProperties } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/cn";
import type { BreadcrumbLink, ProductDetailData, ProductVariant } from "@/types/product";

export type VariantSelection = { color: string; pattern: string; size: string };

// ---------------------------------------------------------------------------
// Variant logic — a port of the live page's inline script: an option is
// disabled unless some in-stock variant matches it (color → pattern → size),
// and an invalid selection falls back to the first valid option.
// ---------------------------------------------------------------------------

function inStockWhere(variants: ProductVariant[], match: Partial<VariantSelection>) {
  return variants.some(
    (v) =>
      v.stock > 0 &&
      (match.color === undefined || v.color === match.color) &&
      (match.pattern === undefined || v.pattern === match.pattern) &&
      (match.size === undefined || v.size === match.size),
  );
}

function firstValid(options: string[], current: string, isValid: (value: string) => boolean) {
  return isValid(current) ? current : (options.find(isValid) ?? current);
}

export function normalizeSelection(
  product: ProductDetailData,
  selection: VariantSelection,
): VariantSelection {
  const { options, variants } = product;
  const color = firstValid(options.color, selection.color, (c) => inStockWhere(variants, { color: c }));
  const pattern = firstValid(options.pattern, selection.pattern, (p) =>
    inStockWhere(variants, { color, pattern: p }),
  );
  const size = firstValid(options.size, selection.size, (s) =>
    inStockWhere(variants, { color, pattern, size: s }),
  );
  return { color, pattern, size };
}

export function initialSelection(product: ProductDetailData): VariantSelection {
  const { options } = product;
  return normalizeSelection(product, {
    color: options.color[0] ?? "",
    pattern: options.pattern[0] ?? "",
    size: options.size[0] ?? "",
  });
}

export function findVariant(product: ProductDetailData, selection: VariantSelection) {
  return product.variants.find(
    (v) =>
      v.color === selection.color && v.pattern === selection.pattern && v.size === selection.size,
  );
}

// ---------------------------------------------------------------------------

export type ProductActionsProps = {
  product: ProductDetailData;
  selection: VariantSelection;
  onSelectionChange: (selection: VariantSelection) => void;
};

/**
 * `.page-product-action-container.card` — measured on the live page: white
 * 12px-radius card, 18px × 20px padding, sticky 10px from the top. Cart and
 * wishlist are demo-only (the live ones are authenticated AJAX calls);
 * "add to cart" opens the header's cart drawer, like the live page does.
 */
export function ProductActions({ product, selection, onSelectionChange }: ProductActionsProps) {
  const variant = findVariant(product, selection);
  const stock = variant?.stock ?? 0;
  const available = stock > 0;
  const price = variant?.price ?? product.price;

  const [qty, setQty] = useState(available ? 1 : 0);
  const [favorited, setFavorited] = useState(false);
  const [popup, setPopup] = useState<"help" | "size-guide" | "notify" | null>(null);

  function select(field: keyof VariantSelection, value: string) {
    const next = normalizeSelection(product, { ...selection, [field]: value });
    onSelectionChange(next);
    // Live `checkVariantCount()`: clamp to the new stock, reset 0 → 1 when back in stock.
    const nextStock = findVariant(product, next)?.stock ?? 0;
    setQty((q) => (nextStock < 1 ? 0 : Math.min(Math.max(q, 1), nextStock)));
  }

  const { options, variants } = product;
  const hasVariants = options.color.length > 0;
  const closePopup = () => setPopup(null);

  return (
    <div className="relative mt-7 rounded-card bg-white px-5 py-[18px] shadow-card sm:sticky sm:top-2.5 max-sm:mb-8">
      <button
        type="button"
        onClick={() => setPopup("help")}
        className="absolute top-3 left-3 flex items-center gap-1 px-1.5 py-px text-sm text-accent-rose-dark"
      >
        راهنما
        <Info className="size-5 fill-accent-rose-dark stroke-white" />
      </button>

      <CardTitle>دسته‌بندی:</CardTitle>
      <TagList items={product.categories} />
      <Divider />

      <CardTitle>برچسب‌ها:</CardTitle>
      <TagList items={product.tags} />
      <Divider />

      {hasVariants && (
        <div>
          <VariantSelect
            id="product-variant-color"
            label="رنگ"
            options={options.color}
            value={selection.color}
            isEnabled={(c) => inStockWhere(variants, { color: c })}
            onChange={(value) => select("color", value)}
          />
          <VariantSelect
            id="product-variant-pattern"
            label="طرح"
            options={options.pattern}
            value={selection.pattern}
            isEnabled={(p) => inStockWhere(variants, { color: selection.color, pattern: p })}
            onChange={(value) => select("pattern", value)}
          />
          <VariantSelect
            id="product-variant-size"
            label="سایز"
            options={options.size}
            value={selection.size}
            isEnabled={(s) =>
              inStockWhere(variants, { color: selection.color, pattern: selection.pattern, size: s })
            }
            onChange={(value) => select("size", value)}
          >
            <button
              type="button"
              onClick={() => setPopup("size-guide")}
              className="flex h-[34px] min-w-[190px] items-center justify-center rounded-lg border border-transparent bg-accent-rose px-6 text-lg leading-8 text-primary-darker transition-all duration-300 hover:border-[#4a4a4a] hover:bg-transparent hover:opacity-70 max-sm:mt-3 sm:mr-4"
            >
              <TableProperties className="ml-1 size-3.5" />
              جدول سایزبندی
            </button>
          </VariantSelect>
        </div>
      )}
      <Divider />

      {/* `.page-product-price-container`: the (possibly empty) old price takes margin-right:auto, pushing both prices to the far left. */}
      <div className="flex">
        <CardTitle>قیمت:</CardTitle>
        <div className="mr-auto text-price-old line-through">
          {product.originalPrice !== undefined && <span dir="ltr">{format(product.originalPrice)}</span>}
        </div>
        <div className="mr-4 text-price">
          <span dir="ltr">{format(price)}</span> تومان
        </div>
      </div>

      <div className="flex justify-end max-sm:flex-col">
        <div className="flex items-center max-sm:my-3 max-sm:justify-center sm:ml-6">
          <CounterButton
            label="افزایش تعداد"
            disabled={!available}
            onClick={() => setQty((q) => Math.min(q + 1, stock))}
          >
            <Plus className="size-4 stroke-3" />
          </CounterButton>
          <input
            type="number"
            readOnly
            value={qty}
            aria-label="تعداد"
            className="w-[50px] [appearance:textfield] bg-transparent text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <CounterButton
            label="کاهش تعداد"
            disabled={!available}
            onClick={() => setQty((q) => Math.max(q - 1, 1))}
          >
            <Minus className="size-4 stroke-3" />
          </CounterButton>
        </div>
        <button
          type="button"
          disabled={!available}
          onClick={() => window.dispatchEvent(new Event("vanik:open-cart"))}
          className="h-[42px] min-w-[190px] rounded-lg border border-transparent bg-ribbon px-6 leading-[42px] text-white transition-all duration-300 hover:border-ribbon hover:bg-white hover:text-ribbon disabled:cursor-not-allowed disabled:border-transparent disabled:bg-gray-5 disabled:text-gray-3"
        >
          {available ? "افزودن به سبد خرید" : "اتمام موجودی"}
        </button>
      </div>
      <Divider />

      <div className="flex justify-end max-md:flex-col max-md:gap-4">
        <button
          type="button"
          onClick={() => setFavorited((f) => !f)}
          className={cn(
            "flex h-[42px] min-w-[190px] items-center justify-center rounded-lg border border-primary px-6 transition-all duration-300 max-sm:w-full md:ml-2",
            favorited
              ? "bg-primary text-on-primary hover:bg-transparent hover:text-primary"
              : "bg-transparent text-primary hover:bg-primary hover:text-on-primary",
          )}
        >
          <Heart className="ml-1 size-3.5 fill-current" />
          افزودن به علاقه‌مندی
        </button>
        <button
          type="button"
          onClick={() => setPopup("notify")}
          className="h-[42px] min-w-[190px] rounded-lg border border-transparent bg-gray-5 px-6 text-[#4a4a4a] transition-all duration-300 hover:border-[#4a4a4a] hover:bg-transparent max-sm:w-full"
        >
          موجود شد اطلاع بده
        </button>
      </div>

      <Modal open={popup === "help"} onClose={closePopup} title="راهنما">
        <div className="rich-text" dangerouslySetInnerHTML={{ __html: product.helpHtml }} />
      </Modal>

      <Modal open={popup === "size-guide"} onClose={closePopup} title="جدول سایزبندی">
        <div className="rich-text" dangerouslySetInnerHTML={{ __html: product.sizeGuideHtml }} />
      </Modal>

      <Modal open={popup === "notify"} onClose={closePopup} title="موجود شد به من اطلاع بده">
        <div className="flex flex-col gap-[15px] p-2.5">
          {product.notifyItems.map((item) => (
            <div key={item.id} className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                id={`var_${item.id}`}
                value={item.id}
                className="ml-2.5 size-5 cursor-pointer"
              />
              <label htmlFor={`var_${item.id}`} className="cursor-pointer text-base text-[#333]">
                {item.label}
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={closePopup}
            className="mt-[15px] h-[34px] min-w-[190px] rounded-lg border border-transparent bg-accent-rose px-6 text-lg leading-8 text-primary-darker transition-all duration-300 hover:border-[#4a4a4a] hover:bg-transparent hover:opacity-70"
          >
            به من اطلاع بده
          </button>
        </div>
      </Modal>
    </div>
  );
}

/** `.page-card-title.h3-style`: 1.17em bold with 1em block margins. */
function CardTitle({ children }: { children: React.ReactNode }) {
  return <span className="my-[1em] block text-[1.17em] leading-normal font-bold">{children}</span>;
}

/** Live `hr`: 1px #E9EBF8, 16px vertical margin. */
function Divider() {
  return <hr className="my-4 border-0 border-t border-[#e9ebf8]" />;
}

/** `.tags-list`: 14px wrapping row, items 8px apart, "،" after all but the last. */
function TagList({ items }: { items: BreadcrumbLink[] }) {
  return (
    <ul className="flex flex-wrap text-sm">
      {items.map((item, index) => (
        <li key={item.href} className="ml-2">
          <Link href={item.href} className="hover:underline">
            {item.label}
          </Link>
          {index < items.length - 1 && "،"}
        </li>
      ))}
    </ul>
  );
}

/** `.page-product-variant`: label (10% wide) + `.select-regular`, 22px apart; stacked below 576px. */
function VariantSelect({
  id,
  label,
  options,
  value,
  isEnabled,
  onChange,
  children,
}: {
  id: string;
  label: string;
  options: string[];
  value: string;
  isEnabled: (value: string) => boolean;
  onChange: (value: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-[22px] flex items-center max-sm:flex-col max-sm:items-start">
      <label htmlFor={id} className="sm:w-[10%]">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-[142px] rounded border border-primary-darker bg-white px-2 py-1 text-sm max-sm:w-full"
      >
        {options.map((option) => (
          <option key={option} value={option} disabled={!isEnabled(option)}>
            {option}
          </option>
        ))}
      </select>
      {children}
    </div>
  );
}

/** `.btn-counter`: 32px (48px on mobile) gray rounded square. */
function CounterButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-12 items-center justify-center rounded-lg bg-gray-5 text-[#4a4a4a] disabled:cursor-not-allowed disabled:opacity-50 sm:size-8"
    >
      {children}
    </button>
  );
}

function format(amount: number): string {
  return amount.toLocaleString("en-US");
}
