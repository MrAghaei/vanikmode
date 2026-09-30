import { externalUrl } from "@/lib/site";
import type { HeroSlide } from "@/types/landing";

// Verbatim from reference/content.md §3 / reference/html/landing.html
// (`.section-slider .swiper`) — the real 6-slide header carousel (a
// correction to the initial scan's "3 banners + a shipping strip").
export const heroSlides: HeroSlide[] = [
  {
    alt: "تیم وانیک",
    href: externalUrl("/%D8%AF%D8%B1%D8%A8%D8%A7%D8%B1%D9%87-%D9%85%D8%A7/"),
    image: "587991ee-6890-42ad-907b-662b6f8a674b.jpg",
  },
  {
    alt: "کالکشن پاییزه",
    href: externalUrl("/products/category/68/women-autumn-clothing-collection/"),
    image: "8a8635d0-a312-4335-a35a-ea74c072bab3.jpg",
  },
  {
    alt: "بارانی سانتانا j377",
    href: externalUrl(
      "/products/2423/%D8%A8%D8%A7%D8%B1%D8%A7%D9%86%DB%8C-%D8%B3%D8%A7%D9%86%D8%AA%D8%A7%D9%86%D8%A7-%DB%8C%D9%82%D9%87-%D8%A7%D9%86%DA%AF%D9%84%DB%8C%D8%B3%DB%8C-%DA%A9%D8%AF-j377/",
    ),
    image: "ac92436a-2616-4d0e-bbf2-65046e322da1.jpg",
  },
  {
    alt: "مانتو اداری j375",
    href: externalUrl(
      "/products/2421/%DA%A9%D8%AA-%D9%88-%D8%B4%D9%84%D9%88%D8%A7%D8%B1-%D8%A7%D8%AF%D8%A7%D8%B1%DB%8C-%D8%AF%DB%8C%D9%BE%D9%84%D9%85%D8%A7%D8%AA-%DA%A9%D8%AF-j375/",
    ),
    image: "6cfba361-4317-4b5e-99a7-c73dc1d917c2.jpg",
  },
  {
    alt: "ست j303",
    href: externalUrl(
      "/products/2354/%DA%A9%D8%AA-%D9%88-%D8%B4%D9%84%D9%88%D8%A7%D8%B1-%DA%A9%D8%AC%D8%B1%D8%A7%D9%87-%DA%A9%D8%AF-j303/",
    ),
    image: "f1f2ea9a-ab65-4c27-9c2e-86f17c3414f9.jpg",
  },
  {
    alt: "ارسال رایگان",
    href: "",
    image: "9a6b51a0-e0f0-4a30-a2de-6fa2e7a51264.jpg",
  },
];
