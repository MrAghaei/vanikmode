import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

// Matches the real markup: every crumb is a link, separated by a
// chevron-left icon (reference/content.md §11) — RTL reading order, so the
// chevron points toward the previous (rightward) crumb.
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <ol className={className ? `flex flex-wrap items-center gap-1 ${className}` : "flex flex-wrap items-center gap-1"}>
      {items.map((item, index) => (
        <li key={item.href} className="flex items-center gap-1">
          {index > 0 && <ChevronLeft className="size-4" aria-hidden />}
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ol>
  );
}
