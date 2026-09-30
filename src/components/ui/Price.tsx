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

// Mirrors the real markup: .product-price-main is always green, .product-price-old
// is always red + line-through when present — verified via getComputedStyle
// against the live site (reference/content.md §13). Not "green = cheaper", just
// the site's literal color choice.
export function Price({ amount, originalAmount, className }: PriceProps) {
  return (
    <div className={className ? `flex items-baseline gap-2 ${className}` : "flex items-baseline gap-2"}>
      {originalAmount !== undefined && (
        <span className="text-price-old text-base line-through">
          <span dir="ltr">{format(originalAmount)}</span>
        </span>
      )}
      <span className="text-price text-base">
        <span dir="ltr">{format(amount)}</span> تومان
      </span>
    </div>
  );
}
