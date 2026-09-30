export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;

  return (
    <main className="flex flex-1 items-center justify-center p-16">
      <p className="text-center text-lg">
        Product detail page for <code className="rounded bg-black/5 px-1.5 py-0.5">{slug}</code>{" "}
        — built out in Phase 5. See <code className="rounded bg-black/5 px-1.5 py-0.5">tasks.md</code>.
      </p>
    </main>
  );
}
