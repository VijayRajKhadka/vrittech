import { getProducts } from "@/lib/actions/product-actions";
import { ProductsClient } from "@/src/components/features/products";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const params = await searchParams;

  const sort: "asc" | "desc" = params.sort === "desc" ? "desc" : "asc";

  const products = await getProducts(sort);

  return (
    <div className="mx-auto px-6">
      <ProductsClient initialProducts={products} />
    </div>
  );
}
