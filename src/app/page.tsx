import Hero from "@/src/components/home/Hero";
import ProductSections from "@/src/components/home/ProductSections";
import { getProducts } from "@/src/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      <Hero />
      <ProductSections products={products} />
    </main>
  );
}
