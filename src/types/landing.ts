export type HeroSlide = {
  alt: string;
  /** Real site: the last slide's href is a literal empty string — replicated as-is. */
  href: string;
  /** Filename within public/images/banner/. */
  image: string;
};

export type CategoryCard = {
  label: string;
  href: string;
  /** Filename within public/images/category/. */
  image: string;
};

export type BlogPost = {
  title: string;
  category: string;
  author: string;
  /** Jalali date string, e.g. "1405/06/30" — displayed verbatim, not reformatted. */
  date: string;
  href: string;
  /** Filename within public/images/blog/. */
  image: string;
};
