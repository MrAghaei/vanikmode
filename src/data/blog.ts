import { externalUrl } from "@/lib/site";
import type { BlogPost } from "@/types/landing";

// Verbatim from reference/content.md §9 (`.section-latest-news`, 3 posts).
export const blogPosts: BlogPost[] = [
  {
    title: "راز پنهان کش مو روی مچ دست دخترها | چرا همیشه همراهشونه؟",
    category: "مد و استایل",
    author: "احمد محبتی",
    date: "1405/06/30",
    href: externalUrl(
      "/blog/604/%DA%86%D8%B1%D8%A7-%D8%AF%D8%AE%D8%AA%D8%B1%D8%A7-%DA%A9%D8%B4-%D9%85%D9%88-%D9%85%DB%8C%D9%86%D8%AF%D8%A7%D8%B2%D9%86-%D8%AF%D8%B3%D8%AA%D8%B4%D9%88%D9%86/",
    ),
    image: "e3867fab-ba65-4870-9ac9-af87d73c5d1b.jpg",
  },
  {
    title: "پاک کردن لاک از روی لباس؛ راهنمای نجات لباس‌های سفید، رنگی و مشکی",
    category: "ترفندهای خانه داری",
    author: "احمد محبتی",
    date: "1405/06/29",
    href: externalUrl(
      "/blog/200/%D9%BE%D8%A7%D9%83-%D9%83%D8%B1%D8%AF%D9%86-%D9%84%D8%A7%D9%83-%D8%A7%D8%B2-%D8%B1%D9%88%D9%8A-%D9%84%D8%A8%D8%A7%D8%B3-%D8%A8%D8%A7-%D8%AE%D9%85%DB%8C%D8%B1-%D8%AF%D9%86%D8%AF%D8%A7%D9%86/",
    ),
    image: "108dcac3-89fb-42a5-a05a-e0257ac7f947.jpg",
  },
  {
    title: "کیمونو چیست؟ آستین کیمونو و مانتو کیمونو برای چه اندامی مناسب است؟",
    category: "مد و استایل",
    author: "احمد محبتی",
    date: "1405/06/24",
    href: externalUrl(
      "/blog/616/%DA%A9%DB%8C%D9%85%D9%88%D9%86%D9%88-%D8%A8%D9%87-%DA%86%D9%87-%D9%85%D8%B9%D9%86%D8%A7%D8%B3%D8%AA/",
    ),
    image: "088acbd9-a241-4deb-80ad-cd7ee098b690.jpg",
  },
];
