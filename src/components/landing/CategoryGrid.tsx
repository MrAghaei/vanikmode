import Image from "next/image";
import Link from "next/link";
import { categoryCards } from "@/data/categories";
import { Rail } from "@/components/ui/Rail";

// `.section-homepage-categories` — no see-more link, no autoplay on the
// real Swiper config (reference/js/script.js: homepageCategoriesSlider has
// no `autoplay` key), slidesPerView 2.5 (mobile) / 5 (≥769px), gap 16px.
export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-(--breakpoint-lg) px-4 py-6">
      <h2 className="mb-6 text-base font-black">دسته‌بندی‌ها</h2>

      <Rail count={categoryCards.length} className="gap-4 pb-3">
        {categoryCards.map((category) => (
          <div key={category.href} className="w-[40%] shrink-0 snap-start md:w-1/5">
            <Link
              href={category.href}
              className="block overflow-hidden rounded-card bg-card-bg text-center shadow-card"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={`/images/category/${category.image}`}
                  alt={category.label}
                  fill
                  sizes="(min-width: 768px) 20vw, 40vw"
                  className="object-cover"
                />
              </div>
              <h3 className="px-2 py-3 text-sm font-bold">{category.label}</h3>
            </Link>
          </div>
        ))}
      </Rail>
    </section>
  );
}
