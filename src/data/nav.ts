import { externalUrl } from "@/lib/site";
import type { MegaMenuColumn, MobileMenuGroup, NavLink } from "@/types/nav";

// All content below is transcribed verbatim from reference/content.md §2
// (script-parsed from the live site's raw HTML, not paraphrased). Category
// links are real absolute URLs on the live site — this app only rebuilds the
// homepage and one product page, so every other real link points back to
// vanikmode.com rather than 404ing.

export const primaryNav: NavLink[] = [
  { label: "خانه", href: "/" },
  { label: "فروشگاه", href: externalUrl("/products/") },
  { label: "بلاگ", href: externalUrl("/blog/") },
  { label: "درباره ما", href: externalUrl("/درباره-ما/") },
  { label: "تماس با ما", href: externalUrl("/تماس-با-ما/") },
  { label: "راهنمای سایز", href: externalUrl("/راهنمای-انتخاب-سایز/") },
];

export const megaMenu: MegaMenuColumn[] = [
  {
    title: "ست",
    href: "https://vanikmode.com/products/category/2/women-sets/",
    items: [
      { label: "شومیز جلیقه", href: "https://vanikmode.com/products/category/8/shomiz-vest/" },
      { label: "شومیز دامن", href: "https://vanikmode.com/products/category/9/shomiz-skirt-set/" },
      {
        label: "شومیز شلوار",
        href: "https://vanikmode.com/products/category/10/shomiz-pants-set/",
      },
      { label: "بلوز شلوار", href: "https://vanikmode.com/products/category/11/blouse-pants-set/" },
      { label: "کت سارافون", href: "https://vanikmode.com/products/category/12/sarafon-coat-set/" },
      { label: "کت دامن", href: "https://vanikmode.com/products/category/13/coat-skirt-set/" },
      { label: "کت شلوار", href: "https://vanikmode.com/products/category/14/women-suit/" },
      { label: "مانتو شلوار", href: "https://vanikmode.com/products/category/15/manto-pants-set/" },
      {
        label: "نیم‌تنه دامن",
        href: "https://vanikmode.com/products/category/16/crop-top-and-skirt/",
      },
      {
        label: "نیم‌تنه شلوار",
        href: "https://vanikmode.com/products/category/17/crop-top-and-pants/",
      },
      { label: "جلیقه دامن", href: "https://vanikmode.com/products/category/18/vest-skirt-set/" },
      { label: "بلوز دامن", href: "https://vanikmode.com/products/category/19/blouse-skirt-set/" },
      { label: "شومیز کراپ", href: "https://vanikmode.com/products/category/21/shomiz-crop/" },
      { label: "کراپ دامن", href: "https://vanikmode.com/products/category/20/crop-skirt/" },
    ],
  },
  {
    title: "بالاپوش",
    href: "https://vanikmode.com/products/category/3/topwear/",
    items: [
      { label: "پیراهن زنانه", href: "https://vanikmode.com/products/category/22/women-shirt/" },
      { label: "سارافون", href: "https://vanikmode.com/products/category/23/sarafon/" },
      { label: "اورآل / سرهمی", href: "https://vanikmode.com/products/category/24/overall-dress/" },
      {
        label: "وست / ژیله / جلیقه",
        href: "https://vanikmode.com/products/category/25/women-vests/",
      },
      { label: "کراپ / نیم‌تنه", href: "https://vanikmode.com/products/category/26/crop-tops/" },
      { label: "بادی", href: "https://vanikmode.com/products/category/27/women-bodysuit/" },
      { label: "شومیز / بلوز", href: "https://vanikmode.com/products/category/28/blouses/" },
      {
        label: "مانتو / تونیک / کت",
        href: "https://vanikmode.com/products/category/29/women-manto/",
      },
      { label: "راحتی / تاپ", href: "https://vanikmode.com/products/category/30/casual-wear/" },
      { label: "تیشرت", href: "https://vanikmode.com/products/category/31/tshirts/" },
      { label: "پولوشرت", href: "https://vanikmode.com/products/category/60/polo-shirt/" },
    ],
  },
  {
    title: "شلوار / دامن",
    href: "https://vanikmode.com/products/category/4/women-bottoms/",
    items: [
      {
        label: "لگ / جوراب‌شلواری",
        href: "https://vanikmode.com/products/category/32/women-leggings/",
      },
      { label: "دامن", href: "https://vanikmode.com/products/category/33/skirts/" },
      {
        label: "شلوار راسته / فلر",
        href: "https://vanikmode.com/products/category/34/straight-flare-pants/",
      },
      {
        label: "شلوار بگ / وایدلگ",
        href: "https://vanikmode.com/products/category/35/baggy-pants/",
      },
      { label: "شلوار مام", href: "https://vanikmode.com/products/category/36/mom-pants/" },
      {
        label: "شلوار دمپا / بوت‌کات",
        href: "https://vanikmode.com/products/category/37/bootcut-pants/",
      },
      { label: "شلوار جین", href: "https://vanikmode.com/products/category/38/jeans/" },
      { label: "شلوار کتان", href: "https://vanikmode.com/products/category/39/cotton-pants/" },
      { label: "شلوار پارچه‌ای", href: "https://vanikmode.com/products/category/40/fabric-pants/" },
      {
        label: "شلوار اسلش / جاگر",
        href: "https://vanikmode.com/products/category/41/jogger-pants/",
      },
      { label: "شلوارک", href: "https://vanikmode.com/products/category/46/women-shorts/" },
      { label: "شلوار راحتی", href: "https://vanikmode.com/products/category/45/lounge-pants/" },
      {
        label: "شلوار جذب / اسکینی",
        href: "https://vanikmode.com/products/category/43/skinny-pants/",
      },
      { label: "شلوار کارگو", href: "https://vanikmode.com/products/category/42/cargo-pants/" },
      { label: "شلوار پاکتی", href: "https://vanikmode.com/products/category/44/pocket-pants/" },
      { label: "شلوار ورزشی", href: "https://vanikmode.com/products/category/59/sports-pants/" },
    ],
  },
  {
    title: "لباس گرم",
    href: "https://vanikmode.com/products/category/6/cold-season-clothing/",
    items: [
      {
        label: "پالتو / بارانی",
        href: "https://vanikmode.com/products/category/47/coat-raincoat/",
      },
      { label: "کاپشن / پافر", href: "https://vanikmode.com/products/category/48/jacket-puffer/" },
      {
        label: "ژاکت / بافت / پلیور",
        href: "https://vanikmode.com/products/category/49/knitwear/",
      },
      {
        label: "هودی / سویشرت",
        href: "https://vanikmode.com/products/category/51/hoodies-sweatshirts/",
      },
      { label: "دورس", href: "https://vanikmode.com/products/category/51/hoodies-sweatshirts/" },
      { label: "کلاه / دستکش", href: "https://vanikmode.com/products/category/52/hats-gloves/" },
      { label: "شکت", href: "https://vanikmode.com/products/category/50/shacket/" },
    ],
  },
  {
    title: "اکسسوری و متفرقه",
    href: "https://vanikmode.com/products/category/7/women-accessories/",
    items: [
      { label: "کمربند", href: "https://vanikmode.com/products/category/55/belt/" },
      { label: "گردنبند", href: "https://vanikmode.com/products/category/56/necklace/" },
      { label: "شال / روسری", href: "https://vanikmode.com/products/category/57/head-scarves/" },
      { label: "جوراب", href: "https://vanikmode.com/products/category/58/socks/" },
      { label: "لباس زیر", href: "https://vanikmode.com/products/category/53/women-underwear/" },
      { label: "کیف و کفش", href: "https://vanikmode.com/products/category/54/bags-shoes/" },
      { label: "% فروش ویژه", href: externalUrl("/products/?onsale=true"), highlight: true },
    ],
  },
];

// Mobile accordion uses shorter labels for a few items and merges the two
// "hoodies/دورس" desktop rows (same href) into one — both real, on-site
// discrepancies, replicated rather than reconciled (see content.md §2).
export const mobileMenu: MobileMenuGroup[] = [
  {
    title: "ست",
    items: megaMenu[0].items,
  },
  {
    title: "بالاپوش",
    items: megaMenu[1].items,
  },
  {
    title: "شلوار / دامن",
    items: [
      { label: "لگ / ساپورت", href: "https://vanikmode.com/products/category/32/women-leggings/" },
      { label: "دامن", href: "https://vanikmode.com/products/category/33/skirts/" },
      {
        label: "راسته / فلر",
        href: "https://vanikmode.com/products/category/34/straight-flare-pants/",
      },
      { label: "بگ / واید لگ", href: "https://vanikmode.com/products/category/35/baggy-pants/" },
      { label: "مام‌استایل", href: "https://vanikmode.com/products/category/36/mom-pants/" },
      { label: "بوت‌کات", href: "https://vanikmode.com/products/category/37/bootcut-pants/" },
      { label: "جین", href: "https://vanikmode.com/products/category/38/jeans/" },
      { label: "کتان", href: "https://vanikmode.com/products/category/39/cotton-pants/" },
      { label: "پارچه‌ای", href: "https://vanikmode.com/products/category/40/fabric-pants/" },
      { label: "اسلش", href: "https://vanikmode.com/products/category/41/jogger-pants/" },
      { label: "کارگو", href: "https://vanikmode.com/products/category/42/cargo-pants/" },
      { label: "اسکینی", href: "https://vanikmode.com/products/category/43/skinny-pants/" },
      { label: "پاکتی", href: "https://vanikmode.com/products/category/44/pocket-pants/" },
      { label: "راحتی", href: "https://vanikmode.com/products/category/45/lounge-pants/" },
      { label: "شلوارک", href: "https://vanikmode.com/products/category/46/women-shorts/" },
      { label: "ورزشی", href: "https://vanikmode.com/products/category/59/sports-pants/" },
    ],
  },
  {
    title: "پاییزه و زمستانی",
    items: [
      {
        label: "پالتو / بارانی",
        href: "https://vanikmode.com/products/category/47/coat-raincoat/",
      },
      { label: "کاپشن / پافر", href: "https://vanikmode.com/products/category/48/jacket-puffer/" },
      { label: "بافت / پلیور", href: "https://vanikmode.com/products/category/49/knitwear/" },
      { label: "شکت", href: "https://vanikmode.com/products/category/50/shacket/" },
      {
        label: "هودی / دورس",
        href: "https://vanikmode.com/products/category/51/hoodies-sweatshirts/",
      },
      { label: "کلاه / دستکش", href: "https://vanikmode.com/products/category/52/hats-gloves/" },
    ],
  },
  {
    title: "اکسسوری و متفرقه",
    items: [
      { label: "کمربند", href: "https://vanikmode.com/products/category/55/belt/" },
      { label: "گردنبند", href: "https://vanikmode.com/products/category/56/necklace/" },
      { label: "شال و روسری", href: "https://vanikmode.com/products/category/57/head-scarves/" },
      { label: "جوراب", href: "https://vanikmode.com/products/category/58/socks/" },
      { label: "لباس زیر", href: "https://vanikmode.com/products/category/53/women-underwear/" },
      { label: "کیف و کفش", href: "https://vanikmode.com/products/category/54/bags-shoes/" },
    ],
  },
];

// Sits as its own top-level entry after the accordion groups on mobile,
// rather than nested inside a column like the desktop version.
export const mobileOnSaleLink: NavLink = {
  label: "فروش ویژه",
  href: externalUrl("/products/?onsale=true"),
};
