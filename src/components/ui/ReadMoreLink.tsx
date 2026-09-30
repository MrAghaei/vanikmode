import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";

export type ReadMoreLinkProps = {
  href: string;
  label: string;
  /**
   * Real site: `.read-more` is bg-primary everywhere except the Special
   * Sales rail, which overrides it to red via a scoped
   * `.section-onsale-products .read-more` rule (source CSS, `<style>` block
   * in reference/html/landing.html).
   */
  variant?: "primary" | "danger";
  className?: string;
};

// Matches `.read-more` (reference/css/style.css): bg + rounded-lg pill,
// transitions to a transparent/outlined primary-color pill on hover.
export function ReadMoreLink({ href, label, variant = "primary", className }: ReadMoreLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm text-card-tint transition-colors hover:border-primary hover:bg-transparent hover:text-primary",
        variant === "danger" ? "bg-ribbon" : "bg-primary",
        className,
      )}
    >
      {label}
      <ChevronLeft className="size-3" />
    </Link>
  );
}
