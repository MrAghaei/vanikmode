import { cn } from "@/lib/cn";

function format(amount: number): string {
  return amount.toLocaleString("en-US");
}

export type PriceProps = {
  /** Current price in تومان. */
  amount: number;
  /** Original price, shown struck through, when the product is on sale. */
  originalAmount?: number;
  className?: string;
};

// Mirrors the real `.product-box-price` markup: an (empty when not on sale)
// .product-price-old, then .product-price-main pushed to the far end —
// stacked and end-aligned below 768px (10px text), 14px text below 576px.
// Main price is always green and the old price always red + line-through,
// verified via getComputedStyle against the live site (reference/content.md
// §13) — not "green = cheaper", just the site's literal color choice.
export function Price({ amount, originalAmount, className }: PriceProps) {
  return (
    <div
      className={cn(
        "flex justify-between text-base max-md:flex-col max-md:items-end max-md:text-[10px] max-sm:text-sm",
        className,
      )}
    >
      <div className="text-price-old line-through">
        {originalAmount !== undefined && <span dir="ltr">{format(originalAmount)}</span>}
      </div>
      <div className="ms-auto text-price">
        <span dir="ltr">{format(amount)}</span> تومان
      </div>
    </div>
  );
}
