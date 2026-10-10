import { Suspense } from "react";
import Hero from "@/src/components/home/Hero";
import ProductSections from "@/src/components/home/ProductSections";
import { ProductSectionsSkeleton } from "@/src/components/ui/Skeletons";
import { getProducts } from "@/src/lib/api";

async function Products() {
  const products = await getProducts();

  return <ProductSections products={products} />;
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<ProductSectionsSkeleton />}>
        <Products />
      </Suspense>
    </main>
  );
}
