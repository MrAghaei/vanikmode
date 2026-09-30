import Image from "next/image";
import Link from "next/link";
import {
  footerAbout,
  footerAddress,
  footerBadges,
  footerCopyright,
  footerCredit,
  footerPhones,
  footerQuickLinks,
} from "@/data/footer";

// DOM order matches the real site exactly: About, Quick Links,
// Address+Contact, Certifications (reference/content.md §10).
export function Footer() {
  return (
    <footer className="bg-footer-bg">
      <div className="mx-auto grid max-w-(--breakpoint-lg) gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h5 className="mb-3 font-bold">درباره ما</h5>
          <p className="text-sm text-gray-2">{footerAbout}</p>
        </div>

        <div>
          <h5 className="mb-3 font-bold">دسترسی سریع</h5>
          <ul className="flex flex-col gap-2 text-sm">
            {footerQuickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="mb-3 font-bold">آدرس</h5>
          {footerAddress.lines.map((line) => (
            <p key={line} className="text-sm text-gray-2">
              {line}
            </p>
          ))}
          <p className="text-sm text-gray-2">{footerAddress.hours}</p>

          <h5 className="mt-4 mb-3 font-bold">تماس با ما</h5>
          <ul className="flex flex-col gap-1 text-sm">
            {footerPhones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/-/g, "")}`}>{phone}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-start gap-3">
          <a href={footerBadges.enamad.href} target="_blank" rel="noreferrer">
            <Image
              src={footerBadges.enamad.imageSrc}
              alt="نماد اعتماد الکترونیکی"
              width={80}
              height={100}
              unoptimized
            />
          </a>
          <a href={footerBadges.torob.href} target="_blank" rel="noreferrer">
            <Image
              src={footerBadges.torob.imageSrc}
              alt="ضمانت ترب"
              width={80}
              height={100}
              unoptimized
            />
          </a>
        </div>
      </div>

      <div className="border-t border-gray-5">
        <div className="mx-auto flex max-w-(--breakpoint-lg) flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-gray-2 sm:flex-row">
          <span>{footerCredit}</span>
          <span>{footerCopyright}</span>
          <span />
        </div>
      </div>
    </footer>
  );
}
