import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { getProductPage } from "@/lib/vanik/product-page";

// Same `/products/{id}/{slug}/` shape as the live site, so every product link
// on vanikmode.com has an equivalent page here.

export async function generateMetadata(
  props: PageProps<"/products/[id]/[slug]">,
): Promise<Metadata> {
  const { id, slug } = await props.params;
  const product = await getProductPage(id, slug);
  if (!product) return {};

  return {
    title: `${product.title} | فروشگاه وانیک`,
    openGraph: { images: product.featuredImage ? [product.featuredImage] : [] },
  };
}

export default async function ProductPage(props: PageProps<"/products/[id]/[slug]">) {
  const { id, slug } = await props.params;
  const product = await getProductPage(id, slug);
  if (!product) notFound();

  // The live site redirects stale/mistyped slugs to the canonical one; follow it.
  if (!samePath(product.path, `/products/${id}/${slug}/`)) {
    permanentRedirect(product.path);
  }

  return <ProductDetail product={product} />;
}

function samePath(a: string, b: string): boolean {
  const normalize = (path: string) => {
    try {
      return decodeURIComponent(path).replace(/\/+$/, "");
    } catch {
      return path.replace(/\/+$/, "");
    }
  };
  return normalize(a) === normalize(b);
}
