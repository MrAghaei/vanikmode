import { externalUrl } from "@/lib/site";
import type { NavLink } from "@/types/nav";

// Verbatim from reference/content.md §10.

export const footerAbout =
  "وانیک مد با هدف ارائه پوشاک زنانه باکیفیت و قیمت منصفانه فعالیت خود را آغاز کرده " +
  "و امروز با تکیه بر تیمی متخصص در حوزه تولید محتوا، فناوری، پشتیبانی، فروش و بسته‌بندی، می‌کوشد " +
  "تجربه‌ای سریع، دقیق و مطمئن از خرید آنلاین را برای بانوان خوش‌سلیقه ایرانی فراهم کند. " +
  "حفظ اعتماد مشتریان و پاسخ‌گویی به سلیقه‌های متنوع، مهم‌ترین اولویت این مجموعه است.";

export const footerQuickLinks: NavLink[] = [
  { label: "فروشگاه", href: externalUrl("/products/") },
  { label: "قوانین و مقررات", href: externalUrl("/شرایط-و-قوانین-فروشگاه/") },
  { label: "سوالات متداول", href: externalUrl("/faqs/") },
  { label: "حساب کاربری", href: externalUrl("/dashboard/") },
];

export const footerAddress = {
  lines: ["رشت، دیانتی، میدان کودک"],
  hours: "( همه روزه 10 الی 14 و 17 الی 22 )",
};

export const footerPhones = ["013-32006196", "09016885274", "09053985287"];

export const footerCredit = "طراحی و پشتیبانی توسط احمد محبتی";
export const footerCopyright = "© 1405 وانیک – کلیه حقوق محفوظ است.";

export const footerBadges = {
  enamad: {
    href: "https://trustseal.enamad.ir/?id=641337&Code=kgQkyxEZfKOR2DreV6mW2DswH1IjMKXk",
    imageSrc:
      "https://trustseal.enamad.ir/logo.aspx?id=641337&Code=kgQkyxEZfKOR2DreV6mW2DswH1IjMKXk",
  },
  torob: {
    href: "https://torob.com/shop/180727",
    imageSrc: "https://api.torob.com/third-party/guarantee/v1/hologram/?instance_id=180727",
  },
};
