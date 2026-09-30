import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

// Live `ol.breadcrumb`: 15px padding, 14px text, 8px radius, lavender
// `--Foundation-Secondary-Light` background. Every crumb after the first
// starts with an 8px chevron-left (8px margin each side) inside its link.
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <ol className={cn("flex flex-wrap rounded-lg bg-[#fcf7ff] p-[15px] text-sm", className)}>
      {items.map((item, index) => (
        <li key={item.href}>
          <Link href={item.href} className="inline-flex items-center hover:underline">
            {index > 0 && <ChevronLeft className="mx-2 size-2 stroke-4" aria-hidden />}
            {item.label}
          </Link>
        </li>
      ))}
    </ol>
  );
}
