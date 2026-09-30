import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Everything else is self-hosted from public/images. These two are the
    // real site's live third-party trust badges (ENAMAD + Torob) — see
    // reference/content.md §10 — hotlinked rather than screenshotted since
    // they're dynamically generated seals, not static images.
    remotePatterns: [
      { protocol: "https", hostname: "trustseal.enamad.ir" },
      { protocol: "https", hostname: "api.torob.com" },
    ],
  },
};

export default nextConfig;
