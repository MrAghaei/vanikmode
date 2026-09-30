import { productHref } from "@/lib/site";
import type { Product } from "@/types/product";

// Verbatim from reference/content.md §5–8, cross-checked directly against
// reference/html/landing.html's product-box markup (title/price/href/image
// extracted by script, not retyped by hand, to avoid transcription drift).
//
// Item 20 of the Special Sales rail is the one product this app actually
// builds a full detail page for (code i414) — same `/products/{id}/{slug}/`
// path shape as the live site.

export const latestProducts: Product[] = [
  {
    title: "شال موهر ساده کد j417",
    price: 448000,
    href: productHref(
      "/products/2463/%D8%B4%D8%A7%D9%84-%D8%B3%D8%A7%D8%AF%D9%87-%D9%85%D9%88%D9%87%D8%B1-%DA%A9%D8%AF-j417/",
    ),
    image: "ba4dddba-a396-4e63-816b-b2dc92ae5738.jpg",
  },
  {
    title: "بامبر جین جیب نما کد j392",
    price: 1398000,
    href: productHref(
      "/products/2433/%D8%A8%D8%A7%D9%85%D8%A8%D8%B1-%D8%AC%DB%8C%D9%86-%D8%AC%DB%8C%D8%A8-%D9%86%D9%85%D8%A7-%DA%A9%D8%AF-j392/",
    ),
    image: "43229148-e553-4c4c-9bad-bb760b275e4a.jpg",
  },
  {
    title: "شلوار بگ سنگشور کد j354",
    price: 2558000,
    href: productHref(
      "/products/2399/%D8%B4%D9%84%D9%88%D8%A7%D8%B1-%D8%A8%DA%AF-%D8%B3%D9%86%DA%AF%D8%B4%D9%88%D8%B1-%DA%A9%D8%AF-j354/",
    ),
    image: "d4290923-be50-4a67-9cdc-034eb7e1efd9.jpg",
  },
  {
    title: "بافت یقه گرد قلبی کد j323",
    price: 1118000,
    href: productHref(
      "/products/2374/%D8%A8%D8%A7%D9%81%D8%AA-%D9%82%D9%84%D8%A8%DB%8C-%DA%A9%D8%AF-j323/",
    ),
    image: "e962078c-adb0-455a-a0ac-57c73c15ae55.jpg",
  },
  {
    title: "بلوز فانریپ نواردوزی کد j406",
    price: 828000,
    href: productHref(
      "/products/2450/%D8%A8%D9%84%D9%88%D8%B2-%D9%81%D8%A7%D9%86%D8%B1%DB%8C%D9%BE-%D9%86%D9%88%D8%A7%D8%B1-%D8%AF%D9%88%D8%B2%DB%8C-%DA%A9%D8%AF-j406/",
    ),
    image: "ea4eb563-6011-4939-9916-0baa997e13f5.jpg",
  },
  {
    title: "شومیز کتان پایین هلال کد j397",
    price: 1498000,
    href: productHref(
      "/products/2436/%D8%B4%D9%88%D9%85%DB%8C%D8%B2-%DA%A9%D8%AA%D8%A7%D9%86-%D9%BE%D8%A7%DB%8C%DB%8C%D9%86-%D9%87%D9%84%D8%A7%D9%84-%DA%A9%D8%AF-j397/",
    ),
    image: "d020673f-1105-41f4-8dbf-fb13f63836af.jpg",
  },
  {
    title: "کت مازراتی کجراه گیپور کد j334",
    price: 2668000,
    href: productHref(
      "/products/2390/%DA%A9%D8%AA-%D9%85%D8%A7%D8%B2%D8%B1%D8%A7%D8%AA%DB%8C-%DA%A9%D8%AC%D8%B1%D8%A7%D9%87-%DA%AF%DB%8C%D9%BE%D9%88%D8%B1-%DA%A9%D8%AF-j334/",
    ),
    image: "eb8d69dc-fc90-4a02-96fd-3b3f08bd424c.jpg",
  },
  {
    title: "بافت یقه گرد مدل بابونه کد j322",
    price: 1118000,
    href: productHref(
      "/products/2369/%D8%A8%D8%A7%D9%81%D8%AA-%DA%AF%D9%84-%D8%A8%D8%A7%D8%A8%D9%88%D9%86%D9%87-%DA%A9%D8%AF-j322/",
    ),
    image: "8321d0c7-71a4-4ba9-89ee-4d6694ed625a.jpg",
  },
];

export const saleProducts: Product[] = [
  {
    title: "شومیز آستین پاکتی طرح قلب کد i762",
    price: 698000,
    originalPrice: 948000,
    href: productHref(
      "/products/1803/%D8%B4%D9%88%D9%85%DB%8C%D8%B2-%D8%B7%D8%B1%D8%AD-%D9%82%D9%84%D8%A8-%D8%A2%D8%B3%D8%AA%DB%8C%D9%86-%D9%BE%D8%A7%DA%A9%D8%AA%DB%8C-%DA%A9%D8%AF-i762/",
    ),
    image: "0b681c3e-9a10-4164-9675-e91806961133.jpeg",
  },
  {
    title: "شال آبرنگی دور ریش کد i533",
    price: 298000,
    originalPrice: 428000,
    href: productHref(
      "/products/1573/%D8%B4%D8%A7%D9%84-%D8%A2%D8%A8%D8%B1%D9%86%DA%AF%DB%8C-%D8%B1%DB%8C%D8%B4-%D8%AF%D8%A7%D8%B1-%DA%A9%D8%AF-i533/",
    ),
    image: "89a914dd-9840-49c1-bcb7-55965c890639.jpeg",
  },
  {
    title: "شال نخی طرحدار کد i643",
    price: 258000,
    originalPrice: 348000,
    href: productHref(
      "/products/1690/%D8%B4%D8%A7%D9%84-%D9%86%D8%AE%DB%8C-%D8%B7%D8%B1%D8%AD%D8%AF%D8%A7%D8%B1-%DA%A9%D8%AF-i643/",
    ),
    image: "b45bc25b-fe67-4ad8-a8f7-56e75b30037d.jpg",
  },
  {
    title: "ست پیراهن ساحلی و شومیز گره ای کد i887",
    price: 998000,
    originalPrice: 1568000,
    href: productHref(
      "/products/1940/%D8%B3%D8%AA-%D8%B3%D8%A7%D8%AD%D9%84%DB%8C-%D8%B4%D9%88%D9%85%DB%8C%D8%B2-%DA%AF%D8%B1%D9%87-%D8%A7%DB%8C-%DA%A9%D8%AF-i887/",
    ),
    image: "79f783ff-1301-4c42-948b-187b42c4d28e.png",
  },
  {
    title: "پیراهن کمربنددار نیم زیپ کد i726",
    price: 798000,
    originalPrice: 1148000,
    href: productHref(
      "/products/1771/%D9%BE%DB%8C%D8%B1%D8%A7%D9%87%D9%86-%D8%A8%D9%84%D9%86%D8%AF-%D8%AC%D9%84%D9%88-%D9%86%DB%8C%D9%85-%D8%B2%DB%8C%D9%BE-%DA%A9%D8%AF-i726/",
    ),
    image: "88bc94f2-dc01-4238-820c-f24f9a285437.jpeg",
  },
  {
    title: "ست رویه و دامن گل گچی لینن کد j070",
    price: 998000,
    originalPrice: 1868000,
    href: productHref(
      "/products/2116/%D8%B1%D9%88%DB%8C%D9%87-%D9%88-%D8%AF%D8%A7%D9%85%D9%86-%DA%AF%D9%84-%DA%AF%DA%86%DB%8C-%DA%A9%D8%AF-j070/",
    ),
    image: "0422939c-aef3-46f0-ad66-cad484bd7dd3.jpg",
  },
  {
    title: "شال نخی لمه‌دار آبرنگی کد i642",
    price: 298000,
    originalPrice: 398000,
    href: productHref(
      "/products/1689/%D8%B4%D8%A7%D9%84-%D9%84%D9%85%D9%87-%D8%A2%D8%A8%D8%B1%D9%86%DA%AF%DB%8C-%DA%A9%D8%AF-i642/",
    ),
    image: "87523e91-c6c1-4d0f-b489-60e65ea1ffdf.jpg",
  },
  {
    title: "جلیقه زنانه پری کد i931",
    price: 398000,
    originalPrice: 628000,
    href: productHref(
      "/products/1982/%D8%AC%D9%84%DB%8C%D9%82%D9%87-%D9%BE%D8%B1%DB%8C-%DA%A9%D8%AF-i931/",
    ),
    image: "27a970ed-a910-4aa2-940a-7c1baedf473a.jpg",
  },
  {
    title: "شومیز چاکدار قلبی صوفیا کد i863",
    price: 498000,
    originalPrice: 898000,
    href: productHref(
      "/products/1912/%D8%B4%D9%88%D9%85%DB%8C%D8%B2-%D8%A8%D8%BA%D9%84-%DA%86%D8%A7%DA%A9%D8%AF%D8%A7%D8%B1-%D9%82%D9%84%D8%A8%DB%8C-%DA%A9%D8%AF-i863/",
    ),
    image: "7fe8c866-1a64-4b59-a82f-163d86cb3ac2.jpeg",
  },
  {
    title: "شومیز لینن پاگون طرح لبخند کد i930",
    price: 698000,
    originalPrice: 1068000,
    href: productHref(
      "/products/1980/%D8%B4%D9%88%D9%85%DB%8C%D8%B2-%D9%BE%D8%A7%DA%AF%D9%88%D9%86-%D8%B7%D8%B1%D8%AD-%D9%84%D8%A8%D8%AE%D9%86%D8%AF-%DA%A9%D8%AF-i930/",
    ),
    image: "128ead0e-e167-473d-8fe0-9cc1c9ca1618.jpeg",
  },
  {
    title: "ست شومیز و شلوار کوک دوزی شانتون کد j231",
    price: 998000,
    originalPrice: 1498000,
    href: productHref(
      "/products/2279/%D8%B4%D9%88%D9%85%DB%8C%D8%B2-%D9%88-%D8%B4%D9%84%D9%88%D8%A7%D8%B1-%DA%A9%D9%88%DA%A9-%D8%AF%D9%88%D8%B2%DB%8C-%D8%B4%D8%A7%D9%86%D8%AA%D9%88%D9%86-%DA%A9%D8%AF-j231/",
    ),
    image: "c143464d-2da3-46cb-910e-b59799b0dbc8.jpg",
  },
  {
    title: "صندل چرم مدل خورشیدی کد i981",
    price: 658000,
    originalPrice: 898000,
    href: productHref(
      "/products/2042/%D8%B5%D9%86%D8%AF%D9%84-%D8%AE%D9%88%D8%B1%D8%B4%DB%8C%D8%AF%DB%8C-%DA%A9%D8%AF-i981/",
    ),
    image: "bbd69f4b-909a-4360-85ed-3b715b803839.jpg",
  },
  {
    title: "ست رویه پانچ و دامن گیپور پفکی کد j059",
    price: 1498000,
    originalPrice: 1798000,
    href: productHref(
      "/products/2106/%D8%B3%D8%AA-%D9%BE%D8%A7%D9%86%DA%86-%D9%88-%D8%AF%D8%A7%D9%85%D9%86-%DA%A9%D8%AF-j059/",
    ),
    image: "23c57990-c67b-4ec0-96aa-d0c0ec572e6c.jpg",
  },
  {
    title: "دامن لینن کمر کش بنددار کد j001",
    price: 998000,
    originalPrice: 1178000,
    href: productHref(
      "/products/2023/%D8%AF%D8%A7%D9%85%D9%86-%DA%A9%D9%85%D8%B1-%DA%A9%D8%B4-%D8%A8%D9%86%D8%AF-%D8%AF%D8%A7%D8%B1-%DA%A9%D8%AF-j001/",
    ),
    image: "c8002a0f-5aac-4953-8af2-68b79722c125.jpg",
  },
  {
    title: "صندل نگینی لژدار کد i573",
    price: 958000,
    originalPrice: 1148000,
    href: productHref(
      "/products/1615/%D8%B5%D9%86%D8%AF%D9%84-%D9%86%DA%AF%DB%8C%D9%86-%D8%AF%D8%A7%D8%B1-%D8%B1%D9%86%DA%AF%DB%8C-%DA%A9%D8%AF-i573/",
    ),
    image: "e2038eef-6859-489b-8ec4-6d4bba7ca372.jpg",
  },
  {
    title: "دامن شلواری پلیسه کمرکش کد i490",
    price: 698000,
    originalPrice: 868000,
    href: productHref(
      "/products/1542/%D8%AF%D8%A7%D9%85%D9%86-%D8%B4%D9%84%D9%88%D8%A7%D8%B1%DB%8C-%D9%BE%D9%84%DB%8C%D8%B3%D9%87-%DA%A9%D8%AF-i490/",
    ),
    image: "c67506cd-1c96-4d58-926a-c56425782f12.jpeg",
  },
  {
    title: "شومیز راه راه آستین پاکتی کد i806",
    price: 698000,
    originalPrice: 828000,
    href: productHref(
      "/products/1856/%D8%B4%D9%88%D9%85%DB%8C%D8%B2-%D8%B1%D8%A7%D9%87-%D8%B1%D8%A7%D9%87-%D8%A2%D8%B3%D8%AA%DB%8C%D9%86-%D9%BE%D8%A7%DA%A9%D8%AA%DB%8C-%DA%A9%D8%AF-i806/",
    ),
    image: "02626d7d-4242-4435-85fd-4858b7487012.jpeg",
  },
  {
    title: "شلوار بگ شانتون جودون کد i744",
    price: 498000,
    originalPrice: 598000,
    href: productHref(
      "/products/1782/%D8%B4%D9%84%D9%88%D8%A7%D8%B1-%D9%86%D8%AE%DB%8C-%D8%A8%DA%AF-%DA%A9%D8%AF-i744/",
    ),
    image: "0f49198e-aff0-4b29-9e6f-1456abbd9442.jpg",
  },
  {
    title: "صندل نگین‌دار پلنگی پاشنه بلند کد i576",
    price: 998000,
    originalPrice: 1098000,
    href: productHref(
      "/products/1612/%D8%B5%D9%86%D8%AF%D9%84-%D9%86%DA%AF%DB%8C%D9%86-%D8%AF%D8%A7%D8%B1-%D9%BE%D9%84%D9%86%DA%AF%DB%8C-%DA%A9%D8%AF-i576/",
    ),
    image: "b9ba568e-a293-4c2a-a57e-cdb59abbd17b.jpeg",
  },
  {
    title: "ست شومیز و شلوار پاگون‌دار شانتون کد i414",
    price: 1398000,
    originalPrice: 1698000,
    href: productHref(
      "/products/1450/%D8%B4%D9%88%D9%85%DB%8C%D8%B2-%D8%B4%D9%84%D9%88%D8%A7%D8%B1-%D8%A2%D8%B3%D8%AA%DB%8C%D9%86-%D9%BE%D8%A7%DA%AF%D9%88%D9%86-%DA%A9%D8%AF-i414/",
    ),
    image: "a603efe0-ba81-4e14-b65e-0fc72b1137e7.jpeg",
  },
];

export const topwearProducts: Product[] = [
  {
    title: "کت مازراتی کجراه گیپور کد j334",
    price: 2668000,
    href: productHref(
      "/products/2390/%DA%A9%D8%AA-%D9%85%D8%A7%D8%B2%D8%B1%D8%A7%D8%AA%DB%8C-%DA%A9%D8%AC%D8%B1%D8%A7%D9%87-%DA%AF%DB%8C%D9%BE%D9%88%D8%B1-%DA%A9%D8%AF-j334/",
    ),
    image: "eb8d69dc-fc90-4a02-96fd-3b3f08bd424c.jpg",
  },
  {
    title: "تیشرت باکسی یقه گرد ساده کد j293",
    price: 648000,
    href: productHref(
      "/products/2342/%D8%AA%DB%8C%D8%B4%D8%B1%D8%AA-%D8%A8%D8%A7%DA%A9%D8%B3%DB%8C-%DB%8C%D9%82%D9%87-%DA%AF%D8%B1%D8%AF-%DA%A9%D8%AF-j293/",
    ),
    image: "2db0a084-8153-4af0-8fe5-04db57e34114.jpg",
  },
  {
    title: "بافت یقه گرد آستین دکمه نما کد j371",
    price: 1248000,
    href: productHref(
      "/products/2417/%D8%A8%D8%A7%D9%81%D8%AA-%D8%A2%D8%B3%D8%AA%DB%8C%D9%86-%D8%AF%DA%A9%D9%85%D9%87-%D9%86%D9%85%D8%A7-%DA%A9%D8%AF-j371/",
    ),
    image: "a20329a8-0499-48e1-9d2f-79e7d873fdef.jpg",
  },
  {
    title: "مانتو پانچ کریشه شیشه ای نگینی کد j117",
    price: 1245000,
    href: productHref(
      "/products/2163/%D9%BE%D8%A7%D9%86%DA%86-%D8%B4%DB%8C%D8%B4%D9%87-%D8%A7%DB%8C-%D9%86%DA%AF%DB%8C%D9%86%DB%8C-%DA%A9%D8%AF-j117/",
    ),
    image: "bc48f3eb-fde6-4f85-9437-f06e03b63a70.jpg",
  },
  {
    title: "بارانی کتان تی سی 8 دکمه کد j358",
    price: 2938000,
    href: productHref(
      "/products/2406/%D8%A8%D8%A7%D8%B1%D8%A7%D9%86%DB%8C-%DA%A9%D8%AA%D8%A7%D9%86-%D8%AA%DB%8C%D8%B3%DB%8C-8-%D8%AF%DA%A9%D9%85%D9%87-%DA%A9%D8%AF-j358/",
    ),
    image: "9370fe2b-7c6e-43e6-b377-a53eec7a8410.jpeg",
  },
  {
    title: "بلوز فانریپ جلو زیپ کد j349",
    price: 898000,
    href: productHref(
      "/products/2383/%D8%A8%D9%84%D9%88%D8%B2-%D9%81%D9%86%D8%B1%DB%8C%D9%BE-%D8%AC%D9%84%D9%88-%D8%B2%DB%8C%D9%BE-%DA%A9%D8%AF-j349/",
    ),
    image: "faf2bda6-f526-4886-8a04-a1057847e4ba.jpg",
  },
  {
    title: "ست سه تیکه تور کد g447",
    price: 1298000,
    href: productHref(
      "/products/60/%D8%B3%D8%AA-%D8%B3%D9%87-%D8%AA%DB%8C%DA%A9%D9%87-%D8%AA%D9%88%D8%B1-%DA%A9%D8%AF-g447/",
    ),
    image: "a3c4cf3d-d6cf-462c-ad4a-7577e07ddd6d.jpg",
  },
  {
    title: "کت مازراتی جلوباز دمسه دوزی کد j116",
    price: 1958000,
    href: productHref(
      "/products/2166/%DA%A9%D8%AA-%D8%AF%D9%85%D8%B3%D9%87-%D8%AF%D9%88%D8%B2%DB%8C-%DA%A9%D8%AF-j116/",
    ),
    image: "e4d0d3ff-ce8f-435c-91ba-966c8d225a5c.jpg",
  },
];

export const bottomsProducts: Product[] = [
  {
    title: "شلوار بگ سنگشور کد j354",
    price: 2558000,
    href: productHref(
      "/products/2399/%D8%B4%D9%84%D9%88%D8%A7%D8%B1-%D8%A8%DA%AF-%D8%B3%D9%86%DA%AF%D8%B4%D9%88%D8%B1-%DA%A9%D8%AF-j354/",
    ),
    image: "d4290923-be50-4a67-9cdc-034eb7e1efd9.jpg",
  },
  {
    title: "ست 4 تکه شومیز، جلیقه، دامن و کمربند آستین عروسکی کد i644",
    price: 2068000,
    href: productHref(
      "/products/1688/%D8%B3%D8%AA-4-%D8%AA%DB%8C%DA%A9%D9%87-%D8%A2%D8%B3%D8%AA%DB%8C%D9%86-%D8%B9%D8%B1%D9%88%D8%B3%DA%A9%DB%8C-%DA%A9%D8%AF-i644/",
    ),
    image: "aa5f3565-6ef6-40e5-9111-d4a0d7837c09.jpeg",
  },
  {
    title: "شلوار جین نیم بگ کد j357",
    price: 2558000,
    href: productHref(
      "/products/2402/%D8%B4%D9%84%D9%88%D8%A7%D8%B1-%D8%AC%DB%8C%D9%86-%D9%86%DB%8C%D9%85-%D8%A8%DA%AF-%DA%A9%D8%AF-j357/",
    ),
    image: "1bf97aa0-bfe9-4aa7-9784-caf5bc180ce2.jpg",
  },
  {
    title: "شلوار جین دمپا ساده و زاپدار کد j353",
    price: 2098000,
    href: productHref(
      "/products/2396/%D8%B4%D9%84%D9%88%D8%A7%D8%B1-%D8%AC%DB%8C%D9%86-%D8%AF%D9%85%D9%BE%D8%A7-%D8%B3%D8%A7%D8%AF%D9%87-%DA%A9%D8%AF-j353/",
    ),
    image: "cbf70f51-122e-4edf-905c-0c3ee90dab50.jpg",
  },
  {
    title: "دامن پیله مازراتی کمربنددار کد j386",
    price: 998000,
    href: productHref(
      "/products/2427/%D8%AF%D8%A7%D9%85%D9%86-%D9%85%D8%A7%D8%B2%D8%B1%D8%A7%D8%AA%DB%8C-%DA%A9%D9%85%D8%B1%D8%A8%D9%86%D8%AF%D8%AF%D8%A7%D8%B1-%DA%A9%D8%AF-j386/",
    ),
    image: "7e5ac2de-e7e5-4ec3-8680-4ac551aeaef0.jpg",
  },
  {
    title: "ست سویشرت و شلوار مازراتی کجراه زنانه کد i417",
    price: 1998000,
    href: productHref(
      "/products/1463/%D8%A8%D9%84%D9%88%D8%B2-%D8%B4%D9%84%D9%88%D8%A7%D8%B1-%D9%85%D8%A7%D8%B2%D8%B1%D8%A7%D8%AA%DB%8C-%DA%A9%D8%AC%D8%B1%D8%A7%D9%87-%DA%A9%D8%AF-i417/",
    ),
    image: "e5e223c6-8dc1-4dcb-afe3-70d7d66b1a12.jpeg",
  },
  {
    title: "شلوار نیم بگ کتان سنگشور کد j350",
    price: 2558000,
    href: productHref(
      "/products/2403/%D8%B4%D9%84%D9%88%D8%A7%D8%B1-%D9%86%DB%8C%D9%85-%D8%A8%DA%AF-%D8%B3%D9%86%DA%AF%D8%B4%D9%88%D8%B1-%DA%A9%D8%AF-j350/",
    ),
    image: "06f6c6f0-5545-42a6-973a-1a0db653c14f.jpg",
  },
  {
    title: "شلوار دمپا مازراتی زنانه کد j292",
    price: 1098000,
    href: productHref(
      "/products/2341/%D8%B4%D9%84%D9%88%D8%A7%D8%B1-%D8%AF%D9%85%D9%BE%D8%A7-%D9%85%D8%A7%D8%B2%D8%B1%D8%A7%D8%AA%DB%8C-%DA%A9%D8%AF-j292/",
    ),
    image: "8eb77321-8ee0-498a-b300-2e02574a13a1.jpeg",
  },
];
