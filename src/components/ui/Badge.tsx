import { cn } from "@/lib/cn";

export type BadgeProps = {
  label?: string;
  className?: string;
};

/**
 * The real site's sale-ribbon: a diagonal banner pinned to the top-left corner
 * of a product card. Exact geometry from source CSS (.product-box-out-of-stock
 * + .off-ribbon in reference/css/style.css + added.css) — width 200px, rotated
 * -45deg, offset top:24px/left:-64px, red background. Parent must be
 * `relative overflow-hidden`.
 */
export function Badge({ label = "OFF", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "absolute top-6 left-[-64px] w-[200px] -rotate-45 bg-ribbon text-center text-sm text-white",
        className,
      )}
    >
      {label}
    </span>
  );
}
