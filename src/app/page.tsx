import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";

// Temporary Phase 2 preview of the ui/ primitives against real content.
// Replaced by the real landing page in Phase 4.
export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center gap-8 p-16">
      <p className="text-center text-lg">
        Landing page — built out in Phase 4. See{" "}
        <code className="rounded bg-black/5 px-1.5 py-0.5">tasks.md</code>.
      </p>

      <div className="flex flex-col items-center gap-6 rounded-card border border-gray-5 p-8">
        <div className="flex gap-4">
          <Button variant="primary">ورود</Button>
          <Button variant="outline">سبد خرید</Button>
        </div>

        <div className="relative w-64 overflow-hidden rounded-card bg-card-bg p-4 shadow-card">
          <Badge />
          <Price amount={1_398_000} originalAmount={1_698_000} />
        </div>

        <Breadcrumb
          items={[
            { label: "محصولات", href: "/products" },
            { label: "ست زنانه", href: "/products/category/2" },
            { label: "بالاپوش", href: "/products/category/3" },
            { label: "شومیز شلوار", href: "/products/category/10" },
          ]}
        />
      </div>
    </div>
  );
}
