import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import {
  footerAbout,
  footerAddress,
  footerBadges,
  footerCopyright,
  footerCredit,
  footerPhones,
  footerQuickLinks,
} from "@/data/footer";
import { FloatingButtons } from "./FloatingButtons";

// DOM order matches the real site exactly: About, Quick Links,
// Address+Contact, Certifications (reference/content.md §10).
export function Footer() {
  return (
    <footer className="border-t border-black/20 bg-footer-bg pt-9 pb-8 text-xs md:pb-0">
      <FloatingButtons />
      <div className="page-container flex flex-col md:flex-row">
        <div className="mb-6 md:mb-0 md:me-20 md:basis-[40%]">
          <h5 className="mb-3 text-base font-black">درباره ما</h5>
          <p className="text-justify leading-6">{footerAbout}</p>
        </div>

        <div className="mb-6 md:mb-0 md:me-5 md:basis-[20%]">
          <h5 className="mb-3 text-base font-black">دسترسی سریع</h5>
          <ul className="flex flex-col gap-[18px]">
            {footerQuickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex items-center gap-1 text-sm">
                  <ChevronLeft className="size-2.5" strokeWidth={3} />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6 md:mb-0 md:me-[30px] md:basis-[20%]">
          <h5 className="mb-3 text-base font-black">آدرس</h5>
          {footerAddress.lines.map((line) => (
            <p key={line} className="mb-2">
              {line}
            </p>
          ))}
          <p>{footerAddress.hours}</p>

          <h5 className="mt-6 mb-3 text-base font-black">تماس با ما</h5>
          <ul className="flex flex-col gap-2">
            {footerPhones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/-/g, "")}`} className="text-sm">
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-2 md:basis-[20%]">
          <a href={footerBadges.enamad.href} target="_blank" rel="noreferrer">
            <Image
              src={footerBadges.enamad.imageSrc}
              alt="نماد اعتماد الکترونیکی"
              width={100}
              height={109}
              unoptimized
            />
          </a>
          <a href={footerBadges.torob.href} target="_blank" rel="noreferrer">
            <Image
              src={footerBadges.torob.imageSrc}
              alt="ضمانت ترب"
              width={100}
              height={109}
              unoptimized
            />
          </a>
        </div>
      </div>

      <div className="mt-6 border-t border-black/20 py-3">
        <div className="page-container flex flex-col items-center text-center *:mb-4 md:flex-row md:text-start md:*:mb-0">
          <div className="md:w-1/3">{footerCredit}</div>
          <div className="md:w-1/3 md:text-center">{footerCopyright}</div>
          <div className="md:w-1/3" />
        </div>
      </div>
    </footer>
  );
}
