import Link from "next/link";
import { megaMenu } from "@/data/nav";
import { cn } from "@/lib/cn";

// Shown on hover over "فروشگاه" via the parent's `group` — see Header.tsx.
// 5 columns, real category tree (reference/content.md §2).
export function MegaMenu() {
  return (
    <div
      className={cn(
        "invisible absolute top-full right-0 z-40 flex w-max gap-8 rounded-b-card border-t border-gray-5 bg-white p-6 opacity-0 shadow-card transition-opacity",
        "group-hover:visible group-hover:opacity-100",
      )}
    >
      {megaMenu.map((column) => (
        <div key={column.href} className="min-w-[160px]">
          <Link href={column.href} className="font-bold text-primary-darker">
            {column.title}
          </Link>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {column.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={item.highlight ? "font-bold text-primary-darker" : "text-gray-2"}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
