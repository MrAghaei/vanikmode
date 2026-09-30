import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Homepage assets are self-hosted from public/images. The first two are the
    // real site's live third-party trust badges (ENAMAD + Torob) — see
    // reference/content.md §10 — hotlinked rather than screenshotted since
    // they're dynamically generated seals, not static images.
    remotePatterns: [
      { protocol: "https", hostname: "trustseal.enamad.ir" },
      { protocol: "https", hostname: "api.torob.com" },
      // Product pages are rendered from the live site's data (src/lib/vanik),
      // so their photos come straight from its uploads directory.
      { protocol: "https", hostname: "vanikmode.com", pathname: "/media/**" },
    ],
  },
};

export default nextConfig;
