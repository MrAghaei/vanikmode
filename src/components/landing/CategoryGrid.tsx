import Image from "next/image";
import Link from "next/link";
import { categoryCards } from "@/data/categories";
import { Rail } from "@/components/ui/Rail";
import { SectionTitle } from "@/components/ui/SectionTitle";

// `.section-homepage-categories` — no see-more link, no autoplay on the
// real Swiper config (reference/js/script.js: homepageCategoriesSlider has
// no `autoplay` key), slidesPerView 2.5 (mobile) / 5 (≥769px), gap 16px,
// slider padding 4px 2px 20px.
export function CategoryGrid() {
  return (
    <section className="page-container pb-[35px]">
      {/* `.section-header-row` margin-bottom 24px + the h2's own 0.5em margin. */}
      <SectionTitle className="mb-8">دسته‌بندی‌ها</SectionTitle>

      <Rail
        count={categoryCards.length}
        className="scroll-px-0.5 gap-4 px-0.5 pt-1"
        scrollbarClassName="mt-9 mb-1"
      >
        {categoryCards.map((category) => (
          <div
            key={category.href}
            className="w-[calc((100%-24px)/2.5)] shrink-0 snap-start md:w-[calc((100%-64px)/5)]"
          >
            <Link
              href={category.href}
              className="block overflow-hidden rounded-card bg-card-bg text-center shadow-card"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={`/images/category/${category.image}`}
                  alt={category.label}
                  fill
                  sizes="(min-width: 769px) 20vw, 40vw"
                  className="object-cover"
                />
              </div>
              <h3 className="px-2 py-3 text-sm/normal font-bold">{category.label}</h3>
            </Link>
          </div>
        ))}
      </Rail>
    </section>
  );
}
