import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { externalUrl } from "@/lib/site";
import { Rail } from "@/components/ui/Rail";
import { ReadMoreLink } from "@/components/ui/ReadMoreLink";
import { SectionTitle } from "@/components/ui/SectionTitle";

// `.section-latest-news` / `.news-box` — real Swiper: slidesPerView 1.5 /
// 2 (≥768px) / 3 (≥1000px), spaceBetween 24, autoplay 7000ms
// (reference/js/script.js). No excerpt text is captured in
// reference/content.md (the live cards don't render one either — only a
// category-tag label on the image, title, author, date).
export function BlogSection() {
  return (
    <section className="page-container pt-6 pb-24 max-sm:px-0">
      <div className="mb-6 flex items-center justify-between max-sm:px-[25px]">
        <SectionTitle>بلاگ</SectionTitle>
        <ReadMoreLink href={externalUrl("/blog/")} label="مشاهده همه" />
      </div>

      <Rail
        count={blogPosts.length}
        autoplayDelay={7000}
        hideScrollbar
        className="scroll-px-2.5 gap-6 p-2.5"
      >
        {blogPosts.map((post) => (
          <div
            key={post.href}
            className="w-[calc((100%-12px)/1.5)] shrink-0 snap-start md:w-[calc((100%-24px)/2)] min-[1000px]:w-[calc((100%-3rem)/3.2)]"
          >
            <Link
              href={post.href}
              className="flex h-full flex-col overflow-hidden rounded-card border border-primary bg-white p-4 pb-0 shadow-card"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-card">
                <Image
                  src={`/images/blog/${post.image}`}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1000px) 33vw, (min-width: 768px) 50vw, 66vw"
                  className="object-cover"
                />
                <span className="absolute top-0 start-0 rounded-tl-card bg-primary px-2 py-1 text-xs text-card-tint">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col px-2.5 py-3 pb-4">
                <h4 className="mb-1.5 text-sm font-semibold">{post.title}</h4>
                <div className="mt-auto flex items-center justify-between text-sm text-gray-3">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Rail>
    </section>
  );
}
